import type { Metadata } from "next";
import { blogPosts, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Susan Case Bonner's Blog · Prayer Notes for Parents",
  description:
    "Susan Case Bonner writes about prayer, parenting, and mentoring kids in faith: bedtime prayers, Bible proverbs, and what she is learning along the way.",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  return (
    <div className="wrap-narrow" style={{ padding: "56px 0" }}>
      <span className="kicker">Prayer blog for parents</span>
      {/* Her heading, verbatim. */}
      <h1>Susan Case Bonner&rsquo;s Blog</h1>
      <p className="lede" style={{ marginTop: 12 }}>
        Notes on prayer, parenting, and mentoring kids in faith. Every post
        migrates to the new site exactly as Susan wrote it; in this concept
        build the titles link to the posts where they live today.
      </p>
      <ul style={{ listStyle: "none", marginTop: 26 }}>
        {blogPosts.map((p) => (
          <li key={p.slug} className="faq-item">
            <h2 style={{ fontSize: 21, fontFamily: "var(--serif)" }}>
              <a href={`${site.domain}/${p.slug}/`} rel="noopener">
                {p.title}
              </a>
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
