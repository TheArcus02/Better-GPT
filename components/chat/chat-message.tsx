'use client'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '../ui/button'
import { Copy, Save } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { toast } from '../ui/use-toast'
import { BeatLoader } from 'react-spinners'
import { useTheme } from 'next-themes'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  atomDark,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Tooltip, TooltipContent } from '../ui/tooltip'
import { TooltipTrigger } from '@radix-ui/react-tooltip'

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

  const onCopy = (content: string) => {
    if (!content) {
      return
    }

    navigator.clipboard.writeText(content)
    toast({
      description: 'Copied to clipboard',
      duration: 3000,
    })
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
          <ReactMarkdown
            components={{
              pre: ({ node, ...props }) => (
                <div className=' w-full my-2 '>
                  <pre
                    {...props}
                    className='whitespace-pre-wrap rounded-md'
                  />
                </div>
              ),
              code: ({
                node,
                inline,
                className,
                children,
                ...props
              }) => {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <>
                    <div className='py-2 rounded-t-md w-full bg-secondary flex items-center justify-between'>
                      <span className='ml-3 text-muted-foreground text-sm'>
                        {className?.split('-')[1]}
                      </span>
                      <button
                        className='flex items-center text-sm text-muted-foreground mr-3 hover:text-primary-foreground transition'
                        onClick={() =>
                          onCopy(String(children).replace(/\n$/, ''))
                        }
                      >
                        <Save className='w-4 h-4 mr-1' />
                        Copy code
                      </button>
                    </div>

                    <SyntaxHighlighter
                      {...props}
                      // eslint-disable-next-line react/no-children-prop
                      children={String(children).replace(/\n$/, '')}
                      style={theme === 'light' ? oneLight : atomDark}
                      language={match[1]}
                      PreTag='div'
                      customStyle={{
                        margin: '0',
                        borderRadius: '0',
                        borderBottomLeftRadius:
                          'calc(var(--radius) - 2px)',
                        borderBottomRightRadius:
                          'calc(var(--radius) - 2px)',
                      }}
                    />
                  </>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
              ul: ({ node, ordered, className, ...props }) => (
                <ul className='list-disc space-y-2 py-2' {...props} />
              ),
              ol: ({ node, ordered, className, ...props }) => (
                <ol
                  className='list-decimal space-y-2 py-2'
                  {...props}
                />
              ),
              li: ({ node, className, ...props }) => (
                <li className='ml-4' {...props} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
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
            onClick={() => onCopy(content)}
          >
            <Copy className='w-4 h-4' />
          </TooltipTrigger>
          <TooltipContent>Copy to clipboard</TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}

export default ChatMessage
