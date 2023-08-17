'use client'

import React from 'react'
import ChatTabs from './chat-tabs'
import ChatMessages from './chat-messages'
import ChatForm from './chat-form'

const ChatClient = () => {
  return (
    <div className='flex flex-col h-full w-full bg-secondary/50 items-center border-l'>
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
      <div className='flex flex-col h-full max-w-4xl w-full'>
        <ChatMessages />
        <ChatForm />
      </div>
    </div>
  )
}

export default ChatClient
