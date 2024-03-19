import { convertUnixTimestamp } from '@/lib/utils'
import {
  NotepadText,
  Scroll,
  Hammer,
  Brain,
  Calendar,
  Share2,
  Wrench,
  MessagesSquare,
} from 'lucide-react'
import { CldImage } from 'next-cloudinary'
import { buttonVariants } from '../ui/button'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import Link from 'next/link'
import { Badge } from '../ui/badge'

interface AssistantDialogProps {
  assistant: AssistantWithAdditionalData
  chatButton?: boolean
}

const AssistantDialog = ({
  assistant,
  chatButton = true,
}: AssistantDialogProps) => {
  const {
    name,
    description,
    instructions,
    model,
    userId,
    imagePublicId,
    shared,
    id,
    username,
    isOwner,
  } = assistant
  return (
    <DialogContent>
      <DialogHeader>
        <div className='aspect-square relative h-40 w-40 mx-auto mb-5'>
          <CldImage
            alt={name || 'Assistant'}
            src={imagePublicId}
            fill
            className='object-cover rounded-xl'
          />
        </div>
        <DialogTitle className='text-center'>{name}</DialogTitle>
        <div className='flex flex-col space-y-4 max-w-md'>
          <div>
            <div className='flex items-center mb-1'>
              <NotepadText className='w-5 h-5 mr-1' />
              Description
            </div>
            <p className='text-sm text-muted-foreground text-left'>
              {description}
            </p>
          </div>
          <div>
            <div className='flex items-center mb-1'>
              <Scroll className='w-5 h-5 mr-1' />
              Instructions
            </div>
            <div className='overflow-hidden'>
              <p className='text-sm text-muted-foreground text-left'>
                {instructions}
              </p>
            </div>
          </div>
          <div>
            <div className='flex items-center mb-1'>
              <Hammer className='w-5 h-5 mr-1' />
              Tools
            </div>
            <div className='text-sm text-muted-foreground text-left'>
              {assistant?.openAiObj?.tools.length
                ? assistant.openAiObj.tools.map((tool, i) => (
                    <Badge key={tool.type + i}>{tool.type}</Badge>
                  ))
                : 'No assigned tools...'}
            </div>
          </div>
          <div>
            <div className='flex items-center mb-1'>
              <Brain className='w-5 h-5 mr-1' />
              Model
            </div>
            <p className='text-sm text-muted-foreground text-left'>
              {model}
            </p>
          </div>
          <div>
            <div className='flex items-center mb-1'>
              <NotepadText className='w-5 h-5 mr-1' />
              Created by
            </div>
            <Link
              href={`/app/assistants/user/${userId}`}
              className='text-sm text-muted-foreground hover:underline '
            >
              <p className='text-left'>@{username}</p>
            </Link>
          </div>
          <div>
            <div className='flex items-center mb-1'>
              <Calendar className='w-5 h-5 mr-1' />
              Created at
            </div>
            <p className='text-sm text-muted-foreground text-left'>
              {convertUnixTimestamp(
                assistant?.openAiObj?.created_at || 0,
              )}
            </p>
          </div>
          {isOwner && (
            <div>
              <div className='flex items-center mb-1'>
                <Share2 className='w-5 h-5 mr-1' />
                Shared
              </div>
              <p className='text-sm text-muted-foreground text-left'>
                {shared ? 'Yes' : 'No'}
              </p>
            </div>
          )}
        </div>
        <DialogFooter className='flex gap-2 sm:gap-0 sm:items-center'>
          {isOwner && (
            <Link
              className={buttonVariants({
                variant: 'outline',
              })}
              href={`/app/assistants/config/${id}`}
            >
              <Wrench className='w-5 h-5 mr-2' />
              Config
            </Link>
          )}
          {chatButton && (
            <Link
              className={buttonVariants({
                variant: 'default',
              })}
              href={`/app/assistants/chat/${id}`}
            >
              <MessagesSquare className='w-5 h-5 mr-2' />
              Chat
            </Link>
          )}
        </DialogFooter>
      </DialogHeader>
    </DialogContent>
  )
}

export default AssistantDialog
