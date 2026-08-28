import "server-only";

import { site } from "@/lib/site";
import { DEFAULT_ORG, getStore } from "@/lib/panel/store";
import { FACT_KEYS, type FactKey, type FactOverrides } from "@/lib/panel/facts-def";

/**
 * The content seam: what pages read instead of importing lib/site.ts
 * directly, for every fact the owner panel can edit.
 *
 * lib/site.ts stays exactly what it was, the seed and the safety net. This
 * file reads the panel's stored overrides and lays them over the site.ts
 * values; where no edit exists, the site renders exactly as it did before
 * the panel existed, database or no database. Deleting every override (or
 * the whole database) can only ever put the site back to its checked-in
 * state, which is what makes "you cannot break this site" literally true.
 *
 * Pages stay static: this runs at build / revalidate time, not per request.
 * The facts save route calls revalidatePath("/", "layout") after a save, so
 * an edit is live within seconds without making any route dynamic.
 *
 * The one surface that CANNOT call this is a client component; it takes the
 * effective value as a prop from its server page instead (SampleForm gets
 * `email` that way). Named in the README per the site.ts doctrine.
 */

export type Facts = {
  phone: string;
  /** Derived from phone, never stored: one fact, one edit. */
  phoneHref: string;
  /** Schema.org telephone shape ("+12313607318"), derived the same way. */
  phoneSchema: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  facebook: string;
  pinterest: string;
  /** Which fields currently carry a panel edit, for the editor's badges. */
  overridden: FactKey[];
};

const DEFAULTS: Record<FactKey, string> = {
  phone: site.phone,
  email: site.email,
  street: site.address.street,
  city: site.address.city,
  state: site.address.state,
  zip: site.address.zip,
  facebook: site.social.facebook,
  pinterest: site.social.pinterest,
};

/**
 * tel: link from whatever the owner typed. Ten digits reads as a US number
 * and gets +1; eleven starting with 1 is the same number with the country
 * code typed out. Anything else is passed through as digits, which is still
 * a working tel: link even if it is not E.164.
 */
function telFrom(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return digits;
}

export const FACTS_KEY = "facts";

export async function getFactOverrides(): Promise<FactOverrides> {
  const stored = await getStore().getValue<FactOverrides>(DEFAULT_ORG, FACTS_KEY);
  if (!stored || typeof stored !== "object") return {};
  // Re-filter on read: a value written by an older or newer build only
  // counts if this build's whitelist knows the key.
  const clean: FactOverrides = {};
  for (const key of FACT_KEYS) {
    const v = stored[key];
    if (typeof v === "string" && v !== "") clean[key] = v;
  }
  return clean;
}

export async function getFacts(): Promise<Facts> {
  const overrides = await getFactOverrides();
  const value = (key: FactKey) => overrides[key] ?? DEFAULTS[key];
  const phone = value("phone");
  const tel = telFrom(phone);
  return {
    phone,
    phoneHref: `tel:${tel}`,
    phoneSchema: tel,
    email: value("email"),
    street: value("street"),
    city: value("city"),
    state: value("state"),
    zip: value("zip"),
    facebook: value("facebook"),
    pinterest: value("pinterest"),
    overridden: FACT_KEYS.filter((k) => k in overrides),
  };
}

/** The checked-in defaults, for the editor's "built in" placeholders. */
export function factDefaults(): Record<FactKey, string> {
  return { ...DEFAULTS };
}
