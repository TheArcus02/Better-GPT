import { ExternalLink, File, XCircle } from 'lucide-react'
import { FileObject } from 'openai/resources/files.mjs'
import { cn, formatFileSize } from '@/lib/utils'
import { Button } from '../ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../ui/tooltip'

interface AssistantFilesListProps
  extends React.HTMLAttributes<HTMLUListElement> {
  files: FileObject[]
  handleFileDelete: (fileId: string) => void
  isDeleting: boolean
}

const AssistantFilesList = ({
  files,
  className,
  handleFileDelete,
  isDeleting,
  ...props
}: AssistantFilesListProps) => {
  return (
    <ul className={cn('space-y-2', className)} {...props}>
      {files.map((file) => (
        <li
          key={file.id}
          className='group flex justify-between rounded-sm px-2 py-2 hover:bg-secondary/40 hover:cursor-pointer'
          onClick={() => console.log('open file')}
        >
          <div className='flex items-center'>
            <File className='w-4 h-4 mr-2' />
            {file.filename}
            <ExternalLink className='hidden group-hover:block w-4 h-4 ml-2' />
          </div>
          <div className='flex items-center space-x-4'>
            <span className='text-secondary-foreground/60'>
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
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className='w-8 h-8'
                  variant='secondary'
                  size='icon'
                  disabled={isDeleting}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleFileDelete(file.id)
                  }}
                >
                  <XCircle className='w-4 h-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete file</TooltipContent>
            </Tooltip>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default AssistantFilesList
