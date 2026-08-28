import type { Metadata } from "next";
import BookCard from "@/components/BookCard";
import { products } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Kid Niche Shop",
  description:
    "Christian prayer books, devotionals, prayer journals, and the Weave Your Word in Me Bible curriculum, for young children through teens. Printed books ship; digital lessons download.",
  alternates: { canonical: "/shop" },
};

const sections: { key: "children" | "tweens" | "teens"; h: string; sub: string }[] = [
  {
    key: "children",
    h: "For young children",
    sub: "Picture prayer books modeled after the Lord’s Prayer, for ages 0–8.",
  },
  {
    key: "tweens",
    h: "For tweens",
    sub: "The Weave Your Word in Me curriculum, in print or as digital downloads, and the tree-frog devotional.",
  },
  {
    key: "teens",
    h: "For teens",
    sub: "The Pray-Like-Jesus journal. Great for adults too!",
  },
];

export default function Shop() {
  return (
    <div className="wrap" style={{ padding: "56px 0 20px" }}>
      <span className="kicker">Nine books, one thread</span>
      <h1>The Kid Niche Shop</h1>
      <p className="lede">
        Every book is modeled after the Lord&rsquo;s Prayer and keyed to the
        same 80 lessons, so the whole family can be learning and praying
        together. Printed books ship from Marshall, Michigan. Digital lessons
        arrive by email.
      </p>
      {sections.map((s) => (
        <section key={s.key} aria-labelledby={`shop-${s.key}`} style={{ padding: "34px 0 6px" }}>
          <h2 id={`shop-${s.key}`} style={{ fontSize: 26 }}>
            {s.h}
          </h2>
          <p style={{ color: "var(--ink-soft)", marginTop: 6 }}>{s.sub}</p>
          <div className="grid-3" style={{ marginTop: 18 }}>
            {products
              .filter((p) => p.band === s.key)
              .map((p) => (
                <BookCard p={p} key={p.slug} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
