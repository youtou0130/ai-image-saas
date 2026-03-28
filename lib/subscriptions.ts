import { prisma } from "@/lib/prisma";
import Stripe from "stripe";
import { SubscriptionStatus } from "@prisma/client";
import { STRIPE_PLANS } from "@/config/plans";

function stripeCustomerId(subscription: Stripe.Subscription): string | undefined {
	const c = subscription.customer;
	if (typeof c === "string") return c;
	if (c && typeof c === "object" && "deleted" in c && c.deleted) return undefined;
	if (c && typeof c === "object" && "id" in c) return c.id;
	return undefined;
}

function getPlanDetails(subscription: Stripe.Subscription){
	const first = subscription.items.data[0];
	if (!first) {
		throw new Error("Subscription has no line items");
	}
    const priceId = first.price.id;
	let status: SubscriptionStatus = "FREE";
	let credits = 5;
	
	switch(priceId){
		case STRIPE_PLANS.STATER:
			status = SubscriptionStatus.STATER;
			credits = 50;
			break;
		case STRIPE_PLANS.PRO:
			status = SubscriptionStatus.PRO;
			credits = 120;
			break;
		case STRIPE_PLANS.ENTERPRISE:
			status = SubscriptionStatus.ENTERPRISE;
			credits = 300;
			break;
	}

	return { priceId, status, credits };
}

export async function handleSubscriptionCreated(
	subscription: Stripe.Subscription
){
    const { priceId, status, credits } = getPlanDetails(subscription);
	const customerId = stripeCustomerId(subscription);
	if (!customerId) {
		throw new Error("Subscription missing customer id");
	}
	const periodEnd = new Date(subscription.items.data[0].current_period_end * 1000);

    return prisma.user.update({
		where: { stripeCustomerId: customerId },
		data: {
			subscriptionStatus: status,
			credits: credits,
			subscriptions: {
				upsert: {
					create: {
						stripeSubscriptionId: subscription.id,
						stripePriceId: priceId,
						stripeCurrentPeriodEnd: periodEnd,
					},
					update: {
						stripePriceId: priceId,
						stripeCurrentPeriodEnd: periodEnd,
					},
				},
			},
		},
	})
}


export async function handleSubscriptionUpdated(
	subscription: Stripe.Subscription
){
    const { priceId, status, credits } = getPlanDetails(subscription);
	const customerId = stripeCustomerId(subscription);
	if (!customerId) {
		throw new Error("Subscription missing customer id");
	}
	const periodEnd = new Date(subscription.items.data[0].current_period_end * 1000);
	const effectiveStatus = subscription.cancel_at_period_end
		? SubscriptionStatus.FREE
		: status;
	const effectiveCredits = subscription.cancel_at_period_end ? 0 : credits;

    return prisma.user.update({
		where: { stripeCustomerId: customerId },
		data: {
			subscriptionStatus: effectiveStatus,
			credits: effectiveCredits,
			subscriptions: {
				upsert: {
					create: {
						stripeSubscriptionId: subscription.id,
						stripePriceId: priceId,
						stripeCurrentPeriodEnd: periodEnd,
					},
					update: {
						stripePriceId: priceId,
						stripeCurrentPeriodEnd: periodEnd,
					},
				},
			},
		},
	})
}


export async function handleSubscriptionDeleted(
	subscription: Stripe.Subscription
){
	const customerId = stripeCustomerId(subscription);
	if (!customerId) {
		throw new Error("Subscription missing customer id");
	}
    return prisma.user.update({
		where: { stripeCustomerId: customerId },
		data: {
			subscriptionStatus: SubscriptionStatus.FREE,
			credits: 0,
			subscriptions: {
				delete: true,
			},
		},
	})
}