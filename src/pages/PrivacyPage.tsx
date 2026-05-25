import React from "react";
import { ShieldAlert, Cookie, Lock, Eye, CheckCircle } from "lucide-react";

export const PrivacyPage: React.FC = () => {
  return (
    <div id="privacy-page" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
      {/* Page Header */}
      <div className="border-l-4 border-brand-red pl-4 space-y-2">
        <span className="text-[10px] font-mono font-bold tracking-widest text-brand-red uppercase">Legal Information</span>
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-100 uppercase tracking-tight font-sans">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl font-sans">
          Last updated: May 2026. Review our commitments regarding ads, cookie consent, local caching, and analytical tracking codes.
        </p>
      </div>

      {/* Main Privacy Body Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 space-y-8 text-xs sm:text-sm leading-relaxed text-neutral-400 font-sans">
        
        {/* Section 1: Overview */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-neutral-100 uppercase tracking-tight flex items-center gap-2">
            <Lock className="h-4 w-4 text-brand-red" />
            1. Personal Data Standards
          </h2>
          <p>
            Cinemood operates purely as an index and metadata library. We respect user privacy and do not require user accounts, email registration, profile forms, or financial credentials. Because we do not store personal identification profiles, we do not utilize private database storage for personal customer identity tracking.
          </p>
        </section>

        {/* Section 2: Cookies & Local Storage */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-neutral-100 uppercase tracking-tight flex items-center gap-2">
            <Cookie className="h-4 w-4 text-brand-red" />
            2. Cookies &amp; Local Caching
          </h2>
          <p>
            To optimize app state rendering performance and preserve user interactions, Cinemood uses lightweight client-side browser storage (e.g., <code>localStorage</code>) to record local bookmark lists, user download selections, and frequency cooldown trackers. We also utilize cookies to store visual responsive states and optimize server loading speeds. You can configure your local browser to clear or refuse cookies at any time.
          </p>
        </section>

        {/* Section 3: Third-Party Advertising (Adsterra & Smart Flows) */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-neutral-100 uppercase tracking-tight flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-brand-red" />
            3. Advertisements &amp; Smart Flows
          </h2>
          <p>
            This website integrates third-party networks for serving advertisements, including non-intrusive Popunder scripts (from Adsterra networks) and redirection modules. These third-party networks might serve or place cookie files upon click interactions to track frequency limits and region demographics.
          </p>
          <p className="pl-4 border-l border-brand-red/30 italic text-neutral-400/80">
            Note: Our Popunder script is strictly limited to 1 popunder per 24 hours per unique user session. We prohibit forced browser sound plays, infinite popup loops, and auto redirects to optimize user sanity and hardware security.
          </p>
        </section>

        {/* Section 4: Analytics and Tracking */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-neutral-100 uppercase tracking-tight flex items-center gap-2">
            <Eye className="h-4 w-4 text-brand-red" />
            4. Analytics Platforms
          </h2>
          <p>
            This site runs Google Analytics 4 tracking scripts globally (using tag: <code>G-B3D0DK1LDC</code>). This allows our webmasters to analyze aggregated traffic metrics, bounce indices, country traffic distributions, and page views. No personally identifiable tracking occurs.
          </p>
        </section>

        {/* Section 5: External Redirections */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-neutral-100 uppercase tracking-tight flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-brand-red" />
            5. Consent &amp; Contact
          </h2>
          <p>
            By interacting, searching, and utilizing the index pointers listed across Cinemood, you signify your absolute consent to this policy. If you have inquiries regarding privacy practices, or wish to report illegal redirections, please reach us immediately at our official contact points.
          </p>
        </section>

      </div>
    </div>
  );
};
