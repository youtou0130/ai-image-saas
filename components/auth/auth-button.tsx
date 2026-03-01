"use client";

import React from 'react'
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/nextjs'
import { Button } from '../ui/button'

const AuthButton = () => {

	const { userId} = useAuth();
    if (userId) {
		return (
			<div className="flex items-center gap-4">
				<UserButton />
			</div>
		)
	}

  return (
    <div className="flex items-center gap-4">
		<SignInButton
		 mode="modal"
		 fallbackRedirectUrl={"/dashboard"}
		 forceRedirectUrl={"/dashboard"}
		 >
			<Button variant="outline">ログイン</Button>
		</SignInButton>
		<SignUpButton
		 mode="modal"
		 fallbackRedirectUrl={"/dashboard"}
		 forceRedirectUrl={"/dashboard"}
		 >
			<Button variant="default">新規登録</Button>
		</SignUpButton>
	</div>
  )
}

export default AuthButton;
