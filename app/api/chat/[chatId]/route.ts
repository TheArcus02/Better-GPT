import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { messages } = body

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!openai.apiKey) {
      return new NextResponse('OpenAI API key not configured', {
        status: 500,
      })
    }

    if (!messages) {
      return new NextResponse('Missing message', { status: 400 })
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      stream: true,
    })

    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream)
  } catch (error) {
    console.log('[CHAT_ERROR/[CHAT_ID]]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
