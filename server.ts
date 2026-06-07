import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI Client
let aiClient: any = null;
function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is not defined. Safar Saathi is running in Smart Offline AI fallback mode.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Highly detailed intelligent offline travel advisor fallback
function getOfflineTravelAgentReply(message: string): string {
  const msg = message.toLowerCase();
  
  if (msg.includes("paris") || msg.includes("france")) {
    return `### 🗼 Bonjour! Here is your custom Paris Travel Advisor report:
    
* **Best Time to Visit:** April to October for mild weather and beautiful garden blossoms.
* **Estimated Budget:** Around **₹12,500 - ₹18,500/day** (Mid-range stay, museum entries & cafes).
* **Must-See Spots:** 
  1. *Eiffel Tower* (Catch the sparkle show every hour at night!)
  2. *Louvre Museum* (Enter through Carrousel du Louvre to beat the queues)
  3. *Seine River Cruise* (Absolute best around sunset)
* **Packing Essentials:** A sturdy umbrella, a light jacket for breezy evenings, and ultra-comfortable walking shoes for city pavement.
* **Local Hack:** Order "un café" at the counter rather than sitting at a table to save 50% on your espresso bill!

*Is there another city you'd like to explore in France or Europe? I am here to help you plan!*`;
  }
  
  if (msg.includes("tokyo") || msg.includes("japan")) {
    return `### 🗼 Konnichiwa! Welcome to your custom Tokyo Travel Report:
    
* **Best Time to Visit:** Mid-to-late March for the majestic **Cherry Blossoms** or November for golden Autumn foliage.
* **Estimated Budget:** **₹11,000 - ₹15,000/day** (Includes delicious Ramen bowls, local subway pass, and bento stops).
* **Key Itinerary Suggestion:**
  * *Day 1:* Explore ancient Asakusa (Sensō-ji) in the morning, then ride the water bus to futuristic Odaiba.
  * *Day 2:* Take in the neon lights of Shinjuku, visit Meiji Shrine, and cross Shibuya Scramble.
* **Traveler Pro-Tip:** Pick up a Suica/Pasmo transit card instantly at Haneda or Narita airport. It makes taking Japanese subways breeze-light!

*Where should we head next? Let me know what peaks your interests!*`;
  }

  if (msg.includes("rome") || msg.includes("italy")) {
    return `### 🏛️ Ciao! Here is your tailored Rome Explorer Briefing:
    
* **Best Time to Visit:** April to June when the Mediterranean air is perfectly crisp.
* **Budget Recommendation:** **₹9,000 - ₹13,500/day** (Covers glorious plates of Cacio e Pepe, historical colosseum tickets, and authentic gelato).
* **Cultural Insider Tips:**
  * Always dress respectfully when visiting religious sites like St. Peter's Basilica (shoulders and knees covered).
  * Skip the tourist trap restaurants directly bordering major plazas and head 2-3 alleys deep for authentic trattorias.

*What local food or sights would you like tips on? Ask away!*`;
  }

  if (msg.includes("budget") || msg.includes("cheap") || msg.includes("save")) {
    return `### 💰 Premium Travel Saving Advice:
    
No matter where you are traveling across the world, here are the top 3 ways to optimize your budget:
1. **Ditch Flights for High-Speed Trains:** In Europe (Eurail) and Japan (JR Pass), trains are cheaper, drop you directly in the city core, and have no luggage weight limits!
2. **Eat Like a Local:** Seek out bustling food markets (like *Khan el-Khalili* in Cairo, or local street food alleys in Tokyo).
3. **Target Free Museum Days:** Many world-class museums offer free admission on the first Sunday of the month!

*Let me know which cities or countries you are considering, and I will draft a custom cost breakdown!*`;
  }

  if (msg.includes("itinerary") || msg.includes("plan") || msg.includes("days")) {
    return `### 🗺️ The Perfect "Safar Saathi" 3-Day Explorer Template:

Here is a foolproof rhythm to plan any international or domestic destination:
* **Day 1: Old Town & Heritage Foundations**
  * Spend the morning exploring the oldest heritage landmark or castle. 
  * Spend the afternoon at a major regional museum to build your historical context.
* **Day 2: Modern Vibrations & City Outlooks**
  * Head to the modern downtown core, browse craft markets, and check out famous local neighborhoods.
  * Around sunset, book an sky observatory deck or hill viewpoint to watch the city transition from daylight.
* **Day 3: Nature Escapes & Slow Moments**
  * Take a day trip to the nearest national park, waterfall, beach, or quiet forest reserve.
  * End the journey with a beautiful dining experience at an authentic local cafe.

*Tell me which destination you'd like to adjust this itinerary for!*`;
  }

  return `### 👋 Hello! I am Safar Saathi's AI Global Travel Assistant.
  
I can help you build custom itineraries, estimate budgets, suggest best seasons, and provide travel hacks for any country around the world.
  
👉 **Things you can ask me:**
* *"Draft a 3-day itinerary for Tokyo."*
* *"What are some free sights to visit in Paris?"*
* *"Give me budget travel hacks for traveling across Europe."*
* *"What is the best time of year to explore historic Rome?"*
  
*Please tell me where you are dreaming of traveling next!*`;
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", mode: getAiClient() ? "online" : "smart_offline" });
});

// Helper function to return beautiful high-fidelity offline/fallback travel data
function getFallbackCompareData(cityName: string) {
  const normalized = cityName.toLowerCase();
  
  if (normalized.includes("hampi")) {
    return {
      name: "Hampi",
      currencySymbol: "₹",
      accommodationPerNight: 2200,
      localTransportPerDay: 450,
      averageMealCostPerDay: 750,
      extraExpensesPerDay: 500,
      totalDailyBudgetBackpacker: 1500,
      totalDailyBudgetMidrange: 3900,
      totalDailyBudgetLuxury: 10500,
      latestFactSheet: "Guesthouse stays near the river start around ₹1,200/night. Rickshaw tours cost approx ₹1,500 for a full day. Traditional South Indian meals are highly affordable (₹150-₹250/meal)."
    };
  }
  if (normalized.includes("varanasi")) {
    return {
      name: "Varanasi",
      currencySymbol: "₹",
      accommodationPerNight: 2000,
      localTransportPerDay: 500,
      averageMealCostPerDay: 600,
      extraExpensesPerDay: 600,
      totalDailyBudgetBackpacker: 1400,
      totalDailyBudgetMidrange: 3700,
      totalDailyBudgetLuxury: 12000,
      latestFactSheet: "Ghat-facing budget homestays cost ₹800-₹1,500/night. Boat rides on the Ganges range from ₹100-₹200 per rider in shared boats. World-famous Banarasi kachori, lassi, and street food are exceptionally local and cost ₹50-₹100."
    };
  }
  if (normalized.includes("paris")) {
    return {
      name: "Paris",
      currencySymbol: "₹",
      accommodationPerNight: 12500,
      localTransportPerDay: 1100,
      averageMealCostPerDay: 3500,
      extraExpensesPerDay: 2500,
      totalDailyBudgetBackpacker: 6200,
      totalDailyBudgetMidrange: 17500,
      totalDailyBudgetLuxury: 48000,
      latestFactSheet: "Hostel dorms begin at €45; a standard double room in budget hotels (arrondissements 10-20) ranges €110-€150. Paris metro day tickets (Zone 1-3) cost €15. Espresso at cafe counters is roughly €1.50."
    };
  }
  if (normalized.includes("tokyo")) {
    return {
      name: "Tokyo",
      currencySymbol: "₹",
      accommodationPerNight: 9500,
      localTransportPerDay: 950,
      averageMealCostPerDay: 3200,
      extraExpensesPerDay: 2000,
      totalDailyBudgetBackpacker: 5400,
      totalDailyBudgetMidrange: 15500,
      totalDailyBudgetLuxury: 39000,
      latestFactSheet: "APA business hotels cost ¥12,000-¥18,000 (₹6,500-₹10,000). 24-hour Metro passes are ¥800 (₹440). Quick meals in convenience stores (bento) or local ramen shops cost ¥800-¥1,200 (₹450-₹650)."
    };
  }
  if (normalized.includes("rome")) {
    return {
      name: "Rome",
      currencySymbol: "₹",
      accommodationPerNight: 8500,
      localTransportPerDay: 850,
      averageMealCostPerDay: 2800,
      extraExpensesPerDay: 1800,
      totalDailyBudgetBackpacker: 4900,
      totalDailyBudgetMidrange: 13500,
      totalDailyBudgetLuxury: 35000,
      latestFactSheet: "Cozy Bed & Breakfast style rooms go for €80-€120. Standard single-use public transit tickets are €1.50 (valid for 100 minutes of metro/bus). Authentic local trattorias serve pasta/pizza meals at €12-€20."
    };
  }

  // General fallback
  return {
    name: cityName,
    currencySymbol: "₹",
    accommodationPerNight: 3500,
    localTransportPerDay: 800,
    averageMealCostPerDay: 1200,
    extraExpensesPerDay: 1000,
    totalDailyBudgetBackpacker: 2500,
    totalDailyBudgetMidrange: 6500,
    totalDailyBudgetLuxury: 18000,
    latestFactSheet: "Average hotel stays range between ₹3,000 and ₹6,000 per night. Public transit tickets are very economical. Local heritage street carts and cafes are pocket-friendly, averaging ₹200-₹450 per meal."
  };
}

// AI Expense Comparison using Google Search Grounding with robust nested recovery
app.post("/api/compare", async (req, res) => {
  const { cityA, cityB } = req.body;
  if (!cityA || !cityB) {
    return res.status(400).json({ error: "Both destination A and destination B parameters are required." });
  }

  try {
    const ai = getAiClient();
    if (!ai) {
      return res.json({
        isOffline: true,
        destinationA: getFallbackCompareData(cityA),
        destinationB: getFallbackCompareData(cityB),
        comparisonSummary: `Comparing travel costs for ${cityA} and ${cityB}. Due to Safar Saathi currently running in Smart Offline mode, calculated historical benchmarks have been compiled below. Consider staying in hostels or regional homestays to optimize budgets!`,
        comparisonSummaryHindi: `${cityA} और ${cityB} के लिए यात्रा लागतों की तुलना। वर्तमान में सफ़र साथी के स्मार्ट ऑफ़लाइन मोड में होने के कारण ऐतिहासिक संदर्भ डेटा संकलित किया गया है। बजट को अनुकूलित करने के लिए होमस्टे का चयन करें!`,
        sources: []
      });
    }

    const prompt = `Perform a high-precision real-world search comparison of travel costs, everyday expenses, lodging, flights, and meals for traveling to "${cityA}" vs "${cityB}" in mid-2026.
Search the web for actual cost data, travel spreadsheets, backpacks indices, and booking averages. Converted all foreign currencies to Indian Rupees (₹) using realistic conversion rates.
Return strictly a single JSON object. No writing outside the JSON, no markdown code block surrounding the JSON. Ensure it has this schematic:
{
  "destinationA": {
    "name": "${cityA}",
    "currencySymbol": "₹",
    "accommodationPerNight": number (hotel/room expense in INR),
    "localTransportPerDay": number (Daily transit, taxi, metro cost in INR),
    "averageMealCostPerDay": number (Daily food cost per person inside cafes/restaurants in INR),
    "extraExpensesPerDay": number (Monuments entries, emergency, sightseeing in INR),
    "totalDailyBudgetBackpacker": number (Backpacker total daily cost in INR),
    "totalDailyBudgetMidrange": number (Mid-range total daily cost in INR),
    "totalDailyBudgetLuxury": number (Luxury total daily cost in INR),
    "latestFactSheet": "A highly descriptive, factual summary in English highlighting exact costs, typical ticket costs, budget options, and seasonal adjustments found on current travel directories for ${cityA}."
  },
  "destinationB": {
    "name": "${cityB}",
    "currencySymbol": "₹",
    "accommodationPerNight": number (hotel/room expense in INR),
    "localTransportPerDay": number (Daily transit, taxi, metro cost in INR),
    "averageMealCostPerDay": number (Daily food cost per person inside cafes/restaurants in INR),
    "extraExpensesPerDay": number (Monuments entries, emergency, sightseeing in INR),
    "totalDailyBudgetBackpacker": number (Backpacker total daily cost in INR),
    "totalDailyBudgetMidrange": number (Mid-range total daily cost in INR),
    "totalDailyBudgetLuxury": number (Luxury total daily cost in INR),
    "latestFactSheet": "A highly descriptive, factual summary in English highlighting exact costs, typical ticket costs, budget options, and seasonal adjustments found on current travel directories for ${cityB}."
  },
  "comparisonSummary": "A concise expert review outlining which destination is cheaper, budget comparison insights, transport tips, and key recommendations.",
  "comparisonSummaryHindi": "हिंदी भाषा में मुख्य विवरण कि कौन सा गंतव्य किफायती है, लागत बचाने के तरीके और विशेष स्थानीय सलाह।"
}

Note: All the cost estimations must be reliable number types (not strings). Return ONLY the clean JSON.`;

    let response;
    let text = "";
    let usedSearch = false;

    try {
      // First, try utilizing real-time Google Search grounding
      response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json"
        }
      });
      text = response.text || "{}";
      usedSearch = true;
    } catch (searchApiError: any) {
      console.warn("Live Search comparison hit limits or quota constraints. Falling back to dynamic non-grounded comparison:", searchApiError.message || searchApiError);
      
      // Secondary fallback: Retrieve dynamic analysis from parametric intelligence without Google Search
      response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });
      text = response.text || "{}";
      usedSearch = false;
    }

    // Sanitize any accidental markdown wrappers safely
    if (text.startsWith("```json")) {
      text = text.replace(/^```json/, "").replace(/```$/, "");
    } else if (text.startsWith("```")) {
      text = text.replace(/^```/, "").replace(/```$/, "");
    }

    const cleanedText = text.trim();
    const data = JSON.parse(cleanedText);

    // Extracting grounding credentials (search citations) if used
    let uniqueSources: any[] = [];
    if (usedSearch && response?.candidates?.[0]?.groundingMetadata?.groundingChunks) {
      const chunks = response.candidates[0].groundingMetadata.groundingChunks || [];
      const sources = chunks
        .map((chunk: any) => {
          if (chunk.web) {
            return {
              title: chunk.web.title || "Travel Portal Reference",
              url: chunk.web.uri
            };
          }
          return null;
        })
        .filter((s: any) => s !== null);

      const seenUris = new Set();
      for (const item of sources) {
        if (!seenUris.has(item.url)) {
          seenUris.add(item.url);
          uniqueSources.push(item);
        }
      }
    }

    res.json({
      ...data,
      isOffline: !usedSearch,
      sources: uniqueSources.slice(0, 5)
    });

  } catch (err: any) {
    console.warn("Gemini real-time dynamic travel comparison failed, returning offline static benchmarks gracefully:", err.message || err);
    res.json({
      isOffline: true,
      destinationA: getFallbackCompareData(cityA),
      destinationB: getFallbackCompareData(cityB),
      comparisonSummary: `Comparing travel costs for ${cityA} and ${cityB}. High-precision regional standard travel data compiled below to keep you oriented.`,
      comparisonSummaryHindi: `${cityA} और ${cityB} के लिए मानक लागत संरचना नीचे दी गई है। यात्रा लागतों की गणना और सर्वोत्तम दरें प्रस्तुत हैं।`,
      sources: []
    });
  }
});

// AI Chat endpoint using recommended SDK patterns
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    const ai = getAiClient();
    
    if (!ai) {
      const fallbackText = getOfflineTravelAgentReply(message);
      return res.json({ text: fallbackText, isOffline: true });
    }

    // Call the Gemini model using the modern SDK
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        {
          role: "user",
          parts: [{
            text: "You are 'Safar Saathi', an enthusiastic, professional global travel advisor and trip designer. Provide beautifully structured travel advice. Focus on seasons, costs, itineraries, local secrets, and historic stories. Always state budget and costs in Indian Rupees (₹) with proper conversion rates. Use elegant markdown styling including bold titles, bullet points, and clean separators. Keep your answer engaging yet concise."
          }]
        },
        ...(history || []).map((h: any) => ({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }]
        })),
        {
          role: "user",
          parts: [{ text: message }]
        }
      ]
    });

    res.json({ text: response.text });
  } catch (err: any) {
    console.error("Gemini API call failed, routing to offline model:", err);
    const fallbackText = getOfflineTravelAgentReply(message);
    res.json({ text: fallbackText, isOffline: true, error: err.message });
  }
});

// Vite Middleware for Dynamic Reloading
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Dynamically import Vite server
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Joined Vite development server middleware.");
  } else {
    // Serve production static assets from dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
