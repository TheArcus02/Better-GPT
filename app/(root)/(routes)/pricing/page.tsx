import { checkSubscription } from '@/lib/subscription'
import { Metadata } from 'next'
import React from 'react'
import Pricing from '../../sections/pricing'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Explore our simple and flexible pricing plans for BetterGPT. Choose from Basic, Premium, and Enterprise plans with varying features to suit your needs. Get unlimited access to smart conversations, image generation, and seamless translations. Sign up now and revolutionize your creativity!',
}

const pricingPage = async () => {
  const isPremium = await checkSubscription()

  return (
    <section className='mt-16 max-w-7xl mx-auto'>
      <Pricing />
    </section>
  )
}

export default pricingPage
