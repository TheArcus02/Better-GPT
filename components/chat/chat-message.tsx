import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Copy } from 'lucide-react'
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

export interface ChatMessageProps {
  content: string
  role: string
  isLoading?: boolean
  id?: string
  userId?: string
  chatId?: string
  createdAt?: Date
  updatedAt?: Date
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
}) => {
  const { theme } = useTheme()

  const onCopy = () => {
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
          <AvatarImage src='https://github.com/shadcn.png' />
        </Avatar>
      )}
      <div
        className={cn(
          'rounded-md px-4 py-2 max-w-sm text-sm ',
          role !== 'user' ? 'bg-foreground/10' : 'bg-primary/50',
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
                <div className=' w-full my-2 p-2 rounded-lg bg-black/10'>
                  <pre {...props} className='whitespace-pre-wrap ' />
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
                  <SyntaxHighlighter
                    {...props}
                    // eslint-disable-next-line react/no-children-prop
                    children={String(children).replace(/\n$/, '')}
                    style={theme === 'light' ? oneLight : atomDark}
                    language={match[1]}
                    PreTag='div'
                    wrapLines={true}
                    wrapLongLines={true}
                  />
                ) : (
                  <code
                    // className='rounded-lg p-1 bg-black/10'
                    className={className}
                    {...props}
                  >
                    {children}
                  </code>
                )
              },
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
      {role !== 'user' && (
        <Button
          onClick={onCopy}
          className='hidden sm:block opacity-0 group-hover:opacity-100 transition'
          size='icon'
          variant='ghost'
        >
          <Copy className='w-4 h-4' />
        </Button>
      )}
    </div>
  )
}

export default ChatMessage
