import React from "react";
import { useApp } from "../context/AppContext";
import { Sparkles, Tv, Flame, Clapperboard, Award, Heart } from "lucide-react";

const CATEGORIES = [
  { label: "All Movies", value: "All", icon: Clapperboard },
  { label: "Action Blockbusters", value: "Action", icon: Flame },
  { label: "Anime Sagas", value: "Anime", icon: Sparkles },
  { label: "Sci-Fi & Space", value: "Sci-Fi", icon: Award },
  { label: "Mystery Clues", value: "Mystery", icon: Heart },
  { label: "Horror / Ghost", value: "Horror", icon: Tv }
];

export const CategorySlider: React.FC = () => {
  const { filters, setFilters, setView, setSearchQuery } = useApp();

  const handleSelectGenre = (genre: string) => {
    setFilters(prev => ({ ...prev, genre }));
    setSearchQuery("");
    setView("search");
  };

  return (
    <div className="w-full" id="category-selector-strip">
      <div className="flex items-center gap-2 overflow-x-auto pb-3 snap-x scrollbar-none scroll-smooth">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = filters.genre === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => handleSelectGenre(cat.value)}
              className={`flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide snap-start flex-shrink-0 transition-all cursor-pointer ${
                isActive
                  ? "bg-brand-red text-white shadow-[0_4px_12px_rgba(229,9,20,0.3)] border border-brand-red scale-102"
                  : "bg-white/5 text-neutral-300 border border-white/5 hover:border-white/10 hover:text-white"
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? "text-white" : "text-neutral-400 group-hover:text-brand-red"}`} />
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
