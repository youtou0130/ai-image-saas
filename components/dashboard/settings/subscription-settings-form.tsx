"use client";
import React from 'react'
import { User, SubscriptionStatus } from "@prisma/client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';

interface SettingsFormProps {
	user: User;
}

const SubscriptionSettingsForm = ({user}: SettingsFormProps) => {
  const router = useRouter();

  const handleManageSubscription = async () => {
	try{
        const response = await fetch("/api/create-portal-session", {
			method: "POST",
		})

		const data = await response.json();
		router.push(data.url);
		//toast.success("サブスクリプションの管理画面に移動しました。");
	}catch(error){
		console.error("Manage Subscription Error:", error);
	}
  };

  return (
    <div className="grid gap-4 p-4 border-2 rounded-lg">
		<div className="grid gap-2">
            {user.subscriptionStatus !== SubscriptionStatus.FREE ? (
				<>
				  <p className="text-sm text-muted-foreground">
					現在のサブスクリプションを管理します
				  </p>
				  <Button onClick={handleManageSubscription}>
					サブスクリプションを管理
				  </Button>
				</>
			) : (
				<p className="text-sm text-muted-foreground">
					現在のプラン: 無料プラン
				</p>
			)}
		</div>
	</div>
  )
}

export default SubscriptionSettingsForm