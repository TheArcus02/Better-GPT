import prismadb from '@/lib/prismadb'
import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const user = await currentUser()
    const { name } = body
    console.log(user)
    if (
      !user ||
      !user.id ||
      !((user.firstName && user.lastName) || user.username)
    ) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 })
    }

    const folder = await prismadb.folder.create({
      data: {
        name,
        userId: user.id,
      },
    })

    return NextResponse.json(folder)
  } catch (error) {
    console.log('[CHAT_ERROR/FOLDER]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
