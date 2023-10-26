import ChatClient from '@/components/chat/chat-client'
import { toast } from '@/components/ui/use-toast'
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
    toast({
      variant: 'destructive',
      description: 'Chat not found',
      duration: 3000,
    })
    return redirect('/app/chat')
  }

  if (!chat) {
    toast({
      variant: 'destructive',
      description: 'Chat not found',
      duration: 3000,
    })
    return redirect('/app/chat')
  }

  if (chat.userId !== userId) {
    toast({
      variant: 'destructive',
      description: 'Chat not found',
      duration: 3000,
    })
    return redirect('/app/chat')
  }

  return <ChatClient chat={chat} />
}

export default ChatPage
