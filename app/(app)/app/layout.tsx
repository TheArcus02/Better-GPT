import Navbar from '@/components/navbar'
import { auth, redirectToSignIn } from '@clerk/nextjs'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth()

  if (!userId) {
    return redirectToSignIn()
  }

  return (
    <div className='h-full'>
      <Navbar isApp={true} />

      <main className='h-full w-full pt-24'>{children}</main>
    </div>
  )
}

export default AppLayout
