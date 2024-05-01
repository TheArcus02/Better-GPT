import { storeMessageInDb } from '@/lib/actions/assistant.action'
import prisma from '@/lib/prismadb'
import { checkCreatedAssistantMessages } from '@/lib/restrictions'
import { checkSubscription } from '@/lib/subscription'
import { getAuth } from '@clerk/nextjs/server'
import { experimental_AssistantResponse } from 'ai'
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const runtime = 'edge'

export async function POST(
  req: NextRequest,
  {
    params: { assistantId },
  }: {
    params: {
      assistantId: string
    }
  },
) {
  try {
    const body = await req.json()
    const { userId } = getAuth(req)
    const { threadId, message } = body as {
      threadId: string
      message: string
    }

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!assistantId) {
      return new NextResponse('Missing assistantId', { status: 400 })
    }

    if (!threadId || !message) {
      return new NextResponse('Missing fields', { status: 400 })
    }

    if (
      !(await checkSubscription(req)) &&
      !(await checkCreatedAssistantMessages(req))
    ) {
      return new NextResponse(
        'You have reached the limit of messages for your subscription',
        { status: 403 },
      )
    }

    const dbAssistant = await prisma.assistant.findUnique({
      where: {
        id: assistantId,
      },
    })

    if (!dbAssistant) {
      return new NextResponse('Assistant not found', { status: 404 })
    }

    const createdMessage = await openai.beta.threads.messages.create(
      threadId,
      {
        role: 'user',
        content: message,
      },
    )

    await storeMessageInDb({
      assistantId,
      threadId,
      openaiId: createdMessage.id,
      role: 'user',
      content: message,
      userId,
    })

    return experimental_AssistantResponse(
      { threadId, messageId: createdMessage.id },
      async ({ forwardStream, sendDataMessage }) => {
        // Run assistant on the thread
        const runStream = openai.beta.threads.runs
          .createAndStream(threadId, {
            assistant_id: dbAssistant.openaiId,
          })
          .on('messageDone', async (message) => {
            if (message.content[0].type !== 'text') return
            await storeMessageInDb({
              assistantId,
              threadId,
              openaiId: message.id,
              role: message.role,
              content: message.content[0].text.value,
              userId,
            })
          })
        let runResult = await forwardStream(runStream)

        while (
          runResult?.status === 'requires_action' &&
          runResult?.required_action?.type === 'submit_tool_outputs'
        ) {
          const tool_outputs =
            runResult.required_action.submit_tool_outputs.tool_calls.map(
              (toolCall: any) => {
                const parameters = JSON.parse(
                  toolCall.function.arguments,
                )

                switch (toolCall.function.name) {
                  // Add your tool calls here
                  default:
                    throw new Error(
                      `Unknown tool call: ${toolCall.function.name}`,
                    )
                }
              },
            )
          runResult = await forwardStream(
            openai.beta.threads.runs.submitToolOutputsStream(
              threadId,
              runResult.id,
              { tool_outputs },
            ),
          )
        }
      },
    )
  } catch (error) {
    console.log('[ASSISTANT_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
