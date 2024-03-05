import { useWindowWidth } from '@/hooks/use-window-width'
import { tailwindBreakpoints } from '@/lib/constants/breakpoints'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import RingLoader from 'react-spinners/RingLoader'
import { GeneratedPhoto } from './generate-form'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

interface GeneratedImageProps {
  photo: GeneratedPhoto | null
  isGenerating: boolean
  alt: string
}

const GeneratedImage = ({
  photo,
  isGenerating,
  alt,
}: GeneratedImageProps) => {
  const width = useWindowWidth()
  const { theme } = useTheme()

  const imageWidth = parseInt(photo?.size.split('x')[0] || '')
  const imageHeight = parseInt(photo?.size.split('x')[1] || '')

  return (
    <div className='aspect-square flex-shrink-0 relative bg-secondary/30 border border-secondary text-sm rounded-lg w-full md:w-[476px] md:h-[476px] lg:w-[556px] lg:h-[556px] p-3 flex justify-center items-center'>
      {photo ? (
        <Dialog>
          <DialogTrigger>
            <Image
              alt={alt}
              src={photo.src}
              layout='fill'
              className='object-scale-down p-2'
            />
          </DialogTrigger>
          <DialogContent className='max-w-[90vw] max-h-[90vh] md:w-max'>
            <Image
              alt={alt}
              src={photo.src}
              width={imageWidth}
              height={imageHeight}
              className='object-scale-down max-h-[80vh]'
            />
          </DialogContent>
        </Dialog>
      ) : !isGenerating ? (
        <Image
          alt='preview'
          src={
            theme === 'light'
              ? '/assets/PreviewBlack.png'
              : '/assets/PreviewWhite.png'
          }
          width={width < tailwindBreakpoints.md ? 128 : 256}
          height={width < tailwindBreakpoints.md ? 128 : 256}
          className='object-contain opacity-30'
        />
      ) : (
        <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
          <RingLoader
            color={theme === 'light' ? 'black' : 'white'}
            size={width < tailwindBreakpoints.md ? 128 : 256}
          />
        </div>
      )}
    </div>
  )
}

export default GeneratedImage
