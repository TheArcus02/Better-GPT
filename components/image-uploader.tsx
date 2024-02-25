'use client'

import { PlusSquare } from 'lucide-react'
import { CldImage, CldUploadWidget } from 'next-cloudinary'
import { toast } from './ui/use-toast'

interface ImageUploaderProps {
  onValueChange: (value: string) => void
  setImage: React.Dispatch<any>
  publicId: string
  image: any
  disabled?: boolean
}

const ImageUploader = ({
  image,
  onValueChange,
  publicId,
  setImage,
  disabled,
}: ImageUploaderProps) => {
  const handleUploadSuccess = (result: any) => {
    console.log(result)
    setImage((prev: any) => ({
      ...prev,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url,
    }))

    onValueChange(result?.info?.public_id)

    toast({
      title: 'Image uploaded successfully',
    })
  }

  const handleUploadError = () => {
    toast({
      title: 'Failed to upload image',
      variant: 'destructive',
    })
  }

  return (
    <CldUploadWidget
      uploadPreset='better_gpt'
      options={{
        multiple: false,
        resourceType: 'image',
      }}
      onSuccess={handleUploadSuccess}
      onError={handleUploadError}
    >
      {({ open }) =>
        publicId ? (
          <div className='aspect-square relative mx-auto max-w-xs rounded-xl'>
            <CldImage
              fill
              alt='image'
              src={publicId}
              className='w-full h-64 object-cover rounded-lg mb-4'
            />
          </div>
        ) : (
          <div
            onClick={() => open()}
            className='aspect-square cursor-pointer mx-auto max-w-xs rounded-xl border bg-secondary shadow-inner'
          >
            <div className='flex items-center justify-center flex-col h-full rounded-xl shadow-sm shadow-secondary'>
              <PlusSquare
                size={48}
                className='text-muted-foreground'
              />
              <p className='text-muted-foreground text-sm mt-2'>
                Click here to upload image
              </p>
            </div>
          </div>
        )
      }
    </CldUploadWidget>
  )
}

export default ImageUploader
