import React from 'react'
import PageContainer from '@/components/dashboard/page-container'
import PageHeader from '@/components/dashboard/page-header'
import ProfileSection from '@/components/dashboard/settings/profile-section'
import SubscriptionSettingsForm from '@/components/dashboard/settings/subscription-settings-form'
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

const SettingsPage = async () => {

  const user = await currentUser();

	if(!user){
		return <div>ログインしてください。</div>
	}

    const dbUser = await prisma.user.findUnique({
		where: { clearkId: user.id },
		include: { subscriptions: true },
	});

    if(!dbUser){
		throw new Error('ユーザーが見つかりません。');
	}

    

  return (
    <PageContainer>
        <PageHeader
		   title="設定"
		   description="アカウントの確認とサブスクリプションの管理を行うことができます。"
		 />
		 {/* アカウントの確認 */}
		 <div className="max-w-2xl">
			<ProfileSection
			  email={user.emailAddresses[0].emailAddress}
			  subscriptionStatus={dbUser.subscriptionStatus}
			  nextBillingData={dbUser.subscriptions?.stripeCurrentPeriodEnd}
			/>
		 </div>



		 {/* サブスクリプション管理用のフォーム・ボタン */}
		 <div className="max-w-2xl">
			<SubscriptionSettingsForm user={dbUser}/>
		 </div>
    </PageContainer>
  )
}

export default SettingsPage