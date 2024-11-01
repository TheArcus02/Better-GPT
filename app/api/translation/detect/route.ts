import { auth } from '@clerk/nextjs'
import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { prompt } = body as {
      prompt: string
    }

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!prompt) {
      return new NextResponse('Missing fields', { status: 400 })
    }

    const options = {
      method: 'POST',
      url: 'https://microsoft-translator-text-api3.p.rapidapi.com/detectlanguage',
      headers: {
        'x-rapidapi-key': process.env.RAPID_API_KEY,
        'x-rapidapi-host':
          'microsoft-translator-text-api3.p.rapidapi.com',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: [
        {
          Text: prompt,
        },
      ],
    }

    const response = await axios.request(options)

    return new NextResponse(response.data[0].language)
  } catch (error) {
    console.log('[TRANSLATION__DETECT_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
