import AssistantsForm from '@/components/assistants/assistants-form'
import { Separator } from '@/components/ui/separator'
import { getAssistantById } from '@/lib/actions/assistant.action'
import { notFound } from 'next/navigation'
import React from 'react'

const AssistantSettingsPage = async ({
  params,
}: {
  params: {
    assistantId: string
  }
}) => {
  const assistant = await getAssistantById(params.assistantId)

  if (!assistant) {
    notFound()
  }

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
