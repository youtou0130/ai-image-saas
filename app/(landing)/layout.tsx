import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/landing-data";
import { StructuredData } from "@/components/landing/structured-data";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | AI画像生成・背景除去・圧縮`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "生成AIで画像を制作・編集。画像生成、背景除去、圧縮がブラウザで完結。無料枠でお試しください。デザイナー・マーケター・SNS運用者に。",
  openGraph: {
    title: `${SITE_NAME} | AI画像生成・背景除去・圧縮`,
    description:
      "生成AIで画像を制作・編集。無料枠でお試しできます。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | AI画像生成・背景除去・圧縮`,
    description: "生成AIで画像を制作・編集。無料枠でお試しできます。",
  },
  alternates: { canonical: "/" },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData />
      {children}
    </>
  );
}
