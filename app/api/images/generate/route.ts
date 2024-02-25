import { GenerateImageFormType } from '@/components/images/generate-form'
import { checkCreatedImages } from '@/lib/restrictions'
import { checkSubscription } from '@/lib/subscription'
import { isInvalidUsername } from '@/lib/utils'
import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const user = await currentUser()
    const { prompt, size, model } = body as GenerateImageFormType

    if (!user || isInvalidUsername(user)) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!openai.apiKey) {
      return new NextResponse('OpenAI API key not configured', {
        status: 500,
      })
    }

    if (!prompt || !size) {
      return new NextResponse('Missing prompt or size', {
        status: 400,
      })
    }

    const isPremium = await checkSubscription()

    if (!isPremium) {
      const validSizes = ['256x256', '512x512']
      const validModels = ['dall-e-2']

      if (
        !validSizes.includes(size) ||
        !validModels.includes(model)
      ) {
        return new NextResponse(
          'This model or size is not available in the free tier. Please upgrade to premium.',
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

    const dalle2Sizes = ['256x256', '512x512', '1024x1024']
    const dalle3Sizes = ['1024x1024', '1792x1024', '1024x1792']

    if (model === 'dall-e-2' && !dalle2Sizes.includes(size)) {
      return new NextResponse('Invalid size for DALL-E 2', {
        status: 400,
      })
    }

    if (model === 'dall-e-3' && !dalle3Sizes.includes(size)) {
      return new NextResponse('Invalid size for DALL-E 3', {
        status: 400,
      })
    }

    const response = await openai.images.generate({
      model: model,
      prompt,
      size: size,
      response_format: 'b64_json',
    })

    const image = response.data[0].b64_json

    return NextResponse.json({ image })
  } catch (error) {
    console.log('[IMAGE_ERROR]/GENERATE', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
