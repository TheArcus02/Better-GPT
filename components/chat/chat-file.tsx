import { useEffect, useRef, useState } from 'react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '../ui/context-menu'
import { MessageSquare, PencilLine, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from '../ui/use-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface ChatFileProps {
  id: string
  name: string
  count: number
}

const ChatFile: React.FC<ChatFileProps> = ({ id, name, count }) => {
  // TODO: add alert dialog when user deletes chat
  const router = useRouter()
  const cilckableRef = useRef<HTMLDivElement>(null)

  const [isEditMode, setIsEditMode] = useState(false)
  const [chatName, setChatName] = useState(name)

  const handleChangeEditMode = () => {
    setIsEditMode((prev) => !prev)
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
  }

  useEffect(() => {
    if (isEditMode) {
      const UpdateChatName = async (newName: string) => {
        try {
          setChatName(newName)
          await axios.patch(`/api/chat/${id}`, {
            name: newName,
          })
          toast({
            description: 'Chat name updated',
            duration: 3000,
          })
        } catch (error) {
          setChatName(name)
          console.error(error)
          toast({
            variant: 'destructive',
            description: 'Something went wrong',
            duration: 3000,
          })
        } finally {
          router.refresh()
        }
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setChatName(name)
          setIsEditMode(false)
        } else if (e.key === 'Enter') {
          UpdateChatName(chatName)
          setIsEditMode(false)
        }
      }

      const handleOutsideClick = (e: MouseEvent) => {
        if (
          cilckableRef.current &&
          !cilckableRef.current.contains(e.target as Node)
        ) {
          if (chatName !== name) {
            UpdateChatName(chatName)
          }
          setIsEditMode(false)
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      document.addEventListener('mousedown', handleOutsideClick)

      return () => {
        window.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('mousedown', handleOutsideClick)
      }
    }
  }, [isEditMode, id, name, chatName, router])

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/chat/${id}`)
      toast({
        description: 'Chat deleted',
        duration: 3000,
      })
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        description: 'Something went wrong',
        duration: 3000,
      })
    } finally {
      router.refresh()
    }
  }

  const handleNavigate = () => {
    if (isEditMode) return
    router.push(`/app/chat/${id}`)
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className={cn(
            'pl-11 flex gap-2 items-center hover:bg-muted-foreground/20 transition-colors cursor-pointer',
            isEditMode && 'bg-muted-foreground/20',
          )}
          ref={cilckableRef}
          onClick={handleNavigate}
        >
          <MessageSquare size={24} />
          {isEditMode ? (
            <input
              type='text'
              autoFocus
              onFocus={handleFocus}
              onChange={(e) => setChatName(e.target.value)}
              className='flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none'
              value={chatName}
            />
          ) : (
            <h4 className=''>{chatName}</h4>
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
        <ContextMenuItem onClick={handleDelete}>
          <XCircle className='mr-2' />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default ChatFile
