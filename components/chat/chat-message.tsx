import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Copy } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { toast } from '../ui/use-toast'
import { BeatLoader } from 'react-spinners'
import { useTheme } from 'next-themes'

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
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' />
        </Avatar>
      )}
      <div
        className={cn(
          'rounded-md px-4 py-2 max-w-sm text-sm ',
          role !== 'user' ? 'bg-foreground/10' : 'bg-primary/50',
        )}
      >
        {isLoading ? (
          <BeatLoader
            color={theme === 'light' ? 'black' : 'white'}
            size={5}
          />
        ) : (
          content
        )}
      </div>
      {role !== 'user' && (
        <Button
          onClick={onCopy}
          className='opacity-0 group-hover:opacity-100 transition'
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
