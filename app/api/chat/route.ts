import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs'
import prismadb from '@/lib/prismadb'
import { checkSubscription } from '@/lib/subscription'
import { checkCreatedChats } from '@/lib/restrictions'
import { isInvalidUsername } from '@/lib/utils'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const user = await currentUser()
    const { folderId, name, model } = body as {
      folderId: string
      name: string
      model: ChatModel
    }

    if (!user || isInvalidUsername(user)) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!name || !folderId || !model) {
      return new NextResponse('Fields are required', { status: 400 })
    }

    const isPremium = await checkSubscription()

    if (!isPremium) {
      if (!(await checkCreatedChats())) {
        return new NextResponse(
          'You have reached the limit of chats in the free tier.',
          { status: 403 },
        )
      }

      const freeModels = ['gpt-3.5-turbo']

      if (!freeModels.includes(model)) {
        return new NextResponse(
          'This model is only available for premium users. Upgrade your plan to use it.',
          { status: 403 },
        )
      }
    }

    const chat = await prismadb.chat.create({
      data: {
        name,
        model,
        folderId: folderId ?? null,
        userId: user.id,
      },
    })

    return NextResponse.json(chat)
  } catch (error) {
    console.log('[CHAT_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
