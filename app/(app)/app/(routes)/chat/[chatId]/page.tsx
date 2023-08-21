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

  const chat = await prismadb.chat.findUnique({
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

  if (!chat) return redirect('/app/chat')

  return <ChatClient chat={chat} />
}

export default ChatPage
