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
    setView,
    activeCategory,
    setActiveCategory
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
        let results = await movieService.searchMovies(searchQuery, filters);
        
        if (activeCategory) {
          const lCat = activeCategory.toLowerCase();
          if (lCat === "bengali-movies") {
            results = results.filter(m => m.language.toLowerCase().includes("bengali") || m.language.toLowerCase().includes("bangla"));
          } else if (lCat === "web-series") {
            results = results.filter(m => m.duration.toLowerCase().includes("episode") || m.storyline.toLowerCase().includes("series") || m.id.toString().includes("series"));
          } else if (lCat === "anime") {
            results = results.filter(m => m.genres.map(g => g.toLowerCase()).includes("anime") || m.title.toLowerCase().includes("anime"));
          } else if (lCat === "bangla-dubbed") {
            results = results.filter(m => m.language.toLowerCase().includes("bangla") || m.language.toLowerCase().includes("bengali") || m.categories.includes("bangla-dubbed"));
          } else if (lCat === "dual-audio") {
            results = results.filter(m => m.language.toLowerCase().includes("dual") || m.categories.includes("dual-audio"));
          } else if (lCat === "trending-movies") {
            results = results.filter(m => m.categories.includes("trending"));
          } else if (lCat === "latest-uploads") {
            results = results.filter(m => m.categories.includes("latest"));
          } else if (lCat === "hollywood-movies") {
            results = results.filter(m => (m.language.toLowerCase().includes("eng") || m.language.toLowerCase().includes("dual")) && !m.genres.map(g => g.toLowerCase()).includes("anime"));
          } else if (lCat === "south-indian-movies") {
            results = results.filter(m => m.language.toLowerCase().includes("hindi") || m.title.toLowerCase().includes("south") || m.id.toString().includes("mayabi"));
          } else if (lCat === "malayalam-movies" || lCat === "malayalam") {
            results = results.filter(m => m.language.toLowerCase().includes("malayalam") || m.categories.includes("malayalam-movies") || m.categories.includes("malayalam"));
          } else if (lCat === "korean-drama" || lCat === "korean") {
            results = results.filter(m => m.language.toLowerCase().includes("korean") || m.categories.includes("korean-drama") || m.categories.includes("korean"));
          } else if (lCat === "hindi-series") {
            results = results.filter(m => (m.language.toLowerCase().includes("hindi") && m.categories.includes("web-series")) || m.categories.includes("hindi-series"));
          } else if (lCat === "hindi-movies" || lCat === "hindi") {
            results = results.filter(m => m.language.toLowerCase().includes("hindi") && !m.categories.includes("web-series"));
          } else if (lCat === "telugu-movies" || lCat === "telugu") {
            results = results.filter(m => m.language.toLowerCase().includes("telugu") || m.categories.includes("telugu-movies") || m.categories.includes("telugu"));
          } else if (lCat === "tamil-movies" || lCat === "tamil") {
            results = results.filter(m => m.language.toLowerCase().includes("tamil") || m.categories.includes("tamil-movies") || m.categories.includes("tamil"));
          } else if (lCat === "bengali-series" || lCat === "bengali-dubbed-series") {
            results = results.filter(m => (m.language.toLowerCase().includes("bengali") || m.language.toLowerCase().includes("bangla")) && m.categories.includes("web-series"));
          }
        }
        
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
  }, [searchQuery, filters, activeCategory]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilters({
      genre: "All",
      year: "All",
      quality: "All",
      rating: 0
    });
    setActiveCategory(null);
  };

  // Map slugs to clean display metadata
  const getCategoryMeta = () => {
    if (!activeCategory) return { title: "Explore Global Catalog", subtitle: "Refine and query high quality encodes from Cinemood reference pools" };
    const lCat = activeCategory.toLowerCase();
    switch (lCat) {
      case "bengali-movies":
        return { title: "Bengali Movies & Web Series Archive", subtitle: "Direct Gofile streams and fast direct pointers for Bengali films and serials." };
      case "web-series":
        return { title: "Premium Web Series & Seasons Archive", subtitle: "Complete direct download packs for Netflix, Amazon, and Bengali streaming shows." };
      case "anime":
        return { title: "Anime Sagas & Japanese Animated Prints", subtitle: "Japanese animation masterpieces with English and Bangla subtitles index references." };
      case "bangla-dubbed":
        return { title: "Bangla Dubbed Blockbusters Index", subtitle: "High quality Hindi, South Indian, and English movies dubbed in Bangla." };
      case "dual-audio":
        return { title: "Dual Audio Multi-Language Encodes", subtitle: "Dual-audio blockbusters [English & Bangla/Hindi] in 1080p and 4K UHD resolutions." };
      case "trending-movies":
        return { title: "Trending Cinema Hits & Downloads", subtitle: "The most popular, high stakes blockbusters of the week on Cinemood nodes." };
      case "latest-uploads":
        return { title: "Latest High Speed Direct Downloads", subtitle: "Newly cataloged digital releases, encodes, and direct storage mirrors." };
      case "hollywood-movies":
        return { title: "Hollywood English & Dubbed Index", subtitle: "Curated collection of international action blockbusters and Academy awards hits." };
      case "south-indian-movies":
        return { title: "South Indian Action Dubbed Movies", subtitle: "Curated South Indian releases dubbed professionally in Hindi and Bangla." };
      case "malayalam-movies":
      case "malayalam":
        return { title: "Malayalam Movies HD Free Downloads", subtitle: "Download thrilling Malayalam movie encodes with fast speed Gofile links." };
      case "korean-drama":
      case "korean":
        return { title: "Korean Drama Series in Hindi Archive", subtitle: "Download complete Korean romance, thriller, and action-comedy series in Hindi Dual Audio." };
      case "hindi-series":
        return { title: "Hindi Season Packs & Web Series Archive", subtitle: "Download complete Hindi and dual-audio web series, season packs, and original drama shows containing fast Gofile storage mirrors." };
      default:
        const nameClean = activeCategory.split("-").map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
        return { title: `${nameClean} Archive`, subtitle: `Superfast direct files and crawlable indices for ${nameClean} collections.` };
    }
  };

  const catMeta = getCategoryMeta();

  return (
    <div id="search-catalogue-page" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      
      {/* Search description bar */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-l-3 border-red-600 pl-3">
        <div>
          <h1 className="text-xl font-extrabold uppercase tracking-tight text-white flex items-center gap-2">
            <Search className="h-5 w-5 text-red-500" /> {catMeta.title}
          </h1>
          <p className="text-xs text-neutral-400 mt-1">{catMeta.subtitle}</p>
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
