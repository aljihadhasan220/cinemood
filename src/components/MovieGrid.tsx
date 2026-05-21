import React from "react";
import { MovieCard } from "./MovieCard";
import { Movie } from "../types";
import { Film, RefreshCw } from "lucide-react";

interface MovieGridProps {
  movies: Movie[];
  title?: string;
  subtitle?: string;
  loading?: boolean;
}

export const MovieGrid: React.FC<MovieGridProps> = ({ movies, title, subtitle, loading }) => {
  if (loading) {
    return (
      <div className="space-y-6 my-10" id="grid-loading">
        {title && (
          <div>
            <div className="h-6 w-48 bg-white/5 rounded animate-pulse" />
            <div className="h-3 w-32 bg-white/5 rounded mt-2 animate-pulse" />
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <div className="aspect-[2/3] w-full bg-white/5 border border-white/5 rounded-2xl animate-pulse" />
              <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse" />
              <div className="h-3 w-1/2 bg-white/5 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 my-10" id={`grid-${title?.toLowerCase().replace(/\s+/g, "-") || "catalog"}`}>
      {title && (
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between border-l-4 border-brand-red pl-3.5">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-white uppercase">{title}</h2>
            {subtitle && <p className="text-xs text-neutral-400 mt-1 font-sans">{subtitle}</p>}
          </div>
        </div>
      )}

      {movies.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border border-white/5 bg-white/5 p-12 rounded-2xl text-center">
          <Film className="h-10 w-10 text-neutral-600 stroke-[1.2] mb-3" />
          <h3 className="text-neutral-300 font-bold mb-1">No movies indices found</h3>
          <p className="text-xs text-neutral-500 max-w-sm">
            We currently don't have matching streaming nodes for this filter path. Reach out to request links on Telegram!
          </p>
        </div>
      )}
    </div>
  );
};
