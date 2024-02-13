import { auth, currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'
import { stripe } from '@/lib/stripe'
import { absoluteUrl } from '@/lib/utils'
import { checkSubscription } from '@/lib/subscription'

const afterUrl = absoluteUrl('/app/settings')

export async function GET() {
  try {
    const { userId } = auth()
    const user = await currentUser()

    if (!userId || !user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const userSubscription =
      await prismadb.userSubscription.findUnique({
        where: { userId },
      })

    if (
      userSubscription &&
      userSubscription.stripeCustomerId &&
      (await checkSubscription())
    ) {
      const stripeSession =
        await stripe.billingPortal.sessions.create({
          customer: userSubscription.stripeCustomerId,
          return_url: afterUrl,
        })

      return new NextResponse(
        JSON.stringify({ url: stripeSession.url }),
      )
    }

    const stripeSession = await stripe.checkout.sessions.create({
      customer: userSubscription?.stripeCustomerId ?? undefined,
      success_url: afterUrl,
      cancel_url: afterUrl,
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      customer_email: !userSubscription?.stripeCustomerId
        ? user.emailAddresses[0].emailAddress
        : undefined,
      line_items: [
        {
          price_data: {
            currency: 'USD',
            product_data: {
              name: 'BetterGPT Subscription',
              description:
                'Unlock the full potential of the AI. Get unlimited access to all features.',
            },
            unit_amount: 999,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    })

    return new NextResponse(
      JSON.stringify({ url: stripeSession.url }),
    )
  } catch (error) {
    console.log('[STRIPE_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
