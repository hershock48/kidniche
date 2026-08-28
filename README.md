# Kid Niche Christian Books — concept rebuild

A Glazed Web concept build of kidniche.com for Susan Case Bonner: nine books,
the Weave Your Word in Me curriculum, and an in-house store, with **her copy
carried over verbatim** and the machine-written layer (titles, descriptions,
labels) rewritten by hand.

**Status: concept build.** Not sold, not launched. The pitch pattern applies:
proposal at the root of kidniche.glazedweb.com, this site at `/demo`
(host-scoped rewrites in `next.config.ts`, `beforeFiles`, both pitch hosts
sent `X-Robots-Tag: noindex`).

## Run it

```bash
npm install
npm run build && npm start     # production on :4490 — audit THIS, never dev
```

## Where content lives

**Every business fact is in `lib/site.ts`** — name, address, phone, products,
prices, her FAQ, student quotes, blog post list. A correction is one edit.

**Contact facts can also be edited from the owner panel** (`/admin`, see
below). Pages read those through `lib/content.ts`, which lays the panel's
stored edits over the `lib/site.ts` values; `site.ts` stays the seed and the
safety net, and clearing an edit in the panel returns the site to it.

Surfaces that CANNOT read from `lib/site.ts` (change them by hand):

- `public/pitch/kidniche/index.html` — the proposal (self-contained, has its
  own copies of her numbers and the $2,000 + $99 price)
- `public/pitch/kidniche/og.jpg` — the proposal link card
- `app/layout.tsx` — the site-wide title/description defaults
- This README

Surfaces that cannot read from `lib/content.ts` (panel edits reach them
another way): `SampleForm.tsx` is a client component, so its page passes the
effective email in as a prop.

## The owner panel (/admin) — session 1 of 3

The per-site owner panel from the Glaze Panel sketch (Aug 2026): every screen
is a form over rows, never a design surface. Built in this repo first;
extraction into a product waits for a second client, per the graduation rule.

**Built now:** PIN login, the dashboard, and the business-facts editor
(phone, email, address, social links; whitelisted per field in
`lib/panel/facts-def.ts`). **Sessions 2 and 3:** blog with photo upload and
preview, then stories/products/announcement as collection configs plus the
leads inbox wired to Resend.

Bones ported from scooplist (glaze/catalog/apps.md): the two-backend store
(`lib/panel/store.ts`, postgres when any `*_DATABASE_URL` exists, memory
otherwise, self-creating table) and the PIN gate (`lib/panel/auth.ts`,
HMAC cookie, 5-miss 10-minute lockout, 30-day session). A gate, not a
vault: nothing behind it moves money.

How an edit goes live: the facts route stores overrides, then calls
`revalidatePath("/", "layout")`. Site pages stay fully static; they re-render
with the new values on the next request. No database attached means the
panel runs on memory and SAYS SO on its own screens (demo-honesty rule);
edits then vanish on restart by design.

`.env.example` names the three launch variables: `PANEL_PIN` (until set, the
PIN falls back to the shop phone's last four, 7318), `PANEL_SECRET`,
`DATABASE_URL` (Vercel > Storage > Neon, free tier).

Her prose on /about, /reviews, /contact, the homepage bands, and the product
details/customer stories is **verbatim from the live site** (fetched 21 Aug
2026). Do not "improve" it; that is the whole direction of this engagement.

## Decisions, with reasoning

- **Her words, our build.** She is an author; the writing is the product. The
  only copy written fresh is the layer the old page builder generated: page
  titles, meta descriptions, alt text, headings on machinery pages. Kevin's
  call, Aug 2026.
- **Fraunces + Nunito Sans**, self-hosted at build time via `next/font/google`
  (no runtime request to Google). Warm storybook serif + rounded friendly
  sans. Deliberately NOT Inter (brand.md names it a default worth
  questioning).
- **Palette derived from her logo**: canopy green `#73B223` and trunk brown
  `#7D4900`, on warm cream. The brand green measures **2.48** on the paper
  color, so it is **decorative only**; text green is `--canopy-ink #42700F`
  (5.66 on paper). Every text pairing was computed before it was written into
  `globals.css` — the values are commented there.
- **In-house cart, no Woo.** Nine products need a list in React state and a
  hosted checkout, not WooCommerce + Memberships + Subscriptions. Checkout is
  **demo mode** and says so; Stripe is the launch wiring (`.env.example`).
  localStorage is guarded everywhere; with storage blocked the cart still
  works for the session.
- **Forms are honest.** The free-sample form is a real `mailto:` handoff with
  JS off; with JS on it explains demo mode and sends nothing. No stub that
  claims "we got it" while posting nowhere (glaze.md rule).
- **/privacy is a privacy policy** (the live site serves the exchange policy
  there — that was finding F-02 in the proposal). The exchange policy moved
  to `/exchange`. The privacy text is a PLACEHOLDER draft written from what
  this build actually does; Susan must approve it.
- **Blog index links to her live posts.** 17 posts migrate verbatim during
  the real build; a concept build should not duplicate her content at a
  second URL.
- **No scroll-reveal system.** The un-animated state is the finished state;
  the only motion is a gentle bob on the hero covers and hover lifts, both
  inside `prefers-reduced-motion` guards. (Failure log: reveal systems in a
  root layout hide the next page's content on navigation.)
- **Next 16** (not 15): clears every `npm audit` advisory (15 bundles
  vulnerable postcss/sharp). `npm audit` is clean as of 21 Aug 2026.

## Traps (this will break if you do not know)

- The pitch rewrites are in **`beforeFiles`** in `next.config.ts`. A plain
  `rewrites()` array is afterFiles and the root rewrite silently never fires
  because `app/page.tsx` answers `/`.
- The GlazedPlate values in `globals.css` (`--gw-above: #2E2417`) were
  computed by `glaze/scripts/plate.mjs` against THIS footer color. If the
  footer color changes, rerun the script; a wrong plate is invisible, not
  ugly.
- Product page canonicals point at `/product/<slug>` (the live site's URL
  shape) while the demo serves `/shop/<slug>`. **Decide the real URL shape at
  launch** and make canonicals, sitemap, and redirects agree. All 313 live
  URLs need redirect mapping either way.
- `app/favicon.ico` must exist (browsers request it unconditionally; its
  absence was the one console 404 the auditor caught).
- The site's header/footer/cart frame lives in **`app/(site)/layout.tsx`**,
  not the root layout, so `/admin` renders without the shop chrome. Because
  only a ROOT `not-found.tsx` catches unmatched URLs, that file rebuilds the
  frame by hand; change the two together.
- The panel's whitelist (`lib/panel/facts-def.ts`) drives the editor form,
  the save route's validation, and the merge in `lib/content.ts`. Add a
  field there and all three follow; add it anywhere else and it will not.

## PLACEHOLDER / unconfirmed facts (say these out loud at handover)

- [ ] **Prices** in `lib/site.ts` were read from the live site 21 Aug 2026.
      Several are sale prices (journal $6.75, green book $9.50, devotional
      $3.50, Part 1 free). Confirm with Susan before launch; she changes
      sales.
- [ ] **Email**: build shows her published Gmail. The pitch includes
      susan@kidniche.com as the free value-add; the mailbox must exist before
      the site prints it.
- [ ] **Privacy policy** text needs Susan's approval (and ideally an
      attorney's hour).
- [ ] **Member area**: the real build needs the actual gate (password model
      today), the current member list, and the 240 activity pages' content.
- [ ] **Artwork**: covers and photos were taken from her live site under the
      keep-her-brand direction. Original files (and who owns the painting)
      still needed.
- [ ] **GoDaddy**: what the $125/mo covers and its renewal dates, before any
      cutover.
- [ ] **Owner panel launch variables**: `PANEL_PIN` (Susan's real PIN, told
      by phone; until set the demo PIN is the shop phone's last four),
      `PANEL_SECRET`, and the Neon database. Without the database the panel
      warns that edits are memory-only.

## Launch checklist (glaze/launch.md, work to zero before "done")

### Correctness
- [x] Zero auditor violations at 390 and 1440 on every route (15 routes,
      21 Aug 2026)
- [x] Zero console errors, zero 4xx on every route (after favicon fix)
- [ ] `grep -rn PLACEHOLDER` hits are all on this checklist — yes as of today,
      re-check before launch
- [ ] Every form submitted and confirmed in a real inbox (demo mode now)
- [ ] Remote data sources verified on the deployment (none yet; Stripe at launch)
- [x] Headings/body contrast measured, not glanced (values in globals.css)

### Visitor experience
- [x] 320 / 390 / 768 / 1440 checked; zero horizontal overflow at 320
- [x] Reduced motion produces a complete page
- [x] JS off: every nav link works; free-sample form still submits (mailto).
      Cart buttons are JS-only — acceptable for a store enhancement, noted.
- [x] Focus visible everywhere; skip link first in tab order
- [ ] LCP < 2.5s / CLS < 0.1 on throttled mobile — measure on the deployment
- [ ] **Total JS 174KB gzip vs the 150KB bar — MISS, named honestly.** The
      Next 16 framework chunks alone are ~153KB gzip, so the bar is not
      reachable on this stack. Options recorded: accept (page HTML is 11KB
      gzip and static, so real-world LCP is fine), or rebuild on the
      Lemoncello-style zero-dependency generator. Kevin's call.

### Search and sharing
- [x] Every route has its own handwritten title and meta description
- [x] Organization + LocalBusiness (with address and phone) + FAQ schema on
      the homepage; Product + Offer schema on all nine product pages
- [x] Canonicals point at kidniche.com, never a vercel.app host
- [x] sitemap.xml and robots.txt generated; both pitch hosts noindex
- [ ] og:image per link-cards.md — using the green book cover for now;
      build a proper 1200×630 site card before launch
- [ ] 313 live URLs mapped to redirects at cutover

### Security and handover
- [x] No secrets anywhere in the repo; `.env.example` is the authority
- [x] `npm audit`: 0 vulnerabilities (Next 16)
- [x] Studio credit: GlazedPlate "Double Dipped by", plate ground computed
      (cream on #2E2417, step 14.17)
- [ ] HTTPS enforced — Vercel handles at deploy; verify no HTTP downgrade
- [ ] Susan told the credit is there (contract item)
