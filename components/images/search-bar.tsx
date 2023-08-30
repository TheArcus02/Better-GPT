'use client'

import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/use-debounce'
import qs from 'query-string'

const SearchBar = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const query = searchParams.get('query')
  const filter = searchParams.get('filter')

  const [value, setValue] = useState(query || '')
  const debouncedValue = useDebounce<string>(value, 500)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    const searchQuery = {
      query: debouncedValue,
      filter,
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: searchQuery,
      },
      { skipEmptyString: true, skipNull: true },
    )

    router.push(url)
  }, [debouncedValue, router, filter])

  return (
    <div className='relative'>
      <Search
        className='absolute h-4 w-4 top-3 left-4 text-muted-foreground'
        size={16}
      />
      <Input
        placeholder='Search...'
        className='pl-10 bg-secondary/10'
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default SearchBar
