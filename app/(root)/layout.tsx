import Navbar from '@/components/navbar'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <Navbar isApp={false} />
      <main className='h-full pt-24'>{children}</main>
    </div>
  )
}

export default RootLayout
