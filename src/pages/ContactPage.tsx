import React, { useState } from "react";
import { Send, Mail, MessageSquare, AlertTriangle, CheckCircle2 } from "lucide-react";

export const ContactPage: React.FC = () => {
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMsg.trim()) {
      setErrorMsg("Please fill in all layout fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const response = await fetch("https://formspree.io/f/mykvdbvz", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          message: formMsg
        })
      });

      if (response.ok) {
        setFormSubmitted(true);
        setFormName("");
        setFormEmail("");
        setFormMsg("");
      } else {
        const data = await response.json();
        if (data && data.errors) {
          setErrorMsg(data.errors.map((err: any) => err.message).join(", "));
        } else {
          setErrorMsg("There was an issue dispatching the message. Please try again.");
        }
      }
    } catch {
      setErrorMsg("Network connection error. Please verify connect nodes.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-page" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
      {/* Page Header */}
      <div className="border-l-4 border-brand-red pl-4 space-y-2">
        <span className="text-[10px] font-mono font-bold tracking-widest text-brand-red uppercase">Direct Node Connections</span>
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-100 uppercase tracking-tight font-sans">
          Contact Support
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl font-sans">
          Request audio dub edits, check file speeds, report broken index pointers, or contact the core webmaster instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pt-4">
        {/* Contact info channels (cols-2) */}
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#a3a3a3] font-mono">
            Fast Track Connections
          </h3>

          <div className="space-y-4">
            {/* Telegram Channel */}
            <a
              href="https://telegram.me/cinemood_channel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-[#0a0a0a] to-[#040404] border border-white/5 hover:border-[#229ED9]/50 transition-all group"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#229ED9]/10 text-[#229ED9] group-hover:bg-[#229ED9] group-hover:text-white transition-colors">
                <Send className="h-4.5 w-4.5 fill-current" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase text-neutral-150 font-sans tracking-wide">Telegram Channel</h4>
                <p className="text-[11px] text-[#229ED9] mt-0.5">@cinemood_channel</p>
                <p className="text-[10px] text-neutral-400 mt-1 leading-relaxed">
                  Join for daily upload schedules, request mirrors, and track immediate channel announcements.
                </p>
              </div>
            </a>

            {/* Telegram Admin */}
            <a
              href="https://t.me/cinemood_admin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-[#0a0a0a] to-[#040404] border border-white/5 hover:border-brand-red/50 transition-all group"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand-red/10 text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors">
                <MessageSquare className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase text-neutral-150 font-sans tracking-wide">Telegram Owner / Admin</h4>
                <p className="text-[11px] text-brand-red mt-0.5">@cinemood_admin</p>
                <p className="text-[10px] text-neutral-400 mt-1 leading-relaxed">
                  Contact the central administrator directly for business matters, server support, and urgent inquiries.
                </p>
              </div>
            </a>

            {/* Abuse / DMCA Email */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-[#0a0a0a] to-[#040404] border border-white/5">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <Mail className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase text-neutral-150 font-sans tracking-wide">Abuse Clearance Email</h4>
                <p className="text-[11px] text-orange-405 font-mono mt-0.5">cinemood.site@gmail.com</p>
                <p className="text-[10px] text-neutral-400 mt-1 leading-relaxed">
                  Dedicated takedown reporting. We review DMCA clearance messages within 24 to 48 business hours.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form mimic card (cols-3) */}
        <div className="md:col-span-3 p-6 sm:p-7 rounded-2xl bg-[#0a0a0a] border border-white/5 space-y-5">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-neutral-100 font-sans uppercase tracking-tight">Send Platform Inquiry</h3>
            <p className="text-[11px] text-neutral-400 font-sans">
              Fill out this visual interface to send encrypted notifications directly to the webmaster.
            </p>
          </div>

          {formSubmitted ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto animate-bounce" />
              <h4 className="text-sm font-bold text-neutral-150 font-sans uppercase">Message Dispatched!</h4>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto font-sans">
                Your cinematic support message has been encrypted and routed safely. We will respond if required within 24 business hours.
              </p>
              <button
                onClick={() => { setFormSubmitted(false); setErrorMsg(null); }}
                className="mt-2 text-xs font-semibold text-brand-red underline hover:text-brand-red/85"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form action="https://formspree.io/f/mykvdbvz" method="POST" onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              {errorMsg && (
                <div className="p-3 bg-brand-red/15 border border-brand-red/30 rounded-xl text-neutral-200 text-xs font-medium flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-red animate-ping" />
                  {errorMsg}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-neutral-300 font-medium font-sans">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="John Doe"
                    disabled={isSubmitting}
                    className="w-full h-10 px-3 border border-white/10 bg-white/5 rounded-xl text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-brand-red disabled:opacity-50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-neutral-300 font-medium font-sans">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                    className="w-full h-10 px-3 border border-white/10 bg-white/5 rounded-xl text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-brand-red disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-300 font-medium font-sans">Detailed Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formMsg}
                  onChange={(e) => setFormMsg(e.target.value)}
                  placeholder="Describe your broken link, audio request, or corporate business inquiry..."
                  disabled={isSubmitting}
                  className="w-full p-3 border border-white/10 bg-white/5 rounded-xl text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-brand-red resize-none disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-brand-red text-white font-bold uppercase tracking-wider rounded-xl shadow-[0_4px_12px_rgba(229,9,20,0.25)] hover:bg-brand-red/90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Routing Encryption...
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5 fill-white" />
                    Submit Verification Inquiry
                  </>
                )}
              </button>
            </form>
          )}

          <div className="pt-3 border-t border-white/5 flex items-center gap-2.5 text-[10px] text-neutral-400 font-mono">
            <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0" />
            <span>Spam filters active. Automated solicitations and duplicate reports will be parsed out automatically.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
