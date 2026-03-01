"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles, Rocket, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionWrapper } from "./section-wrapper";
import { FREE_PLAN, FAQ_ITEMS } from "@/lib/landing-data";
import { plans } from "@/config/plans";
import { SignUpButton } from "@clerk/nextjs";

const planIcons = [Sparkles, Rocket, Crown];

export function PricingSection() {
  const paidPlans = plans.map((p, i) => ({
    ...p,
    Icon: planIcons[i] ?? Sparkles,
  }));

  return (
    <SectionWrapper id="pricing" className="scroll-mt-20 px-4 py-16 sm:py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            シンプルな料金プラン
          </h2>
          <p className="mt-2 text-muted-foreground">
            無料枠で試してから、必要な分だけアップグレード。
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Free plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>{FREE_PLAN.name}</CardTitle>
                <CardDescription>{FREE_PLAN.description}</CardDescription>
                <p className="text-2xl font-bold">{FREE_PLAN.price}</p>
                <span className="text-muted-foreground text-sm">
                  /月
                </span>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm" role="list">
                  {FREE_PLAN.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="size-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <SignUpButton
                  mode="modal"
                  fallbackRedirectUrl="/dashboard"
                  forceRedirectUrl="/dashboard"
                >
                  <Button variant="outline" className="w-full">
                    {FREE_PLAN.buttonText}
                  </Button>
                </SignUpButton>
              </CardFooter>
            </Card>
          </motion.div>

          {paidPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i + 1) * 0.08 }}
            >
              <Card
                className={`h-full flex flex-col ${plan.popular ? "ring-2 ring-primary" : ""}`}
              >
                <CardHeader>
                  {plan.popular && (
                    <span className="text-primary text-xs font-medium">
                      人気
                    </span>
                  )}
                  <div className="flex items-center gap-2">
                    <plan.Icon className="size-5 text-primary" />
                    <CardTitle>{plan.name}</CardTitle>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                  <p className="text-2xl font-bold">{plan.price}</p>
                  <span className="text-muted-foreground text-sm">/月</span>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-sm" role="list">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check className="size-4 shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/dashboard">{plan.buttonText}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <div id="faq" className="scroll-mt-20 mt-20 mx-auto max-w-2xl">
          <h2 className="text-xl font-bold text-center mb-6">
            よくある質問
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </SectionWrapper>
  );
}
