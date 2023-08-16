import Navbar from '@/components/navbar'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <Navbar isApp={true} />

      <main className='h-full w-full pt-24'>{children}</main>
    </div>
  )
}

export default AppLayout
