import { checkSubscription } from '@/lib/subscription'
import { currentUser } from '@clerk/nextjs'
import { createReadStream } from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      assistantId: string
    }
  },
) {
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
      params.assistantId,
    )) as OpenAiAssistant

    if (assistant.metadata.userId !== user.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as unknown as File

    if (!file) {
      return new NextResponse('Missing file', { status: 400 })
    }

    const openAiFile = await openai.files.create({
      file,
      purpose: 'assistants',
    })

    await openai.beta.assistants.files.create(params.assistantId, {
      file_id: openAiFile.id,
    })

    return NextResponse.json(openAiFile, { status: 201 })
  } catch (error) {
    console.log('[ASSISTANT_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
