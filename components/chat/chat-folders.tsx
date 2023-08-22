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
import { Dialog } from '../ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import NewChatDialog from './new-chat-dialog'
import { useState } from 'react'
import NewFolderDialog from './new-folder-dialog'

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
  const [dialogType, setDialogType] = useState<
    null | 'chat' | 'folder'
  >(null)

  const handleOpenDialog = (type: 'chat' | 'folder') => {
    setDialogType(type)
  }

  return (
    <Dialog>
      <ContextMenu>
        <ContextMenuTrigger>
          <ScrollArea>
            <div className='flex flex-col gap-3 py-4'>
              {folders.length ? (
                folders.map((folder) => (
                  <ChatFolder
                    key={folder.id}
                    id={folder.id}
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
          <DialogTrigger className='block w-full'>
            <ContextMenuItem onClick={() => handleOpenDialog('chat')}>
              <MessageSquarePlus className='mr-2' /> New Chat
            </ContextMenuItem>
          </DialogTrigger>
          <DialogTrigger className='block w-full'>
            <ContextMenuItem
              onClick={() => handleOpenDialog('folder')}
            >
              <FolderPlus className='mr-2' /> New Folder
            </ContextMenuItem>
          </DialogTrigger>
        </ContextMenuContent>
      </ContextMenu>
      {dialogType === 'chat' ? (
        <NewChatDialog folders={folders} />
      ) : (
        <NewFolderDialog />
      )}
    </Dialog>
  )
}

export default ChatFolders
