import { getOrCreateThread } from '@/lib/actions/assistant.action'
import { notFound } from 'next/navigation'

const AssistantChat = async ({
  params: { assistantId },
}: {
  params: {
    assistantId: string
  }
}) => {
  const thread = await getOrCreateThread()

  if (!thread) {
    return notFound()
  }

  return <div>AssistantChat</div>
}

export default AssistantChat
