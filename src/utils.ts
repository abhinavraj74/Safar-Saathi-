import { Place, Destination } from "./types";
import { verifiedWikiTitles, categoryCopy } from "./data";

export const imageCache = new Map<string, Promise<string>>();
export const cityPlacesCache = new Map<string, Promise<Place[]>>();

// Map OSM / Wikipedia categories
export function categoryFromOsm(tags: Record<string, string> = {}): string {
  if (tags.tourism === "beach" || tags.natural === "beach") return "beach";
  if (tags.amenity === "place_of_worship") return "spiritual";
  if (tags.historic || tags.tourism === "museum" || tags.tourism === "artwork") return "heritage";
  if (tags.natural || tags.leisure === "park" || tags.water || tags.tourism === "viewpoint") return "nature";
  return "city";
}

// Check if search result looks useful
export function titleLooksUseful(title: string, destination: Destination | { city: string; state: string }, snippet: string = ""): boolean {
  if (!title) return false;
  const cleanTitle = title.trim().toLowerCase();
  const cleanCity = destination.city.trim().toLowerCase();
  const cleanState = destination.state.trim().toLowerCase();
  const cleanSnippet = snippet.replace(/<[^>]+>/g, " ").trim().toLowerCase();

  if (/list of|tourism in|district|division|tehsil|taluk|municipality|census|railway station|airport|assembly constituency|lok sabha|state highway|national highway/i.test(title)) {
    return false;
  }
  if (cleanTitle === cleanState || cleanTitle === "bihar" || cleanTitle === "india") return false;
  if (cleanTitle.includes(`${cleanState} tourism`)) return false;

  const hasCityContext = cleanTitle.includes(cleanCity) || cleanSnippet.includes(cleanCity);
  if (!hasCityContext) return false;

  return cleanTitle === cleanCity ||
    cleanTitle.includes(cleanCity) ||
    /(temple|mandir|fort|cave|ghat|hill|lake|park|garden|sanctuary|museum|palace|setu|bridge|waterfall|beach|stupa|monastery|dargah|church|masjid|ashram|bazaar|bazar|market|chowk|food street)/i.test(title);
}

// Fetch thumbnail image of a Wikipedia page
export function fetchWikipediaImage(title: string): Promise<string> {
  if (!title) return Promise.resolve("");
  const key = `wiki:${title}`;
  if (!imageCache.has(key)) {
    const promise = fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => data?.thumbnail?.source || data?.originalimage?.source || "")
      .catch(() => "");
    imageCache.set(key, promise);
  }
  return imageCache.get(key) || Promise.resolve("");
}

// Check if state is inside Indian Territory to append India for high accuracy
const isIndianState = (state: string): boolean => {
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
    "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry", "Union Territory"
  ];
  return indianStates.some((s) => s.toLowerCase() === state.toLowerCase());
};

// Map regional state/UT to top-level country to power the universal Country Grid
export function getCountryForRegion(stateOrCountry: string): string {
  if (!stateOrCountry) return "India";
  if (isIndianState(stateOrCountry)) {
    return "India";
  }
  return stateOrCountry;
}

// Geocode a city into coordinates using Nominatim API
export async function geocodeCity(destination: Destination | { city: string; state: string }): Promise<{ lat: number; lon: number } | null> {
  const qStr = isIndianState(destination.state) 
    ? `${destination.city}, ${destination.state}, India` 
    : `${destination.city}, ${destination.state}`;
    
  const params = new URLSearchParams({
    format: "json",
    limit: "1",
    q: qStr
  });
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`);
    if (!response.ok) return null;
    const results = await response.json();
    if (!results?.[0]) return null;
    return {
      lat: Number(results[0].lat),
      lon: Number(results[0].lon)
    };
  } catch (err) {
    console.error("Geocoding failed for", destination.city, err);
    return null;
  }
}

// Fetch live tourist spots via OpenStreetMap (Overpass API) and Wikipedia Geosearch
export async function fetchOpenMapPlaces(destination: Destination): Promise<Place[]> {
  const cacheKey = `${destination.state}|${destination.city}`.toLowerCase();
  if (cityPlacesCache.has(cacheKey)) {
    const cached = cityPlacesCache.get(cacheKey);
    if (cached) return cached;
  }

  const promise = (async () => {
    const center = await geocodeCity(destination);
    if (!center) return [];
    const radius = 18000;
    const query = `
      [out:json][timeout:25];
      (
        node(around:${radius},${center.lat},${center.lon})["tourism"~"attraction|museum|viewpoint|artwork|zoo|theme_park|picnic_site"];
        way(around:${radius},${center.lat},${center.lon})["tourism"~"attraction|museum|viewpoint|artwork|zoo|theme_park|picnic_site"];
        relation(around:${radius},${center.lat},${center.lon})["tourism"~"attraction|museum|viewpoint|artwork|zoo|theme_park|picnic_site"];
        node(around:${radius},${center.lat},${center.lon})["historic"];
        way(around:${radius},${center.lat},${center.lon})["historic"];
        node(around:${radius},${center.lat},${center.lon})["amenity"="place_of_worship"];
        way(around:${radius},${center.lat},${center.lon})["amenity"="place_of_worship"];
        node(around:${radius},${center.lat},${center.lon})["leisure"="park"];
        way(around:${radius},${center.lat},${center.lon})["leisure"="park"];
        node(around:${radius},${center.lat},${center.lon})["natural"~"beach|water|peak|spring"];
        way(around:${radius},${center.lat},${center.lon})["natural"~"beach|water|peak|spring"];
      );
      out tags center 80;
    `;

    try {
      const [osmData, wikiNearby] = await Promise.all([
        fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          body: query
        })
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            const elements = data?.elements || [];
            return elements
              .map((element: any) => {
                const tags = element.tags || {};
                const name = tags.name || tags["name:en"];
                if (!name) return null;

                const category = categoryFromOsm(tags);
                const wikiTitle = tags.wikipedia ? tags.wikipedia.split(":").slice(1).join(":") : "";
                return {
                  name,
                  city: destination.city,
                  state: destination.state,
                  type: "Live source",
                  category,
                  bestTime: "Check locally",
                  duration: category === "nature" ? "1-2 hrs" : "45-90 min",
                  tip: "Live result from open map data. Check current timings and reviews before visiting.",
                  wikiTitle,
                  mediaSearch: `${name} ${destination.city} ${destination.state} India`,
                  info: `${name} is a ${category} place found from open map data for ${destination.city}. Use the map link for live route, reviews, and current details.`,
                  aliases: []
                };
              })
              .filter(Boolean) as Place[];
          })
          .catch(() => [] as Place[]),
        fetchWikipediaGeoPlaces(destination, center).catch(() => [] as Place[])
      ]);

      const combined = [...osmData, ...wikiNearby];
      
      // De-duplicate places by name
      const seen = new Set<string>();
      return combined.filter((place) => {
        const normName = place.name.toLowerCase().trim();
        if (seen.has(normName)) return false;
        seen.add(normName);
        return true;
      }).slice(0, 32);
    } catch (err) {
      console.error("OSM/Wikipedia fetch failed", err);
      return [];
    }
  })();

  cityPlacesCache.set(cacheKey, promise);
  return promise;
}

// Fetch nearby locations from Wikipedia Geosearch
export async function fetchWikipediaGeoPlaces(destination: Destination | { city: string; state: string }, center: { lat: number; lon: number }): Promise<Place[]> {
  const params = new URLSearchParams({
    action: "query",
    list: "geosearch",
    gscoord: `${center.lat}|${center.lon}`,
    gsradius: "10000",
    gslimit: "30",
    format: "json",
    origin: "*"
  });
  try {
    const response = await fetch(`https://en.wikipedia.org/w/api.php?${params.toString()}`);
    if (!response.ok) return [];
    const data = await response.json();
    const geosearch = data?.query?.geosearch || [];
    return geosearch
      .filter((item: any) => item.title && !/district|division|municipality|tehsil|taluk/i.test(item.title))
      .map((item: any) => ({
        name: item.title,
        city: destination.city,
        state: destination.state,
        type: "Wikipedia nearby",
        category: "city",
        bestTime: "Check locally",
        duration: "45-90 min",
        tip: "Nearby landmark from Wikipedia geo data. Use location button for route and current details.",
        wikiTitle: item.title,
        mediaSearch: `${item.title} ${destination.city} ${destination.state} India`,
        info: `${item.title} is a nearby place or landmark found around ${destination.city}. Photos and details load from public travel/media sources.`,
        aliases: []
      }));
  } catch (err) {
    console.error("Wikipedia geo failed", err);
    return [];
  }
}

// Themes search on Wikipedia for specific city keywords
const citySearchThemes = [
  { term: "tourist attractions", category: "city" },
  { term: "temples heritage forts caves", category: "heritage" },
  { term: "parks lakes waterfalls viewpoints", category: "nature" },
  { term: "museum monument palace", category: "heritage" },
  { term: "food streets markets bazaar shopping", category: "city" }
];

export async function fetchWikipediaSearchPlaces(destination: Destination): Promise<Place[]> {
  try {
    const searches = citySearchThemes.map(({ term, category }) => {
      const params = new URLSearchParams({
        action: "query",
        list: "search",
        srlimit: "8",
        srsearch: `"${destination.city}" ${destination.state} ${term}`,
        format: "json",
        origin: "*"
      });
      return fetch(`https://en.wikipedia.org/w/api.php?${params.toString()}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          const searchResults = data?.query?.search || [];
          return searchResults
            .filter((item: any) => titleLooksUseful(item.title, destination, item.snippet || ""))
            .map((item: any) => ({
              name: item.title,
              city: destination.city,
              state: destination.state,
              type: "Wikipedia search",
              category,
              bestTime: "Check locally",
              duration: category === "nature" ? "1-2 hrs" : "45-90 min",
              tip: "Found from public destination search. Check current timings before visiting.",
              wikiTitle: item.title,
              mediaSearch: `${item.title} ${destination.city} ${destination.state} India`,
              info: `${item.title} is a possible ${category} place connected with ${destination.city}. Exact photos load only from Google Places or exact Wikipedia pages.`,
              aliases: []
            })) as Place[];
        })
        .catch(() => [] as Place[]);
    });

    const groups = await Promise.all(searches);
    const combined = groups.flat();
    
    // De-duplicate
    const seen = new Set<string>();
    return combined.filter((place) => {
      const normName = place.name.toLowerCase().trim();
      if (seen.has(normName)) return false;
      seen.add(normName);
      return true;
    }).slice(0, 28);
  } catch (err) {
    console.error("Wikipedia search failed", err);
    return [];
  }
}
