'use client'

import { cn, copyToClipboard } from '@/lib/utils'
import { buttonVariants } from '../ui/button'
import { Copy } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { BeatLoader } from 'react-spinners'
import { useTheme } from 'next-themes'

import { Tooltip, TooltipContent } from '../ui/tooltip'
import { TooltipTrigger } from '@radix-ui/react-tooltip'
import MessageWrapper from '../message-wrapper'
import { memo } from 'react'

export interface ChatMessageProps {
  content: string
  role: string
  isLoading?: boolean
  id?: string
  userId?: string
  chatId?: string
  createdAt?: Date
  updatedAt?: Date
  model: ChatModel
  avatarSrc?: string
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  role,
  isLoading,
  id,
  userId,
  chatId,
  createdAt,
  updatedAt,
  model,
  avatarSrc,
}) => {
  const { theme } = useTheme()

  const getImagePath = (model: ChatModel) => {
    switch (model) {
      case 'gpt-4':
      case 'gpt-3.5-turbo':
        return '/assets/icons/ChatGPT_logo.svg'
      default:
        return '/assets/icons/ChatGPT_logo.svg'
    }
  }

  return (
    <div
      className={cn(
        'group flex items-start gap-x-3 py-4 w-full',
        role === 'user' && 'justify-end',
      )}
    >
      {role !== 'user' && (
        <Avatar className='hidden sm:block'>
          <AvatarImage src={avatarSrc || getImagePath(model)} />
        </Avatar>
      )}
      <div
        className={cn(
          'rounded-md px-4 py-2 max-w-sm lg:max-w-lg text-sm ',
          role !== 'user'
            ? 'bg-secondary text-secondary-foreground'
            : 'bg-primary text-primary-foreground',
        )}
      >
        {isLoading && role !== 'user' ? (
          <BeatLoader
            color={theme === 'light' ? 'black' : 'white'}
            size={5}
          />
        ) : (
          <MessageWrapper content={content} />
        )}
      </div>
      {role !== 'user' && (
        <Tooltip>
          <TooltipTrigger
            className={buttonVariants({
              variant: 'ghost',
              size: 'icon',
              className:
                'hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition',
            })}
            onClick={() => copyToClipboard(content)}
          >
            <Copy className='w-4 h-4' />
          </TooltipTrigger>
          <TooltipContent>Copy to clipboard</TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}

export default memo(ChatMessage)
