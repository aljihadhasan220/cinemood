import React, { useEffect } from "react";

// Module level flag to prevent multiple injections during the current app session
let wasInjectedInSession = false;

export const PopunderManager: React.FC = () => {
  useEffect(() => {
    // If already loaded in this active session run, do nothing
    if (wasInjectedInSession) {
      return;
    }

    // Apply 24 hour limit per user
    const COOLDOWN = 24 * 60 * 60 * 1000; // 24 hours
    const lastPopunderTime = localStorage.getItem("cinemood_last_popunder");
    const now = Date.now();

    if (lastPopunderTime) {
      const lastTimeParsed = parseInt(lastPopunderTime, 10);
      if (!isNaN(lastTimeParsed) && now - lastTimeParsed < COOLDOWN) {
        return;
      }
    }

    // Define the natural interaction callback
    const handleInteraction = () => {
      // Immediately detach all listeners to prevent multiple loads
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);

      if (wasInjectedInSession) return;
      wasInjectedInSession = true;

      // Persist the show time
      localStorage.setItem("cinemood_last_popunder", Date.now().toString());

      try {
        const script = document.createElement("script");
        script.id = "adsterra-popunder-ad";
        script.src = "https://eternalwheeled.com/94/69/2c/94692cb4708dac14be8055c7ccf8a40e.js";
        script.async = true;

        script.onerror = (e) => {
          // Guard error console noise on adblockers
          console.debug("[PopunderManager] Script blocked or unavailable in your region.", e);
        };

        document.head.appendChild(script);
      } catch (error) {
        console.error("[PopunderManager] Failed to append script node safely:", error);
      }
    };

    // Attach listeners on standard interaction events
    window.addEventListener("click", handleInteraction, { passive: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true });
    window.addEventListener("scroll", handleInteraction, { passive: true });

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };
  }, []);

  return null;
};
