import prisma from '@/lib/prismadb'
import { checkSubscription } from '@/lib/subscription'
import { currentUser } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function DELETE(
  req: NextRequest,
  props: {
    params: Promise<{
      assistantId: string
      fileId: string
    }>
  },
) {
  const params = await props.params

  const { assistantId, fileId } = params

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

    const assistant = await prisma.assistant.findUnique({
      where: {
        id: assistantId,
      },
    })

    if (!assistant) {
      return new NextResponse('Assistant not found', { status: 404 })
    }

    if (!assistant.vectorStoreId) {
      return new NextResponse(
        'Assistant does not have a vector store',
        { status: 400 },
      )
    }

    if (assistant.userId !== user.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    await openai.beta.vectorStores.files.del(
      assistant.vectorStoreId,
      fileId,
    )

    const res = await openai.files.del(fileId)

    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    console.log('[ASSISTANT_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
