'use client'

import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const MobileNavSidebar = ({ routes }: { routes: NavRoute[] }) => {
  const router = useRouter()
  const pathname = usePathname()

  const onNavigate = (href: string) => {
    // TODO: implement pro

    return router.push(href)
  }

  return (
    <Sheet>
      <SheetTrigger className='md:hidden pr-4'>
        <Menu />
      </SheetTrigger>
      <SheetContent
        side='left'
        className='p-0 bg-secondary pt-10 w-32'
      >
        <div className='space-y-4 flex flex-col h-full text-primary bg-secondary'>
          <div className='p-3 flex-1 flex justify-center'>
            <div className='space-y-2'>
              {routes.map((route) => (
                <div
                  onClick={() => onNavigate(route.href)}
                  key={route.href}
                  className={cn(
                    'text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-accent hover:bg-accent/10 rounded-lg transition',
                    pathname === route.href &&
                      'bg-accent/10 text-accent',
                  )}
                >
                  <div className='flex flex-col gap-y-2 items-center flex-1'>
                    {route.icon && <route.icon className='h-5 w-5' />}
                    {route.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNavSidebar
