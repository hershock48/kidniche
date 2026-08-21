"use client";

import { usePathname } from "next/navigation";
import { CartLink } from "@/components/cart";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/curriculum", label: "Curriculum" },
  { href: "/activities", label: "Activities" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const path = usePathname();
  return (
    <header className="site-header">
      <div className="wrap bar">
        <a className="logo-link" href="/" aria-label="Kid Niche Christian Books, home">
          {/* Her real logo file, lifted from the live site. Never redrawn. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/brand/kid-niche-logo.png" alt="Kid Niche Christian Books" width={215} height={135} />
        </a>
        <nav className="main-nav" aria-label="Main">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={path === l.href || path.startsWith(l.href + "/") ? "page" : undefined}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <CartLink />
      </div>
    </header>
  );
}
