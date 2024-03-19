import AssistantList from '@/components/assistants/assistant-list'
import { Button } from '@/components/ui/button'
import { getAssistants } from '@/lib/actions/assistant.action'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const AssistantsPage = async () => {
  const { userId } = auth()

  if (!userId) return notFound()

  const assistants = await getAssistants()

  if (!assistants) return notFound()

  return (
    <section className='mt-16 max-w-7xl mx-auto h-full px-10'>
      <div className='w-full flex flex-col md:flex-row justify-between'>
        <div>
          <h1 className='text-3xl font-extrabold'>
            Assistants Market
          </h1>
          <p className='mt-2'>
            Browse and use AI assistants created by the community.
          </p>
        </div>
        <div className='flex space-x-3 items-center mt-8 md:mt-0'>
          <Link href='/app/assistants/create'>
            <Button>Create Assistant</Button>
          </Link>
          <Link href={`/app/assistants/user/${userId}`}>
            <Button variant='outline'>Manage Assistants</Button>
          </Link>
        </div>
      </div>
      <div className='mt-6 md:mt-16 h-full'>
        <AssistantList assistants={assistants} />
      </div>
    </section>
  )
}

export default AssistantsPage
