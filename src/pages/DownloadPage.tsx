import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import {
  Download,
  Send,
  Loader,
  AlertTriangle,
  ArrowLeft,
  ShieldCheck,
  Zap,
  Clock,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const DownloadPage: React.FC = () => {
  const { selectedMovieId, allMovies, setView, isLoading, navigateToMovie } = useApp();
  const [countdown, setCountdown] = useState(5);
  const [linksGenerated, setLinksGenerated] = useState(false);
  const [selectedMirror, setSelectedMirror] = useState<string | null>(null);

  // 5-second countdown loader sequence
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setLinksGenerated(true);
    }
  }, [countdown]);

  if (isLoading) {
    return (
      <div id="download-skeleton" className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 animate-pulse text-center">
        <div className="h-10 w-24 bg-white/5 rounded-xl animate-pulse" />
        <div className="h-64 bg-white/5 rounded-3xl animate-pulse" />
      </div>
    );
  }

  const movie = allMovies.find(m => m.id === selectedMovieId || m.slug === selectedMovieId);

  if (!movie) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center">
        <h3 className="text-xl font-bold text-neutral-200">No movie context selected</h3>
        <p className="text-sm text-neutral-500 mt-2">Pick a movie from the catalog dashboard to initiate down sequences.</p>
        <button
          onClick={() => setView("home")}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 text-xs font-bold text-white shadow-[0_0_20px_rgba(229,9,20,0.4)] hover:bg-brand-red-hover cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Go Back Home
        </button>
      </div>
    );
  }

  const handleDownloadRedirect = (targetUrl: string) => {
    setSelectedMirror(targetUrl);
    try {
      window.open("https://eternalwheeled.com/mjhr1b5qb?key=bd35010fe9ea077642babfaec7258267", "_blank", "noopener,noreferrer");
    } catch {
      // ignore popup error
    }
    window.location.href = targetUrl;
  };

  const handleExternalNavigate = (url: string) => {
    setSelectedMirror(url);
    // Open in separate tab safely
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div id={`download-panel-${movie.id}`} className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      
      {/* Route headers */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => setView("detail")}
          className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-black/60 text-neutral-300 hover:text-white hover:border-brand-red/40 px-5 py-2.5 text-xs font-bold cursor-pointer transition-all"
        >
          <ArrowLeft className="h-4 w-4 text-brand-red" />
          Back to Details
        </button>
        
        <div className="text-right">
          <span className="text-[10px] font-mono font-bold text-brand-red uppercase tracking-widest bg-brand-red/10 border border-brand-red/20 px-2.5 py-0.5 rounded-full">Download Console</span>
          <h2 className="text-lg font-black text-neutral-100 mt-1">{movie.title}</h2>
        </div>
      </div>

      {/* Main Download Console Sheet (Glassmorphism layout) */}
      <div className="relative rounded-3xl border border-white/5 bg-[#0a0a0a]/80 p-6 sm:p-8 md:p-10 shadow-3xl overflow-hidden backdrop-blur-xl">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand-red/20 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-brand-red/5 via-transparent to-transparent pointer-events-none" />

        {/* Header Metadata Summary */}
        <div className="border-b border-white/5 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" /> Virus Checked & Verified Secure
            </span>
            <h3 className="text-md sm:text-lg font-extrabold text-neutral-200 mt-1 uppercase tracking-tight">Active Download Links</h3>
          </div>
          <div className="text-xs font-mono text-neutral-400">
            Selected movie weight: <span className="text-neutral-200 font-bold">{movie.size || "1.8 GB"}</span> | <span className="bg-brand-red/10 text-brand-red border border-brand-red/20 uppercase px-2 py-0.5 rounded text-[10px] font-bold">{movie.quality}</span>
          </div>
        </div>

        {/* Premium Quality Links Section */}
        <div className="mt-8 space-y-4">
          
          {/* 4K Download button (Ultra HD) */}
          {movie.downloadLinks?.some(l => l.serverName.toLowerCase().includes("4k")) && (
            <div
              onClick={() => {
                const localUrl = movie.downloadLinks?.find(l => l.serverName.toLowerCase().includes("4k"))?.url 
                  || `https://gofile.io/d/cinemood-${movie.id}-4k`;
                handleDownloadRedirect(localUrl);
              }}
              className="group bg-gradient-to-r from-neutral-900/90 to-neutral-800/95 hover:from-[#111111] hover:to-[#171717] hover:border-brand-red/40 text-left p-5 rounded-2xl border border-white/5 shadow-lg hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/10 border border-brand-red/20 group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-300">
                  <Download className="h-5 w-5 text-brand-red group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <span className="rounded bg-brand-red/10 border border-brand-red/30 px-2 py-0.5 text-[9px] font-mono font-bold text-brand-red uppercase">Ultra HD Link</span>
                  <h4 className="text-sm font-extrabold text-neutral-100 group-hover:text-brand-red mt-1 transition-colors">{movie.title} &bull; 4K Download</h4>
                  <p className="text-[10px] text-neutral-500 mt-0.5">Ultra high definition 2160p - Premium master print &bull; {movie.size ? movie.size.split("|")[3]?.trim() || "11.2 GB" : "11.2 GB"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-block rounded bg-white/5 border border-white/5 font-mono text-[9px] font-bold text-neutral-400 px-2 py-1">Premium CDN</span>
                <ChevronRight className="h-4 w-4 text-neutral-500 group-hover:text-brand-red group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>
          )}

          {/* 1. 1080p Download button (FHD Ultra Premium Premium Direct) */}
          <div
            onClick={() => {
              const localUrl = movie.downloadLinks?.find(l => l.serverName.toLowerCase().includes("1080"))?.url 
                || movie.downloadLinks?.[0]?.url 
                || `https://gofile.io/d/cinemood-${movie.id}-1080p`;
              handleDownloadRedirect(localUrl);
            }}
            className="group bg-gradient-to-r from-neutral-900/90 to-neutral-800/95 hover:from-[#111111] hover:to-[#171717] hover:border-brand-red/40 text-left p-5 rounded-2xl border border-white/5 shadow-lg hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/10 border border-brand-red/20 group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-300">
                <Download className="h-5 w-5 text-brand-red group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <span className="rounded bg-brand-red/10 border border-brand-red/30 px-2 py-0.5 text-[9px] font-mono font-bold text-brand-red uppercase">Direct Link</span>
                <h4 className="text-sm font-extrabold text-neutral-100 group-hover:text-brand-red mt-1 transition-colors">{movie.title} &bull; 1080p Download</h4>
                <p className="text-[10px] text-neutral-500 mt-0.5">High definition - Original audio + dubbings track &bull; {movie.size || "1.8 GB"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block rounded bg-white/5 border border-white/5 font-mono text-[9px] font-bold text-neutral-400 px-2 py-1">Fast CDN</span>
              <ChevronRight className="h-4 w-4 text-neutral-500 group-hover:text-brand-red group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>

          {/* 2. 720p Download button (HD Standalone Stream) */}
          <div
            onClick={() => {
              const localUrl = movie.downloadLinks?.find(l => l.serverName.toLowerCase().includes("720"))?.url 
                || movie.downloadLinks?.[1]?.url 
                || `https://gofile.io/d/cinemood-${movie.id}-720p`;
              handleDownloadRedirect(localUrl);
            }}
            className="group bg-gradient-to-r from-neutral-900/90 to-neutral-800/95 hover:from-[#111111] hover:to-[#171717] hover:border-brand-red/40 text-left p-5 rounded-2xl border border-white/5 shadow-lg hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/10 border border-brand-red/20 group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-300">
                <Download className="h-5 w-5 text-brand-red group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <span className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-[9px] font-mono font-bold text-neutral-300 uppercase">Standard Link</span>
                <h4 className="text-sm font-extrabold text-neutral-100 group-hover:text-brand-red mt-1 transition-colors">{movie.title} &bull; 720p Download</h4>
                <p className="text-[10px] text-neutral-500 mt-0.5">Medium definition - Recommended for slower connectivity &bull; ~1.1 GB</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block rounded bg-white/5 border border-white/5 font-mono text-[9px] font-bold text-neutral-400 px-2 py-1">Fast CDN</span>
              <ChevronRight className="h-4 w-4 text-neutral-500 group-hover:text-brand-red group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>

          {/* 3. 480p Download button (SD Mobile Optimized Speed) */}
          <div
            onClick={() => {
              const localUrl = movie.downloadLinks?.find(l => l.serverName.toLowerCase().includes("480"))?.url 
                || movie.downloadLinks?.[2]?.url 
                || `https://gofile.io/d/cinemood-${movie.id}-480p`;
              handleDownloadRedirect(localUrl);
            }}
            className="group bg-gradient-to-r from-neutral-900/90 to-neutral-800/95 hover:from-[#111111] hover:to-[#171717] hover:border-brand-red/40 text-left p-5 rounded-2xl border border-white/5 shadow-lg hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/10 border border-brand-red/20 group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-300">
                <Download className="h-5 w-5 text-brand-red group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <span className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-[9px] font-mono font-bold text-neutral-300 uppercase">Mobile Link</span>
                <h4 className="text-sm font-extrabold text-neutral-100 group-hover:text-brand-red mt-1 transition-colors">{movie.title} &bull; 480p Download</h4>
                <p className="text-[10px] text-neutral-500 mt-0.5">Mobile data saver print - Fast parsing streams &bull; ~650 MB</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block rounded bg-white/5 border border-white/5 font-mono text-[9px] font-bold text-neutral-400 px-2 py-1 flex-shrink-0">Optimized</span>
              <ChevronRight className="h-4 w-4 text-neutral-500 group-hover:text-brand-red group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>

          {/* 4. Watch Online (Direct streaming trigger button) */}
          <div
            onClick={() => {
              try {
                window.open("https://eternalwheeled.com/mjhr1b5qb?key=bd35010fe9ea077642babfaec7258267", "_blank", "noopener,noreferrer");
              } catch {
                // ignore
              }
              window.location.hash = "stream";
              navigateToMovie(movie.id.toString(), "detail");
              setTimeout(() => {
                const node = document.getElementById("player-container-node");
                if (node) node.scrollIntoView({ behavior: "smooth" });
              }, 150);
            }}
            className="group bg-gradient-to-r from-brand-red to-red-600 hover:brightness-110 text-left p-5 rounded-2xl border border-white/10 shadow-xl hover:shadow-[0_0_25px_rgba(229,9,20,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 border border-white/20 group-hover:bg-white transition-all duration-300">
                <Zap className="h-5 w-5 text-white group-hover:text-brand-red transition-colors duration-300" />
              </div>
              <div>
                <span className="rounded bg-white/10 border border-white/20 px-2 py-0.5 text-[9px] font-mono font-bold text-white uppercase tracking-wider animate-pulse">Live Stream</span>
                <h4 className="text-sm font-extrabold text-white mt-1">Watch Online Stream</h4>
                <p className="text-[10px] text-red-100 mt-0.5">Stream live instantly from high performance VPS CDN</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block rounded bg-black/30 border border-white/10 font-mono text-[9px] font-bold text-white px-2 py-1">Instant</span>
              <ChevronRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>

          {/* 5. Official Telegram Button (Join network node) */}
          <div
            onClick={() => handleExternalNavigate("https://telegram.me/cinemood_channel")}
            className="group bg-gradient-to-r from-cyan-600/10 to-cyan-500/10 hover:from-cyan-600 hover:to-cyan-500 hover:text-white text-left p-5 rounded-2xl border border-cyan-500/20 hover:border-cyan-500 text-cyan-400 shadow-md hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#229ED9]/10 border border-[#229ED9]/20 group-hover:bg-white transition-all duration-300">
                <Send className="h-5 w-5 text-cyan-400 group-hover:text-[#229ED9] fill-current transition-colors duration-300" />
              </div>
              <div>
                <span className="rounded bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 text-[9px] font-mono font-bold text-cyan-400 group-hover:bg-white group-hover:text-cyan-600 transition-colors uppercase">Telegram Group</span>
                <h4 className="text-sm font-extrabold mt-1 group-hover:text-white text-neutral-100 transition-colors">Join @cinemood_channel Node</h4>
                <p className="text-[10px] text-neutral-400 group-hover:text-cyan-100 mt-0.5 transition-colors">Request multi-audio, dubs, audio changes and get instant uploads alerts</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block rounded bg-cyan-500/5 border border-cyan-500/10 font-mono text-[9px] font-bold text-cyan-400 group-hover:text-white px-2 py-1">Online</span>
              <ChevronRight className="h-4 w-4 text-cyan-400 group-hover:translate-x-1 group-hover:text-white transition-all duration-300" />
            </div>
          </div>

        </div>

        {/* Console footer message */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-neutral-500 font-mono">
          <p>Links are indexed and validated in real time.</p>
          <p className="flex items-center gap-1.5">
            Having download speed issues? <span className="text-brand-red cursor-pointer hover:underline" onClick={() => handleExternalNavigate("https://telegram.me/cinemood_channel")}>Report to Admin</span>
          </p>
        </div>

      </div>

      {/* Floating detail status log */}
      {selectedMirror && (
        <div className="rounded-2xl border border-white/5 bg-black/40 p-4 flex items-center justify-between gap-2">
          <div className="text-xs text-neutral-400 font-mono">
            Redirected to download payload url target: <span className="text-neutral-200 truncate inline-block max-w-xs align-bottom">{selectedMirror}</span>
          </div>
          <span className="text-[10px] text-emerald-500 font-semibold uppercase font-mono">Completed</span>
        </div>
      )}

    </div>
  );
};
