"use client";

/**
 * DEMO MODE. The concept build has no mail service, and glaze.md is clear
 * about the honest behavior: no stub that says "we got it" while sending
 * nowhere. So the demo says exactly what it is, and the no-JS path still
 * works because the form is a real mailto handoff with the fields prefilled.
 *
 * In the real build this posts to a route that emails the sample from
 * kidniche.com and logs the signup (INQUIRY_TO in .env.example).
 */

import { useState } from "react";

/**
 * `email` comes from the server page via lib/content.ts: a client component
 * cannot read the panel's store, so this is the one surface that takes its
 * fact as a prop (named in the README).
 */
export default function SampleForm({ email }: { email: string }) {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");

  if (sent) {
    return (
      <div className="story" role="status">
        <blockquote>
          Thank you{name ? `, ${name}` : ""}! On the live site your sample
          lesson would now be on its way from kidniche.com. This is the concept
          build, so nothing was actually sent &mdash; your address went nowhere
          at all.
        </blockquote>
        <cite>Demo mode</cite>
      </div>
    );
  }

  return (
    <form
      className="stack"
      style={{ marginTop: 22 }}
      action={`mailto:${email}?subject=${encodeURIComponent("Free sample, please")}`}
      method="post"
      encType="text/plain"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label className="field">
        Your name
        <input type="text" name="name" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label className="field">
        Email address
        <input type="email" name="email" autoComplete="email" required />
      </label>
      <button className="btn primary" type="submit">
        Send me the free sample
      </button>
      <p className="demo-note">
        Concept build: submitting shows what the live site would do, and sends
        nothing anywhere.
      </p>
    </form>
  );
}
