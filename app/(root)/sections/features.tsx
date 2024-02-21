import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

const Features = () => {
  return (
    <>
      <div className='text-center'>
        <h2 className='text-6xl font-extrabold'>Features</h2>
      </div>
      <div className='flex flex-col md:flex-row gap-8 pt-16'>
        <Card className='w-full'>
          <CardHeader>
            <Image
              className='mt-6  mx-auto mb-4'
              src='/assets/Messaging.svg'
              alt='Hero'
              width='150'
              height='150'
            />
            <CardTitle>Smart Conversations</CardTitle>
          </CardHeader>
          <CardContent className='text-muted-foreground'>
            Experience intelligent and engaging conversations with
            BetterGPT. Our AI-powered chat feature allows you to have
            meaningful discussions, answer your queries, and assist
            you in various tasks. Revolutionize your communication
            with cutting-edge AI technology.
          </CardContent>
        </Card>
        <Card className='w-full'>
          <CardHeader>
            <Image
              className='mt-6  mx-auto mb-4'
              src='/assets/Design.svg'
              alt='Hero'
              height='150'
              width='150'
            />
            <CardTitle>Creative Visuals</CardTitle>
          </CardHeader>
          <CardContent className='text-muted-foreground'>
            Unleash your creativity with BetterGPT&apos;s AI-driven
            image generation capabilities. Generate stunning visuals,
            unique designs, and artistic creations effortlessly.
            Whether you&apos;re a designer, artist, or enthusiast,
            explore the endless possibilities of AI-generated artwork.
          </CardContent>
        </Card>
        <Card className='w-full'>
          <CardHeader>
            <Image
              className='mt-6  mx-auto mb-4'
              src='/assets/Language.svg'
              alt='Hero'
              height='150'
              width='150'
            />
            <CardTitle>Language Mastery</CardTitle>
          </CardHeader>
          <CardContent className='text-muted-foreground'>
            Break language barriers with BetterGPT&apos;s seamless
            translation feature. Translate text, documents, or
            conversations across multiple languages instantly. Enhance
            your global communication, connect with people worldwide,
            and explore diverse cultures without any language
            obstacles.
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Features
