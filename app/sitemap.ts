import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { getAllGuides } from "@/lib/guides";
import { SITE_URL } from "@/lib/seo";

/**
 * Every page and post, for search engines and AI crawlers. Built from the same
 * content the pages render from, so a new post is in the sitemap the moment
 * it is committed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "", "/about", "/services", "/services/consulting", "/services/projects", "/services/speaking", "/case-studies", "/articles", "/guides", "/blog", "/booking",
    ...getAllGuides().map((g) => `/guides/${g.slug}`)
  ].map((route) => ({ url: `${SITE_URL}${route}` }));

  const posts = getAllArticles().map((p) => ({
    url: `${SITE_URL}/articles/${p.slug}`,
    ...(p.date ? { lastModified: p.date } : {}),
  }));

  return [...pages, ...posts];
}
