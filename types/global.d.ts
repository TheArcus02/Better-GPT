import { LucideIcon } from 'lucide-react'

export {}

declare global {
  type NavRoute = {
    icon: LucideIcon | null
    href: string
    label: string
    pro: boolean
  }
}
