'use client'

import {
  FolderPlus,
  MessageSquarePlus,
  PanelLeftOpen,
  PanelRightOpen,
} from 'lucide-react'
import ChatFolders from './chat-folders'
import { Button } from '../ui/button'
import { useState } from 'react'
import NewChatDialog from './new-chat-dialog'
import NewFolderDialog from './new-folder-dialog'
import { Chat, Folder } from '@prisma/client'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Dialog } from '../ui/dialog'
import Image from 'next/image'

interface ChatSidebarProps {
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

const ChatSidebar: React.FC<ChatSidebarProps> = ({ folders }) => {
  const [isOpen, setIsOpen] = useState(true)

  const handleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className='flex flex-col gap-4 h-full bg-secondary pt-6'>
      <div className='flex gap-2 items-center px-4'>
        <Button variant='ghost' size='icon' onClick={handleOpen}>
          {isOpen ? <PanelRightOpen /> : <PanelLeftOpen />}
        </Button>
        {isOpen && <h1 className='text-2xl font-bold'>Chats</h1>}
      </div>
      {isOpen && (
        <>
          <div className='flex gap-3 min-w-max px-4'>
            <Dialog>
              <DialogTrigger>
                <Button>
                  <MessageSquarePlus size={24} className='mr-2' />
                  New Chat
                </Button>
              </DialogTrigger>
              <NewChatDialog folders={folders} />
            </Dialog>
            <Dialog>
              <DialogTrigger>
                <Button variant='outline'>
                  <FolderPlus size={24} />
                </Button>
              </DialogTrigger>
              <NewFolderDialog />
            </Dialog>
          </div>

          <div className='bg-background flex flex-col h-full justify-between'>
            <ChatFolders folders={folders} />

            {/* TODO: check if pro then render */}
            <div className='pt-24 relative px-4 py-6 bg-primary/20 mx-6 mb-10 rounded-3xl flex flex-col  items-center max-w-xs'>
              <Image
                src='/assets/Developer.svg'
                width={200}
                height={200}
                alt='upgrade'
                className='absolute top-0 -mt-24'
              />
              <h2 className='text-2xl font-light mt-2'>
                Get Premium
              </h2>
              <p className='text-sm text-foreground/50 text-center '>
                Unlock the full potential of the AI. Get unlimited
                access to all features.
              </p>
              <Button variant='outline' size='lg' className='mt-6'>
                Buy Premium
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ChatSidebar
