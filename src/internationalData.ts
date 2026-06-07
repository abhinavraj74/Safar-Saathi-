import { Destination, Place } from "./types";

export interface GlobalDetailedCity {
  city: string;
  country: string;
  region: string;
  description: string;
  bestVisitingTime: string;
  estimatedCost: {
    backpacker: number; // USD per day
    midrange: number;
    luxury: number;
  };
  rating: number;
  popularityScore: number;
  activities: string[];
  spots: Array<{
    name: string;
    category: "heritage" | "nature" | "beach" | "spiritual" | "city";
    tip: string;
    info: string;
    bestTime: string;
    duration: string;
    wikiTitle: string;
    panoramicUrl: string; // curating immersive photos
  }>;
}

export const internationalCities: GlobalDetailedCity[] = [
  {
    city: "Paris",
    country: "France",
    region: "Europe",
    description: "The City of Light, famous for its romantic atmosphere, classical art, world-class gastronomy, and legendary monuments.",
    bestVisitingTime: "April to October",
    estimatedCost: { backpacker: 80, midrange: 180, luxury: 450 },
    rating: 4.8,
    popularityScore: 98,
    activities: ["Art Museum Walks", "Seine River Cruises", "Gourmet Bakery Hopping", "Historic Sightseeing"],
    spots: [
      {
        name: "Eiffel Tower",
        category: "heritage",
        tip: "Book tickets online 2 months in advance to catch the sunset summit view.",
        info: "The iconic wrought-iron lattice tower on the Champ de Mars, constructed in 1889 as the entrance arch to the World's Fair.",
        bestTime: "Sunset",
        duration: "2-3 hrs",
        wikiTitle: "Eiffel Tower",
        panoramicUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Louvre Museum",
        category: "heritage",
        tip: "Enter via the Carrousel entrance to avoid the main glass pyramid queues.",
        info: "The world's largest art museum, home to the Mona Lisa, Venus de Milo, and countless ancient treasures.",
        bestTime: "Morning",
        duration: "3-4 hrs",
        wikiTitle: "Louvre",
        panoramicUrl: "https://images.unsplash.com/photo-1601887389937-0b02fe04b1e5?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Jardin du Luxembourg",
        category: "nature",
        tip: "Rent a small vintage wooden sailboat to float on the main octagonal basin.",
        info: "A gorgeous 17th-century palace garden featuring lush green avenues, gravel paths, and the Medici Fountain.",
        bestTime: "Afternoon",
        duration: "1-2 hrs",
        wikiTitle: "Luxembourg Gardens",
        panoramicUrl: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  },
  {
    city: "Tokyo",
    country: "Japan",
    region: "Asia",
    description: "A neon-lit megacity where ultra-modern technology blends gracefully with ancient shrines, food alleys, and serene gardens.",
    bestVisitingTime: "March to May (Cherry Blossom) or October to November",
    estimatedCost: { backpacker: 70, midrange: 160, luxury: 400 },
    rating: 4.9,
    popularityScore: 99,
    activities: ["Shibuya Crossing Look", "Bullet Train Rides", "Sushi Bar Hopping", "Anime & Tech District Exploring"],
    spots: [
      {
        name: "Sensō-ji Temple",
        category: "spiritual",
        tip: "Visit late evening to see the giant red lanterns glow peacefully without the crowds.",
        info: "Tokyo's oldest and most iconic ancient Buddhist temple located in Asakusa, dedicated to the Bodhisattva Kannon.",
        bestTime: "Early Morning or Evening",
        duration: "1-2 hrs",
        wikiTitle: "Sensō-ji",
        panoramicUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Shinjuku Gyoen National Garden",
        category: "nature",
        tip: "Try the traditional matcha green tea at the historical teahouse inside the Japanese garden.",
        info: "A massive imperial garden blending formal French, English Landscape, and traditional Japanese style gardens.",
        bestTime: "Mid-day",
        duration: "2-3 hrs",
        wikiTitle: "Shinjuku Gyoen National Garden",
        panoramicUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Shibuya Sky",
        category: "city",
        tip: "Book the 4:30 PM slot online beforehand to witness Mt. Fuji on clear sunset days.",
        info: "A breathtaking open-air observation deck sitting 229 meters above the famous Shibuya Scramble Crossing.",
        bestTime: "Sunset",
        duration: "1.5 hrs",
        wikiTitle: "Shibuya",
        panoramicUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  },
  {
    city: "Rome",
    country: "Italy",
    region: "Europe",
    description: "The Eternal City, boasting nearly 3,000 years of globally influential art, architecture, and ruins on display.",
    bestVisitingTime: "April to June or September to October",
    estimatedCost: { backpacker: 75, midrange: 170, luxury: 420 },
    rating: 4.7,
    popularityScore: 96,
    activities: ["Ancient Ruins Walking Tours", "Gelato Tasting", "Piazza Lounging", "Fountain Centering"],
    spots: [
      {
        name: "Colosseum",
        category: "heritage",
        tip: "Purchase a combined ticket that includes speedy entry to the Roman Forum and Palatine Hill.",
        info: "The largest ancient amphitheatre ever built, hosting gladiatorial combats, dramas, and mock sea battles.",
        bestTime: "Morning",
        duration: "2-3 hrs",
        wikiTitle: "Colosseum",
        panoramicUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Trevi Fountain",
        category: "city",
        tip: "Toss your coin with your right hand over your left shoulder to guarantee your return to Rome!",
        info: "An architectural masterpiece in baroque style, designed by Nicola Salvi and fed by ancient Roman aqueducts.",
        bestTime: "Midnight or Sunrise",
        duration: "1 hr",
        wikiTitle: "Trevi Fountain",
        panoramicUrl: "https://images.unsplash.com/photo-1515542622106-78bdf8ba0e5b?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Vatican Museums",
        category: "spiritual",
        tip: "Hire a certified guide or use audio guides to fully grasp the beauty of Michelangelo's Sistine Chapel ceiling.",
        info: "The immense art galleries of the Vatican City, displaying public collections amassed by popes over centuries.",
        bestTime: "Early Afternoon",
        duration: "3-4 hrs",
        wikiTitle: "Vatican Museums",
        panoramicUrl: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  },
  {
    city: "London",
    country: "United Kingdom",
    region: "Europe",
    description: "The historic capital of England, blending royal traditions with a vibrant modern theater, museum, and park scene.",
    bestVisitingTime: "May to September",
    estimatedCost: { backpacker: 85, midrange: 190, luxury: 480 },
    rating: 4.7,
    popularityScore: 95,
    activities: ["Double Decker Bus Touring", "West End Musical Watching", "Museum Hopping (Free entry!)", "Pub Lunching"],
    spots: [
      {
        name: "Tower of London",
        category: "heritage",
        tip: "Join the legendary Yeoman Warder (Beefeater) tour for fantastic historical storytelling.",
        info: "A historic castle on the north bank of the River Thames, home to the shining Crown Jewels and ancient armory.",
        bestTime: "Morning",
        duration: "2-3 hrs",
        wikiTitle: "Tower of London",
        panoramicUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "British Museum",
        category: "heritage",
        tip: "Check out the Rosetta Stone and Parthenon Sculptures first, as these rooms can become crowded.",
        info: "A public museum dedicated to human history, art, and culture, housing over 8 million global works.",
        bestTime: "Afternoon",
        duration: "3 hrs",
        wikiTitle: "British Museum",
        panoramicUrl: "https://images.unsplash.com/photo-1534001569309-08527908707a?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Hyde Park",
        category: "nature",
        tip: "Walk over to the Serpentine Lake to rent a pedal boat or witness the Speakers' Corner debates.",
        info: "One of the absolute largest Royal Parks in London, famous for its grand row of trees, fountains, and monuments.",
        bestTime: "Sunny Afternoon",
        duration: "2 hrs",
        wikiTitle: "Hyde Park",
        panoramicUrl: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  },
  {
    city: "New York",
    country: "United States",
    region: "North America",
    description: "The City That Never Sleeps, highlighted by towering skyscrapers, Broadway lights, central greenery, and immense cultural diversity.",
    bestVisitingTime: "September to November or May to June",
    estimatedCost: { backpacker: 90, midrange: 220, luxury: 550 },
    rating: 4.8,
    popularityScore: 97,
    activities: ["Skyline Observatory Looking", "Central Park Cycling", "Times Square Wandering", "Brooklyn Bridge Walking"],
    spots: [
      {
        name: "Statue of Liberty",
        category: "heritage",
        tip: "Book Crown access reserve tickets at least 4 months ahead; standard grounds tickets are ample for photos.",
        info: "The colossal neoclassical copper sculpture on Liberty Island, gifted by France to the US in 1886.",
        bestTime: "Morning Ferry",
        duration: "3-4 hrs",
        wikiTitle: "Statue of Liberty",
        panoramicUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Central Park",
        category: "nature",
        tip: "Find the Bethesda Fountain and Bow Bridge for the registry of cinema-worthy photos.",
        info: "A massive, green urban park in Manhattan, containing walking loops, lakes, zoo cages, and concert shells.",
        bestTime: "Afternoon",
        duration: "3 hrs",
        wikiTitle: "Central Park",
        panoramicUrl: "https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Empire State Building",
        category: "city",
        tip: "Visit late at night (after 10:00 PM) to see a sparkling city landscape without the dense tourist rush.",
        info: "The iconic 102-story Art Deco steel skyscraper, representing the architectural ambition of historical Manhattan.",
        bestTime: "Late Night",
        duration: "2 hrs",
        wikiTitle: "Empire State Building",
        panoramicUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  },
  {
    city: "Cairo",
    country: "Egypt",
    region: "Africa",
    description: "An ancient desert hub situated alongside the winding Nile, featuring legacy pyramids, massive bazaars, and rich Islamic heritage.",
    bestVisitingTime: "October to April",
    estimatedCost: { backpacker: 30, midrange: 70, luxury: 190 },
    rating: 4.6,
    popularityScore: 92,
    activities: ["Nile Felucca Sailing", "Ancient Pyramids Exploring", "Old Town Bazaar Haggling", "Spice & Herb Sniffing"],
    spots: [
      {
        name: "Giza Pyramid Complex",
        category: "heritage",
        tip: "Hire an registered camel guide inside the plateau gates to secure the best panoramic desert dune views.",
        info: "The oldest and only remaining wonder of the ancient world, featuring the Great Pyramid and Sphinx carvings.",
        bestTime: "Sunrise/Early Morning",
        duration: "3-4 hrs",
        wikiTitle: "Giza pyramid complex",
        panoramicUrl: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Khan el-Khalili",
        category: "city",
        tip: "Enjoy a traditional mint tea at El Fishawy Café, operating continuously for over 220 years.",
        info: "A famous ancient souq (market) filled with silver plates, lamps, spices, and historic gold lanes.",
        bestTime: "Evening",
        duration: "2-3 hrs",
        wikiTitle: "Khan el-Khalili",
        panoramicUrl: "https://images.unsplash.com/photo-1626021430030-cf2cae9bd0bf?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  },
  {
    city: "Sydney",
    country: "Australia",
    region: "Oceania",
    description: "A sun-kissed coastal metropolis famous for its sprawling harbor, magnificent white opera sails, and legendary surf beaches.",
    bestVisitingTime: "September to November or March to May",
    estimatedCost: { backpacker: 80, midrange: 170, luxury: 440 },
    rating: 4.8,
    popularityScore: 94,
    activities: ["Harbor Bridge Clambering", "Coastal Cliff Hiking", "Surf Paddling", "Outdoor Picnic-ing"],
    spots: [
      {
        name: "Sydney Opera House",
        category: "heritage",
        tip: "Walk around the external Bennelong Point stairs during sunset to see the tiles shift colors.",
        info: "A multi-venue performing arts centre designed by Jørn Utzon, representing a masterpiece of modern architecture.",
        bestTime: "Sunset",
        duration: "1.5 hrs",
        wikiTitle: "Sydney Opera House",
        panoramicUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Bondi Beach",
        category: "beach",
        tip: "Try the Bondi to Coogee coastal walk for incredible cliff views and small ocean pool dips.",
        info: "One of the world's most famous white sand beaches, famous for reliable year-round surf waves and trendy cafes.",
        bestTime: "Morning",
        duration: "3 hrs",
        wikiTitle: "Bondi Beach",
        panoramicUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  },
  {
    city: "Singapore",
    country: "Singapore",
    region: "Asia",
    description: "A futuristic city-state bridging nature and massive urban design, famous for clean streets, street food, and modern garden architecture.",
    bestVisitingTime: "December to June",
    estimatedCost: { backpacker: 65, midrange: 150, luxury: 380 },
    rating: 4.8,
    popularityScore: 97,
    activities: ["Cloud Forest Exploring", "Hawker Food Sampling", "Night Safari Guided Tours", "Sentosa Island Cable Cars"],
    spots: [
      {
        name: "Gardens by the Bay",
        category: "nature",
        tip: "Wait for the Supertree Grove light and sound show at 7:45 PM and 8:45 PM daily.",
        info: "A horticultural sensation spanning 101 hectares, housing futuristic Supertrees, a massive Cloud Forest, and climate domes.",
        bestTime: "Late Afternoon",
        duration: "3 hrs",
        wikiTitle: "Gardens by the Bay",
        panoramicUrl: "https://images.unsplash.com/photo-1525625293386-3fb8551a06c2?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Marina Bay Sands",
        category: "city",
        tip: "The Observation Deck offers stunning panoramic marine views; sunset is the prime photographic slot.",
        info: "An integrated resort fronting Marina Bay, highlighted by three 55-story hotel towers connected by the SkyPark.",
        bestTime: "Sunset",
        duration: "1-2 hrs",
        wikiTitle: "Marina Bay Sands",
        panoramicUrl: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    description: "A glamorous oasis of futuristic ambition rising from the Arabian Desert, characterized by towering skyscrapers, mega-malls, and historical spice souks.",
    bestVisitingTime: "November to March",
    estimatedCost: { backpacker: 70, midrange: 160, luxury: 420 },
    rating: 4.7,
    popularityScore: 96,
    activities: ["Observation Deck Skylines", "Desert Dune Bashes", "Gold Souk Bargaining", "Fountain Show Looking"],
    spots: [
      {
        name: "Burj Khalifa",
        category: "city",
        tip: "Secure reservation tickets early for the At the Top deck; visiting during golden hour is supreme.",
        info: "The tallest building in the world since its capping in 2009, rising spectacularly to 828 meters over downtown Dubai.",
        bestTime: "Sunset",
        duration: "2 hrs",
        wikiTitle: "Burj Khalifa",
        panoramicUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Dubai Miracle Garden",
        category: "nature",
        tip: "Note that the garden is closed during summer peak months (May-September) due to thermal heat.",
        info: "The world's largest natural flower garden, boasting over 150 million blossoming flowers arranged in colorful structures.",
        bestTime: "Morning",
        duration: "2-3 hrs",
        wikiTitle: "Dubai Miracle Garden",
        panoramicUrl: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  },
  {
    city: "Barcelona",
    country: "Spain",
    region: "Europe",
    description: "The vibrant Mediterranean capital of Catalonia, renowned globally for the eccentric architectures of Antoni Gaudí and active sun-drenched beaches.",
    bestVisitingTime: "May to October",
    estimatedCost: { backpacker: 60, midrange: 130, luxury: 350 },
    rating: 4.8,
    popularityScore: 95,
    activities: ["Gothic Quarter Drifting", "Gaudí Cathedral Admiring", "Tapas & Sangria Munching", "Beachfront Cycling"],
    spots: [
      {
        name: "La Sagrada Família",
        category: "heritage",
        tip: "Try to visit during late afternoon so the setting sun rays beam intensely through stained glass windows.",
        info: "An exceptional, unfinished Roman Catholic basilica designed by Antoni Gaudí, incorporating organic forest structures.",
        bestTime: "Late Afternoon",
        duration: "2 hrs",
        wikiTitle: "Sagrada Família",
        panoramicUrl: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Park Güell",
        category: "nature",
        tip: "The monumental zone requires timed passes; early morning arrivals provide standard vacant views.",
        info: "A colorful, whimsical internalized park complex situated on Carmel Hill, decorated with Gaudí's vibrant mosaic tiling.",
        bestTime: "Early Morning",
        duration: "1.5 hrs",
        wikiTitle: "Park Güell",
        panoramicUrl: "https://images.unsplash.com/photo-1523531294919-4bea7c65e894?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  },
  {
    city: "Bangkok",
    country: "Thailand",
    region: "Asia",
    description: "An energetic capital featuring ornate Buddhist shrines, lively boat-filled floating waterways, and immense culinary street food culture.",
    bestVisitingTime: "November to February",
    estimatedCost: { backpacker: 25, midrange: 60, luxury: 180 },
    rating: 4.7,
    popularityScore: 94,
    activities: ["Tuk Tuk Night Rides", "Ancient Temple Drifting", "River Express Boat Commutes", "Night Bazaar Shopping"],
    spots: [
      {
        name: "Grand Palace",
        category: "heritage",
        tip: "Dress conservatively; shoulders and knees must be fully covered to clear temple entry checks.",
        info: "The luxurious historic royal complex, serving as the official home of Kings of Siam since late 1782.",
        bestTime: "Morning",
        duration: "2-3 hrs",
        wikiTitle: "Grand Palace",
        panoramicUrl: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Wat Arun",
        category: "spiritual",
        tip: "Ride the local river ferry over to the opposite shore at sunset to watch the towers illuminate golden.",
        info: "The majestic 'Temple of Dawn', standing proudly on the West Bank of Chao Phraya river with porcelain-encrusted spires.",
        bestTime: "Sunset / Evening",
        duration: "1 hr",
        wikiTitle: "Wat Arun",
        panoramicUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  },
  {
    city: "Cape Town",
    country: "South Africa",
    region: "Africa",
    description: "A gorgeous port city on South Africa's southwest coast, framed by towering flat-backed Table Mountain and rich oceanic biodiversity.",
    bestVisitingTime: "October to April",
    estimatedCost: { backpacker: 40, midrange: 100, luxury: 280 },
    rating: 4.8,
    popularityScore: 94,
    activities: ["Cableway Mountain Hikes", "Ocean Highway Scenic Drives", "Penguin Colony Peeking", "Vineyard Lounging"],
    spots: [
      {
        name: "Table Mountain",
        category: "nature",
        tip: "Check cableway operational status regularly; strong winds can trigger direct service closures.",
        info: "An ancient flat-topped sandstone mountain forming a prominent landmark overlooking the busy Cape Town harbor.",
        bestTime: "Clear Morning",
        duration: "2-3 hrs",
        wikiTitle: "Table Mountain",
        panoramicUrl: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Boulders Beach",
        category: "nature",
        tip: "Use the wooden boardwalks to observe African Penguins closely without disturbing their nesting spots.",
        info: "A sheltered sandy beach with ancient granite boulders, home to a famous wild breeding colony of African Penguins.",
        bestTime: "Afternoon",
        duration: "1.5 hrs",
        wikiTitle: "Boulders Beach",
        panoramicUrl: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  },
  {
    city: "Rio de Janeiro",
    country: "Brazil",
    region: "South America",
    description: "An expressive coastal city backdropped by volcanic peaks, sandy Atlantic beaches, and infectious samba beats.",
    bestVisitingTime: "December to March (Carnival Season) or September to November",
    estimatedCost: { backpacker: 35, midrange: 90, luxury: 240 },
    rating: 4.7,
    popularityScore: 93,
    activities: ["Cable Car Ride Lookout", "Samba Dance Clubbing", "Ocean Beach Volleying", "Sunset Stone Watching"],
    spots: [
      {
        name: "Christ the Redeemer",
        category: "spiritual",
        tip: "Depart on the first morning cog train to view the peak before low-hanging mist sets in.",
        info: "The legendary Art Deco colossal statue of Jesus Christ sitting atop the 700-meter Corcovado peak.",
        bestTime: "Early Morning",
        duration: "2-3 hrs",
        wikiTitle: "Christ the Redeemer (statue)",
        panoramicUrl: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Copacabana Beach",
        category: "beach",
        tip: "Stroll along the historic black-and-white wave-patterned stone promenade designed by Roberto Burle Marx.",
        info: "A world-famous 4-kilometer crescent-shaped ocean beach of golden sand, populated by lively beach kiosks.",
        bestTime: "Late Afternoon",
        duration: "2 hrs",
        wikiTitle: "Copacabana",
        panoramicUrl: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  },
  {
    city: "Toronto",
    country: "Canada",
    region: "North America",
    description: "A clean, dynamic metropolis along Lake Ontario, offering massive cultural venues, diverse neighborhoods, and green island escapes.",
    bestVisitingTime: "June to September",
    estimatedCost: { backpacker: 65, midrange: 140, luxury: 370 },
    rating: 4.6,
    popularityScore: 91,
    activities: ["CN Tower SkyWalks", "Lake Ontario Ferry Rides", "Kensington Market Food Tasters", "Museum Gallery Hopping"],
    spots: [
      {
        name: "CN Tower",
        category: "city",
        tip: "Dine at the revolving 360 Restaurant to unlock complimentary glass floor observation levels.",
        info: "A striking 553-meter concrete communication and observation tower, serving as a signature symbol of Toronto.",
        bestTime: "Sunset",
        duration: "1.5 hrs",
        wikiTitle: "CN Tower",
        panoramicUrl: "https://images.unsplash.com/photo-1507992781348-31024beb7162?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Toronto Islands",
        category: "nature",
        tip: "Rent a tandem bicycle on Centre Island to explore the connecting lagoons and prime city skyline viewpoints.",
        info: "A serene car-free chain of small islands on Lake Ontario, offering beautiful beaches, trails, and canoeing.",
        bestTime: "Sunny Afternoon",
        duration: "3-4 hrs",
        wikiTitle: "Toronto Islands",
        panoramicUrl: "https://images.unsplash.com/photo-1490642914619-7955a3fd483c?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  },
  {
    city: "Munich",
    country: "Germany",
    region: "Europe",
    description: "The handsome capital of Bavaria, combining baroque cathedral arches, colossal beer gardens, and scenic alpine day trips.",
    bestVisitingTime: "September to October (Oktoberfest) or May to July",
    estimatedCost: { backpacker: 60, midrange: 130, luxury: 360 },
    rating: 4.7,
    popularityScore: 93,
    activities: ["Historic Marienplatz Drifts", "English Garden River Surfing", "Traditional Pretzel Munching", "Bavarian Palace Walking"],
    spots: [
      {
        name: "Nymphenburg Palace",
        category: "heritage",
        tip: "Purchase garden tickets to view the beautiful hunting lodge pavilions tucked in surrounding woods.",
        info: "A sweeping Baroque palace serving as the main summer residence of former rulers of Bavaria.",
        bestTime: "Morning",
        duration: "2-3 hrs",
        wikiTitle: "Nymphenburg Palace",
        panoramicUrl: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "English Garden",
        category: "nature",
        tip: "Walk to the Eisbachwelle bridge to watch elite river surfers ride the standing static wave.",
        info: "A massive public park stretching from the city center to northeast Munich, larger than New York's Central Park.",
        bestTime: "Afternoon",
        duration: "2 hrs",
        wikiTitle: "Englischer Garten",
        panoramicUrl: "https://images.unsplash.com/photo-1573155993874-d5d48af862ba?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  }
];

// Helper to convert GlobalDetailedCity into standard Destination & Places
export const internationalDestinations: Destination[] = internationalCities.map((c) => ({
  state: c.country, // Match the Country as state to reuse filters
  city: c.city,
  type: "International",
  aliases: [c.country.toLowerCase(), c.region.toLowerCase(), "world", "abroad"],
  curated: true
}));

export const internationalPlaces: Place[] = internationalCities.flatMap((c) =>
  c.spots.map((s) => ({
    name: s.name,
    city: c.city,
    state: c.country,
    type: "World Attraction",
    category: s.category,
    bestTime: s.bestTime,
    duration: s.duration,
    tip: s.tip,
    wikiTitle: s.wikiTitle,
    mediaSearch: `${s.name} ${c.city} ${c.country}`,
    info: s.info,
    aliases: [c.country.toLowerCase(), c.city.toLowerCase()]
  }))
);
