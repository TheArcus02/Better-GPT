import Galery from '@/components/images/galery'
import prismadb from '@/lib/prismadb'
import { auth, clerkClient } from '@clerk/nextjs'

interface UserGaleryProps {
  params: {
    userId: string
  }
  searchParams: {
    query: string
    filter: string
  }
}

const UserGaleryPage: React.FC<UserGaleryProps> = async ({
  params: { userId },
  searchParams: { query, filter },
}) => {
  const { userId: loggedUserId } = auth()
  const isOwner = loggedUserId === userId
  const user = await clerkClient.users.getUser(userId)
  console.log(user)

  const images = await prismadb.image.findMany({
    where:
      query || filter
        ? {
            OR: [
              {
                prompt: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
              {
                username: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            ],
            userId,
            shared: isOwner ? undefined : true,
          }
        : { shared: true, userId },
  })

  return (
    <section className='mt-16 max-w-7xl mx-auto h-full'>
      <div>
        <h1 className='text-3xl font-extrabold'>
          {isOwner ? 'Your' : `${user.firstName} ${user.lastName}`}{' '}
          Gallery
        </h1>
        <p className='mt-2'>
          Images created by{' '}
          {isOwner ? 'you' : `${user.firstName} ${user.lastName}`}
        </p>
      </div>

      <div className='mt-16 h-full'>
        <Galery images={images} />
      </div>
    </section>
  )
}

export default UserGaleryPage
