import Link from "next/link";
import DashboardNav from "@/components/dashboard/nav";
import MobileNav from "@/components/dashboard/mobile-nav";
import { Toaster } from "@/components/ui/sonner";
import AuthButton from "@/components/auth/auth-button";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/lib/users";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkUser = await currentUser();
  if (clerkUser?.id) {
    const email = clerkUser.emailAddresses?.[0]?.emailAddress;
    if (typeof email === "string") {
      try {
        await syncUser(clerkUser.id, email);
      } catch (e) {
        console.error("Dashboard syncUser error:", e);
      }
    }
  }

  return (
    <div>
		{/* Header */}
		<header className="sticky top-0 z-40 bg-background border-b">
			<div className="flex items-center h-16 px-6">
				<MobileNav />
				<div className="flex items-center w-full">
					<Link href="/">
						<h1 className="text-lg font-bold">AI Image Generator</h1>
					</Link>
					<div className="ml-auto hidden md:block">
					    <AuthButton />
					</div>
				</div>
			</div>
		</header>
		{/* Sidebar and main Content */}
		<div className="container md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
			{/* Sidebar */}
            <aside className="fiexed md:sticky top-16 z-30 hidden md:block border-r h-[calc(100vh-4.1rem)]">
				<div className="py-6 px-2 lg:py-8">
					<DashboardNav />
				</div>
			</aside>

			{/* Main Content */}
            <main className="flex w-full flex-col overflow-hidden p-4">{children}</main>

		</div>

		<Toaster />
	</div>
  );
}
