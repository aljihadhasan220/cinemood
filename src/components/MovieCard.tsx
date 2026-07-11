import React, { useState } from "react";
import { Play, Download, Star, Bookmark, BookmarkCheck, Sparkles, Tv } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Movie } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { navigateToMovie, toggleBookmark, isBookmarked, setActiveTrailerId } = useApp();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      id={`movie-card-${movie.id}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col overflow-hidden rounded-2xl bg-white/5 border border-white/5 group cursor-pointer shadow-lg hover:border-brand-red/30 transition-all select-none will-change-transform"
    >
      {/* Aspect Ratio 2:3 Poster Frame */}
      <a 
        href={`/movie/${movie.id}`}
        onClick={(e) => {
          e.preventDefault();
          navigateToMovie(movie.id.toString());
        }}
        className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-950 block"
      >
        <img
          src={movie.poster}
          alt={`Download ${movie.title} (${movie.year}) poster - Cinemood`}
          width={340}
          height={510}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Dynamic Badges on top of poster */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-10">
          <span className="rounded bg-brand-red px-2 py-0.5 text-[9px] font-sans font-black tracking-wider text-white shadow-lg uppercase">
            {movie.quality}
          </span>
          {movie.language.toLowerCase().includes("dual") && (
            <span className="rounded bg-blue-600/95 px-1.5 py-0.5 text-[9px] font-semibold text-white uppercase flex items-center gap-0.5 shadow-sm">
              <Tv className="h-2.5 w-2.5" />
              Dual
            </span>
          )}
        </div>

        {/* IMDb Badge to right */}
        <div className="absolute right-3 top-3 z-10 flex items-center gap-0.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-mono font-bold text-yellow-500 backdrop-blur-md">
          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
          {movie.imdbRating}
        </div>

        {/* Hover Trailer Overlay / Cinematic Actions */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent flex flex-col justify-end p-4 z-20"
            >
              {/* Play / Trailer Hover Trigger button */}
              <div className="flex justify-center gap-2 mb-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToMovie(movie.id.toString());
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red text-white hover:bg-brand-red-hover hover:scale-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(229,9,20,0.5)] cursor-pointer"
                  title="Watch Online Stream"
                >
                  <Play className="h-4.5 w-4.5 fill-white ml-0.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTrailerId(movie.id.toString());
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#151515] border border-white/5 text-neutral-200 hover:bg-[#202020] hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  title="Watch Trailer Effect"
                >
                  <Sparkles className="h-4.5 w-4.5 text-brand-red" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(movie.id.toString());
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#151515] border border-white/5 text-neutral-200 hover:text-brand-red hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  title="Add to Watch Later"
                >
                  {isBookmarked(movie.id.toString()) ? (
                    <BookmarkCheck className="h-4.5 w-4.5 text-brand-red fill-brand-red" />
                  ) : (
                    <Bookmark className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>

              {/* Tagline / Subtitle preview */}
              <p className="text-[10px] text-neutral-400 font-sans italic text-center line-clamp-2 px-1">
                &ldquo;{movie.tagline || movie.storyline.slice(0, 50) + "..."}&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </a>

      {/* Card Info Details */}
      <div 
        className="p-3.5 flex flex-col justify-between flex-1 gap-1.5 text-left block"
      >
        <a
          href={`/movie/${movie.id}`}
          onClick={(e) => {
            e.preventDefault();
            navigateToMovie(movie.id.toString());
          }}
          className="space-y-1 block hover:no-underline group/link"
        >
          <p className="font-mono text-[9px] font-extrabold uppercase tracking-widest text-brand-red">
            {movie.genres.slice(0, 2).join(" / ")}
          </p>
          <h3 className="text-xs sm:text-sm font-bold text-neutral-100 line-clamp-1 group-hover/link:text-brand-red transition-colors">
            {movie.title}
          </h3>
        </a>

        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <span>{movie.year}</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] px-1.5 py-0.5 rounded border border-white/5 bg-white/5 text-neutral-400">
              {movie.duration}
            </span>
            <a
              href={`/download/${movie.id}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigateToMovie(movie.id.toString(), "download");
              }}
              className="text-neutral-400 hover:text-brand-red p-1 cursor-pointer block"
              title="Download Links Server"
            >
              <Download className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
