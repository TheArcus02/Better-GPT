'use server'

import { currentUser } from '@clerk/nextjs'
import { handleError } from '../utils'
import OpenAI, { NotFoundError } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function getAssistantById(id: string) {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error('Unauthorized')
    }

    const assistant = (await openai.beta.assistants.retrieve(
      id,
    )) as OpenAiAssistant

    return assistant
  } catch (error) {
    if (error instanceof NotFoundError) {
      return null
    }
    handleError('[ASSISTANT_ERROR]', error)
  }
}

export async function getAssistantFiles(assistantId: string) {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error('Unauthorized')
    }

    const files = await openai.beta.assistants.files.list(assistantId)

    return files
  } catch (error) {
    handleError('[ASSISTANT_ERROR]', error)
  }
}

export async function getFilesDetailsList(fileIds: string[]) {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error('Unauthorized')
    }

    const files = await Promise.all(
      fileIds.map((fileId) => openai.files.retrieve(fileId)),
    )

    return files
  } catch (error) {
    if (error instanceof NotFoundError) {
      return null
    }
    handleError('[ASSISTANT_ERROR]', error)
  }
}
