import CldImage from '@/components/cloudinary-image-wrapper'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  getAssistantById,
  getAssistantFiles,
  getFilesDetailsList,
} from '@/lib/actions/assistant.action'
import {
  Bot,
  Braces,
  FileJson,
  Hammer,
  NotepadText,
  Scroll,
} from 'lucide-react'
import { notFound, redirect } from 'next/navigation'
import { FileObject } from 'openai/resources/files.mjs'

const AssistantConfigInfoPage = async (
  props: {
    params: Promise<{
      assistantId: string
    }>
  }
) => {
  const params = await props.params;

  const {
    assistantId
  } = params;

  let assistant: AssistantWithAdditionalData | null | undefined
  let files: FileObject[] | null | undefined
  try {
    assistant = await getAssistantById(assistantId)
    const vectorFiles = await getAssistantFiles(assistantId)
    files = await getFilesDetailsList(
      vectorFiles?.map((file) => file.id) || [],
    )
  } catch (error: any) {
    redirect('/app/assistants')
  }

  if (!assistant || !assistant.openAiObj) {
    notFound()
  }

  return (
    <div className='space-y-6'>
      <div>
        <div className='flex items-center'>
          <Bot className='w-6 h-6 mr-2' />
          <h2 className='text-lg font-medium'>Assistant Info</h2>
        </div>
        <p className='text-sm mt-2 text-secondary-foreground/60'>
          Overview of your assistant.
        </p>
      </div>
      <Separator />
      <div className='mx-auto'>
        <div className='aspect-square relative mx-auto max-w-[256px] rounded-xl'>
          <CldImage
            src={assistant.imagePublicId}
            alt={
              assistant.name ||
              assistant.description ||
              'OpenAi assistant'
            }
            fill
            className='w-full h-5 object-cover rounded-lg'
          />
        </div>

        <div>
          <h2 className='font-bold text-2xl my-5 text-center'>
            {assistant.name}
          </h2>
          <h2 className='flex items-center mb-1 font-semibold'>
            <NotepadText className='w-5 h-5 mr-1' />
            Description
          </h2>
          <p>{assistant.description}</p>
          <h2 className='mt-5 flex items-center mb-1 font-semibold'>
            <Scroll className='w-5 h-5 mr-1' />
            Instructions
          </h2>
          <p>{assistant.instructions}</p>

          <h2 className='mt-5 flex items-center mb-1 font-semibold'>
            <Hammer className='w-5 h-5 mr-1' />
            Tools
          </h2>
          <div className='flex items-center space-x-2'>
            {assistant.openAiObj.tools.length
              ? assistant.openAiObj.tools.map((tool, i) => (
                  <Badge key={tool.type + i}>{tool.type}</Badge>
                ))
              : 'No assigned tools...'}
          </div>
          <h2 className='mt-5 flex items-center mb-1 font-semibold'>
            <FileJson className='w-5 h-5 mr-1' />
            Files
          </h2>
          <p>
            {files && files.length
              ? files.map((file, i) => (
                  <Badge key={file.id}>{file.filename}</Badge>
                ))
              : 'No assigned files...'}
          </p>
          <h2 className='mt-5 flex items-center mb-1 font-semibold'>
            <Braces className='w-5 h-5 mr-1' />
            Metadata
          </h2>
          <p>
            {JSON.stringify(assistant.openAiObj.metadata, null, 2)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AssistantConfigInfoPage
