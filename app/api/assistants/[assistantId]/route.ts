import { AssistantsFormType } from '@/components/assistants/assistant-form'
import prisma from '@/lib/prismadb'
import { checkSubscription } from '@/lib/subscription'
import { isInvalidUsername } from '@/lib/utils'
import { clerkClient, currentUser } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const model = 'gpt-3.5-turbo-0125'

export async function GET(
  req: NextRequest,
  props: {
    params: Promise<{
      assistantId: string
    }>
  },
) {
  const params = await props.params

  const { assistantId } = params

  try {
    const user = await currentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!assistantId) {
      return new NextResponse('Missing assistantId', { status: 400 })
    }

    const assistant = await prisma.assistant.findUnique({
      where: {
        id: assistantId,
      },
    })

    if (!assistant) {
      return new NextResponse('Assistant not found', { status: 404 })
    }

    if (!assistant.shared && assistant.userId !== user.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    return NextResponse.json(assistant)
  } catch (error) {
    console.log('[ASSISTANT_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  props: {
    params: Promise<{
      assistantId: string
    }>
  },
) {
  const params = await props.params
  try {
    const body = await req.json()
    const user = await currentUser()
    const { name, description, instructions, imagePublicId, shared } =
      body as AssistantsFormType

    const { assistantId } = params

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (
      !name ||
      !description ||
      !instructions ||
      !assistantId ||
      !shared
    ) {
      return new NextResponse('Missing fields', {
        status: 400,
      })
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

    if (assistant.userId !== user.id) {
      return new NextResponse(
        'Assistant can only be modified by the owner',
        { status: 401 },
      )
    }

    await openai.beta.assistants.update(assistant.openaiId, {
      instructions,
      model,
      description,
      name,
      metadata: {
        imagePublicId,
        shared,
      },
    })

    await prisma.assistant.update({
      where: {
        id: assistantId,
        openaiId: assistant.openaiId,
      },
      data: {
        name,
        description,
        instructions,
        imagePublicId,
        shared,
      },
    })

    return NextResponse.json(assistant)
  } catch (error) {
    console.log('[ASSISTANT_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  props: {
    params: Promise<{
      assistantId: string
    }>
  },
) {
  const params = await props.params
  try {
    const client = await clerkClient()
    const user = await currentUser()

    const { assistantId } = params

    if (!user || isInvalidUsername(user)) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!assistantId) {
      return new NextResponse('Missing fields', {
        status: 400,
      })
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

    if (assistant.userId !== user.id) {
      return new NextResponse(
        'Assistant can only be modified by the owner',
        { status: 401 },
      )
    }

    if (assistant.vectorStoreId) {
      const vectorStoreFiles =
        await openai.beta.vectorStores.files.list(
          assistant.vectorStoreId,
        )
      await openai.beta.vectorStores.del(assistant.vectorStoreId)

      await Promise.all(
        vectorStoreFiles.data.map((file) =>
          openai.files.del(file.id),
        ),
      )
    }

    const res = await openai.beta.assistants.del(assistant.openaiId)

    await prisma.assistant.delete({
      where: {
        id: assistantId,
      },
    })

    await client.users.updateUserMetadata(user.id, {
      privateMetadata: {
        assistants: (
          user.privateMetadata as UserMetadata
        )?.assistants?.filter((id) => id !== assistantId),
      },
    })

    return NextResponse.json(res)
  } catch (error) {
    console.log('[ASSISTANT_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
