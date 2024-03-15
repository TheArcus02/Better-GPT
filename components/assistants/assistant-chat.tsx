'use client'

import { ChevronLeft } from 'lucide-react'
import ChatMessages from '../chat/chat-messages'
import { ScrollArea } from '../ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { getCldImageUrl } from 'next-cloudinary'
import { Button } from '../ui/button'
import Link from 'next/link'
import ChatForm from '../chat/chat-form'
import { experimental_useAssistant as useAssistant } from 'ai/react'
import { toast } from '../ui/use-toast'

interface AssistantChatProps {
  assistant: OpenAiAssistant
  threadId: string
  createdBy: string
}

const AssistantChat = ({
  assistant,
  threadId,
  createdBy,
}: AssistantChatProps) => {
  const imageUrl = getCldImageUrl({
    src: assistant.metadata.imagePublicId,
    width: 100,
    height: 100,
  })

  const {
    status,
    messages,
    input,
    submitMessage,
    handleInputChange,
  } = useAssistant({
    api: `/api/assistants/${assistant.id}/chat`,
    threadId,
    onError: (err) => {
      console.log(err.message)
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: err.message,
      })
    },
  })

  console.log(messages)

  return (
    <div className='flex flex-col h-full max-w-6xl mx-auto w-full overflow-auto'>
      <div className='flex items-center space-x-3'>
        <Button variant='ghost' size='icon'>
          <ChevronLeft className='w-6 h-6' />
        </Button>
        <Avatar className='h-12 w-12'>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>
            {(assistant.name && assistant.name[0]) || 'A'}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1>{assistant.name}</h1>
          <p className='text-sm text-muted-foreground'>
            Created by{' '}
            <Link
              href={`/app/assistants/user/${assistant.metadata.userId}`}
              className='hover:underline'
            >
              @{createdBy}
            </Link>
          </p>
        </div>
      </div>
      <ScrollArea className='flex-1'>
        <ChatMessages
          messages={messages}
          model='gpt-4'
          avatarSrc={imageUrl}
          welcomeMessage={`Hi, I'm ${assistant.name}. How can I help you?`}
        />
      </ScrollArea>
      <div className='px-4'>
        <ChatForm
          input={input}
          handleInputChange={handleInputChange}
          onSubmit={submitMessage}
          isLoading={status !== 'awaiting_message'}
          btnDisabled={false}
          chatModel='gpt-4'
          showModel={false}
        />
      </div>
    </div>
  )
}

export default AssistantChat
