'use client'

import { cn } from '@/lib/utils'
import { UserButton } from '@clerk/nextjs'
import { Menu, Sparkles } from 'lucide-react'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { Button } from './ui/button'
import { ModeToggle } from './theme-toggle'

const font = Poppins({
  weight: '400',
  subsets: ['latin'],
})

const Navbar = () => {
  return (
    <div className='fixed w-full z-50 flex justify-between items-center py-7 px-6 border-b border-background bg-secondary'>
      <div className='flex items-center'>
        <Menu className='block md:hidden' />
        <Link href='/'>
          <h1
            className={cn(
              'hidden md:block text-xl md:text-2xl ',
              font.className,
            )}
          >
            Better
            <span className='font-bold'>GPT</span>
          </h1>
        </Link>
      </div>
      <div className='flex items-center gap-x-5'>
        <Button variant='default'>
          Upgrade
          <Sparkles className='h-4 w-4 fill-white ml-2' />
        </Button>
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  )
}

export default Navbar
