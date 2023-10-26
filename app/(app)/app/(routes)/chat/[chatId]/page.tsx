import ChatClient from '@/components/chat/chat-client'
import prismadb from '@/lib/prismadb'
import { auth, redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

interface ChatPageProps {
  params: {
    chatId: string
  }
}

const ChatPage: React.FC<ChatPageProps> = async ({
  params: { chatId },
}) => {
  const { userId } = auth()

  if (!userId) return redirectToSignIn()
  let chat = null
  console.log('chatId', chatId)
  try {
    chat = await prismadb.chat.findUniqueOrThrow({
      where: {
        id: chatId,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
          where: {
            userId,
          },
        },
      },
    })
  } catch (error) {
    console.log('chat not found 1')
    return redirect('/app/chat')
  }

  if (!chat) {
    console.log('chat not found')
    return redirect('/app/chat')
  }

  if (chat.userId !== userId) {
    console.log('user not found')
    return redirect('/app/chat')
  }

  return <ChatClient chat={chat} />
}

export default ChatPage
