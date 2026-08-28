import type { Metadata } from "next";
import { isAuthed } from "@/lib/panel/auth";
import LogoutButton from "./LogoutButton";
import "./admin.css";

/**
 * The owner panel's frame. Deliberately not the shop's header: no cart, no
 * product nav, one link back to the site. Reading the auth cookie makes
 * every /admin route dynamic, which is correct for an admin.
 *
 * noindex belt and suspenders: this metadata plus the /admin disallow in
 * app/robots.ts.
 */
export const metadata: Metadata = {
  title: { default: "Owner panel", template: "%s · Owner panel" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAuthed();
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="panel-topbar">
        <div className="wrap bar">
          <p className="who">
            <span>Owner panel</span>
            Kid Niche Christian Books
          </p>
          <nav aria-label="Panel">
            <a href="/">See the site</a>
            {authed && <LogoutButton />}
          </nav>
        </div>
      </div>
      <main id="main" className="panel-main">
        <div className="wrap">{children}</div>
      </main>
    </>
  );
}
