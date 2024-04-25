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
  isPremium: boolean
}

const ChatFolders: React.FC<ChatFoldersProps> = ({
  folders,
  isPremium,
}) => {
  const [isChatDialogOpen, setIsChatDialogOpen] = useState(false)
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false)

  const handleChatDialogChange = (open: boolean) => {
    setIsChatDialogOpen(open)
  }

  const handleFolderDialogChange = (open: boolean) => {
    setIsFolderDialogOpen(open)
  }

  return (
    <NewChatDialog
      folders={folders}
      isPremium={isPremium}
      open={isChatDialogOpen}
      onOpenChange={handleChatDialogChange}
    >
      <NewFolderDialog
        open={isFolderDialogOpen}
        onOpenChange={handleFolderDialogChange}
      >
        <ContextMenu>
          <ContextMenuTrigger>
            <ScrollArea>
              <div className='flex flex-col gap-3 py-4 '>
                {folders.length ? (
                  folders.map((folder) => (
                    <ChatFolder
                      key={folder.id}
                      id={folder.id}
                      name={folder.name}
                      chatsCount={folder._count.chats}
                      chats={folder.chats}
                      isPremium={isPremium}
                    />
                  ))
                ) : (
                  <p className='text-secondary-foreground/60 text-center'>
                    No folders created.
                  </p>
                )}
              </div>
            </ScrollArea>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              onClick={() => handleChatDialogChange(true)}
            >
              <MessageSquarePlus className='mr-2' /> New Chat
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => handleFolderDialogChange(true)}
            >
              <FolderPlus className='mr-2' /> New Folder
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </NewFolderDialog>
    </NewChatDialog>
  )
}

export default ChatFolders
