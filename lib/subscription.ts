import { auth } from '@clerk/nextjs'
import prismadb from '@/lib/prismadb'
import { NextRequest } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'

const DAY_IN_MS = 86_400_000

export const checkSubscription = async (req?: NextRequest) => {
  let userId

  if (req) {
    const { userId: userIdFromReq } = getAuth(req)
    userId = userIdFromReq
  } else {
    userId = auth().userId
  }

  if (!userId) return false

  const userSubscription = await prismadb.userSubscription.findUnique(
    {
      where: { userId },
      select: {
        stripeCurrentPeriodEnd: true,
        stripeCustomerId: true,
        stripePriceId: true,
        stripeSubscriptionId: true,
      },
    },
  )

  if (!userSubscription) return false

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now()

  return !!isValid
}
