import React from "react";
import { Send, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const FloatingTelegram: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="tg-floater"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-neutral-900 border border-red-500/20 shadow-2xl rounded-2xl p-3 pr-4 max-w-sm backdrop-blur-xl"
        >
          {/* Glowing Red/Blue Border Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-600/10 via-blue-600/10 to-red-600/10 -z-10 blur-xl opacity-75 animate-pulse" />

          {/* Telegram branding & link */}
          <a
            href="https://t.me/cinemood_channel"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 active:scale-95 transition-transform"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-red-600 shadow-md">
              <Send className="h-5 w-5 text-white stroke-[2.2]" />
            </div>
            <div>
              <p className="text-[11px] font-mono tracking-wider text-red-500 font-bold uppercase">Community</p>
              <h4 className="text-sm font-bold text-neutral-100">Join Telegram Channel</h4>
              <p className="text-xs text-neutral-400">Request movies & active links instantly</p>
            </div>
          </a>

          {/* Close button */}
          <button
            id="tg-close-btn"
            onClick={() => setIsOpen(false)}
            className="stroke-neutral-400 hover:bg-neutral-800 p-1.5 rounded-lg text-neutral-400 hover:text-red-500 transition-colors cursor-pointer self-start ml-2"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
