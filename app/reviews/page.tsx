import type { Metadata } from "next";
import { studentReviews } from "@/lib/site";

export const metadata: Metadata = {
  title: "People Who Think We're Special · Reviews",
  description:
    "What a university dean, a children's ministry editor, students, and grandparents say about Susan Case Bonner's prayer books and the Weave Your Word in Me curriculum.",
  alternates: { canonical: "/reviews" },
};

export default function Reviews() {
  return (
    <div className="wrap-narrow" style={{ padding: "56px 0" }}>
      <span className="kicker">Reviews</span>
      {/* Her heading, verbatim. */}
      <h1>People Who Think We&rsquo;re Special</h1>

      <div className="story" style={{ marginTop: 28 }}>
        <blockquote>
          This book has it all&mdash;rhyme for early literacy development,
          captivating photographs that help the young child to relate truth to
          life, clear statements of biblical truth, and clear and precise help
          for parents to interact and teach children. Developmentally
          appropriate books that convey truth to a young audience while at the
          same time engaging and involving parents are difficult to find. As a
          university professor of both early childhood and children&rsquo;s
          literature, My Whole Self Before YOU will become part of my personal
          library.
        </blockquote>
        <cite>
          Dr. Milton Uecker · Associate Dean, College of Education, Columbia
          International University
        </cite>
      </div>

      <div className="story">
        <blockquote>
          I asked her if she would like for me to read her a book &hellip; that
          I had a wonderful book with beautiful pictures. She came closer and
          watched as I opened the cover. I pointed to a picture of a child
          holding a thumbs-up and said, &ldquo;Can you do that, Luci?&rdquo;
          She mirrored the photo with her thumb up.
        </blockquote>
        <cite>
          Tina Houser · Executive Editor, KidzMatter Magazine 2009&ndash;2017,
          on sharing the book with a nonverbal 7-year-old at the
          Children&rsquo;s Pastors&rsquo; Conference
        </cite>
      </div>

      <div className="story">
        <blockquote>
          He then genuinely asked, &ldquo;Can you teach me to pray,
          Grandpa?&rdquo; I gladly replied, &ldquo;Yes, I would love to.&rdquo;
          When we arrived back at the house, I thought of your book My Whole
          Self Before You that I had tucked away and used it to begin teaching
          him to pray.
        </blockquote>
        <cite>A grandfather, on the Picture Prayer Book</cite>
      </div>

      <section aria-labelledby="students-h" style={{ marginTop: 34 }}>
        <h2 id="students-h" style={{ fontSize: 26 }}>
          And the students themselves
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
