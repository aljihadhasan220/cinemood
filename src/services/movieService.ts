import { Movie, Review } from "../types";

// Dynamic premium movie dataset for a rich, realistic layout
const MOVIES_DATABASE: Movie[] = [
  {
    id: "neon-reckoning-2026",
    title: "Neon Reckoning: Cyber Strike",
    originalTitle: "Neon Reckoning",
    tagline: "The neural web is compromised. Reality is secondary.",
    storyline: "In the sprawling high-contrast neon metropolis of Neo-Dhaka, 2088, a rogue cyber-operative uncovers a fatal telemetry exploit threat designed to rewrite human memories. Framed for an assassination she didn't commit, she must infiltrate the corporate mainframe in a race against digital annihilation.",
    poster: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600&h=900",
    backdrop: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=1200&h=675",
    imdbRating: 8.7,
    year: 2026,
    quality: "4K ULTRA HD",
    duration: "2h 14m",
    language: "Dual Audio (English/Bangla)",
    genres: ["Sci-Fi", "Action", "Thriller"],
    cast: [
      { name: "Sylvia Vance", role: "Vesper Voss", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100" },
      { name: "Marcus Thorne", role: "Kaelen Drake", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" },
      { name: "Kenji Takahashi", role: "The Architect", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100" }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600&h=340",
      "https://images.unsplash.com/photo-1504701954957-2390f806e9f4?auto=format&fit=crop&q=80&w=600&h=340",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600&h=340"
    ],
    trailerUrl: "L61p2uyiMSo", // YouTube ID
    downloadLinks: [
      { serverName: "High-Speed Gofile Direct", url: "https://gofile.io/d/cinemood-neonreckoning-4k", speed: "Ultra Fast", type: "Cloud" },
      { serverName: "Premium Telegram Server Mirror", url: "https://t.me/cinemood_channel/download-neonreckoning", speed: "Unlimited", type: "Telegram" },
      { serverName: "StreamTape Active Drive", url: "https://streamtape.com/cinemood-reckoning", speed: "Fast", type: "Stream" },
      { serverName: "Cinemood Cloud Node Alpha", url: "https://node.cinemood.net/get/neonreckoning", speed: "High Speed", type: "Direct" }
    ],
    categories: ["trending", "latest", "dual-audio", "action", "recommended"],
    releasingDate: "February 12, 2026",
    size: "2.4 GB",
    director: "Lana Wachowski"
  },
  {
    id: "mayabi-shadows-2025",
    title: "Mayabi Shadows",
    originalTitle: "Mayabi Chhaya",
    tagline: "Unveiling ancient spirits of the Sunderbans.",
    storyline: "During an ecological expedition deep in the heart of the misty Sunderbans mangrove forest, a team of researchers discovers a series of folkloric ruins. Soon they find themselves hunted by a shapeshifting phantom that represents nature's violent recoil against human exploit.",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=600&h=900",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200&h=675",
    imdbRating: 8.2,
    year: 2025,
    quality: "1080p BluRay",
    duration: "2h 05m",
    language: "Bangla",
    genres: ["Mystery", "Horror", "Drama"],
    cast: [
      { name: "Chayanika Roy", role: "Dr. Maya Sen", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100" },
      { name: "Arif Zaman", role: "Sifat (Leed Guide)", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=100&h=100" }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=600&h=340",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600&h=340"
    ],
    trailerUrl: "eHp3MbsHLX0",
    downloadLinks: [
      { serverName: "High-Speed Gofile Direct", url: "https://gofile.io/d/mayabi-shadows-1080p", speed: "Ultra Fast", type: "Cloud" },
      { serverName: "Premium Telegram Server Mirror", url: "https://t.me/cinemood_channel/download-mayabichhaya", speed: "Unlimited", type: "Telegram" },
      { serverName: "StreamTape Active Drive", url: "https://streamtape.com/mayabi", speed: "High Speed", type: "Stream" }
    ],
    categories: ["bangla-dubbed", "latest", "recommended"],
    releasingDate: "November 18, 2025",
    size: "1.6 GB",
    director: "Mostofa Sarwar Farooki"
  },
  {
    id: "skyward-odyssey-2026",
    title: "Skyward Odyssey: Anime Saga",
    originalTitle: "Solitary Horizon",
    tagline: "Look beyond the wind, and you will find your wings.",
    storyline: "In a world where flying islands float above toxic storm clouds, a rebellious mechanical wizard girl finds a legendary vintage sky-cutter engine. Together with a silent warrior from the lower abyss, she sets course for the mythical Sol Abyss to rescue her lost brother.",
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=600&h=900",
    backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1200&h=675",
    imdbRating: 9.1,
    year: 2026,
    quality: "1080p BluRay",
    duration: "1h 58m",
    language: "Japanese (English/Bangla Sub)",
    genres: ["Anime", "Fantasy", "Adventure"],
    cast: [
      { name: "Aoi Yuki", role: "Lilu (Voice)", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100" },
      { name: "Yuki Kaji", role: "Sora (Voice)", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100&h=100" }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600&h=340",
      "https://images.unsplash.com/photo-1502409939164-1f6006c3ccfa?auto=format&fit=crop&q=80&w=600&h=340"
    ],
    trailerUrl: "H_A8a_YALlU",
    downloadLinks: [
      { serverName: "High-Speed Gofile Direct", url: "https://gofile.io/d/skyward", speed: "Ultra Fast", type: "Cloud" },
      { serverName: "Premium Telegram Server Mirror", url: "https://t.me/cinemood_channel/download-skyward", speed: "Unlimited", type: "Telegram" }
    ],
    categories: ["anime", "trending", "top-imdb"],
    releasingDate: "April 05, 2026",
    size: "1.2 GB",
    director: "Makoto Shinkai"
  },
  {
    id: "stranger-currents-2025",
    title: "Stranger Currents",
    originalTitle: "Stranger Currents: Season 1",
    tagline: "The water is whispering. Don't answer it.",
    storyline: "When a secretive government research node built along the coastal lines goes dark, a rural sheriff's daughter discovers that an anomalous gateway has active telekinetic communication nodes beneath a small fishing harbor.",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600&h=900",
    backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200&h=675",
    imdbRating: 8.9,
    year: 2025,
    quality: "4K ULTRA HD",
    duration: "10 Episodes",
    language: "Dual Audio (English/Hindi)",
    genres: ["Sci-Fi", "Mystery", "Drama"],
    cast: [
      { name: "Winona Ryder V", role: "Joyce Carter", image: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=100&h=100" },
      { name: "David Harbour V", role: "Jim Vance", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100" }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600&h=340",
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=600&h=340"
    ],
    trailerUrl: "b9EkMc79ZSU",
    downloadLinks: [
      { serverName: "High-Speed Gofile Direct", url: "https://gofile.io/d/strangercurrents", speed: "Ultra Fast", type: "Cloud" },
      { serverName: "Premium Telegram Server Mirror", url: "https://t.me/cinemood_channel/download-strangercurrents", speed: "Unlimited", type: "Telegram" }
    ],
    categories: ["netflix-series", "trending", "recommended"],
    releasingDate: "May 2025",
    size: "4.5 GB (Pack)",
    director: "The Duffer Brothers"
  },
  {
    id: "chronicles-valkyrie-2026",
    title: "Valkyrie Ascending (Dual Audio)",
    originalTitle: "Valkyrie Ascending",
    tagline: "Fate demands steel. Armor requires sacrifice.",
    storyline: "In high-fidelity dark fantasy kingdoms, an outcast female warrior inherits the legendary mythos of the Valkyries. Bound by an unbreakable vow, she must secure an alliance across enemy lines to defend the capital against the Necro-King's demonic siege.",
    poster: "https://images.unsplash.com/photo-1559893088-c0787ebfc084?auto=format&fit=crop&q=80&w=600&h=900",
    backdrop: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200&h=675",
    imdbRating: 8.4,
    year: 2026,
    quality: "4K ULTRA HD",
    duration: "2h 35m",
    language: "Dual Audio (English/Bangla)",
    genres: ["Action", "Fantasy", "Adventure"],
    cast: [
      { name: "Cate Blanchett II", role: "Valkyrie Thyra", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100" },
      { name: "Chris Hemsworth II", role: "Boran Halberd", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100" }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600&h=340",
      "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=600&h=340"
    ],
    trailerUrl: "L081D0VfB20",
    downloadLinks: [
      { serverName: "High-Speed Gofile Direct", url: "https://gofile.io/d/valkyrie-dual", speed: "Ultra Fast", type: "Cloud" },
      { serverName: "Premium Telegram Server Mirror", url: "https://t.me/cinemood_channel/download-valkyrie", speed: "Unlimited", type: "Telegram" }
    ],
    categories: ["dual-audio", "action", "trending"],
    releasingDate: "March 15, 2026",
    size: "2.8 GB",
    director: "Zack Snyder"
  },
  {
    id: "echoes-of-monolith-2025",
    title: "Echoes of the Monolith",
    originalTitle: "Monolith Echoes",
    tagline: "Silence holds the highest resolution.",
    storyline: "An archaeologist uncovers a deep-buried geometric monolith in the desert plains. The stone transmits a recurring mathematical signal that matches human DNA sequences, transforming those who spend time within its resonant field.",
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600&h=900",
    backdrop: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1200&h=675",
    imdbRating: 9.3,
    year: 2025,
    quality: "4K ULTRA HD",
    duration: "2h 42m",
    language: "English",
    genres: ["Sci-Fi", "Mystery", "Philosophy"],
    cast: [
      { name: "Cillian Murphy", role: "Dr. Ethan Cole", image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=100&h=100" },
      { name: "Jessica Chastain", role: "Dr. Elizabeth Stone", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=100&h=100" }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600&h=340",
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=600&h=340"
    ],
    trailerUrl: "m8e-FF8MsqU",
    downloadLinks: [
      { serverName: "High-Speed Gofile Direct", url: "https://gofile.io/d/monolith-4k", speed: "Ultra Fast", type: "Cloud" },
      { serverName: "Premium Telegram Server Mirror", url: "https://t.me/cinemood_channel/download-monolith", speed: "Unlimited", type: "Telegram" }
    ],
    categories: ["top-imdb", "recommended", "latest"],
    releasingDate: "July 2025",
    size: "3.2 GB",
    director: "Christopher Nolan"
  },
  {
    id: "shadow-ninja-bangla-2026",
    title: "Shadow Warrior (Bangla Dubbed)",
    originalTitle: "Shadow Warrior",
    tagline: "Honour is forged in blood.",
    storyline: "In medieval Japan, a dishonoured samurai is saved by an elite ninja clan. When they teach him the art of stealth, shadow-walking, and absolute devotion, he pledges to defend a poor farming village against the tyrant warlord who destroyed his home.",
    poster: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=600&h=900",
    backdrop: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200&h=675",
    imdbRating: 8.0,
    year: 2026,
    quality: "720p WEB-DL",
    duration: "2h 10m",
    language: "Bangla Dubbed (Japanese)",
    genres: ["Action", "History", "Adventure"],
    cast: [
      { name: "Takashi Kuro", role: "Ren the Ronin", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=100&h=100" },
      { name: "Yuki Matsu", role: "Kasumi Shadow", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100" }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600&h=340"
    ],
    trailerUrl: "wV7z8Z4XorM",
    downloadLinks: [
      { serverName: "High-Speed Gofile Direct", url: "https://gofile.io/d/shadowwarrior-bd", speed: "Ultra Fast", type: "Cloud" },
      { serverName: "Premium Telegram Server Mirror", url: "https://t.me/cinemood_channel/download-shadowwarrior", speed: "Unlimited", type: "Telegram" }
    ],
    categories: ["bangla-dubbed", "action", "latest"],
    releasingDate: "May 2026",
    size: "950 MB",
    director: "Hiroyuki Sanada"
  },
  {
    id: "cyberpunk-edgerunners-saga",
    title: "Edgerunners: Neon Ascent",
    originalTitle: "Cyberpunk Edgerunners Season 2",
    tagline: "Live fast. Burn bright. Become legend.",
    storyline: "This anime series follows a street kid trying to survive in a technology and body modification-obsessed city of the future. Having everything to lose, he chooses to stay alive by becoming an edgerunner—a mercenary outlaw.",
    poster: "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&q=80&w=600&h=900",
    backdrop: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=1200&h=675",
    imdbRating: 8.8,
    year: 2025,
    quality: "1080p BluRay",
    duration: "10 Episodes",
    language: "Japanese (English Sub)",
    genres: ["Anime", "Sci-Fi", "Crime"],
    cast: [
      { name: "KENN", role: "David Martinez (Voice)", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100" },
      { name: "Aoi Yuki", role: "Lucy (Voice)", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100" }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600&h=340"
    ],
    trailerUrl: "ARL_JNv7xT0",
    downloadLinks: [
      { serverName: "High-Speed Gofile Direct", url: "https://gofile.io/d/cyberpunkedge", speed: "Ultra Fast", type: "Cloud" },
      { serverName: "Premium Telegram Server Mirror", url: "https://t.me/cinemood_channel/download-edgerunners", speed: "Unlimited", type: "Telegram" }
    ],
    categories: ["anime", "netflix-series", "action"],
    releasingDate: "September 2025",
    size: "2.1 GB",
    director: "Hiroyuki Imaishi"
  },
  {
    id: "dark-monarchs-series",
    title: "Dark Monarchs (Dual Audio)",
    originalTitle: "Dark Monarchs",
    tagline: "Rule in the shadows, or perish in light.",
    storyline: "A deep gothic conspiracy procedural surrounding secret royal families that secretly run global energy nodes. A rookie detective discovers their bloodline secrets and triggers a brutal retaliatory manhunt across urban Europe.",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600&h=900",
    backdrop: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1200&h=675",
    imdbRating: 8.3,
    year: 2026,
    quality: "1080p BluRay",
    duration: "8 Episodes",
    language: "Dual Audio (English/Hindi)",
    genres: ["Mystery", "Drama", "Crime"],
    cast: [
      { name: "Eva Green", role: "Anastasia Moreau", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100" },
      { name: "Mads Mikkelsen", role: "Clemens Adler", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100" }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=600&h=340"
    ],
    trailerUrl: "jPWeR9S1VlM",
    downloadLinks: [
      { serverName: "High-Speed Gofile Direct", url: "https://gofile.io/d/darkmonarchs", speed: "Ultra Fast", type: "Cloud" },
      { serverName: "Premium Telegram Server Mirror", url: "https://t.me/cinemood_channel/download-darkmonarchs", speed: "Unlimited", type: "Telegram" }
    ],
    categories: ["netflix-series", "dual-audio", "latest"],
    releasingDate: "January 2026",
    size: "3.5 GB",
    director: "Baran bo Odar"
  }
];

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

  // Get movie by ID
  getMovieById: async (id: string | number): Promise<Movie | null> => {
    const movie = MOVIES_DATABASE.find(m => m.id === id);
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
    return MOVIES_DATABASE.filter(m => m.id !== currentId).slice(0, 4);
  }
};
