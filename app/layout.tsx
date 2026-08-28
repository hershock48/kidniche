import type { Metadata } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

/**
 * Fonts are downloaded at build time and served from this site's own origin
 * (next/font/google). No runtime request to Google, nothing rented.
 *
 * Fraunces: a warm, soft serif with storybook character, for display.
 * Nunito Sans: rounded and friendly without being childish, for everything else.
 */
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});
const body = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "700", "800"],
});

export const metadata: Metadata = {
  // Canonical is the client's real domain, never a .vercel.app host.
  metadataBase: new URL(site.domain),
  title: {
    default: "Kid Niche Christian Books · Prayer Books and Bible Curriculum for Kids",
    template: "%s · Kid Niche Christian Books",
  },
  description:
    "Susan Case Bonner's prayer books, devotionals, and the Weave Your Word in Me Bible curriculum help families teach children, tweens, and teens to pray from the mind and heart.",
  openGraph: {
    siteName: site.name,
    type: "website",
    images: ["/assets/books/green-book.webp"],
  },
};

/**
 * The header, footer, cart and skip link live in app/(site)/layout.tsx, not
 * here: /admin is under this root too and the owner panel must not carry the
 * shop's chrome. This layout is only the document shell.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
