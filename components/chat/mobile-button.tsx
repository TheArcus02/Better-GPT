'use client'

import React from 'react'
import { Button } from '../ui/button'
import useStore from '@/hooks/use-store'
import { useMobileChatSidebar } from '@/hooks/use-mobile-chat-sidebar'

const MobileButton = () => {
  const sidebarState = useStore(
    useMobileChatSidebar,
    (state) => state,
  )

  if (!sidebarState) return null
  return (
    <Button
      variant='default'
      size='lg'
      onClick={() => sidebarState.setOpen(true)}
    >
      Start a new chat
    </Button>
  )
}

export default MobileButton
