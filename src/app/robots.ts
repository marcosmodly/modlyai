import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/api/", "/auth/", "/images/founder-king-joshua-marcos.jpg"],
    },
    sitemap: "https://modlyai.tech/sitemap.xml",
  };
}
