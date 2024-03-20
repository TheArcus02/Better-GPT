import prismadb from '@/lib/prismadb'
import { checkCreatedFolders } from '@/lib/restrictions'
import { checkSubscription } from '@/lib/subscription'
import { isInvalidUsername } from '@/lib/utils'
import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const user = await currentUser()
    const { name } = body
    if (!user || isInvalidUsername(user)) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 })
    }

    const isPremium = await checkSubscription()

    if (!isPremium) {
      if (!(await checkCreatedFolders())) {
        return new NextResponse(
          'You have reached the limit of folders in the free tier.',
          { status: 403 },
        )
      }
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
