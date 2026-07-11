import { Movie, Review } from "../types";

import moviesData from "../data/movies.json";

// Base movie dataset loaded and reversed so that the newest additions appear first
const MOVIES_DATABASE: Movie[] = [...(moviesData as any[])].reverse().map(item => {
  // Extract number IMDb rating from string like "7.5/10"
  const parsedImdb = item.imdb ? parseFloat(item.imdb.split("/")[0]) : 7.0;
  
  // Transform comma separated genre string to array
  const genresArray = item.genre ? item.genre.split(",").map((g: string) => g.trim()) : ["Drama"];
  
  // Base category allocation automatically determined based on properties for dynamic scalability
  const categoriesArray = ["latest"];
  if (item.categories && Array.isArray(item.categories)) {
    categoriesArray.push(...item.categories.filter((cat: string) => cat !== "trending"));
  }

  // Dynamic trending mapping
  if (parsedImdb >= 7.5 && parsedImdb <= 10.0) {
    if (!categoriesArray.includes("trending")) categoriesArray.push("trending");
    if (!categoriesArray.includes("recommended")) categoriesArray.push("recommended");
  }

  const titleLower = item.title.toLowerCase();
  const descLower = (item.description || "").toLowerCase();
  const langLower = (item.language || "").toLowerCase();

  // Bangla Dubbed cinema classification
  if (
    langLower.includes("bangla") || 
    langLower.includes("bengali") || 
    titleLower.includes("bangla") || 
    descLower.includes("bangla dubbed") || 
    descLower.includes("bengali dubbed")
  ) {
    if (!categoriesArray.includes("bangla-dubbed")) {
      categoriesArray.push("bangla-dubbed");
    }
  }

  // Dual audio tracks classification
  if (
    langLower.includes("dual") || 
    titleLower.includes("dual") || 
    descLower.includes("dual audio")
  ) {
    if (!categoriesArray.includes("dual-audio")) {
      categoriesArray.push("dual-audio");
    }
  }

  // Anime classification
  if (
    genresArray.map(g => g.toLowerCase()).includes("anime") || 
    titleLower.includes("anime") || 
    descLower.includes("anime")
  ) {
    if (!categoriesArray.includes("anime")) {
      categoriesArray.push("anime");
    }
  }

  // Web series check
  const isSeries = 
    (item.runtime && item.runtime.toLowerCase().includes("episode")) || 
    (item.size && item.size.toLowerCase().includes("pack")) || 
    descLower.includes("series") || 
    descLower.includes("season") || 
    item.id === "stranger-currents-2025";
  if (isSeries) {
    if (!categoriesArray.includes("web-series")) categoriesArray.push("web-series");
    if (!categoriesArray.includes("netflix-series")) categoriesArray.push("netflix-series");
  }

  // Korean Drama classification
  if (
    langLower.includes("korean") || 
    titleLower.includes("korean") || 
    descLower.includes("korean")
  ) {
    if (!categoriesArray.includes("korean-drama")) categoriesArray.push("korean-drama");
    if (!categoriesArray.includes("korean")) categoriesArray.push("korean");
  }

  return {
    id: item.id,
    title: item.title,
    originalTitle: item.title,
    tagline: item.fullTitle || `Download and Watch ${item.title} streaming references online.`,
    storyline: item.description || "",
    poster: item.poster,
    backdrop: item.screenshots?.[0] || item.poster,
    imdbRating: parsedImdb,
    year: parseInt(item.year) || 2025,
    quality: item.quality || "WEB-DL",
    duration: item.runtime || "2h 10m",
    language: item.language || "Bengali",
    genres: genresArray,
    cast: [
      { name: "Guest Cast", role: "Main Lead", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100" }
    ],
    screenshots: item.screenshots || [],
    trailerUrl: item.trailerUrl || (item.trailer ? (item.trailer.includes("v=") ? item.trailer.split("v=")[1].split("&")[0] : item.trailer.split("/").pop()?.split("?")[0]) : "ARL_JNv7xT0"),
    downloadLinks: (item.downloads || []).map((dl: any) => ({
      serverName: dl.serverName || "Gofile Premium CDN",
      url: dl.url || "https://gofile.io",
      speed: dl.speed || "High Speed",
      type: dl.type || "Cloud"
    })),
    categories: categoriesArray,
    releasingDate: `${item.year || 2025}`,
    size: item.size || "1.5 GB",
    director: "Zee5 Originals",
    watchOnlineUrl: item.watchOnlineUrl,
    
    // Original JSON database fields preserved for advanced details
    slug: item.slug || item.id,
    fullTitle: item.fullTitle,
    description: item.description,
    genre: item.genre,
    resolution: item.resolution,
    runtime: item.runtime,
    imdb: item.imdb,
    downloads: item.downloads
  } as any;
});

// Memory storage for Reviews/Comments mock
const MOCK_REVIEWS: Record<string, Review[]> = {
  "neon-reckoning-2026": [
    { id: "1", author: "Imran Farooq", rating: 9, content: "Masterpiece! The Sunderbans background reference combined with hyper cyberpunk graphics is stellar. Absolute visual treat and lightning fast download speed on Gofile server!", date: "2026-05-18" },
    { id: "2", author: "Nisha Anjum", rating: 8, content: "Loved the audio quality! Bangla dubbing is super professional. Looking forward to more high-quality dual audio torrents on Cinemood.", date: "2026-05-20" }
  ]
};

export const movieService = {
  // Get all movies
  getAllMovies: async (): Promise<Movie[]> => {
    return MOVIES_DATABASE;
  },

  // Get movie by ID or Slug interchangeably (case-insensitive & URI decoded for crawler and direct url safety)
  getMovieById: async (id: string | number): Promise<Movie | null> => {
    if (!id) return null;
    const searchId = typeof id === "string" ? decodeURIComponent(id).toLowerCase().trim() : id.toString();
    const movie = MOVIES_DATABASE.find(m => {
      const matchId = m.id ? m.id.toString().toLowerCase().trim() : "";
      const matchSlug = m.slug ? m.slug.toLowerCase().trim() : "";
      return matchId === searchId || matchSlug === searchId;
    });
    return movie || null;
  },

  // Get movies by category (custom API layout)
  getMoviesByCategory: async (category: string): Promise<Movie[]> => {
    return MOVIES_DATABASE.filter(m => m.categories.includes(category));
  },

  // Search and advanced filtering (simulates search & genre filters)
  searchMovies: async (query: string, filters?: { genre?: string; year?: string; quality?: string; rating?: number }): Promise<Movie[]> => {
    let results = MOVIES_DATABASE;

    if (query.trim() !== "") {
      const q = query.toLowerCase();
      results = results.filter(m => 
        m.title.toLowerCase().includes(q) || 
        m.storyline.toLowerCase().includes(q) ||
        m.genres.some(g => g.toLowerCase().includes(q))
      );
    }

    if (filters) {
      if (filters.genre && filters.genre !== "All") {
        results = results.filter(m => m.genres.includes(filters.genre!));
      }
      if (filters.year && filters.year !== "All") {
        results = results.filter(m => m.year.toString() === filters.year);
      }
      if (filters.quality && filters.quality !== "All") {
        results = results.filter(m => m.quality.toLowerCase().includes(filters.quality!.toLowerCase()));
      }
      if (filters.rating && filters.rating > 0) {
        results = results.filter(m => m.imdbRating >= filters.rating!);
      }
    }

    return results;
  },

  // Get unique genres
  getGenres: async (): Promise<string[]> => {
    const genres = new Set<string>();
    MOVIES_DATABASE.forEach(m => m.genres.forEach(g => genres.add(g)));
    return Array.from(genres);
  },

  // Get unique years
  getYears: async (): Promise<string[]> => {
    const years = new Set<string>();
    MOVIES_DATABASE.forEach(m => years.add(m.year.toString()));
    return Array.from(years).sort((a,b) => b.localeCompare(a));
  },

  // Get reviews of a movie
  getReviews: async (movieId: string): Promise<Review[]> => {
    return [...(MOCK_REVIEWS[movieId] || [])];
  },

  // Add review to a movie (mock stateful)
  addReview: async (movieId: string, author: string, rating: number, content: string): Promise<Review> => {
    if (!MOCK_REVIEWS[movieId]) {
      MOCK_REVIEWS[movieId] = [];
    }
    const newReview: Review = {
      id: `${Date.now()}-${Math.random().toString().slice(2, 15)}`,
      author: author || "Anonymous User",
      rating,
      content,
      date: new Date().toISOString().split("T")[0]
    };
    MOCK_REVIEWS[movieId] = [newReview, ...MOCK_REVIEWS[movieId]];
    return newReview;
  },

  // Mock static data placeholders
  getTopImdb: async (): Promise<Movie[]> => {
    return [...MOVIES_DATABASE].sort((a, b) => b.imdbRating - a.imdbRating);
  },

  getRecommended: async (currentId?: string | number): Promise<Movie[]> => {
    const current = MOVIES_DATABASE.find(m => m.id === currentId || m.slug === currentId);
    if (!current) {
      return MOVIES_DATABASE.slice(0, 4);
    }
    const scored = MOVIES_DATABASE.filter(m => m.id !== current.id).map(m => {
      let score = 0;
      // Share genres
      if (m.genres && current.genres) {
        const intersection = m.genres.filter(g => current.genres.includes(g));
        score += intersection.length * 5;
      }
      // Share categories
      if (m.categories && current.categories) {
        const intersection = m.categories.filter(c => current.categories.includes(c));
        score += intersection.length * 3;
      }
      // Share language
      if (m.language && current.language) {
        const mLang = m.language.toLowerCase();
        const curLang = current.language.toLowerCase();
        if (mLang === curLang) {
          score += 2;
        } else {
          if (mLang.includes("hindi") && curLang.includes("hindi")) score += 1;
          if (mLang.includes("malayalam") && curLang.includes("malayalam")) score += 1;
          if (mLang.includes("bengali") && curLang.includes("bengali")) score += 1;
        }
      }
      // Share year
      if (m.year === current.year) {
        score += 1;
      }
      return { movie: m, score };
    });
    return scored
      .sort((a, b) => b.score - a.score || b.movie.imdbRating - a.movie.imdbRating)
      .slice(0, 4)
      .map(item => item.movie);
  }
};
