import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderEdit,
  FolderX,
  MessageSquare,
  MessageSquarePlus,
  PencilLine,
  XCircle,
} from 'lucide-react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '../ui/context-menu'
import { useState } from 'react'
import ChatFile from './chat-file'

interface ChatFolderProps {
  name: string
  chatsCount: number
  // ...
  // TODO: add props when models will be ready
}

const ChatFolder = ({ name, chatsCount }: ChatFolderProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  const handleAddNewChat = () => {
    setIsOpen(true)
    // TODO: add new chat with api
  }

  return (
    <div className='flex flex-col gap-2'>
      {/* Folder Name */}
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className='flex gap-2 items-center hover:bg-muted-foreground/20 transition-colors cursor-pointer px-3 py-1'
            onClick={handleOpen}
          >
            {isOpen ? (
              <ChevronDown size={24} />
            ) : (
              <ChevronRight size={24} />
            )}
            <Folder />
            <h3 className='text-md font-bold'>{name}</h3>
            <span className='text-foreground/50'>{chatsCount}</span>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={handleAddNewChat}>
            <MessageSquarePlus className='mr-2' /> New Chat
          </ContextMenuItem>
          <ContextMenuItem>
            <FolderEdit className='mr-2' />
            Rename
          </ContextMenuItem>
          <ContextMenuItem>
            <FolderX className='mr-2' />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {/* Chats */}
      {isOpen && <ChatFile name='Chat' count={23} />}
    </div>
  )
}

export default ChatFolder
