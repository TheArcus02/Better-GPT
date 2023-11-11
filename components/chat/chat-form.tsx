'use client'
import { Brain, SendHorizonal } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
} from 'react'
import { ChatRequestOptions } from 'ai'
import { ClipLoader } from 'react-spinners'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { RiOpenaiFill } from 'react-icons/ri'
import { Badge } from '../ui/badge'

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
  setChatModel: Dispatch<SetStateAction<ChatModel>>
  isPremium: boolean
}

const ChatForm: React.FC<ChatFormProps> = ({
  input,
  handleInputChange,
  onSubmit,
  isLoading,
  btnDisabled,
  chatModel,
  setChatModel,
  isPremium,
}) => {
  return (
    <form
      className='border-t border-b border-primary/10 py-4 flex items-center gap-x-2 ml-1'
      onSubmit={onSubmit}
    >
      <Input
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder='Type a message'
        className='rounded-lg bg-secondary/10 flex-grow'
      />
      <Select
        defaultValue='gpt-3.5-turbo'
        value={chatModel}
        onValueChange={(val) => setChatModel(val as ChatModel)}
      >
        <SelectTrigger className='w-[180px] hidden md:flex'>
          <SelectValue placeholder='engine' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='gpt-3.5-turbo'>
            <div className='flex items-center'>
              <RiOpenaiFill className='w-5 h-5 mr-2' />
              GPT-3.5
            </div>
          </SelectItem>
          <SelectItem value='gpt-4' disabled={!isPremium}>
            <div className='flex items-center'>
              <RiOpenaiFill className='w-5 h-5 mr-2' />
              GPT-4
              {!isPremium && <Badge className='ml-2'>Pro</Badge>}
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
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
