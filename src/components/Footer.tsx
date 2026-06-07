import React from "react";
import { ArrowUp } from "lucide-react";

interface FooterProps {
  language?: "en" | "hi";
}

export default function Footer({ language = "en" }: FooterProps) {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-ink text-white py-12 px-4 md:px-8 mt-16 border-t border-white/5">
      <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div>
          <p className="text-xs text-white/50 leading-relaxed max-w-xl">
            {language === "hi"
              ? "सफर साथी - डेटा अद्भुत भारत (Incredible India) और आधिकारिक पर्यटन बोर्डों द्वारा निर्देशित है। विकिपीडिया अभिलेखागार और ओपनस्ट्रीटमैप डेटाबेस से सीधे गतिशील मीडिया लोड होता है।"
              : "Safar Saathi - data is guided by Incredible India and official tourism boards. Dynamic photorealistic media queries load directly from Wikipedia archives and OpenStreetMap databases."}
          </p>
          <p className="text-[10px] text-white/35 mt-2">
            {language === "hi"
              ? `© ${new Date().getFullYear()} सफर साथी। भारत की प्रमुख पर्यटन निर्देशिका के रूप में गर्व से तैयार किया गया।`
              : `© ${new Date().getFullYear()} Safar Saathi. Prepared with pride as India's premier tourism directory.`}
          </p>
          <p className="text-xs text-brand-sun font-bold mt-3">
            {language === "hi" ? "अभिनव कश्यप द्वारा ❤️ से निर्मित" : "Make with ❤️ by Abhinav Kashyap"}
          </p>
        </div>

        <a
          href="#top"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-brand-sun bg-white/10 hover:bg-white/15 px-4 py-2.5 rounded-full transition-colors shrink-0 cursor-pointer"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          {language === "hi" ? "वापस ऊपर जाएं" : "Back to Top"}
        </a>
      </div>
    </footer>
  );
}
