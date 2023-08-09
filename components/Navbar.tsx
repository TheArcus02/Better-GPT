'use client'

import { cn } from '@/lib/utils'
import { UserButton } from '@clerk/nextjs'
import {
  AreaChart,
  CreditCard,
  Files,
  Home,
  Menu,
  Sparkles,
} from 'lucide-react'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { Button } from './ui/button'
import { ModeToggle } from './theme-toggle'
import { usePathname, useRouter } from 'next/navigation'

const font = Poppins({
  weight: '400',
  subsets: ['latin'],
})

interface NavbarProps {
  isApp: boolean
}

const AppRoutes: NavRoute[] = [
  {
    icon: null,
    href: '/chat',
    label: 'Chat',
    pro: true,
  },
]

const HomeRoutes: NavRoute[] = [
  {
    icon: Home,
    href: '/',
    label: 'Home',
    pro: false,
  },
  {
    icon: Files,
    href: '/docs',
    label: 'Docs',
    pro: false,
  },
  {
    icon: CreditCard,
    href: '/pricing',
    label: 'Pricing',
    pro: false,
  },
  {
    icon: AreaChart,
    href: '/dashboard',
    label: 'Dashboard',
    pro: true,
  },
]

const Navbar = ({ isApp }: NavbarProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const authenticated = false
  const routes = isApp ? AppRoutes : HomeRoutes

  const onNavigate = (href: string, pro: boolean) => {
    // TODO: implement pro

    return router.push(href)
  }

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
      <div className='flex gap-10'>
        {routes.map((route) => (
          <div key={route.href}>
            <div
              className={cn(
                'text-muted-foreground font-medium text-sm md:text-base hover:text-accent transition-colors cursor-pointer',
                pathname === route.href && 'text-accent',
                'flex items-center gap-x-1',
              )}
              onClick={() => onNavigate(route.href, route.pro)}
            >
              {route.icon && <route.icon className='h-5 w-5 mr-1' />}
              {route.label}
            </div>
            {/* Underline don't know if I like it  
            {pathname === route.href && 'text-accent' && (
              <div className='h-0.5 bg-accent rounded-full ' />
            )} */}
          </div>
        ))}
      </div>
      <div className='flex items-center gap-x-5'>
        <Button variant='default' size='sm'>
          Launch App
          <Sparkles className='h-4 w-4 fill-white ml-2' />
        </Button>
        <ModeToggle />
        {authenticated ? (
          <UserButton />
        ) : (
          <Button variant='outline'>Login</Button>
        )}
      </div>
    </div>
  )
}
// TODO: check if authenticated and show login button
export default Navbar
