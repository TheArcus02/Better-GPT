'use server'

import { clerkClient, currentUser } from '@clerk/nextjs'
import { getUsernameById, handleError } from '../utils'
import OpenAI, { NotFoundError } from 'openai'
import prisma from '../prismadb'
import { AssistantMessage } from '@prisma/client'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface GetAssistantProps {
  take: number
  skip: number
  userId?: string
  shared?: boolean
  includeOpenAiObj?: boolean
}
export async function getAssistants({
  take,
  skip,
  userId,
  shared,
  includeOpenAiObj = true,
}: GetAssistantProps) {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error('Unauthorized')
    }

    const assistants = await prisma.assistant.findMany({
      take,
      skip,
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        shared,
        userId,
      },
    })

    const total = await prisma.assistant.count({
      where: {
        shared,
        userId,
      },
    })

    if (!assistants.length) {
      return {
        data: [],
      }
    }

    let openAiObj: OpenAiAssistant[]

    if (includeOpenAiObj) {
      openAiObj = (await Promise.all(
        assistants.map((assistant) =>
          openai.beta.assistants.retrieve(assistant.openaiId),
        ),
      )) as OpenAiAssistant[]
    }

    let username: string | undefined

    if (userId) {
      username = await getUsernameById(userId)
    }

    const data: AssistantWithAdditionalData[] = await Promise.all(
      assistants.map(async (a, i) => ({
        openAiObj: includeOpenAiObj ? openAiObj![i] : null,
        username: username
          ? username
          : await getUsernameById(a.userId),
        ...a,
        isOwner: a.userId === user.id,
      })),
    )

    return {
      data,
      hasNextPage: skip + take < total,
      totalPages: Math.ceil(total / take),
    }
  } catch (error) {
    handleError('[ASSISTANT_ERROR]', error)
  }
}

export async function getAssistantById(id: string) {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error('Unauthorized')
    }

    const dbAssistant = await prisma.assistant.findFirst({
      where: {
        id,
      },
    })

    if (!dbAssistant) {
      throw new Error('Assistant not found')
    }

    const assistant = (await openai.beta.assistants.retrieve(
      dbAssistant.openaiId,
    )) as OpenAiAssistant

    const res: AssistantWithAdditionalData = {
      ...dbAssistant,
      openAiObj: assistant,
      isOwner: dbAssistant.userId === user.id,
      username: await getUsernameById(dbAssistant.userId),
    }

    return res
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

    const dbAssistant = await prisma.assistant.findFirst({
      where: {
        id: assistantId,
      },
    })

    if (!dbAssistant) {
      throw new Error('Assistant not found')
    }

    const files = await openai.beta.assistants.files.list(
      dbAssistant.openaiId,
    )

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

export async function getOrCreateThread() {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error('Unauthorized')
    }

    const dbThread = await prisma.assistantThread.findFirst({
      where: {
        userId: user.id,
      },
    })

    if (dbThread) {
      const thread = await openai.beta.threads.retrieve(
        dbThread.openaiId,
      )
      return thread
    } else if (user.privateMetadata?.threadId) {
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

type StoreMessageInDbProps = Omit<
  AssistantMessage,
  'createdAt' | 'updatedAt' | 'id'
>

export async function storeMessageInDb({
  assistantId,
  content,
  openaiId,
  role,
  threadId,
  userId,
}: StoreMessageInDbProps) {
  try {
    const thread = await prisma.assistantThread.findFirst({
      where: {
        openaiId: threadId,
      },
    })

    if (!thread) {
      throw new Error('Thread not found')
    }

    const assistant = await prisma.assistant.findFirst({
      where: {
        id: assistantId,
      },
    })

    if (!assistant) {
      throw new Error('Assistant not found')
    }

    const createdMessage = await prisma.assistantMessage.create({
      data: {
        thread: {
          connect: {
            id: thread.id,
          },
        },
        assistant: {
          connect: {
            id: assistant.id,
          },
        },
        openaiId,
        content,
        role,
        userId,
      },
    })

    return createdMessage
  } catch (error) {
    handleError('[ASSISTANT_ERROR]', error)
  }
}

export async function getAssistantMessages(
  assistantId: string,
  threadId: string,
) {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error('Unauthorized')
    }

    const thread = await prisma.assistantThread.findFirst({
      where: {
        openaiId: threadId,
      },
    })

    if (!thread) {
      throw new Error('Thread not found')
    }

    const dbMessages = await prisma.assistantMessage.findMany({
      where: {
        threadId: thread.id,
        assistantId,
      },
    })

    if (!dbMessages.length) {
      return []
    }

    const messages = await Promise.all(
      dbMessages.map((message) =>
        openai.beta.threads.messages.retrieve(
          threadId,
          message.openaiId,
        ),
      ),
    )

    return messages
  } catch (error) {
    handleError('[ASSISTANT_ERROR]', error)
  }
}
