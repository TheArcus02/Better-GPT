'use client'

import { cn } from '@/lib/utils'
import { useEffect } from 'react'
import MobileChatSidebar from './mobile-chat-sidebar'
import { useTabsStore } from '@/hooks/use-tabs'
import { useRouter } from 'next/navigation'
import { MenuSquare, MessageSquare, X } from 'lucide-react'
import useStore from '@/hooks/use-store'
import { Button } from '../ui/button'
import { useMobileChatSidebar } from '@/hooks/use-mobile-chat-sidebar'

interface ChatTabsProps {
  chatId: string
}

const ChatTabs: React.FC<ChatTabsProps> = ({ chatId }) => {
  const router = useRouter()

  const tabsState = useStore(useTabsStore, (state) => state)
  const sidebarState = useStore(
    useMobileChatSidebar,
    (state) => state,
  )

  const handleOnClick = (id: string, name: string) => {
    if (!tabsState) return
    if (tabsState.activeChatTab?.id === id) return

    tabsState.setActiveChatTab({
      id,
      name,
    })
    router.push(`/app/chat/${id}`)
  }

  useEffect(() => {
    if (!tabsState) return
    if (tabsState.chatTabs.length > 0) {
      if (!tabsState.activeChatTab) {
        // console.log(
        //   'no active chat tab. Setting last tab as active...',
        // )
        tabsState.setActiveChatTab(
          tabsState.chatTabs[tabsState.chatTabs.length - 1],
        )
      } else {
        if (chatId === tabsState.activeChatTab.id) return
        // console.log('active chat tab found. Pushing to route...')
        router.push(`/app/chat/${tabsState.activeChatTab.id}`)
      }
    } else {
      // console.log('no chat tabs')
      router.push('/app/chat')
    }
  }, [tabsState, router, chatId])

  if (!tabsState || !sidebarState) return null

  return (
    <div className='flex justify-between w-full border-b-2 bg-background/60'>
      <div className='flex overflow-x-auto'>
        {tabsState.chatTabs.map(({ id, name }) => (
          <div
            key={id}
            className={cn(
              'group px-3 py-5 md:py-2.5 text-xs md:text-sm  text-center font-semibold cursor-pointer flex items-center justify-between',
              id === tabsState.activeChatTab?.id
                ? 'text-foreground bg-secondary border-foreground border-b'
                : 'text-muted-foreground border-l border-r border-black bg-background/40 hover:bg-secondary/60',
            )}
            onClick={() => handleOnClick(id, name)}
          >
            <MessageSquare className='mr-2.5 w-4 h-4 hidden md:block' />
            {name}

            <X
              className={cn(
                'ml-2.5 w-6 h-6 md:w-4 md:h-4 hover:text-foreground transition-colors',
                id === tabsState.activeChatTab?.id
                  ? 'text-foreground/80'
                  : 'md:invisible md:text-muted-foreground text-muted-foreground/30 group-hover:visible',
              )}
              onClick={(e) => {
                e.stopPropagation()
                tabsState.removeChatTab(id)
              }}
            />
          </div>
        ))}
      </div>
      <div className='md:hidden'>
        <Button
          size='icon'
          variant='ghost'
          onClick={() => sidebarState.setOpen(true)}
          className='flex items-center justify-center h-full mx-3'
        >
          <MenuSquare className='w-9 h-9' />
        </Button>
      </div>
    </div>
  )
}

export default ChatTabs
// px-3 md:px-10
