import { MessageSquarePlus, FolderPlus } from 'lucide-react'
import { ScrollArea } from '../ui/scroll-area'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '../ui/context-menu'
import ChatFolder from './folder'

const ChatFolders = () => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <ScrollArea>
          <div className='flex flex-col gap-3 py-4'>
            <ChatFolder name='General' chatsCount={1} />
            <ChatFolder name='Other' chatsCount={2} />
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
