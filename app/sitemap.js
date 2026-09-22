import regions from "@/content/regions.json";
import { SITE_URL } from "@/lib/site";

export default function sitemap() {
  const staticPaths = ["/", "/cardloan/all/", "/about/", "/privacy/", "/contact/"];
  const areaPaths = regions.map((region) => `/cardloan/${region.slug}/`);

  return [...staticPaths, ...areaPaths].map((path) => ({
    url: `${SITE_URL}${path}`,
  }));
}
