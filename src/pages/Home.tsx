import React, { useEffect, useState } from "react";
import { HeroSlider } from "../components/HeroSlider";
import { CategorySlider } from "../components/CategorySlider";
import { MovieGrid } from "../components/MovieGrid";
import { useApp } from "../context/AppContext";
import { movieService } from "../services/movieService";
import { Movie } from "../types";
import { motion } from "motion/react";

export const Home: React.FC = () => {
  const { allMovies, isLoading } = useApp();

  const [trending, setTrending] = useState<Movie[]>([]);
  const [latest, setLatest] = useState<Movie[]>([]);
  const [latestSeries, setLatestSeries] = useState<Movie[]>([]);

  useEffect(() => {
    if (allMovies.length === 0) return;

    // Distribute data correctly based on categories & year
    const trendingFiltered = allMovies.filter(m => m.categories.includes("trending"));
    const trendingSorted = [...trendingFiltered].sort((a, b) => b.imdbRating - a.imdbRating);
    setTrending(trendingSorted);
    setLatest(allMovies.filter(m => m.categories.includes("latest")));
    setLatestSeries(allMovies.filter(m => m.categories.includes("web-series")));
  }, [allMovies]);

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

        {/* Latest Series */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <MovieGrid
            title="Latest Series"
            subtitle="Premium TV Shows and Multi-Audio Seasons newly updated"
            movies={latestSeries}
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

      </div>
    </div>
  );
};
