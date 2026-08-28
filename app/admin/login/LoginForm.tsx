"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  return (
    <form
      className="stack"
      style={{ marginTop: 18 }}
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError(null);
        try {
          const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pin }),
          });
          const data = (await res.json()) as { ok: boolean; locked?: boolean };
          if (data.ok) {
            router.push("/admin");
            router.refresh();
            return;
          }
          setError(
            data.locked
              ? "Too many tries. Wait ten minutes and try again."
              : "That PIN did not match. Try again.",
          );
        } catch {
          setError("Something went wrong on our end. Try again in a moment.");
        }
        setBusy(false);
      }}
    >
      <label className="field">
        PIN
        <input
          className="pin-input"
          type="password"
          inputMode="numeric"
          autoComplete="current-password"
          maxLength={12}
          required
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
      </label>
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
      <button className="btn primary" type="submit" disabled={busy}>
        {busy ? "One moment" : "Open the panel"}
      </button>
    </form>
  );
}
