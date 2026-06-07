import React, { useState, useMemo } from "react";
import Header from "./components/Header";
import StatsBand from "./components/StatsBand";
import CityDetail from "./components/CityDetail";
import PlaceCard from "./components/PlaceCard";
import Planner from "./components/Planner";
import Tips from "./components/Tips";
import Footer from "./components/Footer";

// Modular additions
import AiAssistant from "./components/AiAssistant";
import BudgetsAndCompare from "./components/BudgetsAndCompare";
import SocialFeed from "./components/SocialFeed";
import SafarHub from "./components/SafarHub";

import { Destination, Place } from "./types";
import { getCountryForRegion } from "./utils";
import {
  cityDirectory as indianCityDirectory,
  allPlaces as indianPlaces,
  homepageFeaturedNames as indianFeaturedNames,
  regionsList as indianRegionsList
} from "./data";
import {
  internationalDestinations,
  internationalPlaces,
  internationalCities
} from "./internationalData";

import { MapPin, Sparkles, Filter, Database, Check, Compass, Award, Wallet, MessageSquare, Scale, Search, TrendingUp, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { translations } from "./translations";

export default function App() {
  // --- LANGUAGE STATE ---
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const t = translations[language];

  // --- CORE ROUTING TABS ---
  const [activeTab, setActiveTab] = useState<"explore" | "ai" | "lounge" | "compare" | "profile">("explore");

  // --- EXPLORE TABS STATES ---
  const [activeQuery, setActiveQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeRegion, setActiveRegion] = useState("all");
  const [selectedCity, setSelectedCity] = useState<Destination | null>(null);

  // --- UNIFY INDIAN AND INTERNATIONAL DATASETS ---
  const mergedCityDirectory = useMemo(() => {
    return [...indianCityDirectory, ...internationalDestinations];
  }, []);

  const mergedPlaces = useMemo(() => {
    return [...indianPlaces, ...internationalPlaces];
  }, []);

  const mergedRegionsList = useMemo(() => {
    const countries = mergedCityDirectory.map((dest) => getCountryForRegion(dest.state as string));
    const uniqueCountries = [...new Set(countries)];
    // Prioritize India at the top, then other countries alphabetically
    return (uniqueCountries as string[]).sort((a: string, b: string) => {
      if (a === "India") return -1;
      if (b === "India") return 1;
      return a.localeCompare(b);
    });
  }, [mergedCityDirectory]);

  // Combined Featured names (Indian top spots first + Intl Spots like Eiffel Tower, Sensō-ji)
  const unifiedFeaturedNames = useMemo(() => {
    return ["Taj Mahal", "Golden Temple", "Hawa Mahal", "Meenakshi Amman Temple", "Eiffel Tower", "Sensō-ji Temple"];
  }, []);

  // 1. Calculate matching places in grid based on filters
  const filteredPlaces = useMemo(() => {
    const q = activeQuery.toLowerCase().trim();

    const places = mergedPlaces.filter((place) => {
      const placeCountry = getCountryForRegion(place.state);
      const regionMatch = activeRegion === "all" || placeCountry.toLowerCase() === activeRegion.toLowerCase();
      const filterMatch = activeFilter === "all" || place.category === activeFilter;

      let keywordMatch = true;
      if (q) {
        const haystack = [
          place.name.toLowerCase(),
          place.city.toLowerCase(),
          place.state.toLowerCase(),
          placeCountry.toLowerCase(),
          place.type.toLowerCase(),
          place.category.toLowerCase(),
          place.info.toLowerCase(),
          ...(place.aliases || []).map((a) => a.toLowerCase())
        ].join(" ");
        keywordMatch = haystack.includes(q);
      }

      return regionMatch && filterMatch && keywordMatch;
    });

    // Default curated view when no filters active
    if (!q && activeRegion === "all" && activeFilter === "all") {
      return unifiedFeaturedNames
        .map((name) => places.find((p) => p.name.toLowerCase().includes(name.toLowerCase())))
        .filter((p): p is Place => !!p);
    }

    return places;
  }, [activeQuery, activeFilter, activeRegion, mergedPlaces, unifiedFeaturedNames]);

  // 2. Filter scrollable shortcuts cities matching query
  const matchedCities = useMemo(() => {
    const q = activeQuery.toLowerCase().trim();
    return mergedCityDirectory
      .filter((dest) => {
        const destCountry = getCountryForRegion(dest.state);
        return activeRegion === "all" || destCountry.toLowerCase() === activeRegion.toLowerCase();
      })
      .filter((dest) => {
        const destCountry = getCountryForRegion(dest.state);
        if (!q) return true;
        return (
          dest.city.toLowerCase().includes(q) ||
          dest.state.toLowerCase().includes(q) ||
          destCountry.toLowerCase().includes(q) ||
          dest.type.toLowerCase().includes(q) ||
          dest.aliases.some((a) => a.toLowerCase().includes(q))
        );
      })
      .slice(0, 100);
  }, [activeQuery, activeRegion, mergedCityDirectory]);

  // Handlers for shortcuts clicks
  const handleCityShortcutClick = (cityDest: Destination) => {
    setActiveQuery(cityDest.city);
    setSelectedCity(cityDest);
    
    setTimeout(() => {
      const el = document.getElementById("city-detail-section");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Search Submit callback
  const handleSearchSubmit = (query: string) => {
    setActiveQuery(query);

    const exactCity = mergedCityDirectory.find(
      (dest) =>
        dest.city.toLowerCase().trim() === query.toLowerCase().trim() ||
        dest.aliases.some((alias) => alias.toLowerCase().trim() === query.toLowerCase().trim())
    );

    if (exactCity) {
      setSelectedCity(exactCity);
      setTimeout(() => {
        const el = document.getElementById("city-detail-section");
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      const el = document.getElementById("discover");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleRegionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveRegion(e.target.value);
    setActiveQuery("");
    setSelectedCity(null);
  };

  const currentFallbackUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `tourist landmarks and hotels in ${activeQuery || activeRegion || "Paris Tokyo Rome"}`
  )}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fbf7] via-[#eef8f6] to-[#f8f6f0] text-brand-ink selection:bg-brand-sun selection:text-brand-ink pb-12">
      {/* 1. Nav/Floating header */}
      <Header onSearch={handleSearchSubmit} language={language} setLanguage={setLanguage} />

      {/* 2. Primary Stats Band */}
      <StatsBand
        cityCount={mergedCityDirectory.length}
        spotCount={mergedPlaces.length}
        regionCount={mergedRegionsList.length}
      />

      {/* Navigation Switching Hub toolbar */}
      <div className="max-w-[1120px] mx-auto px-4 mt-12">
        <div className="bg-brand-surface border border-brand-forest/15 p-2 rounded-2xl shadow-md flex flex-wrap md:flex-nowrap gap-1 items-center justify-between">
          <div className="flex flex-wrap items-center gap-1 w-full md:w-auto">
            <button
              onClick={() => setActiveTab("explore")}
              className={`px-4 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "explore"
                  ? "bg-brand-forest text-white"
                  : "text-brand-ink hover:bg-brand-forest/5"
              }`}
            >
              <Compass className="w-4 h-4" />
              {t.worldFinder}
            </button>

            <button
              onClick={() => setActiveTab("ai")}
              className={`px-4 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "ai"
                  ? "bg-brand-forest text-white"
                  : "text-brand-ink hover:bg-brand-forest/5"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              {t.aiCoach}
            </button>

            <button
              onClick={() => setActiveTab("compare")}
              className={`px-4 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "compare"
                  ? "bg-brand-forest text-white"
                  : "text-brand-ink hover:bg-brand-forest/5"
              }`}
            >
              <Scale className="w-4 h-4" />
              {t.compareBudgets}
            </button>

            <button
              onClick={() => setActiveTab("lounge")}
              className={`px-4 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "lounge"
                  ? "bg-brand-forest text-white"
                  : "text-brand-ink hover:bg-brand-forest/5"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              {t.socialLounge}
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "profile"
                  ? "bg-brand-forest text-white"
                  : "text-brand-ink hover:bg-brand-forest/5"
              }`}
            >
              <Award className="w-4 h-4" />
              {t.mySafarHub}
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 pr-2.5 text-[10px] text-brand-muted uppercase font-bold shrink-0">
            <span className="w-2 h-2 rounded-full bg-brand-sun animate-ping"></span>
            {t.statusActive}
          </div>
        </div>
      </div>

      {/* Main Experience Screens wrapper */}
      <div className="max-w-[1120px] mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {activeTab === "explore" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
              id="discover"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* EXPLORER STREAM - LEFT (8 spans) */}
                <div className="lg:col-span-8 space-y-6">
                  <header>
                    <span className="text-xs uppercase tracking-widest font-extrabold text-brand-forest">
                      {t.worldwideDir}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-brand-ink tracking-tight mt-1 leading-none">
                      {t.searchWorldTitle}
                    </h2>
                    <p className="text-xs md:text-sm text-brand-muted mt-2 leading-relaxed">
                      {t.searchWorldDesc}
                    </p>
                  </header>

                  {/* Filter Toolbars */}
                  <div className="flex flex-wrap items-center gap-1.5" aria-label="Attraction vibe selection">
                    {[
                      { id: "all", label: language === "hi" ? "✨ सभी वाइब्स" : "✨ All Vibes" },
                      { id: "heritage", label: language === "hi" ? "🏛️ ऐतिहासिक धरोहर" : "🏛️ Heritage" },
                      { id: "nature", label: language === "hi" ? "🌲 प्रकृति और उद्यान" : "🌲 Nature & Garden" },
                      { id: "beach", label: language === "hi" ? "🏖️ समुद्र तट" : "🏖️ Surf & Coast" },
                      { id: "spiritual", label: language === "hi" ? "🙏 आध्यात्मिक स्थल" : "🙏 Spiritual" },
                      { id: "city", label: language === "hi" ? "🏙️ शहरी केंद्र" : "🏙️ Urban Hubs" }
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveFilter(cat.id)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border cursor-pointer ${
                          activeFilter === cat.id
                            ? "bg-brand-forest border-brand-forest text-white"
                            : "bg-white text-brand-ink border-brand-forest/10 hover:bg-brand-sun/5"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* State Picker and Shortcuts Deck */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-stretch p-4 border border-brand-forest/10 rounded-xl bg-white shadow-sm">
                    <div className="flex flex-col gap-1 justify-center border-b sm:border-b-0 sm:border-r border-brand-ink/5 pb-3 sm:pb-0 sm:pr-3">
                      <span className="text-[9px] text-brand-muted font-extrabold uppercase tracking-wide">
                        {t.filterRegion}
                      </span>
                      <select
                        value={activeRegion}
                        onChange={handleRegionSelect}
                        className="w-full h-9 border border-brand-forest/15 rounded-lg bg-[#fbfaf6] text-xs font-bold px-2 pr-4 outline-none focus:ring-1 focus:ring-brand-forest/20 transition-all cursor-pointer"
                      >
                        <option value="all">{language === "hi" ? "🌐 विश्व के देश" : "🌐 World Countries"}</option>
                        {mergedRegionsList.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-3 flex flex-col justify-center min-w-0 gap-1">
                      <span className="text-[9px] text-brand-muted font-extrabold uppercase tracking-wide">
                        {t.popularShortcuts}
                      </span>
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                        {matchedCities.length > 0 ? (
                          matchedCities.map((cityDest) => (
                            <button
                              key={`${cityDest.state}-${cityDest.city}`}
                              onClick={() => handleCityShortcutClick(cityDest)}
                              className="flex-shrink-0 inline-flex items-center gap-1 bg-brand-surface hover:bg-brand-forest/5 text-brand-ink border border-brand-forest/10 hover:border-brand-forest/35 active:scale-95 text-[10px] font-bold px-2.5 py-1.5 rounded-full cursor-pointer transition-all"
                            >
                              <Check className="w-2.5 h-2.5 text-brand-forest stroke-[3px]" />
                              {cityDest.city}
                            </button>
                          ))
                        ) : (
                          <span className="text-[10px] text-brand-muted italic select-none">
                            {language === "hi" ? "वर्तमान क्षेत्र से मिलान वाला कोई शॉर्टकट नहीं है।" : "No shortcuts match current region."}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* City Details Container Row */}
                  <div id="city-detail-section" className="scroll-mt-6">
                    <AnimatePresence mode="wait">
                      {selectedCity && (
                        <motion.div
                          key={`${selectedCity.state}-${selectedCity.city}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          style={{ overflow: "hidden" }}
                          transition={{ duration: 0.3 }}
                        >
                          <CityDetail
                            destination={selectedCity}
                            onClose={() => setSelectedCity(null)}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Sights Grid */}
                  <div className="space-y-4 pt-2">
                    <div className="text-xs text-brand-muted font-bold tracking-wide border-b border-brand-ink/5 pb-2 flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-brand-forest" />
                      {activeQuery ? (
                        <span>
                          {language === "hi" 
                            ? `"${activeQuery}" के लिए ${filteredPlaces.length} गंतव्य स्थान मिले` 
                            : `Found ${filteredPlaces.length} destination spots for "${activeQuery}"`}
                        </span>
                      ) : activeRegion !== "all" || activeFilter !== "all" ? (
                        <span>
                          {language === "hi" 
                            ? `निर्देशिका में ${filteredPlaces.length} मिलान वाले गंतव्य मिले` 
                            : `Found ${filteredPlaces.length} matching destinations in directory`}
                        </span>
                      ) : (
                        <span>
                          {language === "hi" 
                            ? "सफर साथी पर मुख्य आकर्षण स्थान" 
                            : "Featured Highlights on Safar Saathi"}
                        </span>
                      )}
                    </div>

                    {filteredPlaces.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {filteredPlaces.map((place, idx) => (
                          <PlaceCard key={`${place.name}-${idx}`} place={place} index={idx} />
                        ))}
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-12 border border-dashed border-brand-forest/20 rounded-2xl bg-white text-center flex flex-col items-center justify-center gap-2"
                      >
                        <Sparkles className="w-8 h-8 text-brand-coral animate-pulse" />
                        <h3 className="text-sm font-extrabold text-brand-ink">
                          {language === "hi" ? "कोई गंतव्य स्थान मानदंडों से मेल नहीं खाता" : "No Landmarks Match Criteria"}
                        </h3>
                        <p className="text-[11px] text-brand-muted max-w-sm mb-2">
                          {language === "hi" 
                            ? `हमें "${activeQuery}" के लिए कोई विशिष्ट स्थान निर्देशिका बीज नहीं मिले। गूगल मैप्स ग्रिड द्वारा स्थान खोजें।` 
                            : `We couldn't locate specific seeds for "${activeQuery}". Toggle map controls directly below to route pathways.`}
                        </p>
                        <a
                          href={currentFallbackUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-black text-white bg-brand-forest hover:bg-[#123328] px-3.5 py-2 rounded-lg"
                        >
                          <MapPin className="w-3 h-3" />
                          {language === "hi" ? "गूगल मैप्स ग्रिड पर खोजें" : "Query Google Maps Coordinate Grid"}
                        </a>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* MOST SEARCHED / SIDEBAR - RIGHT (4 spans) */}
                <div className="lg:col-span-4 space-y-6">
                  {/* WEEKLY MOST SEARCHED PLACES */}
                  <div className="bg-gradient-to-br from-[#122822] to-brand-forest p-5 rounded-2xl text-white shadow-md space-y-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4.5 h-4.5 text-brand-sun animate-bounce" />
                      <h4 className="font-extrabold text-xs md:text-sm text-white uppercase tracking-wider">
                        {t.weeklySearched}
                      </h4>
                    </div>
                    <p className="text-[11px] text-white/80 leading-relaxed">
                      {t.weeklySearchedDesc}
                    </p>

                    <div className="space-y-3.5">
                      {[
                        { index: "1", city: "Varanasi", country: "India", searches: language === "hi" ? "1.24 लाख खोजें" : "124K searches", icon: "🙏", rating: 5.0 },
                        { index: "2", city: "Jaipur", country: "India", searches: language === "hi" ? "98 हजार खोजें" : "98K searches", icon: "🏯", rating: 4.9 },
                        { index: "3", city: "Tokyo", country: "Japan", searches: language === "hi" ? "85 हजार खोजें" : "85K searches", icon: "🗼", rating: 4.9 },
                        { index: "4", city: "Paris", country: "France", searches: language === "hi" ? "74 हजार खोजें" : "74K searches", icon: "🗼", rating: 4.8 }
                      ].map((item) => (
                        <button
                          key={item.city}
                          onClick={() => {
                            const found = mergedCityDirectory.find(
                              (c) => c.city.toLowerCase() === item.city.toLowerCase()
                            );
                            if (found) handleCityShortcutClick(found);
                          }}
                          className="w-full text-left bg-white/5 hover:bg-white/10 active:scale-98 p-3 rounded-xl border border-white/10 hover:border-white/20 transition-all flex items-center justify-between gap-2.5 cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-brand-sun font-black text-sm">#{item.index}</span>
                            <span className="text-xl shrink-0">{item.icon}</span>
                            <div>
                              <strong className="text-xs text-white block font-bold leading-tight">
                                {item.city}
                              </strong>
                              <span className="text-[10px] text-white/60 block leading-none mt-0.5">
                                {item.country} • {item.searches}
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-right shrink-0">
                            <strong className="text-xs text-brand-sun font-bold block">⭐ {item.rating}</strong>
                            <small className="text-[8px] text-white/50 block">critique score</small>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* MAP REDIRECT BOX */}
                  <div className="bg-[#fcfaf5] border border-brand-forest/10 p-5 rounded-2xl shadow-sm space-y-3.5">
                    <h5 className="font-extrabold text-xs md:text-sm text-brand-ink">
                      {t.cantDecide}
                    </h5>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      {t.cantDecideDesc}
                    </p>
                    <button
                      onClick={() => setActiveTab("ai")}
                      className="w-full bg-[#df6b57] hover:bg-[#c95b48] text-white text-xs font-black py-2.5 px-4 rounded-xl cursor-pointer transition-colors"
                    >
                      {t.enterAiBtn}
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {activeTab === "ai" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <AiAssistant language={language} />
            </motion.div>
          )}

          {activeTab === "compare" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <BudgetsAndCompare language={language} />
            </motion.div>
          )}

          {activeTab === "lounge" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <SocialFeed language={language} />
            </motion.div>
          )}

          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <SafarHub language={language} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 5. Custom trip Planner section */}
      <Planner language={language} />

      {/* 6. Travel advice band */}
      <Tips language={language} />

      {/* 7. App footer */}
      <Footer language={language} />
    </div>
  );
}
