/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { FloatingTelegram } from "./components/FloatingTelegram";
import { TrailerPopup } from "./components/TrailerPopup";
import { SEOManager } from "./components/SEOManager";
import { PopunderManager } from "./components/PopunderManager";
import { BackButtonAdManager } from "./components/BackButtonAdManager";
import { SocialBarManager } from "./components/SocialBarManager";

// Pages
import { Home } from "./pages/Home";
import { DetailPage } from "./pages/DetailPage";
import { DownloadPage } from "./pages/DownloadPage";
import { SearchPage } from "./pages/SearchPage";
import { BookmarksPage } from "./pages/BookmarksPage";
import { AboutPage } from "./pages/AboutPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { ContactPage } from "./pages/ContactPage";
import { DisclaimerPage } from "./pages/DisclaimerPage";

import { motion, AnimatePresence } from "motion/react";

const AppContent: React.FC = () => {
  const { view } = useApp();

  // Route Switcher mapper
  const renderView = () => {
    switch (view) {
      case "home":
        return <Home />;
      case "detail":
        return <DetailPage />;
      case "download":
        return <DownloadPage />;
      case "search":
        return <SearchPage />;
      case "bookmarks":
        return <BookmarksPage />;
      case "about":
        return <AboutPage />;
      case "privacy":
        return <PrivacyPage />;
      case "contact":
        return <ContactPage />;
      case "disclaimer":
        return <DisclaimerPage />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-[#e5e5e5] flex flex-col font-sans selection:bg-brand-red selection:text-white pb-safe relative">
      
      {/* Dynamic SEO Tag Controller Module */}
      <SEOManager />

      {/* Adsterra Non-Intrusive Popunder Manager */}
      <PopunderManager />

      {/* Lightweight Back Button Ad Interceptor */}
      <BackButtonAdManager />

      {/* Dynamic Crimson Ambient Glow behind Layout Header */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#e5091422] to-transparent opacity-40 z-0" />

      {/* Header Navigation Module */}
      <Navbar />

      {/* Main Pages viewport with smooth fade page transitions */}
      <main className="flex-1 w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Custom Trailer popup iframe canvas overlay */}
      <TrailerPopup />

      {/* Floating Telegram Join Prompt */}
      <FloatingTelegram />

      {/* Detailed Platform Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
