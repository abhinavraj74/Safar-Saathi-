import React from "react";
import { motion } from "motion/react";
import { Sun, CloudRain, Clock, Car } from "lucide-react";

interface TipsProps {
  language?: "en" | "hi";
}

export default function Tips({ language = "en" }: TipsProps) {
  const tips = language === "hi" ? [
    {
      icon: <Sun className="w-5 h-5 text-brand-coral" />,
      title: "सर्वोत्तम मौसम जानें",
      desc: "पहाड़ी स्टेशनों, तटीय समुद्र तटों और वन्यजीव क्षेत्रों में मौसम का पैटर्न आकर्षण को पूरी तरह बदल देता है। हमेशा क्षेत्रीय पूर्वानुमान की जाँच करें।"
    },
    {
      icon: <Clock className="w-5 h-5 text-brand-coral" />,
      title: "सुबह के समय को प्राथमिकता दें",
      desc: "अत्यंत लोकप्रिय पुरातात्विक क्षेत्र और स्मारक शुरुआती घंटों में उल्लेखनीय रूप से शांत रहते हैं, जिससे सुंदर दर्शन और आसान टहलने की सुविधा मिलती है।"
    },
    {
      icon: <Car className="w-5 h-5 text-brand-coral" />,
      title: "क्षेत्रीय परिवहन की योजना बनाएं",
      desc: "स्थानीय मेट्रो, ऑटो-रिक्शा, साझा टैक्सी या किराए की मोटरसाइकिलें अलग-अलग राज्यों में काफी भिन्न होती हैं। बुकिंग से पहले क्षेत्रीय विकल्पों की पुष्टि करें।"
    }
  ] : [
    {
      icon: <Sun className="w-5 h-5 text-brand-coral" />,
      title: "Check Best Seasons",
      desc: "Weather patterns completely change visual appeal across hill stations, coastal beaches, and wildlife areas. Always verify regional forecasts."
    },
    {
      icon: <Clock className="w-5 h-5 text-brand-coral" />,
      title: "Prefer Morning Slots",
      desc: "Highly popular archaeological zones and monuments remain remarkably peaceful in early hours, offering softer lighting conditions and easier walks."
    },
    {
      icon: <Car className="w-5 h-5 text-brand-coral" />,
      title: "Plan Regional Transport",
      desc: "Local metros, auto-rickshaws, shared taxis, or rented motorbikes vary radically across states. Confirm regional options prior to reservation."
    }
  ];

  return (
    <section className="max-w-[1120px] mx-auto px-4 py-16" id="tips">
      <div className="max-w-2xl mb-12">
        <span className="text-xs uppercase tracking-widest font-extrabold text-brand-coral">
          {language === "hi" ? "यात्रा ज्ञान" : "Travel Wisdom"}
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-brand-ink leading-tight tracking-tight mt-1">
          {language === "hi" ? "बाहर निकलने से पहले ध्यान रखने योग्य उपयोगी बातें" : "Helpful tips to keep in mind before you head out"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tips.map((tip, idx) => (
          <motion.article
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-6 rounded-xl border border-brand-ink/10 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="inline-flex items-center justify-center p-3 rounded-lg bg-brand-coral/5 mb-4">
              {tip.icon}
            </div>
            <h3 className="text-md font-bold text-brand-ink mb-2">{tip.title}</h3>
            <p className="text-xs text-brand-muted leading-relaxed">{tip.desc}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
