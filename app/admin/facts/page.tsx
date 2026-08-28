import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/panel/auth";
import { getStore } from "@/lib/panel/store";
import { factDefaults, getFacts } from "@/lib/content";
import { FACT_KEYS, type FactKey } from "@/lib/panel/facts-def";
import FactsForm from "./FactsForm";

export const metadata: Metadata = { title: "Business facts" };

export default async function AdminFacts() {
  if (!(await isAuthed())) redirect("/admin/login");
  const facts = await getFacts();
  const defaults = factDefaults();
  const values = Object.fromEntries(
    FACT_KEYS.map((k) => [k, facts[k as keyof typeof facts] as string]),
  ) as Record<FactKey, string>;

  return (
    <>
      <p style={{ marginBottom: 6 }}>
        <a href="/admin" style={{ fontSize: 14, fontWeight: 700 }}>
          ← Back to the panel
        </a>
      </p>
      <span className="kicker">Business facts</span>
      <h1>Your contact details, everywhere at once</h1>
      <p className="lede" style={{ marginTop: 10 }}>
        Change a fact here and every page that shows it updates within a few
        seconds. Clear a box and save to go back to what the site was built
        with; you cannot break anything from this page.
      </p>

      {getStore().backend === "memory" && (
        <p className="panel-warning">
          Heads up: no database is attached yet, so anything you save here
          lives only in memory and disappears when the server restarts. Kevin
          attaches the free database before this panel carries real edits.
        </p>
      )}

      <FactsForm values={values} defaults={defaults} overridden={facts.overridden} />
    </>
  );
}
