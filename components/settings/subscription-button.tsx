'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Sparkles } from 'lucide-react'
import { toast } from '../ui/use-toast'
import axios from 'axios'

interface SubscriptionButtonProps {
  isPremium: boolean
}

const SubscriptionButton = ({
  isPremium,
}: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false)

  const handleOnClick = async () => {
    try {
      setLoading(true)

      const response = await axios.get('/api/stripe')
      window.location.href = response.data.url
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button size='sm' onClick={handleOnClick} disabled={loading}>
      {isPremium ? 'Manage subscription' : 'Upgrade'}
      {isPremium && <Sparkles className='h-4 w-4 ml-2 fill-white' />}
    </Button>
  )
}

export default SubscriptionButton
