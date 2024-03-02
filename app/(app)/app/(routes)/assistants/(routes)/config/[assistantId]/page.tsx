import CldImage from '@/components/cloudinary-image-wrapper'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/components/ui/use-toast'
import { getAssistantById } from '@/lib/actions/assistant.action'
import prisma from '@/lib/prismadb'
import {
  Braces,
  FileJson,
  Hammer,
  NotepadText,
  Scroll,
} from 'lucide-react'
import { notFound, redirect } from 'next/navigation'

const AssistantConfigInfoPage = async ({
  params,
}: {
  params: {
    assistantId: string
  }
}) => {
  let openAiAssistant
  try {
    openAiAssistant = await getAssistantById(params.assistantId)
  } catch (error: any) {
    toast({
      title: 'Error',
      description: error,
      variant: 'destructive',
    })
    redirect('/app/assistants')
  }

  if (!openAiAssistant) {
    notFound()
  }

  const dbAssistant = await prisma.assistant.findUnique({
    where: {
      openAiID: openAiAssistant.id,
      id: params.assistantId,
    },
  })

  if (!dbAssistant) {
    notFound()
  }

  return (
    <div className='max-w-2xl mx-auto'>
      <div className='aspect-square relative mx-auto max-w-[256px] rounded-xl'>
        <CldImage
          src={dbAssistant.imagePublicId}
          alt={dbAssistant.name}
          fill
          className='w-full h-5 object-cover rounded-lg'
        />
      </div>

      <div>
        <h2 className='font-bold text-2xl my-5 text-center'>
          {openAiAssistant.name || dbAssistant.name}
        </h2>
        <h2 className='flex items-center mb-1 font-semibold'>
          <NotepadText className='w-5 h-5 mr-1' />
          Description
        </h2>
        <p>
          {openAiAssistant.description || dbAssistant.description}
        </p>
        <h2 className='mt-5 flex items-center mb-1 font-semibold'>
          <Scroll className='w-5 h-5 mr-1' />
          Instructions
        </h2>
        <p>
          {openAiAssistant.instructions || dbAssistant.instructions}
        </p>

        <h2 className='mt-5 flex items-center mb-1 font-semibold'>
          <Hammer className='w-5 h-5 mr-1' />
          Tools
        </h2>
        <div className='flex items-center space-x-2'>
          {openAiAssistant.tools.length
            ? openAiAssistant.tools.map((tool, i) => (
                <Badge key={tool.type + i}>{tool.type}</Badge>
              ))
            : 'No assigned tools...'}
        </div>
        <h2 className='mt-5 flex items-center mb-1 font-semibold'>
          <FileJson className='w-5 h-5 mr-1' />
          Files
        </h2>
        <p>
          {openAiAssistant.file_ids.length
            ? openAiAssistant.file_ids.map((file, i) => (
                <Badge key={file}>{file}</Badge>
              ))
            : 'No assigned files...'}
        </p>
        <h2 className='mt-5 flex items-center mb-1 font-semibold'>
          <Braces className='w-5 h-5 mr-1' />
          Metadata
        </h2>
        <p>{JSON.stringify(openAiAssistant.metadata, null, 2)}</p>
      </div>
    </div>
  )
}

export default AssistantConfigInfoPage
