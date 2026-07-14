import React from "react";
import { Send, ShieldCheck, Mail, Heart, Film } from "lucide-react";
import { useApp } from "../context/AppContext";

export const Footer: React.FC = () => {
  const { setView, setFilters, setActiveCategory } = useApp();

  const handleCategoryClick = (category: string, slug: string) => {
    setFilters({
      genre: category,
      year: "All",
      quality: "All",
      rating: 0
    });
    setActiveCategory(slug);
    setView("search");
  };

  return (
    <footer id="main-footer" className="relative mt-24 border-t border-white/5 bg-black/40 text-neutral-400 backdrop-blur-sm z-20">
      {/* Visual background details */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand-red/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 items-start border-b border-white/5 pb-10">
          
          {/* 1. About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-red shadow-[0_0_15px_rgba(229,9,20,0.5)]">
                <Film className="h-4.5 w-4.5 text-white" />
              </div>
              <span className="font-sans text-xl font-black tracking-tighter text-white flex items-center">
                CINEMOOD<span className="w-1.5 h-1.5 bg-brand-red rounded-full ml-1"></span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Cinemood is a premium movie index referencing and metadata catalog. We manually index high quality mirror streams, direct downloads, and dual-audio files. Feel the cinema in style.
            </p>
          </div>

          {/* 2. Categorical Fast Archives Link module (Crawlable SEO anchors) */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-100">
              Browse Movie Archives
            </h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <a
                href="/category/bengali-movies"
                onClick={(e) => { e.preventDefault(); handleCategoryClick("All", "bengali-movies"); }}
                className="hover:text-brand-red transition-colors text-left"
              >
                Bengali Movies &amp; Serials
              </a>
              <a
                href="/category/web-series"
                onClick={(e) => { e.preventDefault(); handleCategoryClick("All", "web-series"); }}
                className="hover:text-brand-red transition-colors text-left"
              >
                Web Series &amp; Shows
              </a>
              <a
                href="/category/anime"
                onClick={(e) => { e.preventDefault(); handleCategoryClick("Anime", "anime"); }}
                className="hover:text-brand-red transition-colors text-left"
              >
                Anime Sagas &amp; Films
              </a>
              <a
                href="/category/dual-audio"
                onClick={(e) => { e.preventDefault(); handleCategoryClick("All", "dual-audio"); }}
                className="hover:text-brand-red transition-colors text-left"
              >
                Dual Audio Multi-Tracks
              </a>
              <a
                href="/category/bangla-dubbed"
                onClick={(e) => { e.preventDefault(); handleCategoryClick("All", "bangla-dubbed"); }}
                className="hover:text-brand-red transition-colors text-left"
              >
                Bangla Dubbed Cinema
              </a>
              <a
                href="/category/malayalam-movies"
                onClick={(e) => { e.preventDefault(); handleCategoryClick("All", "malayalam-movies"); }}
                className="hover:text-brand-red transition-colors text-left"
              >
                Malayalam Movies &amp; Thrillers
              </a>
              <a
                href="/category/korean-drama"
                onClick={(e) => { e.preventDefault(); handleCategoryClick("All", "korean-drama"); }}
                className="hover:text-brand-red transition-colors text-left"
              >
                Korean Drama &amp; Series
              </a>
              <a
                href="/category/hindi-series"
                onClick={(e) => { e.preventDefault(); handleCategoryClick("All", "hindi-series"); }}
                className="hover:text-brand-red transition-colors text-left"
              >
                Hindi Series &amp; Shows
              </a>
            </div>
          </div>

          {/* 3. Contact & DMCA Section */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-100 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-brand-red" />
              Transparency &amp; Legal
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              All indexed stream points are compiled from public platforms. We comply with DMCA fast takedown requests.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300">
                <Mail className="h-4 w-4 text-neutral-500" />
                <span>Abuse: <span className="text-brand-red font-mono">cinemood.site@gmail.com</span></span>
              </div>
            </div>
          </div>

          {/* 4. Telegram Node Connection */}
          <div className="space-y-4 md:text-right md:flex md:flex-col md:items-end">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-100 md:text-right">
              Join Hub Network
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-xs md:text-right">
              Request dubs, check speeds, report offline pointers and connect directly with the administrator.
            </p>
            <div className="pt-2">
              <a
                href="https://telegram.me/cinemood_channel"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-5 py-2.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(229,9,20,0.25)] hover:shadow-[0_4px_16px_rgba(229,9,20,0.4)] hover:brightness-110 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Send className="h-3.5 w-3.5 fill-white" />
                Join Telegram Channel
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-neutral-500 font-mono">
          <div className="space-y-1.5 text-center sm:text-left">
            <p>&copy; {new Date().getFullYear()} Cinemood Media. All rights index-referenced. DMCA Protected.</p>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-neutral-400 justify-center sm:justify-start">
              <a
                href="/about"
                onClick={(e) => { e.preventDefault(); setView("about"); }}
                className="hover:text-brand-red transition-colors cursor-pointer"
              >
                About Us
              </a>
              <span>•</span>
              <a
                href="/privacy"
                onClick={(e) => { e.preventDefault(); setView("privacy"); }}
                className="hover:text-brand-red transition-colors cursor-pointer"
              >
                Privacy Policy
              </a>
              <span>•</span>
              <a
                href="/contact"
                onClick={(e) => { e.preventDefault(); setView("contact"); }}
                className="hover:text-brand-red transition-colors cursor-pointer"
              >
                Contact
              </a>
              <span>•</span>
              <a
                href="/disclaimer"
                onClick={(e) => { e.preventDefault(); setView("disclaimer"); }}
                className="hover:text-brand-red transition-colors cursor-pointer"
              >
                Disclaimer &amp; DMCA
              </a>
            </div>
          </div>
          <p className="flex items-center gap-1.5">
            Designed with <Heart className="h-3 w-3 fill-brand-red text-brand-red" /> for premium cinephiles.
          </p>
        </div>
      </div>
    </footer>
  );
};
