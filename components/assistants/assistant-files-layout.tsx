'use client'

import { FileObject } from 'openai/resources/files.mjs'
import AssistantFilesUpload from './assistant-files-upload'
import { useCallback, useState } from 'react'
import AssistantFilesList from './assistant-files-list'
import { toast } from '../ui/use-toast'
import axios from 'axios'
import { FileDeleteResponse } from 'openai/resources/beta/assistants/files.mjs'

interface AssistantFilesLayoutProps {
  initialFiles: FileObject[]
  assistantId: string
}

const AssistantFilesLayout = ({
  assistantId,
  initialFiles,
}: AssistantFilesLayoutProps) => {
  const [files, setFiles] = useState<FileObject[]>(initialFiles)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleFileDelete = useCallback(
    async (fileId: string) => {
      setIsDeleting(true)
      try {
        await axios.delete<FileDeleteResponse>(
          `/api/assistants/${assistantId}/files/${fileId}`,
        )

        setFiles((prevFiles) =>
          prevFiles.filter((file) => file.id !== fileId),
        )
        toast({
          title: 'File deleted',
          description: 'The file was successfully deleted',
        })
      } catch (error) {
        toast({
          title: 'Error',
          description: 'There was an error deleting the file',
        })
      } finally {
        setIsDeleting(false)
      }
    },
    [assistantId],
  )

  return (
    <div>
      <AssistantFilesUpload
        setFiles={setFiles}
        assistantId={assistantId}
      />
      <AssistantFilesList
        files={files}
        className='mt-4'
        handleFileDelete={handleFileDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}

export default AssistantFilesLayout
