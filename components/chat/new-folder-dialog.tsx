import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { toast } from '../ui/use-toast'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

const NewFolderFormValidator = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, { message: 'Name is required' }),
})

export type NewFolderFormValidatorType = z.infer<
  typeof NewFolderFormValidator
>

interface NewFolderDialogProps extends DialogPrimitive.DialogProps {}

const NewFolderDialog = ({
  open,
  onOpenChange,
  defaultOpen,
  modal,
  children,
}: NewFolderDialogProps) => {
  const [isAdding, setIsAdding] = useState(false)

  const router = useRouter()
  const form = useForm<NewFolderFormValidatorType>({
    resolver: zodResolver(NewFolderFormValidator),
    defaultValues: {
      name: 'New Folder',
    },
  })

  const onSubmit = async (data: NewFolderFormValidatorType) => {
    setIsAdding(true)
    try {
      await axios.post('/api/chat/folder', data)
      toast({
        description: 'Folder created successfully',
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
      defaultOpen={defaultOpen}
      modal={modal}
    >
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Folder</DialogTitle>
          <DialogDescription>Create new folder</DialogDescription>
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

export default NewFolderDialog
