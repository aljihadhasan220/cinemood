import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { movieService } from "../services/movieService";
import { Movie } from "../types";
import { MovieGrid } from "../components/MovieGrid";
import { Search, SlidersHorizontal, ArrowLeft, RotateCcw, Filter, Star, Sparkles } from "lucide-react";

export const SearchPage: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    setView
  } = useApp();

  const [moviesList, setMoviesList] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAdvance, setShowAdvance] = useState(true);

  // Fetch unique metadata filter collections on layout mount
  useEffect(() => {
    const fetchMetadata = async () => {
      const g = await movieService.getGenres();
      setGenres(g);
      const y = await movieService.getYears();
      setYears(y);
    };
    fetchMetadata();
  }, []);

  // Sync state filters live and query index lists
  useEffect(() => {
    const performLiveQuery = async () => {
      try {
        setLoading(true);
        const results = await movieService.searchMovies(searchQuery, filters);
        setMoviesList(results);
      } catch (e) {
        console.error("Live indexing query fail", e);
      } finally {
        setLoading(false);
      }
    };

    const delayQuery = setTimeout(() => {
      performLiveQuery();
    }, 150);

    return () => clearTimeout(delayQuery);
  }, [searchQuery, filters]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilters({
      genre: "All",
      year: "All",
      quality: "All",
      rating: 0
    });
  };

  return (
    <div id="search-catalogue-page" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      
      {/* Search description bar */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-l-3 border-red-600 pl-3">
        <div>
          <h1 className="text-xl font-extrabold uppercase tracking-tight text-white flex items-center gap-2">
            <Search className="h-5 w-5 text-red-500" /> Explore Global Catalog
          </h1>
          <p className="text-xs text-neutral-400 mt-1">Refine and query high quality encodes from Cinemood reference pools</p>
        </div>
        <button
          onClick={handleResetFilters}
          className="flex items-center gap-1 text-xs text-neutral-500 hover:text-red-500 transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" />
          Reset Parameters
        </button>
      </div>

      {/* Advanced Filter Controls Container */}
      <div className="rounded-2xl border border-neutral-900 bg-neutral-900/10 p-5 space-y-5">
        
        {/* Header toggle advanced triggers */}
        <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-200 uppercase">
            <SlidersHorizontal className="h-4.5 w-4.5 text-red-500" />
            <span>Advanced Metadata Filtering Matrix</span>
          </div>
          <button
            onClick={() => setShowAdvance(!showAdvance)}
            className="text-[11px] font-mono hover:text-red-500 cursor-pointer text-neutral-400"
          >
            {showAdvance ? "Hide Filters -" : "Show Filters +"}
          </button>
        </div>

        {showAdvance && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            
            {/* Genre Select Dropdown */}
            <div className="space-y-1.5 flex flex-col justify-end">
              <label className="text-[10px] font-mono tracking-wider font-extrabold text-neutral-400 uppercase">Selected Genre</label>
              <select
                value={filters.genre}
                onChange={(e) => setFilters(prev => ({ ...prev, genre: e.target.value }))}
                className="w-full h-11 rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 text-xs text-neutral-200 focus:outline-none focus:ring-1 focus:ring-red-600 transition-all cursor-pointer"
              >
                <option value="All">All Genres Combined</option>
                {genres.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/* Year Select Dropdown */}
            <div className="space-y-1.5 flex flex-col justify-end">
              <label className="text-[10px] font-mono tracking-wider font-extrabold text-neutral-400 uppercase">Release Year</label>
              <select
                value={filters.year}
                onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
                className="w-full h-11 rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 text-xs text-neutral-200 focus:outline-none focus:ring-1 focus:ring-red-600 cursor-pointer"
              >
                <option value="All">All Years Combined</option>
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* Quality Standard */}
            <div className="space-y-1.5 flex flex-col justify-end">
              <label className="text-[10px] font-mono tracking-wider font-extrabold text-neutral-400 uppercase">Print Quality Resolution</label>
              <select
                value={filters.quality}
                onChange={(e) => setFilters(prev => ({ ...prev, quality: e.target.value }))}
                className="w-full h-11 rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 text-xs text-neutral-200 focus:outline-none focus:ring-1 focus:ring-red-600 cursor-pointer"
              >
                <option value="All">All Resolutions Combined</option>
                <option value="4K">4K Ultra HD Only</option>
                <option value="1080p">1080p BluRay Only</option>
                <option value="720p">720p WEB-DL Only</option>
              </select>
            </div>

            {/* IMDb Rating slider */}
            <div className="space-y-1.5 flex flex-col justify-end">
              <div className="flex justify-between items-baseline">
                <label className="text-[10px] font-mono tracking-wider font-extrabold text-neutral-400 uppercase">Minimum IMDb Rating</label>
                <span className="text-xs font-mono font-bold text-yellow-500">{filters.rating}★+</span>
              </div>
              <div className="flex items-center h-11 bg-neutral-950 border border-neutral-800 rounded-xl px-4 gap-3">
                <input
                  type="range"
                  min="0"
                  max="9.5"
                  step="0.5"
                  value={filters.rating}
                  onChange={(e) => setFilters(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                  className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Query matching layout description */}
      <div className="pt-2 text-xs text-neutral-400 font-sans flex items-center justify-between">
        <div>
          {searchQuery ? (
            <span>Showing matches for &ldquo;<span className="font-bold text-white italic">{searchQuery}</span>&rdquo;</span>
          ) : (
            <span>Showing matches dynamically based on filters</span>
          )}
        </div>
        <div>
          Found <span className="text-red-500 font-bold font-mono">{moviesList.length}</span> entries
        </div>
      </div>

      {/* Structured results list items */}
      <MovieGrid
        movies={moviesList}
        loading={loading}
      />
    </div>
  );
};
