import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/cart";

/**
 * The public site's frame, moved out of the root layout when /admin arrived
 * so the owner panel does not render inside the shop's header and footer.
 * app/not-found.tsx rebuilds this frame by hand (a root not-found cannot
 * live inside a route group); if this changes, change it there too.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <CartProvider>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </CartProvider>
    </>
  );
}
