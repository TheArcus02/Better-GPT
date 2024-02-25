import prisma from '@/lib/prismadb'
import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function GET({
  params,
}: {
  params: {
    assistantId: string
  }
}) {
  try {
    const user = await currentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!params.assistantId) {
      return new NextResponse('Missing assistantId', { status: 400 })
    }

    const dbAssistant = await prisma.assistant.findUniqueOrThrow({
      where: {
        id: params.assistantId,
      },
    })

    if (dbAssistant.userId !== user.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const assistant = await openai.beta.assistants.retrieve(
      dbAssistant.openAiID,
    )

    return NextResponse.json(assistant)
  } catch (error) {
    console.log('[ASSISTANT_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
