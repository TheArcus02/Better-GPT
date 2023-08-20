import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import prismadb from '@/lib/prismadb'

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

export async function PATCH(
  req: Request,
  { params }: { params: { chatId: string } },
) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name, folderId } = body

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!name && !folderId) {
      return new NextResponse('Missing fields', { status: 400 })
    }

    if (name) {
      const chat = await prismadb.chat.update({
        where: {
          id: params.chatId,
          userId: userId,
        },
        data: {
          name,
        },
      })
      return NextResponse.json(chat)
    }

    if (folderId) {
      const chat = await prismadb.chat.update({
        where: {
          id: params.chatId,
          userId: userId,
        },
        data: {
          folderId,
        },
      })
      return NextResponse.json(chat)
    }
  } catch (error) {
    console.log('[CHAT_ERROR/[CHAT_ID]]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { chatId: string } },
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const chat = await prismadb.chat.delete({
      where: {
        id: params.chatId,
        userId: userId,
      },
    })

    return NextResponse.json(chat)
  } catch (error) {
    console.log('[CHAT_ERROR/[CHAT_ID]]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
