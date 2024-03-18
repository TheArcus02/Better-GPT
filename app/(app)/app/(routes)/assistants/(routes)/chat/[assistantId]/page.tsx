import AssistantChat from '@/components/assistants/assistant-chat'
import {
  getAssistantById,
  getAssistantMessages,
  getOrCreateThread,
} from '@/lib/actions/assistant.action'
import { getUsernameById } from '@/lib/utils'
import { Message } from 'ai'
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

  const initialMessages = await getAssistantMessages(
    assistantId,
    thread.id,
  )

  if (initialMessages === undefined) {
    return notFound()
  }

  const mappedMessages: Message[] = initialMessages.map((m) => ({
    id: m.id,
    content:
      m.content[0].type === 'text'
        ? m.content[0].text.value
        : 'invalid message type',
    role: m.role,
    createdAt: new Date(m.created_at),
  }))

  return (
    <AssistantChat
      assistant={assistant}
      threadId={thread.id}
      createdBy={createdBy}
      initialMessages={mappedMessages}
    />
  )
}

export default AssistantChatPage
