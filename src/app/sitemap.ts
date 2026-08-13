import type { MetadataRoute } from "next";

const BASE_URL = "https://modlyai.tech";

const marketingRoutes = [
  "/",
  "/pricing",
  "/faq",
  "/how-it-works",
  "/demo",
  "/contact",
  "/request-pilot",
  "/shop",
  "/customizer",
  "/terms",
  "/privacy",
  "/refund",
];

const appSurfaceRoutes = ["/catalog", "/room-planner", "/configurator"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...marketingRoutes, ...appSurfaceRoutes].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));
}
