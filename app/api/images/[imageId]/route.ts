import prismadb from '@/lib/prismadb'
import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { imageId: string } },
) {
  try {
    const body = await req.json()
    const user = await currentUser()
    const { shared } = body as { shared: boolean }

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

    if (!shared) {
      return new NextResponse('Missing fields', {
        status: 400,
      })
    }

    const image = await prismadb.image.update({
      where: {
        id: params.imageId,
      },
      data: {
        shared,
      },
    })

    return NextResponse.json(image)
  } catch (error) {
    console.log('[IMAGE_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
