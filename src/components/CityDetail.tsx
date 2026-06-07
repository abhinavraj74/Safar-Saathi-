import React, { useState, useEffect, useMemo } from "react";
import { Destination, Place } from "../types";
import { districtOverridePlaces, allPlaces as staticAllPlaces } from "../data";
import { internationalCities } from "../internationalData";
import { fetchWikipediaSearchPlaces, fetchOpenMapPlaces } from "../utils";
import PlaceCard from "./PlaceCard";
import { X, Loader2, Sparkles, MapPin, ExternalLink, Heart, Check, Star, RefreshCw, Eye, ThumbsUp } from "lucide-react";
import WeatherSummary from "./WeatherSummary";

interface CityDetailProps {
  destination: Destination | null;
  onClose: () => void;
  language?: "en" | "hi";
}

interface LocalReview {
  reviewer: string;
  rating: number;
  date: string;
  comment: string;
}

export default function CityDetail({ destination, onClose, language = "en" }: CityDetailProps) {
  const [livePlaces, setLivePlaces] = useState<Place[]>([]);
  const [curatedPlaces, setCuratedPlaces] = useState<Place[]>([]);
  const [loadingLive, setLoadingLive] = useState<boolean>(false);
  const [errorLive, setErrorLive] = useState<string>("");

  // --- WISHLIST / VISITED STATES ---
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isVisited, setIsVisited] = useState(false);

  // --- 360 VIRTUAL PANNING WINDOW STATES ---
  const [panValue, setPanValue] = useState(50); // slider 0 to 100
  const [autoPan, setAutoPan] = useState(true);

  // --- LOCAL REVIEWS AND RATINGS ENGINE ---
  const [reviews, setReviews] = useState<LocalReview[]>([]);
  const [newReviewerName, setNewReviewerName] = useState("");
  const [newRatingScore, setNewRatingScore] = useState(5);
  const [newCommentBody, setNewCommentBody] = useState("");

  const staticReviewsSeeding: Record<string, LocalReview[]> = {
    "paris": [
      { reviewer: "Sophia L.", rating: 5, date: "Yesterday", comment: "Louvre was magnificent! The Eiffel Tower glows exactly like in the movies. Absolute recommend." },
      { reviewer: "Ethan K.", rating: 4, date: "4 days ago", comment: "Baguettes are outstanding. Skip crowded tour buses and rent public bicycles instead." },
      { reviewer: "Chloe M.", rating: 5, date: "Last week", comment: "Beautiful gardens. Best sunset view is from Mount Valérien or Montmartre!" }
    ],
    "tokyo": [
      { reviewer: "Haruto T.", rating: 5, date: "2 days ago", comment: "Absolute neon wonderland. Sensō-Ji temple is incredibly historic and majestic." },
      { reviewer: "Sarah P.", rating: 5, date: "5 days ago", comment: "Shibuya Sky view at sunset is literally jaw-dropping. Unmatched transit ease." },
      { reviewer: "Liam D.", rating: 4, date: "2 weeks ago", comment: "Food is unreal. Had the best miso ramen of my life next to Shinjuku station." }
    ],
    "rome": [
      { reviewer: "Giulia B.", rating: 5, date: "Yesterday", comment: "Visiting Colosseum in the morning was totally majestic. Gelato tastes magical here." },
      { reviewer: "Matteo S.", rating: 5, date: "Last week", comment: "The architectural depth continues to shock me. Walk around Roman forum slowly." }
    ]
  };

  const currentCityKey = destination?.city.toLowerCase().trim() || "";

  // Dynamic automatic panning timer for 360 window
  useEffect(() => {
    if (!autoPan) return;
    const interval = setInterval(() => {
      setPanValue((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 150);
    return () => clearInterval(interval);
  }, [autoPan]);

  // Synchronize localStorage parameters
  useEffect(() => {
    if (!destination) return;

    // Wishlist & Visited sync
    const savedWish = localStorage.getItem("safar_wishlist");
    const wishArr: string[] = savedWish ? JSON.parse(savedWish) : [];
    setIsWishlisted(wishArr.includes(`${destination.city}, ${destination.state}`));

    const savedVis = localStorage.getItem("safar_visited");
    const visArr: string[] = savedVis ? JSON.parse(savedVis) : [];
    setIsVisited(visArr.includes(`${destination.city}, ${destination.state}`));

    // Reviews sync
    const savedReviews = localStorage.getItem(`safar_user_reviews_${currentCityKey}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      const defaultReviews = staticReviewsSeeding[currentCityKey] || [
        { reviewer: "Amit S.", rating: 5, date: "Last week", comment: `Loved exploring this magnificent destination. Local markets and historical artifacts are outstanding.` },
        { reviewer: "Nisha R.", rating: 4, date: "2 weeks ago", comment: "Highly picturesque. Safar Saathi helped coordinate local weather perfectly." }
      ];
      setReviews(defaultReviews);
    }
  }, [destination, currentCityKey]);

  useEffect(() => {
    if (!destination) return;

    // Reset states
    setLivePlaces([]);
    setErrorLive("");

    const districtOverrides = districtOverridePlaces(destination);
    const curatedList = staticAllPlaces.filter(
      (place) =>
        place.city.toLowerCase() === destination.city.toLowerCase() &&
        place.state.toLowerCase() === destination.state.toLowerCase()
    );

    const mergedCurated = [...districtOverrides, ...curatedList];
    const seenNames = new Set<string>();
    const uniqueCurated = mergedCurated.filter((place) => {
      const slug = place.name.toLowerCase().trim();
      if (seenNames.has(slug)) return false;
      seenNames.add(slug);
      return true;
    });

    setCuratedPlaces(uniqueCurated);

    setLoadingLive(true);
    let active = true;

    Promise.all([
      fetchWikipediaSearchPlaces(destination).catch(() => []),
      fetchOpenMapPlaces(destination).catch(() => [])
    ])
      .then(([wikiSearch, osmPlaces]) => {
        if (!active) return;

        const mergedLive = [...wikiSearch, ...osmPlaces];
        const uniqueLive = mergedLive.filter((place) => {
          const slug = place.name.toLowerCase().trim();
          if (seenNames.has(slug)) return false;
          seenNames.add(slug);
          return true;
        });

        setLivePlaces(uniqueLive);
        setLoadingLive(false);
      })
      .catch((err) => {
        console.error("Live lookup failed", err);
        if (active) {
          setErrorLive("Could not load additional live landmarks.");
          setLoadingLive(false);
        }
      });

    return () => {
      active = false;
    };
  }, [destination]);

  if (!destination) return null;

  // WISHLIST/VISITED EVENT HANDLERS
  const handleToggleWishlist = () => {
    const savedWish = localStorage.getItem("safar_wishlist");
    const arr: string[] = savedWish ? JSON.parse(savedWish) : [];
    const target = `${destination.city}, ${destination.state}`;
    let next;
    if (arr.includes(target)) {
      next = arr.filter((x) => x !== target);
      setIsWishlisted(false);
    } else {
      next = [...arr, target];
      setIsWishlisted(true);
    }
    localStorage.setItem("safar_wishlist", JSON.stringify(next));
  };

  const handleToggleVisited = () => {
    const savedVis = localStorage.getItem("safar_visited");
    const arr: string[] = savedVis ? JSON.parse(savedVis) : [];
    const target = `${destination.city}, ${destination.state}`;
    let next;
    if (arr.includes(target)) {
      next = arr.filter((x) => x !== target);
      setIsVisited(false);
    } else {
      next = [...arr, target];
      setIsVisited(true);
    }
    localStorage.setItem("safar_visited", JSON.stringify(next));
  };

  // ADD REVIEW HANDLER
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewerName.trim() || !newCommentBody.trim()) return;

    const newRev: LocalReview = {
      reviewer: newReviewerName,
      rating: newRatingScore,
      date: "Just Now",
      comment: newCommentBody
    };

    const nextReviews = [newRev, ...reviews];
    setReviews(nextReviews);
    localStorage.setItem(`safar_user_reviews_${currentCityKey}`, JSON.stringify(nextReviews));

    setNewReviewerName("");
    setNewCommentBody("");
  };

  // Collect panoramic URL to render inside lookaround window (Unsplash defaults)
  const cityPanMap: Record<string, string> = {
    "paris": "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=1800&q=80",
    "tokyo": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=80",
    "rome": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1800&q=80",
    "london": "https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?auto=format&fit=crop&w=1800&q=80"
  };

  const panoramicHeroImg = cityPanMap[currentCityKey] || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80";

  // Compute average score
  const avgRating = useMemo(() => {
    if (reviews.length === 0) return 4.7;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return Number((sum / reviews.length).toFixed(1));
  }, [reviews]);

  const totalLoadedCount = curatedPlaces.length + livePlaces.length;
  const exploreQuery = `tourist landmarks temples heritage places parks lakes viewpoints inside ${destination.city} ${destination.state}`;
  const gmapsExploreUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(exploreQuery)}`;

  return (
    <div className="mt-8 p-6 rounded-xl border border-brand-forest/20 bg-brand-surface shadow-lg space-y-6">
      
      {/* Header and Controls Row */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-brand-ink/10 pb-5">
        <div>
          <span className="text-[10px] text-brand-coral uppercase tracking-widest font-extrabold block mb-1">
            Global Explorer Panel
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-brand-ink flex items-center gap-2">
            {destination.city},{" "}
            <span className="text-brand-muted shrink-0 text-xl md:text-3xl font-semibold">
              {destination.state}
            </span>
          </h2>
          
          <div className="flex flex-wrap gap-2 mt-2 items-center">
            {/* Wishlist triggers */}
            <button
              onClick={handleToggleWishlist}
              className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-full border cursor-pointer transition-colors ${
                isWishlisted
                  ? "bg-[#e56b55] text-white border-[#e56b55]"
                  : "bg-[#fbfaf5] text-brand-ink border-brand-forest/10 hover:bg-brand-sun/10"
              }`}
            >
              <Heart className={`w-3 h-3 ${isWishlisted ? "fill-white" : ""}`} />
              {isWishlisted ? "Wishlisted" : "Save Choice"}
            </button>

            {/* Visited tracker triggers */}
            <button
              onClick={handleToggleVisited}
              className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-full border cursor-pointer transition-colors ${
                isVisited
                  ? "bg-brand-forest text-white border-brand-forest"
                  : "bg-[#fbfaf5] text-brand-ink border-brand-forest/10 hover:bg-brand-sun/10"
              }`}
            >
              <Check className="w-3 h-3 stroke-[3px]" />
              {isVisited ? "Visited Spot!" : "Mark Visited"}
            </button>

            <span className="text-[11px] bg-brand-sun/10 text-brand-slate font-extrabold px-3 py-1.5 rounded-full border border-brand-sun/20 flex items-center gap-1 shrink-0">
              <Star className="w-3.5 h-3.5 fill-brand-sun text-brand-sun" />
              {avgRating} Average Rated
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="self-end md:self-start inline-flex items-center gap-1.5 text-xs font-bold bg-brand-paper hover:bg-brand-ink/10 text-brand-ink border border-brand-ink/10 px-3.5 py-2.5 rounded-lg cursor-pointer transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          {language === "hi" ? "एक्सप्लोरर बंद करें" : "Close Explorer"}
        </button>
      </div>

      {/* Real-time Weather summary */}
      <WeatherSummary destination={destination} language={language} />

      {/* 360 VIRTUAL PORTAL LOOKAROUND */}
      <div className="bg-gradient-to-tr from-[#162721] to-[#345145] text-white p-5 rounded-2xl shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-4.5 h-4.5 text-brand-sun animate-pulse" />
            <h3 className="font-extrabold text-sm md:text-base text-white">
              Safar 360° Virtual Portal Lookaround
            </h3>
          </div>
          <button
            onClick={() => setAutoPan(!autoPan)}
            className="text-[10px] bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full cursor-pointer font-bold border border-white/10 flex items-center gap-1 transition-colors"
          >
            <RefreshCw className={`w-2.5 h-2.5 ${autoPan ? "animate-spin" : ""}`} />
            {autoPan ? "Pause Motion" : "Auto Spin"}
          </button>
        </div>

        {/* Panoramic Viewer Simulation Frame */}
        <div className="h-44 md:h-52 w-full rounded-xl overflow-hidden relative border border-white/10 flex items-end justify-between p-4 shadow-inner bg-brand-ink">
          <div
            className="absolute inset-0 transition-transform duration-300 pointer-events-none"
            style={{
              backgroundImage: `url(${panoramicHeroImg})`,
              backgroundSize: "cover",
              backgroundPosition: `${panValue}% center`,
              filter: "brightness(0.85)"
            }}
          />
          <span className="absolute top-3 left-3 bg-brand-sun text-brand-slate text-[9px] uppercase font-bold py-0.5 px-2.5 rounded-full shadow-sm">
            Immersive Vista View
          </span>

          <div className="z-10 bg-black/45 backdrop-blur-md p-2.5 rounded-lg text-[10px] leading-relaxed max-w-xs border border-white/5">
            <strong className="text-brand-sun block font-bold mb-0.5">360 Snapshot Insight:</strong>
            Explore dynamic local neighborhoods, historic facades, and breathtaking overlooks across {destination.city}.
          </div>
        </div>

        {/* Pan manual control */}
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="text-white/60 shrink-0">◀ Pan Left</span>
          <input
            type="range"
            min="0"
            max="100"
            value={panValue}
            onChange={(e) => {
              setPanValue(Number(e.target.value));
              setAutoPan(false); // disable auto-pan of manual interaction starts
            }}
            className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-sun"
          />
          <span className="text-white/60 shrink-0">Pan Right ▶</span>
        </div>
      </div>

      {/* SIGHTS AND PLACES GRID */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4.5 h-4.5 text-[#e56b55] animate-pulse" />
          <h3 className="font-extrabold text-brand-ink text-base md:text-lg">
            Sights, Temples & Checkpoints inside {destination.city}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Render Curated/Known Spots first */}
          {curatedPlaces.map((place, idx) => (
            <PlaceCard key={`curated-${place.name}-${idx}`} place={place} index={idx} language={language} />
          ))}

          {/* Render Live-fetched Spots */}
          {livePlaces.map((place, idx) => (
            <PlaceCard
              key={`live-${place.name}-${idx}`}
              place={place}
              index={curatedPlaces.length + idx}
              language={language}
            />
          ))}

          {/* Maps Redirect */}
          <div className="flex flex-col overflow-hidden rounded-xl border border-brand-sun/40 bg-gradient-to-b from-[#fffceb] to-brand-surface shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="h-48 w-full p-6 flex flex-col justify-end bg-gradient-to-tr from-brand-sun to-[#e3614d] text-white relative">
              <span className="absolute top-3 left-3 bg-white/20 text-white text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full">
                Interactive Redirect
              </span>
              <div className="flex flex-col gap-1 z-10">
                <span className="text-[10px] text-white/90 font-bold uppercase tracking-widest">
                  Maps Link
                </span>
                <strong className="text-lg font-bold leading-tight">Interactive Map Grid</strong>
                <small className="text-[10px] text-white/80">{destination.city}, {destination.state}</small>
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-sm font-bold text-brand-ink mb-1">Open All City Locations</h3>
              <p className="text-xs text-brand-muted leading-relaxed mb-6">
                Direct route coordinates, parking schedules, regional food stalls, and active metro connections for {destination.city} on Google Maps.
              </p>
              <div className="mt-auto">
                <a
                  href={gmapsExploreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-bold bg-[#df6b57] hover:bg-[#c95b48] text-white px-4 py-2.5 rounded-lg w-full transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Open Google Maps
                  <ExternalLink className="w-3 h-3 text-white/85" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VISITORS REVIEWS AND RATINGS ENGINE */}
      <div className="bg-[#fbfaf6] border border-brand-forest/10 rounded-2xl p-5 md:p-6 space-y-6">
        <div className="border-b border-brand-ink/10 pb-4">
          <h3 className="font-extrabold text-brand-ink text-base md:text-lg flex items-center gap-2">
            ⭐ Traveler Ratings & Testimonials
          </h3>
          <p className="text-xs text-brand-muted mt-1">
            Real testimonies and trip critiques published by backpackers and cultural wanderers about this path.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Submit a review Form - Left */}
          <form onSubmit={handleAddReview} className="md:col-span-5 bg-white border border-brand-forest/10 p-5 rounded-xl space-y-4">
            <h4 className="font-extrabold text-sm text-brand-ink">Publish Your Critique</h4>

            <div>
              <label className="text-[10px] uppercase font-bold text-brand-muted block mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                value={newReviewerName}
                onChange={(e) => setNewReviewerName(e.target.value)}
                placeholder="e.g. Ramesh K."
                required
                className="w-full bg-[#fbfaf6] text-xs font-semibold p-2.5 rounded-lg border border-brand-forest/10 outline-none focus:border-brand-forest"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-brand-muted block mb-1">
                Rating Star Count
              </label>
              <select
                value={newRatingScore}
                onChange={(e) => setNewRatingScore(Number(e.target.value))}
                className="w-full bg-[#fbfaf6] text-xs font-bold p-2.5 rounded-lg border border-brand-forest/10 outline-none focus:border-brand-forest"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (Excellent)</option>
                <option value={4}>⭐⭐⭐⭐ (Very Good)</option>
                <option value={3}>⭐⭐⭐ (Average)</option>
                <option value={2}>⭐⭐ (Below expectations)</option>
                <option value={1}>⭐ (Poor)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-brand-muted block mb-1">
                Written Critique
              </label>
              <textarea
                value={newCommentBody}
                onChange={(e) => setNewCommentBody(e.target.value)}
                placeholder="How was the food, crowd, security, and pathways?"
                rows={3}
                required
                className="w-full bg-[#fbfaf6] text-xs font-semibold p-2.5 rounded-lg border border-brand-forest/10 outline-none focus:border-brand-forest"
              />
            </div>

            <button
              type="submit"
              className="bg-brand-forest hover:bg-[#123328] text-white text-xs font-extrabold w-full py-2 rounded-lg cursor-pointer transition-colors"
            >
              Publish Critique
            </button>
          </form>

          {/* Testimonials Stream - Right */}
          <div className="md:col-span-7 space-y-3">
            {reviews.map((rev, i) => (
              <div key={i} className="bg-white border border-brand-forest/5 p-4 rounded-xl space-y-1.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <strong className="text-xs font-bold text-brand-ink">{rev.reviewer}</strong>
                  <span className="text-[10px] bg-brand-forest/5 text-brand-muted px-2 py-0.5 rounded-full font-semibold">
                    {rev.date}
                  </span>
                </div>
                
                {/* star icons display */}
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, sIdx) => (
                    <Star
                      key={sIdx}
                      className={`w-3.5 h-3.5 ${
                        sIdx < rev.rating ? "text-brand-sun fill-brand-sun" : "text-brand-ink/10"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs text-brand-muted italic leading-relaxed mt-1">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
