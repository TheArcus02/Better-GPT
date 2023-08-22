import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import prismadb from '@/lib/prismadb'

export async function PATCH(
  req: Request,
  { params }: { params: { folderId: string } },
) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name } = body

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!name && !params.folderId) {
      return new NextResponse('Missing fields', { status: 400 })
    }

    const folder = await prismadb.folder.update({
      where: {
        id: params.folderId,
        userId: userId,
      },
      data: {
        name,
      },
    })
    return NextResponse.json(folder)
  } catch (error) {
    console.log('[CHAT_ERROR/Folder]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { folderId: string } },
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!params.folderId) {
      return new NextResponse('Missing fields', { status: 400 })
    }

    const folder = await prismadb.folder.delete({
      where: {
        id: params.folderId,
        userId: userId,
      },
    })

    return NextResponse.json(folder)
  } catch (error) {
    console.log('[CHAT_ERROR/Folder', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
