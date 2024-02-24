import { CldImage, CldUploadWidget } from 'next-cloudinary'

interface ImageUploaderProps {
  onValueChange: (value: string) => void
  setImage: React.Dispatch<any>
  publicId: string
  image: any
}

const ImageUploader = ({
  image,
  onValueChange,
  publicId,
  setImage,
}: ImageUploaderProps) => {
  const handleUploadSuccess = (result: any) => {
    console.log(result)
  }

  const handleUploadError = () => {
    console.log('error')
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
          <div className='relative'>
            <CldImage
              fill
              alt='image'
              src={publicId}
              className='w-full h-64 object-cover rounded-lg mb-4'
            />
          </div>
        ) : (
          <div onClick={() => open()}>add Image</div>
        )
      }
    </CldUploadWidget>
  )
}

export default ImageUploader
