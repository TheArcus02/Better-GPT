import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import prismadb from '@/lib/prismadb'
import { checkSubscription } from '@/lib/subscription'
import { checkCreatedImages } from '@/lib/restrictions'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const sizeMapping = {
  '256x256': 256,
  '512x512': 512,
  '1024x1024': 1024,
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const user = await currentUser()
    const { prompt, photo, shared, size } = body as {
      prompt: string
      photo: string
      shared: boolean
      size: '256x256' | '512x512' | '1024x1024'
    }

    if (
      !user ||
      !user.id ||
      !((user.firstName && user.lastName) || user.username)
    ) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!prompt || !photo || !size) {
      return new NextResponse('Missing fields', {
        status: 400,
      })
    }

    let username = user.username

    if (user.firstName && user.lastName) {
      username = `${user.firstName} ${user.lastName}`
    }

    const isPremium = await checkSubscription()

    if (!isPremium) {
      if (size !== '256x256') {
        return new NextResponse(
          'Only 256x256 images are available in the free tier.',
          { status: 403 },
        )
      }
      if (!(await checkCreatedImages())) {
        return new NextResponse(
          'You have reached the limit of generating images in the free tier.',
          { status: 403 },
        )
      }
    }

    const result = await cloudinary.uploader.upload(photo)

    const mappedSize = sizeMapping[size]

    const image = await prismadb.image.create({
      data: {
        prompt,
        url: result.url,
        publicId: result.public_id,
        userId: user.id,
        shared: shared || false,
        profilePicture: user.imageUrl,
        username: username!,
        size: mappedSize,
      },
    })

    return NextResponse.json(image)
  } catch (error) {
    console.log('[IMAGE_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
