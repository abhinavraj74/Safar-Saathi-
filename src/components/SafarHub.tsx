import React, { useState, useEffect, useMemo } from "react";
import { User, Heart, MapPin, Award, BookOpen, Flame, CheckCircle, Sparkles, Navigation, Globe, Compass, Check } from "lucide-react";
import { internationalCities } from "../internationalData";
import { cityDirectory } from "../data";

interface Badge {
  id: string;
  name: string;
  desc: string;
  icon: string;
  condition: string;
  isUnlocked: boolean;
  color: string;
}

interface SafarHubProps {
  language?: "en" | "hi";
}

export default function SafarHub({ language = "en" }: SafarHubProps) {
  // --- INTERESTS ---
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["heritage"]);
  // --- WISHLIST AND VISITED ---
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [visited, setVisited] = useState<string[]>([]);

  const interestsList = language === "hi" ? [
    { key: "heritage", text: "🏛️ ऐतिहासिक धरोहर" },
    { key: "nature", text: "🏔️ प्रकृति और पर्वतारोहण" },
    { key: "beach", text: "⛱️ समुद्र तट और तटवर्णन" },
    { key: "spiritual", text: "🙏 आध्यात्मिक तीर्थयात्रा" },
    { key: "city", text: "🏙️ आधुनिक शहर व टेक डिस्ट्रिक्ट्स" }
  ] : [
    { key: "heritage", text: "🏛️ Heritage & History" },
    { key: "nature", text: "🏔️ Nature & Hiking" },
    { key: "beach", text: "⛱️ Beach & Coasts" },
    { key: "spiritual", text: "🙏 Spiritual Pilgrimage" },
    { key: "city", text: "🏙️ Urban & Tech Districts" }
  ];

  // Load Saved parameters from local storage on mount
  useEffect(() => {
    const savedWish = localStorage.getItem("safar_wishlist");
    if (savedWish) setWishlist(JSON.parse(savedWish));

    const savedVis = localStorage.getItem("safar_visited");
    if (savedVis) setVisited(JSON.parse(savedVis));

    const savedInt = localStorage.getItem("safar_interests");
    if (savedInt) setSelectedInterests(JSON.parse(savedInt));
  }, []);

  const handleInterestToggle = (key: string) => {
    let updated;
    if (selectedInterests.includes(key)) {
      updated = selectedInterests.filter((x) => x !== key);
    } else {
      updated = [...selectedInterests, key];
    }
    setSelectedInterests(updated);
    localStorage.setItem("safar_interests", JSON.stringify(updated));
  };

  // Dynamically calculate suggestions based on checked interests
  // Matches category seeds
  const dynamicSuggestions = useMemo(() => {
    if (selectedInterests.length === 0) return [];

    const matched: Array<{ name: string; countryState: string; category: string; description: string; type: string }> = [];

    // Check international slots
    internationalCities.forEach((c) => {
      c.spots.forEach((spot) => {
        if (selectedInterests.includes(spot.category)) {
          matched.push({
            name: `${spot.name} in ${c.city}`,
            countryState: c.country,
            category: spot.category,
            description: spot.info,
            type: "International Spot"
          });
        }
      });
    });

    // Curated recommendations limit 5 to keep UX tidy
    return matched.slice(0, 5);
  }, [selectedInterests]);

  // Save/Remove helpers
  const toggleWishlist = (target: string) => {
    let next;
    if (wishlist.includes(target)) {
      next = wishlist.filter(x => x !== target);
    } else {
      next = [...wishlist, target];
    }
    setWishlist(next);
    localStorage.setItem("safar_wishlist", JSON.stringify(next));
  };

  const toggleVisited = (target: string) => {
    let next;
    if (visited.includes(target)) {
      next = visited.filter(x => x !== target);
    } else {
      next = [...visited, target];
    }
    setVisited(next);
    localStorage.setItem("safar_visited", JSON.stringify(next));
  };

  // --- PROGRAMMATIC ACHIEVEMENT BADGES ENGINE ---
  const badgesList: Badge[] = useMemo(() => {
    const isWWorld = visited.some((v) => {
      const parts = v.split(",");
      const country = parts[parts.length - 1]?.trim().toLowerCase();
      return country && country !== "india";
    }) || wishlist.some((v) => {
      const parts = v.split(",");
      const country = parts[parts.length - 1]?.trim().toLowerCase();
      return country && country !== "india";
    });

    const heritagePicked = selectedInterests.includes("heritage");
    const spiritualPicked = selectedInterests.includes("spiritual");

    return language === "hi" ? [
      {
        id: "badge-1",
        name: "विश्व यात्री (World Traveler)",
        desc: "कम से कम एक अंतरराष्ट्रीय गंतव्य को सहेजें।",
        icon: "🌎",
        condition: "अंतरराष्ट्रीय स्थल सहेजा गया",
        isUnlocked: isWWorld,
        color: "bg-blue-100 text-blue-700 hover:border-blue-300"
      },
      {
        id: "badge-2",
        name: "इतिहास प्रेमी",
        desc: "अपनी मुख्य रुचि के रूप में 'ऐतिहासिक धरोहर' सक्रिय करें।",
        icon: "🏛️",
        condition: "ऐतिहासिक धरोहर सक्रिय है",
        isUnlocked: heritagePicked,
        color: "bg-indigo-100 text-indigo-700 hover:border-indigo-300"
      },
      {
        id: "badge-3",
        name: "एशिया एक्सप्लोरर",
        desc: "एशिया के अंदर कम से कम दो इच्छा-सूची या घूमे हुए स्थल ट्रैक करें।",
        icon: "🌸",
        condition: "एशिया स्थल >= 2",
        isUnlocked: wishlist.length + visited.length >= 2,
        color: "bg-emerald-100 text-emerald-700 hover:border-emerald-300"
      },
      {
        id: "badge-4",
        name: "गंगा रैम्बलर",
        desc: "अपनी प्रोफाइल में अध्यात्म गंतव्य या भारत पैरामीटर शामिल करें।",
        icon: "🙏",
        condition: "आध्यात्मिक तीर्थयात्रा चयनित है",
        isUnlocked: spiritualPicked,
        color: "bg-amber-100 text-amber-700 hover:border-amber-300"
      }
    ] : [
      {
        id: "badge-1",
        name: "World Traveler",
        desc: "Mark or dream of at least one international destination across borders.",
        icon: "🌎",
        condition: "Cross border landmark saved",
        isUnlocked: isWWorld,
        color: "bg-blue-100 text-blue-700 hover:border-blue-300"
      },
      {
        id: "badge-2",
        name: "History Lover",
        desc: "Enable 'Heritage & History' as a core user interest.",
        icon: "🏛️",
        condition: "Heritage interest active",
        isUnlocked: heritagePicked,
        color: "bg-indigo-100 text-indigo-700 hover:border-indigo-300"
      },
      {
        id: "badge-3",
        name: "Asia Explorer",
        desc: "Have at least two wishlist/visited tracks inside Asia.",
        icon: "🌸",
        condition: "Asia spots >= 2",
        isUnlocked: wishlist.length + visited.length >= 2,
        color: "bg-emerald-100 text-emerald-700 hover:border-emerald-300"
      },
      {
        id: "badge-4",
        name: "Ganga Rambler",
        desc: "Add India or Spiritual Pilgrimage interest parameter to your profile.",
        icon: "🙏",
        condition: "Spiritual pilgrimage checked",
        isUnlocked: spiritualPicked,
        color: "bg-amber-100 text-amber-700 hover:border-amber-300"
      }
    ];
  }, [wishlist, visited, selectedInterests]);

  const unlockedCount = badgesList.filter((b) => b.isUnlocked).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Profiler dashboard - Left */}
      <div className="lg:col-span-4 space-y-6">
        {/* Profile Card */}
        <div className="bg-brand-surface border border-brand-forest/10 p-5 rounded-2xl text-center shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-forest to-brand-sun"></div>
          
          <div className="w-20 h-20 bg-brand-forest/10 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl border-2 border-brand-forest/20 mt-2">
            🧭
          </div>
          <h3 className="font-extrabold text-brand-ink text-base md:text-lg">
            {language === "hi" ? "सफर एक्सप्लोरर" : "Safar Explorer"}
          </h3>
          <p className="text-[10px] text-[#e56b55] font-extrabold uppercase tracking-wider block mt-0.5">
            {language === "hi" ? "स्तर 3 पथप्रदर्शक" : "Level 3 Pathfinder"}
          </p>
          <div className="mt-4 flex items-center justify-center gap-6 text-xs font-semibold py-3 border-t border-b border-brand-ink/5">
            <div>
              <span className="block text-brand-forest font-extrabold text-lg">{wishlist.length}</span>
              <span className="text-brand-muted text-[10px]">
                {language === "hi" ? "इच्छा-सूची" : "Wishlist"}
              </span>
            </div>
            <div>
              <span className="block text-[#e56b55] font-extrabold text-lg">{visited.length}</span>
              <span className="text-brand-muted text-[10px]">
                {language === "hi" ? "घूमे हुए स्थान" : "Visited"}
              </span>
            </div>
            <div>
              <span className="block text-brand-sun font-extrabold text-lg">{unlockedCount}</span>
              <span className="text-brand-muted text-[10px]">
                {language === "hi" ? "बैज" : "Badges"}
              </span>
            </div>
          </div>
        </div>

        {/* User interests selector */}
        <div className="bg-brand-surface border border-brand-forest/10 p-5 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-brand-forest" />
            <h4 className="font-extrabold text-sm text-brand-ink">
              {language === "hi" ? "अपनी यात्रा शैली चुनें" : "Select Travel Personalities"}
            </h4>
          </div>
          <p className="text-[11px] text-brand-muted leading-relaxed">
            {language === "hi"
              ? "अपनी विशिष्ट रुचि प्राथमिकताओं को कस्टमाइज़ करें ताकि हमारा एआई आपके लिए विशेष रूप से मंदिरों, स्थलों और समुद्र तटों को फ़िल्टर कर सके।"
              : "Customize your unique interest preferences to let our AI filter landmarks, temples, and coasts tailored strictly to you."}
          </p>

          <div className="space-y-2">
            {interestsList.map((interest) => {
              const active = selectedInterests.includes(interest.key);
              return (
                <button
                  key={interest.key}
                  type="button"
                  onClick={() => handleInterestToggle(interest.key)}
                  className={`w-full text-left text-xs font-bold py-2.5 px-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
                    active
                      ? "bg-brand-forest text-white border-brand-forest"
                      : "bg-[#fcfaf5] text-brand-ink border-brand-forest/10 hover:bg-brand-sun/5"
                  }`}
                >
                  <span>{interest.text}</span>
                  {active && <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Badges and detailed tracking streams - Right */}
      <div className="lg:col-span-8 space-y-6">
        {/* Dynamic AI recommendations banner */}
        <div className="bg-gradient-to-br from-brand-forest to-[#1c3c31] text-white p-5 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none scale-150">
            <Sparkles className="w-48 h-48" />
          </div>

          <div className="flex items-center gap-2">
            <Compass className="w-4.5 h-4.5 text-brand-sun animate-spin-slow" />
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-brand-sun block">
              {language === "hi" ? "आपके लिए सुझाव" : "Suggested for you"}
            </span>
          </div>
          <h4 className="text-base font-extrabold mt-1.5 mb-2">
            {language === "hi" ? "मेरी रुचि की सिफारिशें" : "My Interest Recommendations"}
          </h4>

          {dynamicSuggestions.length === 0 ? (
            <p className="text-xs text-white/80 leading-relaxed">
              {language === "hi"
                ? "अपनी एक्सप्लोरर सूची के लिए कस्टम, ऑन-द-स्पॉट क्षेत्रीय गंतव्य उत्पन्न करने के लिए बाईं ओर की श्रेणी को चालू करें!"
                : "Enable one or more travel personalities on the left card to generate custom, on-the-spot regional targets for your explorer list!"}
            </p>
          ) : (
            <div className="space-y-2 mt-3 text-xs">
              {dynamicSuggestions.map((s, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-2.5 rounded-xl flex justify-between items-start gap-3">
                  <div>
                    <strong className="text-brand-sun font-bold block">{s.name}</strong>
                    <span className="text-[10px] text-white/70 block mt-0.5">{s.description}</span>
                  </div>
                  <span className="text-[9px] bg-white/10 text-white/90 border border-white/20 px-2.5 py-0.5 rounded-full shrink-0 font-bold">
                    {s.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Badges Container */}
        <div className="bg-brand-surface border border-brand-forest/10 p-5 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-4.5 h-4.5 text-brand-forest" />
            <h4 className="font-extrabold text-sm text-brand-ink">
              {language === "hi" ? "सम्मानित यात्रा बैज" : "Aesthetic Honor Badges"}
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {badgesList.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 border rounded-xl flex items-start gap-3 transition-colors ${
                  badge.isUnlocked
                    ? `border-brand-forest bg-[#fafdfb] ${badge.color}`
                    : "border-brand-ink/5 bg-[#fafaf8] opacity-60"
                }`}
              >
                <div className="text-3xl shrink-0 mt-0.5">{badge.icon}</div>
                <div>
                  <h5 className="font-extrabold text-xs md:text-sm text-brand-ink flex items-center gap-1.5">
                    {badge.name}
                    {badge.isUnlocked ? (
                      <span className="text-[9px] bg-brand-forest text-white px-2 py-0.5 rounded-full font-bold">
                        {language === "hi" ? "अनलॉक" : "UNLOCKED"}
                      </span>
                    ) : (
                      <span className="text-[9px] bg-brand-ink/10 text-brand-muted px-2 py-0.5 rounded-full font-bold">
                        {language === "hi" ? "लॉक" : "LOCKED"}
                      </span>
                    )}
                  </h5>
                  <p className="text-[11px] text-brand-muted mt-1 leading-relaxed">
                    {badge.desc}
                  </p>
                  <small className="text-[9px] text-[#e56b55] block font-semibold mt-1">
                    {language === "hi" ? "शर्त" : "Req"}: {badge.condition}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
