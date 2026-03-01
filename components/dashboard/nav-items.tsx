"use client";
import { navItems } from '@/config/nav';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
	
const NavItems = () => {
	const pathname = usePathname();
	return (
		<div className="flex flex-col gap-1 w-full">
			{navItems.map((item) => (
				<Button
					key={item.href}
					variant={pathname === item.href ? "secondary" : "ghost"}
					className={cn("w-full justify-start", pathname === item.href && "bg-accent")}
					asChild
				>
					<Link href={item.href}>
						{item.icon && <item.icon className="h-4 w-4 mr-2 shrink-0" />}
						{item.label}
					</Link>
				</Button>
			))}
		</div>
	);
};

export default NavItems;