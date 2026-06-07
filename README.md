# 🧭 Safar Saathi - Global Travel Atlas

Safar Saathi is a premium, intelligent, and highly interactive travel portal designed to showcase the beauty of Indian heritage alongside iconic global destinations. Built as a responsive full-stack web application, it bridges local cultural marvels with world travel checkpoints—featuring real-time weather integration, dual-language toggle (English/Hindi), live financial planning in Indian Rupees (₹), and an embedded AI Travel Coach.

---

## 🚀 Features

### 🌍 Global Expansion & Sourcing
- **Unified Country Grid:** Completely restructures international destinations. Users can filter by individual sovereign countries, with **India** placed at the premier spot.
- **Dynamic Sourcing:** Integrated with **Nominatim Geocoding**, **Wikipedia API**, and **OpenStreetMap (Overpass API)** to dynamically pull live landmark data, historic notes, and geographic coordinates globally.

### 🇮🇳 India-First Prioritization
- **Deep Localization:** Key cultural hubs like Varanasi, Jaipur, and Amritsar are prioritized across all modules (Trending Widgets, Search Filters, and Suggestions).
- **Local Attractions Added:** Curated insights for destinations like Hampi Ruins, Khajuraho, Varkala, Auli, and Mahabalipuram.

### 💬 Full-Stack AI Travel Coach
- **Gemini 3.5 Flash Integration:** Features an AI Copilot that provides friendly, informative, and context-aware itineraries.
- **Quota-Resilient Fallback:** Automatically switches to structured local guidelines and historical parametric knowledge if API limits are reached.

### 💰 Expense Planner & Destination Compare
- **Side-by-Side Analytics:** Compare any two domestic or international cities side-by-side based on climate, cost indices, and travel seasons.
- **Live Google Search Grounding:** True travel expenses are validated using live web search indexes.
- **Smart Budget Calculator:** Calculate total transit fares, food expenses, emergency cushions, and hotel rates directly in **Indian Rupees (₹)**.

### 🎙️ Web Speech API (Voice Search)
- **Bilingual Voice Input:** Features an interactive microphone widget supporting voice search commands calibrated for dialect detection (`hi-IN` for Hindi and `en-IN` for English).

### 🌐 Complete English to Hindi Translation
- **Seamless Language Toggle:** One-click header toggle that instantly translates components, headers, social feed nodes, inputs, placeholders, and buttons into flawless Hindi.

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS (v4 layout system), Lucide React Icons
- **Backend/Middleware:** Express.js, Vite Dev Server
- **GenAI Suite:** `@google/genai` SDK (Gemini 3.5 Flash)
- **Data Integrations:** OpenStreetMap API, Wikipedia API, Open-Meteo (Weather Forecasts), Google Search Grounding

---

## 📦 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/safar-saathi.git](https://github.com/your-username/safar-saathi.git)
   cd safar-saathi
