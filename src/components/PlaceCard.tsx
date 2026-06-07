import React, { useState, useEffect } from "react";
import { Place } from "../types";
import { fetchWikipediaImage } from "../utils";
import { buildPlaceDetail } from "../data";
import { ExternalLink, MapPin } from "lucide-react";
import { motion } from "motion/react";

interface PlaceCardProps {
  place: Place;
  index: number;
  key?: string | number;
  language?: "en" | "hi";
}

export default function PlaceCard({ place, index, language = "en" }: PlaceCardProps) {
  const [imgUrl, setImgUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;
    const loadImg = async () => {
      // Prioritize explicit wikiTitle, else fall back to search name
      const title = place.wikiTitle || place.name;
      if (title) {
        setLoading(true);
        const url = await fetchWikipediaImage(title);
        if (active) {
          if (url) {
            setImgUrl(url);
          }
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    loadImg();
    return () => {
      active = false;
    };
  }, [place.wikiTitle, place.name]);

  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${place.name} ${place.city} ${place.state}`
  )}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
      className="flex flex-col overflow-hidden rounded-xl border border-brand-ink/10 bg-brand-surface shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Media or Placeholder */}
      <div className="relative h-48 w-full overflow-hidden bg-brand-sky flex items-end">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={`${place.name}, ${place.city}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            onError={() => setImgUrl("")}
          />
        ) : (
          <div className="w-full h-full p-4 flex flex-col justify-end bg-gradient-to-tr from-brand-forest to-brand-ink text-white relative">
            <div className="absolute top-3 left-3 bg-white/20 text-white/90 text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full">
              {place.category}
            </div>
            <div className="flex flex-col gap-1 z-10">
              <span className="text-[10px] text-brand-sun font-bold uppercase tracking-widest">{place.category}</span>
              <strong className="text-sm font-semibold truncate leading-tight">{place.name}</strong>
              <small className="text-[10px] text-white/70">{place.state}</small>
            </div>
          </div>
        )}
        
        {imgUrl && (
          <>
            <span className="absolute top-3 left-3 z-10 bg-brand-ink/75 text-white/90 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full backdrop-blur-xs">
              Wikipedia
            </span>
            <span className="absolute left-3 bottom-3 z-10 bg-white/90 text-brand-forest-dark text-[11px] font-extrabold px-2.5 py-1 rounded-full capitalize shadow-xs">
              {place.category}
            </span>
          </>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-2">
          <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider bg-brand-forest/10 hover:bg-brand-forest/15 text-brand-forest px-2.5 py-1 rounded-full transition-colors">
            {place.type}
          </span>
        </div>
        
        <h3 className="text-md font-bold text-brand-ink mb-1 line-clamp-1">{place.name}</h3>
        <div className="text-xs font-semibold text-brand-coral mb-3">
          {place.city}, {place.state}
        </div>
        
        <p className="text-xs text-brand-muted leading-relaxed mb-4 flex-1">
          {buildPlaceDetail(place)}
        </p>

        {/* Visit Details */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="border border-brand-ink/5 bg-brand-paper/40 rounded-lg p-2 text-center text-[11px] font-semibold text-brand-muted">
            <div className="text-[9px] uppercase tracking-wider text-brand-muted/70 mb-0.5">
              {language === "hi" ? "सर्वोत्तम समय" : "Best Time"}
            </div>
            {place.bestTime}
          </div>
          <div className="border border-brand-ink/5 bg-brand-paper/40 rounded-lg p-2 text-center text-[11px] font-semibold text-brand-muted">
            <div className="text-[9px] uppercase tracking-wider text-brand-muted/70 mb-0.5">
              {language === "hi" ? "समय अवधि" : "Duration"}
            </div>
            {place.duration}
          </div>
        </div>

        {/* Tip (if exists) */}
        {place.tip && (
          <div className="border-l-4 border-brand-sun bg-brand-sun/8 text-[#69542a] text-xs p-3 rounded-r-lg mb-4 leading-relaxed">
            {place.tip}
          </div>
        )}

        {/* Action Button */}
        <div className="mt-auto pt-2 flex justify-end">
          <a
            href={mapLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 text-xs font-bold bg-brand-forest hover:bg-brand-forest-dark text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 w-full md:w-auto"
          >
            <MapPin className="w-3.5 h-3.5" />
            {language === "hi" ? "मानचित्र स्थान" : "Location"}
            <ExternalLink className="w-3 h-3 text-white/70" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
