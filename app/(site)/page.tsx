import type { Metadata } from "next";
import BookCard, { PriceLine } from "@/components/BookCard";
import { site, products, bands, studentReviews, faq } from "@/lib/site";
import { getFacts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Kid Niche Christian Books · Prayer Books and Bible Curriculum for Kids",
  description:
    "Teach your children to pray the way Jesus taught his disciples. Picture prayer books for young children, the Weave Your Word in Me curriculum for tweens, and prayer journals for teens, from Susan Case Bonner in Marshall, Michigan.",
  alternates: { canonical: "/" },
};

const bySlug = (s: string) => products.find((p) => p.slug === s)!;

export default async function Home() {
  const facts = await getFacts();
  const yellow = bySlug("picture-prayer-book-for-children-0-8");
  const green = bySlug("picture-prayer-book-with-bible-guide-for-families");
  const weave = bySlug("bible-and-prayer-curriculum-for-tweens-all-80-lessons");
  const journal = bySlug("pray-like-jesus-prayer-journal-for-teens");
  const devotional = bySlug("bible-and-prayer-devotional-for-tweens");
  const part1 = bySlug("god-the-father-14-bible-lessons-for-tweens-woven-within-the-lords-prayer");

  return (
    <>
      {/* JSON-LD: the business, with the address and phone the live site's
          schema is missing, plus her FAQ. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": ["Organization", "LocalBusiness"],
              name: site.name,
              url: site.domain,
              logo: `${site.domain}/assets/brand/kid-niche-logo.png`,
              telephone: facts.phoneSchema,
              email: facts.email,
              founder: { "@type": "Person", name: site.owner },
              address: {
                "@type": "PostalAddress",
                streetAddress: facts.street,
                addressLocality: facts.city,
                addressRegion: facts.state,
                postalCode: facts.zip,
                addressCountry: "US",
              },
              sameAs: [facts.facebook, facts.pinterest],
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]),
        }}
      />

      <div className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="kicker">Praying from the mind &amp; heart</span>
            <h1>
              Teach your children to pray the way <em>Jesus</em> taught his disciples.
            </h1>
            {/* Her sentence, verbatim, from the live homepage. */}
            <p className="lede">
              Imagine your children and grandchildren praying the way Jesus
              taught his disciples &mdash; using their minds and hearts. Every
              book here is modeled after the Lord&rsquo;s Prayer, for
              preschoolers through teens.
            </p>
            <div className="hero-ctas">
              <a className="btn primary" href="/shop">
                Browse the bookshelf
              </a>
              <a className="btn ghost" href="/free-sample">
                Get a free sample
              </a>
            </div>
          </div>
          <div className="hero-books" aria-hidden="true">
            <figure className="float-a">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={green.img} alt="" width={541} height={440} />
            </figure>
            <figure className="float-b">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={yellow.img} alt="" width={800} height={642} />
            </figure>
          </div>
        </div>
      </div>

      <section className="band leaf" aria-labelledby="ages-h">
        <div className="wrap">
          <span className="kicker">One family, every age</span>
          <h2 id="ages-h">Grow together in prayer as a family</h2>
          <p className="lede">
            The books share the same color coding and lesson numbering, so a
            preschooler, a tween, and a teen can all be learning and praying
            together.
          </p>

          <div className="age-row">
            <div className="art">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={yellow.img} alt={yellow.imgAlt} loading="lazy" />
            </div>
            <div>
              <span className="kicker">{bands[0].label}</span>
              <h3 style={{ fontSize: 26 }}>{bands[0].heading}</h3>
              <p style={{ marginTop: 10 }}>{bands[0].copy}</p>
              <p>
                <a href={`/shop/${green.slug}`}>The award-winning picture prayer book</a>
                {" · "}
                <a href={`/shop/${yellow.slug}`}>the classic yellow edition</a>
              </p>
            </div>
          </div>

          <div className="age-row flip">
            <div className="art">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={weave.img} alt={weave.imgAlt} loading="lazy" />
            </div>
            <div>
              <span className="kicker">{bands[1].label}</span>
              {/* Her heading, verbatim. */}
              <h3 style={{ fontSize: 26 }}>{bands[1].heading}</h3>
              <p style={{ marginTop: 10 }}>{bands[1].copy}</p>
              <p>
                <a href="/curriculum">Weave Your Word in Me, the 80-lesson curriculum</a>
                {" · "}
                <a href={`/shop/${devotional.slug}`}>the tree-frog devotional</a>
              </p>
            </div>
          </div>

          <div className="age-row">
            <div className="art">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={journal.img} alt={journal.imgAlt} loading="lazy" />
            </div>
            <div>
              <span className="kicker">{bands[2].label}</span>
              <h3 style={{ fontSize: 26 }}>{bands[2].heading}</h3>
              <p style={{ marginTop: 10 }}>{bands[2].copy}</p>
              <p>
                <a href={`/shop/${journal.slug}`}>The Pray-Like-Jesus journal, in three colors</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="shelf-h">
        <div className="wrap">
          <span className="kicker">The bookshelf</span>
          <h2 id="shelf-h">Start anywhere. They all weave together.</h2>
          <div className="grid-3" style={{ marginTop: 26 }}>
            <BookCard p={green} />
            <BookCard p={weave} />
            <BookCard p={journal} />
          </div>
          <p style={{ marginTop: 22 }}>
            <a className="btn ghost" href="/shop">
              See all nine books
            </a>
          </p>
        </div>
      </section>

      <section className="band sun" aria-labelledby="free-h">
        <div className="wrap grid-2" style={{ alignItems: "center" }}>
          <div>
            <span className="kicker" style={{ color: "var(--trunk-ink)" }}>
              Try before you buy
            </span>
            <h2 id="free-h">The first 14 lessons are free.</h2>
            {/* Her copy from the Part 1 page, verbatim. */}
            <p style={{ marginTop: 12 }}>
              These first 14 lessons are free, so you and your kids can get a
              thorough look at what this series is all about without charge.
              Part 1 looks closely at the person of God the Father &mdash; who
              He is, how and why tweens will want to approach Him, and what He
              values.
            </p>
            <div className="hero-ctas">
              <a className="btn primary" href={`/shop/${part1.slug}`}>
                Get Part 1 free
              </a>
              <a className="btn ghost" href="/free-sample">
                Or a one-lesson sample by email
              </a>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={part1.img}
              alt={part1.imgAlt}
              width={300}
              height={388}
              loading="lazy"
              style={{ borderRadius: 10, boxShadow: "0 18px 34px -18px rgba(46,36,23,.45)", width: "min(300px, 70vw)", height: "auto" }}
            />
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="kids-h">
        <div className="wrap">
          <span className="kicker">Tweens love to pray</span>
          <h2 id="kids-h">What her students say</h2>
          <p className="lede">
            Upper elementary students, in their own words, on Weave Your Word in Me.
          </p>
          <div className="kid-quotes" style={{ marginTop: 18 }}>
            {studentReviews.map((q) => (
              <span className="kid-quote" key={q}>
                &ldquo;{q}&rdquo;
              </span>
            ))}
          </div>
          <p style={{ marginTop: 18 }}>
            <a href="/reviews">More reviews, from a university dean to a magazine editor</a>
          </p>
        </div>
      </section>

      <section className="band card-bg" aria-labelledby="faq-h">
        <div className="wrap-narrow">
          <span className="kicker">Common questions</span>
          <h2 id="faq-h">Frequently asked questions</h2>
          <div style={{ marginTop: 18 }}>
            {faq.map((f) => (
              <div className="faq-item" key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="new-h">
        <div className="wrap">
          <h2 id="new-h" style={{ fontSize: 24 }}>New this season</h2>
          <div className="grid-3" style={{ marginTop: 20 }}>
            <div>
              <PriceLine p={devotional} />
              <p>
                <a href={`/shop/${devotional.slug}`}>{devotional.name}</a>:{" "}
                {devotional.blurb}
              </p>
            </div>
            <div>
              <PriceLine p={yellow} />
              <p>
                <a href={`/shop/${yellow.slug}`}>{yellow.name}</a>: {yellow.blurb}
              </p>
            </div>
            <div>
              <PriceLine p={part1} />
              <p>
                <a href={`/shop/${part1.slug}`}>{part1.name}</a>: {part1.blurb}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
