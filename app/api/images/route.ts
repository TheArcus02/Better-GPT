import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import prismadb from '@/lib/prismadb'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const user = await currentUser()
    const { prompt, photo, shared } = body as {
      prompt: string
      photo: string
      shared: boolean
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!prompt || !photo) {
      return new NextResponse('Missing fields', {
        status: 400,
      })
    }

    const result = await cloudinary.uploader.upload(photo)

    const image = await prismadb.image.create({
      data: {
        prompt,
        url: result.url,
        userId: user.id,
        shared: shared || false,
      },
    })

    return NextResponse.json(image)
  } catch (error) {
    console.log('[IMAGE_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
