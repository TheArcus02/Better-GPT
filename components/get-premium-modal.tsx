'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { usePremiumModal } from '@/hooks/use-premium-modal'
import useStore from '@/hooks/use-store'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { toast } from '@/components/ui/use-toast'
import axios from 'axios'

const GetPremiumModal = () => {
  const [loading, setLoading] = useState(false)

  const modalState = useStore(usePremiumModal, (state) => state)

  const onSubscribe = async () => {
    try {
      setLoading(true)

      const response = await axios.get('/api/stripe')

      window.location.href = response.data.url
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Something went wrong. Please try again later.',
      })
    } finally {
      setLoading(false)
      modalState?.setOpen(false)
    }
  }

  if (!modalState) return null

  return (
    <Dialog
      open={modalState.isOpen}
      onOpenChange={() => modalState.setOpen(!modalState.isOpen)}
    >
      <DialogContent>
        <DialogHeader className='space-y-4'>
          <DialogTitle className='text-center'>
            Upgrade to Premium
          </DialogTitle>
          <DialogDescription className='text-center space-y-2'>
            Unlock the full potential of the{' '}
            <span className='text-accent'>AI</span>. Get unlimited
            access to all features.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className='flex justify-between'>
          <p className='text-2xl font-medium'>
            $9
            <span className='text-sm font-normal'>.99 / mo</span>
          </p>
          <Button
            variant='default'
            onClick={onSubscribe}
            disabled={loading}
          >
            Subscribe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default GetPremiumModal
