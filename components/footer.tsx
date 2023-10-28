import Link from 'next/link'
import { Separator } from './ui/separator'

const Footer = () => {
  return (
    <footer className='mt-16'>
      <Separator />
      <div className='py-12 px-12'>
        <div className='text-sm text-muted-foreground'>
          Built by{' '}
          <Link
            href='https://github.com/TheArcus02'
            className='font-semibold underline'
          >
            TheArcus02
          </Link>
          . The source code is avaliable on{' '}
          <Link
            href='https://github.com/TheArcus02/Better-GPT'
            className='font-semibold underline'
          >
            GitHub
          </Link>
        </div>
        <div className='mt-4'>
          <div className='text-sm text-muted-foreground'>
            <Link href='https://storyset.com/online'>
              Online illustrations by Storyset
            </Link>
          </div>
          <div className='text-sm text-muted-foreground'>
            <Link
              href='https://www.flaticon.com/free-icons/picture'
              title='picture icons'
            >
              Picture icons created by Freepik - Flaticon
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
