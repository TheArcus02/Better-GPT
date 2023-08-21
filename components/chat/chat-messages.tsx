'use client'

import React, { useEffect, useRef, useState } from 'react'
import ChatMessage from './chat-message'
import { Message } from '@prisma/client'

interface ChatMessagesProps {
  messages: Message[]
  isLoading: boolean
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isLoading,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false,
  )

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div className='flex-1 overflow-y-auto px-4 w-full pt-6'>
      <ChatMessage
        isLoading={fakeLoading}
        role='system'
        content='Hi, Im your AI assistant. How can I help you?'
      />
      {messages.map((message) => (
        <ChatMessage
          isLoading={isLoading}
          key={message.id}
          role={message.role}
          content={message.content}
        />
      ))}
      <div ref={scrollRef} />
    </div>
  )
}

export default ChatMessages
