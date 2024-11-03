import MobileButton from '@/components/chat/mobile-button'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Chats',

  description:
    'Engage in intelligent conversations with BetterGPT Chat. Experience advanced AI interactions, get instant responses to your queries, and enjoy meaningful discussions. Chat effortlessly, revolutionize your communication with BetterGPT.'
}

const ChatsPage = async () => {
  return (
    <div className='flex items-center justify-center w-full flex-col gap-5'>
      <Image
        src='/assets/Messaging.svg'
        alt='begin chat'
        width={300}
        height={300}
      />
      <p className='text-secondary-foreground/60'>
        No conversation started.
      </p>
      <div className='md:hidden'>
        <MobileButton />
      </div>
    </div>
  )
}

export default ChatsPage
