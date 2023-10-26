import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { Message, OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import prismadb from '@/lib/prismadb'
import { checkSubscription } from '@/lib/subscription'
import { checkCreatedMessages } from '@/lib/restrictions'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(
  req: Request,
  { params }: { params: { chatId: string } },
) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { messages } = body as { messages: Message[] }

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

    const isPremium = await checkSubscription()

    if (!isPremium) {
      if (!(await checkCreatedMessages())) {
        return new NextResponse(
          'You have reached the limit of messages in the free tier.',
          { status: 403 },
        )
      }
    }

    const lastUserMessage = messages
      .slice()
      .reverse()
      .find((message) => message.role === 'user')?.content

    if (!lastUserMessage) {
      return new NextResponse('Missing message', { status: 400 })
    }

    const chat = await prismadb.chat.update({
      where: {
        id: params.chatId,
      },
      data: {
        messages: {
          create: {
            content: lastUserMessage,
            role: 'user',
            userId: userId,
          },
        },
      },
    })

    if (!chat) {
      return new NextResponse('Chat not found', { status: 404 })
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      stream: true,
    })

    const stream = OpenAIStream(response, {
      onCompletion: async (data) => {
        await prismadb.chat.update({
          where: {
            id: params.chatId,
          },
          data: {
            messages: {
              create: {
                content: data,
                role: 'system',
                userId: userId,
              },
            },
          },
        })
      },
    })

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
