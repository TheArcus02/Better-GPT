'use client'

import {
  FolderPlus,
  MessageSquarePlus,
  PanelLeftOpen,
  PanelRightOpen,
} from 'lucide-react'
import ChatFolders from './chat-folders'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
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
import useStore from '@/hooks/use-store'
import { useTabsStore } from '@/hooks/use-tabs'
import { useRouter } from 'next/navigation'

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
  isPremium: boolean
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  folders,
  isPremium,
}) => {
  const [isOpen, setIsOpen] = useState(true)
  const tabsState = useStore(useTabsStore, (state) => state)

  const router = useRouter()

  useEffect(() => {
    if (!tabsState) return
    if (tabsState.chatTabs.length > 0) {
      router.push(`/app/chat/${tabsState.chatTabs[0].id}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className='flex flex-col gap-4 h-full bg-secondary pt-6'>
      <div className='flex gap-2 items-center px-4'>
        <Button
          variant='ghost'
          size='icon'
          onClick={handleOpen}
          className='hidden md:flex'
        >
          {isOpen ? <PanelRightOpen /> : <PanelLeftOpen />}
        </Button>
        {isOpen && <h1 className='text-2xl font-bold'>Chats</h1>}
      </div>
      {isOpen && (
        <>
          <div className='flex gap-3 min-w-max px-4'>
            {folders.length !== 0 && (
              <Dialog>
                <DialogTrigger>
                  <Button>
                    <MessageSquarePlus size={24} className='mr-2' />
                    New Chat
                  </Button>
                </DialogTrigger>
                <NewChatDialog folders={folders} />
              </Dialog>
            )}

            <Tooltip>
              <Dialog>
                <TooltipTrigger>
                  <DialogTrigger>
                    <Button variant='outline' className='w-full'>
                      <FolderPlus
                        size={24}
                        className={folders.length === 0 ? 'mr-2' : ''}
                      />
                      {folders.length === 0 && 'New folder'}
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>New folder</TooltipContent>
                <NewFolderDialog />
              </Dialog>
            </Tooltip>
          </div>

          <div className='bg-background h-[inherit] flex flex-col justify-between overflow-auto'>
            <ScrollArea className='min-h-[150px]'>
              <ChatFolders folders={folders} />
            </ScrollArea>

            {!isPremium && (
              <div className='mx-6 mb-10'>
                <GetPremiumCard />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default ChatSidebar
