import AssistantList from '@/components/assistants/assistant-list'
import AssistantPagination from '@/components/assistants/assistant-pagination'
import { getAssistants } from '@/lib/actions/assistant.action'
import { getUsername } from '@/lib/utils'
import { currentUser } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'

const UserAssistantsPage = async (props: {
  params: Promise<{
    userId: string
  }>
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}) => {
  const searchParams = await props.searchParams
  const params = await props.params

  const { userId } = params

  const user = await currentUser()

  if (!user) {
    return notFound()
  }

  const page = searchParams['page'] ?? '1'
  const perPage = searchParams['perPage'] ?? '6'

  const skip = (Number(page) - 1) * Number(perPage)

  const isOwner = user.id === userId

  const res = await getAssistants({
    take: Number(perPage),
    skip,
    userId,
    shared: isOwner ? undefined : true,
  })

  if (!res) return notFound()

  const { data: userAssistants, hasNextPage, totalPages } = res

  const username = getUsername(user)

  return (
    <section className='mt-16 max-w-7xl mx-auto h-full px-10'>
      <div>
        <h1 className='text-3xl font-extrabold'>
          {isOwner ? 'Your ' : username + "'s "}
          Assistants
        </h1>
        <p className='mt-2'>
          Assistants created by {isOwner ? 'you' : username}
        </p>
      </div>

      <div className='mt-16 h-full space-y-5'>
        {userAssistants.length ? (
          <>
            <AssistantList assistants={userAssistants} />
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

export default UserAssistantsPage
