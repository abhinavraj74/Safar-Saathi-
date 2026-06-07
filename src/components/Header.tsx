import React, { useState, useRef, useEffect } from "react";
import { Search, Compass, Mic } from "lucide-react";
import { motion } from "motion/react";
import { translations } from "../translations";

interface HeaderProps {
  onSearch: (query: string) => void;
  language: "en" | "hi";
  setLanguage: (lang: "en" | "hi") => void;
}

export default function Header({ onSearch, language, setLanguage }: HeaderProps) {
  const [inputValue, setInputValue] = useState("");
  const t = translations[language];

  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          console.error(e);
        }
      }
    };
  }, []);

  const toggleVoiceSearch = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceError(
        language === "hi"
          ? "इस ब्राउज़र पर वॉयस सर्च समर्थित नहीं है।"
          : "Voice search is not supported on this browser."
      );
      setTimeout(() => setVoiceError(""), 4000);
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.error(e);
        }
      }
      setIsListening(false);
      return;
    }

    setVoiceError("");
    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === "hi" ? "hi-IN" : "en-IN";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputValue(transcript);
          onSearch(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        if (event.error === "not-allowed") {
          setVoiceError(language === "hi" ? "माइक्रोफ़ोन अनुमति ब्लॉक है" : "Microphone permission is blocked");
        } else if (event.error === "no-speech") {
          setVoiceError(language === "hi" ? "कोई आवाज़ नहीं सुनी गई" : "No speech was detected");
        } else {
          setVoiceError(language === "hi" ? `त्रुटि: ${event.error}` : `Error: ${event.error}`);
        }
        setTimeout(() => setVoiceError(""), 4000);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.error(err);
      setVoiceError(language === "hi" ? "वॉयस सर्च शुरू करने में विफल" : "Failed to start voice search");
      setTimeout(() => setVoiceError(""), 4000);
      setIsListening(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  const handleQuickChip = (term: string) => {
    setInputValue(term);
    onSearch(term);
  };

  const quickChips = ["Satara", "Hampi", "Tawang", "Puducherry"];

  return (
    <header className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#10221f] text-white px-4 py-20" id="top">
      
      {/* Dynamic Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />

      {/* Hero Background Imagery */}
      <div 
        className="absolute inset-0 bg-cover bg-center brightness-[0.45] z-0 animate-pulse transition-transform duration-[12000ms] ease-in-out scale-105 select-none pointer-events-none"
        style={{ 
          backgroundImage: `linear-gradient(90deg, rgba(9,20,18,0.85), rgba(9,20,18,0.5), rgba(9,20,18,0.2)), linear-gradient(0deg, rgba(9,20,18,0.9), transparent 50%), url("https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80")` 
        }}
      />

      {/* Main Bar Navigation (Fixed top float) */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[1120px] flex items-center justify-between gap-4 px-5 py-3 rounded-full border border-white/15 bg-[#0b1a17]/80 backdrop-blur-md shadow-xl">
        <a href="#top" className="flex items-center gap-3.5 group relative">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-brand-sun via-brand-coral to-[#df6b57] p-[1.5px] shadow-lg shadow-brand-sun/10 group-hover:shadow-brand-sun/20 group-hover:scale-105 transition-all duration-300">
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-white/5 rounded-xl pointer-events-none" />
            <div className="w-full h-full rounded-xl bg-[#0b1a17] flex items-center justify-center text-brand-sun relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,rgba(240,195,108,0.5),transparent_70%)]" />
              <svg className="w-5 h-5 fill-none stroke-current text-brand-sun drop-shadow-[0_2px_4px_rgba(240,195,108,0.4)]" viewBox="0 0 48 48">
                {/* Detailed compass design */}
                <circle cx="24" cy="24" r="18" strokeWidth="1.5" strokeDasharray="3 3" className="opacity-60" />
                <path strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M24 6l4 14 14 4-14 4-4 14-4-14-14-4 14-4 4-14Z" fill="rgba(240,195,108,0.15)" />
                <circle cx="24" cy="24" r="3.5" fill="#df6b57" stroke="#091412" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col select-none justify-center">
            <span className="text-sm md:text-base font-black tracking-tight text-white bg-gradient-to-r from-white via-white to-brand-sun/90 bg-clip-text text-transparent group-hover:text-brand-sun transition-colors">
              Safar Saathi
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[8px] text-white/50 tracking-widest uppercase font-extrabold bg-white/5 px-1.5 py-0.5 rounded-sm border border-white/5">
                {language === "en" ? "Global Travel Atlas" : "वैश्विक यात्रा एटलस"}
              </span>
              <span className="text-[8px] text-brand-sun font-extrabold animate-pulse">✓ verified</span>
            </div>
          </div>
        </a>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1">
            {["Discover", "Cities", "Planner", "Tips"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-3 py-1.5 rounded-full text-xs font-bold text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                {item === "Discover" && language === "hi" ? "खोजें" : 
                 item === "Cities" && language === "hi" ? "शहर" :
                 item === "Planner" && language === "hi" ? "योजनाकार" :
                 item === "Tips" && language === "hi" ? "युक्तियाँ" : item}
              </a>
            ))}
          </div>

          {/* Hindi Slide Switch Selector */}
          <div className="relative flex items-center bg-[#091412] p-1 rounded-full border border-white/10 shadow-inner select-none shrink-0 overflow-hidden">
            <div className="flex items-center relative z-10">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 text-[10px] md:text-xs font-black rounded-full transition-all duration-300 cursor-pointer ${
                  language === "en"
                    ? "bg-brand-sun text-[#091412] font-black shadow-md scale-105"
                    : "text-white/60 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("hi")}
                className={`px-3 py-1 text-[10px] md:text-xs font-black rounded-full transition-all duration-300 cursor-pointer ${
                  language === "hi"
                    ? "bg-brand-sun text-[#091412] font-black shadow-md scale-105"
                    : "text-white/60 hover:text-white"
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>
        </div>
      </nav>
 
       {/* Hero Core Content */}
       <div className="relative z-10 w-full max-w-[980px] mx-auto flex flex-col items-center lg:items-start text-center lg:text-left mt-10">
         <motion.p
           key={`tag-${language}`}
           initial={{ opacity: 0, y: -10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="text-brand-sun text-xs font-extrabold uppercase tracking-widest mb-3"
         >
           {t.heroTag}
         </motion.p>
         
         <motion.h1
           key={`title-${language}`}
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.1 }}
           className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.95] mb-5 max-w-2xl bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent"
         >
           {t.heroTitle}
         </motion.h1>

        <motion.p
          key={`desc-${language}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl mb-8"
        >
          {t.heroDesc}
        </motion.p>

        {/* Hero Search Box */}
        <motion.form
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 shadow-2xl mb-6 flex flex-col gap-2"
        >
          <label htmlFor="heroSearch" className="text-white/60 text-xs font-bold self-start px-1.5 mb-1">
            {t.searchLabel}
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Compass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-ink/50" />
              <input
                id="heroSearch"
                type="search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isListening ? (language === "hi" ? "सुन रहा हूँ... बोलिए" : "Listening... Speak now") : t.searchPlaceholder}
                className="w-full h-12 pl-10 pr-12 rounded-lg bg-white text-brand-ink outline-none text-xs font-semibold focus:ring-4 focus:ring-brand-sun/30 border border-brand-ink/5 transition-all"
              />
              <button
                type="button"
                onClick={toggleVoiceSearch}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all flex items-center justify-center ${
                  isListening
                    ? "bg-[#e56b55] text-white animate-pulse shadow-lg"
                    : "text-brand-ink/65 hover:text-[#e56b55] hover:bg-black/5"
                }`}
                title={language === "hi" ? "आवाज द्वारा खोजें" : "Voice Search"}
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>
            <button
              type="submit"
              className="h-12 bg-brand-sun hover:bg-[#ffd175] active:scale-[0.98] text-brand-ink font-extrabold text-xs px-6 rounded-lg flex items-center justify-center gap-1.5 transition-all shrink-0 cursor-pointer shadow-md"
            >
              <Search className="w-3.5 h-3.5" />
              {t.searchBtn}
            </button>
          </div>
          {isListening ? (
            <p className="text-brand-sun text-[10px] text-left px-1.5 mt-1 select-none flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="font-bold">
                {language === "hi" ? "बोलिए, आपकी खोज प्रक्रिया में है..." : "Speak now, searching automatically..."}
              </span>
            </p>
          ) : voiceError ? (
            <p className="text-red-400 font-bold text-[10px] text-left px-1.5 mt-1 select-none flex items-center gap-1.5 animate-bounce">
              <span>⚠️ {voiceError}</span>
            </p>
          ) : (
            <p className="text-white/50 text-[10px] text-left px-1.5 mt-1 select-none">
              {language === "en" ? (
                <>💡 Tip: Try clicking the microphone icon to search by voice or type: <span className="font-bold text-brand-sun">heritage</span>, <span className="font-bold text-brand-sun">spiritual</span>, <span className="font-bold text-brand-sun">beach</span>.</>
              ) : (
                <>💡 संकेत: आवाज़ से खोजने के लिए माइक दबाएँ या टाइप करें: <span className="font-bold text-brand-sun">ऐतिहासिक धरोहर</span>, <span className="font-bold text-brand-sun">आध्यात्मिक</span>, <span className="font-bold text-brand-sun">समुद्र तट</span>।</>
              )}
            </p>
          )}
        </motion.form>

        {/* Quick Chips Selection */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center lg:justify-start gap-2 max-w-2xl"
        >
          <span className="text-[10px] text-white/50 uppercase tracking-wider font-extrabold mr-1 shadow-xs">
            {t.popularLabel}
          </span>
          {quickChips.map((chip) => (
            <button
              key={chip}
              onClick={() => handleQuickChip(chip)}
              className="bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 active:scale-95 text-xs font-bold text-white px-3.5 py-1.5 rounded-full transition-all cursor-pointer"
            >
              {chip === "Puducherry" && language === "hi" ? "पुदुचेरी" :
               chip === "Satara" && language === "hi" ? "सतारा" :
               chip === "Hampi" && language === "hi" ? "हम्पी" :
               chip === "Tawang" && language === "hi" ? "तवांग" : chip}
            </button>
          ))}
        </motion.div>
      </div>
    </header>
  );
}
