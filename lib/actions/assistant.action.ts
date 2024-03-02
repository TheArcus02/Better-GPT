'use server'

import { currentUser } from '@clerk/nextjs'
import prisma from '../prismadb'
import { handleError } from '../utils'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function getAssistantById(id: string) {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error('Unauthorized')
    }

    const dbAssistant = await prisma.assistant.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (dbAssistant.userId !== user.id) {
      throw new Error('Unauthorized')
    }

    const assistant = await openai.beta.assistants.retrieve(
      dbAssistant.openAiID,
    )

    return assistant
  } catch (error) {
    handleError('[ASSISTANT_ERROR]', error)
  }
}
