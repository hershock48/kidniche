import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { isAuthed } from "@/lib/panel/auth";
import { DEFAULT_ORG, getStore } from "@/lib/panel/store";
import { FACTS_KEY, factDefaults, getFacts } from "@/lib/content";
import {
  FACT_FIELDS,
  factError,
  type FactKey,
  type FactOverrides,
} from "@/lib/panel/facts-def";

/**
 * Save the business facts. The form posts EFFECTIVE values; only a value
 * that differs from the checked-in default is stored as an override, so a
 * field typed back to (or cleared to) the original drops its override and
 * its "Edited" badge together. Deleting every override always leaves the
 * site exactly as built: that is the fear-proofing contract.
 *
 * Validation runs the same factError the form ran: the form's pass is for a
 * fast error message, this one is the one that counts.
 */
export async function POST(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let raw: Record<string, unknown> = {};
  try {
    const body = (await req.json()) as { values?: unknown };
    if (body.values && typeof body.values === "object") {
      raw = body.values as Record<string, unknown>;
    }
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const defaults = factDefaults();
  const overrides: FactOverrides = {};
  const errors: Partial<Record<FactKey, string>> = {};

  // Only whitelisted keys are even looked at; anything else in the payload
  // is dropped without comment.
  for (const field of FACT_FIELDS) {
    const submitted = raw[field.key];
    if (typeof submitted !== "string") continue;
    const value = submitted.trim();
    const err = factError(field, value);
    if (err) {
      errors[field.key] = err;
      continue;
    }
    if (value !== "" && value !== defaults[field.key]) {
      overrides[field.key] = value;
    }
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  await getStore().setValue(DEFAULT_ORG, FACTS_KEY, overrides);

  // Everything under the root layout re-renders on its next request: the
  // footer is on every page, so per-path bookkeeping would just be a list
  // that goes stale the day a page is added.
  revalidatePath("/", "layout");

  const facts = await getFacts();
  const values = Object.fromEntries(
    FACT_FIELDS.map((f) => [f.key, facts[f.key as keyof typeof facts] as string]),
  );
  return NextResponse.json({ ok: true, values, overridden: facts.overridden });
}
