import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// export async function POST(request: NextRequest) {
// 	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
// 	const { priceId } = await request.json();

// 	const session = await stripe.checkout.sessions.create({
// 		payment_method_types: ["card"],
// 		mode: "subscription",
// 		success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
// 		cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
// 	});

// 	return NextResponse.json(session);
// }
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/config/stripe";

export async function POST(){
	try{
		const user = await currentUser();
		if(!user){
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

        const dbUser = await prisma.user.findUnique({
			where: { clearkId: user.id },
		});

		if(!dbUser){
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		//const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
		const session = await stripe.billingPortal.sessions.create({
			customer: dbUser?.stripeCustomerId!,
			return_url: `${process.env.BASE_URL}/dashboard/settings`,
		});

		if(!session.url){
			return NextResponse.json({ error: "Failed to create portal session" }, { status: 500 });
		}

		return NextResponse.json({ url: session.url });

	}catch(error){
		console.error("Create Portal Session Error:", error);
		return NextResponse.json({ error: "Failed to create portal session" }, { status: 500 });
	}
}