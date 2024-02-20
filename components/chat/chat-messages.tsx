'use client'

import React, { useEffect, useRef, useState } from 'react'
import ChatMessage from './chat-message'
import { Message } from 'ai'

interface ChatMessagesProps {
  messages: Message[]
  model: ChatModel
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  model,
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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }, [messages])

  return (
    <div className='px-4 w-full pt-6 max-h-screen'>
      <ChatMessage
        isLoading={fakeLoading}
        role='system'
        content='Hi, Im your AI assistant. How can I help you?'
        model={model}
      />
      {messages.map((message, index) => (
        <ChatMessage
          key={message.id ? message.id : message.content + index}
          role={message.role}
          content={message.content}
          model={model}
        />
      ))}
      <div ref={scrollRef} />
    </div>
  )
}

export default ChatMessages
