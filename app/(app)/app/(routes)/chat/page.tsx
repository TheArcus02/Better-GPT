import { Button } from '@/components/ui/button'
import Image from 'next/image'

const ChatsPage = async () => {
  return (
    <div className='flex items-center bg-secondary/50 justify-center w-full flex-col gap-5'>
      <Image
        src='/assets/Messaging.svg'
        alt='begin chat'
        width={300}
        height={300}
      />
      <p className='text-secondary-foreground/60'>
        No conversation started.
      </p>
      <div className='md:hidden'></div>
    </div>
  )
}

export default ChatsPage
