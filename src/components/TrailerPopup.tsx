import React from "react";
import { X, Film, Volume2, Star, Calendar } from "lucide-react";
import { useApp } from "../context/AppContext";
import { motion, AnimatePresence } from "motion/react";

export const TrailerPopup: React.FC = () => {
  const { activeTrailerId, setActiveTrailerId, allMovies } = useApp();

  const movie = allMovies.find(m => m.id === activeTrailerId);

  if (!movie) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="trailer-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
      >
        <motion.div
          id="trailer-modal"
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl"
        >
          {/* Top Bar info */}
          <div className="flex items-center justify-between border-b border-neutral-900 bg-neutral-900/60 px-6 py-4">
            <div className="flex items-center gap-3">
              <Film className="h-5 w-5 text-red-500" />
              <div>
                <h3 className="text-base font-bold text-neutral-100">{movie.title} - Official Trailer</h3>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-neutral-400">
                  <span className="flex items-center gap-0.5 font-mono text-yellow-500 font-bold">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    {movie.imdbRating}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5">
                    <Calendar className="h-3 w-3" />
                    {movie.year}
                  </span>
                  <span>•</span>
                  <span className="bg-neutral-800 text-neutral-300 font-sans px-1.5 py-0.2 rounded font-bold">{movie.quality}</span>
                </div>
              </div>
            </div>
            <button
              id="trailer-close-btn"
              onClick={() => setActiveTrailerId(null)}
              className="rounded-lg bg-neutral-800 p-2 text-neutral-400 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Direct Embedded Video Player Iframe */}
          <div className="relative aspect-video w-full bg-black">
            {movie.trailerUrl ? (
              <iframe
                id="trailer-iframe"
                src={`https://www.youtube.com/embed/${movie.trailerUrl}?autoplay=1&rel=0&modestbranding=1`}
                title={`${movie.title} Trailer`}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center p-8 text-neutral-500">
                <Volume2 className="h-12 w-12 text-neutral-600 mb-2 stroke-[1.2] animate-bounce" />
                <p className="text-sm font-semibold">Watch Online Stream Server is Currently Booting</p>
                <p className="text-xs text-neutral-600 mt-1">Please try again or select down links directly</p>
              </div>
            )}
          </div>

          {/* Quick info footer */}
          <div className="bg-neutral-900/40 p-5 px-6 border-t border-neutral-900">
            <p className="text-xs text-neutral-400 leading-relaxed italic">
              &ldquo;{movie.tagline || movie.storyline.slice(0, 100) + "..."}&rdquo;
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
