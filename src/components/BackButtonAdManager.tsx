import React, { useEffect } from "react";

export const BackButtonAdManager: React.FC = () => {
  useEffect(() => {
    // If the back button advertisement is already triggered in this session, don't do anything
    const isTriggered = sessionStorage.getItem("cinemood_back_ad_triggered");
    if (isTriggered) {
      return;
    }

    // Push an artificial state on first visit of the session to create a history buffer,
    // which allows us to intercept the Back button press even if the user came directly
    // from an external search engine (where history length is 1).
    const hasPushed = sessionStorage.getItem("cinemood_back_state_pushed");
    if (!hasPushed) {
      try {
        window.history.pushState({ isBackAdState: true }, "", window.location.href);
        sessionStorage.setItem("cinemood_back_state_pushed", "true");
      } catch (err) {
        console.warn("[BackButtonAdManager] Failed to push ad history state safely:", err);
      }
    }

    const handlePopState = () => {
      // If already shown once, allow standard browser navigation cleanly
      if (sessionStorage.getItem("cinemood_back_ad_triggered")) {
        return;
      }

      // Mark as triggered so we never interrupt navigation again in the current session
      sessionStorage.setItem("cinemood_back_ad_triggered", "true");

      // Open the advertisement link in a user-friendly way (new tab) so they are not blocked
      try {
        const adUrl = "https://eternalwheeled.com/mjhr1b5qb?key=bd35010fe9ea077642babfaec7258267";
        window.open(adUrl, "_blank", "noopener,noreferrer");
      } catch (err) {
        console.debug("[BackButtonAdManager] Popup trace intercepted or blocked by browser:", err);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return null;
};
