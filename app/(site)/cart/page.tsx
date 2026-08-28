import type { Metadata } from "next";
import { CartPageBody } from "@/components/cart";

export const metadata: Metadata = {
  title: "Your Cart",
  description:
    "Review your Kid Niche order. Printed books ship from Marshall, Michigan; digital lessons arrive by email the moment payment clears.",
  alternates: { canonical: "/cart" },
  robots: { index: false, follow: true },
};

export default function Cart() {
  return (
    <div className="wrap-narrow" style={{ padding: "56px 0" }}>
      <span className="kicker">Almost there</span>
      <h1>Your cart</h1>
      <div style={{ marginTop: 24 }}>
        <CartPageBody />
      </div>
    </div>
  );
}
