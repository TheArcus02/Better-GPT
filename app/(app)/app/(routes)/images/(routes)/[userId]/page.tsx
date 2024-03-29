import Galery from '@/components/images/galery'
import prismadb from '@/lib/prismadb'
import { getUsername } from '@/lib/utils'
import { auth, clerkClient } from '@clerk/nextjs'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

interface UserGaleryProps {
  params: {
    userId: string
  }
  searchParams: {
    query: string
    sizeFilter: string
    modelFilter: string
  }
}

const getUserData = async (userId: string) => {
  try {
    const { userId: loggedUserId } = auth()
    const isOwner = loggedUserId === userId
    const user = await clerkClient.users.getUser(userId)

    const username = getUsername(user)

    return {
      user,
      isOwner,
      username,
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function generateMetadata({
  params,
}: UserGaleryProps): Promise<Metadata> {
  try {
    const userInfo = await getUserData(params.userId)
    if (!userInfo)
      return {
        title: 'Not Found',
        description: 'The user was not found',
      }
    return {
      title: `${
        userInfo.isOwner ? 'Your' : userInfo.username + "'s"
      } Gallery`,
      description: `Images created by ${
        userInfo.isOwner ? 'you' : userInfo.username
      }`,
    }
  } catch (error) {
    console.error(error)
    return {
      title: 'Not Found',
      description: 'The user was not found',
    }
  }
}

const UserGaleryPage: React.FC<UserGaleryProps> = async ({
  params: { userId },
  searchParams: { query, sizeFilter, modelFilter },
}) => {
  const userData = await getUserData(userId)

  if (!userData) return redirect('/app/images')

  const { isOwner, username } = userData

  const images = await prismadb.image.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where:
      query || sizeFilter || modelFilter
        ? {
            AND: [
              {
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
              },
              {
                size: sizeFilter ? sizeFilter : undefined,
              },
              {
                model: modelFilter ? modelFilter : undefined,
              },
            ],

            userId,
            shared: isOwner ? undefined : true,
          }
        : { shared: true, userId },
  })

  return (
    <section className='mt-16 max-w-7xl mx-auto h-full px-10'>
      <div>
        <h1 className='text-3xl font-extrabold'>
          {isOwner ? 'Your ' : username + "'s "}
          Gallery
        </h1>
        <p className='mt-2'>
          Images created by {isOwner ? 'you' : username}
        </p>
      </div>

      <div className='mt-16 h-full'>
        <Galery images={images} />
      </div>
    </section>
  )
}

export default UserGaleryPage
