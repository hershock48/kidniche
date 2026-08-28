import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/cart";

/**
 * Rebuilds app/(site)/layout.tsx's frame by hand: only a ROOT not-found
 * catches unmatched URLs, and the root layout stopped carrying the site
 * chrome when /admin arrived. Without this the 404 page renders bare paper
 * with no way back. If the (site) layout's frame changes, change it here too.
 */
export default function NotFound() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <CartProvider>
        <Header />
        <main id="main">
          <div className="wrap-narrow" style={{ padding: "80px 0", textAlign: "center" }}>
            <span className="kicker">Page not found</span>
            <h1>This page wandered off.</h1>
            <p className="lede" style={{ margin: "14px auto 0" }}>
              The bookshelf is still right where it was.
            </p>
            <p style={{ marginTop: 22 }}>
              <a className="btn primary" href="/">Back to the front page</a>{" "}
              <a className="btn ghost" href="/shop">Open the shop</a>
            </p>
          </div>
        </main>
        <Footer />
      </CartProvider>
    </>
  );
}
