'use client'

import { cn } from '@/lib/utils'
import React from 'react'

type Tab = {
  name: string
  active: boolean
}

const ChatTabs = ({ tabNames }: { tabNames: Tab[] }) => {
  return (
    <div className='flex mt-4'>
      {tabNames.map((tab, index) => (
        <div
          className={cn(
            'px-10 py-1 rounded-t-lg border cursor-pointer',
            tab.active
              ? 'border-muted-foreground/40 bg-background/40'
              : 'border-transparent bg-background',
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
