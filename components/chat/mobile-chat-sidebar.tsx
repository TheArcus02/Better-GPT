'use client'

import { MenuSquare } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import ChatSidebar from './chat-sidebar'
import { Button } from '../ui/button'

const MobileChatSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button size='icon' variant='ghost'>
          <MenuSquare size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side='right' className='p-0 bg-secondary pt-10'>
        <ChatSidebar />
      </SheetContent>
    </Sheet>
  )
}

export default MobileChatSidebar
