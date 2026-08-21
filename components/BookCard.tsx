import { dollars, type Product } from "@/lib/site";

export default function BookCard({ p }: { p: Product }) {
  return (
    <article className="book-card">
      <a className="cover" href={`/shop/${p.slug}`} tabIndex={-1} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.img} alt="" loading="lazy" />
      </a>
      <div className="body">
        <h3>
          <a href={`/shop/${p.slug}`}>{p.name}</a>
        </h3>
        <div className="meta">
          {p.ages} · {p.digital ? "Digital download" : "Printed"}
        </div>
        <p className="blurb">{p.blurb}</p>
        <PriceLine p={p} />
      </div>
    </article>
  );
}

export function PriceLine({ p }: { p: Product }) {
  return (
    <div className="price-line">
      <span className={p.price === 0 ? "now free" : "now"}>{dollars(p.price)}</span>
      {p.was !== null && (
        <>
          <del aria-label={`was ${dollars(p.was)}`}>{dollars(p.was)}</del>
          <span className="sale-note">{p.price === 0 ? "free right now" : "on sale"}</span>
        </>
      )}
    </div>
  );
}
