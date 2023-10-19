'use client'

import { cn } from '@/lib/utils'
import { UserButton, useAuth } from '@clerk/nextjs'
import {
  AreaChart,
  CreditCard,
  Files,
  Home,
  LayoutPanelLeft,
  MessagesSquare,
  Image,
  Terminal,
  Languages,
} from 'lucide-react'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { Button } from './ui/button'
import { ModeToggle } from './theme-toggle'
import { usePathname, useRouter } from 'next/navigation'
import MobileNavSidebar from './mobile-nav-sidebar'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu'
import { ListItem } from './ui/list-item'

const font = Poppins({
  weight: '400',
  subsets: ['latin'],
})

interface NavbarProps {
  isApp: boolean
}

export const AppRoutes: NavRoute[] = [
  {
    icon: AreaChart,
    href: '/app',
    label: 'Dashboard',
  },
  {
    icon: MessagesSquare,
    href: '/app/chat',
    label: 'Chat',
  },
  {
    icon: Terminal,
    href: '/app/prompts',
    label: 'Prompts',
  },
  {
    icon: Image,
    href: '/app/images',
    label: 'Images',
    subRoutes: [
      {
        titleRoute: true,
        icon: Image,
        href: '/app/images',
        label: 'Images',
        description:
          'Generate unique AI images and explore a vibrant community gallery.',
      },
      {
        icon: null,
        href: '/app/images',
        label: 'Community Gallery',
        description: 'Browse images from the community.',
      },
      {
        icon: null,
        href: '/app/images/',
        label: 'Your Images',
        description: 'Browse images you have generated.',
      },
      {
        icon: null,
        href: '/app/images/generate',
        label: 'Generate',
        description: 'Generate images from text.',
      },
    ],
  },
  {
    icon: Languages,
    href: '/app/translation',
    label: 'Translator',
  },
]

export const HomeRoutes: NavRoute[] = [
  {
    icon: Home,
    href: '/',
    label: 'Home',
  },
  {
    icon: Files,
    href: '/docs',
    label: 'Docs',
  },
  {
    icon: CreditCard,
    href: '/pricing',
    label: 'Pricing',
  },
  {
    icon: AreaChart,
    href: '/dashboard',
    label: 'Dashboard',
  },
]

const Navbar = ({ isApp }: NavbarProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const routes = isApp ? AppRoutes : HomeRoutes

  const onNavigate = (href: string) => {
    return router.push(href)
  }

  return (
    <div className='fixed w-full z-50 flex justify-between items-center py-7 px-6 border-b border-muted-foreground bg-secondary'>
      <div className='flex items-center'>
        <MobileNavSidebar routes={routes} />
        <Link href='/'>
          <h1
            className={cn(
              'block text-xl md:text-2xl ',
              font.className,
            )}
          >
            Better
            <span className='font-bold'>GPT</span>
          </h1>
        </Link>
      </div>
      <NavigationMenu className='hidden md:block'>
        <NavigationMenuList className='flex gap-5 lg:gap-10'>
          {routes.map((route) => (
            <NavigationMenuItem key={route.href}>
              {route.subRoutes ? (
                <>
                  <NavigationMenuTrigger
                    className={cn(
                      'text-muted-foreground font-medium text-sm md:text-base hover:text-accent transition-colors cursor-pointer',
                      pathname === route.href && 'text-accent',
                      'flex items-center gap-x-1',
                    )}
                  >
                    {route.icon && (
                      <route.icon className='h-5 w-5 mr-1' />
                    )}
                    {route.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className='bg-secondary'>
                    {
                      <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                        {route.subRoutes.map((subRoute) =>
                          subRoute.titleRoute ? (
                            <li
                              className='row-span-3'
                              key={
                                subRoute.label + subRoute.description
                              }
                            >
                              <NavigationMenuLink asChild>
                                <a
                                  className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md'
                                  href='/'
                                >
                                  {subRoute.icon && (
                                    <subRoute.icon className='h-6 w-6' />
                                  )}
                                  <div className='mb-2 mt-4 text-lg font-medium'>
                                    {subRoute.label}
                                  </div>
                                  <p className='text-sm leading-tight text-primary-foreground/70'>
                                    {subRoute.description}
                                  </p>
                                </a>
                              </NavigationMenuLink>
                            </li>
                          ) : (
                            <ListItem
                              key={subRoute.label}
                              title={subRoute.label}
                              href={subRoute.href}
                            >
                              {subRoute.description}
                            </ListItem>
                          ),
                        )}
                      </ul>
                    }
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink
                  className={cn(
                    'text-muted-foreground font-medium text-sm md:text-base hover:text-accent transition-colors cursor-pointer',
                    pathname === route.href && 'text-accent',
                    'flex items-center gap-x-1',
                  )}
                  onClick={() => onNavigate(route.href)}
                >
                  {route.icon && (
                    <route.icon className='h-5 w-5 mr-1' />
                  )}
                  <span className='hidden md:block'>
                    {route.label}
                  </span>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className='flex items-center gap-x-5'>
        {!isApp &&
          (isSignedIn ? (
            <Button
              variant='default'
              size='sm'
              onClick={() => onNavigate('/app')}
            >
              Launch App
              <LayoutPanelLeft className='h-4 w-4 fill-white ml-2' />
            </Button>
          ) : (
            <Button
              variant='default'
              size='sm'
              onClick={() => onNavigate('/sign-up')}
            >
              Get started
              <LayoutPanelLeft className='h-4 w-4 fill-white ml-2' />
            </Button>
          ))}

        <ModeToggle />
        {isSignedIn ? (
          <UserButton afterSignOutUrl='/app' />
        ) : (
          <Button
            variant='outline'
            onClick={() => onNavigate('/sign-in')}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  )
}
export default Navbar
