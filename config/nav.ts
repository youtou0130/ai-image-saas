import { LayoutDashboard } from "lucide-react";
import { NavItem } from "@/types/nav";
import { Image, Layers, ImageDown, Settings } from "lucide-react";

export const navItems: NavItem[] = [
	{
		label: "ダッシュボード",
		href: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		label: "画像生成",
		href: "/dashboard/tools/image-generator",
		icon: Image,
	},
	{
		label: "背景削除",
		href: "/dashboard/tools/remove-bg",
		icon: Layers,
	},
	{
		label: "画像圧縮",
		href: "/dashboard/tools/optimize",
		icon: ImageDown,
	},
	{
		label: "設定",
		href: "/dashboard/settings",
		icon: Settings,
	},
];