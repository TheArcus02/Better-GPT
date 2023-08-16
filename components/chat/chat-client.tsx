'use client'

import React from 'react'
import ChatTabs from './chat-tabs'
import ChatMessages from './chat-messages'

const ChatClient = () => {
  return (
    <div className='flex flex-col h-full w-full bg-secondary/50'>
      <ChatTabs
        tabNames={[
          {
            name: 'Chat 1',
            active: true,
          },
          { name: 'Chat 2', active: false },
          { name: 'Chat 3', active: false },
        ]}
      />
      <ChatMessages />
    </div>
  )
}

export default ChatClient
