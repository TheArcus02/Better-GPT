import AssistantsForm from '@/components/assistants/assistants-form'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/prismadb'
import React from 'react'

const AssistantSettingsPage = async ({
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

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-lg font-medium'>Assistant Settings</h2>
        <p className='text-sm mt-2 text-secondary-foreground/60'>
          Update your assistant settings.
        </p>
      </div>
      <Separator />
      <AssistantsForm action='update' data={assistant} />
    </div>
  )
}

export default AssistantSettingsPage
