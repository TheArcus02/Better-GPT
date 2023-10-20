'use client'

import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import MobileChatSidebar from './mobile-chat-sidebar'
import useTabs from '@/hooks/use-tabs'
import { useRouter } from 'next/navigation'
import { MessageSquare, X } from 'lucide-react'

const ChatTabs = () => {
  const router = useRouter()

  const {
    activeChatTab,
    setActiveChatTab,
    chatTabs,
    removeActiveChatTab,
    removeChatTab,
  } = useTabs()

  const handleOnClick = (id: string, name: string) => {
    setActiveChatTab({
      id,
      name,
    })
    router.push(`/app/chat/${id}`)
  }

  useEffect(() => {
    console.log('activeChatTab', activeChatTab)
    console.log('chatTabs', chatTabs)
  }, [activeChatTab, chatTabs])

  return (
    <div className='flex justify-between w-full border-b-2 bg-background/60'>
      <div className='flex'>
        {chatTabs.map(({ id, name }) => (
          <div
            key={id}
            className={cn(
              'group px-3 py-2.5 text-sm text-center font-semibold cursor-pointer flex items-center justify-between',
              id === activeChatTab?.id
                ? 'text-foreground bg-secondary border-foreground border-b'
                : 'text-muted-foreground border-l border-r border-black bg-background/40 hover:bg-secondary/60',
            )}
            onClick={() => handleOnClick(id, name)}
          >
            <MessageSquare className='mr-2.5 w-4 h-4' />
            {name}

            <X
              className={cn(
                'ml-2.5 w-4 h-4 hover:text-foreground transition-colors',
                id === activeChatTab?.id
                  ? 'text-foreground/80'
                  : 'invisible text-muted-foreground group-hover:visible',
              )}
              onClick={(e) => {
                e.stopPropagation()
                if (id === activeChatTab?.id) {
                  removeActiveChatTab()
                  router.push(`/app/chat/${chatTabs[length - 1].id}`)
                } else {
                  removeChatTab(id)
                }
              }}
            />
          </div>
        ))}
      </div>
      <div className='md:hidden'>
        <MobileChatSidebar />
      </div>
    </div>
  )
}

export default ChatTabs
// px-3 md:px-10
