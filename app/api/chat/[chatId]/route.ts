import { NextRequest, NextResponse } from 'next/server'
import {
  Message as VercelChatMessage,
  StreamingTextResponse,
} from 'ai'
import OpenAI from 'openai'
import prismadb from '@/lib/prismadb'
import { checkSubscription } from '@/lib/subscription'
import { checkCreatedMessages } from '@/lib/restrictions'
import { getAuth } from '@clerk/nextjs/server'
import { ChatOpenAI } from '@langchain/openai'
import {
  AIMessage,
  ChatMessage,
  HumanMessage,
} from '@langchain/core/messages'
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts'
import { SerpAPI } from '@langchain/community/tools/serpapi'
import { Calculator } from '@langchain/community/tools/calculator'
import { WolframAlphaTool } from '@langchain/community/tools/wolframalpha'
import {
  AgentExecutor,
  createToolCallingAgent,
} from 'langchain/agents'

export const runtime = 'edge'

// disabling caching
export const fetchCache = 'force-no-store'
export const revalidate = 0

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const convertVercelMessageToLangChainMessage = (
  message: VercelChatMessage,
) => {
  if (message.role === 'user') {
    return new HumanMessage(message.content)
  } else if (message.role === 'assistant') {
    return new AIMessage(message.content)
  } else {
    return new ChatMessage(message.content, message.role)
  }
}

const promptTemplate = `You are general purpose assistant. answer questions,
                         provide information, and help with tasks.
                         
                         When presenting mathematical expressions, please adhere to the following guidelines:
                         
                         - Utilize KaTeX syntax for mathematical formulas.
                         - Enclose math formulas in double dollar signs ($$) for display equations.
                         - Use dollar signs ($) for inline math equations, even for single variables.
                         - Good Formula Example: The Lift coefficient ($$C_L$$) can be determined by the formula:
                           $$L = \frac{{1}}{{2}} \rho v^2 S C_L$$
                         
                         Please ensure that all math expressions follow these conventions for accurate interpretation and presentation.`

export async function POST(
  req: NextRequest,
  { params }: { params: { chatId: string } },
) {
  try {
    const { userId } = getAuth(req)

    const body = await req.json()
    const { messages, model } = body as {
      messages: VercelChatMessage[]
      model: ChatModel
    }

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!openai.apiKey) {
      return new NextResponse('OpenAI API key not configured', {
        status: 500,
      })
    }

    if (!messages) {
      return new NextResponse('Missing message', { status: 400 })
    }

    const isPremium = await checkSubscription(req)

    if (!isPremium) {
      if (!(await checkCreatedMessages(req))) {
        return new NextResponse(
          'You have reached the limit of messages in the free tier.',
          { status: 403 },
        )
      }
    }

    const filteredMessages = messages.filter(
      (message: VercelChatMessage) =>
        message.role === 'user' || message.role === 'assistant',
    )
    const prevMessages = filteredMessages
      .slice(0, -1)
      .map(convertVercelMessageToLangChainMessage)

    const currentMessageContent =
      filteredMessages[filteredMessages.length - 1].content
    const chat = await prismadb.chat.update({
      where: {
        id: params.chatId,
      },
      data: {
        messages: {
          create: {
            content: currentMessageContent,
            role: 'user',
            userId: userId,
          },
        },
      },
    })

    if (!chat) {
      return new NextResponse('Chat not found', { status: 404 })
    }

    const tools = [
      new SerpAPI(),
      new WolframAlphaTool({
        appid: process.env.WOLFRAM_ALPHA_APPID || '',
      }),
      new Calculator(),
    ]

    const llm = new ChatOpenAI({
      model: model,
      temperature: 0,
      streaming: true,
    })

    const prompt = ChatPromptTemplate.fromMessages([
      ['system', promptTemplate],
      new MessagesPlaceholder('chat_history'),
      ['human', '{input}'],
      new MessagesPlaceholder('agent_scratchpad'),
    ])

    const agent = await createToolCallingAgent({
      llm,
      tools,
      prompt,
    })

    const agentExecutor = new AgentExecutor({
      agent,
      tools,
      returnIntermediateSteps: true,
    }).withConfig({
      runName: 'ChatAgent',
    })

    const eventStream = await agentExecutor.streamEvents(
      {
        input: currentMessageContent,
        chat_history: prevMessages,
      },
      {
        version: 'v1',
      },
    )

    const textEncoder = new TextEncoder()

    interface ToolCall {
      name: string
      input: string
      output: string
    }

    let resData = ''
    let toolCalls: ToolCall[] = []

    const transformStream = new ReadableStream({
      async start(controller) {
        for await (const event of eventStream) {
          const eventType = event.event
          if (eventType === 'on_llm_stream') {
            const content = event.data?.chunk?.message?.content
            // Empty content in the context of OpenAI means
            // that the model is asking for a tool to be invoked via function call.
            // So we only print non-empty content
            if (content !== undefined && content !== '') {
              controller.enqueue(textEncoder.encode(content))
              resData += content
            }
          } else if (eventType === 'on_tool_start') {
            const toolName = event.name
            if (toolName) {
              const text = `\n\n>**I'm now using the ${toolName} tool...**\n`

              controller.enqueue(textEncoder.encode(text))
              resData += text
            }
          } else if (eventType === 'on_tool_end') {
            const toolName = event.name
            const toolInput = event.data?.input
            const toolOutput = event.data?.output
            if (toolName) {
              const text = `\n\n>**I've finished using the ${toolName} tool.**\n\n`
              controller.enqueue(textEncoder.encode(text))
              toolCalls.push({
                name: toolName,
                input: toolInput,
                output: toolOutput,
              })
              resData += text
            }
          } else if (eventType === 'on_chain_end') {
            if (event.name === 'ChatAgent') {
              await prismadb.chat.update({
                where: {
                  id: params.chatId,
                },
                data: {
                  messages: {
                    create: {
                      content: resData,
                      role: 'system',
                      userId: userId,
                    },
                  },
                },
              })
            }
          }
        }
        controller.close()
      },
    })

    return new StreamingTextResponse(transformStream)
  } catch (error) {
    console.log('[CHAT_ERROR/[CHAT_ID]]', error)
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error
      return NextResponse.json(
        { name, status, headers, message },
        { status },
      )
    }
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { chatId: string } },
) {
  try {
    const { userId } = getAuth(req)

    const body = await req.json()
    const { name, folderId } = body

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!name && !folderId) {
      return new NextResponse('Missing fields', { status: 400 })
    }

    if (name) {
      const chat = await prismadb.chat.update({
        where: {
          id: params.chatId,
          userId: userId,
        },
        data: {
          name,
        },
      })
      return NextResponse.json(chat)
    }

    if (folderId) {
      const chat = await prismadb.chat.update({
        where: {
          id: params.chatId,
          userId: userId,
        },
        data: {
          folderId,
        },
      })
      return NextResponse.json(chat)
    }
  } catch (error) {
    console.log('[CHAT_ERROR/[CHAT_ID]]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { chatId: string } },
) {
  try {
    const { userId } = getAuth(req)

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const chat = await prismadb.chat.delete({
      where: {
        id: params.chatId,
        userId: userId,
      },
    })

    return NextResponse.json(chat)
  } catch (error) {
    console.log('[CHAT_ERROR/[CHAT_ID]]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
