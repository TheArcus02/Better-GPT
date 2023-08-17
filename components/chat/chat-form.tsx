'use client'
import React from 'react'
import { SendHorizonal } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const ChatFormValidator = z.object({
  prompt: z.string().nonempty({ message: 'Prompt cannot be empty' }),
})

type ChatFormValidatorType = z.infer<typeof ChatFormValidator>

const ChatForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChatFormValidatorType>({
    resolver: zodResolver(ChatFormValidator),
  })

  const onSubmit = (data: ChatFormValidatorType) => {
    // TODO: Send message to server
  }

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
      <Button variant='ghost' type='submit'>
        <SendHorizonal className='w-6 h-6' />
      </Button>
    </form>
  )
}

export default ChatForm
