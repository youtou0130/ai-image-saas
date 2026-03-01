"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden border-b bg-gradient-to-b from-muted/30 to-background px-4 py-20 sm:py-28 md:py-36"
      aria-labelledby="hero-heading"
    >
      <div className="container relative mx-auto max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl"
        >
          <h1
            id="hero-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
          >
            AIで、画像制作を
            <span className="text-primary block sm:inline">もっと簡単に</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl md:mt-6">
            画像生成・背景除去・圧縮まで。デザイナーもマーケターも、無料枠からすぐに使えるクラウドツールです。
          </p>
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <SignUpButton
              mode="modal"
              fallbackRedirectUrl="/dashboard"
              forceRedirectUrl="/dashboard"
            >
              <Button size="lg" className="text-base">
                無料で始める
              </Button>
            </SignUpButton>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">機能を見る</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Hero visual placeholder: デモエリア */}
        <motion.div
          className="mx-auto mt-12 max-w-4xl rounded-xl border bg-muted/50 p-4 shadow-lg sm:mt-16 md:p-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          aria-hidden
        >
          <div className="aspect-video rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-sm">
            デモ動画・スクリーンショット用エリア
          </div>
        </motion.div>
      </div>
    </section>
  );
}
