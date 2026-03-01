import { stripe } from "@/config/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { handleSubscriptionCreated, handleSubscriptionUpdated, handleSubscriptionDeleted } from "@/lib/subscriptions";

export async function POST(request: Request) {
    try{
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
	    
		const subscription = event.data.object as Stripe.Subscription;

		// Handle the event
		switch (event.type) {
			case 'customer.subscription.created': {
				await handleSubscriptionCreated(subscription);
				break;
			}
			case 'customer.subscription.updated': {
				await handleSubscriptionUpdated(subscription);
				break;
			}
			case 'customer.subscription.deleted': {
				await handleSubscriptionDeleted(subscription);
				break;
			}
		}
	
		return new NextResponse('webhook event handled', { status: 200 });
	}catch(error){
		console.error("Stripe Webhook Error:", error);
		return new NextResponse('Webhook error', { status: 500 });
	}


}