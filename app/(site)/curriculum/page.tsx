import type { Metadata } from "next";
import BookCard from "@/components/BookCard";
import { products, studentReviews } from "@/lib/site";

export const metadata: Metadata = {
  title: "Weave Your Word in Me · The 80-Lesson Bible and Prayer Curriculum",
  description:
    "Susan Case Bonner's upper elementary curriculum guides tweens to discover and apply biblical truth for themselves: 80 lessons across four units, in print or as digital downloads, and Part 1 is free.",
  alternates: { canonical: "/curriculum" },
};

export default function Curriculum() {
  const workbook = products.find((p) => p.slug.includes("all-80-lessons"))!;
  const parts = products.filter((p) => p.digital);

  return (
    <div className="wrap" style={{ padding: "56px 0" }}>
      <span className="kicker">For upper elementary</span>
      <h1>Weave Your Word in Me</h1>
      {/* Her copy, verbatim, from the live homepage. */}
      <p className="lede">
        Be a spiritual mentor to your kids by helping them learn the lessons
        Jesus wove within the Lord&rsquo;s Prayer. Our upper elementary
        curriculum is perfect for guiding tweens to discover and apply biblical
        truth for themselves &mdash; and since the workbook is formatted in the
        same way as the picture prayer book for younger children, the whole
        family can be learning and praying together.
      </p>

      <section aria-labelledby="units-h" style={{ marginTop: 36 }}>
        <h2 id="units-h" style={{ fontSize: 26 }}>
          Four units. Eighty lessons. One prayer.
        </h2>
        {/* tabIndex: same scrollable-region-focusable fix as /activities;
            this table overflows at 320 the same way. */}
        <div className="table-scroll" style={{ marginTop: 16 }} tabIndex={0} role="region" aria-label="The four units of the curriculum">
          <table className="plain">
            <thead>
              <tr>
                <th scope="col">Unit</th>
                <th scope="col">Lessons</th>
                <th scope="col">What tweens explore</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>God the Father</strong></td>
                <td>14</td>
                <td>Who He is, how and why tweens will want to approach Him, and what He values. This unit is free.</td>
              </tr>
              <tr>
                <td><strong>God the Son</strong></td>
                <td>22</td>
                <td>Big foundational truths about the Author of the Lord&rsquo;s Prayer, Jesus.</td>
              </tr>
              <tr>
                <td><strong>What God Wants</strong></td>
                <td>28</td>
                <td>How God thinks and what He expects, including a dig into the Ten Commandments.</td>
              </tr>
              <tr>
                <td><strong>God the Holy Spirit</strong></td>
                <td>16</td>
                <td>Who the Holy Spirit is and how He helps.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="get-h" style={{ marginTop: 40 }}>
        <h2 id="get-h" style={{ fontSize: 26 }}>Two ways to get it</h2>
        <p style={{ color: "var(--ink-soft)" }}>
          The complete printed workbook, or the same lessons as digital
          downloads in four parts. Every lesson comes with three free online
          enrichment activities.
        </p>
        <div className="grid-3" style={{ marginTop: 18 }}>
          <BookCard p={workbook} />
          {parts.slice(0, 2).map((p) => (
            <BookCard p={p} key={p.slug} />
          ))}
        </div>
        <div className="grid-3" style={{ marginTop: 20 }}>
          {parts.slice(2).map((p) => (
            <BookCard p={p} key={p.slug} />
          ))}
          <div className="book-card" style={{ justifyContent: "center", padding: 24 }}>
            <h3>240 enrichment activities</h3>
            <p className="blurb" style={{ marginTop: 8 }}>
              Three hands-on activities for every lesson, on this site. The
              password comes with the curriculum.
            </p>
            <p style={{ marginTop: 10 }}>
              <a className="btn ghost" href="/activities">
                See the activity library
              </a>
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="kids2-h" style={{ marginTop: 40 }}>
        <h2 id="kids2-h" style={{ fontSize: 26 }}>
          Real reviews from students
        </h2>
        <div className="kid-quotes" style={{ marginTop: 14 }}>
          {studentReviews.map((q) => (
            <span className="kid-quote" key={q}>
              &ldquo;{q}&rdquo;
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
