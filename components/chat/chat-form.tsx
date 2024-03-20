'use client'
import { SendHorizonal } from 'lucide-react'
import { Button } from '../ui/button'
import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { ChatRequestOptions } from 'ai'
import { ClipLoader } from 'react-spinners'
import { ChatIconWithLabel } from './chat-icon'
import { Textarea } from '../ui/textarea'

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
  showModel?: boolean
}

const ChatForm: React.FC<ChatFormProps> = ({
  input,
  handleInputChange,
  onSubmit,
  isLoading,
  btnDisabled,
  chatModel,
  showModel = true,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`

      if (textAreaRef.current.scrollHeight > 104) {
        textAreaRef.current.style.overflowY = 'auto'
      } else {
        textAreaRef.current.style.overflowY = 'hidden'
      }
    }
    handleInputChange(e)
  }

  return (
    <form
      className='border-t border-b border-primary/10 py-4 flex items-center gap-x-2 ml-1'
      onSubmit={onSubmit}
    >
      {showModel && (
        <div className='w-max mx-2'>
          <ChatIconWithLabel model={chatModel} />
        </div>
      )}
      <Textarea
        disabled={isLoading}
        value={input}
        onChange={handleChange}
        placeholder='Type a message...'
        className='rounded-lg bg-secondary/10 flex-grow min-h-0 max-h-52 resize-none py-3'
        rows={1}
        ref={textAreaRef}
      />
      <Button
        variant='ghost'
        type='submit'
        disabled={btnDisabled || !input}
      >
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
