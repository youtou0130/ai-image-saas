import Link from "next/link";
import { SITE_NAME, COMPANY, FOOTER_LINKS } from "@/lib/landing-data";

export function LandingFooter() {
  return (
    <footer
      className="border-t bg-muted/30 px-4 py-12"
      role="contentinfo"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="sm:col-span-2">
            <Link
              href="/"
              className="font-semibold text-foreground"
              aria-label={`${SITE_NAME} ホーム`}
            >
              {SITE_NAME}
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              {COMPANY.description}
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">法的情報</h3>
            <ul className="mt-3 space-y-2" role="list">
              {FOOTER_LINKS.legal.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-muted-foreground text-sm hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-foreground">サポート</h3>
            <ul className="mt-3 space-y-2" role="list">
              {FOOTER_LINKS.support.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-muted-foreground text-sm hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-4 font-medium text-foreground">SNS</h3>
            <ul className="mt-3 space-y-2" role="list">
              {FOOTER_LINKS.social.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground text-sm hover:text-foreground"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t pt-8 text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
