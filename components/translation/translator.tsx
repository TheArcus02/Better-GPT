'use client'

import { useCompletion } from 'ai/react'
import { ArrowRightLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import Combobox, { ComboboxItem } from '../combobox'
import { Textarea } from '../ui/textarea'
import { useDebounce } from '@/hooks/use-debounce'
import axios from 'axios'
import { SyncLoader } from 'react-spinners'
import { useTheme } from 'next-themes'

interface TranslatorProps {
  languages: ComboboxItem[]
}

const Translator: React.FC<TranslatorProps> = ({ languages }) => {
  const [content, setContent] = useState('')

  const [originalLanguage, setOriginalLanguage] = useState<
    ComboboxItem | undefined
  >(undefined)
  const [translateLanguage, setTranslateLanguage] = useState<
    ComboboxItem | undefined
  >({ label: 'English', value: 'en' })

  const debouncedContent = useDebounce<string>(content, 1000)
  const { theme } = useTheme()

  const [detectinLoading, setDetectinLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    complete,
    completion,
    isLoading: translateLoading,
  } = useCompletion({
    api: '/api/translation',
    body: {
      originalLanguage: originalLanguage?.label,
      translateLanguage: translateLanguage?.label,
    },
  })

  useEffect(() => {
    if (translateLanguage && originalLanguage && debouncedContent) {
      complete(debouncedContent)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    debouncedContent,
    translateLanguage,
    originalLanguage,
    languages,
  ])

  useEffect(() => {
    if (debouncedContent) {
      const detectLanguage = async () => {
        setDetectinLoading(true)
        try {
          const res = await axios.post('/api/translation/detect', {
            prompt: debouncedContent,
          })

          const detectedLanguage = res.data
          const detectedLanguageItem = languages.find(
            (language) => language.value === detectedLanguage,
          )

          if (detectedLanguageItem) {
            setOriginalLanguage(detectedLanguageItem)
          }
        } catch (error) {
          console.log(error)
        } finally {
          setDetectinLoading(false)
        }
      }
      detectLanguage()
    }
  }, [debouncedContent, languages])

  useEffect(() => {
    if (translateLoading || detectinLoading) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [translateLoading, detectinLoading])

  return (
    <div className='flex flex-col bg-secondary/80 rounded-xl border-2 border-white/20'>
      <div className='flex justify-between items-center px-5 py-4'>
        <div>
          <Combobox
            items={languages}
            title={
              detectinLoading ? 'Detecting...' : 'Detect language'
            }
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
        {isLoading ? (
          <div className='w-full border-l-[1px] border-white/20 relative'>
            <div className='absolute inset-0 z-0 flex justify-center bg-background items-center rounded-br-xl'>
              <SyncLoader
                color={theme === 'light' ? 'black' : 'white'}
                size={8}
              />
            </div>
          </div>
        ) : (
          <div className='w-full border-l-[1px] border-white/20'>
            <Textarea
              className='resize-none rounded-none h-full rounded-br-xl focus-visible:ring-1'
              value={completion}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Translator
