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
      url: 'https://microsoft-translator-text.p.rapidapi.com/Detect',
      params: {
        'api-version': '3.0',
      },
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
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
