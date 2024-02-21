import PricingCard from '@/components/pricing/pricing-card'
import PricingSwitch from '@/components/pricing/pricing-switch'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'
import { Separator } from '@/components/ui/separator'
import { WavyBackground } from '@/components/ui/wavy-background'
import { checkSubscription } from '@/lib/subscription'
import Image from 'next/image'
import Link from 'next/link'

const testimonials = [
  {
    quote:
      'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.',
    name: 'Charles Dickens',
    title: 'A Tale of Two Cities',
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: 'William Shakespeare',
    title: 'Hamlet',
  },
  {
    quote: 'All that we see or seem is but a dream within a dream.',
    name: 'Edgar Allan Poe',
    title: 'A Dream Within a Dream',
  },
  {
    quote:
      'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
    name: 'Jane Austen',
    title: 'Pride and Prejudice',
  },
  {
    quote:
      'Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.',
    name: 'Herman Melville',
    title: 'Moby-Dick',
  },
]

const RootPage = async () => {
  const isPremium = await checkSubscription()

  return (
    <div className='h-full mt-16 px-6'>
      {/* hero */}
      {/* <section className='max-w-6xl mx-auto md:flex justify-between items-center'>
        <div className='text-center md:text-left'>
          <h1 className='text-5xl uppercase font-extrabold leading-snug'>
            Revolutionize <br />
            your{' '}
            <span
              className='text-primary
            '
            >
              creativity
            </span>
            <br /> with AI.
          </h1>
          <p className='max-w-sm mt-6 text-muted-foreground mx-auto md:mx-0'>
            Explore endless creative possibilities with BetterGPT,
            your AI-powered companion for chat, image generation, and
            seamless translation.
          </p>
          <div className='mt-6'>
            <Link href='/app'>
              <Button size='lg'>Get Started</Button>
            </Link>
          </div>
        </div>

        <Image
          className='mt-6 hidden md:block'
          src='/assets/Hero.svg'
          alt='Hero'
          width='500'
          height='500'
        />
      </section> */}
      <section>
        <WavyBackground
          className='mx-auto pb-40'
          backgroundFill='#030712'
        >
          <div className='text-center'>
            <h1 className='text-5xl uppercase font-extrabold leading-snug'>
              Revolutionize your <br />
              <span
                className='text-primary
            '
              >
                creativity
              </span>{' '}
              with AI.
            </h1>
            <p className='max-w-sm mt-6 text-muted-foreground mx-auto '>
              Explore endless creative possibilities with BetterGPT,
              your AI-powered companion for chat, image generation,
              and seamless translation.
            </p>
            <div className='mt-6'>
              <Link href='/app'>
                <Button size='lg'>Get Started</Button>
              </Link>
            </div>
          </div>
        </WavyBackground>
      </section>
      {/* <section className='mt-24'>
        <InfiniteMovingCards
          items={testimonials}
          direction='right'
          speed='slow'
        />
      </section> */}
      {/* Cards */}
      <section className='max-w-6xl flex flex-col md:flex-row mx-auto gap-8 px-16'>
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
      </section>

      {/* Pricing */}
      <section className='mt-40 max-w-7xl mx-auto'>
        <div className='w-full flex flex-col items-center'>
          <div className='text-center'>
            <h1 className='text-6xl font-extrabold'>
              Simple pricing <br />
              for everyone
            </h1>
            <p className='mt-2 text-muted-foreground'>
              Choose the plan that works for you.
            </p>
          </div>
          <div className='mt-5'>
            <PricingSwitch />
          </div>
          <div className='text-accent text-sm mt-2'>
            (get 30% off)
          </div>
          <div className='mt-10 flex flex-col gap-5 md:flex-row md:gap-0 md:space-x-5'>
            <PricingCard
              title='Basic'
              description='For small teams or office.'
              price={'0.00'}
              features={[
                '2 Chat Folders limit.',
                '3 Chats limit.',
                'Limited sizes for image generation.',
                '20 Messages limit.',
              ]}
              isPremium={isPremium}
              className='md:mt-8'
            />
            <PricingCard
              title='Premium'
              description='Unlimited access to all features.'
              price={'9.99'}
              features={[
                'No Chat Folders limit.',
                'No Chats limit.',
                'Unlimited image generation size.',
              ]}
              isPremium={isPremium}
            />
            <PricingCard
              title='Enterprise'
              description='For large teams or office.'
              price={'20.50'}
              features={[
                'No Chat Folders limit.',
                'No Chats limit.',
                'Unlimited image generation size.',
                'Dedicated support.',
              ]}
              isPremium={isPremium}
              className='md:mt-8'
            />
          </div>
        </div>
      </section>
      <Separator className='mx-auto max-w-6xl mt-12' />

      {/* FAQ */}
      <section className='mt-32'>
        <h2 className='text-center text-3xl'>
          Frequently Asked Questions
        </h2>
        <div>
          <Accordion
            type='single'
            collapsible
            className='max-w-lg mx-auto mt-6'
          >
            <AccordionItem value='item-1'>
              <AccordionTrigger>
                How does the Chat with AI feature work?
              </AccordionTrigger>
              <AccordionContent className='text-muted-foreground'>
                Chat with AI is an advanced BetterGPT feature that
                allows intelligent conversations with our artificial
                intelligence model. Input queries, get assistance in
                tasks, and enjoy engaging discussions on topics that
                interest you.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-2'>
              <AccordionTrigger>
                How can I use the AI-powered image generation feature?
              </AccordionTrigger>
              <AccordionContent className='text-muted-foreground'>
                Our Image Generation feature enables the creation of
                unique images and graphics using sophisticated AI
                algorithms. Just provide some prompts or a theme, and
                BetterGPT will generate creative and original images
                for you.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-3'>
              <AccordionTrigger>
                Does BetterGPT support real-time translations?
              </AccordionTrigger>
              <AccordionContent className='text-muted-foreground'>
                Yes, BetterGPT offers Seamless Translation, allowing
                real-time translation of text, documents, and
                conversations. You can communicate freely in different
                languages, overcoming language barriers and connecting
                with people worldwide.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-4'>
              <AccordionTrigger>
                How can I get started with BetterGPT?
              </AccordionTrigger>
              <AccordionContent className='text-muted-foreground'>
                To start using BetterGPT, simply register on our
                platform. Once logged in, you can immediately begin
                using the chat, image generation, and translation
                features. Our application is intuitive and
                user-friendly, granting you quick access to all its
                functionalities.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-5'>
              <AccordionTrigger>
                Is my data secure while using BetterGPT?
              </AccordionTrigger>
              <AccordionContent className='text-muted-foreground'>
                Yes, we prioritize the security of your data.
                BetterGPT employs advanced security measures,
                including data encryption, to ensure the
                confidentiality and integrity of your information.
                Your privacy is our top concern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  )
}

export default RootPage
