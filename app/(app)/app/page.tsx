import Link from 'next/link'
import React from 'react'

const AppPage = () => {
  return (
    <div className='h-full flex items-center justify-center flex-col'>
      <h2 className='text-2xl text-primary font-bold'>
        App Page not ready
      </h2>
      <h3>Ready pages:</h3>
      <ul className='list-disc'>
        <li>
          <Link href='/app/chat' className='text-accent underline'>
            Chat
          </Link>
        </li>
        <li>
          <Link href='/app/images' className='text-accent underline'>
            Images
          </Link>
        </li>
        <li>
          <Link
            href='/app/translation'
            className='text-accent underline'
          >
            Translator
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default AppPage
