import Sidebar from './sidebar'

const ChatLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className='flex h-full w-full bg-secondary/50'>
      <aside className='hidden md:flex'>
        <Sidebar />
      </aside>
      {children}
    </div>
  )
}

export default ChatLayout
