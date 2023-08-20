import { MessageSquarePlus, FolderPlus } from 'lucide-react'
import { ScrollArea } from '../ui/scroll-area'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '../ui/context-menu'
import ChatFolder from './chat-folder'
import { Chat, Folder } from '@prisma/client'

interface ChatFoldersProps {
  folders: ({
    chats: ({
      _count: {
        messages: number
      }
    } & Chat)[]
    _count: {
      chats: number
    }
  } & Folder)[]
}

const ChatFolders: React.FC<ChatFoldersProps> = ({ folders }) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <ScrollArea>
          <div className='flex flex-col gap-3 py-4'>
            {folders.length ? (
              folders.map((folder) => (
                <ChatFolder
                  key={folder.id}
                  name={folder.name}
                  chatsCount={folder._count.chats}
                  chats={folder.chats}
                />
              ))
            ) : (
              <div>No chats</div>
            )}
          </div>
        </ScrollArea>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <MessageSquarePlus className='mr-2' /> New Chat
        </ContextMenuItem>
        <ContextMenuItem>
          <FolderPlus className='mr-2' /> New Folder
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default ChatFolders
