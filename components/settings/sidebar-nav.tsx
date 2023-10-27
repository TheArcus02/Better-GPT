'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { buttonVariants } from '../ui/button'
import { CreditCard } from 'lucide-react'

const items: NavRoute[] = [
  {
    icon: CreditCard,
    label: 'Subscriptions',
    href: '/app/settings',
  },
]

const SidebarNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href
              ? 'bg-muted'
              : 'hover:bg-transparent hover:underline',
            'justify-start',
          )}
        >
          {item.icon && <item.icon className='w-4 h-4 mr-2' />}

          {item.label}
        </Link>
      ))}
    </nav>
  )
}

export default SidebarNav
