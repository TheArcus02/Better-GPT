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
import axios from 'axios'
import { toast } from '../ui/use-toast'
import { Group, Share2, Wand2 } from 'lucide-react'

const generateImageFormSchema = z.object({
  prompt: z.string().min(1).max(1000),
  size: z.enum(['256x256', '512x512', '1024x1024']),
})

type GenerateImageFormType = z.infer<typeof generateImageFormSchema>

const GenerateImageForm: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null)
  const [imageId, setImageId] = useState<number | null>(null)

  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

  const { theme } = useTheme()

  const form = useForm<GenerateImageFormType>({
    resolver: zodResolver(generateImageFormSchema),
    defaultValues: {
      prompt: '',
      size: '256x256',
    },
  })

  const onSubmit = async (data: GenerateImageFormType) => {
    try {
      setIsGenerating(true)
      setImageId(null)
      setPhoto(null)
      const response = await axios.post('/api/images/generate', data)
      setPhoto(`data:image/jpeg;base64,${response.data.image}`)
      toast({
        description: 'Image generated successfully',
        duration: 3000,
      })
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        description: 'Something went wrong',
        duration: 3000,
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const onSave = async () => {
    try {
      setIsSaving(true)
      const response = await axios.post('/api/images', {
        photo: photo,
        prompt: form.getValues('prompt'),
        shared: false,
      })

      setImageId(response.data.id)

      toast({
        description: 'Image saved',
        duration: 3000,
      })
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        description: 'Something went wrong',
        duration: 3000,
      })
    } finally {
      setIsSaving(false)
    }
  }

  const onShare = async () => {
    if (!imageId) return
    try {
      setIsSharing(true)
      await axios.patch(`/api/images/${imageId}`, {
        shared: true,
      })

      toast({
        description: 'Image shared',
        duration: 3000,
      })
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        description: 'Something went wrong',
        duration: 3000,
      })
    } finally {
      setIsSharing(false)
      setPhoto(null)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mt-16 max-w-3xl w-full flex'
      >
        <div className='flex-shrink-0 relative bg-secondary/30 border border-secondary text-sm rounded-lg  w-96 p-3 h-96 flex justify-center items-center'>
          {photo ? (
            <Image
              alt={form.getValues('prompt')}
              src={photo}
              layout='fill'
              className='p-2'
            />
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
        <div className='w-full space-y-6 ml-6 h-96 flex flex-col'>
          <FormField
            control={form.control}
            name='prompt'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isGenerating || !!photo}
                    className='resize-none'
                    placeholder='Futuristic cityscape at night with towering skyscrapers, neon lights, and flying cars, all in a cyberpunk aesthetic.'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
                  disabled={isGenerating || !!photo}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select size of an image' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='256x256'>256x256</SelectItem>
                    <SelectItem value='512x512'>512x512</SelectItem>
                    <SelectItem value='1024x1024'>
                      1024x1024
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex flex-col flex-grow justify-end space-y-3'>
            <Button
              size='lg'
              className='w-full'
              type='submit'
              disabled={isGenerating || isSaving || isSharing}
            >
              {isGenerating ? (
                'Generating...'
              ) : (
                <>
                  <Wand2 className='mr-2' />
                  {'Generate image'}
                </>
              )}
            </Button>
            {!imageId ? (
              <Button
                variant='secondary'
                size='lg'
                disabled={!photo || isSaving}
                className='w-full'
                onClick={onSave}
              >
                <Group size={20} className='mr-2' />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            ) : (
              <Button
                variant='accent'
                className='w-full'
                size='lg'
                disabled={!photo || isSharing}
                onClick={onShare}
              >
                <Share2 size={20} className='mr-2' />
                {isSharing ? 'Sharing...' : 'Share'}
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  )
}

export default GenerateImageForm
