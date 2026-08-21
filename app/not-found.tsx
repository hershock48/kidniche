export default function NotFound() {
  return (
    <div className="wrap-narrow" style={{ padding: "80px 0", textAlign: "center" }}>
      <span className="kicker">Page not found</span>
      <h1>This page wandered off.</h1>
      <p className="lede" style={{ margin: "14px auto 0" }}>
        The bookshelf is still right where it was.
      </p>
      <p style={{ marginTop: 22 }}>
        <a className="btn primary" href="/">Back to the front page</a>{" "}
        <a className="btn ghost" href="/shop">Open the shop</a>
      </p>
    </div>
  );
}
