'use client'

import React, { FormEvent, useState } from 'react'
import ChatTabs from './chat-tabs'
import ChatMessages from './chat-messages'
import ChatForm from './chat-form'
import { useChat } from 'ai/react'
import { Chat, Message } from '@prisma/client'
import { ScrollArea } from '../ui/scroll-area'

interface ChatClientProps {
  chat: Chat & {
    messages: Message[]
  }
}

const ChatClient: React.FC<ChatClientProps> = ({ chat }) => {
  const {
    input,
    handleInputChange,
    handleSubmit,
    messages,
    isLoading,
  } = useChat({
    api: `/api/chat/${chat.id}`,
    initialMessages: chat.messages.map((message) => ({
      id: message.id,
      role: message.role,
      content: message.content,
      createdAt: message.createdAt,
    })),
  })

  return (
    <div className='flex flex-col h-full w-full bg-secondary/50 items-center border-l'>
      {/* <ChatTabs
        tabNames={[
          {
            name: 'Chat 1',
            active: true,
          },
          { name: 'Chat 2', active: false },
          { name: 'Chat 3', active: false },
        ]}
      /> */}
      <div className='flex flex-col h-full max-w-4xl w-full'>
        <ScrollArea className='flex-1'>
          <ChatMessages messages={messages} />
        </ScrollArea>
        <ChatForm
          input={input}
          handleInputChange={handleInputChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default ChatClient
