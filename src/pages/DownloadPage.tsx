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
  const { selectedMovieId, allMovies, setView } = useApp();
  const [countdown, setCountdown] = useState(5);
  const [linksGenerated, setLinksGenerated] = useState(false);
  const [selectedMirror, setSelectedMirror] = useState<string | null>(null);

  const movie = allMovies.find(m => m.id === selectedMovieId);

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

  const handleExternalNavigate = (url: string) => {
    setSelectedMirror(url);
    // Open in separate tab safely
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div id={`download-panel-${movie.id}`} className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      
      {/* Route headers */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => setView("detail")}
          className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-black/60 text-neutral-300 hover:text-white hover:border-brand-red/30 px-5 py-2 text-xs font-semibold cursor-pointer transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Streaming Screen
        </button>
        
        <div className="text-right">
          <span className="text-[10px] font-mono font-bold text-brand-red uppercase tracking-widest">Download Console</span>
          <h2 className="text-lg font-black text-neutral-100">{movie.title}</h2>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Left column (Ad Banners & Warnings) */}
        <div className="md:col-span-1 space-y-6">
          
          {/* Fast Download Warning Box */}
          <div className="rounded-2xl border border-brand-red/20 bg-brand-red/5 p-5 space-y-3">
            <div className="flex items-center gap-2 text-brand-red">
              <AlertTriangle className="h-5 w-5 stroke-[2.2]" />
              <h4 className="text-xs font-black uppercase tracking-wide">Fast Speed Warning</h4>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed text-justify">
              Disable proxy networks or personal VPN configs before initializing direct mirrors. Gofile allocates higher thread priorities to raw geographical IP routing nodes.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-brand-red font-mono">
              <Zap className="h-3.5 w-3.5 fill-brand-red/20" />
              <span>Optimal bandwidth: 100 Mbps+</span>
            </div>
          </div>

          {/* Sponsoring Ad Banner section mockup */}
          <div className="relative rounded-2xl border border-white/5 bg-black p-5 space-y-3 block text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 via-transparent to-brand-red/5" />
            <div className="absolute top-2 right-2 rounded bg-white/5 border border-white/5 px-1 py-0.2 text-[8px] tracking-wider text-neutral-400 font-bold uppercase font-mono">
              Sponsored
            </div>
            <h5 className="text-sm font-black text-white pt-2">Hyper Dynamic VPN</h5>
            <p className="text-[10px] text-neutral-400 leading-relaxed">
              Secure lightning speed connection nodes and unlock geographic streaming pools with absolute privacy protocols.
            </p>
            <button
              type="button"
              className="w-full py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 text-[10px] font-bold text-blue-400 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
            >
              Get 80% Off Coupon
            </button>
          </div>
        </div>

        {/* Right column (Countdown & Servers list) */}
        <div className="md:col-span-2 space-y-6">
          
          <div className="rounded-3xl border border-white/5 bg-[#0d0d0d] p-6 md:p-8 space-y-8 shadow-2xl">
            
            {/* Real-time Loader Sequence */}
            {!linksGenerated ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <Loader className="h-10 w-10 text-brand-red animate-spin stroke-[2.2]" />
                
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-neutral-100 uppercase tracking-wider">Generating Safe Download Links...</h3>
                  <p className="text-xs text-neutral-400">Our crawler is fetching active CDN mirrors from German/Frankfurt VPS servers</p>
                </div>

                {/* Countdown pill */}
                <div className="rounded-full bg-black/60 border border-white/5 px-4 py-2 font-mono text-xs text-brand-red font-black flex items-center gap-2">
                  <Clock className="h-4.5 w-4.5 animate-pulse" />
                  <span>Redirect sequence starting in {countdown}s</span>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Meta Summary file info */}
                <div className="border-b border-white/5 pb-5 flex flex-wrap justify-between items-baseline gap-2">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                      <ShieldCheck className="h-4 w-4" /> Virus Checked & Monitored
                    </span>
                    <h3 className="text-md font-bold text-neutral-200 mt-1 uppercase">{movie.title} Mirror Table</h3>
                  </div>
                  <div className="text-xs font-mono text-neutral-400">
                    File details: <span className="text-neutral-200 font-bold">{movie.size || "1.8 GB"}</span> | <span className="bg-white/5 text-neutral-200 border border-white/5 uppercase px-2 py-0.5 rounded text-[10px] font-bold">{movie.quality}</span>
                  </div>
                </div>

                {/* Simulated Server downloads lists */}
                <div className="space-y-3">
                  {movie.downloadLinks.map((link, idx) => {
                    const isTelegram = link.type === "Telegram";
                    const isCloud = link.type === "Cloud";
                    const isStream = link.type === "Stream";

                    // Determine mirror branding icons/colors
                    let colorClasses = "border-white/5 bg-black text-neutral-200 hover:border-brand-red/20 hover:bg-white/5";
                    if (isTelegram) colorClasses = "border-cyan-500/10 bg-cyan-950/20 text-cyan-200 hover:bg-cyan-950/30 hover:border-cyan-500/30";
                    if (isCloud) colorClasses = "border-amber-500/10 bg-amber-950/20 text-amber-200 hover:bg-amber-950/30 hover:border-amber-500/30";

                    return (
                      <div
                        key={idx}
                        className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl border transition-all ${colorClasses}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 shadow`}>
                            {isTelegram ? (
                              <Send className="h-4.5 w-4.5 text-cyan-400" />
                            ) : (
                              <Download className="h-4.5 w-4.5 text-brand-red" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-extrabold text-neutral-100">{link.serverName}</h4>
                              <span className="rounded bg-white/5 border border-white/5 font-mono text-[8px] font-bold uppercase text-neutral-400 px-1.5 py-0.2">
                                {link.speed}
                              </span>
                            </div>
                            <p className="text-[10px] text-neutral-400 mt-0.5">Recommended tracker for high-bandwidth fiber lines</p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleExternalNavigate(link.url)}
                          className={`inline-flex items-center justify-center gap-1.5 rounded-full text-xs font-bold px-5 py-2.5 cursor-pointer transition-all ${
                            isTelegram 
                              ? "bg-cyan-600 text-white hover:bg-cyan-500" 
                              : isCloud 
                                ? "bg-amber-600 text-white hover:bg-amber-500"
                                : "bg-brand-red hover:bg-brand-red-hover text-white"
                          }`}
                        >
                          <span>Spawn Mirror</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Warning box detail footer */}
          {selectedMirror && (
            <div className="rounded-2xl border border-white/5 bg-black/40 p-4 flex items-center justify-between gap-2">
              <div className="text-xs text-neutral-400">
                Opened link mirror: <span className="text-neutral-200 font-mono truncate max-w-xs">{selectedMirror}</span>
              </div>
              <span className="text-[10px] text-emerald-500 font-semibold uppercase font-mono">Completed</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
