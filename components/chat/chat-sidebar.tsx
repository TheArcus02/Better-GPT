'use client'

import {
  FolderPlus,
  MessageSquarePlus,
  PanelLeftOpen,
  PanelRightOpen,
} from 'lucide-react'
import ChatFolders from './chat-folders'
import { Button, buttonVariants } from '../ui/button'
import { useEffect, useState } from 'react'
import NewChatDialog from './new-chat-dialog'
import NewFolderDialog from './new-folder-dialog'
import { Chat, Folder } from '@prisma/client'
import { DialogTrigger } from '@radix-ui/react-dialog'
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
  const [isPanelOpen, setIsPanelOpen] = useState(true)
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false)
  const [isChatDialogOpen, setIsChatDialogOpen] = useState(false)

  const tabsState = useStore(useTabsStore, (state) => state)

  const router = useRouter()

  useEffect(() => {
    if (!tabsState) return
    if (tabsState.chatTabs.length > 0) {
      router.push(`/app/chat/${tabsState.chatTabs[0].id}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePanelChange = () => {
    setIsPanelOpen((prev) => !prev)
  }

  const handleFolderDialogChange = (open: boolean) => {
    setIsFolderDialogOpen(open)
  }

  const handleChatDialogChange = (open: boolean) => {
    setIsChatDialogOpen(open)
  }

  return (
    <div className='flex flex-col gap-4 h-full pt-6 border-r'>
      <div className='flex gap-2 items-center px-4'>
        <Button
          variant='ghost'
          size='icon'
          onClick={handlePanelChange}
          className='hidden md:flex'
        >
          {isPanelOpen ? <PanelRightOpen /> : <PanelLeftOpen />}
        </Button>
        {isPanelOpen && <h1 className='text-2xl font-bold'>Chats</h1>}
      </div>
      {isPanelOpen && (
        <>
          <div className='flex gap-3 min-w-max px-4'>
            {folders.length !== 0 && (
              <NewChatDialog
                folders={folders}
                isPremium={isPremium}
                open={isChatDialogOpen}
                onOpenChange={handleChatDialogChange}
              >
                <DialogTrigger asChild>
                  <Button>
                    <MessageSquarePlus size={24} className='mr-2' />
                    New Chat
                  </Button>
                </DialogTrigger>
              </NewChatDialog>
            )}

            <Tooltip>
              <NewFolderDialog
                open={isFolderDialogOpen}
                onOpenChange={handleFolderDialogChange}
                defaultOpen={folders.length === 0}
              >
                <TooltipTrigger asChild>
                  <DialogTrigger
                    className={buttonVariants({
                      variant: 'outline',
                    })}
                  >
                    <FolderPlus
                      size={24}
                      className={folders.length === 0 ? 'mr-2' : ''}
                    />
                    {folders.length === 0 && 'New folder'}
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>New folder</TooltipContent>
              </NewFolderDialog>
            </Tooltip>
          </div>

          <div className='bg-background h-[inherit] flex flex-col justify-between overflow-auto border-t'>
            <ScrollArea className='min-h-[150px]'>
              <ChatFolders folders={folders} isPremium={isPremium} />
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
