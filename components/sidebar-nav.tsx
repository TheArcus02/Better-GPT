'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { buttonVariants } from './ui/button'

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    label: string
    href: string
    icon?: React.ReactNode
  }[]
}

const SidebarNav = ({
  className,
  items,
  ...props
}: SidebarNavProps) => {
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
          {item.icon && <div className='mr-2'>{item.icon}</div>}

          {item.label}
        </Link>
      ))}
    </nav>
  )
}

export default SidebarNav
