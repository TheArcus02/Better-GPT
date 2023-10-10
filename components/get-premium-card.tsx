'use client'
import Image from 'next/image'
import { Button } from './ui/button'

const GetPremiumCard = () => {
  return (
    <div className='mt-24 pt-20 relative px-4 py-6 bg-primary/80  rounded-3xl flex flex-col items-center max-w-[260px]'>
      <Image
        src='/assets/Developer.svg'
        width={170}
        height={170}
        alt='upgrade'
        className='absolute top-0 -mt-20'
      />
      <h2 className='text-2xl font-light mt-2 text-primary-foreground'>
        Get Premium
      </h2>
      <p className='text-sm text-center mt-3 text-primary-foreground/80'>
        Unlock the full potential of the AI. Get unlimited access to
        all features.
      </p>
      <Button variant='outline' size='lg' className='mt-5'>
        Buy Premium
      </Button>
    </div>
  )
}

export default GetPremiumCard
