import React from "react";
import { Send, ShieldCheck, Mail, Heart, Film } from "lucide-react";
import { useApp } from "../context/AppContext";

export const Footer: React.FC = () => {
  const { setView, setFilters } = useApp();

  const handleCategoryClick = (category: string) => {
    setFilters({
      genre: category,
      year: "All",
      quality: "All",
      rating: 0
    });
    setView("search");
  };

  return (
    <footer id="main-footer" className="relative mt-24 border-t border-white/5 bg-black/40 text-neutral-400 backdrop-blur-sm z-20">
      {/* Visual background details */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand-red/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-12">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red shadow-[0_0_15px_rgba(229,9,20,0.5)]">
                <Film className="h-5 w-5 text-white" />
              </div>
              <span className="font-sans text-2xl font-black tracking-tighter text-white flex items-center">
                CINEMOOD<span className="w-1.5 h-1.5 bg-white rounded-full ml-1"></span>
              </span>
            </div>
            <p className="mt-4 text-sm text-neutral-400 leading-relaxed max-w-md">
              Cinemood (&ldquo;Feel the Cinema&rdquo;) is a premium dark-themed movie search indexing and streaming reference platform. Get high-speed download mirrors, Bangla dubbed series, anime sagas, and dual-audio blockbusters instantly.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="https://t.me/cinemood_channel"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-4 py-2 text-xs font-bold text-white shadow-[0_4px_12px_rgba(229,9,20,0.25)] hover:shadow-[0_4px_16px_rgba(229,9,20,0.4)] hover:brightness-110 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Send className="h-3.5 w-3.5 fill-white" />
                Join our Telegram Node
              </a>
              <div className="inline-flex items-center gap-1.5 rounded-xl border border-white/5 bg-white/5 p-2 text-xs text-neutral-300">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                DMCA Compliant Indexer
              </div>
            </div>
          </div>

          {/* Quick Categories Col */}
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-neutral-100">Browse Catalog</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleCategoryClick("Sci-Fi")}
                  className="hover:text-brand-red transition-colors cursor-pointer text-left"
                >
                  Sci-Fi & Cyberpunk
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick("Anime")}
                  className="hover:text-brand-red transition-colors cursor-pointer text-left"
                >
                  Anime Sagas
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick("Action")}
                  className="hover:text-brand-red transition-colors cursor-pointer text-left"
                >
                  Action Blockbusters
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick("Mystery")}
                  className="hover:text-brand-red transition-colors cursor-pointer text-left"
                >
                  Mystery & Suspense
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick("Horror")}
                  className="hover:text-brand-red transition-colors cursor-pointer text-left"
                >
                  Bangla & Folklore
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Policy links */}
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-neutral-100">Transparency</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="#dmca-notice" className="hover:text-brand-red transition-colors">
                  DMCA Take Down
                </a>
              </li>
              <li>
                <a href="#privacy-terms" className="hover:text-brand-red transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#rules-terms" className="hover:text-brand-red transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <div className="flex items-center gap-1.5 mt-4 text-xs font-semibold text-neutral-300">
                  <Mail className="h-3.5 w-3.5 text-brand-red" />
                  <span>abuse@cinemood.net</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar copyright & tech details */}
        <div className="mt-16 border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <p>&copy; {new Date().getFullYear()} Cinemood Cloud. All rights index-referenced. Built with React VPS Node.</p>
          <p className="flex items-center gap-1.5">
            Designed with <Heart className="h-3 w-3 fill-brand-red text-brand-red animate-pulse" /> for movie buffs worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};
