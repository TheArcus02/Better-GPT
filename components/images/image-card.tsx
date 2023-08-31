'use client'
import { Image as ImageSchema } from '@prisma/client'
import React from 'react'
import Image from 'next/image'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'
import FileSaver from 'file-saver'
import { CalendarDays, Download } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../ui/tooltip'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface ImageCardProps {
  image: ImageSchema
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const downloadImage = async (id: string, photo: string) => {
    FileSaver.saveAs(photo, `download-${id}.jpg`)
  }
  return (
    <div className='rounded-xl group relative card max-w-fit'>
      <CldImage
        src={image.publicId}
        alt={image.prompt}
        height={image.size}
        width={528}
        crop='fill'
        sizes='100vw, (min-width: 768px) 33vw, (min-width: 1024px) 25vw'
      />
      <div className=' group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-secondary m-2 p-4 rounded-md'>
        <p className='text-foreground text-sm overflow-y-auto prompt'>
          {image.prompt}
        </p>

        <div className='mt-5 flex justify-between items-center gap-2'>
          <Link
            href={`/app/images/${image.userId}`}
            className='flex items-center gap-2'
          >
            <Avatar className='w-7 h-7'>
              <AvatarImage src={image.profilePicture} />
              <AvatarFallback>
                {image.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className='text-foreground text-sm'>
              {image.username}
            </p>
          </Link>

          <Tooltip>
            <TooltipTrigger>
              <button
                type='button'
                onClick={() => downloadImage(image.id, image.url)}
                className='outline-none bg-transparent border-none'
              >
                <Download className='w-6 h-6' size={24} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className='text-foreground text-sm'>Download</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default ImageCard
