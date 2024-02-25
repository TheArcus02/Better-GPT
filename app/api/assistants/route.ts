import { AssistantsFormType } from '@/components/assistants/assistants-form'
import prisma from '@/lib/prismadb'
import { checkSubscription } from '@/lib/subscription'
import { getUsername, isInvalidUsername } from '@/lib/utils'
import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const model = 'gpt-3.5-turbo-0125'
const placeholderImagePublicId = 'frhhrd936xf1dd8lhrwg'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const user = await currentUser()
    const { name, description, instructions, imagePublicId } =
      body as AssistantsFormType

    if (!user || isInvalidUsername(user)) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!name || !description || !instructions) {
      return new NextResponse('Missing fields', {
        status: 400,
      })
    }

    const isPremium = await checkSubscription()

    if (!isPremium) {
      return new NextResponse(
        'You need to be a premium user to create an assistant',
        { status: 403 },
      )
    }

    const assistant = await openai.beta.assistants.create({
      instructions,
      model,
      description,
      name,
      tools: [{ type: 'retrieval' }],
    })

    const username = getUsername(user)

    const dbAssistant = await prisma.assistant.create({
      data: {
        name,
        description,
        instructions,
        imagePublicId: imagePublicId || placeholderImagePublicId,
        model,
        userId: user.id,
        profilePicture: user.imageUrl,
        username: username,
        openAiID: assistant.id,
      },
    })

    return NextResponse.json(dbAssistant)
  } catch (error) {
    console.log('[ASSISTANT_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const user = await currentUser()
    const {
      name,
      description,
      instructions,
      imagePublicId,
      id,
      openAiID,
    } = body as AssistantsFormType & { id: string; openAiID: string }

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

export async function DELETE(req: Request) {
  try {
    const body = await req.json()
    const user = await currentUser()
    const { id, openAiID } = body as { id: string; openAiID: string }

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
