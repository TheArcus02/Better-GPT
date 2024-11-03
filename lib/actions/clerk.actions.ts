import { clerkClient } from '@clerk/nextjs/server'
import { getUsername, handleError } from '../utils'

export async function getUsernameById(userId: string) {
  try {
    return 'mike'
    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    return getUsername(user)
  } catch (error) {
    handleError('[GET_USERNAME_BY_ID_ERROR]', error)
  }
}
