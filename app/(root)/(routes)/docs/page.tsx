import Link from 'next/link'

const DocsPage = () => {
  return (
    <div className='min-h-[90vh] h-full flex items-center justify-center flex-col'>
      <h2 className='text-2xl text-primary font-bold'>
        Docs Page not ready
      </h2>
      <p>
        <Link href='/' className='text-accent underline'>
          go back
        </Link>{' '}
      </p>
    </div>
  )
}

export default DocsPage
