import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  MessagesSquare,
  Languages,
  Settings,
  ImageIcon,
  LucideIcon,
} from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
interface Route {
  icon: LucideIcon
  href: string
  label: string
  description: string
}

const routes: Array<Route> = [
  {
    icon: MessagesSquare,
    href: '/app/chat',
    label: 'Chat',
    description: 'Chat with advanced AI bot.',
  },
  {
    icon: ImageIcon,
    href: '/app/images',
    label: 'Images',
    description:
      'Generate unique AI images and explore a vibrant community gallery.',
  },
  {
    icon: Languages,
    href: '/app/translation',
    label: 'Translator',
    description: 'Translate text to and from different languages.',
  },
  {
    icon: Settings,
    href: '/app/settings',
    label: 'Settings',
    description: 'Change your settings.',
  },
]

export const metadata: Metadata = {
  title: 'App',
  description:
    'Welcome to your dashboard! Explore advanced AI features including chat, image generation, translation, and settings customization. BetterGPT empowers your creativity and communication.',
}

const AppPage = () => {
  return (
    <div className='max-w-6xl m-auto mt-16 px-6'>
      <div className='space-y-0.5'>
        <h1 className='text-2xl font-bold tracking-tight'>
          Dashboard
        </h1>
        <p className='text-muted-foreground'>
          Welcome to your dashboard! Here you can find all of the
          features that are available to you.
        </p>
      </div>
      <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-3'>
        {routes.map((route, idx) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'block',
              idx === 0 && 'col-span-2',
              idx === 1 && 'row-span-2',
            )}
          >
            <Card className='bg-secondary w-full h-full transition-colors ease-in-out duration-500 hover:border-accent'>
              <CardHeader className='flex flex-row space-x-2 text-accent'>
                {route.icon && (
                  <route.icon className='w-6 h-6 mr-2' />
                )}
                {route.label}
              </CardHeader>
              <CardContent className='text-secondary-foreground'>
                <p>{route.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AppPage
