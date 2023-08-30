import Galery from '@/components/images/galery'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'

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

  // TODO: add user to db when created and retrieve it here and change the title to the user's name
  return (
    <section className='mt-16 max-w-7xl mx-auto h-full'>
      <div>
        <h1 className='text-3xl font-extrabold'>
          {isOwner ? 'Your' : ''} Gallery
        </h1>
        <p className='mt-2'>
          Images created by {isOwner ? 'you' : 'this user'}
        </p>
      </div>

      <div className='mt-16 h-full'>
        <Galery images={images} />
      </div>
    </section>
  )
}

export default UserGaleryPage
