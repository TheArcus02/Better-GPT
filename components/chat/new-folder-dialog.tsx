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

const NewFolderFormValidator = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, { message: 'Name is required' }),
})

export type NewFolderFormValidatorType = z.infer<
  typeof NewFolderFormValidator
>

const NewFolderDialog = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const form = useForm<NewFolderFormValidatorType>({
    resolver: zodResolver(NewFolderFormValidator),
    defaultValues: {
      name: 'New Folder',
    },
  })

  const onSubmit = (data: NewFolderFormValidatorType) => {
    console.log(data)
  }

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
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
              <Button type='submit'>Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default NewFolderDialog
