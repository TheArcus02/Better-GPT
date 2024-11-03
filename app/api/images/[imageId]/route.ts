import prismadb from '@/lib/prismadb'
import { isInvalidUsername } from '@/lib/utils'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  props: { params: Promise<{ imageId: string }> },
) {
  const params = await props.params
  try {
    const body = await req.json()
    const user = await currentUser()
    const { shared } = body as { shared: boolean }

    if (!user || isInvalidUsername(user)) {
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
