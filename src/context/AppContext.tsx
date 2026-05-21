import React, { createContext, useContext, useState, useEffect } from "react";
import { ViewType, SearchFilters, Movie } from "../types";
import { movieService } from "../services/movieService";

const parsePathToState = (
  pathname: string,
  allMovies: Movie[],
  setView: (v: ViewType) => void,
  setSelectedMovieId: (id: string | null) => void,
  setSearchQuery: (q: string) => void,
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>,
  setActiveCategory: (cat: string | null) => void
) => {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) {
    setView("home");
    setSelectedMovieId(null);
    setActiveCategory(null);
    return;
  }

  if (parts[0] === "bookmarks" || parts[0] === "my-list") {
    setView("bookmarks");
    setActiveCategory(null);
    return;
  }

  if (parts[0] === "search" || parts[0] === "explore") {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q") || "";
    setSearchQuery(q);
    setView("search");
    setActiveCategory(null);
    return;
  }

  if (parts[0] === "category" && parts[1]) {
    const slug = parts[1];
    setActiveCategory(slug);
    setView("search");
    
    let genreVal = "All";
    // General direct category matching
    if (slug === "anime") genreVal = "Anime";
    else if (slug === "scifi" || slug === "sci-fi") genreVal = "Sci-Fi";
    else if (slug === "horror") genreVal = "Horror";
    else if (slug === "mystery") genreVal = "Mystery";
    else if (slug === "action") genreVal = "Action";
    else if (slug === "drama") genreVal = "Drama";

    setFilters({
      genre: genreVal,
      year: "All",
      quality: "All",
      rating: 0
    });
    setSearchQuery("");
    return;
  }

  if (parts[0] === "movie" && parts[1]) {
    const slug = parts[1];
    setSelectedMovieId(slug);
    setView("detail");
    setActiveCategory(null);
    return;
  }

  if (parts[0] === "download" && parts[1]) {
    const slug = parts[1];
    setSelectedMovieId(slug);
    setView("download");
    setActiveCategory(null);
    return;
  }

  // default fallback
  setView("home");
  setSelectedMovieId(null);
  setActiveCategory(null);
};

interface AppContextProps {
  view: ViewType;
  setView: (view: ViewType) => void;
  selectedMovieId: string | null;
  setSelectedMovieId: (id: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  bookmarks: string[];
  toggleBookmark: (movieId: string) => void;
  isBookmarked: (movieId: string) => boolean;
  continueWatching: { movieId: string; watchedPercentage: number; lastUpdated: string }[];
  addContinueWatching: (movieId: string, percentage: number) => void;
  clearContinueWatching: (movieId: string) => void;
  activeTrailerId: string | null;
  setActiveTrailerId: (id: string | null) => void;
  allMovies: Movie[];
  isLoading: boolean;
  refreshMovies: () => Promise<void>;
  navigateToMovie: (movieId: string, targetView?: ViewType) => void;
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [view, setViewState] = useState<ViewType>("home");
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    genre: "All",
    year: "All",
    quality: "All",
    rating: 0
  });

  // Load bookmarks & continueWatching from localStorage
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("cinemood_bookmarks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [continueWatching, setContinueWatching] = useState<{ movieId: string; watchedPercentage: number; lastUpdated: string }[]>(() => {
    try {
      const saved = localStorage.getItem("cinemood_continue_watching");
      if (saved) {
        return JSON.parse(saved);
      }
      // Populate with two realistic defaults for first experience
      return [
        { movieId: "neon-reckoning-2026", watchedPercentage: 45, lastUpdated: new Date().toISOString() },
        { movieId: "skyward-odyssey-2026", watchedPercentage: 78, lastUpdated: new Date().toISOString() }
      ];
    } catch {
      return [];
    }
  });

  const [activeTrailerId, setActiveTrailerId] = useState<string | null>(null);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("cinemood_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem("cinemood_continue_watching", JSON.stringify(continueWatching));
  }, [continueWatching]);

  // Fetch all movies at start
  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const movies = await movieService.getAllMovies();
      setAllMovies(movies);
    } catch (e) {
      console.error("Error loading movie database", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Listen for initial pathname parse and popstate updates (browser back/forward button trigger)
  useEffect(() => {
    if (allMovies.length > 0) {
      parsePathToState(
        window.location.pathname,
        allMovies,
        setViewState,
        setSelectedMovieId,
        setSearchQuery,
        setFilters,
        setActiveCategory
      );
    }
  }, [allMovies]);

  useEffect(() => {
    const handlePopState = () => {
      if (allMovies.length > 0) {
        parsePathToState(
          window.location.pathname,
          allMovies,
          setViewState,
          setSelectedMovieId,
          setSearchQuery,
          setFilters,
          setActiveCategory
        );
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [allMovies]);

  // Sync state back to URL pathname dynamically for crawlability & indexability
  useEffect(() => {
    if (isLoading || allMovies.length === 0) return;

    let targetPath = "/";
    if (view === "bookmarks") {
      targetPath = "/bookmarks";
    } else if (view === "search") {
      if (activeCategory) {
        targetPath = `/category/${activeCategory}`;
      } else if (filters.genre && filters.genre !== "All") {
        const slug = filters.genre.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        targetPath = `/category/${slug}`;
      } else {
        const queryStr = searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : "";
        targetPath = queryStr ? `/search${queryStr}` : "/search";
      }
    } else if (view === "detail" && selectedMovieId) {
      targetPath = `/movie/${selectedMovieId}`;
    } else if (view === "download" && selectedMovieId) {
      targetPath = `/download/${selectedMovieId}`;
    }

    if (window.location.pathname !== targetPath) {
      window.history.pushState({ view, selectedMovieId, activeCategory }, "", targetPath);
    }
  }, [view, selectedMovieId, activeCategory, searchQuery, filters.genre, isLoading, allMovies]);

  const setView = (v: ViewType) => {
    // Reset page scroll position on view transitions
    window.scrollTo({ top: 0, behavior: "smooth" });
    setViewState(v);
  };

  const toggleBookmark = (movieId: string) => {
    setBookmarks(prev => 
      prev.includes(movieId) 
        ? prev.filter(id => id !== movieId) 
        : [...prev, movieId]
    );
  };

  const isBookmarked = (movieId: string) => {
    return bookmarks.includes(movieId);
  };

  const addContinueWatching = (movieId: string, percentage: number) => {
    setContinueWatching(prev => {
      const filtered = prev.filter(item => item.movieId !== movieId);
      return [
        { movieId, watchedPercentage: Math.max(0, Math.min(percentage, 100)), lastUpdated: new Date().toISOString() },
        ...filtered
      ].slice(0, 5); // Max 5 items
    });
  };

  const clearContinueWatching = (movieId: string) => {
    setContinueWatching(prev => prev.filter(item => item.movieId !== movieId));
  };

  // Helper function to smooth switch views
  const navigateToMovie = (movieId: string, targetView: ViewType = "detail") => {
    setSelectedMovieId(movieId);
    setView(targetView);
  };

  return (
    <AppContext.Provider
      value={{
        view,
        setView,
        selectedMovieId,
        setSelectedMovieId,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        continueWatching,
        addContinueWatching,
        clearContinueWatching,
        activeTrailerId,
        setActiveTrailerId,
        allMovies,
        isLoading,
        refreshMovies: fetchMovies,
        navigateToMovie,
        activeCategory,
        setActiveCategory
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
