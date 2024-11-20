'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  return (
    <html>
      <body>
        <div className='flex-col flex items-center justify-center min-h-[90vh]'>
          <Card className='max-w-md'>
            <CardHeader>
              <CardTitle>An unexpected error occurred.</CardTitle>
              <CardDescription>
                {error.digest ? (
                  <span>
                    Error ID: <strong>{error.digest}</strong>
                  </span>
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
      </body>
    </html>
  )
}
