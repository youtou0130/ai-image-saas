import { Sparkles } from "lucide-react";
import { Rocket } from "lucide-react";
import { Crown } from "lucide-react";

export const STRIPE_PLANS = {
	STATER: "price_1T4990ECvyU1hIudwKQJAXcR",
	PRO: "price_1T499oECvyU1hIuddt5MlgpE",
	ENTERPRISE: "price_1T49AKECvyU1hIudL8PuLU8t",
};

export const plans = [
	{
		name: "Starter",
		icon: Sparkles,
		price: "￥1,000",
		description: "個人利用に最適なエントリープラン",
		features: [
			"月50クレジット付与",
			"基本的な画像生成",
			"メールサポート",
		],
		buttonText: "Starterプランを選択",
		priceId: STRIPE_PLANS.STATER,
		credits: 50,
	},
	{
		name: "Pro",
		icon: Rocket,
		price: "￥2,000",
		description: "プロフェッショナルな制作活動に",
		features: [
			"月120クレジット付与",
			"優先サポート",
			"商用利用可能",
			"メールサポート",
		],
		popular: true,
		buttonText: "Proプランを選択",
		priceId: STRIPE_PLANS.PRO,
		credits: 120,
	},
	{
		name: "Enterprise",
		icon: Crown,
		price: "￥5,000",
		description: "ビジネス向けの完全なソリューション",
		features: [
			"月300クレジット付与",
			"24時間優先サポート",
			"API利用可能",
			"メールサポート",
			"カスタマイズ可能",
		],
		buttonText: "Enterpriseプランを選択",
		priceId: STRIPE_PLANS.ENTERPRISE,
		credits: 300,
	},
];

