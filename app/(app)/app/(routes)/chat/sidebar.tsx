import ChatSidebar from '@/components/chat/chat-sidebar'
import MobileChatSidebar from '@/components/chat/mobile-chat-sidebar'
import prismadb from '@/lib/prismadb'
import { auth, redirectToSignIn } from '@clerk/nextjs'

const Sidebar = async () => {
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
    <>
      <div className='md:hidden'>
        <MobileChatSidebar folders={folders} />
      </div>
      <div className='hidden md:block'>
        <ChatSidebar folders={folders} />
      </div>
    </>
  )
}

export default Sidebar
