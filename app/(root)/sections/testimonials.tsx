import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'
import React from 'react'

const testimonials = [
  {
    quote:
      'BetterGPT transformed the way we approach creative projects. Its AI-driven tools unlocked new levels of efficiency and creativity, making the impossible, possible.',
    name: 'Jane Doe',
    title: 'Creative Director at Creatives Inc.',
  },
  {
    quote:
      'Implementing BetterGPT into our workflow has been a game-changer. The translation tool alone has opened up new markets for our products, bridging language barriers effortlessly.',
    name: 'John Smith',
    title: 'Head of International Expansion, GlobalTech Solutions',
  },
  {
    quote:
      "As a content creator, BetterGPT has been an invaluable asset. From generating unique image ideas to enhancing my writing with LLM chats, it's like having a creative partner always ready to collaborate.",
    name: 'Alex Rivera',
    title: 'Freelance Writer & Photographer',
  },
  {
    quote:
      'BetterGPT has revolutionized our customer support. The AI chat solutions have not only improved response times but also greatly enhanced customer satisfaction.',
    name: 'Emily Turner',
    title: 'Customer Support Manager, Online Retail Giant',
  },
  {
    quote:
      'The image generation tool in BetterGPT is nothing short of magical. It has allowed me to bring my wildest design concepts to life, providing a constant source of inspiration and creativity.',
    name: 'Marco Chen',
    title: 'Graphic Designer, Creative Studios',
  },
]

const Testimonials = () => {
  return (
    <InfiniteMovingCards
      items={testimonials}
      direction='right'
      speed='slow'
    />
  )
}

export default Testimonials
