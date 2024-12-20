'use client'
import { Image as ImageSchema } from '@prisma/client'
import React from 'react'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'
import FileSaver from 'file-saver'
import {
  Download,
  Expand,
  Lock,
  MoreVertical,
  Share2,
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useAuth } from '@clerk/nextjs'
import { Popover, PopoverTrigger } from '../ui/popover'
import { PopoverContent } from '@radix-ui/react-popover'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '../ui/command'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

interface ImageCardProps {
  image: ImageSchema
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const { userId } = useAuth()
  const isOwner = userId === image.userId

  const downloadImage = async (id: string, photo: string) => {
    FileSaver.saveAs(photo, `download-${id}.jpg`)
  }

  const imageWidth = parseInt(image.size.split('x')[0])
  const imageHeight = parseInt(image.size.split('x')[1])

  return (
    <Dialog>
      <div className='rounded-xl group relative card max-w-fit'>
        <CldImage
          src={image.publicId}
          alt={image.prompt}
          height={imageHeight}
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
            <div className={isOwner ? 'flex gap-2' : ''}>
              <Tooltip>
                <TooltipTrigger
                  onClick={() => downloadImage(image.id, image.url)}
                  className='outline-none bg-transparent border-none'
                >
                  <Download className='w-6 h-6' size={24} />
                </TooltipTrigger>
                <TooltipContent>
                  <p className='text-foreground text-sm'>Download</p>
                </TooltipContent>
              </Tooltip>

              {isOwner && (
                <Popover>
                  <PopoverTrigger
                    type='button'
                    className='outline-none bg-transparent border-none'
                  >
                    <MoreVertical className='w-6 h-6' size={24} />
                  </PopoverTrigger>
                  <PopoverContent className='w-52 px-1 z-10'>
                    <Command>
                      <CommandList>
                        <CommandGroup>
                          <DialogTrigger className='w-full'>
                            <CommandItem className='cursor-pointer'>
                              <Expand className='mr-2 h-4 w-4' />
                              <span>Enlarge</span>
                            </CommandItem>
                          </DialogTrigger>
                          <DialogContent className='max-w-[90vw] max-h-[90vh] md:w-max'>
                            <CldImage
                              src={image.publicId}
                              alt={image.prompt}
                              height={imageHeight}
                              width={imageWidth}
                              className='object-scale-down max-h-[80vh]'
                            />
                          </DialogContent>

                          {image.shared ? (
                            <CommandItem className='cursor-pointer'>
                              <Lock className='mr-2 h-4 w-4' />
                              <span>Make Private</span>
                            </CommandItem>
                          ) : (
                            <CommandItem className='cursor-pointer'>
                              <Share2 className='mr-2 h-4 w-4' />
                              <span>Share</span>
                            </CommandItem>
                          )}
                          <CommandItem
                            className='cursor-pointer'
                            onClick={() =>
                              downloadImage(image.id, image.url)
                            }
                          >
                            <Download className='mr-2 w-4 h-4' />
                            <span>Download</span>
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default ImageCard
