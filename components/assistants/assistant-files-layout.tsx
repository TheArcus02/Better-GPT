'use client'

import { FileObject } from 'openai/resources/files.mjs'
import AssistantFilesUpload from './assistant-files-upload'
import { useState } from 'react'
import AssistantFilesList from './assistant-files-list'

interface AssistantFilesLayoutProps {
  initialFiles: FileObject[]
  assistantId: string
}

const AssistantFilesLayout = ({
  assistantId,
  initialFiles,
}: AssistantFilesLayoutProps) => {
  const [files, setFiles] = useState<FileObject[]>(initialFiles)

  return (
    <div>
      <AssistantFilesUpload
        setFiles={setFiles}
        assistantId={assistantId}
      />
      <AssistantFilesList files={files} className='mt-4' />
    </div>
  )
}

export default AssistantFilesLayout
