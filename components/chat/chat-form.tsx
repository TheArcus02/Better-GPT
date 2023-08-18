'use client'
import { SendHorizonal } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

interface ChatFormProps {
  onSubmit: (data: ChatFormValidatorType) => void
  isLoading: boolean
}

const ChatFormValidator = z.object({
  prompt: z.string().nonempty({ message: 'Prompt cannot be empty' }),
})

export type ChatFormValidatorType = z.infer<typeof ChatFormValidator>

const ChatForm: React.FC<ChatFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChatFormValidatorType>({
    resolver: zodResolver(ChatFormValidator),
  })

  return (
    <form
      className='border-t border-primary/10 py-4 flex items-center gap-x-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        placeholder='Type a message'
        className='rounded-lg bg-secondary/10'
        {...register('prompt')}
      />
      <Button variant='ghost' type='submit' disabled={isLoading}>
        <SendHorizonal className='w-6 h-6' />
      </Button>
    </form>
  )
}

export default ChatForm
