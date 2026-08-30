import React from "react";
import { Play, X, AlertCircle, Video } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const TUTORIAL_VIDEO_URL =
  "https://dr1.multidownload.store/d/0604e367?eid=gKCMTlPejRhOHBSZG5HckMySnhPdTlPcURIWDI2VjNkRnB1YHO&token=4e43575271ca2a23c5f1d8ff&exp=1788135413&action=watch";

export const FloatingTelegram: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  // Close modal on Escape key press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVideoModalOpen(false);
      }
    };
    if (isVideoModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoModalOpen]);

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="how-to-download-floater"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-neutral-900 border border-red-500/20 shadow-2xl rounded-2xl p-3 pr-4 max-w-sm backdrop-blur-xl"
          >
            {/* Glowing Red/Blue Border Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-600/10 via-blue-600/10 to-red-600/10 -z-10 blur-xl opacity-75 animate-pulse" />

            {/* How to Download Action Trigger */}
            <button
              id="how-to-download-btn"
              type="button"
              onClick={() => {
                setHasError(false);
                setIsVideoModalOpen(true);
              }}
              className="flex items-center gap-3 active:scale-95 transition-transform text-left cursor-pointer group"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-red-600 shadow-md group-hover:scale-105 transition-transform">
                <Play className="h-5 w-5 text-white fill-white ml-0.5" />
              </div>
              <div>
                <p className="text-[11px] font-mono tracking-wider text-red-500 font-bold uppercase">Tutorial</p>
                <h4 className="text-sm font-bold text-neutral-100 group-hover:text-red-400 transition-colors">How to Download Movie</h4>
                <p className="text-xs text-neutral-400">Watch step-by-step video guide</p>
              </div>
            </button>

            {/* Close button for floating widget */}
            <button
              id="how-to-close-btn"
              type="button"
              aria-label="Close tutorial button"
              onClick={() => setIsOpen(false)}
              className="stroke-neutral-400 hover:bg-neutral-800 p-1.5 rounded-lg text-neutral-400 hover:text-red-500 transition-colors cursor-pointer self-start ml-2"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 9:16 Vertical Video Shorts-Style Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            id="how-to-download-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsVideoModalOpen(false);
              }
            }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-md overflow-hidden"
          >
            <motion.div
              id="how-to-download-modal"
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative flex flex-col rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl overflow-hidden w-full max-w-[360px] sm:max-w-[400px] h-full max-h-[85vh]"
              style={{ aspectRatio: "9/16" }}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between border-b border-neutral-900 bg-neutral-900/80 px-4 py-3 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-600/20 text-red-500">
                    <Video className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-100">How to Download Movie</h3>
                    <p className="text-[11px] text-neutral-400">Step-by-step video guide</p>
                  </div>
                </div>
                <button
                  id="how-to-modal-close-btn"
                  type="button"
                  aria-label="Close video player"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="rounded-lg bg-neutral-800 p-1.5 text-neutral-400 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Vertical 9:16 Responsive Video Player */}
              <div className="relative flex-1 w-full bg-black flex items-center justify-center overflow-hidden">
                {hasError ? (
                  <div className="flex flex-col items-center justify-center p-6 text-center text-neutral-400">
                    <AlertCircle className="h-10 w-10 text-red-500 mb-2" />
                    <p className="text-sm font-semibold text-neutral-200">Video Unavailable</p>
                    <p className="text-xs text-neutral-400 mt-1">
                      The tutorial video stream could not be loaded. Please try again later.
                    </p>
                  </div>
                ) : (
                  <video
                    id="tutorial-video-player"
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-contain bg-black"
                    src={TUTORIAL_VIDEO_URL}
                    onError={() => setHasError(true)}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

