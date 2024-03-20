import { auth } from '@clerk/nextjs'
import prismadb from './prismadb'
import { NextRequest } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'

export const checkCreatedChats = async (req?: NextRequest) => {
  let userId

  if (req) {
    const { userId: userIdFromReq } = getAuth(req)
    userId = userIdFromReq
  } else {
    userId = auth().userId
  }

  if (!userId) return false

  const createdChats = await prismadb.chat.count({
    where: { userId },
  })

  return !(createdChats >= 3)
}

export const checkCreatedFolders = async (req?: NextRequest) => {
  let userId

  if (req) {
    const { userId: userIdFromReq } = getAuth(req)
    userId = userIdFromReq
  } else {
    userId = auth().userId
  }

  if (!userId) return false

  const createdFolders = await prismadb.folder.count({
    where: { userId },
  })

  return !(createdFolders >= 2)
}

export const checkCreatedMessages = async (req?: NextRequest) => {
  let userId

  if (req) {
    const { userId: userIdFromReq } = getAuth(req)
    userId = userIdFromReq
  } else {
    userId = auth().userId
  }
  if (!userId) return false

  const createdMessages = await prismadb.message.count({
    where: { userId },
  })

  return !(createdMessages >= 20)
}

export const checkCreatedImages = async (req?: NextRequest) => {
  let userId

  if (req) {
    const { userId: userIdFromReq } = getAuth(req)
    userId = userIdFromReq
  } else {
    userId = auth().userId
  }

  if (!userId) return false

  const createdImages = await prismadb.image.count({
    where: { userId },
  })

  return !(createdImages >= 10)
}

export const checkCreatedAssistantMessages = async (
  req?: NextRequest,
) => {
  let userId

  if (req) {
    const { userId: userIdFromReq } = getAuth(req)
    userId = userIdFromReq
  } else {
    userId = auth().userId
  }

  if (!userId) return false

  const createdAssistantMessages =
    await prismadb.assistantMessage.count({
      where: { userId },
    })

  return !(createdAssistantMessages >= 20)
}
