import React, { useState, useMemo, useEffect } from "react";
import { cityDirectory } from "../data";
import { internationalCities, internationalDestinations } from "../internationalData";
import { Destination } from "../types";
import { 
  Scale, Wallet, Calculator, Coins, AlertCircle, Sparkles, Check, 
  Thermometer, UserPlus, Calendar, Loader, Globe, ExternalLink, RefreshCw, FileText 
} from "lucide-react";

interface BudgetsAndCompareProps {
  language?: "en" | "hi";
}

export default function BudgetsAndCompare({ language = "en" }: BudgetsAndCompareProps) {
  // --- STATE FOR COMPARE ---
  const [pendingCityAKey, setPendingCityAKey] = useState("Hampi|Karnataka");
  const [pendingCityBKey, setPendingCityBKey] = useState("Varanasi|Uttar Pradesh");
  const [cityAKey, setCityAKey] = useState("Hampi|Karnataka");
  const [cityBKey, setCityBKey] = useState("Varanasi|Uttar Pradesh");

  // --- LIVE GOOGLE SEARCH GROUNDED COMPONENT ---
  const [googleCompareData, setGoogleCompareData] = useState<any>(null);
  const [fetchingGoogle, setFetchingGoogle] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchRealGoogleExpenses = async (cityAVal: string, cityBVal: string) => {
    setFetchingGoogle(true);
    setErrorMessage("");
    try {
      const cityAName = cityAVal.split("|")[0];
      const cityBName = cityBVal.split("|")[0];
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cityA: cityAName, cityB: cityBName })
      });
      if (!res.ok) {
        throw new Error(language === "hi" ? "गूगल सच ग्राउंडेड खर्च डेटा प्राप्त करने में विफल" : "Failed to obtain live Google expenses analysis");
      }
      const data = await res.json();
      setGoogleCompareData(data);
    } catch (err: any) {
      console.error("Live expenses capture failed:", err);
      setErrorMessage(err.message || "An error occurred while connecting to live pricing engine.");
    } finally {
      setFetchingGoogle(false);
    }
  };

  useEffect(() => {
    fetchRealGoogleExpenses(cityAKey, cityBKey);
  }, []);

  // --- STATE FOR CALCULATOR ---
  const [pendingCalcStay, setPendingCalcStay] = useState(5000); // Accommodation/night INR
  const [pendingCalcTransport, setPendingCalcTransport] = useState(25000); // Ticket/transport INR
  const [pendingCalcFood, setPendingCalcFood] = useState(1500); // Daily food per person INR
  const [pendingCalcDays, setPendingCalcDays] = useState(5);
  const [pendingCalcPersons, setPendingCalcPersons] = useState(2);
  const [pendingCalcMisc, setPendingCalcMisc] = useState(4000); // shopping / extra INR

  const [calcStay, setCalcStay] = useState(5000);
  const [calcTransport, setCalcTransport] = useState(25000);
  const [calcFood, setCalcFood] = useState(1500);
  const [calcDays, setCalcDays] = useState(5);
  const [calcPersons, setCalcPersons] = useState(2);
  const [calcMisc, setCalcMisc] = useState(4000);

  const handleCompare = () => {
    setCityAKey(pendingCityAKey);
    setCityBKey(pendingCityBKey);
    fetchRealGoogleExpenses(pendingCityAKey, pendingCityBKey);
  };

  const handleCalculate = () => {
    setCalcStay(pendingCalcStay);
    setCalcTransport(pendingCalcTransport);
    setCalcFood(pendingCalcFood);
    setCalcDays(pendingCalcDays);
    setCalcPersons(pendingCalcPersons);
    setCalcMisc(pendingCalcMisc);
  };

  // Build merged available list of cities
  const mergedDirectories = useMemo(() => {
    const localSeeds: Array<{ city: string; state: string; isIntl: boolean; badge: string }> = cityDirectory.map(
      (c) => ({
        city: c.city,
        state: c.state,
        isIntl: false,
        badge: "India"
      })
    );
    const intlSeeds = internationalCities.map((c) => ({
      city: c.city,
      state: c.country,
      isIntl: true,
      badge: "International"
    }));
    return [...localSeeds, ...intlSeeds];
  }, []);

  // Hydrate City metadata helpers
  const getCityDetails = (city: string, state: string) => {
    const isIntlObj = internationalCities.find(
      (c) => c.city.toLowerCase() === city.toLowerCase() && c.country.toLowerCase() === state.toLowerCase()
    );

    if (isIntlObj) {
      return {
        city: isIntlObj.city,
        country: isIntlObj.country,
        region: isIntlObj.region,
        rating: isIntlObj.rating,
        season: isIntlObj.bestVisitingTime,
        costs: isIntlObj.estimatedCost,
        activities: isIntlObj.activities,
        desc: isIntlObj.description,
        isInternational: true
      };
    }

    // fallback metadata for indian cities
    return {
      city: city,
      country: "India",
      region: "Asia",
      rating: 4.6,
      season: "October to March",
      costs: { backpacker: 20, midrange: 50, luxury: 140 },
      activities: ["Local Heritage Sightseeing", "Traditional Cuisine Tasting", "Street Shopping"],
      desc: `A vibrant district situated in ${state}, India, offering deep spiritual centers, historic fortresses, and bustling markets.`,
      isInternational: false
    };
  };

  const itemA = useMemo(() => {
    const [city, state] = cityAKey.split("|");
    return getCityDetails(city, state);
  }, [cityAKey]);

  const itemB = useMemo(() => {
    const [city, state] = cityBKey.split("|");
    return getCityDetails(city, state);
  }, [cityBKey]);

  // --- BUDGET COMPUTATIONS ---
  const calculatedOutput = useMemo(() => {
    const totalStay = calcStay * calcDays;
    const totalTransport = calcTransport * calcPersons;
    const totalFood = calcFood * calcDays * calcPersons;
    const totalMisc = calcMisc * calcPersons;

    const totalCost = totalStay + totalTransport + totalFood + totalMisc;
    const costPerPerson = totalCost / calcPersons;

    return {
      stay: totalStay,
      transport: totalTransport,
      food: totalFood,
      misc: totalMisc,
      total: totalCost,
      perPerson: costPerPerson
    };
  }, [calcStay, calcTransport, calcFood, calcDays, calcPersons, calcMisc]);

  return (
    <div className="space-y-8">
      {/* SECTION 1: COMPARE ENGINE */}
      <div className="bg-brand-surface border border-brand-forest/10 p-6 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-brand-forest/15 text-brand-forest rounded-xl">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-brand-ink text-base md:text-lg">
              {language === "hi" ? "गंतव्यों की साथ-साथ तुलना करें" : "Compare Destinations side-by-side"}
            </h3>
            <p className="text-xs text-brand-muted">
              {language === "hi"
                ? "लागत, रेटिंग, गतिविधियों और अनुकूल मौसम का विश्लेषण करने के लिए किन्हीं दो वैश्विक या घरेलू शहरों का चयन करें।"
                : "Select any two global or domestic cities to analyze costs, ratings, activities, and climate seasons."}
            </p>
          </div>
        </div>

        {/* Pickers */}
        <div className="bg-[#fbfaf5] p-5 rounded-xl border border-brand-ink/5 mb-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-extrabold text-brand-coral block mb-1">
                {language === "hi" ? "गंतव्य स्थान A" : "Destination A"}
              </label>
              <select
                value={pendingCityAKey}
                onChange={(e) => setPendingCityAKey(e.target.value)}
                className="w-full bg-white text-xs md:text-sm text-brand-ink border border-brand-forest/10 rounded-lg p-2.5 outline-none font-bold"
              >
                {mergedDirectories.map((c, i) => (
                  <option key={`a-${i}`} value={`${c.city}|${c.state}`}>
                    ({c.badge === "India" && language === "hi" ? "भारत" : c.badge === "International" && language === "hi" ? "अंतरराष्ट्रीय" : c.badge}) {c.city}, {c.state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-extrabold text-[#e56b55] block mb-1">
                {language === "hi" ? "गंतव्य स्थान B" : "Destination B"}
              </label>
              <select
                value={pendingCityBKey}
                onChange={(e) => setPendingCityBKey(e.target.value)}
                className="w-full bg-white text-xs md:text-sm text-brand-ink border border-brand-forest/10 rounded-lg p-2.5 outline-none font-bold"
              >
                {mergedDirectories.map((c, i) => (
                  <option key={`b-${i}`} value={`${c.city}|${c.state}`}>
                    ({c.badge === "India" && language === "hi" ? "भारत" : c.badge === "International" && language === "hi" ? "अंतरराष्ट्रीय" : c.badge}) {c.city}, {c.state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              onClick={handleCompare}
              className="bg-brand-forest hover:bg-brand-ink text-white text-xs md:text-sm font-extrabold px-6 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm w-full sm:w-auto"
            >
              <Scale className="w-4 h-4 text-brand-sun" />
              {language === "hi" ? "गंतव्यों की तुलना करें" : "Compare Destinations"}
            </button>
          </div>
        </div>

        {/* Visual comparison grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CITY CARD A */}
          <div className="bg-white border md:border-r border-brand-forest/5 p-5 rounded-xl space-y-4">
            <div>
              {itemA.isInternational && (
                <span className="inline-flex items-center text-[9px] font-bold uppercase tracking-wider bg-[#e56b55]/10 text-brand-coral px-2.5 py-0.5 rounded-full mb-1">
                  {language === "hi" ? "अंतरराष्ट्रीय केंद्र" : "International Hub"}
                </span>
              )}
              <h4 className="text-xl font-extrabold text-brand-ink">
                {itemA.city}, <span className="text-brand-muted text-sm">{language === "hi" && itemA.country === "India" ? "भारत" : itemA.country}</span>
              </h4>
              <p className="text-xs text-brand-muted italic mt-1 leading-relaxed">
                {language === "hi" && !itemA.isInternational && itemA.city === "Hampi" 
                  ? "हम्पी, कर्नाटक का ऐतिहासिक वैभव, जो पत्थर की खूबसूरत वास्तुकला, पुरातात्विक चमत्कारों और आध्यात्मिक वाइब को प्रस्तुत करता है।"
                  : itemA.desc}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-brand-ink/5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-brand-muted font-semibold">{language === "hi" ? "लोकप्रियता सूचकांक:" : "Popularity Index:"}</span>
                <span className="font-extrabold text-brand-forest">⭐ {itemA.rating}/5.0</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-brand-muted font-semibold flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-[#e56b55]" />
                  {language === "hi" ? "सर्वोत्तम मौसम:" : "Best Season:"}
                </span>
                <span className="font-bold text-brand-ink">
                  {language === "hi" && itemA.season === "October to March" ? "अक्टूबर से मार्च" : itemA.season}
                </span>
              </div>
            </div>

            {/* Cost bar comparison */}
            <div className="bg-[#fbf9f4] p-3 rounded-lg space-y-2 border border-brand-ink/5">
              <strong className="text-[10px] text-brand-muted uppercase font-extrabold block">
                {language === "hi" ? "अनुमानित दैनिक लागत (INR)" : "Estimated Daily Costs (INR)"}
              </strong>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span>{language === "hi" ? "बैकपैकर:" : "Backpacker:"}</span>
                  <strong>₹{(itemA.costs.backpacker * 85).toLocaleString()}/{language === "hi" ? "दिन" : "day"}</strong>
                </div>
                <div className="w-full bg-[#eeeae0] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#8caa9a] h-full" style={{ width: `${Math.min(itemA.costs.backpacker, 100)}%` }}></div>
                </div>

                <div className="flex justify-between text-[11px] font-semibold mt-1">
                  <span>{language === "hi" ? "मध्यम श्रेणी:" : "Mid Range:"}</span>
                  <strong>₹{(itemA.costs.midrange * 85).toLocaleString()}/{language === "hi" ? "दिन" : "day"}</strong>
                </div>
                <div className="w-full bg-[#eeeae0] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-brand-forest h-full" style={{ width: `${Math.max(20, Math.min(itemA.costs.midrange / 2.5, 100))}%` }}></div>
                </div>
              </div>
            </div>

            {/* Landmark Activities */}
            <div className="space-y-1.5">
              <strong className="text-[10px] text-brand-muted uppercase font-extrabold block">
                {language === "hi" ? "मुख्य गतिविधियां" : "Core Activities"}
              </strong>
              <div className="flex flex-wrap gap-1">
                {itemA.activities.map((act, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-brand-surface text-brand-forest border border-brand-forest/10 px-2 py-1 rounded-md flex items-center gap-1 font-semibold"
                  >
                    <Check className="w-2.5 h-2.5" />
                    {language === "hi" && act === "Local Heritage Sightseeing" ? "स्थानीय विरासत स्थल दर्शन" : language === "hi" && act === "Traditional Cuisine Tasting" ? "पारंपरिक भोजन का स्वाद" : language === "hi" && act === "Street Shopping" ? "स्ट्रीट शॉपिंग" : act}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CITY CARD B */}
          <div className="bg-white border p-5 rounded-xl space-y-4">
            <div>
              {itemB.isInternational && (
                <span className="inline-flex items-center text-[9px] font-bold uppercase tracking-wider bg-[#e56b55]/10 text-brand-coral px-2.5 py-0.5 rounded-full mb-1">
                  {language === "hi" ? "अंतरराष्ट्रीय केंद्र" : "International Hub"}
                </span>
              )}
              <h4 className="text-xl font-extrabold text-brand-ink">
                {itemB.city}, <span className="text-brand-muted text-sm">{language === "hi" && itemB.country === "India" ? "भारत" : itemB.country}</span>
              </h4>
              <p className="text-xs text-brand-muted italic mt-1 leading-relaxed">
                {language === "hi" && !itemB.isInternational && itemB.city === "Varanasi" 
                  ? "वाराणसी, उत्तर प्रदेश का आध्यात्मिक केंद्र, जो प्राचीन गंगा घाटों, सुंदर आरती समारोहों और गहरी भारतीय संस्कृति को दर्शाता है।"
                  : itemB.desc}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-brand-ink/5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-brand-muted font-semibold">{language === "hi" ? "लोकप्रियता सूचकांक:" : "Popularity Index:"}</span>
                <span className="font-extrabold text-brand-forest">⭐ {itemB.rating}/5.0</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-brand-muted font-semibold flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-[#e56b55]" />
                  {language === "hi" ? "सर्वोत्तम मौसम:" : "Best Season:"}
                </span>
                <span className="font-bold text-brand-ink">
                  {language === "hi" && itemB.season === "October to March" ? "अक्टूबर से मार्च" : itemB.season}
                </span>
              </div>
            </div>

            {/* Cost bar comparison */}
            <div className="bg-[#fbf9f4] p-3 rounded-lg space-y-2 border border-brand-ink/5">
              <strong className="text-[10px] text-brand-muted uppercase font-extrabold block">
                {language === "hi" ? "अनुमानित दैनिक लागत (INR)" : "Estimated Daily Costs (INR)"}
              </strong>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span>{language === "hi" ? "बैकपैकर:" : "Backpacker:"}</span>
                  <strong>₹{(itemB.costs.backpacker * 85).toLocaleString()}/{language === "hi" ? "दिन" : "day"}</strong>
                </div>
                <div className="w-full bg-[#eeeae0] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#8caa9a] h-full" style={{ width: `${Math.min(itemB.costs.backpacker, 100)}%` }}></div>
                </div>

                <div className="flex justify-between text-[11px] font-semibold mt-1">
                  <span>{language === "hi" ? "मध्यम श्रेणी:" : "Mid Range:"}</span>
                  <strong>₹{(itemB.costs.midrange * 85).toLocaleString()}/{language === "hi" ? "दिन" : "day"}</strong>
                </div>
                <div className="w-full bg-[#eeeae0] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-brand-forest h-full" style={{ width: `${Math.max(20, Math.min(itemB.costs.midrange / 2.5, 100))}%` }}></div>
                </div>
              </div>
            </div>

            {/* Landmark Activities */}
            <div className="space-y-1.5">
              <strong className="text-[10px] text-brand-muted uppercase font-extrabold block">
                {language === "hi" ? "मुख्य गतिविधियां" : "Core Activities"}
              </strong>
              <div className="flex flex-wrap gap-1">
                {itemB.activities.map((act, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-brand-surface text-brand-forest border border-brand-forest/10 px-2 py-1 rounded-md flex items-center gap-1 font-semibold"
                  >
                    <Check className="w-2.5 h-2.5" />
                    {language === "hi" && act === "Local Heritage Sightseeing" 
                      ? "स्थानीय विरासत स्थल दर्शन" 
                      : language === "hi" && act === "Traditional Cuisine Tasting" 
                        ? "पारंपरिक भोजन का स्वाद" 
                        : language === "hi" && act === "Street Shopping" 
                          ? "स्ट्रीट शॉपिंग" 
                          : act}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* GOOGLE LIVE EXPENSE ANALYSIS */}
        <div className="mt-8 pt-8 border-t border-brand-forest/15">
          <div className="bg-gradient-to-br from-[#1d3d33] to-[#122821] text-white p-5 md:p-6 rounded-xl space-y-6 shadow-md relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-brand-forest/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-brand-sun shrink-0" />
                <div>
                  <h4 className="font-extrabold text-[#fdf8e6] text-sm md:text-base flex items-center flex-wrap gap-2">
                    {language === "hi" ? "गूगल लाइव गंतव्य खर्च विश्लेषण" : "Grounded Real-Time Expenses Analysis"}
                    <span className="text-[10px] bg-brand-sun/20 text-brand-sun px-2 py-0.5 rounded font-bold tracking-wider uppercase border border-brand-sun/20">
                      {language === "hi" ? "गूगल सर्च द्वारा संचालित" : "Grounded by Google"}
                    </span>
                  </h4>
                  <p className="text-white/60 text-[11px] mt-0.5 font-medium">
                    {language === "hi" 
                      ? "इंटरनेट से वास्तविक समय में खोजे गए स्थानीय आवास, दैनिक भोजन और परिवहन खर्च।" 
                      : "Verifiable, real-world costs and local living rates scanned live from active travel indices."}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => fetchRealGoogleExpenses(cityAKey, cityBKey)}
                disabled={fetchingGoogle}
                className="text-xs bg-white/10 hover:bg-white/15 border border-white/20 active:scale-[0.98] transition-all text-brand-sun font-bold px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shrink-0 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${fetchingGoogle ? "animate-spin" : ""}`} />
                {fetchingGoogle 
                  ? (language === "hi" ? "सिंक हो रहा है..." : "Syncing live...") 
                  : (language === "hi" ? "गूगल से पुनः सिंक करें" : "Sync Live Google costs")}
              </button>
            </div>

            {fetchingGoogle ? (
              <div className="py-12 flex flex-col items-center justify-center text-center gap-3 relative z-10">
                <Loader className="w-8 h-8 text-brand-sun animate-spin" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-[#fcf9f2]">
                    {language === "hi" ? "गूगल सर्च से वर्तमान यात्रा खर्चों को संकलित किया जा रहा है..." : "Scanning travel databases & fetching real expense data from Google Search..."}
                  </p>
                  <p className="text-[10px] text-white/50">
                    {language === "hi" ? "नवीनतम विनिमय दरें, होटल औसत और स्थानीय मूल्य निर्धारण को सत्यापित किया जा रहा है।" : "Verifying currency conversions, local market adjustments, and live averages."}
                  </p>
                </div>
              </div>
            ) : errorMessage ? (
              <div className="bg-red-500/15 border border-red-500/30 p-4.5 rounded-lg flex items-start gap-2.5 text-xs text-red-100 font-medium">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold mb-0.5">{language === "hi" ? "डेटा कनेक्शन में त्रुटि:" : "Connection/API State Alert:"}</strong>
                  <p>{errorMessage}</p>
                </div>
              </div>
            ) : googleCompareData ? (
              <div className="space-y-6 relative z-10 transition-all duration-300">
                {/* Comparison Summary Text */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg space-y-1.5">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-brand-sun flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" />
                    {language === "hi" ? "गूगल मूल्य निर्धारण विश्लेषण संदर्भ" : "Google Grounded Travel Cost Verdict"}
                  </span>
                  <p className="text-xs text-white/95 leading-relaxed font-semibold">
                    {language === "hi" && googleCompareData.comparisonSummaryHindi 
                      ? googleCompareData.comparisonSummaryHindi 
                      : googleCompareData.comparisonSummary}
                  </p>
                </div>

                {/* Costs side by side cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Dest A */}
                  <div className="bg-black/20 p-4 rounded-lg border border-white/5 space-y-4">
                    <div className="flex justify-between items-start border-b border-white/5 pb-2.5">
                      <div>
                        <h5 className="font-extrabold text-base text-brand-sun">
                          {googleCompareData.destinationA?.name || itemA.city}
                        </h5>
                        <p className="text-[10px] text-white/50 font-semibold">
                          {language === "hi" ? "इंटरनेट सत्यापित औसत बजट" : "Verified current live rates"}
                        </p>
                      </div>
                      <span className="text-[10px] font-extrabold text-white/80 bg-white/10 px-2 py-0.5 rounded uppercase font-mono">
                        INR (₹)
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="flex justify-between border-b border-white/15 pb-1">
                        <span className="text-white/60">{language === "hi" ? "आवास (प्रति रात):" : "Lodging Average (per night):"}</span>
                        <strong className="text-white font-mono">₹{(googleCompareData.destinationA?.accommodationPerNight || 0).toLocaleString()}</strong>
                      </div>
                      <div className="flex justify-between border-b border-white/15 pb-1">
                        <span className="text-white/60">{language === "hi" ? "स्थानीय परिवहन (प्रति दिन):" : "Daily Local Transit:"}</span>
                        <strong className="text-white font-mono">₹{(googleCompareData.destinationA?.localTransportPerDay || 0).toLocaleString()}</strong>
                      </div>
                      <div className="flex justify-between border-b border-white/15 pb-1">
                        <span className="text-white/60">{language === "hi" ? "भोजन तथा खान-पान:" : "Average Food (per day):"}</span>
                        <strong className="text-white font-mono">₹{(googleCompareData.destinationA?.averageMealCostPerDay || 0).toLocaleString()}</strong>
                      </div>
                      <div className="flex justify-between text-white/80 pb-1">
                        <span className="text-white/60">{language === "hi" ? "शॉपिंग व आपातकालीन सामान:" : "Activities & Incidentals:"}</span>
                        <strong className="text-white font-mono">₹{(googleCompareData.destinationA?.extraExpensesPerDay || 0).toLocaleString()}</strong>
                      </div>
                    </div>

                    {/* Cost tiers */}
                    <div className="pt-3 border-t border-white/5 grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-white/5 p-1 rounded">
                        <span className="text-[8px] text-white/50 block font-bold uppercase">{language === "hi" ? "बजट" : "Backpacker"}</span>
                        <strong className="text-[10px] text-brand-sun font-mono font-bold">₹{(googleCompareData.destinationA?.totalDailyBudgetBackpacker || 0).toLocaleString()}/d</strong>
                      </div>
                      <div className="bg-white/5 p-1 rounded">
                        <span className="text-[8px] text-white/50 block font-bold uppercase">{language === "hi" ? "मध्यम" : "Midrange"}</span>
                        <strong className="text-[10px] text-emerald-400 font-mono font-bold">₹{(googleCompareData.destinationA?.totalDailyBudgetMidrange || 0).toLocaleString()}/d</strong>
                      </div>
                      <div className="bg-white/5 p-1 rounded">
                        <span className="text-[8px] text-white/50 block font-bold uppercase">{language === "hi" ? "लक्जरी" : "Luxury"}</span>
                        <strong className="text-[10px] text-cyan-400 font-mono font-bold">₹{(googleCompareData.destinationA?.totalDailyBudgetLuxury || 0).toLocaleString()}/d</strong>
                      </div>
                    </div>

                    {/* Factsheet text */}
                    {googleCompareData.destinationA?.latestFactSheet && (
                      <div className="text-[10.5px] bg-[#0c1c16]/30 p-2.5 rounded text-white/85 leading-relaxed border border-white/5 font-medium">
                        <strong className="text-brand-sun block font-extrabold text-[9px] uppercase tracking-wider mb-0.5">{language === "hi" ? "गूगल सच सूचकांक विश्लेषण:" : "Verified Source Factsheet:"}</strong>
                        {googleCompareData.destinationA.latestFactSheet}
                      </div>
                    )}
                  </div>

                  {/* Dest B */}
                  <div className="bg-black/20 p-4 rounded-lg border border-white/5 space-y-4">
                    <div className="flex justify-between items-start border-b border-white/5 pb-2.5">
                      <div>
                        <h5 className="font-extrabold text-base text-brand-sun">
                          {googleCompareData.destinationB?.name || itemB.city}
                        </h5>
                        <p className="text-[10px] text-white/50 font-semibold">
                          {language === "hi" ? "इंटरनेट सत्यापित औसत बजट" : "Verified current live rates"}
                        </p>
                      </div>
                      <span className="text-[10px] font-extrabold text-white/80 bg-white/10 px-2 py-0.5 rounded uppercase font-mono">
                        INR (₹)
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="flex justify-between border-b border-white/15 pb-1">
                        <span className="text-white/60">{language === "hi" ? "आवास (प्रति रात):" : "Lodging Average (per night):"}</span>
                        <strong className="text-white font-mono">₹{(googleCompareData.destinationB?.accommodationPerNight || 0).toLocaleString()}</strong>
                      </div>
                      <div className="flex justify-between border-b border-white/15 pb-1">
                        <span className="text-white/60">{language === "hi" ? "स्थानीय परिवहन (प्रति दिन):" : "Daily Local Transit:"}</span>
                        <strong className="text-white font-mono">₹{(googleCompareData.destinationB?.localTransportPerDay || 0).toLocaleString()}</strong>
                      </div>
                      <div className="flex justify-between border-b border-white/15 pb-1">
                        <span className="text-white/60">{language === "hi" ? "भोजन तथा खान-पान:" : "Average Food (per day):"}</span>
                        <strong className="text-white font-mono">₹{(googleCompareData.destinationB?.averageMealCostPerDay || 0).toLocaleString()}</strong>
                      </div>
                      <div className="flex justify-between text-white/80 pb-1">
                        <span className="text-white/60">{language === "hi" ? "शॉपिंग व आपातकालीन सामान:" : "Activities & Incidentals:"}</span>
                        <strong className="text-white font-mono">₹{(googleCompareData.destinationB?.extraExpensesPerDay || 0).toLocaleString()}</strong>
                      </div>
                    </div>

                    {/* Cost tiers */}
                    <div className="pt-3 border-t border-white/5 grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-white/5 p-1 rounded">
                        <span className="text-[8px] text-white/50 block font-bold uppercase">{language === "hi" ? "बजट" : "Backpacker"}</span>
                        <strong className="text-[10px] text-brand-sun font-mono font-bold">₹{(googleCompareData.destinationB?.totalDailyBudgetBackpacker || 0).toLocaleString()}/d</strong>
                      </div>
                      <div className="bg-white/5 p-1 rounded">
                        <span className="text-[8px] text-white/50 block font-bold uppercase">{language === "hi" ? "मध्यम" : "Midrange"}</span>
                        <strong className="text-[10px] text-emerald-400 font-mono font-bold">₹{(googleCompareData.destinationB?.totalDailyBudgetMidrange || 0).toLocaleString()}/d</strong>
                      </div>
                      <div className="bg-white/5 p-1 rounded">
                        <span className="text-[8px] text-white/50 block font-bold uppercase">{language === "hi" ? "लक्जरी" : "Luxury"}</span>
                        <strong className="text-[10px] text-cyan-400 font-mono font-bold">₹{(googleCompareData.destinationB?.totalDailyBudgetLuxury || 0).toLocaleString()}/d</strong>
                      </div>
                    </div>

                    {/* Factsheet text */}
                    {googleCompareData.destinationB?.latestFactSheet && (
                      <div className="text-[10.5px] bg-[#0c1c16]/30 p-2.5 rounded text-white/85 leading-relaxed border border-white/5 font-medium">
                        <strong className="text-brand-sun block font-extrabold text-[9px] uppercase tracking-wider mb-0.5">{language === "hi" ? "गूगल सच सूचकांक विश्लेषण:" : "Verified Source Factsheet:"}</strong>
                        {googleCompareData.destinationB.latestFactSheet}
                      </div>
                    )}
                  </div>
                </div>

                {/* Sources list */}
                {googleCompareData.sources && googleCompareData.sources.length > 0 && (
                  <div className="pt-4 border-t border-white/15 space-y-2.5">
                    <span className="text-[10px] uppercase font-bold text-white/50 flex items-center gap-1.5 select-none tracking-widest">
                      <ExternalLink className="w-3.5 h-3.5 text-brand-sun" />
                      {language === "hi" ? "सत्यापित गूगल संदर्भ सूत्रो" : "Verified Live Google Search Citation Sources"}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {googleCompareData.sources.map((src: any, index: number) => (
                        <a
                          key={index}
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/5 hover:bg-white/10 active:scale-[0.98] border border-white/10 px-3 py-1.5 rounded text-[11px] text-brand-sun hover:text-white transition-all inline-flex items-center gap-1.5 font-semibold"
                        >
                          <FileText className="w-3 h-3 text-white/40 shrink-0" />
                          <span className="truncate max-w-[200px]">{src.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-white/40 font-semibold uppercase tracking-wider">
                {language === "hi" ? "डेटा की लोड होने की प्रतीक्षा की जा रही है..." : "Synchronizing true Google pricing index..."}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: BUDGET CALCULATOR */}
      <div className="bg-brand-surface border border-brand-forest/10 p-6 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-brand-sun/15 text-brand-slate rounded-xl">
            <Calculator className="w-5 h-5 text-brand-coral" />
          </div>
          <div>
            <h3 className="font-extrabold text-brand-ink text-base md:text-lg">
              {language === "hi" ? "स्मार्ट वैश्विक यात्रा बजट कैलकुलेटर" : "Smart Global Travel Budget Calculator"}
            </h3>
            <p className="text-xs text-brand-muted">
              {language === "hi"
                ? "अपने कुल वांछित बजट आवश्यकताओं की रूपरेखा तैयार करने के लिए आवास, परिवहन मार्ग, भोजन और आपात स्थिति की गणना करें।"
                : "Compute accommodation, transport routes, meals, and emergencies to map out your total funding needs."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls - Left */}
          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-brand-muted block mb-1">
                  {language === "hi" ? "आवास दर (₹ / रात)" : "Stay Rate (₹ / Night)"}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-brand-muted">₹</span>
                  <input
                    type="number"
                    value={pendingCalcStay}
                    onChange={(e) => setPendingCalcStay(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-white text-xs md:text-sm text-brand-ink border border-brand-forest/10 rounded-lg py-2 pl-7 pr-3 font-semibold outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-brand-muted block mb-1">
                  {language === "hi" ? "परिवहन / उड़ानें (₹ / व्यक्ति)" : "Transit / Flights (₹ / Person)"}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-brand-muted">₹</span>
                  <input
                    type="number"
                    value={pendingCalcTransport}
                    onChange={(e) => setPendingCalcTransport(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-white text-xs md:text-sm text-brand-ink border border-brand-forest/10 rounded-lg py-2 pl-7 pr-3 font-semibold outline-none border-brand-forest/10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-brand-muted block mb-1">
                  {language === "hi" ? "भोजन व्यय (₹ / दिन / व्यक्ति)" : "Food Expense (₹ / Day / Head)"}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-brand-muted">₹</span>
                  <input
                    type="number"
                    value={pendingCalcFood}
                    onChange={(e) => setPendingCalcFood(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-white text-xs md:text-sm text-brand-ink border border-brand-forest/10 rounded-lg py-2 pl-7 pr-3 font-semibold outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-brand-muted block mb-1">
                  {language === "hi" ? "आपातकालीन / ख़रीदारी (₹ / व्यक्ति)" : "Emergency / Shopping (₹ / Head)"}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-brand-muted">₹</span>
                  <input
                    type="number"
                    value={pendingCalcMisc}
                    onChange={(e) => setPendingCalcMisc(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-white text-xs md:text-sm text-brand-ink border border-[#749682]/10 rounded-lg py-2 pl-7 pr-3 font-semibold outline-none border-brand-forest/10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-brand-ink/5">
              <div>
                <label className="text-[10px] uppercase font-bold text-brand-muted block mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-brand-forest" />
                  {language === "hi" ? "यात्रा अवधि (दिनों में)" : "Trip Duration (Days)"}
                </label>
                <input
                  type="number"
                  value={pendingCalcDays}
                  onChange={(e) => setPendingCalcDays(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-white text-xs md:text-sm text-brand-ink border border-brand-forest/10 rounded-lg p-2 font-semibold outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-brand-muted block mb-1 flex items-center gap-1">
                  <UserPlus className="w-3 h-3 text-[#e56b55]" />
                  {language === "hi" ? "यात्रियों का समूह आकार" : "Traveler Group Size"}
                </label>
                <input
                  type="number"
                  value={pendingCalcPersons}
                  onChange={(e) => setPendingCalcPersons(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-white text-xs md:text-sm text-brand-ink border border-brand-forest/10 rounded-lg p-2 font-semibold outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleCalculate}
                className="w-full bg-[#df6b57] hover:bg-[#c95b48] text-white text-xs md:text-sm font-extrabold py-3 rounded-lg transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Calculator className="w-4 h-4 text-white animate-pulse" />
                {language === "hi" ? "बजट की गणना करें" : "Calculate Travel Budget"}
              </button>
            </div>
          </div>

          {/* Results Summary & Visualization - Right */}
          <div className="lg:col-span-6 bg-gradient-to-br from-brand-forest to-[#1c3e34] p-6 rounded-2xl text-white space-y-4">
            <div>
              <span className="text-[9px] uppercase tracking-widest font-extrabold text-brand-sun block">
                {language === "hi" ? "कुल संचित खर्च" : "Aggregated Expenses"}
              </span>
              <h4 className="text-3xl font-extrabold text-white mt-1">
                ₹{calculatedOutput.total.toLocaleString()}{" "}
                <span className="text-xs font-semibold text-white/70">INR</span>
              </h4>
              <p className="text-[11px] text-white/80 mt-1">
                {language === "hi"
                  ? <>प्रति यात्री <strong className="text-brand-sun">₹{Math.round(calculatedOutput.perPerson).toLocaleString()}</strong> का अनुमानित औसत।</>
                  : <>Estimated average of <strong className="text-brand-sun">₹{Math.round(calculatedOutput.perPerson).toLocaleString()}</strong> per traveler.</>}
              </p>
            </div>

            {/* Proportion charts */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-[10px] uppercase font-bold text-white/60 block">
                {language === "hi" ? "लागत आवंटन विश्लेषण" : "Cost Allocation Breakdown"}
              </span>
              
              <div className="space-y-1.5 text-xs">
                {/* Stay bar */}
                <div className="flex justify-between font-semibold">
                  <span>{language === "hi" ? "होटल्स और ठहराव:" : "Hotels / Stay:"}</span>
                  <span>₹{calculatedOutput.stay.toLocaleString()}</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-brand-sun h-full" style={{ width: `${(calculatedOutput.stay / calculatedOutput.total) * 100 || 0}%` }}></div>
                </div>

                {/* Transport bar */}
                <div className="flex justify-between font-semibold mt-1">
                  <span>{language === "hi" ? "परिवहन व यात्रा:" : "Transit:"}</span>
                  <span>₹{calculatedOutput.transport.toLocaleString()}</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#4ade80] h-full" style={{ width: `${(calculatedOutput.transport / calculatedOutput.total) * 100 || 0}%` }}></div>
                </div>

                {/* Food bar */}
                <div className="flex justify-between font-semibold mt-1">
                  <span>{language === "hi" ? "भोजन तथा खान-पान:" : "Food & Dining:"}</span>
                  <span>₹{calculatedOutput.food.toLocaleString()}</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#e56b55] h-full" style={{ width: `${(calculatedOutput.food / calculatedOutput.total) * 100 || 0}%` }}></div>
                </div>
              </div>
            </div>

            {/* Premium Hack Advisory */}
            <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex items-start gap-2 text-xs">
              <AlertCircle className="w-4 h-4 text-brand-sun shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="text-brand-sun block font-bold mb-0.5">
                  {language === "hi" ? "बजट हैक टिप:" : "Budget Hack Tip:"}
                </strong>
                {language === "hi"
                  ? <>एक साथ समूह गतिविधि टिकट बुक करने या नाश्ते वाले होटलों को चुनने से आप तुरंत कुल लागत में <span className="font-bold underline text-brand-sun">18%</span> तक की बचत कर सकते हैं!</>
                  : <>Booking group activity tickets or combining breakfast-included hotels could instantly slice up to <span className="font-bold underline text-brand-sun">18%</span> off your estimated total cost here!</>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
