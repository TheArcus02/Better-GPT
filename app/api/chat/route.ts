import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs'
import prismadb from '@/lib/prismadb'
import { checkSubscription } from '@/lib/subscription'
import { checkCreatedChats } from '@/lib/restrictions'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const user = await currentUser()
    const { folderId, name } = body

    if (
      !user ||
      !user.id ||
      !(
        user.firstName ||
        user.lastName ||
        user.username ||
        user.emailAddresses[0].emailAddress
      )
    ) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!name || !folderId) {
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
    }

    const chat = await prismadb.chat.create({
      data: {
        name,
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
