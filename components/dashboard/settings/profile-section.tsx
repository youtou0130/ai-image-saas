import React from 'react'
import { SubscriptionStatus } from '@prisma/client';
import { format } from 'date-fns';

interface ProfileSectionProps {
	email: string;
	subscriptionStatus: string;
	nextBillingData?: Date;
}

const ProfileSection = ({
	email, 
	subscriptionStatus, 
	nextBillingData
}: ProfileSectionProps) => {
  return (
    <div className="space-y-4">
		<h2 className="text-xl font-semibold">プロフィール</h2>
		<div className="grid gap-4 p-4 border-2 rounded-lg">
			<div className="grid gap-1">
				<p className="text-sm font-medium">メールアドレス</p>
				<p className="text-sm text-muted-foreground">{email}</p>
			</div>

			<div className="grid gap-1">
				<p className="text-sm font-medium">現在プラン</p>
				<p className="text-sm text-muted-foreground">{subscriptionStatus}</p>
			</div>

			<div className="grid gap-1">
				<p className="text-sm font-medium">次回の更新日</p>
				<p className="text-sm text-muted-foreground">{nextBillingData ? format(nextBillingData, 'yyyy/MM/dd') : 'N/A'}</p>
			</div>
		</div>
	</div>
  )
}

export default ProfileSection