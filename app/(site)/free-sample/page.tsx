import type { Metadata } from "next";
import SampleForm from "./SampleForm";
import { getFacts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Free Sample · A Lesson and Activity for Your Family",
  description:
    "Sign up to receive a free Weave Your Word in Me lesson and enrichment activity by email, and see how Kid Niche helps kids connect with God.",
  alternates: { canonical: "/free-sample" },
};

export default async function FreeSample() {
  const facts = await getFacts();
  return (
    <div className="wrap" style={{ padding: "56px 0" }}>
      <div className="grid-2" style={{ alignItems: "center", gap: 44 }}>
        <div>
          <span className="kicker">Free sample</span>
          {/* Her heading, verbatim. */}
          <h1>Discover the Joy of Helping Kids Connect with God</h1>
          <p className="lede" style={{ marginTop: 14 }}>
            Get a free lesson and activity to introduce children to faith in a
            fun way, sent to your inbox. If your family likes it,{" "}
            <a href="/shop/god-the-father-14-bible-lessons-for-tweens-woven-within-the-lords-prayer">
              the whole first unit is free too
            </a>
            .
          </p>
          <SampleForm email={facts.email} />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/books/weave-part1.webp"
            alt="Weave Your Word in Me Part 1 cover, God the Father"
            width={300}
            height={388}
            loading="lazy"
            style={{ borderRadius: 10, boxShadow: "0 18px 34px -18px rgba(46,36,23,.45)", width: "min(300px, 70vw)", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}
