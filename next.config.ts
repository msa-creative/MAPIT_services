import type { NextConfig } from "next";
import path from "node:path";

// Path to your custom loader
const LOADER = path.resolve(__dirname, "src/visual-edits/component-tagger-loader.js");

// Only enable Turbopack locally (not in production on Vercel)
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },

  // ❌ Removed outputFileTracingRoot since it was pointing too far up.
  //    If you're in a monorepo, point it explicitly to the repo root instead.
  // outputFileTracingRoot: path.resolve(__dirname, "../../"),

  ...(isProd
    ? {}
    : {
        turbopack: {
          rules: {
            "*.{jsx,tsx}": {
              loaders: [LOADER],
            },
          },
        },
      }),
};

export default nextConfig;
