'use client'

import React, { useEffect, useRef, useState } from 'react'
import ChatMessage, { ChatMessageProps } from './chat-message'

interface ChatMessagesProps {
  messages: ChatMessageProps[]
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
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
    <div className='px-4 w-full pt-6'>
      <ChatMessage
        isLoading={fakeLoading}
        role='system'
        content='Hi, Im your AI assistant. How can I help you?'
      />
      {messages.map((message, index) => (
        <ChatMessage
          key={message.id ? message.id : message.content + index}
          role={message.role}
          content={message.content}
        />
      ))}
      <div ref={scrollRef} />
    </div>
  )
}

export default ChatMessages
