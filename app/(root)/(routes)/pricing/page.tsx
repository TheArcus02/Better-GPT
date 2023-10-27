import PricingCard from '@/components/pricing/pricing-card'
import PricingSwitch from '@/components/pricing/pricing-switch'
import React from 'react'

const pricingPage = () => {
  return (
    <section className='mt-16 max-w-7xl mx-auto'>
      <div className='w-full flex flex-col items-center'>
        <div className='text-center'>
          <h1 className='text-6xl font-extrabold'>
            Simple pricing <br />
            for everyone
          </h1>
          <p className='mt-2 text-muted-foreground'>
            Choose the plan that works for you.
          </p>
        </div>
        <div className='mt-5'>
          <PricingSwitch />
        </div>
        <div className='text-accent text-sm mt-2'>(get 30% off)</div>
        <div className='mt-10 flex flex-col gap-5 md:flex-row md:gap-0 md:space-x-5'>
          <PricingCard
            title='Basic'
            description='For small teams or office.'
            price={'0.00'}
            features={[
              '2 Chat Folders limit.',
              '3 Chats limit.',
              'Limited sizes for image generation.',
              '20 Messages limit.',
            ]}
            className='md:mt-8'
          />
          <PricingCard
            title='Premium'
            description='Unlimited access to all features.'
            price={'9.99'}
            features={[
              'No Chat Folders limit.',
              'No Chats limit.',
              'Unlimited image generation size.',
            ]}
          />
          <PricingCard
            title='Enterprise'
            description='For large teams or office.'
            price={'20.50'}
            features={[
              'No Chat Folders limit.',
              'No Chats limit.',
              'Unlimited image generation size.',
              'Dedicated support.',
            ]}
            className='md:mt-8'
          />
        </div>
      </div>
    </section>
  )
}

export default pricingPage
