import React, { createContext, useContext, useState, useEffect } from "react";
import { ViewType, SearchFilters, Movie } from "../types";
import { movieService } from "../services/movieService";

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
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [view, setViewState] = useState<ViewType>("home");
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
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
        navigateToMovie
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
