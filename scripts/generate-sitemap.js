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
    "hindi",
    "telugu-movies",
    "telugu",
    "tamil-movies",
    "tamil",
    "bengali-series",
    "bengali-dubbed-series"
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

  // Generate RSS Feed
  console.log("Generating RSS feeds (rss.xml and feed.xml) dynamically...");
  
  const escapeXml = (str) => {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  };

  const rssOutputPath = path.join(__dirname, "../public/rss.xml");
  const atomOutputPath = path.join(__dirname, "../public/feed.xml");
  const pubDate = new Date().toUTCString();

  let rss = `<?xml version="1.0" encoding="UTF-8" ?>\n`;
  rss += `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">\n`;
  rss += `<channel>\n`;
  rss += `  <title>Cinemood - Download &amp; Watch Latest Movies, Series &amp; Anime in HD</title>\n`;
  rss += `  <link>${siteBase}</link>\n`;
  rss += `  <description>Cinemood is a premium movie indexing and metadata platform. Direct Gofile download mirrors, Bangla dubbed series, anime sagas, and dual-audio blockbusters instantly.</description>\n`;
  rss += `  <language>en-us</language>\n`;
  rss += `  <lastBuildDate>${pubDate}</lastBuildDate>\n`;
  rss += `  <atom:link href="${siteBase}/rss.xml" rel="self" type="application/rss+xml" />\n\n`;

  // Use the 15 most recent movies for RSS feed
  const recentMovies = [...movies].reverse().slice(0, 15);

  for (const movie of recentMovies) {
    const slug = movie.slug || movie.id;
    const title = escapeXml(movie.fullTitle || `${movie.title} (${movie.year})`);
    const link = `${siteBase}/movie/${slug}`;
    const desc = escapeXml(movie.description || movie.storyline || "");
    const imgUrl = movie.poster || "";

    rss += `  <item>\n`;
    rss += `    <title>${title}</title>\n`;
    rss += `    <link>${link}</link>\n`;
    rss += `    <guid isPermaLink="true">${link}</guid>\n`;
    rss += `    <description>${desc}</description>\n`;
    rss += `    <pubDate>${pubDate}</pubDate>\n`;
    if (imgUrl) {
      rss += `    <media:content url="${imgUrl}" medium="image" type="image/jpeg" />\n`;
    }
    rss += `  </item>\n`;
  }

  rss += `</channel>\n`;
  rss += `</rss>\n`;

  fs.writeFileSync(rssOutputPath, rss, "utf-8");
  fs.writeFileSync(atomOutputPath, rss, "utf-8");
  console.log("Successfully generated RSS feeds.");
} catch (error) {
  console.error("Failed to generate sitemap.xml dynamically:", error);
  process.exit(1);
}
