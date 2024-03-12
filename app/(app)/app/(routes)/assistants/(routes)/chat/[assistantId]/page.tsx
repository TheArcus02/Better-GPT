import AssistantChat from '@/components/assistants/assistant-chat'
import {
  getAssistantById,
  getOrCreateThread,
} from '@/lib/actions/assistant.action'
import { getUsernameById } from '@/lib/utils'
import { clerkClient } from '@clerk/nextjs'
import { notFound } from 'next/navigation'

const AssistantChatPage = async ({
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

  const assistant = await getAssistantById(assistantId)

  if (!assistant) {
    return notFound()
  }

  const createdBy = await getUsernameById(assistant.metadata.userId)

  if (!createdBy) {
    return notFound()
  }

  return (
    <AssistantChat
      assistant={assistant}
      threadId={thread.id}
      createdBy={createdBy}
    />
  )
}

export default AssistantChatPage
