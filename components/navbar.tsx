'use client'

import { cn } from '@/lib/utils'
import { UserButton, useUser } from '@clerk/nextjs'
import {
  AreaChart,
  CreditCard,
  Files,
  Home,
  LayoutPanelLeft,
  MessagesSquare,
  Image,
  Languages,
  Settings,
  Sparkles,
  Bot,
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
import useStore from '@/hooks/use-store'
import { usePremiumModal } from '@/hooks/use-premium-modal'
import { useEffect, useState } from 'react'

const font = Poppins({
  weight: '400',
  subsets: ['latin'],
})

interface NavbarProps {
  isApp: boolean
  isPremium?: boolean
}

const HomeRoutes: NavRoute[] = [
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
    href: '/app',
    label: 'Dashboard',
  },
]

const Navbar = ({ isApp, isPremium }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false)

  const { user, isSignedIn } = useUser()
  const modalState = useStore(usePremiumModal, (state) => state)

  const AppRoutes: NavRoute[] = [
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
      icon: Bot,
      href: '/app/assistants',
      label: 'Assistants',
      subRoutes: [
        {
          titleRoute: true,
          icon: Bot,
          href: '/app/assistants',
          label: 'Assistants',
          description:
            'Browse and use AI assistants created by the community.',
        },
        {
          icon: null,
          href: '/app/assistants',
          label: 'Assistants Market',
          description:
            'Browse and use AI assistants created by the community.',
        },
        {
          icon: null,
          href: `/app/assistants/${user?.id}`,
          label: 'Your Assistants',
          description: 'View and manage your AI assistants.',
        },
        {
          icon: null,
          href: '/app/assistants/create',
          label: 'Create Assistant',
          description: 'Create a new AI assistant.',
        },
      ],
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
          href: `/app/images/${user?.id}`,
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
    {
      icon: Settings,
      href: '/app/settings',
      label: 'Settings',
    },
  ]

  const pathname = usePathname()
  const router = useRouter()
  const routes = isApp ? AppRoutes : HomeRoutes

  const onNavigate = (href: string) => {
    return router.push(href)
  }

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className='w-full flex justify-center'>
      <nav
        className={cn(
          'fixed w-full z-50 flex justify-between items-center py-7 px-6 transition-all duration-300 ease-in-out',
          isScrolled && 'backdrop-blur-lg backdrop-filter',
        )}
      >
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
                                  href={subRoute.href}
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
          {!isApp ? (
            isSignedIn ? (
              <Button
                variant='default'
                size='sm'
                onClick={() => onNavigate('/app')}
                className='hidden md:flex'
              >
                Launch App
                <LayoutPanelLeft className='h-4 w-4 fill-white ml-2' />
              </Button>
            ) : (
              <Button
                variant='default'
                size='sm'
                onClick={() => onNavigate('/sign-up')}
                className='hidden md:flex'
              >
                Get started
                <LayoutPanelLeft className='h-4 w-4 fill-white ml-2' />
              </Button>
            )
          ) : (
            !isPremium && (
              <Button
                variant='accent'
                size='sm'
                onClick={() => modalState?.setOpen(true)}
                className='hidden md:flex'
              >
                Get Premium
                <Sparkles className='h-4 w-4 fill-white ml-2' />
              </Button>
            )
          )}

          <ModeToggle />
          {isSignedIn ? (
            <UserButton afterSignOutUrl='/' />
          ) : (
            <Button
              variant='outline'
              onClick={() => onNavigate('/sign-in')}
            >
              Login
            </Button>
          )}
        </div>
      </nav>
    </div>
  )
}
export default Navbar
