import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  MessagesSquare,
  Languages,
  Settings,
  Image,
  LucideIcon,
} from 'lucide-react'
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
    icon: Image,
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
      <div className='mt-6 space-y-8'>
        {routes.map((route) => (
          <Link key={route.href} href={route.href} className='block'>
            <Card className='bg-secondary/70'>
              <CardHeader className='flex flex-row space-x-2 text-accent'>
                {route.icon && (
                  <route.icon className='w-6 h-6 mr-2' />
                )}
                {route.label}
              </CardHeader>
              <CardContent className='text-secondary-foreground'>
                {route.description}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AppPage
