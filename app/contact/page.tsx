import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Susan · Kid Niche Christian Books",
  description:
    "Call, text, or email Susan Case Bonner about prayer books, curriculum orders for schools and churches, or anything else. Kid Niche Christian Books, Marshall, Michigan.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <div className="wrap-narrow" style={{ padding: "56px 0" }}>
      <span className="kicker">Contact us</span>
      {/* Her heading, verbatim. */}
      <h1>We&rsquo;re Here to Support Your Family</h1>
      <p className="lede" style={{ marginTop: 12 }}>
        Have a question? Please contact us. Susan Case Bonner is the author and
        owner of Kid Niche.
      </p>

      <div className="grid-2" style={{ marginTop: 30 }}>
        <div className="story" style={{ margin: 0 }}>
          <h2 style={{ fontSize: 21 }}>By phone</h2>
          <p style={{ marginTop: 8 }}>
            <a href={site.phoneHref} style={{ fontSize: 22, fontWeight: 800 }}>
              {site.phone}
            </a>
          </p>
          {/* Her line, verbatim. */}
          <p style={{ color: "var(--ink-soft)" }}>
            Call or text. (We love texts &mdash; please include your name.)
          </p>
        </div>
        <div className="story" style={{ margin: 0 }}>
          <h2 style={{ fontSize: 21 }}>By email</h2>
          <p style={{ marginTop: 8 }}>
            <a href={`mailto:${site.email}`} style={{ fontWeight: 800 }}>
              {site.email}
            </a>
          </p>
          <p style={{ color: "var(--ink-soft)" }}>
            Bulk orders for a school, church, or homeschool co-op? Email is
            perfect for that.
          </p>
        </div>
      </div>

      <div className="story">
        <h2 style={{ fontSize: 21 }}>By mail</h2>
        <p style={{ marginTop: 8 }}>
          {site.name}
          <br />
          {site.address.street}
          <br />
          {site.address.city}, {site.address.state} {site.address.zip} USA
        </p>
      </div>
    </div>
  );
}
