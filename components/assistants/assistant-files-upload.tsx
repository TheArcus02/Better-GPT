'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import FileUploader from '../file-uploader'
import axios from 'axios'
import { toast } from '../ui/use-toast'
import { FileObject } from 'openai/resources/files.mjs'
import { UploadCloud } from 'lucide-react'

interface AssistantFilesUploadProps {
  setFiles: Dispatch<SetStateAction<FileObject[]>>
  assistantId: string
}

const AssistantFilesUpload = ({
  setFiles,
  assistantId,
}: AssistantFilesUploadProps) => {
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const handleUpload = async (file: File) => {
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await axios.post<FileObject>(
        `/api/assistants/${assistantId}/files`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      const uploadedFile = response.data

      setFiles((prevFiles) => [...prevFiles, uploadedFile])

      toast({
        title: 'File uploaded',
      })
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error uploading file',
        variant: 'destructive',
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <FileUploader
      onValueChange={handleUpload}
      isUploading={isUploading}
      Icon={UploadCloud}
      text='Upload File'
      variant={'default'}
    />
  )
}

export default AssistantFilesUpload
