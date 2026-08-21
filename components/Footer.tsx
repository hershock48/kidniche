import GlazedPlate from "@/components/GlazedPlate";
import { site } from "@/lib/site";

export default function Footer() {
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
            {site.address.street}
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </p>
        </div>
        <div>
          <h2>Say hello</h2>
          <ul>
            <li>
              <a href={site.phoneHref}>{site.phone}</a>
            </li>
            <li>
              {/* Her line, verbatim. */}
              Call or text. (We love texts &mdash; please include your name.)
            </li>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <a href={site.social.facebook} rel="noopener">Facebook</a>
              {" · "}
              <a href={site.social.pinterest} rel="noopener">Pinterest</a>
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
