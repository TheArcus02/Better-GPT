import SidebarNav from '@/components/sidebar-nav'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import prisma from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { notFound, redirect } from 'next/navigation'

interface AssistantConfigLayoutProps {
  children: React.ReactNode
  params: {
    assistantId: string
  }
}

const AssistantConfigLayout = async ({
  children,
  params,
}: AssistantConfigLayoutProps) => {
  const { userId } = auth()

  const assistant = await prisma.assistant.findUnique({
    where: {
      id: params.assistantId,
    },
  })

  console.log(assistant)

  if (!assistant) {
    notFound()
  }

  if (assistant.userId !== userId) {
    toast({
      variant: 'destructive',
      description: 'Only the owner can access this page',
      duration: 3000,
    })
    redirect('/app/assistants')
  }

  const sidebarNavItems = [
    {
      href: `/app/assistants/config/${params.assistantId}`,
      label: 'Info',
    },
    {
      href: `/app/assistants/config/${params.assistantId}/settings`,
      label: 'General',
    },
    {
      href: `/app/assistants/config/${params.assistantId}/files`,
      label: 'Files',
    },
  ]

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='space-y-6 p-10 pb-16'>
        <div className='space-y-0.5'>
          <h2 className='text-2xl font-bold tracking-tight'>
            {assistant.name} Assistant Configuration
          </h2>
          <p className='text-muted-foreground'>
            Configure the assistant settings
          </p>
        </div>
        <Separator className='my-6' />
        <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <aside className='-mx-4 lg:w-1/5'>
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className='flex-1 lg:max-w-2xl'>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AssistantConfigLayout
