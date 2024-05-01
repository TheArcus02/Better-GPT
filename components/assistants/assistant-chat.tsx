'use client'

import { ChevronLeft, Info } from 'lucide-react'
import ChatMessages from '../chat/chat-messages'
import { ScrollArea } from '../ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { getCldImageUrl } from 'next-cloudinary'
import { Button, buttonVariants } from '../ui/button'
import Link from 'next/link'
import ChatForm from '../chat/chat-form'
import { experimental_useAssistant as useAssistant } from 'ai/react'
import { toast } from '../ui/use-toast'
import { Message } from 'ai'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogTrigger } from '../ui/dialog'
import AssistantDialog from './assistant-dialog'

interface AssistantChatProps {
  assistant: AssistantWithAdditionalData
  threadId: string
  createdBy: string
  initialMessages: Message[]
}

const AssistantChat = ({
  assistant,
  threadId,
  createdBy,
  initialMessages,
}: AssistantChatProps) => {
  const [messages, setMessages] = useState(initialMessages)

  const imageUrl = getCldImageUrl({
    src: assistant.imagePublicId,
    width: 100,
    height: 100,
  })

  const router = useRouter()

  const {
    status,
    messages: newMessages,
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

  useEffect(() => {
    if (newMessages) {
      setMessages([...initialMessages, ...newMessages])
    }
  }, [newMessages, initialMessages])

  return (
    <Dialog>
      <div className='flex flex-col h-full max-w-6xl mx-auto w-full overflow-auto border-x'>
        <div className='flex items-center justify-between border-b py-4 px-2'>
          <div className='flex items-center space-x-3'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => router.back()}
            >
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
                  href={`/app/assistants/user/${assistant.userId}`}
                  className='hover:underline'
                >
                  @{createdBy}
                </Link>
              </p>
            </div>
          </div>
          <DialogTrigger
            className={buttonVariants({
              variant: 'ghost',
              size: 'icon',
            })}
          >
            <Info className='h-6 w-6 text-muted-foreground' />
          </DialogTrigger>
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
            chatModel='gpt-4'
            showModel={false}
          />
        </div>
      </div>
      <AssistantDialog assistant={assistant} chatButton={false} />
    </Dialog>
  )
}

export default AssistantChat
