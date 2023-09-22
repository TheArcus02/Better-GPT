'use client'

import { useCompletion } from 'ai/react'
import { ArrowRightLeft } from 'lucide-react'
import { useState } from 'react'
import Combobox, { ComboboxItem } from '../combobox'
import { Textarea } from '../ui/textarea'

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Italian', value: 'it' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
  { label: 'Arabic', value: 'ar' },
  { label: 'Hindi', value: 'hi' },
  { label: 'Turkish', value: 'tr' },
  { label: 'Dutch', value: 'nl' },
  { label: 'Polish', value: 'pl' },
]

const Translator = () => {
  const [content, setContent] = useState('')
  const [originalLanguage, setOriginalLanguage] = useState<
    ComboboxItem | undefined
  >(undefined)

  const [translateLanguage, setTranslateLanguage] = useState<
    ComboboxItem | undefined
  >({ label: 'English', value: 'en' })

  const { complete } = useCompletion({
    api: '/api/completion',
  })

  return (
    <div className='flex flex-col bg-secondary rounded-xl '>
      <div className='flex justify-between items-center px-10 py-4'>
        <div>
          <Combobox
            items={languages}
            title='Select a language'
            value={originalLanguage ? originalLanguage.value : ''}
            setValue={setOriginalLanguage}
            searchText='Search language...'
          />
        </div>
        <div>
          <ArrowRightLeft />
        </div>
        <div>
          <Combobox
            items={languages}
            title='Select a language'
            value={translateLanguage ? translateLanguage.value : ''}
            setValue={setTranslateLanguage}
            searchText='Search language...'
          />
        </div>
      </div>

      <div className='flex border-t min-h-[200px] h-full gap-1 border-t-background'>
        <div className='w-full'>
          <Textarea className='resize-none rounded-none h-full rounded-bl-xl' />
        </div>
        <div className='w-full'>
          <Textarea className='resize-none rounded-none h-full rounded-br-xl' />
        </div>
      </div>
    </div>
  )
}

export default Translator
