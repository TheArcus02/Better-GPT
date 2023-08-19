import React from 'react'
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

const NewChatDialog = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Chat</DialogTitle>
          <DialogDescription>Create new chat</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input
              id='name'
              value='New chat'
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='folder' className='text-right'>
              Folder
            </Label>
            <Select>
              <SelectTrigger className='col-span-3' id='folder'>
                <SelectValue placeholder='Select folder' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Folders</SelectLabel>
                  <SelectItem value='none'>None</SelectItem>
                  <SelectItem value='general'>General</SelectItem>
                  <SelectItem value='other'>Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NewChatDialog
