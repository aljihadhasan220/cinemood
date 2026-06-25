import React, { useState, useEffect } from "react";
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
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  // Automatically reset to page 1 if the filtered movies list changes
  useEffect(() => {
    setCurrentPage(1);
  }, [movies]);

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

  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const indexOfLastMovie = currentPage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Generates exactly the requested range pattern: 1 2 3 ... Last
  const getPaginationRange = () => {
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, "...", "Last"];
    }
    if (currentPage >= totalPages) {
      return [1, 2, 3, "...", "Last"];
    }
    return [1, "...", currentPage, "...", "Last"];
  };

  const handlePageClick = (page: number | string) => {
    if (page === "...") return;
    if (page === "Last") {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(Number(page));
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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

      {currentMovies.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {currentMovies.map((movie) => (
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

      {/* Pagination Controls - hidden if 20 or fewer items */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-10 pt-6 border-t border-white/5 font-sans">
          {getPaginationRange().map((page, idx) => {
            const isActive =
              (page === "Last" && currentPage === totalPages) ||
              (typeof page === "number" && currentPage === page);

            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-1.5 sm:px-2 py-1.5 text-xs sm:text-sm text-neutral-500 select-none font-bold"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={`page-${page}-${idx}`}
                onClick={() => handlePageClick(page)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? "bg-brand-red text-white shadow-[0_0_15px_rgba(229,9,20,0.4)]"
                    : "bg-white/5 border border-white/5 text-neutral-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={handleNextClick}
            disabled={currentPage === totalPages}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              currentPage === totalPages
                ? "bg-white/5 border border-white/5 text-neutral-600 opacity-40 cursor-not-allowed"
                : "bg-white/5 border border-white/5 text-neutral-300 hover:bg-white/10 hover:text-white cursor-pointer"
            }`}
          >
            Next &gt;
          </button>
        </div>
      )}
    </div>
  );
};
