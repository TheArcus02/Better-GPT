import ChatSidebar from '@/components/chat-sidebar'

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-full w-full'>
      <div className='hidden md:flex'>
        <ChatSidebar />
      </div>
      {children}
    </div>
  )
}

export default ChatLayout
