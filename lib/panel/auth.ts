import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Owner-panel auth: a PIN and a cookie. Ported from scooplist/src/lib/auth.ts
 * minus the org half (kidniche is single-tenant; the org cookie format comes
 * back with extraction if it is ever needed).
 *
 * A gate, not a vault: nothing behind it moves money, and the worst a
 * breached gate can do is publish a visible blog post or change a phone
 * number, with the old value recoverable (overrides never destroy the
 * lib/site.ts default). But a gate should still latch:
 *
 *  - The cookie carries an HMAC of the PIN, never the PIN itself. Set
 *    PANEL_SECRET to make cookie-guessing require the server secret; without
 *    it the key derives from the PIN (the cookie still never exposes the PIN
 *    to shoulder-surfing devtools).
 *  - Failed PINs throttle per address: 5 misses locks that address out for
 *    10 minutes. Per-process on serverless; that raises the bar from "script
 *    the 10,000" to "not worth it for a phone number."
 *
 * The fallback PIN is the shop phone's last four so a zero-setup demo works
 * and Susan can be told it over the phone. Set PANEL_PIN before this carries
 * the real site.
 *
 * 30-day cookie (scooplist's reasoning): this lives on the owner's own
 * phone, and re-typing a PIN every morning is how panels go unused.
 */

const COOKIE = "kidniche_panel";
const PIN_FALLBACK = "7318";

export function panelPin(): string {
  return process.env.PANEL_PIN || PIN_FALLBACK;
}

function cookieValue(): string {
  const pin = panelPin();
  const secret = process.env.PANEL_SECRET || `panel-gate:${pin}`;
  return createHmac("sha256", secret).update(pin).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export async function isAuthed(): Promise<boolean> {
  const jar = await cookies();
  const got = jar.get(COOKIE)?.value ?? "";
  return got !== "" && safeEqual(got, cookieValue());
}

export async function setAuthCookie(): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE, cookieValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
}

export async function clearAuthCookie(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}

/* ------------------------- PIN attempt throttle ------------------------- */

const MAX_FAILS = 5;
const LOCK_MS = 10 * 60 * 1000;

type Attempts = Map<string, { fails: number; lockedUntil: number }>;

function attempts(): Attempts {
  const g = globalThis as typeof globalThis & { __panelPinAttempts?: Attempts };
  if (!g.__panelPinAttempts) g.__panelPinAttempts = new Map();
  return g.__panelPinAttempts;
}

export function pinLocked(key: string): boolean {
  const a = attempts().get(key);
  return !!a && a.lockedUntil > Date.now();
}

/** Check a submitted PIN, throttle included. `key` is the caller's address. */
export function checkPin(key: string, pin: string): boolean {
  if (pinLocked(key)) return false;
  const ok = safeEqual(pin.trim(), panelPin());
  const map = attempts();
  if (ok) {
    map.delete(key);
    return true;
  }
  const a = map.get(key) ?? { fails: 0, lockedUntil: 0 };
  a.fails += 1;
  if (a.fails >= MAX_FAILS) {
    a.lockedUntil = Date.now() + LOCK_MS;
    a.fails = 0;
  }
  map.set(key, a);
  return false;
}
