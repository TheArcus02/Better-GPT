import ChatSidebar from '@/components/chat-sidebar'

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-full'>
      <div className='hidden md:flex'>
        <ChatSidebar />
      </div>
      <div>{children}</div>
    </div>
  )
}

export default ChatLayout
