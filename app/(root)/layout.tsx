import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <Navbar isApp={false} />
      <main className='pt-24'>{children}</main>
      <Footer />
    </div>
  )
}

export default RootLayout
