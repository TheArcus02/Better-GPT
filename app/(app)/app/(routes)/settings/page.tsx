import SubscriptionButton from '@/components/settings/subscription-button'
import { Separator } from '@/components/ui/separator'
import { checkSubscription } from '@/lib/subscription'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your account settings and preferences.',
}

const settingsPage = async () => {
  const isPremium = await checkSubscription()

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Subscriptions</h3>
        <p className='text-sm text-muted-foreground'>
          Manage your subscriptions and billing.
        </p>
      </div>
      <Separator />
      <div className='space-y-4'>
        <h4>
          {isPremium
            ? 'You are currently on a Premium plan.'
            : 'You are currently on a free plan.'}
        </h4>
        <SubscriptionButton isPremium={isPremium} />
      </div>
    </div>
  )
}

export default settingsPage
