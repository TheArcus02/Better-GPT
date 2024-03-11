'use server'

import { clerkClient, currentUser } from '@clerk/nextjs'
import { getUsername, handleError } from '../utils'
import OpenAI, { NotFoundError } from 'openai'
import prisma from '../prismadb'

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

export async function getUserAssistants(
  userId: string,
  shared = false,
) {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error('Unauthorized')
    }

    const requestedUser = await clerkClient.users.getUser(userId)

    const metadata = requestedUser.privateMetadata as UserMetadata

    if (!metadata?.assistants) {
      return []
    }

    const assistants = (await Promise.all(
      metadata.assistants.map((assistantId) =>
        openai.beta.assistants.retrieve(assistantId),
      ),
    )) as OpenAiAssistant[]

    const username = getUsername(requestedUser)

    const assistantsWithUsername = assistants.map((assistant) => ({
      ...assistant,
      username,
    }))

    return shared
      ? assistantsWithUsername.filter(
          (assistant) => assistant.metadata.shared === false,
        )
      : assistantsWithUsername
  } catch (error) {
    handleError('[ASSISTANT_ERROR]', error)
  }
}

export async function getOrCreateThread() {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error('Unauthorized')
    }

    if (user.privateMetadata?.threadId) {
      const thread = await openai.beta.threads.retrieve(
        user.privateMetadata.threadId as string,
      )
      return thread
    }

    const thread = await openai.beta.threads.create({
      metadata: {
        userId: user.id,
      },
    })

    await prisma.assistantThread.create({
      data: {
        openaiId: thread.id,
        userId: user.id,
      },
    })

    await clerkClient.users.updateUser(user.id, {
      privateMetadata: {
        ...user.privateMetadata,
        threadId: thread.id,
      },
    })

    return thread
  } catch (error) {
    handleError('[ASSISTANT_ERROR]', error)
  }
}
