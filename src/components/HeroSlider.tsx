import React, { useState, useEffect } from "react";
import { Play, Info, Star, Bookmark, BookmarkCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Movie } from "../types";
import { motion, AnimatePresence } from "motion/react";

export const HeroSlider: React.FC = () => {
  const { allMovies, navigateToMovie, toggleBookmark, isBookmarked, setActiveTrailerId } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  // We filter to display movies tagged as "trending" or similar inside the slider scale
  const featuredMovies = allMovies.slice(0, 3);

  // Auto scroll effect
  useEffect(() => {
    if (featuredMovies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredMovies]);

  if (featuredMovies.length === 0) {
    return (
      <div className="h-[450px] w-full bg-neutral-900 border border-neutral-800 animate-pulse rounded-2xl flex items-center justify-center">
        <div className="text-neutral-500 font-mono text-sm leading-relaxed">Loading Cinemood Spotlight...</div>
      </div>
    );
  }

  const currentMovie = featuredMovies[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
  };

  return (
    <div className="relative group w-full overflow-hidden rounded-3xl bg-brand-dark border border-white/5 shadow-2xl h-[480px] sm:h-[540px] md:h-[600px] mb-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMovie.id}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7 }}
          className="relative h-full w-full"
        >
          {/* Backdrop Widescreen Image */}
          <img
            src={currentMovie.backdrop}
            alt={`${currentMovie.title} (${currentMovie.year}) spotlight slider banner - Cinemood`}
            width={1280}
            height={600}
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover object-center"
            fetchPriority="high"
          />

          {/* Vignette Overlays for deep cinematic feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/20 to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#050505_0%,transparent_100%)] opacity-80 z-0" />

          {/* Text/Content Container */}
          <div className="absolute inset-x-0 bottom-0 px-6 pb-12 pt-40 sm:px-12 md:pb-16 md:px-16 flex flex-col justify-end max-w-4xl z-10">
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-4"
            >
              {/* Quality & Meta labels */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded bg-brand-red px-2.5 py-0.5 text-[10px] font-sans font-black tracking-wider text-white shadow-lg uppercase">
                  Spotlight
                </span>
                <span className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-xs font-mono font-bold text-neutral-300">
                  {currentMovie.quality}
                </span>
                <span className="text-xs font-bold text-neutral-300">{currentMovie.year}</span>
                <span className="text-xs text-neutral-400">•</span>
                <span className="text-xs text-neutral-300">{currentMovie.duration}</span>
                <div className="flex items-center gap-1 font-mono text-xs font-bold text-yellow-500 bg-black/40 px-2 py-0.5 rounded-lg border border-white/5">
                  <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                  {currentMovie.imdbRating} IMDb
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-md">
                {currentMovie.title}
              </h1>

              {/* Storyline / Tagline */}
              <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 md:line-clamp-3 leading-relaxed max-w-2xl drop-shadow">
                {currentMovie.storyline}
              </p>

              {/* Main action triggers */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigateToMovie(currentMovie.id.toString())}
                  className="flex items-center gap-2 rounded-full bg-brand-red px-8 py-3.5 text-xs sm:text-sm font-bold text-white shadow-[0_0_20px_rgba(229,9,20,0.4)] hover:shadow-[0_0_25px_rgba(229,9,20,0.65)] hover:bg-brand-red-hover hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Play className="h-4 w-4 fill-white" />
                  WATCH NOW
                </button>

                <button
                  onClick={() => setActiveTrailerId(currentMovie.id.toString())}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 backdrop-blur-md px-8 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/20 hover:scale-105 transition-all cursor-pointer"
                >
                  <Info className="h-4 w-4" />
                  TRAILER
                </button>

                <button
                  onClick={() => toggleBookmark(currentMovie.id.toString())}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/60 hover:border-brand-red/40 text-neutral-300 hover:text-brand-red hover:scale-105 transition-all cursor-pointer"
                  title="Bookmark to Watchlist"
                >
                  {isBookmarked(currentMovie.id.toString()) ? (
                    <BookmarkCheck className="h-5 w-5 text-brand-red fill-brand-red" />
                  ) : (
                    <Bookmark className="h-5 w-5" />
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Controllers */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/5 bg-[#050505]/60 hover:bg-brand-red text-neutral-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all active:scale-95 cursor-pointer"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/5 bg-[#050505]/60 hover:bg-brand-red text-neutral-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all active:scale-95 cursor-pointer"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Slide Indicators dot lines */}
      <div className="absolute right-6 sm:right-12 bottom-6 z-20 flex gap-1.5">
        {featuredMovies.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${currentIndex === idx ? "w-6 bg-brand-red" : "w-1.5 bg-neutral-700 hover:bg-neutral-500"}`}
          />
        ))}
      </div>
    </div>
  );
};
