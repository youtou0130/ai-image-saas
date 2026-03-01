"use client";

import AuthButton from "../auth/auth-button";
import NavItems from "./nav-items";

/** クレジット表示以外のナビ（クライアント専用）。MobileNav と DashboardNav の両方で使用。 */
export default function NavContent() {
	return (
		<>
			<NavItems />
			<div className="my-4 px-4 md:hidden">
				<AuthButton />
			</div>
		</>
	);
}
