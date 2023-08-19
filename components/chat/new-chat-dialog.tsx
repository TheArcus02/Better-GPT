'use client'

import React, { useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'

interface NewChatFormProps {
  onSubmit: (data: NewChatFormValidatorType) => void
  isLoading: boolean
}

const NewChatFormValidator = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  folder: z.string().min(1, { message: 'Specify folder' }),
})

export type NewChatFormValidatorType = z.infer<
  typeof NewChatFormValidator
>

const NewChatDialog = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const form = useForm<NewChatFormValidatorType>({
    resolver: zodResolver(NewChatFormValidator),
  })

  const onSubmit = (data: NewChatFormValidatorType) => {
    console.log('type', typeof data.folder)
    console.log(data)
  }

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Chat</DialogTitle>
          <DialogDescription>Create new chat</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid gap-4 py-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Name</FormLabel>
                    <FormControl className='col-span-3'>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='folder'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>
                      Email
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className='col-span-3'>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Folder' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='none'>None</SelectItem>
                        <SelectItem value='General'>
                          General
                        </SelectItem>
                        <SelectItem value='Other'>Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type='submit'>Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default NewChatDialog
