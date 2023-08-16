'use client'

import { cn } from '@/lib/utils'
import React from 'react'

type Tab = {
  name: string
  active: boolean
}

const ChatTabs = ({ tabNames }: { tabNames: Tab[] }) => {
  return (
    <div className='flex mt-4 w-full border-b-2'>
      {tabNames.map((tab, index) => (
        <div
          className={cn(
            'px-10 py-2 rounded-t-lg border-t-2 border-l-2 border-r-2 text-sm font-bold text-center',
            tab.active
              ? 'border-muted-foreground/40 bg-background/40'
              : 'border-transparent bg-background hover:bg-background/40 cursor-pointer',
          )}
          key={tab.name + index}
        >
          {tab.name}
        </div>
      ))}
    </div>
  )
}

export default ChatTabs
