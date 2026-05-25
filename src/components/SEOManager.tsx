import React, { useEffect } from "react";
import { useApp } from "../context/AppContext";

export const SEOManager: React.FC = () => {
  const { view, selectedMovieId, allMovies, searchQuery, activeCategory, filters } = useApp();

  useEffect(() => {
    // 1. Identify active movie for metadata if detail/download view is open
    const activeMovie = (view === "detail" || view === "download") && selectedMovieId
      ? allMovies.find(m => m.id === selectedMovieId || m.slug === selectedMovieId)
      : null;

    // 2. Determine SEO attributes based on page context
    let title = "Cinemood - HD Movie Downloads | Bengali Movies, Dual Audio & Web Series";
    let description = "Cinemood is a premium dynamic movie indexing and metadata platform. Enjoy high-speed Gofile direct downloads and online streams for latest Bengali movies, web series, custom dual audio tracks, and kids anime.";
    let keywords = "HD movie downloads, Bengali movies, Web series, Dual audio movies, Watch online, Fast download movies, MLSBD, Cinemood, torrent, index archive, gofile links";
    let canonicalPath = "/";
    let ogType = "website";
    let ogImage = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1200&h=630"; // Cinematic fall-back
    let schemaMarkup: any = null;

    const siteBase = "https://cinemood.site";

    if (view === "home") {
      title = "Cinemood - HD Movie Downloads | Bengali Movies, Dual Audio & Web Series";
      description = "Cinemood is a premium movie indexing and archive catalog. Superfast direct Gofile downloads, Bangla dubbed series, anime sagas, and dual-audio blockbusters instantly. No redirects or intrusive popups.";
      canonicalPath = "/";
      ogImage = activeMovie?.poster || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1200&h=630";

      // Multi-schema for premium corporate/sitelink search and organizational integrity
      schemaMarkup = [
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Cinemood",
          "url": `${siteBase}/`,
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${siteBase}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Cinemood Media",
          "url": `${siteBase}/`,
          "logo": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=300&h=300",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "abuse reporting",
            "email": "cinemood.site@gmail.com"
          }
        }
      ];
    } else if (view === "bookmarks") {
      title = "My Watchlist - Cinemood Premium Platform";
      description = "Manage and trace your watch later movies, anime blockbusters, and high stakes thrillers on your personal list.";
      canonicalPath = "/bookmarks";
    } else if (view === "search") {
      if (activeCategory) {
        canonicalPath = `/category/${activeCategory}`;
        const cleanCat = activeCategory.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        
        // Premium professional customized listings similar to MLSBD matching MLSBD style
        if (activeCategory === "bengali-movies") {
          title = "Bengali Movies & Season Pack Archives Free Download – Cinemood";
          description = "Download latest Bengali movies, Kolkata blockbuster releases, and Zee5 original web series with Gofile, Terabox, and Google Drive links in 720p & 1080p BluRay.";
          keywords = "Bengali movies download, Bangla movie index, Kolkata films torrent, Bengoli serial packs, Zee5 original download";
        } else if (activeCategory === "web-series") {
          title = "Watch Online Web Series & Complete Seasons Free Download – Cinemood";
          description = "All latest web series from Netflix, Amazon Prime, Hotstar, and Zee5 dubbed in Bangla with high speed direct servers and Telegram links.";
          keywords = "web series download, dual audio series, netflix series zip index, complete seasons 1080p, Bengali dub series";
        } else if (activeCategory === "anime") {
          title = "Anime Sagas & Animated Films Bangla Subbed/Double – Cinemood";
          description = "Browse high speed direct Gofile links for your favorite Japanese Anime series and films with custom Bangla subtitles or dubbed audios.";
        } else if (activeCategory === "dual-audio") {
          title = "Dual Audio [English-Hindi-Bangla] Movie Archives – Cinemood";
          description = "Browse Hollywood, Bollywood, and South Indian cinema encodes dubbed in English, Hindi, and Bangla with absolute clarity.";
        } else if (activeCategory === "bangla-dubbed") {
          title = "Bangla Dubbed Blockbusters & South Series Index – Cinemood";
          description = "Fast direct storage mirrors for international action movies, South Indian blockbusters, and series dubbed natively in Bangla.";
        } else {
          title = `${cleanCat} Movie Archives & Direct Downloads – Cinemood`;
          description = `Free high speed downloads and stream references for ${cleanCat} files. Complete catalog of high quality 4K and 1080p prints.`;
        }

        // Schema for categories
        schemaMarkup = [
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `${siteBase}/`
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Categories",
                "item": `${siteBase}/search`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": cleanCat,
                "item": `${siteBase}/category/${activeCategory}`
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": title,
            "description": description,
            "url": `${siteBase}/category/${activeCategory}`
          }
        ];
      } else if (searchQuery) {
        title = `Search Results for "${searchQuery}" – Cinemood Catalog`;
        description = `Find and query direct download links for "${searchQuery}". Check rating, print quality, and release metadata on Cinemood.`;
        canonicalPath = `/search?q=${encodeURIComponent(searchQuery)}`;
      } else if (filters.genre && filters.genre !== "All") {
        const slug = filters.genre.toLowerCase();
        title = `${filters.genre} Genre Archive – Cinemood Movie Download Platform`;
        description = `Explore high-speed direct links, Gofile indices, and dual audio prints for ${filters.genre} movies on Cinemood.`;
        canonicalPath = `/category/${slug}`;
      } else {
        title = "Explore Global Movie Database & Archives – Cinemood";
        description = "Advanced multi-criteria search matrix for high-speed download movies, 4K encodes, multi-lingual audio tracks, and custom filters.";
        canonicalPath = "/search";
      }
    } else if (view === "detail" && activeMovie) {
      const releaseYear = activeMovie.year || 2025;
      const displayTitle = activeMovie.title;
      // MLSBD-style print-ready SEO optimized heading meta tag title
      const seoLongTitle = activeMovie.fullTitle || `${displayTitle} (${releaseYear}) [${activeMovie.quality}] ${activeMovie.language} Download & Watch Online`;
      title = `${displayTitle} (${releaseYear}) – Download & Watch Online | Cinemood`;
      description = `${seoLongTitle} - Free direct high-speed download mirrors on Gofile, Telegram portal, and high-quality web player streams. Storyline: ${activeMovie.storyline.slice(0, 160)}...`;
      keywords = `${displayTitle} movie download, ${displayTitle} (${releaseYear}) download, download ${displayTitle} dual audio, watch ${displayTitle} online free, Gofile index of ${displayTitle}`;
      canonicalPath = `/movie/${activeMovie.id}`;
      ogType = "video.movie";
      ogImage = activeMovie.backdrop || activeMovie.poster;

      schemaMarkup = [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": `${siteBase}/`
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Movies",
              "item": `${siteBase}/search`
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": displayTitle,
              "item": `${siteBase}/movie/${activeMovie.id}`
            }
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "Movie",
          "name": displayTitle,
          "image": activeMovie.poster,
          "description": activeMovie.storyline,
          "dateCreated": releaseYear.toString(),
          "genre": activeMovie.genres,
          "duration": activeMovie.duration,
          "releasedEvent": {
            "@type": "PublicationEvent",
            "startDate": releaseYear.toString()
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": activeMovie.imdbRating.toString(),
            "bestRating": "10",
            "worstRating": "1",
            "ratingCount": "184"
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": seoLongTitle,
          "description": activeMovie.storyline,
          "thumbnailUrl": activeMovie.poster,
          "uploadDate": "2026-05-21T07:11:00Z",
          "embedUrl": `https://www.youtube.com/embed/${activeMovie.trailerUrl || "ARL_JNv7xT0"}`
        }
      ];
    } else if (view === "download" && activeMovie) {
      const releaseYear = activeMovie.year || 2025;
      const displayTitle = activeMovie.title;
      title = `Download ${displayTitle} (${releaseYear}) HD Direct Links – Cinemood`;
      description = `Superfast premium download links for ${displayTitle} (${releaseYear}). Direct 4K UHD, 1080p BluRay, and 720p dual-audio storage mirrors on Gofile, Mega, and Telegram node. Zero premium account required.`;
      keywords = `download ${displayTitle}, gofile speed link ${displayTitle}, ${displayTitle} bangla dubbed torrent, terabox link ${displayTitle}`;
      canonicalPath = `/download/${activeMovie.id}`;
      ogType = "video.movie";
      ogImage = activeMovie.poster;

      schemaMarkup = [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": `${siteBase}/`
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": displayTitle,
              "item": `${siteBase}/movie/${activeMovie.id}`
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Download Links",
              "item": `${siteBase}/download/${activeMovie.id}`
            }
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": `${displayTitle} (${releaseYear}) Movie Download Source`,
          "operatingSystem": "All",
          "applicationCategory": "MultimediaApplication",
          "fileSize": activeMovie.size || "1.5 GB",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }
      ];
    } else if (view === "about") {
      title = "About Cinemood - Premium Movie Indexing System";
      description = "Learn more about Cinemood, our core index curation philosophy, safe Gofile link standards, and dual-audio streaming referencing catalogs.";
      keywords = "about cinemood, curated movie downloads, premium stream index, platform goals";
      canonicalPath = "/about";
    } else if (view === "privacy") {
      title = "Privacy Policy & Cookie Consent - Cinemood";
      description = "View our comprehensive privacy policy regarding cookie usage, local client caching, Popunder ad frequencies, and Google Analytics 4 tracking protocols.";
      keywords = "privacy policy cinemood, cookie consent, adsterra popunder tracking, user privacy guidelines";
      canonicalPath = "/privacy";
    } else if (view === "contact") {
      title = "Contact Support & Community - Cinemood";
      description = "Connect with the Cinemood Central team instantly. Join our verified Telegram Channel, contact our support admin, or submit link abuse notifications.";
      keywords = "contact cinemood support, telegram community, submit review request, report offline links";
      canonicalPath = "/contact";
    } else if (view === "disclaimer") {
      title = "Disclaimer & DMCA Copyright Takedown - Cinemood";
      description = "Read our official legal terms and DMCA compliance guidelines. Cinemood does not host any movie files or media files onto local storage setups.";
      keywords = "disclaimer cinemood, dmca takedown guidelines, copyright report, non hosting policy";
      canonicalPath = "/disclaimer";
    }

    // 3. Update Standard HTML Head Tags
    document.title = title;

    const updateOrCreateMeta = (nameAttr: string, value: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${nameAttr}"]` : `meta[name="${nameAttr}"]`;
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        if (isProperty) {
          el.setAttribute("property", nameAttr);
        } else {
          el.setAttribute("name", nameAttr);
        }
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    updateOrCreateMeta("description", description);
    updateOrCreateMeta("keywords", keywords);

    // Dynamic Canonical URL Link
    let canonicalLink = document.head.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", `${siteBase}${canonicalPath}`);

    // Open Graph Tags
    updateOrCreateMeta("og:title", title, true);
    updateOrCreateMeta("og:description", description, true);
    updateOrCreateMeta("og:image", ogImage, true);
    updateOrCreateMeta("og:url", `${siteBase}${canonicalPath}`, true);
    updateOrCreateMeta("og:site_name", "Cinemood", true);
    updateOrCreateMeta("og:type", ogType, true);

    // Twitter Card Tags
    updateOrCreateMeta("twitter:card", "summary_large_image");
    updateOrCreateMeta("twitter:title", title);
    updateOrCreateMeta("twitter:description", description);
    updateOrCreateMeta("twitter:image", ogImage);

    // 4. Inject Dynamic JSON-LD structured schemas
    let jsonldScript = document.getElementById("jsonld-seo-schema") as HTMLScriptElement;
    if (schemaMarkup) {
      if (!jsonldScript) {
        jsonldScript = document.createElement("script");
        jsonldScript.id = "jsonld-seo-schema";
        jsonldScript.type = "application/ld+json";
        document.head.appendChild(jsonldScript);
      }
      jsonldScript.textContent = JSON.stringify(schemaMarkup, null, 2);
    } else {
      if (jsonldScript) {
        jsonldScript.remove();
      }
    }
  }, [view, selectedMovieId, allMovies, searchQuery, activeCategory, filters]);

  return null; // Side-effect node only style
};
