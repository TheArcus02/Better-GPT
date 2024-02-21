import { Button } from '@/components/ui/button'
import { WavyBackground } from '@/components/ui/wavy-background'
import Link from 'next/link'

const Hero = () => {
  return (
    <WavyBackground
      className='mx-auto pb-40'
      backgroundFill='#030712'
    >
      <div className='text-center'>
        <h1 className='text-3xl md:text-6xl uppercase font-extrabold leading-snug'>
          Revolutionize your <br />
          <span
            className='text-primary
            '
          >
            creativity
          </span>{' '}
          with AI.
        </h1>
        <p className='text-sm md:text-lg max-w-sm mt-6 text-muted-foreground mx-auto '>
          Explore endless creative possibilities with BetterGPT, your
          AI-powered companion for chat, image generation, and
          seamless translation.
        </p>
        <div className='mt-6'>
          <Link href='/app'>
            <Button size='lg'>Get Started</Button>
          </Link>
        </div>
      </div>
    </WavyBackground>
  )
}

export default Hero
