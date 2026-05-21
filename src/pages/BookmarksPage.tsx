import React from "react";
import { useApp } from "../context/AppContext";
import { MovieGrid } from "../components/MovieGrid";
import { Bookmark, ArrowLeft, Tv, Heart, Info } from "lucide-react";

export const BookmarksPage: React.FC = () => {
  const { bookmarks, allMovies, setView } = useApp();

  const savedMovies = allMovies.filter(m => bookmarks.includes(m.id.toString()));

  return (
    <div id="watchlist-catalogue" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-l-3 border-red-600 pl-3">
        <div>
          <h1 className="text-xl font-extrabold uppercase tracking-tight text-white flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-red-500 fill-red-500" /> My Cinemood Watchlist
          </h1>
          <p className="text-xs text-neutral-400 mt-1">Bookmarked stream reference prints stored locally for direct access</p>
        </div>
        <button
          onClick={() => setView("home")}
          className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-red-500 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to storefront
        </button>
      </div>

      {savedMovies.length > 0 ? (
        <div className="space-y-4">
          <p className="text-xs text-neutral-400 font-mono">
            You have <span className="text-red-500 font-bold">{savedMovies.length}</span> index bookmarks persisted. Click them to launch online streams.
          </p>
          <MovieGrid movies={savedMovies} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border border-neutral-900 bg-neutral-950/20 p-16 rounded-3xl text-center max-w-md mx-auto">
          <Bookmark className="h-12 w-12 text-neutral-700 stroke-[1.2] mb-4 animate-bounce" />
          <h3 className="text-neutral-300 font-bold text-lg">Your watchlist is currently vacant</h3>
          <p className="text-xs text-neutral-500 leading-relaxed mt-2">
            Explore the catalogs, hover over custom poster previews, or inspect detailed informational banners to save links instantly.
          </p>
          <button
            onClick={() => setView("home")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-red-500 hover:scale-101 active:scale-98 transition-all cursor-pointer"
          >
            Explore Movies Catalog
          </button>
        </div>
      )}
    </div>
  );
};
