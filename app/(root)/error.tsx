'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <div className='flex-col flex items-center justify-center min-h-[90vh]'>
        <Card className='max-w-md'>
          <CardHeader>
            <CardTitle>An unexpected error occurred.</CardTitle>
            <CardDescription>
              {error.digest ? (
                <p>
                  Error ID: <strong>{error.digest}</strong>
                </p>
              ) : null}
            </CardDescription>
          </CardHeader>
          <CardFooter className='space-x-3'>
            <Button variant='default' onClick={() => reset()}>
              Try again
            </Button>
            <Button variant='outline' onClick={() => router.back()}>
              Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
