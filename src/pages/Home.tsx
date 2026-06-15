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

  const trending = React.useMemo(() => {
    const trendingFiltered = allMovies.filter(m => m.categories && m.categories.includes("trending"));
    return [...trendingFiltered].sort((a, b) => b.imdbRating - a.imdbRating);
  }, [allMovies]);

  const latest = React.useMemo(() => {
    return allMovies.filter(m => m.categories && m.categories.includes("latest"));
  }, [allMovies]);

  const latestSeries = React.useMemo(() => {
    return allMovies.filter(m => m.categories && m.categories.includes("web-series"));
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

        {/* 6. Brand SEO Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-t border-neutral-800 pt-16 font-sans space-y-8"
        >
          <div className="border-l-4 border-brand-red pl-4">
            <span className="text-[10px] font-mono font-bold tracking-widest text-brand-red uppercase">Platform Index</span>
            <h1 className="text-xl sm:text-2xl font-black text-neutral-100 uppercase tracking-tight font-sans">
              Cinemood - Download & Watch Latest Movies, Series & Anime in HD
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-neutral-400 leading-relaxed">
            <div className="space-y-4">
              <p>
                Welcome to <strong className="text-neutral-200">Cinemood</strong>, the web's ultimate destination for high-speed, direct movie and series indexing. Whether you are looking for premium <strong className="text-neutral-200">Cinemood Movies</strong> or high-speed <strong className="text-neutral-200">Cinemood Download</strong> portals, we provide an extensive, carefully curated archive designed for entertainment enthusiasts who demand the highest video quality. Our platform offers a seamless way to access and explore your favorite cinema titles with completely unblocked and ultra-fast storage links.
              </p>
              <h3 className="text-base font-bold text-neutral-200 uppercase tracking-wider font-sans">
                Cinemood Movies &amp; Cinematic Genres
              </h3>
              <p>
                At Cinemood, we categorize and organize thousands of premium films, including action-packed dual-audio releases, classic blockbusters, and indie sensations. Experience <strong className="text-neutral-200">Cinemood Movies</strong> at their absolute best, complete with high-definition posters, real-time IMDb ratings, comprehensive storylines, and official trailer embeds. Our database allows you to instantly search and filter files by genres such as Romance, Action, Crime, Mystery, Drama, and Thriller.
              </p>
              <h3 className="text-base font-bold text-neutral-200 uppercase tracking-wider font-sans">
                High-Speed Cinemood Downloads
              </h3>
              <p>
                Frustrated by infinite redirects, deceptive pop-up ads, and broken links? The <strong className="text-neutral-200">Cinemood Download</strong> system provides a breath of fresh air. Every title listed in our archive is backed by reliable direct download mirrors on ultra-fast servers like Gofile, Google Drive, and Telegram fast server channels. We support multiple audio profiles and resolutions, including 480P, 720P, 1080P, and pristine DS4K WEB-DL encodes, giving you full control over your bandwidth and storage preference.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-bold text-neutral-200 uppercase tracking-wider font-sans">
                Cinemood Bengali Movies &amp; Localized Cinema
              </h3>
              <p>
                Cinemood is highly optimized for local regional cataloging. Our <strong className="text-neutral-200">Cinemood Bengali Movies</strong> archives feature Kolkata blockbusters, ZEE5 original series, Hoichoi films, and premium Bengali-dubbed international productions. Keep up-to-date with the latest local hits, fully packed with original language tracks or crisp, professional Bengali voice-overs designed for an optimal family-viewing experience.
              </p>
              <h3 className="text-base font-bold text-neutral-200 uppercase tracking-wider font-sans">
                Cinemood Dual Audio Movies &amp; Web Series
              </h3>
              <p>
                Expand your entertainment horizons with <strong className="text-neutral-200">Cinemood Dual Audio Movies</strong> and complete seasons of <strong className="text-neutral-200">Cinemood Web Series</strong>. We index the highest-quality releases from major streaming giants such as Netflix, Amazon Prime, Disney+, Hotstar, and JioHotstar. Navigate through dual-audio combinations like [English-Hindi-Bangla] or [Hindi-Korean] with easy audio track switching.
              </p>
              <p>
                From mind-boggling school thriller anime to intense crime drama web series, find both ongoing and completed television series in full-season packages. Cinemood remains fully committed to maintaining absolute crawlability and offering clean indexing archives to global movie lovers.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
