import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/panel/auth";
import { getStore } from "@/lib/panel/store";

/**
 * The dashboard: what Susan can do today, and what is on the way, honestly
 * labeled. A card only becomes a link when its screen actually works; a
 * dashed "on the way" card is not clickable and does not pretend.
 */
export default async function AdminHome() {
  if (!(await isAuthed())) redirect("/admin/login");
  const backend = getStore().backend;

  return (
    <>
      <span className="kicker">Welcome back</span>
      <h1>What would you like to change?</h1>

      {backend === "memory" && (
        <p className="panel-warning">
          Heads up: no database is attached yet, so anything you save here
          lives only in memory and disappears when the server restarts. Kevin
          attaches the free database before this panel carries real edits.
        </p>
      )}

      <div className="panel-cards">
        <div className="panel-card">
          <h2>
            <a href="/admin/facts">Business facts</a>
          </h2>
          <p>
            Phone, email, mailing address, and your Facebook and Pinterest
            links. One edit updates every page that shows them.
          </p>
          <a className="go" href="/admin/facts">
            Open →
          </a>
        </div>
        <div className="panel-card soon">
          <span className="tag">On the way</span>
          <h2>Blog</h2>
          <p>Write a post, attach a photo, preview it, publish it.</p>
        </div>
        <div className="panel-card soon">
          <span className="tag">On the way</span>
          <h2>Photos</h2>
          <p>Swap the pictures the site shows, straight from your phone.</p>
        </div>
        <div className="panel-card soon">
          <span className="tag">On the way</span>
          <h2>Customer stories</h2>
          <p>Add a kind note from a reader, show it or tuck it away.</p>
        </div>
        <div className="panel-card soon">
          <span className="tag">On the way</span>
          <h2>Products and prices</h2>
          <p>Change a price, start or end a sale, hide a book.</p>
        </div>
        <div className="panel-card soon">
          <span className="tag">On the way</span>
          <h2>Leads</h2>
          <p>Every free-sample signup and contact note, in one list.</p>
        </div>
      </div>
    </>
  );
}
