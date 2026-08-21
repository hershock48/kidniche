import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Exchange Policy · Damaged Book Replacement",
  description:
    "If your Kid Niche book arrives damaged, send a photo and we will promptly send a replacement, without extra shipping when requested.",
  alternates: { canonical: "/exchange" },
};

export default function Exchange() {
  return (
    <div className="wrap-narrow" style={{ padding: "56px 0" }}>
      <span className="kicker">The fine print, kept short</span>
      <h1>Exchange Policy</h1>
      <p className="lede" style={{ marginTop: 12 }}>
        If a book arrives damaged, we make it right.
      </p>
      <p style={{ marginTop: 16 }}>
        Email a photo of the damage to{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> and we will promptly
        verify it and send a replacement, without extra shipping when
        requested.
      </p>
      <p style={{ color: "var(--ink-soft)", fontSize: 14.5 }}>
        This page carries the same policy the current site publishes. It moved
        to its own address so that <a href="/privacy">/privacy</a> can hold the
        privacy policy.
      </p>
    </div>
  );
}
