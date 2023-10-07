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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../ui/tooltip'
import GetPremiumCard from '../get-premium-card'
import { ScrollArea } from '../ui/scroll-area'

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
        <Tooltip>
          <TooltipTrigger>
            <Button variant='ghost' size='icon' onClick={handleOpen}>
              {isOpen ? <PanelRightOpen /> : <PanelLeftOpen />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Toggle sidebar</TooltipContent>
        </Tooltip>
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
            <Tooltip>
              <Dialog>
                <TooltipTrigger>
                  <DialogTrigger>
                    <Button variant='outline'>
                      <FolderPlus size={24} />
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>New folder</TooltipContent>
                <NewFolderDialog />
              </Dialog>
            </Tooltip>
          </div>

          <div className='bg-background flex flex-col max-h-[98vh] h-[inherit] justify-between'>
            <ScrollArea>
              {/* <div className=''> */}
              <ChatFolders folders={folders} />
              {/* </div> */}
            </ScrollArea>

            {/* TODO: check if pro then render */}
            <div className='mx-6 mb-10'>
              <GetPremiumCard />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ChatSidebar
