import { toast } from '@/components/ui/use-toast'
import { getAssistantById } from '@/lib/actions/assistant.action'
import { redirect } from 'next/navigation'
import OpenAI from 'openai'

const AssistantConfigInfoPage = async ({
  params,
}: {
  params: {
    assistantId: string
  }
}) => {
  let assistant
  try {
    assistant = (await getAssistantById(
      params.assistantId,
    )) as OpenAI.Beta.Assistants.Assistant
  } catch (error: any) {
    toast({
      title: 'Error',
      description: error,
      variant: 'destructive',
    })
    redirect('/app/assistants')
  }

  return (
    <div>
      <h1>{assistant.name}</h1>
      <p>{assistant.description}</p>
      <p>{assistant.instructions}</p>
    </div>
  )
}

export default AssistantConfigInfoPage
