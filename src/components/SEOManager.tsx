import React, { useEffect } from "react";
import { useApp } from "../context/AppContext";

export const SEOManager: React.FC = () => {
  const { view, selectedMovieId, allMovies, searchQuery, activeCategory, filters } = useApp();

  useEffect(() => {
    // 1. Identify active movie or series for metadata if detail/download view is open
    const activeMovie = (view === "detail" || view === "download") && selectedMovieId
      ? allMovies.find(m => m.id === selectedMovieId || m.slug === selectedMovieId)
      : null;

    // 2. Base configuration parameters
    const siteBase = "https://cinemood.site";
    let title = "Cinemood - Download & Watch Latest Movies, Series & Anime in HD";
    let description = "Cinemood is a premium dynamic movie indexing and metadata platform. Enjoy high-speed Gofile direct downloads and online streams for latest Bengali movies, web series, custom dual audio tracks, and kids anime.";
    let keywords = "HD movie downloads, Bengali movies, Web series, Dual audio movies, Watch online, Fast download movies, MLSBD, Cinemood, torrent, index archive, gofile links";
    let canonicalPath = "/";
    let ogType = "website";
    let ogImage = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1200&h=630"; // Aesthetic fallback
    let robotsValue = "index, follow";
    let schemaMarkup: any[] = [];

    // Helper to sanitize title strings for description inclusion
    const cleanStr = (str: string) => str ? str.replace(/"/g, "&quot;") : "";

    // 3. Process views for exact context-specific SEO optimization
    if (view === "home") {
      title = "Cinemood - Download & Watch Latest Movies, Series & Anime in HD";
      description = "Cinemood is a premium movie indexing and archive catalog. Superfast direct Gofile downloads, Bangla dubbed series, anime sagas, and dual-audio blockbusters instantly. No redirects or intrusive popups.";
      canonicalPath = "/";
      ogImage = allMovies[0]?.poster || ogImage;

      // Create home page ItemList of latest 10 uploads
      const homepageList = allMovies.slice(0, 10).map((m, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `${siteBase}/movie/${m.slug || m.id}`,
        "name": m.fullTitle || m.title
      }));

      schemaMarkup = [
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${siteBase}/#website`,
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
          "@id": `${siteBase}/#organization`,
          "name": "Cinemood Media",
          "url": `${siteBase}/`,
          "logo": {
            "@type": "ImageObject",
            "url": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=300&h=300",
            "width": "300",
            "height": "300"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "abuse reporting",
            "email": "cinemood.site@gmail.com"
          },
          "sameAs": [
            "https://t.me/cinemood_channel"
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Cinemood Latest Uploads",
          "numberOfItems": allMovies.length,
          "itemListElement": homepageList
        }
      ];
    } else if (view === "bookmarks") {
      title = "My Watchlist - Cinemood Premium Platform";
      description = "Manage and trace your watch later movies, anime blockbusters, and high stakes thrillers on your personal list.";
      canonicalPath = "/bookmarks";
      robotsValue = "noindex, nofollow"; // Bookmarks page is user-specific

      schemaMarkup = [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "@id": `${siteBase}/bookmarks#breadcrumb`,
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
              "name": "My Watchlist",
              "item": `${siteBase}/bookmarks`
            }
          ]
        }
      ];
    } else if (view === "search") {
      if (activeCategory) {
        canonicalPath = `/category/${activeCategory}`;
        const cleanCat = activeCategory.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        
        // Category optimized copy
        if (activeCategory === "bengali-movies") {
          title = "Bengali Movies & Season Pack Archives Free Download – Cinemood";
          description = "Download latest Bengali movies, Kolkata blockbuster releases, and Zee5 original web series with Gofile, Terabox, and Google Drive links in 720p & 1080p BluRay.";
          keywords = "Bengali movies download, Bangla movie index, Kolkata films torrent, Bengoli serial packs, Zee5 original download";
        } else if (activeCategory === "bengali-series" || activeCategory === "bengali-dubbed-series") {
          title = "Bengali Dubbed Web Series & Seasons Free Download – Cinemood";
          description = "Download Bengali dubbed web series, hoichoi releases, complete season packs, and regional dubbed drama shows with fast Gofile and Telegram direct mirrors.";
          keywords = "Bengali dubbed series download, Bangla dubbed series index, Hoichoi serials download, Bengali serial packs, Cinemood Bengali Series";
        } else if (activeCategory === "web-series") {
          title = "Watch Online Web Series & Complete Seasons Free Download – Cinemood";
          description = "All latest web series from Netflix, Amazon Prime, Hotstar, and Zee5 dubbed in Bangla with high speed direct servers and Telegram links.";
          keywords = "web series download, dual audio series, netflix series zip index, complete seasons 1080p, Bengali dub series";
        } else if (activeCategory === "anime") {
          title = "Anime Sagas & Animated Films Bangla Subbed/Double – Cinemood";
          description = "Browse high speed direct Gofile links for your favorite Japanese Anime series and films with custom Bangla subtitles or dubbed audios.";
          keywords = "anime bangla dubbed, download anime subbed, anime zip download, doremon series, classroom of the elite free download";
        } else if (activeCategory === "dual-audio") {
          title = "Dual Audio [English-Hindi-Bangla] Movie Archives – Cinemood";
          description = "Browse Hollywood, Bollywood, and South Indian cinema encodes dubbed in English, Hindi, and Bangla with absolute clarity.";
          keywords = "dual audio movies download, English Hindi dual audio, direct link dual audio 1080p, Hollywood in Hindi download";
        } else if (activeCategory === "bangla-dubbed") {
          title = "Bangla Dubbed Blockbusters & South Series Index – Cinemood";
          description = "Fast direct storage mirrors for international action movies, South Indian blockbusters, and series dubbed natively in Bangla.";
          keywords = "Bangla dubbed movies, South movie Bangla dubbed, free direct download Bengali audio movies";
        } else if (activeCategory === "malayalam-movies" || activeCategory === "malayalam") {
          title = "Malayalam Movies HD Free Direct Download – Cinemood";
          description = "Download Malayalam thrillers and dramatic blockbusters with superfast direct links in 480p, 720p, and 1080p high quality encodes.";
          keywords = "Malayalam movies download, Malayalam cinema Gofile, Drishyam download, Malayalam thrillers Free download";
        } else if (activeCategory === "korean-drama" || activeCategory === "korean") {
          title = "Korean Drama Series Dual Audio Free Download – Cinemood";
          description = "Download Korean romance and thrilling drama shows in Hindi Dual Audio with superfast direct storage links. Premium quality HEVC encodes.";
          keywords = "Korean drama series download, K-Drama Hindi dubbed, Absolute Value of Romance download, Gofile K-Drama Hindi";
        } else if (activeCategory === "hindi-series") {
          title = "Hindi Web Series & Seasons Free Download – Cinemood";
          description = "Download Hindi original web series, complete season packages, and dual audio thriller shows with superfast Gofile and GDrive links.";
          keywords = "Hindi web series download, Hindi season pack, Hollywood drama series in Hindi, Gofile Hindi Series";
        } else if (activeCategory === "hindi-movies" || activeCategory === "hindi") {
          title = "Hindi Movies Free Download & Direct Mirror Links – Cinemood";
          description = "Download latest Hindi films, action Bollywood movies, and multi-resolution encodes with superfast direct Gofile and Google Drive mirrors.";
          keywords = "Hindi movies download, Bollywood movies Gofile, free Hindi films download, direct download Hindi movies, Cinemood Hindi Movies";
        } else if (activeCategory === "telugu-movies" || activeCategory === "telugu") {
          title = "Telugu Movies Free Download & High Speed Direct Links – Cinemood";
          description = "Download latest Telugu blockbusters, Tollywood romance and action movies with superfast direct Gofile and Google Drive servers.";
          keywords = "Telugu movies download, Tollywood cinema Gofile, free Telugu films download, direct download Telugu movies, Cinemood Telugu Movies";
        } else if (activeCategory === "tamil-movies" || activeCategory === "tamil") {
          title = "Tamil Movies Free Download & High Speed Direct Links – Cinemood";
          description = "Download latest Tamil blockbusters, Kollywood romance and action movies with superfast direct Gofile and Google Drive servers.";
          keywords = "Tamil movies download, Kollywood cinema Gofile, free Tamil films download, direct download Tamil movies, Cinemood Tamil Movies";
        } else {
          title = `${cleanCat} Movie Archives & Direct Downloads – Cinemood`;
          description = `Free high speed downloads and stream references for ${cleanCat} files. Complete catalog of high quality 4K and 1080p prints.`;
        }

        // Dynamically extract category movies for the list element
        const catMovies = allMovies.filter(m => {
          const lCat = activeCategory.toLowerCase();
          if (lCat === "bengali-movies") return m.categories.includes("bengali-movies") || m.categories.includes("bangla-dubbed");
          if (lCat === "bengali-series" || lCat === "bengali-dubbed-series") return m.categories.includes("bengali-series") || m.categories.includes("bengali-dubbed-series");
          if (lCat === "web-series") return m.categories.includes("web-series");
          if (lCat === "anime") return m.categories.includes("anime");
          if (lCat === "dual-audio") return m.categories.includes("dual-audio");
          if (lCat === "bangla-dubbed") return m.categories.includes("bangla-dubbed");
          if (lCat === "malayalam-movies" || lCat === "malayalam") return m.language.toLowerCase().includes("malayalam") || m.categories.includes("malayalam-movies");
          if (lCat === "korean-drama" || lCat === "korean") return m.language.toLowerCase().includes("korean") || m.categories.includes("korean-drama");
          if (lCat === "hindi-movies" || lCat === "hindi") return m.language.toLowerCase().includes("hindi") || m.categories.includes("hindi-movies");
          if (lCat === "telugu-movies" || lCat === "telugu") return m.language.toLowerCase().includes("telugu") || m.categories.includes("telugu-movies");
          if (lCat === "tamil-movies" || lCat === "tamil") return m.language.toLowerCase().includes("tamil") || m.categories.includes("tamil-movies");
          return m.categories.includes(activeCategory);
        });

        const itemListElement = catMovies.slice(0, 10).map((m, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "url": `${siteBase}/movie/${m.slug || m.id}`,
          "name": m.title
        }));

        schemaMarkup = [
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "@id": `${siteBase}/category/${activeCategory}#breadcrumb`,
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
            "@id": `${siteBase}/category/${activeCategory}#collection`,
            "name": title,
            "description": description,
            "url": `${siteBase}/category/${activeCategory}`
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": `${cleanCat} Movies Listing`,
            "numberOfItems": catMovies.length,
            "itemListElement": itemListElement
          }
        ];
      } else if (searchQuery) {
        title = `Search Results for "${searchQuery}" – Cinemood Catalog`;
        description = `Find and query direct download links for "${searchQuery}". Check rating, print quality, and release metadata on Cinemood.`;
        canonicalPath = `/search?q=${encodeURIComponent(searchQuery)}`;
        robotsValue = "noindex, nofollow"; // Search result pages should not be crawled to save index budget
      } else if (filters.genre && filters.genre !== "All") {
        const slug = filters.genre.toLowerCase();
        title = `${filters.genre} Genre Archive – Cinemood Movie Download Platform`;
        description = `Explore high-speed direct links, Gofile indices, and dual audio prints for ${filters.genre} movies on Cinemood.`;
        canonicalPath = `/category/${slug}`;
      } else {
        title = "Explore Global Movie Database & Archives – Cinemood";
        description = "Advanced multi-criteria search matrix for high-speed download movies, 4K encodes, multi-lingual audio tracks, and custom filters.";
        canonicalPath = "/search";
        robotsValue = "noindex, nofollow"; // General search page is not indexed
      }
    } else if (view === "detail" && activeMovie) {
      const releaseYear = activeMovie.year || 2025;
      const displayTitle = activeMovie.title;
      const seoLongTitle = activeMovie.fullTitle || `${displayTitle} (${releaseYear}) [${activeMovie.quality}] ${activeMovie.language} Download & Watch Online`;
      title = `${displayTitle} (${releaseYear}) – Download & Watch Online | Cinemood`;
      description = `${seoLongTitle} - Free direct high-speed download mirrors on Gofile, Telegram portal, and high-quality web player streams. Storyline: ${cleanStr(activeMovie.storyline || "").slice(0, 160)}...`;
      keywords = `${displayTitle} movie download, ${displayTitle} (${releaseYear}) download, download ${displayTitle} dual audio, watch ${displayTitle} online free, Gofile index of ${displayTitle}`;
      canonicalPath = `/movie/${activeMovie.slug || activeMovie.id}`;
      ogType = "video.movie";
      ogImage = activeMovie.backdrop || activeMovie.poster;

      const isSeries = activeMovie.categories.includes("web-series") ||
                       activeMovie.categories.includes("bengali-series") ||
                       activeMovie.categories.includes("bengali-dubbed-series") ||
                       activeMovie.categories.includes("hindi-series");

      const itemType = isSeries ? "TVSeries" : "Movie";

      schemaMarkup = [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "@id": `${siteBase}/movie/${activeMovie.slug || activeMovie.id}#breadcrumb`,
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
              "item": `${siteBase}/movie/${activeMovie.slug || activeMovie.id}`
            }
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": itemType,
          "@id": `${siteBase}/movie/${activeMovie.slug || activeMovie.id}#mediaitem`,
          "name": displayTitle,
          "image": activeMovie.poster,
          "description": activeMovie.storyline || activeMovie.description,
          "dateCreated": releaseYear.toString(),
          "genre": activeMovie.genres,
          "duration": activeMovie.duration || "2h 00m",
          "releasedEvent": {
            "@type": "PublicationEvent",
            "startDate": releaseYear.toString()
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": activeMovie.imdbRating ? activeMovie.imdbRating.toString() : "7.5",
            "bestRating": "10",
            "worstRating": "1",
            "ratingCount": "320"
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "@id": `${siteBase}/movie/${activeMovie.slug || activeMovie.id}#video`,
          "name": seoLongTitle,
          "description": activeMovie.storyline || activeMovie.description,
          "thumbnailUrl": activeMovie.poster,
          "uploadDate": "2026-05-21T07:11:00Z",
          "embedUrl": `https://www.youtube.com/embed/${activeMovie.trailerUrl || "ARL_JNv7xT0"}`
        },
        {
          "@context": "https://schema.org",
          "@type": "ImageObject",
          "@id": `${siteBase}/movie/${activeMovie.slug || activeMovie.id}#poster`,
          "contentUrl": activeMovie.poster,
          "name": `${displayTitle} Poster`,
          "description": `Official promotional poster for ${displayTitle} listed on Cinemood.`
        },
        ...(activeMovie.screenshots || []).map((ss, idx) => ({
          "@context": "https://schema.org",
          "@type": "ImageObject",
          "@id": `${siteBase}/movie/${activeMovie.slug || activeMovie.id}#screenshot-${idx}`,
          "contentUrl": ss,
          "name": `${displayTitle} Screenshot ${idx + 1}`,
          "description": `High-quality dynamic scene capture from ${displayTitle} on Cinemood.`
        }))
      ];
    } else if (view === "download" && activeMovie) {
      const releaseYear = activeMovie.year || 2025;
      const displayTitle = activeMovie.title;
      title = `Download ${displayTitle} (${releaseYear}) HD Direct Links – Cinemood`;
      description = `Superfast premium download links for ${displayTitle} (${releaseYear}). Direct 1080p, 720p, and 480p dual-audio storage mirrors on Gofile, and Telegram node. Zero premium account required.`;
      keywords = `download ${displayTitle}, gofile speed link ${displayTitle}, ${displayTitle} bangla dubbed torrent`;
      canonicalPath = `/download/${activeMovie.slug || activeMovie.id}`;
      robotsValue = "noindex, nofollow"; // Download redirect / wait pages must NOT be indexed
      ogType = "video.movie";
      ogImage = activeMovie.poster;

      schemaMarkup = [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "@id": `${siteBase}/download/${activeMovie.slug || activeMovie.id}#breadcrumb`,
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
              "item": `${siteBase}/movie/${activeMovie.slug || activeMovie.id}`
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Download Links",
              "item": `${siteBase}/download/${activeMovie.slug || activeMovie.id}`
            }
          ]
        }
      ];
    } else if (view === "about") {
      title = "About Cinemood - Premium Movie Indexing System";
      description = "Learn more about Cinemood, our core index curation philosophy, safe Gofile link standards, and dual-audio streaming referencing catalogs.";
      canonicalPath = "/about";

      schemaMarkup = [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "@id": `${siteBase}/about#breadcrumb`,
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
              "name": "About Us",
              "item": `${siteBase}/about`
            }
          ]
        }
      ];
    } else if (view === "privacy") {
      title = "Privacy Policy & Cookie Consent - Cinemood";
      description = "View our comprehensive privacy policy regarding cookie usage, local client caching, Popunder ad frequencies, and Google Analytics 4 tracking protocols.";
      canonicalPath = "/privacy";

      schemaMarkup = [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "@id": `${siteBase}/privacy#breadcrumb`,
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
              "name": "Privacy Policy",
              "item": `${siteBase}/privacy`
            }
          ]
        }
      ];
    } else if (view === "contact") {
      title = "Contact Support & Community - Cinemood";
      description = "Connect with the Cinemood Central team instantly. Join our verified Telegram Channel, contact our support admin, or submit link abuse notifications.";
      canonicalPath = "/contact";

      schemaMarkup = [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "@id": `${siteBase}/contact#breadcrumb`,
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
              "name": "Contact",
              "item": `${siteBase}/contact`
            }
          ]
        }
      ];
    } else if (view === "disclaimer") {
      title = "Disclaimer & DMCA Copyright Takedown - Cinemood";
      description = "Read our official legal terms and DMCA compliance guidelines. Cinemood does not host any movie files or media files onto local storage setups.";
      canonicalPath = "/disclaimer";

      schemaMarkup = [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "@id": `${siteBase}/disclaimer#breadcrumb`,
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
              "name": "Disclaimer",
              "item": `${siteBase}/disclaimer`
            }
          ]
        }
      ];
    }

    // 4. Update Standard Document Title
    document.title = title;

    // Helper to update or create a single meta tag inside document head, preventing duplicates
    const updateOrCreateMeta = (nameAttr: string, value: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${nameAttr}"]` : `meta[name="${nameAttr}"]`;
      const elements = Array.from(document.head.querySelectorAll(selector));
      
      // Clean up duplicates if any exist
      if (elements.length > 1) {
        for (let i = 1; i < elements.length; i++) {
          elements[i].remove();
        }
      }
      
      let el = elements[0];
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

    // Update indexability robots directives & descriptions
    updateOrCreateMeta("description", description);
    updateOrCreateMeta("keywords", keywords);
    updateOrCreateMeta("robots", robotsValue);

    // Update dynamic canonical link
    let canonicalLink = document.head.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", `${siteBase}${canonicalPath}`);

    // Update hreflang tags for crawlers
    const updateHreflangTags = (path: string) => {
      // Clean existing alternates first
      document.head.querySelectorAll("link[rel='alternate'][hreflang]").forEach(el => el.remove());
      
      const languages = [
        { code: "en", url: `${siteBase}${path}` },
        { code: "x-default", url: `${siteBase}${path}` }
      ];

      languages.forEach(lang => {
        const link = document.createElement("link");
        link.setAttribute("rel", "alternate");
        link.setAttribute("hreflang", lang.code);
        link.setAttribute("href", lang.url);
        document.head.appendChild(link);
      });
    };
    updateHreflangTags(canonicalPath);

    // Dynamic Open Graph Tags
    updateOrCreateMeta("og:title", title, true);
    updateOrCreateMeta("og:description", description, true);
    updateOrCreateMeta("og:image", ogImage, true);
    updateOrCreateMeta("og:url", `${siteBase}${canonicalPath}`, true);
    updateOrCreateMeta("og:site_name", "Cinemood", true);
    updateOrCreateMeta("og:type", ogType, true);

    // Dynamic Twitter Card Tags
    updateOrCreateMeta("twitter:card", "summary_large_image");
    updateOrCreateMeta("twitter:title", title);
    updateOrCreateMeta("twitter:description", description);
    updateOrCreateMeta("twitter:image", ogImage);

    // Inject dynamic WebPage parent schema alongside state schemas
    const webPageBase = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${siteBase}${canonicalPath}#webpage`,
      "url": `${siteBase}${canonicalPath}`,
      "name": title,
      "description": description,
      "breadcrumb": {
        "@id": `${siteBase}${canonicalPath}#breadcrumb`
      },
      "isPartOf": {
        "@id": `${siteBase}/#website`
      }
    };

    const finalSchemas = [webPageBase, ...schemaMarkup];

    // 5. Inject JSON-LD Script block
    let jsonldScript = document.getElementById("jsonld-seo-schema") as HTMLScriptElement;
    if (finalSchemas.length > 0) {
      if (!jsonldScript) {
        jsonldScript = document.createElement("script");
        jsonldScript.id = "jsonld-seo-schema";
        jsonldScript.type = "application/ld+json";
        document.head.appendChild(jsonldScript);
      }
      jsonldScript.textContent = JSON.stringify(finalSchemas, null, 2);
    } else {
      if (jsonldScript) {
        jsonldScript.remove();
      }
    }
  }, [view, selectedMovieId, allMovies, searchQuery, activeCategory, filters]);

  return null;
};
