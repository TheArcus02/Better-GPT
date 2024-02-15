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
import { Button } from '../ui/button'
import axios, { AxiosError } from 'axios'
import { toast } from '../ui/use-toast'
import { Group, Share2, Wand2 } from 'lucide-react'
import { RiOpenaiFill } from 'react-icons/ri'
import { Badge } from '../ui/badge'
import GeneratedImage from './generated-image'

const generateImageFormSchema = z.object({
  model: z.enum(['dall-e-2', 'dall-e-3']),
  prompt: z.string().min(3).max(1000),
  size: z.enum([
    '256x256',
    '512x512',
    '1024x1024',
    '1792x1024',
    '1024x1792',
  ]),
})

export type GenerateImageFormType = z.infer<
  typeof generateImageFormSchema
>

export interface GeneratedPhoto {
  id?: number
  src: string
  prompt: string
  size: string
  model: ImageModel
}

const GenerateImageForm = ({ isPremium }: { isPremium: boolean }) => {
  const [photo, setPhoto] = useState<GeneratedPhoto | null>(null)

  const [isGenerating, setIsGenerating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<GenerateImageFormType>({
    resolver: zodResolver(generateImageFormSchema),
    defaultValues: {
      model: 'dall-e-2',
      prompt: '',
      size: '256x256',
    },
  })

  const modelWatcher = form.watch('model')

  const onSubmit = async (data: GenerateImageFormType) => {
    try {
      setIsGenerating(true)
      setPhoto(null)
      const response = await axios.post('/api/images/generate', data)
      setPhoto({
        src: `data:image/jpeg;base64,${response.data.image}`,
        prompt: data.prompt,
        size: data.size,
        model: data.model,
      })
      toast({
        description: 'Image generated successfully',
        duration: 3000,
      })
    } catch (error) {
      console.error(error)
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          toast({
            variant: 'destructive',
            description: error.response.data,
            duration: 3000,
          })
          return
        }
      }
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
    if (!photo) return
    try {
      setIsLoading(true)
      const response = await axios.post('/api/images', {
        photo: photo.src,
        prompt: photo.prompt,
        shared: false,
        size: photo.size,
        model: photo.model,
      })

      const imageId = response.data.id

      setPhoto((prev) => ({
        ...prev!,
        id: imageId,
      }))

      toast({
        description: 'Image saved',
        duration: 3000,
      })
    } catch (error) {
      console.error(error)
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          toast({
            variant: 'destructive',
            description: error.response.data,
            duration: 3000,
          })
          return
        }
      }
      toast({
        variant: 'destructive',
        description: 'Something went wrong',
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onShare = async () => {
    if (!photo?.id) return
    try {
      setIsLoading(true)
      await axios.patch(`/api/images/${photo.id}`, {
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
      setIsLoading(false)
      setPhoto(null)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='max-w-5xl w-full flex flex-col items-center mb-8 md:mb-0 md:flex-row gap-6 md:gap-0'
      >
        <GeneratedImage
          photo={photo}
          isGenerating={isGenerating}
          alt={form.getValues('prompt')}
        />
        <div className='w-full space-y-6 md:ml-6 flex flex-col'>
          <FormField
            control={form.control}
            name='model'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <Select
                  onValueChange={(value) => {
                    const sizeDefaultValue =
                      value === 'dall-e-2' ? '256x256' : '1024x1024'
                    form.setValue('size', sizeDefaultValue, {
                      shouldValidate: true,
                    })
                    field.onChange(value)
                  }}
                  defaultValue={field.value}
                  disabled={isGenerating || isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select model' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='dall-e-2'>
                      <div className='flex items-center'>
                        <RiOpenaiFill className='mr-2 h-5 w-5' />
                        DALL-E 2
                      </div>
                    </SelectItem>
                    <SelectItem
                      value='dall-e-3'
                      disabled={!isPremium}
                    >
                      <div className='flex items-center'>
                        <RiOpenaiFill className='mr-2 h-5 w-5' />
                        DALL-E 3
                        {!isPremium && (
                          <Badge className='ml-2'>Premium</Badge>
                        )}
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='prompt'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isGenerating || isLoading}
                    className='resize-none md:h-32 lg:h-52'
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
                  disabled={isGenerating || isLoading}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select size of an image' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {modelWatcher === 'dall-e-2' && (
                      <>
                        <SelectItem value='256x256'>
                          256x256
                        </SelectItem>
                        <SelectItem value='512x512'>
                          512x512
                        </SelectItem>
                        <SelectItem
                          value='1024x1024'
                          disabled={!isPremium}
                        >
                          <div className='flex items-center'>
                            1024x1024
                            {!isPremium && (
                              <Badge className='ml-2'>Premium</Badge>
                            )}
                          </div>
                        </SelectItem>
                      </>
                    )}
                    {modelWatcher === 'dall-e-3' && (
                      <>
                        <SelectItem value='1024x1024'>
                          1024x1024
                        </SelectItem>
                        <SelectItem value='1792x1024'>
                          1792x1024
                        </SelectItem>
                        <SelectItem value='1024x1792'>
                          1024x1792
                        </SelectItem>
                      </>
                    )}
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
              disabled={isGenerating || isLoading}
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
            {!photo?.id ? (
              <Button
                variant='secondary'
                size='lg'
                disabled={!photo || isLoading}
                className='w-full'
                onClick={onSave}
              >
                <Group size={20} className='mr-2' />
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            ) : (
              <Button
                variant='accent'
                className='w-full'
                size='lg'
                disabled={!photo || isLoading}
                onClick={onShare}
              >
                <Share2 size={20} className='mr-2' />
                {isLoading ? 'Sharing...' : 'Share with community'}
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  )
}

export default GenerateImageForm
