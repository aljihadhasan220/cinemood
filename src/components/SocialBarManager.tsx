import React, { useEffect } from "react";

let wasInjectedInSession = false;

export const SocialBarManager: React.FC = () => {
  useEffect(() => {
    if (wasInjectedInSession) return;
    wasInjectedInSession = true;

    try {
      const script = document.createElement("script");
      script.id = "adsterra-socialbar-ad";
      script.src = "https://eternalwheeled.com/c4/a5/99/c4a5998a8afce65552f1a672e7e0d168.js";
      script.async = true;

      script.onerror = (e) => {
        console.debug("[SocialBarManager] Script blocked or unavailable.", e);
      };

      document.head.appendChild(script);
    } catch (error) {
      console.error("[SocialBarManager] Failed to append script node safely:", error);
    }
  }, []);

  return null;
};
