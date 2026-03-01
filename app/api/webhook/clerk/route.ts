import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import { createUser, syncUser, deleteUser } from '@/lib/users'
import { NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)

    // Do something with payload
    // For this guide, log payload to console
    const id = evt.data?.id
    const eventType = evt.type ?? 'unknown'
	if (eventType === 'user.created') {
		const data = evt.data as { id?: string; email_addresses?: Array<{ email_address?: string }> } | undefined
		const clerkId = data?.id
		const email = data?.email_addresses?.[0]?.email_address
		console.log(`Received webhook with ID ${clerkId} and event type of ${eventType}`)
		console.log('Webhook payload:', data)
		if (typeof clerkId !== 'string' || typeof email !== 'string') {
			return new Response('Missing user id or email', { status: 400 })
		}
		try {
			const user = await createUser(clerkId, email)
			return NextResponse.json({ user }, { status: 200 })
		} catch (err) {
			console.error('Webhook createUser error:', err)
			return new Response('Failed to create user', { status: 500 })
		}
	}

	if (eventType === 'user.updated') {
		const data = evt.data as { id?: string; primary_email_address_id?: string; email_addresses?: Array<{ id?: string; email_address?: string }> } | undefined
		const clerkId = data?.id
		const primaryId = data?.primary_email_address_id
		const email = primaryId
			? data?.email_addresses?.find((e) => e.id === primaryId)?.email_address
			: data?.email_addresses?.[0]?.email_address
		console.log(`Received webhook with ID ${clerkId} and event type of ${eventType}`)
		console.log('Webhook payload:', data)
		if (typeof clerkId !== 'string' || typeof email !== 'string') {
			return new Response('Missing user id or email', { status: 400 })
		}
		try {
			const user = await syncUser(clerkId, email)
			return NextResponse.json({ user }, { status: 200 })
		} catch (err) {
			console.error('Webhook syncUser (updated) error:', err)
			return new Response('Failed to sync user', { status: 500 })
		}
	}

	if (eventType === 'user.deleted') {
		const data = evt.data as { id?: string } | undefined
		const clerkId = data?.id
		console.log(`Received webhook with ID ${clerkId} and event type of ${eventType}`)
		console.log('Webhook payload:', data)
		if (typeof clerkId !== 'string') {
			return new Response('Missing user id', { status: 400 })
		}
		try {
			const user = await deleteUser(clerkId)
			return NextResponse.json({ user }, { status: 200 })
		} catch (err) {
			console.error('Webhook deleteUser error:', err)
			return new Response('Failed to delete user', { status: 500 })
		}
	}

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    const message = err instanceof Error ? err.message : 'Error verifying webhook'
    return new Response(
      process.env.NODE_ENV === 'development' ? message : 'Error verifying webhook',
      { status: 400 }
    )
  }
}