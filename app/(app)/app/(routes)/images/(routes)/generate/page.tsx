import GetPremiumAlert from '@/components/get-premium-alert'
import GenerateImageForm from '@/components/images/generate-form'
import { checkSubscription } from '@/lib/subscription'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Image Generation',
  description:
    'Experience powerful AI-driven image generation with BetterGPT. Create stunning visuals, unique designs, and artistic masterpieces effortlessly. Generate images based on your preferences and unleash your creativity. Transform your ideas into captivating visuals with BetterGPT.',
}

const GenarateImagePage = async () => {
  const isPremium = await checkSubscription()

  return (
    <section className='container mt-16 flex flex-col items-center'>
      <div className='mb-16'>
        <h1 className='text-3xl font-extrabold'>Generate Image</h1>
        <p className=' mt-2 text-secondary-foreground/60'>
          Create imaginative and visually stunning images throught
          DALL-E AI and share them with community
        </p>
      </div>
      {!isPremium && <GetPremiumAlert className='max-w-3xl mb-10' />}
      <GenerateImageForm isPremium={isPremium} />
    </section>
  )
}

export default GenarateImagePage
