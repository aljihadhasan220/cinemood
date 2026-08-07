import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Movie, Review } from "../types";
import { movieService } from "../services/movieService";
import {
  Play,
  Download,
  Star,
  Bookmark,
  BookmarkCheck,
  Calendar,
  Clock,
  ArrowLeft,
  Tv,
  Users,
  Image as ImageIcon,
  MessageSquare,
  Sparkles,
  ShieldAlert,
  HelpCircle,
  TrendingUp,
  RotateCcw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { MovieCard } from "../components/MovieCard";
import { SocialBarManager } from "../components/SocialBarManager";

export const DetailPage: React.FC = () => {
  const {
    selectedMovieId,
    setView,
    toggleBookmark,
    isBookmarked,
    addContinueWatching,
    setActiveTrailerId,
    setActiveCategory,
    setFilters,
    setSearchQuery
  } = useApp();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [related, setRelated] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  // Streaming Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerProgress, setPlayerProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Review Form state
  const [newAuthor, setNewAuthor] = useState("");
  const [newRating, setNewRating] = useState(10);
  const [newContent, setNewContent] = useState("");
  const [savingReview, setSavingReview] = useState(false);

  // Screenshot Lightbox
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!selectedMovieId) return;
      try {
        setLoading(true);
        // Fetch Movie Details
        const m = await movieService.getMovieById(selectedMovieId);
        if (m) {
          setMovie(m);
          // Fetch Reviews
          const revs = await movieService.getReviews(m.id.toString());
          setReviews(revs);
          // Fetch Related
          const recs = await movieService.getRecommended(m.id);
          setRelated(recs);
        }
      } catch (e) {
        console.error("Error loading detail info", e);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
    // Reset player on movie change unless #stream hash is present
    if (window.location.hash === "#stream") {
      setIsPlaying(true);
      setTimeout(() => {
        const pEl = document.getElementById("player-container-node");
        if (pEl) {
          pEl.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    } else {
      setIsPlaying(false);
    }
    setPlayerProgress(0);
  }, [selectedMovieId]);

  // Player progress interval tracker
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && movie) {
      interval = setInterval(() => {
        setPlayerProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, movie]);

  useEffect(() => {
    if (isPlaying && movie && playerProgress > 0) {
      addContinueWatching(movie.id.toString(), playerProgress);
    }
  }, [playerProgress, isPlaying, movie, addContinueWatching]);

  if (loading) {
    return (
      <div id="detail-skeleton" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-8 animate-pulse">
        <div className="h-10 w-24 bg-white/5 rounded-xl animate-pulse" />
        <div className="h-[400px] bg-white/5 rounded-3xl animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 h-64 bg-white/5 rounded-2xl animate-pulse" />
          <div className="h-64 bg-white/5 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center">
        <h3 className="text-xl font-bold text-neutral-200">Index record unavailable</h3>
        <p className="text-sm text-neutral-500 mt-2">The movie you requested has been unmapped or moved.</p>
        <button
          onClick={() => setView("home")}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 text-xs font-bold text-white shadow-[0_0_20px_rgba(229,9,20,0.4)] hover:bg-brand-red-hover"
        >
          <ArrowLeft className="h-4 w-4" /> Go Back Home
        </button>
      </div>
    );
  }

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    try {
      setSavingReview(true);
      const added = await movieService.addReview(
        movie.id.toString(),
        newAuthor.trim() || "Anonymous Reader",
        newRating,
        newContent.trim()
      );
      setReviews(prev => [added, ...prev]);
      setNewAuthor("");
      setNewRating(10);
      setNewContent("");
    } catch {
      console.error("Failed to append review");
    } finally {
      setSavingReview(false);
    }
  };

  const handleTriggerPlay = () => {
    try {
      window.open("https://eternalwheeled.com/mjhr1b5qb?key=bd35010fe9ea077642babfaec7258267", "_blank", "noopener,noreferrer");
    } catch {
      // ignore popup blocker error
    }
    setIsPlaying(true);
    // Smooth scroll down to streaming player node
    setTimeout(() => {
      const pEl = document.getElementById("player-container-node");
      if (pEl) {
        pEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const formattedTime = (percentage: number) => {
    const totalMinutes = 134; // standard base
    const currentMin = Math.floor((percentage / 100) * totalMinutes);
    const h = Math.floor(currentMin / 60);
    const m = currentMin % 60;
    return `${h}h ${m < 10 ? "0" + m : m}m / 2h 14m`;
  };

  return (
    <div id={`detail-page-${movie.id}`} className="relative">
      
      {/* Cinematic Hero backdrop container */}
      <div className="relative h-[480px] md:h-[600px] lg:h-[650px] w-full overflow-hidden">
        <img
          src={movie.backdrop}
          alt={`${movie.title} (${movie.year}) cinematic backdrop - Cinemood`}
          width={1280}
          height={720}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-top"
          fetchPriority="high"
        />
        {/* Gradients to merge into black styling */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/20 to-transparent" />

        {/* Dynamic header navigation path back to directory */}
        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <button
            onClick={() => setView("home")}
            className="inline-flex items-center gap-2 bg-black/60 border border-white/5 hover:border-brand-red/30 px-4 py-2 text-xs font-bold text-neutral-200 hover:text-brand-red rounded-xl transition-all shadow-xl cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 stroke-[2.2]" />
            Back to Directory
          </button>
        </div>
      </div>

      {/* Overlapping Content Matrix */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-72 md:-mt-96 pb-20 space-y-16">
        
        {/* Core Movie Info Sheet */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 items-end">
          
          {/* Vertical Movie Poster */}
          <div className="md:col-span-1 mx-auto max-w-xs md:max-w-none w-full">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl border border-white/5 shadow-2xl bg-black aspect-[2/3]"
            >
              <img
                src={movie.poster}
                alt={`${movie.title} (${movie.year}) official poster - Cinemood`}
                width={300}
                height={450}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-brand-red font-sans font-black text-[10px] tracking-wider text-white px-2.5 py-0.5 rounded shadow">
                {movie.quality}
              </div>
            </motion.div>
          </div>

          {/* Text Summary Info Sheet */}
          <div className="md:col-span-3 space-y-5">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 font-mono text-xs font-bold text-yellow-500 bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-lg">
                  <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                  {movie.imdbRating} IMDb
                </div>
                <span className="text-xs text-neutral-400">•</span>
                <span className="flex items-center gap-1 text-xs text-neutral-300">
                  <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                  {movie.year}
                </span>
                <span className="text-xs text-neutral-400">•</span>
                <span className="flex items-center gap-1 text-xs text-neutral-300">
                  <Clock className="h-3.5 w-3.5 text-neutral-400" />
                  {movie.duration}
                </span>
                <span className="text-xs text-neutral-400">•</span>
                <span className="text-xs px-2.5 py-0.5 rounded bg-white/5 border border-white/5 text-neutral-300 uppercase font-mono">
                  {movie.language}
                </span>
              </div>

              <h1 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl tracking-tight leading-none">
                {movie.title}
              </h1>
              {movie.originalTitle && movie.originalTitle !== movie.title && (
                <p className="text-sm text-neutral-400 font-mono">Original: {movie.originalTitle}</p>
              )}
              {(movie as any).fullTitle && (
                <div className="text-xs text-brand-red/90 bg-brand-red/5 border border-brand-red/15 rounded-xl p-3 font-mono leading-relaxed select-all">
                  <span className="block text-[9px] uppercase tracking-widest text-brand-red/80 font-bold mb-1 font-sans">Index Print String</span>
                  {(movie as any).fullTitle}
                </div>
              )}
              {/* Category & Genre Crawler-Ready Internal Links */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {movie.genres.map((g, idx) => (
                  <button
                    key={`g-${idx}`}
                    onClick={() => {
                      setActiveCategory(null);
                      setFilters({
                        genre: g,
                        year: "All",
                        quality: "All",
                        rating: 0
                      });
                      setSearchQuery("");
                      setView("search");
                    }}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded bg-[#141414] border border-white/5 text-neutral-400 hover:text-white hover:border-brand-red/40 transition-all cursor-pointer"
                  >
                    {g} Movie
                  </button>
                ))}
                {movie.categories.map((c, idx) => {
                  const label = c.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
                  return (
                    <button
                      key={`c-${idx}`}
                      onClick={() => {
                        setActiveCategory(c);
                        setView("search");
                      }}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded bg-brand-red/10 border border-brand-red/20 text-brand-red hover:bg-brand-red hover:text-white transition-all cursor-pointer"
                    >
                      {label} Archive
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="text-sm md:text-base text-neutral-300 leading-relaxed max-w-3xl font-sans text-justify">
              {movie.storyline.length < 250 ? movie.storyline + " In this gripping screenplay, the boundaries of survival and reality are constantly pushed as characters are tested both mentally and physically in environments designed of cinematic depth." : movie.storyline}
            </p>

            {/* Quick Action Triggers */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              
              <button
                onClick={handleTriggerPlay}
                className="flex items-center gap-2 rounded-full bg-brand-red px-8 py-3.5 text-xs sm:text-sm font-bold text-white shadow-[0_0_20px_rgba(229,9,20,0.4)] hover:shadow-[0_0_25px_rgba(229,9,20,0.65)] hover:bg-brand-red-hover hover:scale-105 active:scale-95 transition-all cursor-pointer animate-pulse"
              >
                <Play className="h-4.5 w-4.5 fill-white" />
                Stream Live Online
              </button>

              <button
                onClick={() => setView("download")}
                className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 hover:border-brand-red/30 px-8 py-3.5 text-xs sm:text-sm font-bold text-neutral-200 hover:text-white transition-all cursor-pointer"
              >
                <Download className="h-4.5 w-4.5 text-brand-red" />
                Go to Down links
              </button>

              <button
                onClick={() => setActiveTrailerId(movie.id.toString())}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 hover:bg-white/10 px-6 py-3.5 text-xs sm:text-sm font-semibold text-neutral-300 transition-all cursor-pointer"
              >
                Play Trailer Popup
              </button>

              <button
                onClick={() => toggleBookmark(movie.id.toString())}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 hover:border-brand-red/30 text-neutral-400 hover:text-brand-red transition-all cursor-pointer"
                title="Save into watchlist"
              >
                {isBookmarked(movie.id.toString()) ? (
                  <BookmarkCheck className="h-5 w-5 text-brand-red fill-brand-red" />
                ) : (
                  <Bookmark className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Live Interactive Streaming Video Player simulation mockup */}
        <div id="player-container-node" className="space-y-4 pt-8 border-t border-white/5">
          <div className="border-l-4 border-brand-red pl-3">
            <h3 className="text-md font-bold text-neutral-100 uppercase flex items-center gap-2">
              <Tv className="h-4 w-4 text-brand-red" /> Live Stream Simulation Node
            </h3>
            <p className="text-xs text-neutral-400 mt-1">Simulated VPS CDN server stream matching index quality of {movie.quality}</p>
          </div>

          <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white/5 bg-black hover:border-brand-red/10 transition-colors shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
            {isPlaying ? (
              <div className="absolute inset-0 flex flex-col bg-black">
                <SocialBarManager />
                {movie.watchOnlineUrl ? (
                  <iframe
                    src={movie.watchOnlineUrl}
                    title={`${movie.title} Stream Live`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col justify-end">
                    {/* Simulated playing image backdrop with micro movement */}
                    <img
                      src={movie.backdrop}
                      alt="streaming"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover blur-xs opacity-40 scale-102"
                    />

                    {/* Simulated playback visual pulses */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="p-5 rounded-full bg-brand-red/10 border border-brand-red/40 animate-ping h-12 w-12 absolute" />
                      <div className="relative text-center space-y-2 z-10 px-4">
                        <p className="text-xs font-mono font-bold text-brand-red uppercase tracking-widest animate-pulse">Streaming Session Active</p>
                        <h4 className="text-lg font-black text-white">{movie.title}</h4>
                        <p className="text-[10px] text-neutral-400">Storing progress checkpoint in your history cards...</p>
                      </div>
                    </div>

                    {/* Simulated video dashboard controllers */}
                    <div className="relative z-10 bg-gradient-to-t from-black via-black/80 to-transparent p-6 space-y-4">
                      {/* Progress Line */}
                      <div className="space-y-1.5">
                        <div className="relative w-full bg-neutral-800 h-1.5 rounded-full cursor-pointer">
                          <div
                            className="bg-brand-red h-full rounded-full relative"
                            style={{ width: `${playerProgress}%` }}
                          >
                            <div className="absolute -right-1.5 -top-1 h-3.5 w-3.5 rounded-full bg-brand-red shadow border-2 border-white" />
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-[10px] text-neutral-400 font-mono">
                          <span>{formattedTime(playerProgress)}</span>
                          <span>Buffered 100%</span>
                        </div>
                      </div>

                      {/* Operational controls */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setIsPlaying(false)}
                            className="p-1 rounded bg-white/5 text-neutral-200 hover:text-brand-red cursor-pointer text-xs font-semibold px-2.5 py-1"
                          >
                            Pause Stream
                          </button>
                          <button
                            onClick={() => setPlayerProgress(0)}
                            className="flex items-center gap-1 text-[10px] text-neutral-400 hover:text-white cursor-pointer"
                            title="Reset playback slider"
                          >
                            <RotateCcw className="h-3 w-3" /> Reset
                          </button>
                        </div>

                        <div className="flex items-center gap-4 text-[10px] text-neutral-400 font-mono">
                          <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="hover:text-brand-red cursor-pointer"
                          >
                            {isMuted ? "🔇 Unmute Audio" : "🔊 Audio Dual"}
                          </button>
                          <span className="hidden sm:inline">CDN: Frankfurt Alpha</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-black/90 text-neutral-300">
                <img
                  src={movie.backdrop}
                  alt={`${movie.title} (${movie.year}) video streaming player thumbnail - Cinemood`}
                  width={800}
                  height={450}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale"
                  loading="lazy"
                />
                <div className="relative z-10 max-w-md space-y-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-red shadow-[0_0_20px_rgba(229,9,20,0.5)] cursor-pointer hover:scale-110 active:scale-95 transition-transform" onClick={() => setIsPlaying(true)}>
                    <Play className="h-6 w-6 text-white fill-white ml-1" />
                  </div>
                  <h4 className="text-base font-bold text-neutral-100 uppercase tracking-wide">Start Streaming Session</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Instantly stream from the fastest available VPS node in 1080p high definition directly in the client panel. No auxiliary software registration required.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related details metadata (Cast, Screenshots, and Download Box link previews) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main segment (Cast + Screen Stills) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Cast Members */}
            {movie.cast && movie.cast.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-l-3 border-brand-red pl-3">
                  <Users className="h-4.5 w-4.5 text-neutral-300" />
                  <h3 className="text-sm font-bold text-neutral-100 uppercase tracking-wide">Dynamic Top Cast</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {movie.cast.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-[#0d0d0d] border border-white/5 rounded-xl p-2.5"
                    >
                      <img
                        src={c.image}
                        alt={`Cinemood actor ${c.name} as ${c.role}`}
                        width={40}
                        height={40}
                        referrerPolicy="no-referrer"
                        className="h-10 w-10 object-cover rounded-full border border-white/5"
                        loading="lazy"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-neutral-200 truncate">{c.name}</h4>
                        <p className="text-[10px] text-neutral-500 font-mono italic truncate">{c.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Screenshots Gallery Section (and dynamic lightbox popup) */}
            {movie.screenshots && movie.screenshots.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-l-3 border-brand-red pl-3">
                  <ImageIcon className="h-4.5 w-4.5 text-neutral-300" />
                  <h3 className="text-sm font-bold text-neutral-100 uppercase tracking-wide font-sans">Movie Screenshot Gallery</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {movie.screenshots.map((s, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveScreenshot(s)}
                      className="relative rounded-xl overflow-hidden border border-white/5 cursor-pointer group bg-black aspect-[16/10]"
                    >
                      <img
                        src={s}
                        alt={`${movie.title} full-resolution movie screenshot high-quality scene capture ${idx + 1} - Cinemood`}
                        width={600}
                        height={375}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                        <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider bg-brand-red/90 px-2.5 py-1 rounded-full">Expand View</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Segment - Dynamic Quick Reviews submit and listing */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-6 space-y-5 shadow-2xl">
              
              <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                <MessageSquare className="h-4.5 w-4.5 text-brand-red" />
                <h3 className="text-sm font-bold uppercase text-white tracking-wide">Viewer Reviews ({reviews.length})</h3>
              </div>

              {/* Submitted Reviews display strip */}
              <div className="space-y-4 max-h-[280px] overflow-y-auto pr-1 scrollbar-thin">
                {reviews.length > 0 ? (
                  reviews.map((rev) => (
                    <div key={rev.id} className="border-b border-white/5 pb-3.5 space-y-1.5 last:border-0">
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-xs font-bold text-neutral-200">{rev.author}</h4>
                        <div className="flex items-center gap-0.5 text-[10px] font-bold text-yellow-500 font-mono">
                          <Star className="h-3 w-3 fill-yellow-500" />
                          {rev.rating}
                        </div>
                      </div>
                      <p className="text-[11px] text-neutral-400 font-sans leading-relaxed text-justify">&ldquo;{rev.content}&rdquo;</p>
                      <p className="text-[9px] text-neutral-500 font-mono">{rev.date}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-neutral-600 italic">No audience reviews logged yet. Be the first to express opinion!</p>
                )}
              </div>

              {/* Submit Review box */}
              <form onSubmit={handleReviewSubmit} className="space-y-3.5 pt-4 border-t border-white/5">
                <p className="text-[10px] font-mono uppercase tracking-wider text-brand-red font-extrabold flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Rate the Cinema
                </p>
                
                <div className="grid grid-cols-3 gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Your Alias"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="col-span-2 h-9 border border-white/5 bg-black rounded-lg px-2.5 text-xs text-neutral-200 focus:outline-none focus:ring-1 focus:ring-brand-red"
                  />
                  
                  {/* Rating Selector */}
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(parseInt(e.target.value))}
                    className="col-span-1 h-9 border border-white/5 bg-black rounded-lg text-xs text-neutral-200 px-1.5 focus:outline-none focus:ring-1 focus:ring-brand-red cursor-pointer"
                  >
                    {Array.from({ length: 11 }).map((_, r) => (
                      <option key={r} value={r}>{r}/10★</option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <textarea
                    rows={3}
                    placeholder="Provide detailed feedback on stream print quality, dubbing timing or storylines..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full text-xs text-neutral-200 border border-white/5 bg-black rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-brand-red placeholder-neutral-500"
                    maxLength={200}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={savingReview}
                  className="w-full py-2 bg-brand-red hover:bg-brand-red-hover hover:scale-101 active:scale-98 disabled:opacity-50 text-white rounded-full text-xs font-bold font-sans transition-all cursor-pointer shadow-[0_0_15px_rgba(229,9,20,0.3)]"
                >
                  {savingReview ? "Submitting rating..." : "Post Review on Board"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Dynamic Related Suggestions Grid row */}
        {related.length > 0 && (
          <div className="pt-8">
            <div className="flex justify-between items-baseline mb-6 border-l-3 border-brand-red pl-3">
              <h3 className="text-md font-extrabold uppercase tracking-tight text-white">Recommended Releases</h3>
              <span className="text-xs text-neutral-500">Curated specifically for you</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map(m => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Screenshot Lightbox Panel Overlay */}
      <AnimatePresence>
        {activeScreenshot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveScreenshot(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-5xl rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl"
            >
              <img
                src={activeScreenshot}
                alt="expanded screen capture"
                referrerPolicy="no-referrer"
                className="w-full max-h-[80vh] object-contain"
              />
              <button
                onClick={() => setActiveScreenshot(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-brand-red text-white p-2.5 rounded-full cursor-pointer transition-colors shadow-lg hover:scale-105 transition-all"
              >
                ✕ Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
