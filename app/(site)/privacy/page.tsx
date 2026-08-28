import type { Metadata } from "next";
import { getFacts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Kid Niche Christian Books collects, why, and what happens to it: orders, the free sample list, and the curriculum members area, explained in plain language.",
  alternates: { canonical: "/privacy" },
};

/**
 * PLACEHOLDER — a real draft, but a draft. The live site has no privacy
 * policy at all (its /privacy serves the exchange policy), so this page is
 * written from what the rebuilt site actually does. Susan must read and
 * approve it, and an attorney's hour is money well spent. On the README
 * checklist.
 */
export default async function Privacy() {
  const facts = await getFacts();
  return (
    <div className="wrap-narrow" style={{ padding: "56px 0" }}>
      <span className="kicker">Plain language, on purpose</span>
      <h1>Privacy Policy</h1>
      <p className="lede" style={{ marginTop: 12 }}>
        Kid Niche collects the least it can, keeps it only to serve you, and
        never sells it to anyone.
      </p>

      <div style={{ marginTop: 22 }}>
        <div className="faq-item">
          <h3>When you place an order</h3>
          <p>
            We collect your name, shipping address, and email so we can ship
            your books and send digital lessons. Card payments are handled
            entirely by our payment processor; card numbers never touch this
            site.
          </p>
        </div>
        <div className="faq-item">
          <h3>When you ask for the free sample</h3>
          <p>
            We collect your name and email to send the sample and occasional
            notes from Susan. Every email includes an unsubscribe link, and
            unsubscribing works the first time.
          </p>
        </div>
        <div className="faq-item">
          <h3>When you use the activity library</h3>
          <p>
            The curriculum password unlocks the members area. We keep a record
            of curriculum purchases so families keep their access.
          </p>
        </div>
        <div className="faq-item">
          <h3>What we do not do</h3>
          <p>
            No selling or renting your information, no advertising trackers,
            and no collecting information from children. This site is written
            for parents and grandparents; kids appear in it only as readers of
            the books.
          </p>
        </div>
        <div className="faq-item">
          <h3>Questions</h3>
          <p>
            Write to <a href={`mailto:${facts.email}`}>{facts.email}</a> or call{" "}
            <a href={facts.phoneHref}>{facts.phone}</a>, and Susan will answer.
          </p>
        </div>
      </div>
    </div>
  );
}
