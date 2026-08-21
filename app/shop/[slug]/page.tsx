import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, dollars, site } from "@/lib/site";
import { PriceLine } from "@/components/BookCard";
import { AddToCart } from "@/components/cart";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    // The book's own name in the title — the one thing every product page on
    // the live site is missing.
    title: p.name,
    description: `${p.blurb} ${p.format}. ${p.price === 0 ? "Free" : dollars(p.price)}${p.was ? `, regularly ${dollars(p.was)}` : ""}, from Kid Niche Christian Books.`,
    alternates: { canonical: `/product/${p.slug}` },
    openGraph: { images: [p.img] },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <div className="wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            image: `${site.domain}${p.img}`,
            description: p.blurb,
            brand: { "@type": "Brand", name: site.name },
            offers: {
              "@type": "Offer",
              price: p.price.toFixed(2),
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              url: `${site.domain}/product/${p.slug}`,
            },
          }),
        }}
      />
      <div className="product-grid">
        <div className="cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.img} alt={p.imgAlt} />
        </div>
        <div>
          <span className="kicker">{p.ages} · {p.digital ? "Digital download" : "Printed book"}</span>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>{p.name}</h1>
          <p style={{ color: "var(--ink-soft)", marginTop: 8 }}>{p.coverTitle}</p>
          <div className="buy-row">
            <PriceLine p={p} />
            <AddToCart slug={p.slug} free={p.price === 0} />
          </div>
          <p className="format-note">
            {p.format}.{" "}
            {p.digital
              ? "Delivered by email the moment your order goes through."
              : "Ships from Marshall, Michigan."}
          </p>

          <h2 style={{ fontSize: 21, marginTop: 22 }}>Details</h2>
          <ul className="detail-list">
            {p.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>

          {p.story && (
            <div className="story">
              <blockquote>&ldquo;{p.story.quote}&rdquo;</blockquote>
              <cite>{p.story.label}</cite>
            </div>
          )}

          <p style={{ marginTop: 16, fontSize: 14.5, color: "var(--ink-soft)" }}>
            Questions? <a href={site.phoneHref}>Call or text {site.phone}</a>, or{" "}
            <a href={`mailto:${site.email}`}>send an email</a>. Damaged in the
            mail? See the <a href="/exchange">exchange policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
