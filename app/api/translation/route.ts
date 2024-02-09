import { NextRequest, NextResponse } from 'next/server'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import { getAuth } from '@clerk/nextjs/server'

export const runtime = 'edge'

// disabling caching
export const fetchCache = 'force-no-store'
export const revalidate = 0

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req)
    const body = await req.json()
    const { prompt, originalLanguage, translateLanguage } = body as {
      prompt: string
      originalLanguage: string
      translateLanguage: string
    }

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!openai.apiKey) {
      return new NextResponse('OpenAI API key not configured', {
        status: 500,
      })
    }

    if (!prompt || !translateLanguage) {
      return new NextResponse('Missing fields', { status: 400 })
    }

    let systemMessage = `You will be provided with a sentence, and you will have to translate it to ${translateLanguage}.`

    if (originalLanguage) {
      systemMessage = `You will be provided with a sentence in ${originalLanguage}, and you will have to translate it to ${translateLanguage}.`
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
        {
          role: 'system',
          content: systemMessage,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    })
    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream)
  } catch (error) {
    console.log('[TRANSLATION_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
