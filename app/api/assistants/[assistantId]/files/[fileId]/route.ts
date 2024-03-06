import { checkSubscription } from '@/lib/subscription'
import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function DELETE({
  params: { assistantId, fileId },
}: {
  params: {
    assistantId: string
    fileId: string
  }
}) {
  try {
    const user = await currentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const isPremium = await checkSubscription()

    if (!isPremium) {
      return new NextResponse(
        'You need to be a premium user to edit an assistant',
        { status: 403 },
      )
    }

    const assistant = (await openai.beta.assistants.retrieve(
      assistantId,
    )) as OpenAiAssistant

    if (assistant.metadata.userId !== user.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const res = await openai.beta.assistants.files.del(
      assistantId,
      fileId,
    )

    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    console.log('[ASSISTANT_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
