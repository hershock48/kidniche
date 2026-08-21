import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enrichment Activities for Weave Your Word in Me",
  description:
    "Three hands-on enrichment activities for every one of the 80 Weave Your Word in Me lessons: crafts, music videos, Bible readings, and projects. The password comes with the curriculum.",
  alternates: { canonical: "/activities" },
};

const units = [
  { name: "God the Father", lessons: 14, sample: "Creation crafts, “Who God Is” charts, worship music videos" },
  { name: "God the Son", lessons: 22, sample: "Cornerstone music video, Wise or Foolish? video, rock structures" },
  { name: "What God Wants", lessons: 28, sample: "What Is Philanthropy?, Greedy Baboon video, treasure hunting" },
  { name: "God the Holy Spirit", lessons: 16, sample: "Eye of God craft, The Lord’s Prayer music video, Don’t Worry (Matthew 6:25-34)" },
];

export default function Activities() {
  return (
    <div className="wrap" style={{ padding: "56px 0" }}>
      <span className="kicker">Bring every lesson to life</span>
      <h1>Enrichment Activities for Weave Your Word in Me</h1>
      <p className="lede">
        Students, parents, and teachers alike love the free website activities
        that bring each lesson to life. Every one of the 80 lessons has three:
        a Bible reading or story, something to watch or sing, and something to
        make or do. That is 240 activities, numbered to match the workbook.
      </p>

      <div className="table-scroll" style={{ marginTop: 30 }}>
        <table className="plain">
          <thead>
            <tr>
              <th scope="col">Unit</th>
              <th scope="col">Lessons</th>
              <th scope="col">Activities</th>
              <th scope="col">A taste of what is inside</th>
            </tr>
          </thead>
          <tbody>
            {units.map((u) => (
              <tr key={u.name}>
                <td><strong>{u.name}</strong></td>
                <td>{u.lessons}</td>
                <td>{u.lessons * 3}</td>
                <td>{u.sample}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="story" style={{ marginTop: 30 }}>
        <blockquote>
          The activity library is for families using the curriculum, so it sits
          behind the same password it does today. Nothing your pilot families
          know changes: same lesson numbering, same access, just faster pages
          that work as well on a phone at the kitchen table as they do in a
          classroom.
        </blockquote>
        <cite>How the members area works in the rebuild</cite>
      </div>

      <p style={{ marginTop: 20 }}>
        Don&rsquo;t have the password yet? It comes with the curriculum, and{" "}
        <a href="/shop/god-the-father-14-bible-lessons-for-tweens-woven-within-the-lords-prayer">
          Part 1 is free
        </a>
        .
      </p>
    </div>
  );
}
