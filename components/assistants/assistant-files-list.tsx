import { ExternalLink, File } from 'lucide-react'
import { FileObject } from 'openai/resources/files.mjs'
import { cn, formatFileSize } from '@/lib/utils'

interface AssistantFilesListProps
  extends React.HTMLAttributes<HTMLUListElement> {
  files: FileObject[]
}

const AssistantFilesList = ({
  files,
  className,
  ...props
}: AssistantFilesListProps) => {
  return (
    <ul className={cn('space-y-2', className)} {...props}>
      {files.map((file) => (
        <li
          key={file.id}
          className='group flex justify-between rounded-sm px-2 py-2 hover:bg-secondary/40 hover:cursor-pointer'
        >
          <div className='flex items-center'>
            <File className='w-4 h-4 mr-2' />
            {file.filename}
            <ExternalLink className='hidden group-hover:block w-4 h-4 ml-2' />
          </div>
          <div>
            <span className='text-secondary-foreground/60 mr-4'>
              {new Date(file.created_at * 1000).toLocaleString(
                undefined,
                {
                  dateStyle: 'short',
                  timeStyle: 'short',
                },
              )}
            </span>
            <span className='text-secondary-foreground/60'>
              {formatFileSize(file.bytes)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default AssistantFilesList
