/**
 * Every business fact in one place, so a correction is one edit.
 * (glaze.md: "Facts live in one place." Copper's TV count was published wrong
 * three times because it was typed into six pieces of copy.)
 *
 * Surfaces that CANNOT read from this file are named in the README.
 *
 * PRICES were read from the live kidniche.com product pages on 21 Aug 2026.
 * Several are sale prices and Susan changes her sales. Confirm with her
 * before launch — this is on the README checklist.
 */

export const site = {
  name: "Kid Niche Christian Books",
  shortName: "Kid Niche",
  domain: "https://kidniche.com",
  tagline: "Christian prayer books and Bible curriculum for kids, tweens, and teens",
  owner: "Susan Case Bonner",
  // Contact facts from her live contact page, 21 Aug 2026.
  address: {
    street: "419 West Mansion Street",
    city: "Marshall",
    state: "MI",
    zip: "49068",
  },
  phone: "(231) 360-7318",
  phoneHref: "tel:+12313607318",
  // PLACEHOLDER until susan@kidniche.com exists: the live site publishes her
  // Gmail. The build sells the domain address; the mailbox has to be real
  // before launch. On the README checklist.
  email: "susancasebonner@gmail.com",
  social: {
    facebook: "https://www.facebook.com/KidNicheChristianBooks",
    pinterest: "https://www.pinterest.com/kidniche/",
  },
} as const;

export type Product = {
  slug: string;
  name: string; // her product name
  coverTitle: string; // what the cover itself says
  price: number; // dollars; 0 = free
  was: number | null; // pre-sale price if on sale
  format: string; // her words
  ages: string;
  band: "children" | "tweens" | "teens";
  digital: boolean;
  img: string;
  imgAlt: string;
  blurb: string; // one line for cards, from her copy
  details: string[]; // her bullet points, verbatim
  story?: { quote: string; label: string }; // "A True Story from a Customer"
};

export const products: Product[] = [
  {
    slug: "picture-prayer-book-for-children-0-8",
    name: "Picture Prayer Book for Children 0-8",
    coverTitle: "My Whole Self Before YOU",
    price: 7.5,
    was: 14.95,
    format: "32 page hardcover, 10″ × 8″",
    ages: "Ages 0–8",
    band: "children",
    digital: false,
    img: "/assets/books/yellow-book.webp",
    imgAlt:
      "My Whole Self Before YOU, the yellow picture prayer book, with a young boy looking upward on the cover",
    blurb: "The Lord’s Prayer in a child’s words, for daytime or bedtime.",
    details: [
      "The Lord’s Prayer in a Child’s Words",
      "Rhythmical Picture Prayer Book for Daytime or Bedtime",
      "33 Ethnically Diverse Color Photos Bring the Concepts of the Lord’s Prayer to Life",
      "Includes Gift Notation and Prayer Journal Pages",
      "Ideal for Preschoolers and Young Readers",
      "32 Page Hardcover Book (10″ x 8″)",
    ],
    story: {
      quote:
        "I would like to send my bunch of thanks for your very inspiring book. My 6 year old daughter really loves it. She finished reading it herself and said, “My little Bible book has found a friend.”",
      label: "A true story from a customer",
    },
  },
  {
    slug: "picture-prayer-book-with-bible-guide-for-families",
    name: "Picture Prayer Book With Bible Guide for Families",
    coverTitle: "My Whole Self Before YOU · with Learning Guide",
    price: 9.5,
    was: 18.95,
    format: "48 page hardcover, 10″ × 8″",
    ages: "Ages 4–8",
    band: "children",
    digital: false,
    img: "/assets/books/green-book.webp",
    imgAlt:
      "The green award-winning picture prayer book with Bible guide, Moonbeam Children’s Book Award seal on the cover",
    blurb:
      "The award winner: the child’s prayer plus a biblical learning guide for families.",
    details: [
      "Ages 4–8",
      "Rhythmical Child’s Prayer and Biblical Learning Guide Based on the Lord’s Prayer",
      "Ideal for Family Devotions or Bedtime",
      "33 Ethnically Diverse Color Photos Bring the Concepts of the Lord’s Prayer to Life",
      "80 Topical Bible Readings Teach Children How to Know God and Talk with Him",
      "Colorful Child-Friendly Stained Glass Windows Illustrate the Learning Guide",
      "48 Page Hardcover Book (10″ x 8″)",
    ],
    story: {
      quote:
        "I happened to be walking past a church with my 5 year old grandson, when he spontaneously asked me, “What do people do in that building?” I told him that people pray and worship the one true God in there and care for each other. He replied, “Do you do that too?” I told him, “Yes, I do.” He then genuinely asked, “Can you teach me to pray, Grandpa?” I gladly replied, “Yes, I would love to.” When we arrived back at the house, I thought of your book My Whole Self Before You that I had tucked away and used it to begin teaching him to pray. Thank you for writing such a meaningful, child-friendly resource that makes it so easy for me to pass down this beloved life-skill to my grandson.",
      label: "A true story from a customer",
    },
  },
  {
    slug: "bible-and-prayer-devotional-for-tweens",
    name: "Bible and Prayer Devotional for Tweens",
    coverTitle: "The Prayer Guide flip book",
    price: 3.5,
    was: 11.5,
    format: "Spiral flip book, 8½″ × 5½″",
    ages: "Tweens",
    band: "tweens",
    digital: false,
    img: "/assets/books/devotional.webp",
    imgAlt:
      "The spiral flip-book devotional for tweens, with a red-eye tree frog on the cover",
    blurb:
      "80 topical Bible readings with prayer templates, illustrated with red-eye tree frogs.",
    details: [
      "80 Topical Bible Readings with Prayer Templates",
      "Modeled After the Lord’s Prayer",
      "Red Eye Tree Frogs Color Illustrations",
      "Great Companion to the Weave Curriculum or Green Book as All 80 Lessons Are Keyed the Same",
      "Durable Flip Pages / Spiral Bound / 8 1/2″ x 5 1/2″",
      "Ideal for Personal or Family Devotions",
    ],
    story: {
      quote:
        "I love all of your books and use them in mentoring my grandchildren. But I have to say, my personal favorite is the Frog flip book. Don’t tell anyone, but I use it for my own prayers. I think its because I grew up in a liturgical church and the prayer templates give me just enough of an idea of how to frame my prayers based on what I’ve read in the Scriptures. Plus it is a fun, colorful book that makes me smile when I see those wide-eyed tree frogs — and it is an easy size to tuck into my brief case.",
      label: "A true story from a customer",
    },
  },
  {
    slug: "bible-and-prayer-curriculum-for-tweens-all-80-lessons",
    name: "Bible and Prayer Curriculum for Tweens — All 80 Lessons",
    coverTitle: "Weave Your Word in Me",
    price: 40,
    was: null,
    format: "Printed workbook, 124 color pages, 3-hole punched",
    ages: "4th–5th grades",
    band: "tweens",
    digital: false,
    img: "/assets/books/weave-workbook.webp",
    imgAlt:
      "Weave Your Word in Me, the printed 80-lesson Bible and prayer workbook for tweens",
    blurb:
      "The complete printed workbook: 80 binder-ready lessons across four units.",
    details: [
      "Ideal for 4th-5th Grades in Christian School, Homeschool, Church",
      "Also Great for Family Devotions (Same Lesson Formatting as Picture Prayer Book for Younger Kids)",
      "80 Binder Ready Lessons — 3 Hole Punched on 70# Paper",
      "124 Color Illustrated Pages",
      "4 Units on God the Father, God the Son, What God Wants, and God the Holy Spirit",
      "Prayer Practice that Features a Kid-Friendly Rewording of the Lord’s Prayer",
      "Complete Answer Key for 6 Major Translations (ESV, KJV, NABRE, NASB, NIV, NKJV)",
      "Various Methods: Bible Stories, Charts, Definitions, Drama, Drawing, Fill in the Blanks, Illustrations, Matching, Multiple Choice, Sequence, T&F",
      "Life-centered Enrichment Activities — Online",
      "Also available as a digital download in 4 parts — and Part 1 is free!",
    ],
  },
  {
    slug: "god-the-father-14-bible-lessons-for-tweens-woven-within-the-lords-prayer",
    name: "Weave Your Word in Me — Digital Part 1: God the Father",
    coverTitle: "Part 1 · God the Father · 14 lessons",
    price: 0,
    was: 10,
    format: "Digital download, 14 lessons",
    ages: "4th–6th grades",
    band: "tweens",
    digital: true,
    img: "/assets/books/weave-part1.webp",
    imgAlt: "Weave Your Word in Me Part 1 cover, God the Father",
    blurb:
      "The first 14 lessons, free, so your family can see what the series is all about.",
    details: [
      "Part 1 focuses on God the Father and is free",
      "Parts 2-4 are on God the Son, What God Wants, and God the Holy Spirit",
      "Prayer practice features a kid-friendly rewording of the Lord’s Prayer",
      "Variety of methods: Bible stories, charts, definitions, drama, drawing, fill-in-the-blank, illustrations, matching, multiple choice, sequence, T&F",
      "Complete answer key for 6 major Bible translations (ESV, KJV, NABRE, NASB, NIV, NKJV)",
      "Free online enrichment activities (3 for each lesson) — get the password with downloaded curriculum",
      "Ideal for 4th-6th grades in home school, Christian school, church",
    ],
  },
  {
    slug: "god-the-son-22-bible-lessons-for-tweens-woven-within-the-lords-prayer",
    name: "Weave Your Word in Me — Digital Part 2: God the Son",
    coverTitle: "Part 2 · God the Son · 22 lessons",
    price: 10,
    was: null,
    format: "Digital download, 22 lessons",
    ages: "4th–6th grades",
    band: "tweens",
    digital: true,
    img: "/assets/books/weave-part2.webp",
    imgAlt: "Weave Your Word in Me Part 2 cover, God the Son",
    blurb:
      "22 lessons on the Author of the Lord’s Prayer, for tweens who want to think big.",
    details: [
      "Weave Your Word in Me Part 2 focuses on God the Son",
      "Parts 1, 3, and 4 are on God the Father, What God Wants, and God the Holy Spirit",
      "Prayer practice features a kid-friendly rewording of the Lord’s Prayer and helps tweens create their own prayers based on what they have learned",
      "Variety of methods: Bible stories, charts, definitions, drama, drawing, fill-in-the-blank, illustrations, matching, multiple choice, sequence, T&F",
      "Complete answer key for 6 major Bible translations (ESV, KJV, NABRE, NASB, NIV, NKJV)",
      "Free online enrichment activities (3 for each lesson) — get the password with downloaded curriculum",
      "Ideal for 4th-6th grades in home school, Christian school, church",
    ],
  },
  {
    slug: "what-god-wants-28-bible-lessons-for-tweens-woven-within-the-lords-prayer",
    name: "Weave Your Word in Me — Digital Part 3: What God Wants",
    coverTitle: "Part 3 · What God Wants · 28 lessons",
    price: 10,
    was: null,
    format: "Digital download, 28 lessons",
    ages: "4th–6th grades",
    band: "tweens",
    digital: true,
    img: "/assets/books/weave-part3.webp",
    imgAlt: "Weave Your Word in Me Part 3 cover, What God Wants",
    blurb:
      "28 concepts for understanding and doing God’s will, straight from the Scriptures.",
    details: [
      "Weave Your Word in Me Part 3 focuses on What God Wants",
      "Parts 1, 2, and 4 are on God the Father, God the Son, and God the Holy Spirit",
      "Prayer practice features a kid-friendly rewording of the Lord’s Prayer and helps tweens create their own prayers based on what they have learned",
      "Variety of methods: Bible stories, charts, definitions, drama, drawing, fill-in-the-blank, illustrations, matching, multiple choice, sequence, T&F",
      "Complete answer key for 6 major Bible translations (ESV, KJV, NABRE, NASB, NIV, NKJV)",
      "Free online enrichment activities (3 for each lesson) — get the password with downloaded curriculum",
      "Ideal for 4th-6th grades in home school, Christian school, church",
    ],
  },
  {
    slug: "god-the-holy-spirit-16-bible-lessons-for-tweens-woven-within-the-lords-prayer",
    name: "Weave Your Word in Me — Digital Part 4: God the Holy Spirit",
    coverTitle: "Part 4 · God the Holy Spirit · 16 lessons",
    price: 10,
    was: null,
    format: "Digital download, 16 lessons",
    ages: "4th–6th grades",
    band: "tweens",
    digital: true,
    img: "/assets/books/weave-part4.webp",
    imgAlt: "Weave Your Word in Me Part 4 cover, God the Holy Spirit",
    blurb: "The final 16 lessons: who the Holy Spirit is and how He helps.",
    details: [
      "Weave Your Word in Me Part 4 focuses on God the Holy Spirit",
      "Parts 1, 2, and 3 are on God the Father, God the Son, and What God Wants",
      "Prayer practice features a kid-friendly rewording of the Lord’s Prayer",
      "Complete answer key for 6 major Bible translations (ESV, KJV, NABRE, NASB, NIV, NKJV)",
      "Free online enrichment activities (3 for each lesson) — get the password with downloaded curriculum",
      "Ideal for 4th-6th grades in home school, Christian school, church",
    ],
  },
  {
    slug: "pray-like-jesus-prayer-journal-for-teens",
    name: "Pray-Like-Jesus Prayer Journal for Teens",
    coverTitle: "Pray Often, Pray REAL",
    price: 6.75,
    was: 13.5,
    format: "Spiral soft cover, 116 pages, 5½″ × 8½″, three colors",
    ages: "Teens",
    band: "teens",
    digital: false,
    img: "/assets/books/journal-colors.webp",
    imgAlt:
      "Pray Often Pray REAL, the Pray-Like-Jesus journal for teens, in three cover colors",
    blurb:
      "A journal for teens who want to learn to pray like Jesus, in a choice of three colors.",
    details: [
      "Features “How to Hear God Chart” and 52 “Pray Like Jesus Pages”",
      "Ideal for Bullet Points, Drawing, or Sentence Prayers",
      "Bible Memory Recommendations",
      "Spiral Bound / 116 Pages / 5 1/2″ x 8 1/2″",
      "Great for Adults Too!",
    ],
  },
];

export const bands = [
  {
    key: "children",
    label: "For Young Children",
    heading: "Praying From the Mind & Heart",
    // Her homepage copy, verbatim.
    copy: "Imagine your children and grandchildren praying the way Jesus taught his disciples — using their minds and hearts. Our award winning picture prayer book, My Whole Self Before YOU, is a helpful resource for teaching young children to pray with meaning, sincerity, faith, and understanding.",
  },
  {
    key: "tweens",
    label: "For Upper Elementary",
    heading: "Tweens love to communicate. . . So teach them to communicate with God.",
    copy: "Be a spiritual mentor to your kids by helping them learn the lessons Jesus wove within the Lord’s Prayer. Our upper elementary curriculum called Weave Your Word in Me is perfect for guiding tweens to discover and apply biblical truth for themselves.",
  },
  {
    key: "teens",
    label: "For Teens",
    heading: "Pray Often, Pray Real",
    copy: "A special kind of prayer journal developed with teens in mind who desire to learn to pray like Jesus. It features a chart of “16 Ways God Speaks to People” based on the teachings of Scripture, and 52 journal sheets that outline six different ways Jesus prayed.",
  },
] as const;

// Her students' words, from the Weave workbook page. Verbatim.
export const studentReviews = [
  "It teaches me about God and how he works.",
  "I am having fun while learning about God.",
  "It helps me know what to pray for.",
  "The questions make me feel like I’m with God.",
  "I understand it and I get closer to God.",
];

// Her FAQ, from the homepage FAQ schema. Verbatim.
export const faq = [
  {
    q: "What are Christian prayer books for kids designed to teach?",
    a: "Christian prayer books for kids help children understand how to pray using Biblical principles and guided activities. They encourage children to develop a daily prayer habit while strengthening their relationship with God.",
  },
  {
    q: "Who can use a homeschool Christian prayer curriculum?",
    a: "A homeschool Christian prayer curriculum is ideal for homeschooling families and Christian schools who want structured, faith-based resources that teach prayer and Biblical values.",
  },
  {
    q: "How do Christian prayer books for kids support different age groups?",
    a: "Many Christian prayer books for kids are written with age-specific content, helping kids, young children, tweens, and teens learn about prayer at a pace that fits their spiritual growth.",
  },
] as const;

// Real post titles from her live blog, linking to the live posts. The posts
// themselves migrate with the build; see README.
export const blogPosts = [
  { title: "God Is the Potter. I Am the Clay.", slug: "god-is-the-potter-i-am-the-clay" },
  { title: "Who’s In the Driver’s Seat?", slug: "whos-in-the-drivers-seat" },
  { title: "Can You Hear God Speaking to You?", slug: "can-you-hear-god-speaking-to-you" },
  { title: "The ABC’s of Bible Proverbs", slug: "the-abcs-of-bible-proverbs" },
  { title: "Obedience Is Good for Your Bones", slug: "obedience-is-good-for-your-bones" },
  { title: "Tucked-In Prayers", slug: "tucked-in-prayers" },
  { title: "Prayer is Priceless", slug: "prayer-is-priceless" },
  { title: "Don’t Give Up!", slug: "dont-give-up" },
] as const;

export function dollars(n: number): string {
  return n === 0 ? "Free" : "$" + n.toFixed(2);
}
