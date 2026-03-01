"use client";

import { Palette, TrendingUp, Share2, Store, type LucideIcon } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { USE_CASES } from "@/lib/landing-data";
import { motion } from "framer-motion";

const iconMap: Record<string, LucideIcon> = {
  Palette,
  TrendingUp,
  Share2,
  Store,
};

export function UseCasesSection() {
  return (
    <SectionWrapper
      id="use-cases"
      className="scroll-mt-20 bg-muted/30 px-4 py-16 sm:py-20"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            こんな方におすすめ
          </h2>
          <p className="mt-2 text-muted-foreground">
            業種・役割に合わせた活用例をご紹介します。
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {USE_CASES.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Palette;
            return (
              <motion.article
                key={item.title}
                className="flex flex-col rounded-xl border bg-card p-6 shadow-sm"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="mt-4 font-semibold">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
