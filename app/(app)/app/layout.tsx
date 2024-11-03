import Navbar from '@/components/navbar'
import { checkSubscription } from '@/lib/subscription'
import { auth } from '@clerk/nextjs/server'

const AppLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { userId, redirectToSignIn } = await auth()

  if (!userId) {
    return redirectToSignIn()
  }

  const isPremium = await checkSubscription()

  return (
    <div className='h-full'>
      <Navbar isApp={true} isPremium={isPremium} />

      <main className='h-full w-full pt-24'>{children}</main>
    </div>
  )
}

export default AppLayout
