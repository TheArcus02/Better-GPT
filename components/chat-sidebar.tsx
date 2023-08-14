'use client'

import {
  ArrowLeftToLine,
  FolderPlus,
  MessageSquarePlus,
} from 'lucide-react'
import { Button } from './ui/button'

import ChatFolders from './chat-folders'

const ChatSidebar = () => {
  return (
    <div className='flex flex-col gap-4 h-full bg-secondary  py-4'>
      <div className='flex gap-3 items-center px-6'>
        <Button variant='ghost'>
          <ArrowLeftToLine />
        </Button>
        <h1 className='text-2xl font-bold'>Chats</h1>
      </div>
      <div className='px-6 bg-'>
        <div className='flex gap-3'>
          <Button variant='outline'>
            <MessageSquarePlus size={24} className='mr-2' />
            New Chat
          </Button>
          <Button variant='outline'>
            <FolderPlus size={24} />
          </Button>
        </div>
      </div>
      <div className='bg-background'>
        <ChatFolders />
      </div>
    </div>
  )
}

export default ChatSidebar
