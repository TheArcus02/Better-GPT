import Stripe from 'stripe'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { NextResponse } from "next/server";
import prismadb from '@/lib/prismadb'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get('stripe-signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
  } catch (error: any) {
    return new NextResponse(error.message, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  // User subscribes for the first time
  if (event.type === 'checkout.session.completed') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    )
    if (!session?.metadata?.userId) {
      return new NextResponse('User id is required', { status: 400 })
    }

    await handleSubscriptionUpdateOrCreate(
      session.metadata.userId,
      subscription,
    )
  }

  // User updates subscription
  if (event.type === 'invoice.payment_succeeded') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    )

    await prismadb.userSubscription.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
      },
    })
  }

  return new NextResponse(null, { status: 200 })
}

async function handleSubscriptionUpdateOrCreate(
  userId: string,
  subscription: Stripe.Subscription,
) {
  const existingSubscription =
    await prismadb.userSubscription.findUnique({
      where: { userId },
    })

  const subscriptionData = {
    userId,
    stripeSubscriptionId: subscription.id,
    stripeCustomerId: subscription.customer as string,
    stripePriceId: subscription.items.data[0].price.id,
    stripeCurrentPeriodEnd: new Date(
      subscription.current_period_end * 1000,
    ),
  }

  if (existingSubscription) {
    // Update existing subscription
    await prismadb.userSubscription.update({
      where: { userId },
      data: subscriptionData,
    })
  } else {
    // Create new subscription
    await prismadb.userSubscription.create({
      data: subscriptionData,
    })
  }
}
