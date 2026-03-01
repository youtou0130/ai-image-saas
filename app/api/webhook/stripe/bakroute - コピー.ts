import { stripe } from "@/config/stripe";
import { getCreditsByPriceId } from "@/config/plans";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SubscriptionStatus } from "@prisma/client";
import Stripe from "stripe";

export async function POST(request: Request) {
    let event;
	const body = await request.text();
	const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

	if (endpointSecret) {
		const signature = request.headers.get('stripe-signature') as string;
		try {
			event = stripe.webhooks.constructEvent(
				body,
				signature,
				endpointSecret
			);
		} catch {
		    console.log(`⚠️  Webhook signature verification failed.`);
		    return new Response('Webhook signature verification failed', { status: 400 });
		}
	}

    if (!event) {
		return new NextResponse('webhook event found', { status: 500 });
	}

	// Handle the event
	switch (event.type) {
		case 'checkout.session.completed': {
		const checkoutSession = event.data.object as { metadata?: { clerkId?: string }; subscription?: string };

		if (!checkoutSession.metadata?.clerkId) {
			return new NextResponse('clerkId not found', { status: 400 });
		}
		const subscriptionId = checkoutSession.subscription;
		if (!subscriptionId || typeof subscriptionId !== 'string') {
			return new NextResponse('subscription id not found on session', { status: 400 });
		}

		const user = await prisma.user.findUnique({ where: { clearkId: checkoutSession.metadata.clerkId } });
		if (!user) {
			console.error('[Stripe webhook] User not found for clerkId:', checkoutSession.metadata.clerkId);
			return new NextResponse('User not found', { status: 400 });
		}

		const subscription = await stripe.subscriptions.retrieve(subscriptionId);
		const priceId = subscription.items.data[0].price.id;
		const currentPeriodEnd = new Date(subscription.items.data[0].current_period_end * 1000);

		let subscriptionStatus: SubscriptionStatus = "FREE";
		switch (priceId) {
			case 'price_1T4990ECvyU1hIudwKQJAXcR':
				subscriptionStatus = SubscriptionStatus.STATER;
				break;
			case 'price_1T499oECvyU1hIuddt5MlgpE':
				subscriptionStatus = SubscriptionStatus.PRO;
				break;
			case 'price_1T49AKECvyU1hIudL8PuLU8t':
				subscriptionStatus = SubscriptionStatus.ENTERPRISE;
				break;
		}

		// 初回は作成、2回目以降は更新（User と Subscription は 1:1 のため upsert）。credits もここで設定する。
		const credits = getCreditsByPriceId(priceId);
		await prisma.$transaction([
			prisma.user.update({
				where: { clearkId: checkoutSession.metadata.clerkId },
				data: {
					subscriptionStatus,
					...(credits > 0 && { credits }),
				},
			}),
			prisma.subscription.upsert({
				where: { userId: user.id },
				create: {
					userId: user.id,
					stripeSubscriptionId: subscription.id,
					stripePriceId: priceId,
					stripeCurrentPeriodEnd: currentPeriodEnd,
				},
				update: {
					stripeSubscriptionId: subscription.id,
					stripePriceId: priceId,
					stripeCurrentPeriodEnd: currentPeriodEnd,
				},
			}),
		]);

		break;
	}
		case 'customer.subscription.updated': {
			const subscription = event.data.object as Stripe.Subscription;
			if (subscription.status !== 'active') break;

			const priceId = typeof subscription.items.data[0].price === 'string'
				? subscription.items.data[0].price
				: subscription.items.data[0].price.id;
			const credits = getCreditsByPriceId(priceId);
			if (credits <= 0) break;

			const customerId = typeof subscription.customer === 'string'
				? subscription.customer
				: (subscription.customer as Stripe.Customer)?.id;

			const ourSubscription = await prisma.subscription.findUnique({
				where: { stripeSubscriptionId: subscription.id },
				select: { userId: true },
			});
			if (ourSubscription) {
				await prisma.user.update({
					where: { id: ourSubscription.userId },
					data: { credits },
				});
				break;
			}
			if (customerId) {
				await prisma.user.update({
					where: { stripeCustomerId: customerId },
					data: { credits },
				});
			}
			break;
		}
	}

    return new NextResponse('webhook event handled', { status: 200 });
}