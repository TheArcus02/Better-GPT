'use client'

import React, { FormEvent, useState } from 'react'
import ChatTabs from './chat-tabs'
import ChatMessages from './chat-messages'
import ChatForm from './chat-form'
import { useRouter } from 'next/navigation'
import { useCompletion } from 'ai/react'
import { Chat, Message } from '@prisma/client'
import { ChatMessageProps } from './chat-message'

interface ChatClientProps {
  chat: Chat & {
    messages: Message[]
  }
}

const ChatClient: React.FC<ChatClientProps> = ({ chat }) => {
  const router = useRouter()

  const [messages, setMessages] = useState<ChatMessageProps[]>(
    chat.messages,
  )

  const {
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    setInput,
  } = useCompletion({
    api: `/api/chat/${chat.id}`,
    onFinish(_prompt, completion) {
      const chatMessage: ChatMessageProps = {
        role: 'system',
        content: completion,
      }
      setMessages((prev) => [...prev, chatMessage])
      setInput('')
      router.refresh()
    },
  })

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage = {
      role: 'user',
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])

    handleSubmit(e)
  }

  return (
    <div className='flex flex-col h-full w-full bg-secondary/50 items-center border-l'>
      <ChatTabs
        tabNames={[
          {
            name: 'Chat 1',
            active: true,
          },
          { name: 'Chat 2', active: false },
          { name: 'Chat 3', active: false },
        ]}
      />
      <div className='flex flex-col h-full max-w-4xl w-full'>
        <ChatMessages messages={messages} isLoading={isLoading} />
        <ChatForm
          input={input}
          handleInputChange={handleInputChange}
          onSubmit={onSubmit}
          isLoading={false}
        />
      </div>
    </div>
  )
}

export default ChatClient
