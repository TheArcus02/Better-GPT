import ChatSidebar from '@/components/chat/chat-sidebar'
import prismadb from '@/lib/prismadb'
import { auth, redirectToSignIn } from '@clerk/nextjs'

const ChatLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { userId } = auth()

  if (!userId) return redirectToSignIn()

  const folders = await prismadb.folder.findMany({
    where: {
      userId,
    },
    include: {
      _count: {
        select: {
          chats: true,
        },
      },
      chats: {
        include: {
          _count: {
            select: {
              messages: true,
            },
          },
        },
      },
    },
  })

  return (
    <div className='flex h-auto w-full bg-secondary/50'>
      <div className='hidden md:flex'>
        <ChatSidebar folders={folders} />
      </div>
      {children}
    </div>
  )
}

export default ChatLayout
