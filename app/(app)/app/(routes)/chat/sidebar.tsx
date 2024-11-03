import ChatSidebar from '@/components/chat/chat-sidebar'
import MobileChatSidebar from '@/components/chat/mobile-chat-sidebar'
import prismadb from '@/lib/prismadb'
import { checkSubscription } from '@/lib/subscription'
import { auth } from '@clerk/nextjs/server'

const Sidebar = async () => {
  const { userId, redirectToSignIn } = await auth()

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

  const isPremium = await checkSubscription()

  return (
    <>
      <div className='md:hidden'>
        <MobileChatSidebar folders={folders} isPremium={isPremium} />
      </div>
      <div className='hidden md:block'>
        <ChatSidebar folders={folders} isPremium={isPremium} />
      </div>
    </>
  )
}

export default Sidebar
