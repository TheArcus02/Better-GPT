import { MessageSquare } from 'lucide-react'
import React from 'react'
import { RiOpenaiFill } from 'react-icons/ri'

interface ChatIconProps {
  model: ChatModel
  size?: number
}

export const ChatIcon = ({ model, size = 24 }: ChatIconProps) => {
  switch (model) {
    case 'gpt-4':
    case 'gpt-3.5-turbo':
      return <RiOpenaiFill size={size} />
    default:
      return <MessageSquare size={size} />
  }
}

export const ChatIconWithLabel = ({
  model,
  size = 24,
}: ChatIconProps) => {
  switch (model) {
    case 'gpt-4':
      return (
        <div className='flex items-center gap-x-2 w-max'>
          <RiOpenaiFill size={size} />
          <span className='text-sm'>GPT-4</span>
        </div>
      )
    case 'gpt-3.5-turbo':
      return (
        <div className='flex items-center gap-x-2 w-max'>
          <RiOpenaiFill size={size} />
          <span className='text-sm'>GPT-3</span>
        </div>
      )
    default:
      return (
        <div className='flex items-center gap-x-2 w-max'>
          <MessageSquare size={size} />
          <span className='text-sm'>Unknown</span>
        </div>
      )
  }
}
