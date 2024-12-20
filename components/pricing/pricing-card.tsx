'use client'

import { cn } from '@/lib/utils'
import { CheckCircle } from 'lucide-react'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React from 'react'

interface PricingCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  price: string
  features: string[]
  isYearly?: boolean
}

const PricingCard = ({
  description,
  features,
  price,
  title,
  isYearly,
  className,
  ...props
}: PricingCardProps) => {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  const handleOnClick = async () => {
    if (!isSignedIn) {
      return router.push('/sign-in')
    }
    return router.push('/app/settings')
  }

  return (
    <div
      className={cn(
        'rounded-xl border border-accent/40 px-8 pt-12 pb-8 bg-secondary h-[fit-content] max-w-[300px]',
        className,
      )}
      {...props}
    >
      <div className='font-light text-2xl'>{title}</div>
      <div className='text-sm text-muted-foreground mt-3'>
        {description}
      </div>
      <div className='text-4xl mt-4'>
        <span className='font-light'>$ </span>
        {price.split('.')[0]}
        <span className='text-lg font-normal'>
          .{price.split('.')[1]}
          {isYearly ? '/yr' : '/mo'}
        </span>
      </div>
      <div>
        <ul className='mt-8 space-y-3'>
          {features.map((feature, idx) => (
            <React.Fragment key={feature}>
              <li
                key={feature}
                className='flex items-center text-foreground'
              >
                <CheckCircle
                  className='w-6 h-6 text-accent mr-4'
                  size={24}
                />
                <span className='text-sm'>{feature}</span>
              </li>
              {idx !== features.length - 1 && (
                <Separator className='bg-accent/30' />
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
      <div>
        <Button
          variant='outline'
          className='mt-6 w-full'
          onClick={handleOnClick}
        >
          {isSignedIn ? 'Upgrade' : 'Get started'}
        </Button>
      </div>
    </div>
  )
}

export default PricingCard
