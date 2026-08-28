/**
 * The whitelist of business facts the owner panel can edit, one entry per
 * field. This file is the seam's contract: the editor form renders FROM it,
 * the save route validates AGAINST it, and lib/content.ts merges BY it, so a
 * field not listed here cannot be edited from the panel at all. That is the
 * fear-proofing: Susan edits her phone number; she cannot rename the company
 * by accident.
 *
 * This is also the start of the collection-definition pattern from the panel
 * sketch (a config object declares the fields, generic screens render from
 * it). Client-safe on purpose: no server-only import, so the client-side
 * form can read labels and kinds directly.
 *
 * `kind` drives the input type and the save-route check. "text" is checked
 * only for length; "email" and "url" get a shape check because a typo there
 * breaks a link, not just a label.
 */

export type FactKind = "text" | "email" | "url";

export type FactField = {
  key: FactKey;
  label: string;
  kind: FactKind;
  /** One plain sentence under the input. House voice, no jargon. */
  help: string;
};

export type FactKey =
  | "phone"
  | "email"
  | "street"
  | "city"
  | "state"
  | "zip"
  | "facebook"
  | "pinterest";

/** What the panel stores: only edited fields, only whitelisted keys. */
export type FactOverrides = Partial<Record<FactKey, string>>;

export const FACT_FIELDS: FactField[] = [
  {
    key: "phone",
    label: "Phone number",
    kind: "text",
    help: "Shown in the footer, on the contact page, and anywhere the site says to call or text.",
  },
  {
    key: "email",
    label: "Email address",
    kind: "email",
    help: "Every email link on the site points here.",
  },
  {
    key: "street",
    label: "Street address",
    kind: "text",
    help: "The mailing address, line one.",
  },
  {
    key: "city",
    label: "City",
    kind: "text",
    help: "",
  },
  {
    key: "state",
    label: "State",
    kind: "text",
    help: "Two letters, like MI.",
  },
  {
    key: "zip",
    label: "ZIP code",
    kind: "text",
    help: "",
  },
  {
    key: "facebook",
    label: "Facebook page",
    kind: "url",
    help: "The full address, starting with https://",
  },
  {
    key: "pinterest",
    label: "Pinterest page",
    kind: "url",
    help: "The full address, starting with https://",
  },
];

export const FACT_KEYS = FACT_FIELDS.map((f) => f.key);

/** Generous cap; a street address is never 300 characters, a paste-bomb is. */
export const FACT_MAX_LENGTH = 300;

/**
 * Validate one submitted value for one field. Returns an error sentence to
 * show the owner, or null when the value is fine. Empty string is always
 * valid: it means "clear my edit, go back to the built-in value".
 */
export function factError(field: FactField, value: string): string | null {
  if (value === "") return null;
  if (value.length > FACT_MAX_LENGTH) {
    return "That looks too long. Please shorten it.";
  }
  if (field.kind === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "That does not look like an email address.";
  }
  if (field.kind === "url" && !/^https:\/\/.+\..+/.test(value)) {
    return "Please paste the full address, starting with https://";
  }
  return null;
}
