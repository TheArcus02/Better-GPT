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
  const sizeFilter = searchParams.get('filter')
  const modelFilter = searchParams.get('model')

  const [searchValue, setSearchValue] = useState(query || '')
  const [size, setSize] = useState(sizeFilter || '')
  const [model, setModel] = useState(modelFilter || '')

  const debouncedValue = useDebounce<string>(searchValue, 500)

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    const searchQuery = {
      query: debouncedValue,
      sizeFilter: size,
      modelFilter: model,
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: searchQuery,
      },
      { skipEmptyString: true, skipNull: true },
    )

    router.push(url)
  }, [debouncedValue, router, size, model])

  return (
    <div className='flex flex-col md:flex-row gap-4'>
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
            <SelectItem value='256x256'>256x256</SelectItem>
            <SelectItem value='512x512'>512x512</SelectItem>
            <SelectItem value='1024x1024'>1024x1024</SelectItem>
            <SelectItem value='1024x1792'>1024x1792</SelectItem>
            <SelectItem value='1792x1024'>1792x1024</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select onValueChange={setModel}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Model' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=''>Model</SelectItem>
            <SelectItem value='dall-e-2'>DALL-E 2</SelectItem>
            <SelectItem value='dall-e-3'>DALL-E 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default SearchBar
