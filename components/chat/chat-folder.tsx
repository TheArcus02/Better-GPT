import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderEdit,
  FolderX,
  MessageSquarePlus,
} from 'lucide-react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '../ui/context-menu'
import { useEffect, useRef, useState } from 'react'
import ChatFile from './chat-file'
import { Chat } from '@prisma/client'
import { AlertDialog, AlertDialogTrigger } from '../ui/alert-dialog'
import axios from 'axios'
import { toast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import { Dialog } from '../ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import NewChatDialog from './new-chat-dialog'
import CustomAlertDialog from '../custom-alert-dialog'

interface ChatFolderProps {
  name: string
  chatsCount: number
  id: string
  chats: (Chat & {
    _count: {
      messages: number
    }
  })[]
  isPremium: boolean
}

const ChatFolder: React.FC<ChatFolderProps> = ({
  name,
  chatsCount,
  chats,
  id,
  isPremium,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const cilckableRef = useRef<HTMLDivElement>(null)
  const [folderName, setFolderName] = useState(name)

  const router = useRouter()

  const handleOpen = () => {
    if (isEditMode) return
    setIsOpen((prev) => !prev)
  }

  const handleChangeEditMode = () => {
    setIsEditMode((prev) => !prev)
  }

  const handleAddNewChat = () => {
    setIsOpen(true)
    // TODO: add new chat with api
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/chat/folder/${id}`)
      toast({
        description: 'Folder deleted',
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

  useEffect(() => {
    if (isEditMode) {
      const UpdateFolderName = async (newName: string) => {
        try {
          setFolderName(newName)
          await axios.patch(`/api/chat/folder/${id}`, {
            name: newName,
          })
          toast({
            description: 'Folder name updated',
            duration: 3000,
          })
        } catch (error) {
          setFolderName(name)
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
          setFolderName(name)
          setIsEditMode(false)
        } else if (e.key === 'Enter') {
          UpdateFolderName(folderName)
          setIsEditMode(false)
        }
      }

      const handleOutsideClick = (e: MouseEvent) => {
        if (
          cilckableRef.current &&
          !cilckableRef.current.contains(e.target as Node)
        ) {
          if (folderName !== name) {
            UpdateFolderName(folderName)
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
  }, [isEditMode, id, name, folderName, router])

  return (
    <div className='flex flex-col gap-2'>
      <Dialog>
        <AlertDialog>
          <ContextMenu>
            <ContextMenuTrigger>
              <div
                className='flex gap-2 items-center hover:bg-muted-foreground/20 transition-colors cursor-pointer px-3 py-1'
                onClick={handleOpen}
                ref={cilckableRef}
              >
                {isOpen ? (
                  <ChevronDown size={24} />
                ) : (
                  <ChevronRight size={24} />
                )}
                <Folder />
                {isEditMode ? (
                  <input
                    type='text'
                    autoFocus
                    onFocus={handleFocus}
                    onChange={(e) => setFolderName(e.target.value)}
                    className='flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none'
                    value={folderName}
                  />
                ) : (
                  <>
                    <h3 className='text-md font-bold'>
                      {folderName}
                    </h3>
                    <span className='text-foreground/50'>
                      {chatsCount}
                    </span>
                  </>
                )}
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <DialogTrigger className='block w-full'>
                <ContextMenuItem onClick={handleAddNewChat}>
                  <MessageSquarePlus className='mr-2' /> New Chat
                </ContextMenuItem>
              </DialogTrigger>
              <ContextMenuItem onClick={handleChangeEditMode}>
                <FolderEdit className='mr-2' />
                Rename
              </ContextMenuItem>
              <AlertDialogTrigger className='block w-full'>
                <ContextMenuItem>
                  <FolderX className='mr-2' />
                  Delete
                </ContextMenuItem>
              </AlertDialogTrigger>
            </ContextMenuContent>
          </ContextMenu>
          <CustomAlertDialog
            title='Are you absolutely sure?'
            description='This action cannot be undone. This will permanently delete
folder and all chats inside from our server.'
            handleDelete={handleDelete}
          />
          <NewChatDialog
            folders={[{ id, name }]}
            isPremium={isPremium}
          />
        </AlertDialog>
      </Dialog>

      {/* Chats */}
      {chats.length !== 0 &&
        isOpen &&
        chats.map((chat) => (
          <ChatFile
            key={chat.id}
            id={chat.id}
            name={chat.name}
            count={chat._count.messages}
            model={chat.model as ChatModel}
          />
        ))}
    </div>
  )
}

export default ChatFolder

//
