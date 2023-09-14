'use client'

import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/use-debounce'
import qs from 'query-string'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

const SearchBar = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const query = searchParams.get('query')
  const filter = searchParams.get('filter')

  const [searchValue, setSearchValue] = useState(query || '')
  const [size, setSize] = useState(filter || '')
  const debouncedValue = useDebounce<string>(searchValue, 500)

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    const searchQuery = {
      query: debouncedValue,
      filter: size,
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: searchQuery,
      },
      { skipEmptyString: true, skipNull: true },
    )

    router.push(url)
  }, [debouncedValue, router, size])

  return (
    <div className='flex gap-4'>
      <div className='relative max-w-3xl w-full'>
        <Search
          className='absolute h-4 w-4 top-3 left-4 text-muted-foreground'
          size={16}
        />
        <Input
          placeholder='Search...'
          className='pl-10 bg-secondary/10'
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        <Select onValueChange={setSize}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Size' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=''>Size</SelectItem>
            <SelectItem value='256'>256x256</SelectItem>
            <SelectItem value='512'>512x512</SelectItem>
            <SelectItem value='1024'>1024x1024</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default SearchBar
