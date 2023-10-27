'use client'

import { useState } from 'react'
import { Switch } from '../ui/switch'

const PricingSwitch = () => {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className='flex space-x-3'>
      <span>Mothly</span>
      <Switch
        checked={isYearly}
        onCheckedChange={() => setIsYearly((prev) => !prev)}
        className='data-[state=checked]:bg-accent'
      />
      <span>Yearly</span>
    </div>
  )
}

export default PricingSwitch
