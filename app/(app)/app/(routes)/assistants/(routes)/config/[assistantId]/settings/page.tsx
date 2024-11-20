import AssistantsForm from '@/components/assistants/assistant-form'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/prismadb'
import { checkSubscription } from '@/lib/subscription'
import { Sliders } from 'lucide-react'
import { notFound } from 'next/navigation'
import React from 'react'

const AssistantSettingsPage = async (
  props: {
    params: Promise<{
      assistantId: string
    }>
  }
) => {
  const params = await props.params;
  const assistant = await prisma.assistant.findUnique({
    where: {
      id: params.assistantId,
    },
  })

  if (!assistant) {
    notFound()
  }

  const isPremium = await checkSubscription()

  return (
    <div className='space-y-6'>
      <div>
        <div className='flex items-center'>
          <Sliders className='w-6 h-6 mr-2' />
          <h2 className='text-lg font-medium'>Assistant Settings</h2>
        </div>
        <p className='text-sm mt-2 text-secondary-foreground/60'>
          Update your assistant settings.
        </p>
      </div>
      <Separator />
      <AssistantsForm
        action='update'
        data={assistant}
        isPremium={isPremium}
      />
    </div>
  )
}

export default AssistantSettingsPage
