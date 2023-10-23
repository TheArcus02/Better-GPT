import ChatSidebar from '@/components/chat/chat-sidebar'
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

  return <ChatSidebar folders={folders} />
}

export default Sidebar
