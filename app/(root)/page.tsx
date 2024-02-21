import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import Hero from './sections/hero'
import Testimonials from './sections/testimonials'
import Features from './sections/features'
import Pricing from './sections/pricing'
import Faq from './sections/faq'

const RootPage = async () => {
  return (
    <div className='h-full mt-16 px-6'>
      <section>
        <Hero />
      </section>
      <section className='mb-40'>
        <Testimonials />
      </section>

      <section className='max-w-6xl mx-auto px-4 md:px-16'>
        <Features />
      </section>

      <section className='mt-40 max-w-7xl mx-auto'>
        <Pricing />
      </section>
      <Separator className='mx-auto max-w-6xl mt-12' />

      <section className='mt-32'>
        <Faq />
      </section>
    </div>
  )
}

export default RootPage
