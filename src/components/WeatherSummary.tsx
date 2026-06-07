import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Sun,
  CloudSun,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  Snowflake,
  CloudLightning,
  Cloud,
  Thermometer,
  Wind,
  Droplets,
  Calendar,
  RefreshCw,
  Compass,
  Umbrella,
  AlertTriangle,
  Loader2,
  Info
} from "lucide-react";
import { Destination } from "../types";
import { geocodeCity } from "../utils";

interface WeatherSummaryProps {
  destination: Destination;
  language?: "en" | "hi";
}

interface CurrentWeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  weatherCode: number;
  time: string;
}

interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Sun,
  CloudSun,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  Snowflake,
  CloudLightning,
  Cloud
};

function getWeatherDetails(code: number, language: "en" | "hi" = "en") {
  if (language === "hi") {
    switch (code) {
      case 0:
        return {
          label: "साफ मौसम",
          color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
          advice: "शानदार दिन! ऐतिहासिक स्थलों की यात्रा, दर्शनीय स्थलों और फोटोग्राफी के लिए बिल्कुल सही मौसम। पर्याप्त पानी पिएं और धूप का चश्मा पहनें।",
          iconName: "Sun"
        };
      case 1:
      case 2:
      case 3:
        return {
          label: "आंशिक रूप से बादल",
          color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
          advice: "सुहावना मौसम और हल्के बादल। शहर के स्मारकों और स्थानीय पार्कों में घूमने के लिए आदर्श मौसम है।",
          iconName: "CloudSun"
        };
      case 45:
      case 48:
        return {
          label: "कोहरा / धुंध",
          color: "text-zinc-500 bg-zinc-500/10 border-zinc-500/20",
          advice: "सुबह के समय कोहरे के कारण दृश्यता कम हो सकती है। दोपहर के समय घूमना शुरू करना बेहतर रहेगा।",
          iconName: "CloudFog"
        };
      case 51:
      case 53:
      case 55:
        return {
          label: "हल्की बूंदाबांदी",
          color: "text-sky-400 bg-sky-400/10 border-sky-400/20",
          advice: "हल्की स्थानीयकृत बारिश की संभावना है। हल्की बरसाती या छोटा छाता अपने साथ रखना उचित है।",
          iconName: "CloudDrizzle"
        };
      case 61:
      case 63:
      case 65:
        return {
          label: "लगातार बारिश",
          color: "text-blue-600 bg-blue-600/10 border-blue-600/20",
          advice: "तेज़ लगातार बारिश। इनडोर संग्रहालयों, शिल्प केंद्रों या आरामदायक स्थानीय कैफे में जाने पर विचार करें।",
          iconName: "CloudRain"
        };
      case 56:
      case 57:
      case 66:
      case 67:
      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86:
        return {
          label: "बर्फबारी / अत्यधिक ठंड",
          color: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
          advice: "ठंडी हवाएं या बर्फबारी। खुद को परतों में ढकें और अच्छे गर्म ऊनी कपड़े पहनें।",
          iconName: "Snowflake"
        };
      case 80:
      case 81:
      case 82:
        return {
          label: "बारिश की बौछारें",
          color: "text-[#3b82f6] bg-blue-500/10 border-blue-500/20",
          advice: "अल्पकालिक बारिश की बौछारें। छाता तैयार रखें या बारिश रुकने तक किसी सुरक्षित स्थान पर प्रतीक्षा करें।",
          iconName: "CloudRain"
        };
      case 95:
      case 96:
      case 99:
        return {
          label: "गरज के साथ तूफान",
          color: "text-red-500 bg-red-400/10 border-red-500/20",
          advice: "सक्रिय बिजली और आंधी-तूफान। घर के अंदर शरण लें। पहाड़ी रास्तों पर जाने की योजना को टाल दें।",
          iconName: "CloudLightning"
        };
      default:
        return {
          label: "घने बादल",
          color: "text-neutral-500 bg-neutral-500/10 border-neutral-500/20",
          advice: "ठंडा और सुखद मौसम। सामान्य घूमने के लिए बिल्कुल सुरक्षित। आपकी यात्रा मंगलमय हो!",
          iconName: "Cloud"
        };
    }
  }

  switch (code) {
    case 0:
      return {
        label: "Clear Sky",
        color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
        advice: "Perfect day for heritage walks, sightseeing, and outdoor photography! Stay hydrated and wear sunglasses.",
        iconName: "Sun"
      };
    case 1:
    case 2:
    case 3:
      return {
        label: "Partly Cloudy",
        color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
        advice: "Pleasant light and cozy clouds. Ideal weather for walking around city monuments and local nature parks.",
        iconName: "CloudSun"
      };
    case 45:
    case 48:
      return {
        label: "Foggy/Misty",
        color: "text-zinc-500 bg-zinc-500/10 border-zinc-500/20",
        advice: "Mist or foggy conditions might reduce early morning views. Perfect for late morning exploring.",
        iconName: "CloudFog"
      };
    case 51:
    case 53:
    case 55:
      return {
        label: "Light Drizzle",
        color: "text-sky-400 bg-sky-400/10 border-sky-400/20",
        advice: "Slight localized drizzle. Carrying a light windcheater or small pocket umbrella is advised.",
        iconName: "CloudDrizzle"
      };
    case 61:
    case 63:
    case 65:
      return {
        label: "Steady Rain",
        color: "text-blue-600 bg-blue-600/10 border-blue-600/20",
        advice: "Heavy steady rain. Consider visiting indoor museums, craft outlets, or cozy regional diners.",
        iconName: "CloudRain"
      };
    case 56:
    case 57:
    case 66:
    case 67:
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return {
        label: "Snowy/Cold Draft",
        color: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
        advice: "Chilly cold winds or snowfall observed. Dress in layers, wear premium woolen warmers.",
        iconName: "Snowflake"
      };
    case 80:
    case 81:
    case 82:
      return {
        label: "Rain Showers",
        color: "text-[#3b82f6] bg-blue-500/10 border-blue-500/20",
        advice: "Passing convective rain showers. Keep an umbrella ready or find rest stops until they blow over.",
        iconName: "CloudRain"
      };
    case 95:
    case 96:
    case 99:
      return {
        label: "Thunderstorms",
        color: "text-red-500 bg-red-400/10 border-red-500/20",
        advice: "Active storms and lightning. Seek shelter indoors. Postpone mountain view checkpoints or high altitude climbs.",
        iconName: "CloudLightning"
      };
    default:
      return {
        label: "Overcast",
        color: "text-neutral-500 bg-neutral-500/10 border-neutral-500/20",
        advice: "Cool, light-filled overcast. Safe and pleasant for general exploration. Have a great journey!",
        iconName: "Cloud"
      };
  }
}

export default function WeatherSummary({ destination, language = "en" }: WeatherSummaryProps) {
  const [current, setCurrent] = useState<CurrentWeatherData | null>(null);
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchWeather = async (silent = false) => {
    if (!silent) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }
    setError("");

    try {
      const coords = await geocodeCity(destination);
      if (!coords) {
        setError("Geocoding failed. Could not locate coordinates to query the local weather grid.");
        setLoading(false);
        setRefreshing(false);
        return;
      }

      const params = new URLSearchParams({
        latitude: coords.lat.toString(),
        longitude: coords.lon.toString(),
        current: "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m",
        daily: "temperature_2m_max,temperature_2m_min,weather_code",
        timezone: "auto",
        forecast_days: "3"
      });

      const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Weather database responded with an error code status.");
      }

      const data = await response.json();
      const cur = data.current;
      const daily = data.daily;

      setCurrent({
        temp: cur.temperature_2m,
        feelsLike: cur.apparent_temperature,
        humidity: cur.relative_humidity_2m,
        windSpeed: cur.wind_speed_10m,
        precipitation: cur.precipitation,
        weatherCode: cur.weather_code,
        time: cur.time
      });

      const forecastItems: DailyForecast[] = [];
      for (let i = 0; i < Math.min(3, daily.time.length); i++) {
        forecastItems.push({
          date: daily.time[i],
          maxTemp: daily.temperature_2m_max[i],
          minTemp: daily.temperature_2m_min[i],
          weatherCode: daily.weather_code[i]
        });
      }
      setForecast(forecastItems);
    } catch (err) {
      console.error("Local weather fetch failed:", err);
      setError("Failed to pull live weather metrics. Please ensure you are connected to the network and retry.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWeather(false);
  }, [destination.city, destination.state]);

  const formatDate = (isoStr: string, isToday: boolean) => {
    if (isToday) return language === "hi" ? "आज" : "Today";
    const dateObj = new Date(isoStr);
    return dateObj.toLocaleDateString(language === "hi" ? "hi-IN" : "en-IN", { weekday: "short", day: "numeric", month: "short" });
  };

  if (loading) {
    return (
      <div className="w-full bg-brand-surface rounded-xl border border-brand-forest/10 p-5 mb-8 animate-pulse">
        <div className="flex justify-between items-center mb-4">
          <div className="space-y-2 w-1/3">
            <div className="h-4 bg-brand-ink/15 rounded-md w-1/2"></div>
            <div className="h-6 bg-brand-ink/10 rounded-md w-3/4"></div>
          </div>
          <div className="h-8 w-8 bg-brand-ink/10 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="h-24 bg-brand-ink/10 rounded-lg col-span-1"></div>
          <div className="h-24 bg-brand-ink/10 rounded-lg col-span-2"></div>
          <div className="h-24 bg-brand-ink/10 rounded-lg col-span-1"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-[#fef2f2] rounded-xl border border-red-250 p-5 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-extrabold text-red-900">Weather Diagnostic Offline</h4>
            <p className="text-xs text-red-700 mt-0.5 leading-relaxed">{error}</p>
          </div>
        </div>
        <button
          onClick={() => fetchWeather(false)}
          className="inline-flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-red-200 transition-all cursor-pointer whitespace-nowrap"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry Weather Setup
        </button>
      </div>
    );
  }

  if (!current) return null;

  const details = getWeatherDetails(current.weatherCode, language);
  const WeatherIcon = iconMap[details.iconName] || Cloud;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full bg-brand-paper hover:shadow-md transition-shadow rounded-xl border border-brand-forest/15 p-5 md:p-6 mb-8 relative overflow-hidden"
    >
      {/* Decorative compass background watermark */}
      <Compass className="absolute right-[-10px] bottom-[-20px] w-48 h-48 text-brand-ink/4 opacity-[0.03] select-none pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-start gap-4 mb-5 pb-4 border-b border-brand-ink/5">
        <div>
          <span className="text-[10px] text-brand-forest uppercase tracking-widest font-extrabold block mb-0.5">
            {language === "hi" ? "वास्तविक समय मौसम स्थिति" : "Real-Time Climate Intel"}
          </span>
          <h3 className="text-lg font-bold text-brand-ink flex items-center gap-2">
            {language === "hi" ? `${destination.city} के लिए स्थानीय पूर्वानुमान` : `Local Forecast for ${destination.city}`}
            <span className="text-xs font-normal text-brand-muted px-2 py-0.5 bg-brand-surface border border-brand-ink/5 rounded-full">
              {language === "hi" ? "सक्रिय अपडेट" : "Live updates"}
            </span>
          </h3>
        </div>

        <button
          onClick={() => fetchWeather(true)}
          disabled={refreshing}
          className="p-2 hover:bg-brand-surface rounded-lg border border-brand-ink/5 transition-colors cursor-pointer group"
          title="Refresh current metrics"
        >
          <RefreshCw className={`w-4 h-4 text-brand-muted group-hover:text-brand-ink transition-transform ${refreshing ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Main Core Weather Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Core Temperature */}
        <div className="lg:col-span-3 bg-brand-surface border border-brand-ink/5 p-4 rounded-xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-brand-forest/80 tracking-wide block mb-1">
              {language === "hi" ? "तापमान स्तर" : "Ambient climate"}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl md:text-5xl font-extrabold text-brand-ink font-mono tracking-tight">{Math.round(current.temp)}</span>
              <span className="text-xl font-bold text-brand-muted">°C</span>
            </div>
            <p className="text-xs text-brand-muted mt-1 leading-none font-medium flex items-center gap-1">
              <Thermometer className="w-3.5 h-3.5 text-brand-forest" />
              {language === "hi" ? `महसूस होता है ${Math.round(current.feelsLike)}°C` : `Feels like ${Math.round(current.feelsLike)}°C`}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-brand-ink/5 flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg border ${details.color}`}>
              <WeatherIcon className="w-3.5 h-3.5" />
              {details.label}
            </span>
          </div>
        </div>

        {/* Travel Advisory (Weather Advice) */}
        <div className="lg:col-span-5 bg-[#fafcf9] border border-brand-forest/10 p-4 rounded-xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-brand-forest tracking-wide flex items-center gap-1 mb-2">
              <Umbrella className="w-3.5 h-3.5 text-brand-forest" />
              {language === "hi" ? "यात्रा परामर्श" : "Travel advisory"}
            </span>
            <p className="text-sm font-medium text-brand-ink leading-relaxed">
              {details.advice}
            </p>
          </div>
          <div className="mt-4 text-[11px] text-brand-muted flex items-start gap-1.5 bg-brand-surface p-2 rounded-lg border border-brand-ink/5">
            <Info className="w-3.5 h-3.5 text-brand-forest shrink-0 mt-0.5" />
            <span>
              {language === "hi"
                ? "मौसम का पूर्व-अनुमान सुरक्षा हेतु कैलिब्रेट किए गए उच्च-क्षमता वाले वायुमंडलीय उपग्रहों से प्राप्त होता है।"
                : "Weather forecasts pull instantly from high-efficiency atmospheric satellites calibrated to safety."}
            </span>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="lg:col-span-4 bg-brand-surface border border-brand-ink/5 p-4 rounded-xl flex flex-col justify-between gap-3">
          <span className="text-[10px] uppercase font-bold text-brand-forest/80 tracking-wide block leading-none">
            {language === "hi" ? "वायुमंडलीय कारक" : "Atmospheric parameters"}
          </span>
          <div className="grid grid-cols-3 gap-2.5 flex-1 items-center">
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-brand-paper border border-brand-ink/5 text-center">
              <Droplets className="w-4 h-4 text-sky-500 mb-1" />
              <span className="text-[10px] text-brand-muted">{language === "hi" ? "आर्द्रता" : "Humidity"}</span>
              <strong className="text-xs text-brand-ink font-mono mt-0.5">{current.humidity}%</strong>
            </div>
            
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-brand-paper border border-brand-ink/5 text-center">
              <Wind className="w-4 h-4 text-teal-600 mb-1" />
              <span className="text-[10px] text-brand-muted">{language === "hi" ? "हवा की गति" : "Wind Speed"}</span>
              <strong className="text-xs text-brand-ink font-mono mt-0.5">{current.windSpeed} <span className="font-sans text-[9px] text-brand-muted">{language === "hi" ? "किमी/घंटा" : "km/h"}</span></strong>
            </div>

            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-brand-paper border border-brand-ink/5 text-center">
              <CloudRain className="w-4 h-4 text-blue-500 mb-1" />
              <span className="text-[10px] text-brand-muted">{language === "hi" ? "वर्षा" : "Precip."}</span>
              <strong className="text-xs text-brand-ink font-mono mt-0.5">{current.precipitation} <span className="font-sans text-[9px] text-brand-muted">mm</span></strong>
            </div>
          </div>
        </div>

      </div>

      {/* 3-day Forecast Carousel / Staggered Cards */}
      <div className="mt-5 pt-4 border-t border-brand-ink/5">
        <span className="text-[10px] uppercase font-extrabold text-brand-forest tracking-wider block mb-3">
          {language === "hi" ? "3-दिवसीय मौसम आउटलुक" : "3-Day Climatic Outlook"}
        </span>
        
        <div className="grid grid-cols-3 gap-3">
          {forecast.map((day, idx) => {
            const dayDetails = getWeatherDetails(day.weatherCode, language);
            const DayIcon = iconMap[dayDetails.iconName] || Cloud;
            
            return (
              <div 
                key={day.date}
                className="flex flex-col sm:flex-row items-center justify-between p-2.5 sm:p-3 bg-brand-surface border border-brand-ink/5 hover:border-brand-forest/20 hover:bg-brand-paper/50 rounded-lg transition-colors gap-2"
              >
                <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5">
                  <div className={`p-1.5 rounded-lg ${dayDetails.color}`}>
                    <DayIcon className="w-4 h-4" />
                  </div>
                  <div className="text-center sm:text-left leading-tight">
                    <span className="text-xs font-bold text-brand-ink block whitespace-nowrap">
                      {formatDate(day.date, idx === 0)}
                    </span>
                    <span className="text-[9px] text-brand-muted block font-medium">
                      {dayDetails.label}
                    </span>
                  </div>
                </div>
                
                <div className="text-right leading-none font-mono">
                  <div className="text-[11px] font-bold text-brand-ink inline-block">
                    {Math.round(day.maxTemp)}°
                  </div>
                  <div className="text-[9px] text-brand-muted inline-block ml-1">
                    / {Math.round(day.minTemp)}°
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
    </motion.div>
  );
}
