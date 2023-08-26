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
    const { prompt, size } = body as {
      prompt: string
      size: '256x256' | '512x512' | '1024x1024' | null
    }

    if (!user || !user.id || !user.firstName) {
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

    const response = await openai.images.generate({
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
