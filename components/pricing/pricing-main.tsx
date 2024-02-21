'use client'
import React, { useState } from 'react'
import PricingCard from './pricing-card'
import { Switch } from '../ui/switch'

interface PricingMainProps {
  isPremium: boolean
  prices: {
    [key: string]: {
      monthly: number
      yearly: number
    }
  }
}

const PricingMain = ({ isPremium, prices }: PricingMainProps) => {
  const [isYearly, setIsYearly] = useState(true)

  return (
    <>
      <div className='mt-5'>
        <div className='flex space-x-3'>
          <span>Mothly</span>
          <Switch
            checked={isYearly}
            onCheckedChange={() => setIsYearly((prev) => !prev)}
            className='data-[state=checked]:bg-accent'
          />
          <span>Yearly</span>
        </div>
      </div>
      <div className='text-accent text-sm mt-2'>(get 30% off)</div>
      <div className='mt-10 flex flex-col gap-5 md:flex-row md:gap-0 md:space-x-5'>
        <PricingCard
          title='Basic'
          description='For small teams or office.'
          price={prices.basic.monthly.toFixed(2).toString()}
          features={[
            '2 Chat Folders limit.',
            '3 Chats limit.',
            'Limited sizes for image generation.',
            '20 Messages limit.',
          ]}
          isPremium={isPremium}
          isYearly={isYearly}
          className='md:mt-8'
        />
        <PricingCard
          title='Premium'
          description='Unlimited access to all features.'
          price={
            isYearly
              ? prices.premium.yearly.toFixed(2).toString()
              : prices.premium.monthly.toFixed(2).toString()
          }
          features={[
            'No Chat Folders limit.',
            'No Chats limit.',
            'Unlimited image generation size.',
          ]}
          isPremium={isPremium}
          isYearly={isYearly}
        />
        <PricingCard
          title='Enterprise'
          description='For large teams or office.'
          price={
            isYearly
              ? prices.enterprise.yearly.toFixed(2).toString()
              : prices.enterprise.monthly.toFixed(2).toString()
          }
          features={[
            'No Chat Folders limit.',
            'No Chats limit.',
            'Unlimited image generation size.',
            'Dedicated support.',
          ]}
          isPremium={isPremium}
          isYearly={isYearly}
          className='md:mt-8'
        />
      </div>
    </>
  )
}

export default PricingMain
