import SidebarNav from '@/components/sidebar-nav'
import { Separator } from '@/components/ui/separator'
import { getAssistantById } from '@/lib/actions/assistant.action'
import { auth } from '@clerk/nextjs/server'
import { notFound, redirect } from 'next/navigation'

interface AssistantConfigLayoutProps {
  children: React.ReactNode
  params: Promise<{
    assistantId: string
  }>
}

const AssistantConfigLayout = async (
  props: AssistantConfigLayoutProps,
) => {
  const params = await props.params

  const { assistantId } = params

  const { children } = props

  const { userId } = await auth()

  let assistant

  try {
    assistant = await getAssistantById(assistantId)
  } catch (error: any) {
    redirect('/app/assistants')
  }

  if (!assistant) {
    notFound()
  }

  if (assistant.userId !== userId) {
    redirect('/app/assistants')
  }

  const sidebarNavItems = [
    {
      href: `/app/assistants/config/${assistantId}`,
      label: 'Info',
    },
    {
      href: `/app/assistants/config/${assistantId}/settings`,
      label: 'Settings',
    },
    {
      href: `/app/assistants/config/${assistantId}/files`,
      label: 'Files',
    },
  ]

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='space-y-6 p-10 pb-16'>
        <div className='space-y-0.5'>
          <h1 className='text-2xl font-bold tracking-tight'>
            {assistant.name} Assistant Configuration
          </h1>
          <p className='text-muted-foreground'>
            Configure the assistant settings
          </p>
        </div>
        <Separator className='my-6' />
        <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 w-full'>
          <aside className='lg:w-1/5'>
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className='flex-1 max-w-3xl'>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AssistantConfigLayout
