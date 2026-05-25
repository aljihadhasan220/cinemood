export interface Movie {
  id: string | number;
  slug?: string;
  title: string;
  originalTitle?: string;
  tagline?: string;
  storyline: string;
  poster: string;
  backdrop: string;
  imdbRating: number;
  year: number;
  quality: "4K ULTRA HD" | "1080p BluRay" | "720p WEB-DL" | "CAMRip" | string;
  duration: string;
  language: string;
  genres: string[];
  cast: CastMember[];
  screenshots: string[];
  trailerUrl: string; // YouTube video ID or full link
  downloadLinks: DownloadLink[];
  categories: string[]; // trending, latest, bangla-dubbed, dual-audio, anime, netflix-series, action, top-imdb, recommended
  releasingDate?: string;
  size?: string;
  director?: string;
  watchOnlineUrl?: string;
}

export interface CastMember {
  name: string;
  role: string;
  image: string;
}

export interface DownloadLink {
  serverName: string;
  url: string;
  speed: "Ultra Fast" | "Fast" | "Unlimited" | "High Speed";
  type: "Direct" | "Cloud" | "Telegram" | "Stream";
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
}

export type ViewType = "home" | "detail" | "download" | "search" | "bookmarks" | "about" | "privacy" | "contact" | "disclaimer";

export interface SearchFilters {
  genre: string;
  year: string;
  quality: string;
  rating: number;
}
