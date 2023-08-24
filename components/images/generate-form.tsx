'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Textarea } from '../ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useState } from 'react'
import Image from 'next/image'
import { RingLoader } from 'react-spinners'
import { useTheme } from 'next-themes'
import { Button } from '../ui/button'

const generateImageFormSchema = z.object({
  prompt: z.string().min(1).max(1000),
  size: z.enum(['256x256', '512x512', '1024x1024']),
})

type GenerateImageFormType = z.infer<typeof generateImageFormSchema>

const GenerateImageForm: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const { theme } = useTheme()

  const form = useForm<GenerateImageFormType>({
    resolver: zodResolver(generateImageFormSchema),
    defaultValues: {
      prompt: '',
      size: '256x256',
    },
  })

  const onSubmit = (data: GenerateImageFormType) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 mt-16 max-w-3xl w-full'
      >
        <FormField
          control={form.control}
          name='prompt'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prompt</FormLabel>
              <FormControl>
                <Textarea
                  className='resize-none'
                  placeholder='Futuristic cityscape at night with towering skyscrapers, neon lights, and flying cars, all in a cyberpunk aesthetic.'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='size'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select size of an image' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='256x256'>256x256</SelectItem>
                  <SelectItem value='512x512'>512x512</SelectItem>
                  <SelectItem value='1024x1024'>1024x1024</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='relative bg-secondary/30 border border-secondary text-sm rounded-lg  w-96 p-3 h-96 flex justify-center items-center'>
          {photo ? (
            <Image alt={form.getValues('prompt')} src={photo} />
          ) : !isGenerating ? (
            <Image
              alt='preview'
              src={
                theme === 'light'
                  ? '/assets/PreviewBlack.png'
                  : '/assets/PreviewWhite.png'
              }
              width={256}
              height={256}
              className='object-contain opacity-30'
            />
          ) : (
            <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
              <RingLoader
                color={theme === 'light' ? 'black' : 'white'}
                size={256}
              />
            </div>
          )}
        </div>
        <div className='mt-10 flex gap-6'>
          <Button size='lg'>
            {isGenerating ? 'Generating...' : 'Generate image'}
          </Button>
          <Button variant='secondary' size='lg'>
            Share with the community
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default GenerateImageForm
