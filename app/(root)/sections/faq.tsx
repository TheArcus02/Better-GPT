import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import React from 'react'

const Faq = () => {
  return (
    <>
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
              BetterGPT will generate creative and original images for
              you.
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
              Yes, we prioritize the security of your data. BetterGPT
              employs advanced security measures, including data
              encryption, to ensure the confidentiality and integrity
              of your information. Your privacy is our top concern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  )
}

export default Faq
