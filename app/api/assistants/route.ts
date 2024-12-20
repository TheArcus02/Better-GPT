import { AssistantsFormType } from '@/components/assistants/assistant-form'
import prisma from '@/lib/prismadb'
import { checkSubscription } from '@/lib/subscription'
import { clerkClient, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const model = 'gpt-3.5-turbo-0125'
const placeholderImagePublicId = 'BetterGPT/yyma2xuk3cqretcobda4'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const client = await clerkClient()

    const body = await req.json()
    const user = await currentUser()
    const { name, description, instructions, imagePublicId, shared } =
      body as AssistantsFormType

    if (!user) {
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

    const openaiAssistant = await openai.beta.assistants.create({
      instructions,
      model,
      description,
      name,
      metadata: {
        imagePublicId: imagePublicId || placeholderImagePublicId,
        userId: user.id,
        shared: String(shared),
      },
    })

    const assistant = await prisma.assistant.create({
      data: {
        openaiId: openaiAssistant.id,
        name: name,
        description: description,
        instructions: instructions,
        model,
        imagePublicId: imagePublicId || placeholderImagePublicId,
        userId: user.id,
        shared,
      },
    })

    await client.users.updateUserMetadata(user.id, {
      privateMetadata: {
        assistants: [
          ...((user.privateMetadata?.assistants as String[]) || []),
          assistant.id,
        ],
      },
    })

    return NextResponse.json(assistant, { status: 201 })
  } catch (error) {
    console.log('[ASSISTANT_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
