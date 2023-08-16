'use client'

import React from 'react'
import ChatMessage from './chat-message'

const ChatMessages = () => {
  return (
    <div className='flex-1 overflow-y-auto pr-4 w-full pt-6'>
      <ChatMessage
        role='system'
        content='Hi, Im your AI assistant. How can I help you?'
      />
      <ChatMessage role='user' content='Help me write an essay...' />
    </div>
  )
}

export default ChatMessages
