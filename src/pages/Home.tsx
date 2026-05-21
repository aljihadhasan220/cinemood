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
  const [banglaDubbed, setBanglaDubbed] = useState<Movie[]>([]);
  const [dualAudio, setDualAudio] = useState<Movie[]>([]);
  const [anime, setAnime] = useState<Movie[]>([]);
  const [netflixSeries, setNetflixSeries] = useState<Movie[]>([]);
  const [topImdb, setTopImdb] = useState<Movie[]>([]);
  const [actionList, setActionList] = useState<Movie[]>([]);
  const [recommended, setRecommended] = useState<Movie[]>([]);

  useEffect(() => {
    if (allMovies.length === 0) return;

    // Distribute data correctly based on categories
    setTrending(allMovies.filter(m => m.categories.includes("trending")));
    setLatest(allMovies.filter(m => m.categories.includes("latest")));
    setBanglaDubbed(allMovies.filter(m => m.categories.includes("bangla-dubbed")));
    setDualAudio(allMovies.filter(m => m.categories.includes("dual-audio")));
    setAnime(allMovies.filter(m => m.categories.includes("anime")));
    setNetflixSeries(allMovies.filter(m => m.categories.includes("netflix-series")));
    setActionList(allMovies.filter(m => m.categories.includes("action")));
    setRecommended(allMovies.filter(m => m.categories.includes("recommended")));

    // Top IMDb gets sorted dynamically
    const sorted = [...allMovies].sort((a, b) => b.imdbRating - a.imdbRating);
    setTopImdb(sorted.slice(0, 6));
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
    <div id="home-page" className="space-y-12">
      {/* 1. Hero Spotlight Carousel */}
      <HeroSlider />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 2. Interactive Category Tabs */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-brand-red fill-brand-red animate-pulse" />
            <h2 className="text-md font-extrabold uppercase tracking-wide text-neutral-200">Refine Genre Stream</h2>
          </div>
          <CategorySlider />
        </div>

        {/* 3. Continue Watching Shelf (Dynamic) */}
        {continueWatchingItems.length > 0 && (
          <div id="continue-watching-shelf" className="relative bg-white/5 border border-white/5 rounded-2xl p-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-red/5 to-transparent pointer-events-none" />
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Clock className="h-4.5 w-4.5 text-brand-red" />
                <h2 className="text-base font-black uppercase text-neutral-100">Continue Watching</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {continueWatchingItems.map(item => (
                <div
                  key={item.id}
                  className="group relative flex items-center gap-3 bg-black/60 border border-white/5 p-2.5 rounded-xl hover:border-brand-red/20 transition-all overflow-hidden"
                >
                  <img
                    src={item.poster}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="h-14 w-10 object-cover rounded shadow"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-neutral-200 truncate group-hover:text-brand-red transition-colors">
                      {item.title}
                    </h4>
                    
                    {/* Progress tracking line */}
                    <div className="mt-2 w-full bg-neutral-800 h-1 rounded-full overflow-hidden">
                      <div
                        className="bg-brand-red h-full rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1.5 text-[10px] text-neutral-400 font-mono">
                      <span>{item.percentage}% played</span>
                      <button
                        onClick={() => navigateToMovie(item.id.toString())}
                        className="text-brand-red hover:text-white flex items-center gap-0.5 font-bold font-sans cursor-pointer"
                      >
                        <Play className="h-2.5 w-2.5 fill-brand-red" />
                        Resume
                      </button>
                    </div>
                  </div>

                  {/* Clean item delete click marker */}
                  <button
                    onClick={() => clearContinueWatching(item.id.toString())}
                    className="p-1 rounded bg-neutral-900/40 text-neutral-400 hover:bg-neutral-800 hover:text-brand-red opacity-0 group-hover:opacity-100 transition-opacity ml-2 pointer-events-auto cursor-pointer"
                    title="Remove from history"
                  >
                    <Trash className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Trending Section */}
        <MovieGrid
          title="Trending Blockbusters"
          subtitle="Most index-referenced and downloaded blockbusters this week"
          movies={trending}
          loading={isLoading}
        />

        {/* 5. Latest Uploads */}
        <MovieGrid
          title="Latest Uploads"
          subtitle="Newly encoded multi-audio and HD quality stream prints"
          movies={latest}
          loading={isLoading}
        />

        {/* 6. Ad Banner Section (Netflix styled Promo) */}
        <div id="home-promo-banner" className="relative p-8 md:p-12 overflow-hidden rounded-3xl bg-[#0d0d0d] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-red/10 via-[#0d0d0d]/40 to-transparent pointer-events-none" />
          <div className="relative space-y-2 z-10 max-w-xl text-center md:text-left">
            <span className="text-[10px] font-mono font-extrabold text-brand-red tracking-wider uppercase">Official Telegram Node</span>
            <h3 className="text-xl sm:text-2xl font-black text-white">Never miss high speed stream update again</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We update Gofile limits, post direct download mirrors, and announce dual audio request approvals inside our network hub. Joint the group now!
            </p>
          </div>
          <a
            href="https://t.me/cinemood_channel"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center gap-2 rounded-xl bg-brand-red px-6 py-3.5 text-xs font-bold text-white shadow-[0_4px_15px_rgba(229,9,20,0.3)] hover:bg-brand-red-hover hover:scale-105 active:scale-95 transition-all cursor-pointer z-10"
          >
            <Send className="h-4 w-4 fill-white" />
            Join @cinemood_channel
          </a>
        </div>

        {/* 7. Bangla Dubbed Movies */}
        <MovieGrid
          title="Bangla Dubbed & Locals"
          subtitle="High fidelity native voiceovers for international hits"
          movies={banglaDubbed}
          loading={isLoading}
        />

        {/* 8. Dual Audio Releases */}
        <MovieGrid
          title="Dual Audio Releases"
          subtitle="Toggle languages instantly between English, Bangla, and Hindi"
          movies={dualAudio}
          loading={isLoading}
        />

        {/* 9. Anime Sagas */}
        <MovieGrid
          title="Anime & Cosplay Series"
          subtitle="Subbed, Dubbed, and 4K resolution anime masterworks"
          movies={anime}
          loading={isLoading}
        />

        {/* 10. Netflix Exclusive Series */}
        <MovieGrid
          title="Netflix Premium Series"
          subtitle="Complete episode packs with super-speed download links"
          movies={netflixSeries}
          loading={isLoading}
        />

        {/* 11. Custom Split layout (IMDb Grid + Action) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Top IMDb column list */}
          <div className="lg:col-span-1 bg-[#0d0d0d] border border-white/5 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="border-b border-white/5 pb-3 flex items-center justify-between">
              <h3 className="text-md font-extrabold uppercase tracking-tight text-white">Top IMDb Reviews</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 font-bold border border-amber-500/20">Global Hits</span>
            </div>
            <div className="space-y-4">
              {topImdb.map((m, idx) => (
                <div
                  key={m.id}
                  onClick={() => navigateToMovie(m.id.toString())}
                  className="flex items-center gap-3 hover:bg-white/5 p-1.5 rounded-xl cursor-pointer transition-all"
                >
                  <span className="font-mono text-lg font-black text-neutral-500 w-5 text-center">
                    {idx + 1}
                  </span>
                  <img
                    src={m.poster}
                    alt={m.title}
                    referrerPolicy="no-referrer"
                    className="h-14 w-10 object-cover rounded shadow border border-white/5"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-neutral-100 truncate hover:text-brand-red">
                      {m.title}
                    </h4>
                    <p className="text-[10px] text-neutral-400 mt-1 flex items-center gap-1">
                      <span>{m.year}</span>
                      <span>•</span>
                      <span className="bg-[#202020] text-neutral-300 px-1 rounded uppercase text-[8px] font-bold">{m.quality}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5 text-xs text-yellow-500 font-mono font-bold">
                    <Star className="h-3 w-3 fill-yellow-500" />
                    {m.imdbRating}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Column Grid lists */}
          <div className="lg:col-span-2">
            <MovieGrid
              title="Pulse-Pounding Action"
              subtitle="Gunfights, car-chases, and explosive martial arts blockbusters"
              movies={actionList}
              loading={isLoading}
            />
          </div>
        </div>

        {/* 12. Recommended Row */}
        <MovieGrid
          title="Recommended For You"
          subtitle="AI personalized selections based on continue watching analytics"
          movies={recommended}
          loading={isLoading}
        />
      </div>
    </div>
  );
};
