'use client'

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
import {
  Select,
  SelectContent,
  SelectItem,
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
import axios, { AxiosError } from 'axios'
import { toast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { RiOpenaiFill } from 'react-icons/ri'
import { Badge } from '../ui/badge'
import * as DialogPrimitive from '@radix-ui/react-dialog'

const NewChatFormValidator = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  model: z.enum(['gpt-3.5-turbo', 'gpt-4']),
  folder: z.string({ required_error: 'Specify folder' }),
})

export type NewChatFormValidatorType = z.infer<
  typeof NewChatFormValidator
>

interface NewChatDialogProps extends DialogPrimitive.DialogProps {
  folders: {
    id: string
    name: string
  }[]
  isPremium: boolean
}

const NewChatDialog: React.FC<NewChatDialogProps> = ({
  folders,
  isPremium,
  open,
  onOpenChange,
  defaultOpen,
  modal,
  children,
}) => {
  const [isAdding, setIsAdding] = useState(false)

  const router = useRouter()
  const form = useForm<NewChatFormValidatorType>({
    resolver: zodResolver(NewChatFormValidator),
    defaultValues: {
      name: 'New Chat',
      model: 'gpt-3.5-turbo',
      folder: folders.length === 1 ? folders[0].id : undefined,
    },
  })

  const onSubmit = async (data: NewChatFormValidatorType) => {
    setIsAdding(true)
    try {
      await axios.post('/api/chat', {
        name: data.name,
        model: data.model,
        folderId: data.folder,
      })
      toast({
        description: 'Chat created successfully',
        duration: 3000,
      })
      if (onOpenChange) {
        onOpenChange(false)
      }
    } catch (error) {
      console.error(error)
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          toast({
            variant: 'destructive',
            description: error.response.data,
            duration: 3000,
          })
          return
        }
      }
      toast({
        variant: 'destructive',
        description: 'something went wrong',
        duration: 3000,
      })
    } finally {
      router.refresh()
      setIsAdding(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      modal={modal}
      defaultOpen={defaultOpen}
    >
      {children}
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
                    <FormMessage className='col-span-4 text-center' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='model'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>
                      Model
                    </FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl className='col-span-3'>
                        <SelectTrigger>
                          <SelectValue placeholder='Select model' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='gpt-3.5-turbo'>
                          <div className='flex items-center'>
                            <RiOpenaiFill className='mr-2 h-5 w-5' />
                            GPT-3.5
                          </div>
                        </SelectItem>
                        <SelectItem
                          value='gpt-4'
                          disabled={!isPremium}
                        >
                          <div className='flex items-center'>
                            <RiOpenaiFill className='mr-2 h-5 w-5' />
                            GPT-4
                            {!isPremium && (
                              <Badge className='ml-2'>Premium</Badge>
                            )}
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className='col-span-4 text-center' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='folder'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>
                      Folder
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
                        {folders.map((folder) => (
                          <SelectItem
                            value={folder.id}
                            key={folder.id}
                          >
                            {folder.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className='col-span-4 text-center' />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type='submit' disabled={isAdding}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default NewChatDialog
