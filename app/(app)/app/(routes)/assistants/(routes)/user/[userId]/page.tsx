import AssistantList from '@/components/assistants/assistant-list'
import { getUserAssistants } from '@/lib/actions/assistant.action'
import { getUsername } from '@/lib/utils'
import { currentUser } from '@clerk/nextjs'
import { notFound } from 'next/navigation'

const UserAssistantsPage = async ({
  params: { userId },
}: {
  params: {
    userId: string
  }
}) => {
  const user = await currentUser()

  if (!user) {
    return notFound()
  }
  const isOwner = user.id === userId

  const userAssistants = await getUserAssistants(userId, !isOwner)

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

      <div className='mt-16 h-full'>
        {userAssistants ? (
          <AssistantList assistants={userAssistants} />
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
