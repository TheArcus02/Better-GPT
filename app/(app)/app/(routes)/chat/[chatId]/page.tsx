import ChatClient from '@/components/chat/chat-client'
import { toast } from '@/components/ui/use-toast'
import prismadb from '@/lib/prismadb'
import { checkSubscription } from '@/lib/subscription'
import { auth, redirectToSignIn } from '@clerk/nextjs'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'

interface ChatPageProps {
  params: {
    chatId: string
  }
}

const getChatData = async (chatId: string, userId: string) => {
  try {
    const chat = await prismadb.chat.findUniqueOrThrow({
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
    return chat
  } catch (error) {
    toast({
      variant: 'destructive',
      description: 'Chat not found',
      duration: 3000,
    })
    console.error(error)
    return null
  }
}

export async function generateMetadata({
  params,
}: ChatPageProps): Promise<Metadata> {
  try {
    const { userId } = auth()

    if (!userId)
      return {
        title: 'Not signed in',
        description: 'The user is not signed in',
      }

    const chat = await getChatData(params.chatId, userId)

    if (!chat)
      return {
        title: 'Not Found',
        description: 'The chat was not found',
      }

    return {
      title: chat.name,
      description:
        'Explore a single chat conversation with BetterGPT. Engage in a personalized and intelligent dialogue. Get precise answers, creative suggestions, and expert assistance. Experience the future of AI-powered conversations with BetterGPT.',
      alternates: {
        canonical: `/app/chat/${chat.id}`,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      title: 'Not Found',
      description: 'The chat was not found',
    }
  }
}

const ChatPage: React.FC<ChatPageProps> = async ({
  params: { chatId },
}) => {
  const { userId } = auth()

  if (!userId) return redirectToSignIn()
  const chat = await getChatData(chatId, userId)

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

  const isPremium = await checkSubscription()

  return <ChatClient chat={chat} isPremium={isPremium} />
}

export default ChatPage
