"use server";
import Stripe from "stripe";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { StripeState } from "@/types/actions";
import { stripe } from "@/config/stripe";

export async function createStripeSession(
	prevState: StripeState, 
	formData: FormData
): Promise<StripeState> {
	
	const priceId = formData.get("priceId") as string | null;
	if (!priceId) {
		return { status: "error", error: "プランを選択してください。", redirectUrl: "" };
	}

	const user = await currentUser();
	if (!user) {
		return { status: "error", error: "認証が必要です。", redirectUrl: "" };
	}

	try {

        const dbUser = await prisma.user.findUnique({
			where: { clearkId: user.id },
		});

        let customerId = dbUser?.stripeCustomerId;

		if(!customerId){
			const customer = await stripe.customers.create(
				{
					email: user.emailAddresses[0].emailAddress,
					metadata: {
						clerkId: user.id,
					},
				}
			);
			await prisma.user.update({
				where: { clearkId: user.id },
				data: {
					stripeCustomerId: customer.id,
				},
			});
			customerId = customer.id;
		}


		const session = await stripe.checkout.sessions.create({
			customer: customerId,
			line_items: [
				{ price: priceId, quantity: 1 },
			],
			mode: "subscription",
			success_url: `${process.env.BASE_URL}/dashboard/?success=true`,
			cancel_url: `${process.env.BASE_URL}/dashboard/?canceled=true`,
			metadata: {
				clerkId: user.id,
				subscription: priceId,
			},
		});

            if(!session.url){
                throw new Error("セッションの作成に失敗しました");
            }

			return {
				status: "success",
				error: "",
				redirectUrl: session.url,
			};
	   }catch(error) {
		   console.error("Create Stripe Session Error:", error);
		   return {
			status: "error",
			error: "セッションの作成に失敗しました",
			redirectUrl: "",
		};
	}
}