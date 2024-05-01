'use client'

import ChatTabs from './chat-tabs'
import ChatMessages from './chat-messages'
import ChatForm from './chat-form'
import { useChat } from 'ai/react'
import { Chat, Message } from '@prisma/client'
import { ScrollArea } from '../ui/scroll-area'
import { FormEvent } from 'react'
import { ChatRequestOptions } from 'ai'
import { toast } from '../ui/use-toast'

interface ChatClientProps {
  chat: Chat & {
    messages: Message[]
  }
  isPremium: boolean
}

const ChatClient: React.FC<ChatClientProps> = ({
  chat,
  isPremium,
}) => {
  const {
    input,
    handleInputChange,
    handleSubmit: handleChatSubmit,
    messages,
    isLoading,
    stop,
  } = useChat({
    api: `/api/chat/${chat.id}`,
    initialMessages: chat.messages.map((message) => ({
      id: message.id,
      role: message.role,
      content: message.content,
      createdAt: message.createdAt,
    })),
    onError: (err) => {
      console.error(err)
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: err.message,
      })
    },
    body: {
      model: chat.model,
    },
  })

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined,
  ) => {
    e.preventDefault()
    if (isLoading) {
      return stop()
    }
    handleChatSubmit(e, chatRequestOptions)
  }

  return (
    <div className='flex flex-col w-full items-center border-b'>
      <ChatTabs chatId={chat.id} />
      <div className='flex flex-col h-full max-w-6xl w-full overflow-auto'>
        <ScrollArea className='flex-1'>
          <ChatMessages
            messages={messages}
            model={chat.model as ChatModel}
          />
        </ScrollArea>
        <ChatForm
          input={input}
          handleInputChange={handleInputChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          chatModel={chat.model as ChatModel}
        />
      </div>
    </div>
  )
}

export default ChatClient
