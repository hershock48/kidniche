"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FACT_FIELDS, factError, type FactKey } from "@/lib/panel/facts-def";

/**
 * The whole form renders from FACT_FIELDS, the whitelist in
 * lib/panel/facts-def.ts: adding a field there adds it here and to the save
 * route's validation in the same edit. Inputs hold the EFFECTIVE value; the
 * built-in default sits underneath as the placeholder, so clearing a box and
 * saving visibly returns the site to what it was built with.
 */
export default function FactsForm({
  values,
  defaults,
  overridden,
}: {
  values: Record<FactKey, string>;
  defaults: Record<FactKey, string>;
  overridden: FactKey[];
}) {
  const router = useRouter();
  const [form, setForm] = useState(values);
  const [edited, setEdited] = useState(new Set(overridden));
  const [errors, setErrors] = useState<Partial<Record<FactKey, string>>>({});
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);

  return (
    <form
      className="panel-form"
      onSubmit={async (e) => {
        e.preventDefault();
        setSaved(false);
        setFailed(null);

        // Check locally first so a typo is caught before the round trip;
        // the save route runs the same factError checks again regardless.
        const found: Partial<Record<FactKey, string>> = {};
        for (const f of FACT_FIELDS) {
          const err = factError(f, form[f.key].trim());
          if (err) found[f.key] = err;
        }
        setErrors(found);
        if (Object.keys(found).length > 0) return;

        setBusy(true);
        try {
          const res = await fetch("/api/admin/facts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ values: form }),
          });
          const data = (await res.json()) as {
            ok: boolean;
            values?: Record<FactKey, string>;
            overridden?: FactKey[];
            errors?: Partial<Record<FactKey, string>>;
          };
          if (data.ok && data.values) {
            setForm(data.values);
            setEdited(new Set(data.overridden ?? []));
            setSaved(true);
            router.refresh();
          } else if (data.errors) {
            setErrors(data.errors);
          } else {
            setFailed("The save did not go through. Try again in a moment.");
          }
        } catch {
          setFailed("The save did not go through. Try again in a moment.");
        }
        setBusy(false);
      }}
    >
      {FACT_FIELDS.map((f) => (
        <label className="field" key={f.key}>
          <span>
            {f.label}
            {edited.has(f.key) && <span className="edited-badge">Edited</span>}
          </span>
          <input
            type="text"
            inputMode={f.kind === "email" ? "email" : f.kind === "url" ? "url" : "text"}
            value={form[f.key]}
            placeholder={defaults[f.key]}
            onChange={(e) => {
              setForm({ ...form, [f.key]: e.target.value });
              setSaved(false);
            }}
          />
          {errors[f.key] ? (
            <span className="field-error" role="alert">
              {errors[f.key]}
            </span>
          ) : (
            f.help && <span className="field-help">{f.help}</span>
          )}
        </label>
      ))}

      {saved && (
        <p className="panel-saved" role="status">
          Saved. The site updates within a few seconds.
        </p>
      )}
      {failed && (
        <p className="field-error" role="alert">
          {failed}
        </p>
      )}

      <div>
        <button className="btn primary" type="submit" disabled={busy}>
          {busy ? "Saving" : "Save and publish"}
        </button>
      </div>
    </form>
  );
}
