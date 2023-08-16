'use client'
import React from 'react'
import { SendHorizonal } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const ChatForm = () => {
  return (
    <form className='border-t border-primary/10 py-4 flex items-center gap-x-2'>
      <Input
        placeholder='Type a message'
        className='rounded-lg bg-secondary/10'
      />
      <Button variant='ghost'>
        <SendHorizonal className='w-6 h-6' />
      </Button>
    </form>
  )
}

export default ChatForm
