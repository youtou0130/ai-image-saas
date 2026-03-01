import CreditDisplay from "./credit-display";
import NavContent from "./nav-content";
import AuthButton from "../auth/auth-button";
import { Button } from "../ui/button";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

const DashboardNav =  async() => {
	const user = await currentUser();

	return (
		<nav className="grid gap-2 items-start">
			<NavContent />

			<div className="my-4 px-4 md:hidden">
				<AuthButton />
			</div>

			<div className="p-4">
				<CreditDisplay />
				{user && (
					<Button asChild className="w-full mt-4" variant={"premium"}>
					    <Link href="/dashboard/plan">アップグレード</Link>
				    </Button>
				)}

			</div>
		</nav>
	);
};

export default DashboardNav;