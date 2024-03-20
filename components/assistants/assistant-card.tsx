'use client'
import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import CldImage from '../cloudinary-image-wrapper'
import { Dialog, DialogTrigger } from '../ui/dialog'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { Info } from 'lucide-react'
import AssistantDialog from './assistant-dialog'

interface AssistantCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  assistant: AssistantWithAdditionalData
}

const AssistantCard = ({
  assistant,
  className,
  ...props
}: AssistantCardProps) => {
  const { name, description, userId, imagePublicId, username } =
    assistant
  return (
    <Dialog>
      <Card
        className={cn('max-w-xs flex flex-col', className)}
        {...props}
      >
        <CardHeader className='flex-1'>
          <div className='aspect-square relative h-40 w-40 mx-auto mb-5'>
            <CldImage
              alt={name || 'Assistant'}
              src={imagePublicId}
              fill
              className='object-cover rounded-xl'
            />
          </div>
          <CardTitle className='text-center'>{name}</CardTitle>
          <CardDescription className='text-center overflow-hidden text-ellipsis'>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className='flex justify-between items-center'>
          <Link
            href={`/app/assistants/user/${userId}`}
            className='text-sm text-muted-foreground hover:underline'
          >
            @{username}
          </Link>
          <DialogTrigger
            className={buttonVariants({
              variant: 'ghost',
              size: 'icon',
            })}
          >
            <Info className='h-5 w-5 text-muted-foreground' />
          </DialogTrigger>
        </CardContent>
      </Card>
      <AssistantDialog assistant={assistant} />
    </Dialog>
  )
}

export default AssistantCard
