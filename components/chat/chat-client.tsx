'use client'

import React, { useState } from 'react'
import ChatTabs from './chat-tabs'
import ChatMessages from './chat-messages'
import ChatForm, { ChatFormValidatorType } from './chat-form'
import { useRouter } from 'next/navigation'
import { useCompletion } from 'ai/react'
import { Chat, Message } from '@prisma/client'

// const chat: ({
//   messages: {
//       id: string;
//       role: $Enums.Role;
//       content: string;
//       userId: string;
//       chatId: string;
//       createdAt: Date;
//       updatedAt: Date;
//   }[];
// } & {
//   id: string;
//   userId: string;
//   folderId: string;
//   name: string;
//   createdAt: Date;
//   updatedAt: Date;
// }) | null

interface ChatClientProps {
  chat: Chat & {
    messages: Message[]
  }
}

const ChatClient: React.FC<ChatClientProps> = ({ chat }) => {
  const router = useRouter()

  const [messages, setMessages] = useState([])

  // TODO: get chat id from params in server component
  const chatId = '1'

  const {
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    setInput,
  } = useCompletion({
    api: `/api/chat/${chatId}`,
    onFinish(_prompt, completion) {},
  })

  const onSubmit = (data: ChatFormValidatorType) => {
    try {
    } catch (error) {
      console.log(error)
    } finally {
      router.refresh()
    }
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
        <ChatMessages
          messages={chat.messages}
          isLoading={isLoading}
        />
        <ChatForm onSubmit={onSubmit} isLoading={false} />
      </div>
    </div>
  )
}

export default ChatClient
