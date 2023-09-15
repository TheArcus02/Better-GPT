import { Sparkles } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { Button } from './ui/button'

interface PremiumAlertProps {
  text?: string
  title?: string
  className?: string
}

const GetPremiumAlert: React.FC<PremiumAlertProps> = ({
  text,
  title,
  className,
}) => {
  return (
    <Alert className={className ?? className} variant='primary'>
      <Sparkles className='h-4 w-4' />
      <AlertTitle>{title ? title : 'Get Premium'}</AlertTitle>
      <div className='flex items-center justify-between'>
        <AlertDescription className='text-sm text-foreground/80'>
          {text
            ? text
            : 'Unclock the full potential of AI. Get unlimited access to all features.'}
        </AlertDescription>

        <Button
          variant='outline'
          size='sm'
          className='max-w-[150px] mt-2'
        >
          Buy Premium
        </Button>
      </div>
    </Alert>
  )
}

export default GetPremiumAlert
