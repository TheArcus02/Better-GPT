'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import MobileChatSidebar from './mobile-chat-sidebar'
import useTabs from '@/hooks/use-tabs'
import { useRouter } from 'next/navigation'

const ChatTabs = () => {
  const router = useRouter()

  const { activeChatTab, setActiveChatTab, setChatTabs, chatTabs } =
    useTabs()

  const handleOnClick = (id: string, name: string) => {
    setActiveChatTab({
      id,
      name,
    })
    router.push(`/app/chat/${id}`)
  }

  return (
    <div className='flex justify-between pt-2 w-full border-b-2'>
      <div className='flex'>
        {chatTabs.map(({ id, name }) => (
          <div
            key={id}
            className={cn(
              'px-3 md:px-10 py-2 rounded-t-lg border-t border-l border-r text-sm font-bold text-center',
              id === activeChatTab?.id
                ? 'border-muted-foreground/40 bg-background/10 '
                : 'border-transparent bg-background hover:bg-background/40 cursor-pointer',
            )}
            onClick={() => handleOnClick(id, name)}
          >
            {name}
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
