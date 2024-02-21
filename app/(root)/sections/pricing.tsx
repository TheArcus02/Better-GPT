import PricingMain from '@/components/pricing/pricing-main'
import { checkSubscription } from '@/lib/subscription'

const prices = {
  basic: {
    monthly: 0,
    yearly: 0,
  },
  premium: {
    monthly: 9.99,
    yearly: 9.99 * 12 * 0.7,
  },
  enterprise: {
    monthly: 20.5,
    yearly: 20.5 * 12 * 0.7,
  },
}

const Pricing = async () => {
  const isPremium = await checkSubscription()

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='text-center'>
        <h2 className='text-6xl font-extrabold'>
          Simple pricing <br />
          for everyone
        </h2>
        <p className='mt-2 text-muted-foreground'>
          Choose the plan that works for you.
        </p>
      </div>
      <PricingMain isPremium={isPremium} prices={prices} />
    </div>
  )
}

export default Pricing
