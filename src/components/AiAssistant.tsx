import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, MessageSquare, Loader2, RefreshCw, Compass, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";
import { translations } from "../translations";

interface AiAssistantProps {
  language?: "en" | "hi";
}

export default function AiAssistant({ language = "en" }: AiAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOnlineMode, setIsOnlineMode] = useState<boolean | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  interface ChatMessage {
    role: "user" | "model";
    text: string;
    isOffline?: boolean;
  }

  // Suggested prompt pills - highly prioritized and customized for India
  const promptSuggestions = language === "en" ? [
    { label: "Varanasi Guide", text: "Draft a spiritual & cultural 3-day itinerary for Varanasi including Ganga Aarti, ancient alley routes, Sarnath, and hidden local street foods." },
    { label: "Jaipur Heritage", text: "Create a visual and historic itinerary of Jaipur's palaces (Hawa Mahal, Amber Fort) with photography tips and budget estimation in INR." },
    { label: "Hampi Backpacking", text: "Recommend a historical backpacking layout across dynamic ruins of Hampi with local stay tips." },
    { label: "Kerala Backwaters", text: "Plan a serene, natural, eco-friendly houseboat vacation in Alappuzha, Kerala." }
  ] : [
    { label: "वाराणसी गाइड", text: "गंगा आरती, प्राचीन गलियों के मार्ग, सारनाथ और स्थानीय स्ट्रीट फूड सहित वाराणसी के लिए एक 3-दिवसीय आध्यात्मिक औरं सांस्कृतिक यात्रा कार्यक्रम का मसौदा तैयार करें।" },
    { label: "जयपुर विरासत", text: "फोटोग्राफी युक्तियों और भारतीय रुपये में बजट अनुमान के साथ जयपुर के महलों (हवा महल, आमेर किला) का एक ऐतिहासिक यात्रा कार्यक्रम बनाएं।" },
    { label: "हम्पी बैकपैकिंग", text: "स्थानीय ठहरने की युक्तियों के साथ हम्पी के गतिशील खंडहरों में यात्रा और ठहरने की रूपरेखा का सुझाव दें।" },
    { label: "केरल बैकवाटर्स", text: "अलापुझा, केरल में एक शांत, प्राकृतिक और पर्यावरण के अनुकूल हाउसबोट छुट्टी की योजना बनाएं।" }
  ];

  // Self-test server connection status on load
  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => {
        setIsOnlineMode(data.mode === "online");
      })
      .catch(() => {
        setIsOnlineMode(false); // Standalone offline
      });

    // Seed welcoming message
    const welcomeMsg = language === "en" 
      ? `### Namaste & Welcome to Safar Saathi's AI Assistant! 🌍✨🙏\n\nI am your companion for world and domestic travel coordination, proudly prioritizing Incredible India. Ask me about **Varanasi's sacred ghats, Jaipur's history, local budgets, perfect seasons, multi-day itineraries, or packing guides**.\n\n*Which destination would you like to explore today?*`
      : `### नमस्ते और सफर साथी के एआई कोच में आपका स्वागत है! 🌍✨🙏\n\nमैं आपका व्यक्तिगत यात्रा समन्वयक हूँ, जो भारत और वैश्विक गंतव्यों के लिए मार्गदर्शन करता है। मुझसे **वाराणसी के पवित्र घाटों, जयपुर के इतिहास, स्थानीय बजट, सही मौसम, या यात्रा कार्यक्रम** के बारे में पूछें।\n\n*आज आप किस स्थान की यात्रा करना चाहते हैं?*`;

    setMessages([
      {
        role: "model",
        text: welcomeMsg
      }
    ]);
  }, [language]);

  // Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    // Push User prompt
    const nextHistory = [...messages, { role: "user", text: textToSend } as ChatMessage];
    setMessages(nextHistory);
    setInput("");
    setIsLoading(true);

    try {
      const chatHistoryForBackend = messages.map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistoryForBackend
        })
      });

      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: data.text,
          isOffline: data.isOffline
        }
      ]);
    } catch (err) {
      console.error("Chat request failed", err);
      // Failover Offline Response Builder locally
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: language === "en" 
            ? `### 📡 Offline Mode Activated (India First)\n\nOur cloud link is resting, but I can provide top Indian recommendations:\n\n* **Varanasi (UP):** Boat ride at sunrise, temple visits, budget approx ₹2,500/day.\n* **Jaipur (Rajasthan):** Grand palaces, spicy Rajasthani thali, budget approx ₹3,000/day.\n* **Hampi (Karnataka):** Captivating stony heritage, budget approx ₹1,800/day.\n\n*Specify your preferred destination, and I will share budget and secret tips instantly!*`
            : `### 📡 ऑफ़लाइन मोड सक्रिय (भारत प्रथम)\n\nहमारा मुख्य क्लाउड लिंक बंद है, लेकिन मैं फिर भी शीर्ष भारतीय गंतव्यों की जानकारी दे सकता हूँ:\n\n* **वाराणसी (यूपी):** सूर्योदय नाव यात्रा, मंदिर दर्शन, अनुमानित बजट ₹2,500/दिन।\n* **जयपुर (राजस्थान):** भव्य महल, राजस्थानी थाली, अनुमानित बजट ₹3,000/दिन।\n* **हम्पी (कर्नाटक):** अद्भुत पत्थर के खंडहर, बजट ₹1,800/दिन।\n\n*किसी विशेष शहर के बारे में पूछें, मैं तुरंत जानकारी प्रदान करूँगा!*`,
          isOffline: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-brand-surface border border-brand-forest/10 rounded-2xl flex flex-col h-[650px] overflow-hidden shadow-lg">
      {/* Assistant Header */}
      <div className="bg-gradient-to-r from-brand-forest to-[#1f4037] p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-brand-sun/20 p-2 rounded-xl text-brand-sun animate-pulse">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm md:text-base flex items-center gap-1.5">
              {language === "hi" ? "सफर साथी एआई कोच" : "Safar Saathi AI Coach"}
            </h3>
            <p className="text-[10px] text-white/80">
              {language === "hi" ? "आर्टिफिशियल इंटेलिजेंस यात्रा योजनाकार" : "Generative Travel Planner & Local Expert"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isOnlineMode === null ? (
            <span className="flex items-center gap-1.5 text-[9px] bg-white/10 text-white/70 px-2.5 py-1 rounded-full">
              <Loader2 className="w-2.5 h-2.5 animate-spin" />
              {t.initializingAi}
            </span>
          ) : isOnlineMode ? (
            <span className="flex items-center gap-1 text-[9px] bg-[#10b981]/10 text-[#4ade80] border border-[#10b981]/20 px-2.5 py-1 rounded-full font-bold">
              ● {t.cloudConnected}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[9px] bg-brand-sun/10 text-brand-sun border border-brand-sun/20 px-2.5 py-1 rounded-full font-bold font-mono">
              ● {t.offlineMode}
            </span>
          )}
        </div>
      </div>

      {/* Messages Frame */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-[#fbf9f4]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 max-w-[85%] ${
              msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === "user" ? "bg-[#e56b55] text-white text-xs font-bold" : "bg-[#1d4d3d] text-brand-sun"
            }`}>
              {msg.role === "user" ? "ME" : <Compass className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed shadow-sm ${
              msg.role === "user"
                ? "bg-brand-forest text-white rounded-tr-none"
                : "bg-white text-brand-ink rounded-tl-none border border-brand-forest/5"
            }`}>
              <div className="prose prose-sm max-w-none whitespace-pre-line font-medium text-brand-ink">
                {msg.text}
              </div>
              
              {msg.isOffline && (
                <div className="mt-2.5 pt-1.5 border-t border-brand-sun/20 flex items-center gap-1 text-[10px] text-brand-muted">
                  <ShieldAlert className="w-3.5 h-3.5 text-brand-coral" />
                  {language === "hi" 
                    ? "सुरक्षित ऑफ़लाइन बैकअप मॉड्यूल द्वारा सटीक रूप से संसाधित।" 
                    : "Processed with high fidelity by local backup engines."}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 max-w-[85%] mr-auto items-center">
            <div className="w-8 h-8 rounded-full bg-[#1d4d3d] flex items-center justify-center text-brand-sun animate-spin">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div className="bg-white border border-brand-forest/5 p-4 rounded-2xl rounded-tl-none text-xs text-brand-muted flex items-center gap-2.5 shadow-sm">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-forest" />
              <span>
                {language === "hi" 
                  ? "सफर साथी आपके लिए विशेष यात्रा कार्यक्रम बना रहा है..." 
                  : "Safar Saathi is computing custom itineraries..."}
              </span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Suggestion Pills */}
      {messages.length <= 1 && (
        <div className="px-4 py-2 border-t border-brand-forest/5 bg-[#faf8f3]">
          <small className="text-[10px] text-brand-muted font-bold block mb-1.5 uppercase tracking-wider">
            {language === "hi" ? "शुरू करने के लिए लोकप्रिय विचार" : "Popular Ideas to Begin"}
          </small>
          <div className="flex flex-wrap gap-1.5">
            {promptSuggestions.map((pill, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(pill.text)}
                type="button"
                className="text-[11px] font-semibold bg-white hover:bg-brand-sun/10 text-brand-forest border border-brand-forest/10 hover:border-brand-sun/40 px-3 py-1.5 rounded-full cursor-pointer transition-colors"
              >
                💡 {pill.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Tray */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(input);
        }}
        className="p-4 bg-white border-t border-brand-forest/10 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.welcomeInputPlaceholder}
          className="flex-1 bg-brand-surface text-brand-ink placeholder-brand-muted/70 text-xs md:text-sm px-4 py-3 rounded-xl border border-brand-forest/10 focus:outline-none focus:border-brand-forest font-medium"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-brand-forest hover:bg-[#123328] disabled:bg-brand-muted text-white p-3 rounded-xl cursor-pointer transition-colors flex items-center justify-center shadow-md shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
