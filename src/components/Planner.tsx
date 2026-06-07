import React from "react";
import { motion } from "motion/react";
import { Compass, Sparkles, MapPin } from "lucide-react";

interface PlannerProps {
  language?: "en" | "hi";
}

export default function Planner({ language = "en" }: PlannerProps) {
  const steps = language === "hi" ? [
    {
      num: "01",
      icon: <Compass className="w-5 h-5 text-brand-sun" />,
      title: "गंतव्य खोजें",
      desc: "प्रासंगिक पर्यटक स्थलों को तुरंत प्राप्त करने के लिए कोई राज्य, शहर या विशिष्ट पर्यटक स्थल खोजें।"
    },
    {
      num: "02",
      icon: <Sparkles className="w-5 h-5 text-brand-sun" />,
      title: "यात्रा वाइब की तुलना करें",
      desc: "ऐतिहासिक धरोहर, प्रकृति, समुद्र तट, आध्यात्मिक या आधुनिक शहर के अनुभवों के आधार पर परिणामों को फ़िल्टर करें।"
    },
    {
      num: "03",
      icon: <MapPin className="w-5 h-5 text-brand-sun" />,
      title: "लोकेशन मानचित्र खोलें",
      desc: "लाइव मैप पर दिशात्मक पथ या विशिष्ट मार्गों को जानने के लिए मानचित्र बटन का उपयोग करें।"
    }
  ] : [
    {
      num: "01",
      icon: <Compass className="w-5 h-5 text-brand-sun" />,
      title: "Search Destination",
      desc: "Enter a state, city, or unique tourist spot to fetch relevant tourist places instantly."
    },
    {
      num: "02",
      icon: <Sparkles className="w-5 h-5 text-brand-sun" />,
      title: "Compare Travel Vibe",
      desc: "Filter results by Heritage, Nature, Coastal Beaches, Spiritual or Urban City experiences."
    },
    {
      num: "03",
      icon: <MapPin className="w-5 h-5 text-brand-sun" />,
      title: "Open Location Map",
      desc: "Use location buttons ONLY when you need directional paths or specific routes on a live map."
    }
  ];

  return (
    <section className="bg-brand-forest text-white py-16 px-4 md:px-8 mt-16 relative overflow-hidden" id="planner">
      {/* Background Decorative Overlay */}
      <div 
        className="absolute inset-0 opacity-15 mix-blend-overlay bg-center bg-cover pointer-events-none"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80")' }}
      />
      
      <div className="max-w-[1120px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 space-y-4"
        >
          <span className="text-xs uppercase tracking-widest font-extrabold text-brand-sun">
            {language === "hi" ? "स्मार्ट योजनाकार" : "Smart Planner"}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-white tracking-tight">
            {language === "hi" ? "यात्रा का निर्णय लेने से पहले अधिक समझदारी से योजना बनाएं।" : "Plan smarter before you decide where to travel."}
          </h2>
          <p className="text-sm text-white/80 leading-relaxed max-w-md">
            {language === "hi"
              ? "एक एकीकृत दृश्य के भीतर पर्यटक स्थलों, प्रसिद्ध मंदिरों, दर्शनीय स्थलों, स्थानीय मानचित्रों और वास्तविक संदर्भों के साथ स्थानीयकृत खोजकर्ताओं को तुरंत खोजने के लिए गहरी यात्रा निर्देशिकाओं को खोजें।"
              : "Query deep travel directories to immediately open localized explorers with tourist spots, temples, scenic viewpoints, local maps and genuine references inside a single, unified view."}
          </p>
        </motion.div>

        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="flex flex-col p-5 rounded-xl border border-white/10 bg-white/10 backdrop-blur-md shadow-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-black text-brand-sun leading-none tracking-tight">
                  {step.num}
                </span>
                <div className="p-2 bg-white/10 rounded-lg">{step.icon}</div>
              </div>
              <h3 className="text-md font-bold mb-2 text-white">{step.title}</h3>
              <p className="text-xs text-white/70 leading-relaxed flex-1">{step.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
