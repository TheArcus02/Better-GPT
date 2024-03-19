import { User } from '@clerk/nextjs/server'
import { Assistant } from '@prisma/client'
import { LucideIcon } from 'lucide-react'
import { OpenAI } from 'openai'

export {}

declare global {
  type UserMetadata = {
    assistants?: string[]
    threadId?: string
  }

  type AssistantMetadata = {
    imagePublicId: string
    userId: string
    shared: boolean
  }

  type OpenAiAssistant = OpenAI.Beta.Assistants.Assistant & {
    metadata: AssistantMetadata
  }

  type AdditionalAssistantData = {
    openAiObj?: OpenAiAssistant | null
    username?: string
    isOwner?: boolean
  }

  type AssistantWithAdditionalData = Assistant &
    AdditionalAssistantData

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
