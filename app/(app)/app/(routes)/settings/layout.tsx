import SidebarNav from '@/components/sidebar-nav'
import { Separator } from '@/components/ui/separator'
import { CreditCard } from 'lucide-react'

interface SettingsLayoutProps {
  children: React.ReactNode
}

const items = [
  {
    icon: <CreditCard />,
    label: 'Subscriptions',
    href: '/app/settings',
  },
]

export default function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  return (
    <div className='max-w-7xl mx-auto'>
      <div className='space-y-6 p-10 pb-16'>
        <div className='space-y-0.5'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Settings
          </h2>
          <p className='text-muted-foreground'>
            Manage your account and billing.
          </p>
        </div>
        <Separator className='my-6' />
        <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <aside className='-mx-4 lg:w-1/5'>
            <SidebarNav items={items} />
          </aside>
          <div className='flex-1 lg:max-w-2xl'>{children}</div>
        </div>
      </div>
    </div>
  )
}
