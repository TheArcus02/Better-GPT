import { auth } from '@clerk/nextjs'
import prismadb from './prismadb'

export const checkCreatedChats = async () => {
  const { userId } = auth()

  if (!userId) return false

  const createdChats = await prismadb.chat.count({
    where: { userId },
  })

  return !(createdChats >= 3)
}

export const checkCreatedFolders = async () => {
  const { userId } = auth()

  if (!userId) return false

  const createdFolders = await prismadb.folder.count({
    where: { userId },
  })

  return !(createdFolders >= 2)
}

export const checkCreatedMessages = async () => {
  const { userId } = auth()

  if (!userId) return false

  const createdMessages = await prismadb.message.count({
    where: { userId },
  })

  return !(createdMessages >= 20)
}
