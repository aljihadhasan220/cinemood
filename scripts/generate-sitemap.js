import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname in ES module style
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const siteBase = "https://cinemood.site";
const currentDate = new Date().toISOString().split("T")[0];

// Paths
const moviesFilePath = path.join(__dirname, "../src/data/movies.json");
const sitemapOutputPath = path.join(__dirname, "../public/sitemap.xml");

try {
  console.log("Generating sitemap.xml dynamically...");

  // Read movie database
  const rawData = fs.readFileSync(moviesFilePath, "utf-8");
  const movies = JSON.parse(rawData);

  // Core pages
  const corePages = [
    { loc: `${siteBase}/`, changefreq: "daily", priority: "1.0" },
    { loc: `${siteBase}/search`, changefreq: "weekly", priority: "0.8" },
    { loc: `${siteBase}/bookmarks`, changefreq: "weekly", priority: "0.3" }
  ];

  // Categories
  const categories = [
    "bengali-movies",
    "web-series",
    "anime",
    "dual-audio",
    "bangla-dubbed",
    "trending-movies",
    "latest-uploads",
    "hollywood-movies",
    "south-indian-movies",
    "malayalam-movies",
    "korean-drama",
    "hindi-series",
    "hindi-movies",
    "hindi"
  ];

  const categoryPages = categories.map(cat => ({
    loc: `${siteBase}/category/${cat}`,
    changefreq: "daily",
    priority: "0.9"
  }));

  // Movie pages & Download indexes
  const moviePages = [];
  const downloadPages = [];

  for (const movie of movies) {
    const slug = movie.slug || movie.id;
    if (!slug) continue;

    moviePages.push({
      loc: `${siteBase}/movie/${slug}`,
      changefreq: "weekly",
      priority: "0.85"
    });

    downloadPages.push({
      loc: `${siteBase}/download/${slug}`,
      changefreq: "weekly",
      priority: "0.7"
    });
  }

  // Create XML content
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Helper to add url node
  const addUrl = (page) => {
    return `  <url>\n    <loc>${page.loc}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>\n`;
  };

  xml += `  <!-- Core Layout Routes -->\n`;
  for (const page of corePages) {
    xml += addUrl(page);
  }

  xml += `\n  <!-- Categorical Index Targets -->\n`;
  for (const page of categoryPages) {
    xml += addUrl(page);
  }

  xml += `\n  <!-- Movie Detail Pages (Crawlable) -->\n`;
  for (const page of moviePages) {
    xml += addUrl(page);
  }

  xml += `\n  <!-- Movie Download Mirror Indexes -->\n`;
  for (const page of downloadPages) {
    xml += addUrl(page);
  }

  xml += `</urlset>\n`;

  // Write to public/sitemap.xml
  fs.writeFileSync(sitemapOutputPath, xml, "utf-8");
  console.log(`Successfully generated sitemap.xml with ${movies.length} movies!`);
} catch (error) {
  console.error("Failed to generate sitemap.xml dynamically:", error);
  process.exit(1);
}
