import React from "react";
import { Film, Tv, Shield, Globe, Award } from "lucide-react";

export const AboutPage: React.FC = () => {
  return (
    <div id="about-page" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
      {/* Page Header */}
      <div className="border-l-4 border-brand-red pl-4 space-y-2">
        <span className="text-[10px] font-mono font-bold tracking-widest text-brand-red uppercase">Platform Profile</span>
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-100 uppercase tracking-tight font-sans">
          About Cinemood
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl font-sans">
          Cinemood is a premium movie indexing metadata archive engineered for film enthusiasts seeking direct quality.
        </p>
      </div>

      {/* Main Content Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 space-y-4 hover:border-brand-red/20 transition-all">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
            <Film className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-100 font-sans uppercase tracking-tight">Our Curated Universe</h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-sans">
            We manually index and curate high-definition releases, Dual-Audio encodes, Bengali films, interactive web-series, and classic animated sagas. No algorithm clutter, only human-verified index pointers for direct premium downloads.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 space-y-4 hover:border-brand-red/20 transition-all">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
            <Tv className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-100 font-sans uppercase tracking-tight">Cinematic Philosophy</h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-sans">
            Our UI is optimized to bring the premium theater experience straight to your desktop and mobile viewport. With dark visual accents, high contrast elements, and direct speeds, we respect your browsing immersion first and foremost.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 space-y-4 hover:border-brand-red/20 transition-all">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
            <Shield className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-100 font-sans uppercase tracking-tight">Safe Link Standards</h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-sans">
            Every file indexed has its checksum and source verified before catalog listing. We partner with secure cloud storage systems (such as high-speed Gofile and Telegram Mirrors) to deliver speeds without compromising systems or device performance.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 space-y-4 hover:border-brand-red/20 transition-all">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
            <Globe className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-100 font-sans uppercase tracking-tight">Global Connectivity</h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-sans">
            Cinemood caters to a global community with localized collections including Dual Audio Multi-tracks, Dubbed South blockbusters, Kolkata cinematic pearls, and popular subtitles. No regional barriers.
          </p>
        </div>
      </div>

      {/* Trust Quote / Stats bar */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-brand-red/10 via-[#0a0a0a] to-[#050505] border border-brand-red/10 text-center space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 h-24 w-24 bg-brand-red/5 rounded-full blur-3xl" />
        <Award className="h-8 w-8 text-brand-red mx-auto mb-1 animate-pulse" />
        <p className="text-sm font-semibold text-neutral-100 italic font-sans max-w-xl mx-auto">
          &ldquo;Our vision is simple: To catalog cinematic metadata perfectly, offer sleek browsing flow, and keep premium speed download mirrors organized without visual noise.&rdquo;
        </p>
        <div className="pt-2 text-[10px] font-mono tracking-wider font-extrabold text-neutral-500 uppercase">
          Cinemood Editorial Division
        </div>
      </div>
    </div>
  );
};
