import { User } from '@clerk/nextjs/server'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function isInvalidUsername(user: User) {
  return (
    !user.id ||
    !(
      user.firstName ||
      user.lastName ||
      user.username ||
      user.emailAddresses[0].emailAddress
    )
  )
}

export function getUsername(user: User) {
  if (user.firstName || user.lastName) {
    return `${user.firstName} ${user.lastName}`
  } else {
    return user.emailAddresses[0].emailAddress
  }
}

export function handleError(reason: string, error: unknown) {
  if (error instanceof Error) {
    console.log(error.message)
    throw new Error(`${reason}: ${error.message}`)
  } else if (typeof error === 'string') {
    console.log(error)
    throw new Error(`${reason}: ${error}`)
  } else {
    console.log(error)
    throw new Error(`${reason}: ${JSON.stringify(error)}`)
  }
}

export function formatFileSize(bytes: number) {
  if (bytes === 0) return '0 Bytes'

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${
    sizes[i]
  }`
}
