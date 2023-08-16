import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Copy } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'

// TODO: DELETE type after schema is created
type ChatMessageProps = {
  content: string
  role: 'user' | 'system'
}

const ChatMessage = ({ content, role }: ChatMessageProps) => {
  const onCopy = () => {
    if (!content) {
      return
    }

    navigator.clipboard.writeText(content)
    // TODO: Add toast
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
        {content}
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
