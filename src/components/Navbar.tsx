import React, { useState, useEffect, useRef } from "react";
import { Search, Film, Bookmark, X, Menu, Tv, Sparkles, Star } from "lucide-react";
import { useApp } from "../context/AppContext";
import { movieService } from "../services/movieService";
import { Movie } from "../types";
import { motion, AnimatePresence } from "motion/react";

export const Navbar: React.FC = () => {
  const {
    view,
    setView,
    searchQuery,
    setSearchQuery,
    bookmarks,
    navigateToMovie,
    filters,
    setFilters
  } = useApp();

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const suggestRef = useRef<HTMLDivElement>(null);

  // Sync internal search field with global context
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Live Suggestion Query logic
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (localSearch.trim().length >= 2) {
        const matches = await movieService.searchMovies(localSearch);
        setSuggestions(matches.slice(0, 5));
        setIsSuggestOpen(true);
      } else {
        setSuggestions([]);
        setIsSuggestOpen(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions();
    }, 150);

    return () => clearTimeout(delayDebounceFn);
  }, [localSearch]);

  // Close suggestions card on clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestRef.current && !suggestRef.current.contains(event.target as Node)) {
        setIsSuggestOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch);
      // Clear filters so they see all keyword results
      setFilters({ genre: "All", year: "All", quality: "All", rating: 0 });
      setView("search");
      setIsSuggestOpen(false);
    }
  };

  const handleClearSearch = () => {
    setLocalSearch("");
    setSearchQuery("");
    setIsSuggestOpen(false);
  };

  const navigateCategory = (categoryName: string) => {
    setFilters({
      genre: categoryName,
      year: "All",
      quality: "All",
      rating: 0
    });
    setSearchQuery("");
    setView("search");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav id="navbar" className="sticky top-0 z-40 bg-black/40 border-b border-white/5 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Brand Logo and Name */}
          <div className="flex items-center gap-7">
            <button
              onClick={() => { setView("home"); setSearchQuery(""); }}
              className="flex items-center gap-2 text-left cursor-pointer active:scale-95 transition-transform"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red shadow-[0_0_15px_rgba(229,9,20,0.5)]">
                <Film className="h-5 w-5 text-white" />
              </div>
              <span className="font-sans text-xl font-black tracking-tighter text-white flex items-center">
                CINEMOOD<span className="w-1.5 h-1.5 bg-white rounded-full ml-1"></span>
              </span>
            </button>

            {/* Desktop Navigation links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-[#a3a3a3]">
              <button
                onClick={() => { setView("home"); setSearchQuery(""); }}
                className={`transition-colors cursor-pointer hover:text-white ${view === "home" ? "text-white border-b-2 border-brand-red pb-1" : ""}`}
              >
                Home
              </button>
              <button
                onClick={() => navigateCategory("Action")}
                className={`transition-colors cursor-pointer hover:text-white ${view === "search" && searchQuery === "" && filters.genre === "Action" ? "text-white border-b-2 border-brand-red pb-1" : ""}`}
              >
                Movies
              </button>
              <button
                onClick={() => navigateCategory("Anime")}
                className={`transition-colors cursor-pointer hover:text-white ${view === "search" && searchQuery === "" && filters.genre === "Anime" ? "text-white border-b-2 border-brand-red pb-1" : ""}`}
              >
                Anime
              </button>
              <button
                onClick={() => {
                  setFilters({ genre: "All", year: "All", quality: "All", rating: 0 });
                  setSearchQuery("");
                  setView("bookmarks");
                }}
                className={`transition-colors cursor-pointer hover:text-white ${view === "bookmarks" ? "text-white border-b-2 border-brand-red pb-1" : ""}`}
              >
                My List
              </button>
            </div>
          </div>

          {/* Search Box & Controls */}
          <div className="flex flex-1 max-w-md items-center justify-end gap-3">
            
            {/* Live Suggestion Search Container */}
            <div ref={suggestRef} className="relative w-full shadow-inner">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="absolute left-3.5 h-4 w-4 text-neutral-400 group-focus-within:text-brand-red" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  onFocus={() => { if (localSearch.trim().length >= 2) setIsSuggestOpen(true); }}
                  className="w-full h-10 pl-10 pr-9 border border-white/10 bg-white/5 rounded-full text-neutral-100 text-xs placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-brand-red transition-all"
                />
                
                {localSearch && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 p-0.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </form>

              {/* Suggestions dropdown card */}
              <AnimatePresence>
                {isSuggestOpen && suggestions.length > 0 && (
                  <motion.div
                    id="search-suggestions-container"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 right-0 mt-2 z-50 overflow-hidden divide-y divide-[#151515] border border-white/5 rounded-xl bg-[#0d0d0d]/95 shadow-2xl p-1.5 backdrop-blur-md"
                  >
                    <div className="px-3.5 py-2 text-[10px] font-mono tracking-wider font-extrabold text-brand-red uppercase flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> Search Recommendations
                    </div>
                    {suggestions.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          navigateToMovie(m.id.toString());
                          setIsSuggestOpen(false);
                          setLocalSearch("");
                        }}
                        className="flex w-full items-center gap-3 py-2 px-2.5 rounded-lg text-left hover:bg-white/5 active:bg-white/10 transition-colors cursor-pointer"
                      >
                        <img
                          src={m.poster}
                          alt={m.title}
                          referrerPolicy="no-referrer"
                          className="h-12 w-8 object-cover rounded shadow-md border border-white/5 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-neutral-100 truncate">{m.title}</h4>
                          <p className="text-[10px] text-neutral-400 mt-0.5 flex items-center gap-1.5">
                            <span>{m.year}</span>
                            <span>•</span>
                            <span className="flex items-center gap-0.5 font-semibold text-yellow-500 font-mono">
                              <Star className="h-2.5 w-2.5 fill-yellow-500 text-yellow-500" />
                              {m.imdbRating}
                            </span>
                            <span>•</span>
                            <span className="text-[9px] uppercase tracking-wide bg-[#202020] px-1 py-0.1 rounded text-neutral-350 font-bold">{m.quality}</span>
                          </p>
                        </div>
                      </button>
                    ))}
                    
                    {/* View all button overlay */}
                    <div className="p-1 border-t border-[#151515]">
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery(localSearch);
                          setView("search");
                          setIsSuggestOpen(false);
                        }}
                        className="flex w-full justify-center py-2 rounded-lg text-center text-xs font-semibold text-brand-red hover:bg-brand-red/10 transition-colors cursor-pointer"
                      >
                        See all results for &ldquo;{localSearch}&rdquo;
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Watchlist Bookmark Icon (Desktop) */}
            <button
              id="watchlist-icon-desktop"
              onClick={() => {
                setFilters({ genre: "All", year: "All", quality: "All", rating: 0 });
                setSearchQuery("");
                setView("bookmarks");
              }}
              className="relative hidden sm:flex h-10 w-10 items-center justify-center border border-white/10 hover:border-brand-red/30 bg-white/5 rounded-xl text-neutral-300 hover:text-brand-red transition-all cursor-pointer"
            >
              <Bookmark className={`h-4.5 w-4.5 ${view === "bookmarks" ? "fill-brand-red text-brand-red" : ""}`} />
              {bookmarks.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-[10px] font-bold text-white shadow-lg animate-pulse">
                  {bookmarks.length}
                </span>
              )}
            </button>

            {/* User Profile Avatar with custom gradient from design */}
            <div className="hidden sm:flex w-10 h-10 rounded-lg bg-gradient-to-tr from-brand-red to-[#ff4d4d] items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(229,9,20,0.5)] cursor-pointer hover:scale-105 active:scale-95 transition-transform" title="User Profile Hub">
              JD
            </div>

            {/* Mobile Burger Trigger */}
            <button
              id="mobile-menu-trigger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex md:hidden h-10 w-10 items-center justify-center border border-neutral-800 bg-neutral-950 rounded-xl text-neutral-400 hover:text-red-500 transition-all"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-neutral-900 bg-black/95 px-4 py-5 space-y-4"
          >
            <div className="flex flex-col gap-3 text-sm font-semibold text-neutral-300">
              <button
                onClick={() => { setView("home"); setSearchQuery(""); setIsMobileMenuOpen(false); }}
                className="hover:text-red-500 text-left py-1"
              >
                Home
              </button>
              <button
                onClick={() => navigateCategory("Action")}
                className="hover:text-red-500 text-left py-1"
              >
                Action movies
              </button>
              <button
                onClick={() => navigateCategory("Anime")}
                className="hover:text-red-500 text-left py-1"
              >
                Anime sagas
              </button>
              <button
                onClick={() => {
                  setFilters({ genre: "All", year: "All", quality: "All", rating: 0 });
                  setSearchQuery("");
                  setView("bookmarks");
                  setIsMobileMenuOpen(false);
                }}
                className="hover:text-red-500 text-left py-1 flex items-center justify-between"
              >
                <span>My Watchlist</span>
                {bookmarks.length > 0 && (
                  <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs text-white">
                    {bookmarks.length}
                  </span>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
