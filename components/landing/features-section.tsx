"use client";

import {
  ImageIcon,
  Scissors,
  FileImage,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { FEATURES } from "@/lib/landing-data";
import { motion } from "framer-motion";

const iconMap: Record<string, LucideIcon> = {
  ImageIcon,
  Scissors,
  FileImage,
  Wand2,
};

export function FeaturesSection() {
  return (
    <SectionWrapper id="features" className="scroll-mt-20 px-4 py-16 sm:py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            必要な機能が、ひとつに
          </h2>
          <p className="mt-2 text-muted-foreground">
            生成・編集・最適化まで、ブラウザだけで完結します。
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => {
            const Icon = iconMap[feature.icon] ?? ImageIcon;
            return (
              <motion.article
                key={feature.id}
                className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="mt-4 font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2" role="list">
                  {feature.highlights.map((h) => (
                    <li
                      key={h}
                      className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
