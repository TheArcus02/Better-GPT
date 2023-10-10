import Link from 'next/link'

const RootPage = () => {
  return (
    <div className='h-full flex items-center justify-center flex-col'>
      <h2 className='text-2xl text-primary font-bold'>
        Root Page not ready
      </h2>
      <p>
        Login and proceed to{' '}
        <Link href='/app' className='text-accent underline'>
          /app
        </Link>{' '}
        or click Launch App Button
      </p>
    </div>
  )
}

export default RootPage
