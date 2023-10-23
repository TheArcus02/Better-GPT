import Sidebar from './sidebar'

const ChatLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className='flex h-full w-full bg-secondary/50'>
      <div className='hidden md:flex'>
        <Sidebar />
      </div>
      {children}
    </div>
  )
}

export default ChatLayout
