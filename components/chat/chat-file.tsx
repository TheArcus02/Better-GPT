import { useEffect, useState } from 'react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '../ui/context-menu'
import { MessageSquare, PencilLine, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatFileProps {
  name: string
  count: number
}

const ChatFile: React.FC<ChatFileProps> = ({ name, count }) => {
  // TODO: add new chat when user presses enter or clicks away

  const [isEditMode, setIsEditMode] = useState(false)

  const handleChangeEditMode = () => {
    setIsEditMode((prev) => !prev)
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
  }

  useEffect(() => {
    if (isEditMode) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' || e.key === 'Enter') {
          setIsEditMode(false)
          // TODO: update chat name with api
        }
      }

      window.addEventListener('keydown', handleKeyDown)

      return () => {
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isEditMode])

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className={cn(
            'pl-11 flex gap-2 items-center hover:bg-muted-foreground/20 transition-colors cursor-pointer',
            isEditMode && 'bg-muted-foreground/20',
          )}
        >
          <MessageSquare size={24} />
          {isEditMode ? (
            <input
              type='text'
              autoFocus
              onFocus={handleFocus}
              className='flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none'
              defaultValue={name}
            />
          ) : (
            <h4 className=''>{name}</h4>
          )}

          {count !== 0 ||
            (isEditMode && (
              <span className='text-foreground/50'>{count}</span>
            ))}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleChangeEditMode}>
          <PencilLine className='mr-2' />
          Rename
        </ContextMenuItem>
        <ContextMenuItem>
          <XCircle className='mr-2' />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default ChatFile
