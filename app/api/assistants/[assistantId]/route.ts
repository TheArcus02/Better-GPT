import { AssistantsFormType } from '@/components/assistants/assistants-form'
import { checkSubscription } from '@/lib/subscription'
import { isInvalidUsername } from '@/lib/utils'
import { currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const model = 'gpt-3.5-turbo-0125'

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

    const assistant = (await openai.beta.assistants.retrieve(
      params.assistantId,
    )) as OpenAI.Beta.Assistants.Assistant & {
      metadata: AssistantMetadata
    }

    if (
      !assistant.metadata.shared &&
      assistant.metadata.userId !== user.id
    ) {
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
    const { name, description, instructions, imagePublicId } =
      body as AssistantsFormType

    const { assistantId } = params

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!name || !description || !instructions || !assistantId) {
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

    const assistant = (await openai.beta.assistants.retrieve(
      assistantId,
    )) as OpenAiAssistant

    if (assistant.metadata.userId !== user.id) {
      return new NextResponse(
        'Assistant can only be modified by the owner',
        { status: 401 },
      )
    }

    await openai.beta.assistants.update(assistantId, {
      instructions,
      model,
      description,
      name,
      metadata: {
        imagePublicId,
      },
    })

    return NextResponse.json(assistant)
  } catch (error) {
    console.log('[ASSISTANT_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE({
  params,
}: {
  params: {
    assistantId: string
  }
}) {
  try {
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

    const assistant = (await openai.beta.assistants.retrieve(
      assistantId,
    )) as OpenAiAssistant

    if (!assistant) {
      return new NextResponse('Assistant not found', { status: 404 })
    }

    if (assistant.metadata.userId !== user.id) {
      return new NextResponse(
        'Assistant can only be modified by the owner',
        { status: 401 },
      )
    }

    await openai.beta.assistants.del(assistantId)

    return new NextResponse('Assistant deleted', { status: 204 })
  } catch (error) {
    console.log('[ASSISTANT_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
