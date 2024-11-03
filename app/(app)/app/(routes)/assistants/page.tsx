import AssistantList from '@/components/assistants/assistant-list'
import AssistantPagination from '@/components/assistants/assistant-pagination'
import { Button } from '@/components/ui/button'
import { getAssistants } from '@/lib/actions/assistant.action'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const AssistantsPage = async (props: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}) => {
  const searchParams = await props.searchParams
  const { userId } = await auth()

  if (!userId) return notFound()

  const page = searchParams['page'] ?? '1'
  const perPage = searchParams['perPage'] ?? '6'

  const skip = (Number(page) - 1) * Number(perPage)

  const res = await getAssistants({
    take: Number(perPage),
    skip,
    shared: true,
  })

  if (!res) return notFound()

  const { data: assistants, hasNextPage, totalPages } = res

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
      <div className='mt-6 md:mt-16 h-full space-y-5'>
        {assistants.length ? (
          <>
            <AssistantList assistants={assistants} />
            <AssistantPagination
              hasNextPage={hasNextPage ?? false}
              totalPages={totalPages}
            />
          </>
        ) : (
          <div>
            <p>No assistants found</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default AssistantsPage
