'use client'
import { SendHorizonal } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ChangeEvent, FormEvent } from 'react'
import { ChatRequestOptions } from 'ai'
import { ClipLoader } from 'react-spinners'
import { ChatIconWithLabel } from './chat-icon'
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
  btnDisabled: boolean
  chatModel: ChatModel
  isPremium: boolean
}

const ChatForm: React.FC<ChatFormProps> = ({
  input,
  handleInputChange,
  onSubmit,
  isLoading,
  btnDisabled,
  chatModel,
}) => {
  return (
    <form
      className='border-t border-b border-primary/10 py-4 flex items-center gap-x-2 ml-1'
      onSubmit={onSubmit}
    >
      <div className='w-max mx-2'>
        <ChatIconWithLabel model={chatModel} />
      </div>
      <Input
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder='Type a message'
        className='rounded-lg bg-secondary/10 flex-grow'
      />
      <Button variant='ghost' type='submit' disabled={btnDisabled}>
        {isLoading ? (
          <>
            Stop generation
            <div>
              <ClipLoader size={24} color='white' />
            </div>
          </>
        ) : (
          <SendHorizonal className='w-6 h-6' />
        )}
      </Button>
    </form>
  )
}

export default ChatForm
