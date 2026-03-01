"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "./section-wrapper";
import { FREE_PLAN } from "@/lib/landing-data";
import { SignUpButton } from "@clerk/nextjs";

const STEPS = [
  "メールアドレスでアカウント作成",
  "無料クレジットですぐ利用開始",
  "必要に応じてプラン変更",
] as const;

export function CtaSection() {
  return (
    <SectionWrapper
      id="cta"
      className="scroll-mt-20 bg-primary px-4 py-16 text-primary-foreground sm:py-20"
    >
      <div className="container mx-auto max-w-3xl text-center">
        <motion.h2
          className="text-2xl font-bold tracking-tight sm:text-3xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          今すぐ無料で始める
        </motion.h2>
        <motion.p
          className="mt-3 text-primary-foreground/90"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          登録後、{FREE_PLAN.credits}クレジットを付与。クレジットカード不要でお試しできます。
        </motion.p>

        <ul
          className="mt-8 flex flex-col items-center gap-3 text-left text-sm"
          role="list"
        >
          {STEPS.map((step, i) => (
            <motion.li
              key={step}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-primary-foreground/20">
                <Check className="size-3.5" />
              </span>
              {step}
            </motion.li>
          ))}
        </ul>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <SignUpButton
            mode="modal"
            fallbackRedirectUrl="/dashboard"
            forceRedirectUrl="/dashboard"
          >
            <Button
              size="lg"
              variant="secondary"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              無料トライアルを登録する
            </Button>
          </SignUpButton>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
