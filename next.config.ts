import type { NextConfig } from "next";

/**
 * Host split, per glaze/proposal.md.
 *
 * kidniche.glazedweb.com serves the PROPOSAL at its root and this site at
 * /demo. The client's real domain (kidniche.com), once it points here, serves
 * the site at its root and the proposal nowhere.
 *
 * The rewrites MUST be in beforeFiles: a plain rewrites() array is afterFiles,
 * which only runs after Next has failed to find a page, and app/page.tsx
 * already answers "/", so the root rewrite would silently never fire.
 */
const onPitchHost = [{ type: "host" as const, value: "kidniche.glazedweb.com" }];

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/pitch/kidniche/index.html", has: onPitchHost },
        { source: "/demo", destination: "/", has: onPitchHost },
        { source: "/demo/:path*", destination: "/:path*", has: onPitchHost },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [
      // Every path on the pitch host is noindex. The .vercel.app host is the
      // same duplicate-content risk; VERCEL_ENV covers previews, and the
      // pitch host is matched explicitly.
      {
        source: "/:path*",
        has: [{ type: "host", value: "kidniche.glazedweb.com" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "kidniche.vercel.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
