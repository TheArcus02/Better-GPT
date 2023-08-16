'use client'

import {
  FolderPlus,
  MessageSquarePlus,
  PanelRightOpen,
} from 'lucide-react'
import ChatFolders from './chat-folders'
import { Button } from '../ui/button'

const ChatSidebar = () => {
  return (
    <div className='flex flex-col gap-4 h-full bg-secondary py-6'>
      <div className='flex gap-2 items-center pl-3'>
        <Button variant='ghost' size='icon'>
          <PanelRightOpen />
        </Button>
        <h1 className='text-2xl font-bold'>Chats</h1>
      </div>

      <div className='flex gap-3 px-6 min-w-max'>
        <Button>
          <MessageSquarePlus size={24} className='mr-2' />
          New Chat
        </Button>
        <Button variant='outline'>
          <FolderPlus size={24} />
        </Button>
      </div>

      <div className='bg-background'>
        <ChatFolders />
      </div>
    </div>
  )
}

export default ChatSidebar
