import AssistantFilesLayout from '@/components/assistants/assistant-files-layout'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import {
  getAssistantFiles,
  getFilesDetailsList,
} from '@/lib/actions/assistant.action'
import prisma from '@/lib/prismadb'
import { FileBarChart } from 'lucide-react'
import { notFound, redirect } from 'next/navigation'

const AssistantFilesPage = async ({
  params,
}: {
  params: {
    assistantId: string
  }
}) => {
  let assistantFiles
  try {
    const assistant = await prisma.assistant.findUniqueOrThrow({
      where: {
        id: params.assistantId,
      },
    })

    assistantFiles = await getAssistantFiles(assistant.openaiId)
  } catch (error: any) {
    toast({
      title: 'Error',
      description: error,
      variant: 'destructive',
    })
    redirect('/app/assistants')
  }

  if (!assistantFiles) {
    return notFound()
  }

  const files = await getFilesDetailsList(
    assistantFiles.data.map((file) => file.id),
  )

  if (!files) {
    return notFound()
  }

  return (
    <div className='space-y-6'>
      <div>
        <div className='flex items-center'>
          <FileBarChart className='w-6 h-6 mr-2' />
          <h2 className='text-lg font-medium'>Assistant Files</h2>
        </div>
        <p className='text-sm mt-2 text-secondary-foreground/60'>
          Assign files to your assistant.
        </p>
      </div>
      <Separator />
      <AssistantFilesLayout
        initialFiles={files}
        assistantId={params.assistantId}
      />
    </div>
  )
}

export default AssistantFilesPage
