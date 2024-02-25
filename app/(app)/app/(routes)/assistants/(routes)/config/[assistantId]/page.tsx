import prisma from '@/lib/prismadb'
import { notFound } from 'next/navigation'

const AssistantConfigInfoPage = async ({
  params,
}: {
  params: {
    assistantId: string
  }
}) => {
  const assistant = await prisma.assistant.findUnique({
    where: {
      id: params.assistantId,
    },
  })

  if (!assistant) {
    notFound()
  }

  return <div>AssistantConfigInfoPage</div>
}

export default AssistantConfigInfoPage
