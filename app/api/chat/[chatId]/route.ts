import { NextRequest, NextResponse } from 'next/server'
import {
  Message as VercelChatMessage,
  OpenAIStream,
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

const promptTemplate = `You are general purpose assistant. answer questions, provide information, and help with tasks`

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

    const tools = [new Calculator(), new SerpAPI()]

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
      returnIntermediateSteps: false,
    })

    const logStream = await agentExecutor.streamLog({
      input: currentMessageContent,
      chat_history: prevMessages,
    })

    const textEncoder = new TextEncoder()

    let resData = ''

    const transformStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of logStream) {
          if (chunk.ops?.length > 0 && chunk.ops[0].op === 'add') {
            const addOp = chunk.ops[0]
            if (
              addOp.path.startsWith('/logs/ChatOpenAI') &&
              typeof addOp.value === 'string' &&
              addOp.value.length
            ) {
              controller.enqueue(textEncoder.encode(addOp.value))
              resData += addOp.value
            }
          }
        }
        controller.close()

        if (controller.desiredSize === 0) {
          // The stream has been consumed
          // Save the response to the database
          await prismadb.chat.update({
            where: {
              id: params.chatId,
            },
            data: {
              messages: {
                create: {
                  content: resData,
                  role: 'assistant',
                  userId: userId,
                },
              },
            },
          })
        }
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
