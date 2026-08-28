import GlazedPlate from "@/components/GlazedPlate";
import { site } from "@/lib/site";
import { getFacts } from "@/lib/content";

export default async function Footer() {
  // Contact facts come through the seam so the owner panel's edits show
  // here; the name and the prose stay on lib/site.ts, which the panel
  // cannot touch on purpose.
  const facts = await getFacts();
  return (
    <footer className="site-footer">
      <div className="wrap cols">
        <div>
          <h2>{site.name}</h2>
          <p style={{ maxWidth: "26em" }}>
            {site.owner} writes and publishes children&rsquo;s books and Bible
            curriculum in the lovely historic town of Marshall, Michigan.
          </p>
          <p>
            {facts.street}
            <br />
            {facts.city}, {facts.state} {facts.zip}
          </p>
        </div>
        <div>
          <h2>Say hello</h2>
          <ul>
            <li>
              <a href={facts.phoneHref}>{facts.phone}</a>
            </li>
            <li>
              {/* Her line, verbatim. */}
              Call or text. (We love texts &mdash; please include your name.)
            </li>
            <li>
              <a href={`mailto:${facts.email}`}>{facts.email}</a>
            </li>
            <li>
              <a href={facts.facebook} rel="noopener">Facebook</a>
              {" · "}
              <a href={facts.pinterest} rel="noopener">Pinterest</a>
            </li>
          </ul>
        </div>
        <div>
          <h2>Around the site</h2>
          <ul>
            <li><a href="/shop">The Kid Niche Shop</a></li>
            <li><a href="/free-sample">Free sample</a></li>
            <li><a href="/reviews">Reviews</a></li>
            <li><a href="/exchange">Exchange policy</a></li>
            <li><a href="/privacy">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap fine">
        &copy; 2026 {site.name}. All rights reserved.
      </div>
      <GlazedPlate line="Double Dipped by" />
    </footer>
  );
}
