import { getAuth } from '@clerk/nextjs/server'
import { experimental_AssistantResponse } from 'ai'
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { MessageContentText } from 'openai/resources/beta/threads/messages/messages.mjs'

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

    const createdMessage = await openai.beta.threads.messages.create(
      threadId,
      {
        role: 'user',
        content: message,
      },
    )

    return experimental_AssistantResponse(
      { threadId, messageId: createdMessage.id },
      async ({ threadId, sendMessage, sendDataMessage }) => {
        const run = await openai.beta.threads.runs.create(threadId, {
          assistant_id: assistantId,
        })

        async function waitForRun(run: OpenAI.Beta.Threads.Runs.Run) {
          // Poll for status change
          while (
            run.status === 'queued' ||
            run.status === 'in_progress'
          ) {
            // delay 500ms
            await new Promise((resolve) => setTimeout(resolve, 500))

            run = await openai.beta.threads.runs.retrieve(
              threadId,
              run.id,
            )
          }

          // Check the run status
          if (
            run.status === 'cancelled' ||
            run.status === 'cancelling' ||
            run.status === 'failed' ||
            run.status === 'expired'
          ) {
            throw new Error(`Run failed with status: ${run.status}`)
          }

          // Managing actions
          if (run.status === 'requires_action') {
            if (run.required_action?.type === 'submit_tool_outputs') {
              const tool_outputs =
                run.required_action.submit_tool_outputs.tool_calls.map(
                  (toolCall) => {
                    const parameters = JSON.parse(
                      toolCall.function.arguments,
                    )

                    switch (toolCall.function.name) {
                      default:
                        throw new Error(
                          `Unknown tool call: ${toolCall.function.name}`,
                        )
                    }
                  },
                )
              run = await openai.beta.threads.runs.submitToolOutputs(
                threadId,
                run.id,
                { tool_outputs },
              )

              await waitForRun(run)
            }
          }
        }
        await waitForRun(run)

        const responseMessages = (
          await openai.beta.threads.messages.list(threadId, {
            after: createdMessage.id,
            order: 'asc',
          })
        ).data

        // Send the messages
        for (const message of responseMessages) {
          sendMessage({
            id: message.id,
            role: 'assistant',
            content: message.content.filter(
              (content) => content.type === 'text',
            ) as Array<MessageContentText>,
          })
        }
      },
    )
  } catch (error) {
    console.log('[ASSISTANT_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
