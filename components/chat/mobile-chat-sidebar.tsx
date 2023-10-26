'use client'

import { Sheet, SheetContent } from '../ui/sheet'
import ChatSidebar from './chat-sidebar'
import useStore from '@/hooks/use-store'
import { useMobileChatSidebar } from '@/hooks/use-mobile-chat-sidebar'
import { Chat, Folder } from '@prisma/client'

interface MobileChatSidebarProps {
  folders: ({
    chats: ({
      _count: {
        messages: number
      }
    } & Chat)[]
    _count: {
      chats: number
    }
  } & Folder)[]
  isPremium: boolean
}

const MobileChatSidebar: React.FC<MobileChatSidebarProps> = ({
  folders,
  isPremium,
}) => {
  const sidebarState = useStore(
    useMobileChatSidebar,
    (state) => state,
  )

  if (!sidebarState) return null

  return (
    <Sheet
      open={sidebarState.isOpen}
      onOpenChange={() => sidebarState.setOpen(!sidebarState.isOpen)}
    >
      <SheetContent side='right' className='p-0 bg-secondary pt-10'>
        <ChatSidebar folders={folders} isPremium={isPremium} />
      </SheetContent>
    </Sheet>
  )
}

export default MobileChatSidebar
