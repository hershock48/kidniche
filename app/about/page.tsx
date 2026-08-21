import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Susan Case Bonner and Kid Niche Christian Books",
  description:
    "Susan Case Bonner has spent five decades teaching the Bible simply, effectively, and creatively. She writes and publishes children's prayer books and Bible curriculum in Marshall, Michigan.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <div className="wrap-narrow" style={{ padding: "56px 0" }}>
      <span className="kicker">Our niche and mission</span>
      <h1>About Kid Niche Christian Books</h1>

      {/* Her copy below is verbatim from the live about page. */}
      <section aria-labelledby="niche-h" style={{ marginTop: 26 }}>
        <h2 id="niche-h" style={{ fontSize: 26 }}>Our niche</h2>
        <p style={{ marginTop: 10 }}>
          Tree houses, comfortable laps, and snuggly beds all share the same
          trait: they are places children go to wonder, marvel, learn, and
          grow. Kid Niche Christian Books produces resources that help kids
          find such a place right in their own hearts&mdash;guiding them to
          understand who God is and how to interact with him in meaningful,
          life-changing ways.
        </p>
      </section>

      <section aria-labelledby="mission-h" style={{ marginTop: 26 }}>
        <h2 id="mission-h" style={{ fontSize: 26 }}>Our mission</h2>
        <p style={{ marginTop: 10 }}>
          Kid Niche Christian Books is our ministry out of which we produce
          family-friendly, skill-based biblical resources for those who desire
          to know and talk with the one true God&mdash;Father, Son, and Holy
          Spirit. Our children&rsquo;s books help parents mentor their kids in
          the teachings of Jesus rooted in the Lord&rsquo;s Prayer. Our tween
          and teen materials help young people grow in their relationship with
          God on the basis of truth, quality communication, and friendship.
        </p>
      </section>

      <section aria-labelledby="susan-h" style={{ marginTop: 26 }}>
        <h2 id="susan-h" style={{ fontSize: 26 }}>Our author, Susan Case Bonner</h2>
        <figure style={{ margin: "18px 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/brand/thumbs-up.webp"
            alt="Susan Case Bonner at her dining table with an open Bible, giving a thumbs up"
            width={1200}
            height={931}
            style={{ borderRadius: 14, boxShadow: "0 18px 34px -18px rgba(46,36,23,.4)" }}
          />
        </figure>
        <p>
          Susan is a hungry-for-God, hungry-for-fun type person, which means
          she loves to learn more about God through the exploration of His
          amazing Word and interesting world. Graduating from Columbia
          International University in Columbia, South Carolina, in 1977, she
          has used her degree in Biblical Education to draw children into the
          wonder of knowing God through his Word.
        </p>
        <p>
          As a Christian school teacher, Christian education director, Sunday
          school teacher, homeschool teacher, and chapel and conference
          speaker, Susan has dedicated the last five decades of her life to
          teaching the Bible simply, effectively, and creatively&mdash;engaging
          kids of all ages.
        </p>
        <p>
          Susan currently writes and publishes children&rsquo;s books and
          Bible curriculum in the lovely historic town of Marshall, Michigan,
          with her husband, Keith, a retired air traffic controller. She has
          raised two children, is blessed with 2 granddaughters, and enjoys
          antiquing and interior design.
        </p>
      </section>

      <section aria-labelledby="award-h" style={{ marginTop: 26 }}>
        <h2 id="award-h" style={{ fontSize: 26 }}>The Moonbeam Children&rsquo;s Book Award</h2>
        <p style={{ marginTop: 10 }}>
          The best words to express the events of this wonderful night at the
          Park Place Hotel: thrilling, humbling, giddy, joyous,
          pinch-me-please. One of the highlights was hearing from the other
          authors and illustrators who were able to be present&mdash;the
          winners represented 35 U.S. states and 3 countries outside the U.S.
        </p>
        <p>
          The award seal lives on the cover of the{" "}
          <a href="/shop/picture-prayer-book-with-bible-guide-for-families">
            Picture Prayer Book With Bible Guide for Families
          </a>
          .
        </p>
      </section>
    </div>
  );
}
