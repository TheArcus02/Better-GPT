import PricingMain from '@/components/pricing/pricing-main'
import { checkSubscription } from '@/lib/subscription'

const prices = {
  basic: {
    monthly: 0,
    yearly: 0,
  },
  premium: {
    monthly: 19.99,
    yearly: 79.99,
  },
  enterprise: {
    monthly: 99.99,
    yearly: 169.99,
  },
}

const Pricing = async () => {
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
      <PricingMain prices={prices} />
    </div>
  )
}

export default Pricing
