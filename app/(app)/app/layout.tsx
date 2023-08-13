import Navbar from '@/components/navbar'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <Navbar isApp={true} />

      <main className='md:pl-20 pt-16 h-full'>{children}</main>
    </div>
  )
}

export default AppLayout
