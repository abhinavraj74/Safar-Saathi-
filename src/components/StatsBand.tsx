import React from "react";
import { motion } from "motion/react";

interface StatsBandProps {
  cityCount: number;
  spotCount: number;
  regionCount: number;
  language?: "en" | "hi";
}

export default function StatsBand({ cityCount, spotCount, regionCount, language = "en" }: StatsBandProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-[1120px] mx-auto -mt-8 px-4 relative z-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 overflow-hidden rounded-xl bg-white shadow-xl border border-brand-ink/5 divide-y md:divide-y-0 md:divide-x divide-brand-ink/10 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-forest via-brand-sun to-brand-coral" />
        
        <div className="p-6 md:p-8 flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <strong className="text-3xl md:text-4xl font-extrabold text-brand-forest tracking-tight">
            {cityCount}+
          </strong>
          <span className="text-xs md:text-sm text-brand-muted font-bold uppercase tracking-wider mt-1">
            {language === "hi" ? "शहर और कस्बे" : "Cities and Towns"}
          </span>
        </div>

        <div className="p-6 md:p-8 flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <strong className="text-3xl md:text-4xl font-extrabold text-brand-forest tracking-tight">
            {spotCount}+
          </strong>
          <span className="text-xs md:text-sm text-brand-muted font-bold uppercase tracking-wider mt-1">
            {language === "hi" ? "पर्यटक स्थल और लाइव खोजें" : "Curated Spots & Live Searches"}
          </span>
        </div>

        <div className="p-6 md:p-8 flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <strong className="text-3xl md:text-4xl font-extrabold text-brand-forest tracking-tight">
            {regionCount}
          </strong>
          <span className="text-xs md:text-sm text-brand-muted font-bold uppercase tracking-wider mt-1">
            {language === "hi" ? "कवर किए गए देश (Countries Covered)" : "World Countries Covered"}
          </span>
        </div>
      </div>
    </motion.section>
  );
}
