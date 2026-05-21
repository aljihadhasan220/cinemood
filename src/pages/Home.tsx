import React, { useEffect, useState } from "react";
import { HeroSlider } from "../components/HeroSlider";
import { CategorySlider } from "../components/CategorySlider";
import { MovieGrid } from "../components/MovieGrid";
import { useApp } from "../context/AppContext";
import { movieService } from "../services/movieService";
import { Movie } from "../types";
import { Flame, Clock, Play, Trash, Send, Star, Film } from "lucide-react";
import { motion } from "motion/react";

export const Home: React.FC = () => {
  const { allMovies, continueWatching, clearContinueWatching, navigateToMovie, isLoading } = useApp();

  const [trending, setTrending] = useState<Movie[]>([]);
  const [latest, setLatest] = useState<Movie[]>([]);
  const [recentlyAdded, setRecentlyAdded] = useState<Movie[]>([]);

  useEffect(() => {
    if (allMovies.length === 0) return;

    // Distribute data correctly based on categories & year
    setTrending(allMovies.filter(m => m.categories.includes("trending")));
    setLatest(allMovies.filter(m => m.categories.includes("latest")));
    
    // Sort recently added by year desc then grab first 6
    const sorted = [...allMovies].sort((a, b) => b.year - a.year);
    setRecentlyAdded(sorted.slice(0, 6));
  }, [allMovies]);

  // Read continue watching references
  const continueWatchingItems = continueWatching
    .map(cw => {
      const match = allMovies.find(m => m.id === cw.movieId);
      if (!match) return null;
      return { ...match, percentage: cw.watchedPercentage };
    })
    .filter(Boolean) as (Movie & { percentage: number })[];

  return (
    <div id="home-page" className="space-y-16 pb-20">
      {/* 1. Hero Spotlight Carousel (Featured Banner) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSlider />
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
        {/* 2. Interactive Category Tabs & Search Refinement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-brand-red pl-4">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-brand-red uppercase">Refine Catalog</span>
              <h2 className="text-lg sm:text-xl font-black text-neutral-100 uppercase tracking-tight font-sans">
                Browse by Category
              </h2>
            </div>
            <p className="text-xs text-neutral-400 max-w-xs font-sans">
              Filter manually curated high quality 4K and 1080p release prints
            </p>
          </div>
          <CategorySlider />
        </motion.div>

        {/* 3. Continue Watching Shelf (Dynamic) */}
        {continueWatchingItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            id="continue-watching-shelf"
            className="relative bg-[#0d0d0d]/40 border border-white/5 rounded-3xl p-6 sm:p-8 overflow-hidden backdrop-blur-md"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-red/5 to-transparent pointer-events-none" />
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-brand-red" />
                <h3 className="text-sm font-black uppercase text-neutral-100 tracking-wide font-sans">Continue Watching</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {continueWatchingItems.map(item => (
                <div
                  key={item.id}
                  className="group relative flex items-center gap-3 bg-black/40 border border-white/5 p-3 rounded-2xl hover:border-brand-red/30 transition-all overflow-hidden"
                >
                  <img
                    src={item.poster}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="h-14 w-10 object-cover rounded-md shadow border border-white/5"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-neutral-200 truncate group-hover:text-brand-red transition-colors">
                      {item.title}
                    </h4>
                    
                    {/* Progress tracking line */}
                    <div className="mt-2.5 w-full bg-neutral-900 h-1 rounded-full overflow-hidden">
                      <div
                        className="bg-brand-red h-full rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2 text-[10px] text-neutral-400 font-mono">
                      <span>{item.percentage}% played</span>
                      <button
                        onClick={() => navigateToMovie(item.id.toString())}
                        className="text-brand-red hover:text-white flex items-center gap-0.5 font-bold font-sans cursor-pointer transition-colors"
                      >
                        <Play className="h-2.5 w-2.5 fill-brand-red" />
                        Resume
                      </button>
                    </div>
                  </div>

                  {/* Clean item delete click marker */}
                  <button
                    onClick={() => clearContinueWatching(item.id.toString())}
                    className="p-1.5 rounded-lg bg-neutral-950/80 text-neutral-400 hover:bg-neutral-900 hover:text-brand-red opacity-0 group-hover:opacity-100 transition-opacity ml-2 pointer-events-auto cursor-pointer border border-white/5"
                    title="Remove from history"
                  >
                    <Trash className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 4. Latest Movies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <MovieGrid
            title="Latest Movies"
            subtitle="Newly encoded multi-audio and HD quality stream prints"
            movies={latest}
            loading={isLoading}
          />
        </motion.div>

        {/* 5. Trending Uploads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <MovieGrid
            title="Trending Uploads"
            subtitle="Most referenced and frequently downloaded hits of the week"
            movies={trending}
            loading={isLoading}
          />
        </motion.div>

        {/* 6. Recently Added */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <MovieGrid
            title="Recently Added"
            subtitle="Fresh arrivals listed directly inside the Cinemood archive database"
            movies={recentlyAdded}
            loading={isLoading}
          />
        </motion.div>

      </div>
    </div>
  );
};
