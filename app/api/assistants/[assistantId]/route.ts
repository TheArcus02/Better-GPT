import { AssistantsFormType } from '@/components/assistants/assistants-form'
import prisma from '@/lib/prismadb'
import { checkSubscription } from '@/lib/subscription'
import { getUsername, isInvalidUsername } from '@/lib/utils'
import { currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const model = 'gpt-3.5-turbo-0125'
const placeholderImagePublicId = 'frhhrd936xf1dd8lhrwg'

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

export async function PATCH(
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
    const body = await req.json()
    const user = await currentUser()
    const {
      name,
      description,
      instructions,
      imagePublicId,
      openAiID,
    } = body as AssistantsFormType & { openAiID: string }
    const { assistantId: id } = params

    if (!user || isInvalidUsername(user)) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!name || !description || !instructions || !id || !openAiID) {
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
        id: id,
        openAiID: openAiID,
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

    await openai.beta.assistants.update(openAiID, {
      instructions,
      model,
      description,
      name,
    })

    const username = getUsername(user)

    const dbAssistant = await prisma.assistant.update({
      where: {
        id: id,
        openAiID: openAiID,
      },
      data: {
        name,
        description,
        instructions,
        imagePublicId: imagePublicId || placeholderImagePublicId,
        model,
        userId: user.id,
        profilePicture: user.imageUrl,
        username: username,
      },
    })

    return NextResponse.json(dbAssistant)
  } catch (error) {
    console.log('[ASSISTANT_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      assistantId: string
    }
  },
) {
  try {
    const body = await req.json()
    const user = await currentUser()
    const { openAiID } = body as { openAiID: string }

    const { assistantId: id } = params

    if (!user || isInvalidUsername(user)) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!id || !openAiID) {
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
        id: id,
        openAiID: openAiID,
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

    await openai.beta.assistants.del(openAiID)

    const dbAssistant = await prisma.assistant.delete({
      where: {
        id: id,
        openAiID: openAiID,
      },
    })

    return NextResponse.json(dbAssistant)
  } catch (error) {
    console.log('[ASSISTANT_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
