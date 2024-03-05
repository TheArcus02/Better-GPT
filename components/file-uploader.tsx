import { ChangeEvent, useRef } from 'react'
import { Button, buttonVariants } from './ui/button'
import { toast } from './ui/use-toast'
import { VariantProps } from 'class-variance-authority'
import { LucideIcon } from 'lucide-react'
import { retrievalSupportedFiles } from '@/lib/constants/supported-files'

interface FileUploaderProps
  extends VariantProps<typeof buttonVariants> {
  isUploading?: boolean
  onValueChange: (value: File) => void
  Icon?: LucideIcon
  text?: string
}

const FileUploader = ({
  isUploading,
  onValueChange,
  variant,
  size,
  Icon,
  text,
}: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      return toast({
        title: 'No file selected',
        variant: 'destructive',
      })
    }

    if (!retrievalSupportedFiles.includes(file.type)) {
      return toast({
        title: `${file.type} is not supported. Please upload a supported file type.`,
        variant: 'destructive',
      })
    }

    onValueChange(file)
  }

  return (
    <>
      <input
        type='file'
        ref={fileInputRef}
        className='hidden'
        onChange={handleFileChange}
      />
      <Button
        disabled={isUploading}
        onClick={() => fileInputRef.current?.click()}
        variant={variant}
        size={size}
      >
        {Icon && <Icon className='w-5 h-5 mr-2' />}
        {text && isUploading ? 'Uploading...' : text}
      </Button>
    </>
  )
}

export default FileUploader
