'use client'

import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './card'

export const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string
    name: string
    title: string
  }[]
  direction?: 'left' | 'right'
  speed?: 'fast' | 'normal' | 'slow'
  pauseOnHover?: boolean
  className?: string
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    addAnimation()
  }, [])
  const [start, setStart] = useState(false)
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirection()
      getSpeed()
      setStart(true)
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'forwards',
        )
      } else {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'reverse',
        )
      }
    }
  }
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === 'fast') {
        containerRef.current.style.setProperty(
          '--animation-duration',
          '20s',
        )
      } else if (speed === 'normal') {
        containerRef.current.style.setProperty(
          '--animation-duration',
          '40s',
        )
      } else {
        containerRef.current.style.setProperty(
          '--animation-duration',
          '80s',
        )
      }
    }
  }
  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20 overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className,
      )}
    >
      <div
        ref={scrollerRef}
        className={cn(
          'flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap',
          start && 'animate-scroll ',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
      >
        {items.map((item, idx) => (
          <Card className='w-[350px]' key={item.name}>
            <CardHeader>
              <CardTitle className='ml-3'>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote>
                <span className='text-sm leading-[1.6] text-gray-100 font-normal'>
                  {item.quote}
                </span>
                <div className='mt-6 flex flex-row items-center'>
                  <span className='flex flex-col gap-1'>
                    <span className=' text-sm leading-[1.6] text-muted-foreground font-normal'>
                      {item.title}
                    </span>
                  </span>
                </div>
              </blockquote>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
