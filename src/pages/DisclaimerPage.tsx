import React from "react";
import { Info, Lock, ShieldCheck, Mail, AlertOctagon } from "lucide-react";

export const DisclaimerPage: React.FC = () => {
  return (
    <div id="disclaimer-page" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
      {/* Page Header */}
      <div className="border-l-4 border-brand-red pl-4 space-y-2">
        <span className="text-[10px] font-mono font-bold tracking-widest text-brand-red uppercase">Legal Guard</span>
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-100 uppercase tracking-tight font-sans">
          Disclaimer &amp; DMCA
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl font-sans">
          Please read this statement regarding index files, copyright management, third-party hosting, and DMCA fast takedown services.
        </p>
      </div>

      {/* Main Content Card Container */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 space-y-8 text-xs sm:text-sm leading-relaxed text-neutral-400 font-sans">
        
        {/* Section 1: Non-Hosting Integrity declaration */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-neutral-100 uppercase tracking-tight flex items-center gap-2">
            <AlertOctagon className="h-4 w-5 text-brand-red" />
            1. No Direct Hosting Of Media Files
          </h2>
          <p>
            <strong>Cinemood</strong> does <strong>not</strong> upload, compile, host, or store any movies, Web Series episodes, animated MP4 files, or stream data on any owned server infrastructure. We operate solely as an indexing platform and metadata catalog referencing public index pointers and third-party links available publicly across the internet.
          </p>
          <p>
            All media files and video stream platforms referenced across this website (e.g., Gofile, Terabox, Mega, and Telegram Channels) correspond to external, independent web entities. We possess no control over, and claim no responsibility for, the content, privacy rules, or intellectual property practices of these external platforms.
          </p>
        </section>

        {/* Section 2: Copyright & DMCA Compliance */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-neutral-100 uppercase tracking-tight flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-brand-red" />
            2. DMCA Takedown and Policy Clearance
          </h2>
          <p>
            We respect the intellectual property rights of copyright holders and operate under DMCA regulations. If you identify your copyrighted work indexed on Cinemood without authorized permissions, you can submit a written notice to our support team to request removal of the indexed pointer.
          </p>
          <p>
            To file a valid takedown proposal, please ensure your message includes:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5 text-neutral-450 text-xs">
            <li>A detailed identification of the copyrighted material (movie/series name and Cinemood web URL).</li>
            <li>Direct proof of copyright ownership or legal representation credentials.</li>
            <li>Accurate contact information including professional email address.</li>
            <li>A signed verification statement confirming that the request is executed in good faith.</li>
          </ul>
        </section>

        {/* Section 3: Safe Communication Channel */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-neutral-100 uppercase tracking-tight flex items-center gap-2">
            <Mail className="h-4 w-4 text-brand-red" />
            3. Contact for Legal Clearance
          </h2>
          <p>
            Submit your DMCA claims and content pointer reports directly to our central Abuse Operations Desk at:
          </p>
          <p className="p-3 bg-white/5 rounded-xl text-center border border-white/5 font-mono text-brand-red font-bold text-xs sm:text-sm tracking-wider max-w-md mx-auto">
            cinemood.site@gmail.com
          </p>
          <p className="text-center text-[10px] text-neutral-500 font-mono">
            Note: We typically review, verify, and terminate indexed pointers within 24 to 48 business hours of receiving a compliant claim.
          </p>
        </section>

        {/* Section 4: Accuracy statement */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-neutral-100 uppercase tracking-tight flex items-center gap-2">
            <Info className="h-4 w-4 text-brand-red" />
            4. Accuracy of Metadata
          </h2>
          <p>
            While Cinemood works tirelessly to ensure the accuracy, completeness, and safety of movie storylines, IMDb scores, download qualities, and duration counters listed across the catalog, all information is provided on an &ldquo;as is&rdquo; basis. We hold no liability for errors or temporary downtime.
          </p>
        </section>

      </div>
    </div>
  );
};
