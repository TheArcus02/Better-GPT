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
}
