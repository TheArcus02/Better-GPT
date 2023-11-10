import Galery from '@/components/images/galery'
import { toast } from '@/components/ui/use-toast'
import prismadb from '@/lib/prismadb'
import { auth, clerkClient } from '@clerk/nextjs'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

interface UserGaleryProps {
  params: {
    userId: string
  }
  searchParams: {
    query: string
    filter: string
  }
}

const getUserData = async (userId: string) => {
  try {
    const { userId: loggedUserId } = auth()
    const isOwner = loggedUserId === userId
    const user = await clerkClient.users.getUser(userId)

    let username = user.username

    if (user.firstName || user.lastName) {
      username = `${user.firstName} ${user.lastName}`
    } else {
      username = user.emailAddresses[0].emailAddress
    }

    return {
      user,
      isOwner,
      username,
    }
  } catch (error) {
    toast({
      variant: 'destructive',
      description: 'User not found',
      duration: 3000,
    })
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
  searchParams: { query, filter },
}) => {
  const userData = await getUserData(userId)

  if (!userData) return redirect('/app/images')

  const { isOwner, username } = userData

  const images = await prismadb.image.findMany({
    where:
      query || filter
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
                size: filter ? parseInt(filter) : undefined,
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
