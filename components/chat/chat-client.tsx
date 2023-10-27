'use client'

import ChatTabs from './chat-tabs'
import ChatMessages from './chat-messages'
import ChatForm from './chat-form'
import { useChat } from 'ai/react'
import { Chat, Message } from '@prisma/client'
import { ScrollArea } from '../ui/scroll-area'
import { ChangeEvent, FormEvent, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover'
import { ChatRequestOptions } from 'ai'

interface ChatClientProps {
  chat: Chat & {
    messages: Message[]
  }
}

interface Command {
  name: string
  description: string
}

const commands: Array<Command> = [
  {
    name: '/generate_image',
    description: 'Generate an image',
  },
  {
    name: '/generate_text',
    description: 'Generate text',
  },
]

const ChatClient: React.FC<ChatClientProps> = ({ chat }) => {
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [matchingCommands, setMatchingCommands] = useState<
    Array<Command>
  >([])
  const [usedCommand, setUsedCommand] = useState<Command | null>(null)

  const {
    input,
    handleInputChange: handleChatInputChange,
    handleSubmit: handleChatSubmit,
    messages,
    isLoading,
    setInput,
    stop,
  } = useChat({
    api: `/api/chat/${chat.id}`,
    initialMessages: chat.messages.map((message) => ({
      id: message.id,
      role: message.role,
      content: message.content,
      createdAt: message.createdAt,
    })),
  })

  const handleInputChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    e.preventDefault()

    const input = e.target.value.trim()

    if (input.startsWith('/')) {
      setBtnDisabled(true)
      const normalizedInput = e.target.value.toLowerCase()

      const matchedCommand = commands.find(
        (command) => command.name.toLowerCase() === normalizedInput,
      )

      if (matchedCommand) {
        setUsedCommand(matchedCommand)
        setPopoverOpen(false)
        // TODO: Provide instructions or perform actions based on the matched command...
      } else {
        const _matchingCommands = commands.filter((command) => {
          return (
            command.name.toLowerCase().includes(normalizedInput) &&
            command.name.toLowerCase() !== normalizedInput
          )
        })
        if (_matchingCommands.length) {
          setMatchingCommands(_matchingCommands)
          setPopoverOpen(true)
        }
      }
    }

    handleChatInputChange(e)
  }

  const handleCommandClick = (command: string) => {
    setInput(command)
    setPopoverOpen(false)
  }

  const handleSubmit = (
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
    <div className='flex flex-col w-full bg-secondary/50 items-center border-l'>
      <ChatTabs chatId={chat.id} />
      <div className='flex flex-col h-full max-w-4xl w-full overflow-auto'>
        <ScrollArea className='flex-1'>
          <ChatMessages messages={messages} />
        </ScrollArea>
        <Popover
          open={popoverOpen && !usedCommand}
          onOpenChange={() => setPopoverOpen((prev) => !prev)}
        >
          <PopoverTrigger></PopoverTrigger>
          <PopoverContent
            className='w-80 space-y-1'
            align='start'
            sideOffset={-8}
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            {matchingCommands.map((command) => (
              <div key={command.description}>
                <button
                  className='focus-visible:bg-muted/60 cursor-pointer hover:bg-muted/60 rounded-md p-2 w-full text-left'
                  onClick={() => handleCommandClick(command.name)}
                >
                  <p className='font-bold '>{command.name}</p>
                  <p className='text-muted-foreground text-sm ml-1'>
                    {command.description}
                  </p>
                </button>
              </div>
            ))}
          </PopoverContent>
        </Popover>
        <ChatForm
          input={input}
          handleInputChange={handleInputChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          btnDisabled={btnDisabled}
        />
      </div>
    </div>
  )
}

export default ChatClient
