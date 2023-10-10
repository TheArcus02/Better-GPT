import Link from 'next/link'

const NotFound = () => {
  return (
    <main className='flex flex-col h-full items-center justify-center'>
      <h1 className='text-5xl text-primary font-bold'>404</h1>
      <p>Page not found</p>
      <Link href='/' className='text-accent underline'>
        Go back
      </Link>
    </main>
  )
}

export default NotFound
