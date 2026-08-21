"use client";

/**
 * A small in-house cart. This is the point of the build: nine products do not
 * need a WooCommerce + Memberships + Subscriptions stack, they need a list in
 * React state and a Stripe hosted checkout at the end of it.
 *
 * DEMO MODE: checkout explains itself instead of charging. Stripe is wired
 * during the real build (STRIPE_SECRET_KEY in .env.example).
 *
 * localStorage is a convenience, not a dependency: every read/write is
 * guarded, and with storage unavailable the cart still works for the session.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, dollars, type Product } from "@/lib/site";

type CartItem = { slug: string; qty: number };

type CartApi = {
  items: CartItem[];
  add: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  count: number;
  total: number;
};

const CartCtx = createContext<CartApi | null>(null);
const KEY = "kidniche-cart-v1";

function readStored(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return parsed.filter(
      (i) => products.some((p) => p.slug === i.slug) && Number.isInteger(i.qty) && i.qty > 0,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load after mount so server and first client render agree (no hydration
  // mismatch), and so a storage-less browser still gets a working cart.
  useEffect(() => {
    setItems(readStored());
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable: cart lives for the session only */
    }
  }, [items]);

  const add = useCallback((slug: string) => {
    setItems((prev) => {
      const hit = prev.find((i) => i.slug === slug);
      if (hit) return prev.map((i) => (i.slug === slug ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { slug, qty: 1 }];
    });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) => (i.slug === slug ? { ...i, qty } : i)),
    );
  }, []);

  const { count, total } = useMemo(() => {
    let c = 0;
    let t = 0;
    for (const i of items) {
      const p = products.find((x) => x.slug === i.slug) as Product;
      c += i.qty;
      t += p.price * i.qty;
    }
    return { count: c, total: t };
  }, [items]);

  const api = useMemo(() => ({ items, add, setQty, count, total }), [items, add, setQty, count, total]);
  return <CartCtx.Provider value={api}>{children}</CartCtx.Provider>;
}

export function useCart(): CartApi {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart outside CartProvider");
  return ctx;
}

export function CartLink() {
  const { count } = useCart();
  return (
    <a className="cart-link" href="/cart">
      Cart{count > 0 ? ` (${count})` : ""}
    </a>
  );
}

export function AddToCart({ slug, free }: { slug: string; free: boolean }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  return (
    <button
      type="button"
      className="btn primary"
      onClick={() => {
        add(slug);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1600);
      }}
    >
      {added ? "Added ✓" : free ? "Add free download" : "Add to cart"}
    </button>
  );
}

export function CartPageBody() {
  const { items, setQty, total } = useCart();
  if (items.length === 0) {
    return (
      <p className="lede">
        Your cart is empty. The whole bookshelf is on the <a href="/shop">shop page</a>.
      </p>
    );
  }
  return (
    <div>
      {items.map((i) => {
        const p = products.find((x) => x.slug === i.slug) as Product;
        return (
          <div className="cart-line" key={i.slug}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.img} alt="" width={64} height={64} style={{ objectFit: "contain" }} />
            <div>
              <strong>{p.name}</strong>
              <div className="format-note">{dollars(p.price)} · {p.format}</div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button className="qty-btn" type="button" aria-label={`One fewer ${p.name}`} onClick={() => setQty(i.slug, i.qty - 1)}>−</button>
              <span aria-live="polite">{i.qty}</span>
              <button className="qty-btn" type="button" aria-label={`One more ${p.name}`} onClick={() => setQty(i.slug, i.qty + 1)}>+</button>
            </div>
            <strong>{dollars(p.price * i.qty)}</strong>
          </div>
        );
      })}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "18px 0", fontSize: 19 }}>
        <strong>Total</strong>
        <strong>{dollars(total)}</strong>
      </div>
      <button type="button" className="btn primary" onClick={() => document.getElementById("demo-checkout")?.removeAttribute("hidden")}>
        Check out
      </button>
      <p className="demo-note" id="demo-checkout" hidden>
        This is the concept build, so checkout stops here. On the live site this
        button goes straight to Stripe&rsquo;s secure checkout: card, Apple&nbsp;Pay,
        Google&nbsp;Pay. Printed books collect a shipping address; digital lessons
        arrive by email the moment payment clears.
      </p>
    </div>
  );
}
