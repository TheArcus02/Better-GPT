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
