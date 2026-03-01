"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_SECTIONS, SITE_NAME } from "@/lib/landing-data";
import AuthButton from "@/components/auth/auth-button";

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const isAnchor = href.startsWith("#");
  return isAnchor ? (
    <a
      href={href}
      onClick={onClick}
      className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
    >
      {children}
    </a>
  ) : (
    <Link
      href={href}
      onClick={onClick}
      className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
    >
      {children}
    </Link>
  );
}

export function LandingHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="container flex h-14 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-foreground"
          aria-label={`${SITE_NAME} ホーム`}
        >
          <ImageIcon className="size-6 text-primary" aria-hidden />
          <span>{SITE_NAME}</span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="メインナビゲーション"
        >
          {NAV_SECTIONS.map(({ label, href }) => (
            <NavLink key={href} href={href}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <AuthButton />
          </div>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="md:hidden inline-flex size-9 items-center justify-center rounded-md hover:bg-accent"
              aria-label="メニューを開く"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <nav
                className="flex flex-col gap-6 pt-8"
                aria-label="モバイルナビゲーション"
              >
                {NAV_SECTIONS.map(({ label, href }) => (
                  <NavLink
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </NavLink>
                ))}
                <div className="border-t pt-4 sm:hidden">
                  <AuthButton />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
