import { Image as ImageSchema } from '@prisma/client'
import React from 'react'
import Image from 'next/image'

interface ImageCardProps {
  image: ImageSchema
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  return (
    <div className='rounded-xl group relative card  min-h-[20rem] md:min-h-[30rem] xl:min-h-[35rem]'>
      <Image
        className='w-full h-auto object-cover rounded-xl'
        src={image.url}
        alt={image.prompt}
        fill
      />
      <div className=' group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-secondary m-2 p-4 rounded-md'>
        <p className='text-white text-sm overflow-y-auto prompt'>
          {image.prompt}
        </p>

        <div className='mt-5 flex justify-between items-center gap-2'>
          <div className='flex items-center gap-2'>
            <Image
              className='w-7 h-7 rounded-full object-cover'
              width={28}
              height={28}
              alt={image.username}
              src={image.profilePicture}
            />
            <p className='text-white text-sm'>{image.username}</p>
          </div>
          {/* <button type="button" onClick={() => downloadImage(_id, photo)} className="outline-none bg-transparent border-none">
          <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
        </button> */}
        </div>
      </div>
    </div>
  )
}

export default ImageCard
