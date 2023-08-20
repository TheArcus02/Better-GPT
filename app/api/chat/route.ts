import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs'
import prismadb from '@/lib/prismadb'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const user = await currentUser()
    const { folderId, name } = body

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!name || !folderId) {
      return new NextResponse('Fields are required', { status: 400 })
    }

    // TODO: check for subscription

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
