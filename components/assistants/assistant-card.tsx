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
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

interface AssistantCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  assistant: OpenAiAssistant
}

const AssistantCard = ({
  assistant,
  className,
  ...props
}: AssistantCardProps) => {
  const { name, description, metadata } = assistant

  return (
    <Dialog>
      <DialogTrigger>
        <Card className={cn('max-w-xs', className)} {...props}>
          <CardHeader>
            <div className='aspect-square relative h-40 w-40 mx-auto mb-5'>
              <CldImage
                alt={name || 'Assistant'}
                src={metadata.imagePublicId}
                fill
                className='object-cover rounded-xl'
              />
            </div>
            <CardTitle className='text-center'>{name}</CardTitle>
            <CardDescription className='text-center'>
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className='flex justify-between'></CardContent>
        </Card>
      </DialogTrigger>
      <DialogHeader>
        <DialogTitle>{name}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
    </Dialog>
  )
}

export default AssistantCard
