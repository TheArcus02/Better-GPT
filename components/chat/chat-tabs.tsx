'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import MobileChatSidebar from './mobile-chat-sidebar'

type Tab = {
  name: string
  active: boolean
}

const ChatTabs = ({ tabNames }: { tabNames: Tab[] }) => {
  return (
    <div className='flex justify-between pt-2 w-full border-b-2'>
      <div className='flex'>
        {tabNames.map((tab, index) => (
          <div
            className={cn(
              'px-3 md:px-10 py-2 rounded-t-lg border-t border-l border-r text-sm font-bold text-center',
              tab.active
                ? 'border-muted-foreground/40 bg-background/10 '
                : 'border-transparent bg-background hover:bg-background/40 cursor-pointer',
            )}
            key={tab.name + index}
          >
            {tab.name}
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
