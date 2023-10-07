'use client'
import { SendHorizonal } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ChangeEvent, FormEvent } from 'react'
import { ChatRequestOptions } from 'ai'

interface ChatFormProps {
  input: string
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>,
  ) => void
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined,
  ) => void
  isLoading: boolean
}

const ChatForm: React.FC<ChatFormProps> = ({
  input,
  handleInputChange,
  onSubmit,
  isLoading,
}) => {
  return (
    <form
      className='border-t border-b border-primary/10 py-4 flex items-center gap-x-2'
      onSubmit={onSubmit}
    >
      <Input
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder='Type a message'
        className='rounded-lg bg-secondary/10'
      />
      <Button variant='ghost' type='submit' disabled={isLoading}>
        <SendHorizonal className='w-6 h-6' />
      </Button>
    </form>
  )
}

export default ChatForm
