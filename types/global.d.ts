import { LucideIcon } from 'lucide-react'

export {}

declare global {
  type NavRoute = {
    icon: LucideIcon | null
    href: string
    label: string
    subRoutes?: Array<
      NavRoute & {
        titleRoute?: boolean
        description: string
      }
    >
  }

  type ChatTab = {
    id: string
    name: string
  }

  type ChatModel = 'gpt-3.5-turbo' | 'gpt-4'

  type ImageModel = 'dall-e-2' | 'dall-e-3'
}
