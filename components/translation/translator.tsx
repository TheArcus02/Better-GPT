'use client'

import { useCompletion } from 'ai/react'
import { ArrowRightLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import Combobox, { ComboboxItem } from '../combobox'
import { Textarea } from '../ui/textarea'
import { useDebounce } from '@/hooks/use-debounce'
import axios from 'axios'

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
  const debouncedContent = useDebounce<string>(content, 1000)

  const { complete, completion, isLoading } = useCompletion({
    api: '/api/translation',
    body: {
      originalLanguage: originalLanguage?.label,
      translateLanguage: translateLanguage?.label,
    },
  })

  useEffect(() => {
    if (debouncedContent && translateLanguage && originalLanguage) {
      // complete(debouncedContent)
    }
    if (!originalLanguage && debouncedContent) {
      const detectLanguage = async () => {
        try {
          const res = await axios.post('/api/translation/detect', {
            prompt: debouncedContent,
          })

          const detectedLanguage = res.data
          // const detectedLanguageItem = languages.find(
          //   (language) => language.value === detectedLanguage,
          // )
          // setOriginalLanguage(detectedLanguageItem)
          console.log(detectedLanguage)
        } catch (error) {
          console.log(error)
        }
      }
      detectLanguage()
    }
  }, [debouncedContent, translateLanguage])

  return (
    <div className='flex flex-col bg-secondary/80 rounded-xl border-2 border-white/20'>
      <div className='flex justify-between items-center px-5 py-4'>
        <div>
          <Combobox
            items={languages}
            title='Detect language'
            value={originalLanguage ? originalLanguage.value : ''}
            setValue={setOriginalLanguage}
            searchText='Search language...'
          />
        </div>
        <div className='cursor-pointer'>
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

      <div className='flex  min-h-[200px] h-full border-t-2 border-white/20'>
        <div className='w-full border-r-[1px] border-white/20 z-10'>
          <Textarea
            className='resize-none rounded-none h-full rounded-bl-xl focus-visible:ring-1'
            placeholder='Type to translate...'
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className='w-full border-l-[1px] border-white/20'>
          <Textarea
            className='resize-none rounded-none h-full rounded-br-xl focus-visible:ring-1'
            value={completion}
          />
        </div>
      </div>
    </div>
  )
}

export default Translator
