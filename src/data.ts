import { Place, Destination } from "./types";

export const categoryCopy: Record<string, string> = {
  heritage: "a history-rich landmark with architecture, stories, and photo-worthy details",
  nature: "a scenic escape with open views, fresh air, and slow travel moments",
  beach: "a coastal stop for sea breeze, sunsets, casual food, and relaxed walks",
  spiritual: "a peaceful spiritual place with rituals, local culture, and reflective energy",
  city: "a lively city experience with markets, food, viewpoints, and local movement"
};

export const verifiedWikiTitles: Record<string, string> = {
  "RK Beach": "Ramakrishna Mission Beach",
  "Kailasagiri": "Kailasagiri",
  "Borra Caves": "Borra Caves",
  "Sri Venkateswara Temple": "Venkateswara Temple, Tirumala",
  "Talakona Waterfalls": "Talakona",
  "Tawang Monastery": "Tawang Monastery",
  "Sela Pass": "Sela Pass",
  "Ziro Valley": "Ziro Valley",
  "Kamakhya Temple": "Kamakhya Temple",
  "Kaziranga National Park": "Kaziranga National Park",
  "Rang Ghar": "Rang Ghar",
  "Takht Sri Patna Sahib": "Takht Sri Patna Sahib",
  "Mahabodhi Temple": "Mahabodhi Temple",
  "Nalanda Mahavihara": "Nalanda Mahavihara",
  "Chitrakote Falls": "Chitrakote Falls",
  "Tirathgarh Falls": "Tirathgarh Falls",
  "Fontainhas": "Fontainhas",
  "Anjuna Beach": "Anjuna Beach",
  "Chapora Fort": "Chapora Fort",
  "Colva Beach": "Colva Beach",
  "Sabarmati Ashram": "Sabarmati Ashram",
  "Adalaj Stepwell": "Adalaj Stepwell",
  "Dwarkadhish Temple": "Dwarkadhish Temple",
  "Aina Mahal": "Aina Mahal",
  "Brahma Sarovar": "Brahma Sarovar",
  "Jyotisar": "Jyotisar",
  "Sultanpur National Park": "Sultanpur National Park",
  "Yadavindra Gardens": "Yadavindra Gardens",
  "The Ridge": "The Ridge, Shimla",
  "Jakhu Temple": "Jakhoo",
  "Solang Valley": "Solang Valley",
  "Hadimba Temple": "Hidimba Devi Temple",
  "Bhagsu Waterfall": "Bhagsu",
  "Hundru Falls": "Hundru Falls",
  "Baidyanath Temple": "Baidyanath Temple",
  "Lalbagh Botanical Garden": "Lal Bagh",
  "Bangalore Palace": "Bangalore Palace",
  "Mysore Palace": "Mysore Palace",
  "Chamundi Hill": "Chamundi Hills",
  "Virupaksha Temple": "Virupaksha Temple, Hampi",
  "Vittala Temple": "Vijaya Vittala Temple",
  "Om Beach": "Om Beach",
  "Fort Kochi": "Fort Kochi",
  "Chinese Fishing Nets": "Chinese fishing nets",
  "Eravikulam National Park": "Eravikulam National Park",
  "Edakkal Caves": "Edakkal Caves",
  "Upper Lake": "Bhojtal",
  "Tribal Museum": "Madhya Pradesh Tribal Museum",
  "Gwalior Fort": "Gwalior Fort",
  "Khajuraho": "Khajuraho Group of Monuments",
  "Orchha Fort Complex": "Orchha Fort complex",
  "Gateway of India": "Gateway of India",
  "Marine Drive": "Marine Drive, Mumbai",
  "Shaniwar Wada": "Shaniwar Wada",
  "Sinhagad Fort": "Sinhagad",
  "Ellora Caves": "Ellora Caves",
  "Bibi Ka Maqbara": "Bibi Ka Maqbara",
  "Kaas Plateau": "Kaas plateau",
  "Thoseghar Falls": "Thoseghar Waterfalls",
  "Kangla Fort": "Kangla Palace",
  "Loktak Lake": "Loktak Lake",
  "Umiam Lake": "Umiam Lake",
  "Nohkalikai Falls": "Nohkalikai Falls",
  "Mawsmai Cave": "Mawsmai Cave",
  "Umngot River": "Umngot River",
  "Kohima War Cemetery": "Kohima War Cemetery",
  "Dzukou Valley": "Dzüko Valley",
  "Lingaraj Temple": "Lingaraja Temple",
  "Udayagiri and Khandagiri Caves": "Udayagiri and Khandagiri Caves",
  "Jagannath Temple": "Jagannath Temple, Puri",
  "Puri Beach": "Puri Beach",
  "Sun Temple": "Konark Sun Temple",
  "Golden Temple": "Golden Temple",
  "Jallianwala Bagh": "Jallianwala Bagh",
  "Virasat-e-Khalsa": "Virasat-e-Khalsa",
  "Amber Fort": "Amber Fort",
  "Hawa Mahal": "Hawa Mahal",
  "City Palace": "City Palace, Udaipur",
  "Lake Pichola": "Lake Pichola",
  "Mehrangarh Fort": "Mehrangarh",
  "Jaisalmer Fort": "Jaisalmer Fort",
  "Pushkar Lake": "Pushkar Lake",
  "Rumtek Monastery": "Rumtek Monastery",
  "Tsomgo Lake": "Lake Tsomgo",
  "Marina Beach": "Marina Beach",
  "Kapaleeshwarar Temple": "Kapaleeshwarar Temple",
  "Meenakshi Amman Temple": "Meenakshi Temple",
  "Ramanathaswamy Temple": "Ramanathaswamy Temple",
  "Vivekananda Rock Memorial": "Vivekananda Rock Memorial",
  "Ooty Lake": "Ooty Lake",
  "Charminar": "Charminar",
  "Golconda Fort": "Golconda",
  "Warangal Fort": "Warangal Fort",
  "Thousand Pillar Temple": "Thousand Pillar Temple",
  "Ujjayanta Palace": "Ujjayanta Palace",
  "Unakoti Rock Reliefs": "Unakoti",
  "Dashashwamedh Ghat": "Dashashwamedh Ghat",
  "Sarnath": "Sarnath",
  "Taj Mahal": "Taj Mahal",
  "Agra Fort": "Agra Fort",
  "Bara Imambara": "Bara Imambara",
  "Ram Mandir": "Ram Mandir",
  "Laxman Jhula Area": "Lakshman Jhula",
  "Naini Lake": "Nainital Lake",
  "Kempty Falls": "Kempty Falls",
  "Victoria Memorial": "Victoria Memorial, Kolkata",
  "Howrah Bridge": "Howrah Bridge",
  "Tiger Hill": "Tiger Hill, Darjeeling",
  "Batasia Loop": "Batasia Loop",
  "Cellular Jail": "Cellular Jail",
  "Radhanagar Beach": "Radhanagar Beach",
  "Rock Garden": "Rock Garden of Chandigarh",
  "Sukhna Lake": "Sukhna Lake",
  "India Gate": "India Gate",
  "Qutub Minar": "Qutb Minar",
  "Dal Lake": "Dal Lake",
  "Leh Palace": "Leh Palace",
  "Shanti Stupa": "Shanti Stupa, Ladakh",
  "Promenade Beach": "Promenade Beach",
  "French Quarter": "White Town, Puducherry"
};

// Raw layout of city data: [State, City, Type, Aliases, spots: [SpotName, category, bestTime, duration, tip]]
export const citySeeds: Array<[string, string, string, string, Array<[string, string, string, string, string]>]> = [
  ["Andhra Pradesh", "Visakhapatnam", "State", "vizag, coastal andhra", [["RK Beach", "beach", "Oct-Mar", "1-2 hrs", "Go early for calmer light and cooler weather."], ["Kailasagiri", "nature", "Evening", "2 hrs", "Use the ropeway if it is operating."]]],
  ["Andhra Pradesh", "Vijayawada", "State", "krishna river, andhra", [["Kanaka Durga Temple", "spiritual", "Morning", "1-2 hrs", "Start early to avoid long queues."], ["Undavalli Caves", "heritage", "Oct-Mar", "1 hr", "Pair it with a Krishna river drive."]]],
  ["Andhra Pradesh", "Tirupati", "State", "tirumala, balaji", [["Sri Venkateswara Temple", "spiritual", "Year-round", "Half day", "Book darshan slots in advance."], ["Talakona Waterfalls", "nature", "Post-monsoon", "Half day", "Carry shoes with grip for wet paths."]]],
  ["Arunachal Pradesh", "Tawang", "State", "monastery, mountains", [["Tawang Monastery", "spiritual", "Mar-Oct", "1-2 hrs", "Keep time for the museum and courtyards."], ["Sela Pass", "nature", "Apr-Oct", "1 hr", "Check road and weather conditions first."]]],
  ["Arunachal Pradesh", "Ziro", "State", "apatani valley, music festival", [["Ziro Valley", "nature", "Sep-Apr", "Half day", "Rent a local vehicle for village loops."], ["Apatani Villages", "heritage", "Oct-Mar", "2 hrs", "Ask before photographing residents."]]],
  ["Assam", "Guwahati", "State", "brahmaputra, kamakhya", [["Kamakhya Temple", "spiritual", "Oct-Mar", "1-2 hrs", "Start early on festival days."], ["Umananda Island", "nature", "Morning", "1-2 hrs", "Confirm ferry timings before returning."]]],
  ["Assam", "Kaziranga", "State", "rhino, wildlife", [["Kaziranga National Park", "nature", "Nov-Apr", "Half day", "Book safari slots early in peak season."], ["Kaziranga Orchid Park", "heritage", "Nov-Apr", "1-2 hrs", "Stay for the cultural performance if available."]]],
  ["Assam", "Sivasagar", "State", "ahom heritage", [["Rang Ghar", "heritage", "Oct-Mar", "45 min", "Combine with nearby Ahom monuments."], ["Talatal Ghar", "heritage", "Morning", "1 hr", "A guide helps explain the palace layers."]]],
  ["Bihar", "Patna", "State", "patliputra", [["Takht Sri Patna Sahib", "spiritual", "Morning", "1 hr", "Cover your head before entering."], ["Bihar Museum", "city", "Afternoon", "2 hrs", "Keep enough time for history galleries."]]],
  ["Bihar", "Bodh Gaya", "State", "buddhist pilgrimage", [["Mahabodhi Temple", "spiritual", "Oct-Mar", "2 hrs", "Visit early for a quieter experience."], ["Great Buddha Statue", "spiritual", "Morning", "45 min", "Pair it with monastery walks nearby."]]],
  ["Bihar", "Nalanda", "State", "ancient university", [["Nalanda Mahavihara", "heritage", "Oct-Mar", "2 hrs", "Hire a guide for the ancient university story."], ["Hiuen Tsang Memorial Hall", "heritage", "Afternoon", "1 hr", "Good after the main ruins."]]],
  ["Chhattisgarh", "Raipur", "State", "central india", [["Purkhauti Muktangan", "heritage", "Evening", "1-2 hrs", "Explore the outdoor displays slowly."], ["Mahant Ghasidas Museum", "heritage", "Afternoon", "1 hr", "Good intro to regional history."]]],
  ["Chhattisgarh", "Jagdalpur", "State", "bastar, waterfalls", [["Chitrakote Falls", "nature", "Jul-Jan", "2 hrs", "Water volume is strongest after monsoon."], ["Tirathgarh Falls", "nature", "Post-monsoon", "2 hrs", "Wear comfortable footwear for steps."]]],
  ["Chhattisgarh", "Mainpat", "State", "hill station", [["Tiger Point", "nature", "Oct-Feb", "1 hr", "Go in daylight for the safest views."], ["Dhakpo Shedupling Monastery", "spiritual", "Morning", "1 hr", "Keep the visit quiet and respectful."]]],
  ["Goa", "Panaji", "State", "panjim, fontainhas", [["Fontainhas", "heritage", "Morning", "1-2 hrs", "Walk slowly and respect residential lanes."], ["Dona Paula Viewpoint", "city", "Sunset", "45 min", "Combine it with Miramar Beach."]]],
  ["Goa", "Mapusa", "State", "north goa", [["Anjuna Beach", "beach", "Nov-Feb", "2 hrs", "Visit around sunset for the best mood."], ["Chapora Fort", "heritage", "Evening", "1 hr", "The climb is short but exposed."]]],
  ["Goa", "Margao", "State", "south goa", [["Colva Beach", "beach", "Nov-Feb", "1-2 hrs", "Weekdays are calmer than weekends."], ["Rachol Seminary", "heritage", "Morning", "1 hr", "Check access before visiting."]]],
  ["Gujarat", "Ahmedabad", "State", "amdavad, sabarmati", [["Sabarmati Ashram", "heritage", "Morning", "1-2 hrs", "Read the exhibits at an unhurried pace."], ["Adalaj Stepwell", "heritage", "Morning", "1 hr", "Morning light shows the carvings well."]]],
  ["Gujarat", "Dwarka", "State", "char dham, coast", [["Dwarkadhish Temple", "spiritual", "Morning", "1 hr", "Check aarti timings before going."], ["Bet Dwarka", "beach", "Oct-Mar", "Half day", "Confirm ferry timings in advance."]]],
  ["Gujarat", "Bhuj", "State", "kutch, rann", [["White Rann of Kutch", "nature", "Nov-Feb", "Half day", "Sunset and full moon nights are popular."], ["Aina Mahal", "heritage", "Afternoon", "1 hr", "Pair it with Prag Mahal nearby."]]],
  ["Haryana", "Kurukshetra", "State", "mahabharata", [["Brahma Sarovar", "spiritual", "Evening", "1 hr", "Sunset reflections are beautiful here."], ["Jyotisar", "heritage", "Morning", "1 hr", "Check evening show timings if interested."]]],
  ["Haryana", "Gurugram", "State", "gurgaon, cyber hub", [["Sultanpur National Park", "nature", "Nov-Feb", "2 hrs", "Carry binoculars during birding season."], ["Kingdom of Dreams", "city", "Evening", "2-3 hrs", "Confirm current opening status before visiting."]]],
  ["Haryana", "Panchkula", "State", "morni hills", [["Morni Hills", "nature", "Oct-Mar", "Half day", "Start early for cooler roads."], ["Yadavindra Gardens", "heritage", "Evening", "1-2 hrs", "Night lighting adds charm to the gardens."]]],
  ["Himachal Pradesh", "Shimla", "State", "hill station", [["The Ridge", "city", "Evening", "1-2 hrs", "Walk from Mall Road for the full experience."], ["Jakhu Temple", "spiritual", "Morning", "1-2 hrs", "Secure loose items near the temple approach."]]],
  ["Himachal Pradesh", "Manali", "State", "snow, mountains", [["Solang Valley", "nature", "Dec-Jun", "Half day", "Compare activity prices before booking."], ["Hadimba Temple", "spiritual", "Morning", "1 hr", "Pair it with Old Manali cafes."]]],
  ["Himachal Pradesh", "Dharamshala", "State", "mcleodganj, dalai lama", [["Tsuglagkhang Complex", "spiritual", "Morning", "1 hr", "Keep the visit quiet inside the complex."], ["Bhagsu Waterfall", "nature", "Mar-Jun", "1-2 hrs", "Wear shoes with grip for the path."]]],
  ["Jharkhand", "Ranchi", "State", "waterfalls", [["Hundru Falls", "nature", "Aug-Feb", "2 hrs", "Steps can be tiring, so carry water."], ["Jagannath Temple Ranchi", "spiritual", "Morning", "1 hr", "The hilltop view is a bonus."]]],
  ["Jharkhand", "Deoghar", "State", "baidyanath dham", [["Baidyanath Temple", "spiritual", "Morning", "1-2 hrs", "Expect crowds during Shravan season."], ["Tapovan Caves", "heritage", "Afternoon", "1 hr", "Good short outing after temple visits."]]],
  ["Jharkhand", "Hazaribagh", "State", "plateau, wildlife", [["Hazaribagh Lake", "nature", "Evening", "1 hr", "Best for a quiet city break."], ["Canary Hill", "nature", "Morning", "1 hr", "Clear days give better plateau views."]]],
  ["Karnataka", "Bengaluru", "State", "bangalore, garden city", [["Lalbagh Botanical Garden", "nature", "Morning", "1-2 hrs", "Enter early for calmer paths."], ["Bangalore Palace", "heritage", "Afternoon", "1 hr", "Confirm photo rules before visiting."]]],
  ["Karnataka", "Mysuru", "State", "mysore, palace", [["Mysore Palace", "heritage", "Morning", "2 hrs", "Evening lighting is worth seeing."], ["Chamundi Hill", "spiritual", "Morning", "1-2 hrs", "Go early to avoid traffic."]]],
  ["Karnataka", "Hampi", "State", "vijayanagara", [["Virupaksha Temple", "heritage", "Morning", "1 hr", "Start here before the heat rises."], ["Vittala Temple", "heritage", "Morning", "2 hrs", "Use a local guide for the stories."]]],
  ["Karnataka", "Gokarna", "State", "beaches", [["Om Beach", "beach", "Nov-Feb", "2 hrs", "Sunset is the best time to linger."], ["Mahabaleshwar Temple", "spiritual", "Morning", "1 hr", "Dress modestly for temple entry."]]],
  ["Kerala", "Kochi", "State", "cochin, fort kochi", [["Fort Kochi", "heritage", "Nov-Feb", "Half day", "Explore on foot for cafes and galleries."], ["Chinese Fishing Nets", "city", "Sunset", "45 min", "Reach before sunset to see activity."]]],
  ["Kerala", "Munnar", "State", "tea gardens", [["Eravikulam National Park", "nature", "Sep-Mar", "Half day", "Book entry early in peak months."], ["Tea Museum", "heritage", "Afternoon", "1 hr", "Good after a tea estate drive."]]],
  ["Kerala", "Alappuzha", "State", "alleppey, backwaters", [["Alleppey Backwaters", "nature", "Nov-Feb", "Half day", "Choose licensed boat operators."], ["Marari Beach", "beach", "Evening", "1-2 hrs", "A calmer beach break near town."]]],
  ["Kerala", "Wayanad", "State", "forest, caves", [["Edakkal Caves", "heritage", "Morning", "2 hrs", "The climb needs comfortable shoes."], ["Pookode Lake", "nature", "Evening", "1 hr", "Good for a relaxed family stop."]]],
  ["Madhya Pradesh", "Bhopal", "State", "mp, lakes", [["Upper Lake", "nature", "Evening", "1-2 hrs", "Visit after the afternoon heat drops."], ["Tribal Museum", "heritage", "Afternoon", "2 hrs", "The installations deserve time."]]],
  ["Madhya Pradesh", "Gwalior", "State", "fort city", [["Gwalior Fort", "heritage", "Morning", "2-3 hrs", "Use transport inside if walking feels long."], ["Jai Vilas Palace", "heritage", "Afternoon", "1-2 hrs", "Check museum timings first."]]],
  ["Madhya Pradesh", "Khajuraho", "State", "temples, unesco", [["Western Group of Temples", "heritage", "Morning", "2 hrs", "A guide makes the symbolism clearer."], ["Raneh Falls", "nature", "Post-monsoon", "1-2 hrs", "Best after the rains."]]],
  ["Madhya Pradesh", "Orchha", "State", "betwa, palaces", [["Orchha Fort Complex", "heritage", "Morning", "2 hrs", "Climb carefully for river views."], ["Chaturbhuj Temple", "spiritual", "Evening", "1 hr", "Sunset light is lovely around town."]]],
  ["Maharashtra", "Mumbai", "State", "bombay, marine drive", [["Gateway of India", "heritage", "Morning", "1 hr", "Start here for Elephanta ferry plans."], ["Marine Drive", "city", "Sunset", "1 hr", "Weekdays are easier for slow walks."]]],
  ["Maharashtra", "Pune", "State", "peshwa, western ghats", [["Shaniwar Wada", "heritage", "Morning", "1 hr", "Pair with old-city food stops."], ["Sinhagad Fort", "nature", "Morning", "Half day", "Start early for the climb and views."]]],
  ["Maharashtra", "Chhatrapati Sambhajinagar", "State", "aurangabad, ajanta ellora", [["Ellora Caves", "heritage", "Oct-Mar", "Half day", "Start early and keep water with you."], ["Bibi Ka Maqbara", "heritage", "Evening", "1 hr", "Soft light works well for photos."]]],
  ["Maharashtra", "Satara", "State", "kaas, forts", [["Kaas Plateau", "nature", "Aug-Oct", "Half day", "Book entry during flower season."], ["Thoseghar Falls", "nature", "Monsoon", "1-2 hrs", "Mist can be strong near viewpoints."]]],
  ["Manipur", "Imphal", "State", "loktak, manipur", [["Kangla Fort", "heritage", "Morning", "1-2 hrs", "Give time to understand the old capital."], ["Ima Keithel", "city", "Afternoon", "1 hr", "Ask before photographing vendors."]]],
  ["Manipur", "Moirang", "State", "loktak lake", [["Loktak Lake", "nature", "Oct-Mar", "Half day", "Go with a local boat operator."], ["INA Museum", "heritage", "Afternoon", "1 hr", "Good for modern history context."]]],
  ["Meghalaya", "Shillong", "State", "clouds, waterfalls", [["Umiam Lake", "nature", "Oct-Apr", "1-2 hrs", "Stop here on the road into Shillong."], ["Police Bazar", "city", "Evening", "1-2 hrs", "Good for food and shopping."]]],
  ["Meghalaya", "Cherrapunji", "State", "sohra, waterfalls", [["Nohkalikai Falls", "nature", "Post-monsoon", "1 hr", "Clouds can cover the view quickly."], ["Mawsmai Cave", "nature", "Morning", "1 hr", "Wear shoes that can handle damp paths."]]],
  ["Meghalaya", "Dawki", "State", "umngot river", [["Umngot River", "nature", "Nov-Apr", "1-2 hrs", "Clear water is best in dry months."], ["Shnongpdeng", "nature", "Nov-Apr", "2 hrs", "Try boating with a local operator."]]],
  ["Mizoram", "Aizawl", "State", "mizoram hills", [["Durtlang Hills", "nature", "Morning", "1 hr", "Clear mornings give the best city views."], ["Mizoram State Museum", "heritage", "Afternoon", "1 hr", "Useful first stop for culture context."]]],
  ["Mizoram", "Champhai", "State", "vineyards, border hills", [["Rih Dil View Route", "nature", "Oct-Mar", "Half day", "Check permissions and local guidance."], ["Murlen National Park", "nature", "Nov-Mar", "Half day", "Plan with local transport in advance."]]],
  ["Nagaland", "Kohima", "State", "hornbill, nagaland", [["Kohima War Cemetery", "heritage", "Morning", "1 hr", "Keep the visit quiet and reflective."], ["Kisama Heritage Village", "heritage", "Dec", "2 hrs", "Festival season needs early bookings."]]],
  ["Nagaland", "Mon", "State", "konyak, villages", [["Longwa Village", "heritage", "Oct-Apr", "Half day", "Go with a local guide."], ["Shangnyu Village", "heritage", "Morning", "2 hrs", "Ask before taking portraits."]]],
  ["Odisha", "Bhubaneswar", "State", "temple city", [["Lingaraj Temple", "spiritual", "Morning", "1 hr", "Check entry rules before visiting."], ["Udayagiri and Khandagiri Caves", "heritage", "Morning", "1-2 hrs", "Wear comfortable shoes."]]],
  ["Odisha", "Puri", "State", "jagannath, beach", [["Jagannath Temple", "spiritual", "Morning", "1-2 hrs", "Check temple entry rules in advance."], ["Puri Beach", "beach", "Evening", "1-2 hrs", "Sunrise is also excellent here."]]],
  ["Odisha", "Konark", "State", "sun temple", [["Sun Temple", "heritage", "Morning", "2 hrs", "A guide helps explain the carvings."], ["Chandrabhaga Beach", "beach", "Sunrise", "1 hr", "Best before the day becomes hot."]]],
  ["Punjab", "Amritsar", "State", "golden temple", [["Golden Temple", "spiritual", "Early morning", "2 hrs", "See it once by day and once at night."], ["Jallianwala Bagh", "heritage", "Morning", "45 min", "It is walking distance from the temple."]]],
  ["Punjab", "Patiala", "State", "royal punjab", [["Qila Mubarak", "heritage", "Morning", "1 hr", "Check restoration access before visiting."], ["Sheesh Mahal", "heritage", "Afternoon", "1 hr", "Good for royal-era architecture."]]],
  ["Punjab", "Anandpur Sahib", "State", "sikh heritage", [["Virasat-e-Khalsa", "heritage", "Morning", "2 hrs", "The museum experience is immersive."], ["Takht Sri Kesgarh Sahib", "spiritual", "Morning", "1 hr", "Dress respectfully and cover your head."]]],
  ["Rajasthan", "Jaipur", "State", "pink city", [["Amber Fort", "heritage", "Oct-Mar", "2-3 hrs", "Arrive early to avoid crowds."], ["Hawa Mahal", "heritage", "Morning", "45 min", "Photograph the facade from across the road."]]],
  ["Rajasthan", "Udaipur", "State", "city of lakes", [["City Palace", "heritage", "Morning", "2 hrs", "Book museum tickets early in peak season."], ["Lake Pichola", "nature", "Sunset", "1-2 hrs", "Evening boat slots fill quickly."]]],
  ["Rajasthan", "Jodhpur", "State", "blue city", [["Mehrangarh Fort", "heritage", "Morning", "2-3 hrs", "The audio guide is worth it."], ["Jaswant Thada", "heritage", "Afternoon", "1 hr", "Good after Mehrangarh Fort."]]],
  ["Rajasthan", "Jaisalmer", "State", "desert, golden city", [["Jaisalmer Fort", "heritage", "Morning", "2 hrs", "Respect that people still live inside."], ["Sam Sand Dunes", "nature", "Sunset", "Half day", "Choose ethical, reliable operators."]]],
  ["Rajasthan", "Pushkar", "State", "lake, camel fair", [["Pushkar Lake", "spiritual", "Morning", "1 hr", "Keep rituals respectful around the ghats."], ["Brahma Temple", "spiritual", "Morning", "45 min", "It pairs naturally with the lake walk."]]],
  ["Sikkim", "Gangtok", "State", "himalaya, mg marg", [["MG Marg", "city", "Evening", "1-2 hrs", "Best for food and a relaxed walk."], ["Rumtek Monastery", "spiritual", "Morning", "1-2 hrs", "Carry a light jacket."]]],
  ["Sikkim", "Pelling", "State", "kanchenjunga", [["Pemayangtse Monastery", "spiritual", "Morning", "1 hr", "Clear mornings give mountain views."], ["Rabdentse Ruins", "heritage", "Morning", "1-2 hrs", "The forest walk is part of the charm."]]],
  ["Sikkim", "Lachung", "State", "yumthang, north sikkim", [["Yumthang Valley", "nature", "Apr-Jun", "Half day", "Permits and road status matter here."], ["Zero Point", "nature", "Apr-Jun", "Half day", "Start early and carry warm layers."]]],
  ["Tamil Nadu", "Chennai", "State", "madras, marina", [["Marina Beach", "beach", "Sunrise", "1 hr", "Go early for cooler air."], ["Kapaleeshwarar Temple", "spiritual", "Morning", "1 hr", "Explore Mylapore streets nearby."]]],
  ["Tamil Nadu", "Madurai", "State", "meenakshi", [["Meenakshi Amman Temple", "spiritual", "Morning", "2 hrs", "Check phone and bag rules before entry."], ["Thirumalai Nayakkar Palace", "heritage", "Afternoon", "1 hr", "Look for the evening light show schedule."]]],
  ["Tamil Nadu", "Rameswaram", "State", "pamban, pilgrimage", [["Ramanathaswamy Temple", "spiritual", "Morning", "2 hrs", "Plan around temple rituals."], ["Pamban Bridge", "city", "Evening", "45 min", "Wind can be strong near the bridge."]]],
  ["Tamil Nadu", "Kanyakumari", "State", "southern tip", [["Vivekananda Rock Memorial", "spiritual", "Morning", "1-2 hrs", "Check ferry queues in advance."], ["Kanyakumari Beach", "beach", "Sunrise", "1 hr", "Sunrise and sunset are both popular."]]],
  ["Tamil Nadu", "Ooty", "State", "nilgiris", [["Ooty Lake", "nature", "Morning", "1 hr", "Weekdays are calmer."], ["Doddabetta Peak", "nature", "Morning", "1 hr", "Views depend on cloud cover."]]],
  ["Telangana", "Hyderabad", "State", "charminar, nizam", [["Charminar", "heritage", "Morning", "1 hr", "Add Laad Bazaar for shopping."], ["Golconda Fort", "heritage", "Late afternoon", "2-3 hrs", "Carry water for the climb."]]],
  ["Telangana", "Warangal", "State", "kakatiya", [["Warangal Fort", "heritage", "Morning", "1-2 hrs", "The stone gateways are the highlight."], ["Thousand Pillar Temple", "spiritual", "Morning", "1 hr", "Go early for softer light."]]],
  ["Tripura", "Agartala", "State", "tripura", [["Ujjayanta Palace", "heritage", "Morning", "1-2 hrs", "Keep time for museum galleries."], ["Tripura Sundari Temple", "spiritual", "Morning", "1-2 hrs", "Plan travel time from Agartala."]]],
  ["Tripura", "Unakoti", "State", "rock carvings", [["Unakoti Rock Reliefs", "heritage", "Oct-Mar", "2 hrs", "Start early for comfortable walking."], ["Jampui Hills", "nature", "Oct-Feb", "Half day", "Good for slow hill views."]]],
  ["Uttar Pradesh", "Varanasi", "State", "banaras, kashi", [["Dashashwamedh Ghat", "spiritual", "Evening", "1-2 hrs", "Reach early for the aarti."], ["Sarnath", "heritage", "Morning", "2-3 hrs", "Add museum timings to your plan."]]],
  ["Uttar Pradesh", "Agra", "State", "taj mahal", [["Taj Mahal", "heritage", "Sunrise", "2 hrs", "Check Friday closure before planning."], ["Agra Fort", "heritage", "Morning", "1-2 hrs", "Pairs well with Taj Mahal."]]],
  ["Uttar Pradesh", "Lucknow", "State", "awadh, nawabs", [["Bara Imambara", "heritage", "Morning", "2 hrs", "Use a guide for the maze section."], ["Rumi Darwaza", "heritage", "Evening", "30 min", "Good as part of an old-city drive."]]],
  ["Uttar Pradesh", "Ayodhya", "State", "ram mandir", [["Ram Mandir", "spiritual", "Morning", "1-2 hrs", "Check current crowd guidance."], ["Saryu Ghat", "spiritual", "Evening", "1 hr", "Aarti time is the most atmospheric."]]],
  ["Uttarakhand", "Rishikesh", "State", "yoga, ganga", [["Laxman Jhula Area", "spiritual", "Morning", "1-2 hrs", "Walk the riverside lanes slowly."], ["River Rafting Stretch", "nature", "Sep-Jun", "Half day", "Use licensed operators only."]]],
  ["Uttarakhand", "Nainital", "State", "lake town", [["Naini Lake", "nature", "Evening", "1-2 hrs", "Boating is best before peak evening rush."], ["Snow View Point", "nature", "Morning", "1 hr", "Views are clearest after rain."]]],
  ["Uttarakhand", "Mussoorie", "State", "queen of hills", [["Kempty Falls", "nature", "Morning", "1-2 hrs", "Go early to avoid crowds."], ["Camel's Back Road", "city", "Evening", "1 hr", "Ideal for a slow sunset walk."]]],
  ["West Bengal", "Kolkata", "State", "calcutta, hooghly", [["Victoria Memorial", "heritage", "Morning", "1-2 hrs", "Pair it with Maidan nearby."], ["Howrah Bridge", "city", "Sunrise", "45 min", "Visit the flower market nearby."]]],
  ["West Bengal", "Darjeeling", "State", "tea, kanchenjunga", [["Tiger Hill", "nature", "Clear morning", "2 hrs", "Leave very early for sunrise."], ["Batasia Loop", "heritage", "Morning", "45 min", "Sync with toy train timing if possible."]]],
  ["West Bengal", "Kalimpong", "State", "hills, monastery", [["Deolo Hill", "nature", "Morning", "1 hr", "Clear days give excellent valley views."], ["Zang Dhok Palri Monastery", "spiritual", "Morning", "1 hr", "Keep the visit quiet and respectful."]]],
  ["Andaman and Nicobar Islands", "Port Blair", "Union Territory", "andaman, islands", [["Cellular Jail", "heritage", "Afternoon", "1-2 hrs", "Check light-and-sound show timing."], ["Corbyn's Cove", "beach", "Evening", "1 hr", "Good for a quick coastal stop."]]],
  ["Andaman and Nicobar Islands", "Havelock Island", "Union Territory", "swaraj dweep, beaches", [["Radhanagar Beach", "beach", "Sunset", "2 hrs", "Stay for the golden hour."], ["Elephant Beach", "beach", "Morning", "Half day", "Confirm boat and activity operators."]]],
  ["Chandigarh", "Chandigarh", "Union Territory", "planned city", [["Rock Garden", "city", "Morning", "1-2 hrs", "The sculpture paths are the highlight."], ["Sukhna Lake", "nature", "Evening", "1 hr", "Best for a slow promenade walk."]]],
  ["Dadra and Nagar Haveli and Daman and Diu", "Daman", "Union Territory", "daman, diu, coast", [["Jampore Beach", "beach", "Evening", "1-2 hrs", "Weekdays are calmer."], ["Moti Daman Fort", "heritage", "Morning", "1 hr", "Walk the fort lanes slowly."]]],
  ["Dadra and Nagar Haveli and Daman and Diu", "Silvassa", "Union Territory", "silvassa, tribal museum", [["Tribal Cultural Museum", "heritage", "Afternoon", "1 hr", "Good for local culture context."], ["Dudhni Lake", "nature", "Evening", "2 hrs", "Plan boating before sunset."]]],
  ["Delhi", "New Delhi", "Union Territory", "capital, delhi", [["India Gate", "city", "Evening", "45 min", "Pair with Kartavya Path walk."], ["Qutub Minar", "heritage", "Morning", "1-2 hrs", "Golden hour makes the stonework glow."]]],
  ["Jammu and Kashmir", "Srinagar", "Union Territory", "kashmir, dal lake", [["Dal Lake", "nature", "Apr-Oct", "2 hrs", "Choose registered shikara operators."], ["Mughal Gardens", "heritage", "Apr-Oct", "1-2 hrs", "Spring flowers are especially beautiful."]]],
  ["Jammu and Kashmir", "Jammu", "Union Territory", "vaishno devi", [["Raghunath Temple", "spiritual", "Morning", "1 hr", "Check entry rules before visiting."], ["Bahu Fort", "heritage", "Evening", "1 hr", "Views over the Tawi are a bonus."]]],
  ["Ladakh", "Leh", "Union Territory", "ladakh, high altitude", [["Leh Palace", "heritage", "Morning", "1 hr", "Acclimatize before climbing too much."], ["Shanti Stupa", "spiritual", "Sunset", "1 hr", "Sunset views are excellent."]]],
  ["Ladakh", "Nubra Valley", "Union Territory", "hunder, diskit", [["Diskit Monastery", "spiritual", "Morning", "1 hr", "The valley view is outstanding."], ["Hunder Sand Dunes", "nature", "Evening", "1 hr", "Carry warm layers after sunset."]]],
  ["Lakshadweep", "Agatti", "Union Territory", "islands, lagoon", [["Agatti Lagoon", "beach", "Oct-Mar", "2 hrs", "Permits and local rules are essential."], ["Agatti Beach", "beach", "Sunset", "1 hr", "Respect fragile island ecosystems."]]],
  ["Puducherry", "Puducherry", "Union Territory", "pondicherry, french quarter", [["Promenade Beach", "beach", "Sunrise", "1 hr", "Mornings are calmer and cooler."], ["French Quarter", "heritage", "Morning", "1-2 hrs", "Explore on foot or bicycle."]]],
  ["Puducherry", "Karaikal", "Union Territory", "coastal puducherry", [["Karaikal Beach", "beach", "Evening", "1 hr", "Good for a quiet coastal walk."], ["Karaikal Ammaiyar Temple", "spiritual", "Morning", "1 hr", "Check local festival dates if visiting."]]],
  ["Kerala", "Varkala", "State", "cliff, black sand beach, varkala", [["Varkala Beach", "beach", "Oct-Mar", "2 hrs", "Sunset view is incredible from the cliff."], ["Janardhanaswamy Temple", "spiritual", "Morning", "1 hr", "A historic temple over 2000 years old."]]],
  ["Madhya Pradesh", "Khajuraho Town", "State", "temples, unesco", [["Kandariya Mahadeva Temple", "heritage", "Oct-Mar", "2 hrs", "Light & Sound show in the evening is worth it."], ["Lakshmana Temple", "heritage", "Morning", "1 hr", "Exceptional preservation of Apsara carvings."]]],
  ["Karnataka", "Hampi Ruins", "State", "vijayanagara, ruins", [["Stone Chariot", "heritage", "Winter", "1 hr", "Take pictures during sunrise for magnificent gold lighting."], ["Hemakuta Hill Shrines", "spiritual", "Evening", "1.5 hrs", "Perfect sunset viewpoint overlooking Hampi."]]],
  ["Uttarakhand", "Auli", "State", "skiing, snow resort, himalayas", [["Auli Ropeway", "nature", "Dec-Mar", "1 hr", "Offers gorgeous views of Nanda Devi peak."], ["Auli Artificial Lake", "nature", "Dec-Mar", "1.5 hrs", "Highest man-made lake in the world with snow landscape."]]],
  ["Tamil Nadu", "Mahabalipuram", "State", "shore temple, carvings", [["Shore Temple", "heritage", "Winter", "1.5 hrs", "Get early morning shots against the waves."], ["Pancha Rathas", "heritage", "Morning", "1 hr", "Monolithic rock-cut temples dating to the 7th century."]]]
];

export const homepageFeaturedNames = [
  "Taj Mahal",
  "Golden Temple",
  "Amber Fort",
  "Gateway of India",
  "Hawa Mahal",
  "Charminar",
  "Mysore Palace",
  "Dal Lake",
  "Tawang Monastery",
  "Marina Beach"
];

export const districtAttractionOverrides: Record<string, Array<[string, string, string, string, string]>> = {
  "Bihar|Bhagalpur": [
    ["Vikramshila Setu", "city", "Evening", "45-90 min", "Go around sunset for Ganga views and city skyline photos."],
    ["Budhanath Temple", "spiritual", "Morning", "45-90 min", "A well-known Shiva temple area in Bhagalpur; check local festival crowd before visiting."],
    ["Kuppaghat", "spiritual", "Morning", "1 hr", "A peaceful spiritual stop associated with Maharshi Mehi and Santmat tradition."],
    ["Champapuri", "spiritual", "Morning", "1-2 hrs", "Important Jain pilgrimage area near Bhagalpur, best visited with local transport planned."],
    ["Bateshwar Sthan", "spiritual", "Morning", "1-2 hrs", "A riverside religious and heritage stop often visited from Bhagalpur side."],
    ["Vikramshila Gangetic Dolphin Sanctuary", "nature", "Nov-Mar", "2-3 hrs", "Good for Ganga river ecology interest; local boat guidance is useful."],
    ["Sandis Compound", "nature", "Morning or evening", "1-2 hrs", "A popular city park and open recreation area for walks, sports, and family time."],
    ["Lajpat Park Bhagalpur", "nature", "Evening", "45-90 min", "A local green stop for relaxed walks and quick city breaks."],
    ["Manik Sarkar Ghat", "city", "Evening", "45-90 min", "A Ganga-side stop for river views and local atmosphere."],
    ["Ajgaivinath Temple", "spiritual", "Morning", "1-2 hrs", "A well-known Shiva temple at Sultanganj in Bhagalpur district."],
    ["Sujaganj Bazaar", "city", "Afternoon or evening", "1-2 hrs", "A busy local market area for shopping, street food, and city life."],
    ["Bhagalpur Silk Market", "city", "Afternoon", "1-2 hrs", "Good for exploring Bhagalpur's silk and textile shopping culture."]
  ],
  "Bihar|Munger": [
    ["Munger Fort", "heritage", "Morning", "1-2 hrs", "Historic fort area by the Ganga with old gateways and city views."],
    ["Bihar School of Yoga", "spiritual", "Morning", "1 hr", "A globally known yoga institution; check visitor access before going."],
    ["Kastaharni Ghat", "spiritual", "Evening", "45 min", "A riverside ghat for Ganga views and local atmosphere."],
    ["Chandika Sthan", "spiritual", "Morning", "1 hr", "Popular temple stop in Munger; festival days can be crowded."]
  ],
  "Bihar|Patna": [
    ["Golghar", "heritage", "Evening", "45 min", "Historic granary and quick city viewpoint near central Patna."],
    ["Patna Sahib Gurudwara", "spiritual", "Morning", "1 hr", "Major Sikh pilgrimage site connected with Guru Gobind Singh."],
    ["Bihar Museum", "city", "Afternoon", "2 hrs", "Modern museum with strong state history and culture galleries."],
    ["Sanjay Gandhi Biological Park", "nature", "Morning", "2 hrs", "Large zoo and green escape for families and nature lovers."]
  ],
  "Bihar|Gaya": [
    ["Vishnupad Temple", "spiritual", "Morning", "1 hr", "Important temple on the Falgu River, especially known for pilgrimage rituals."],
    ["Mangla Gauri Temple", "spiritual", "Morning", "45-90 min", "A revered Shakti Peeth on a hill, best visited early."],
    ["Dungeshwari Cave Temples", "heritage", "Morning", "1-2 hrs", "Cave temple area linked with Buddhist history before Bodh Gaya."],
    ["Falgu River Ghats", "spiritual", "Morning or evening", "45 min", "Good for understanding Gaya's pilgrimage atmosphere and local rituals."]
  ],
  "Bihar|Muzaffarpur": [
    ["Baba Garibnath Temple", "spiritual", "Morning", "1 hr", "A major Shiva temple and one of the busiest local pilgrimage spots."],
    ["Jubba Sahni Park", "nature", "Evening", "45-90 min", "A popular city park for family walks and relaxed evenings."],
    ["Ram Chandra Shahi Museum", "heritage", "Afternoon", "1 hr", "A compact museum stop for regional history and artefacts."],
    ["Muzaffarpur Litchi Gardens", "city", "May-Jun", "1-2 hrs", "Seasonal local experience connected with the city's famous shahi litchi."]
  ],
  "Bihar|Darbhanga": [
    ["Darbhanga Raj Fort", "heritage", "Morning", "1 hr", "Historic palace-fort area connected with the Darbhanga Raj legacy."],
    ["Shyama Mai Temple", "spiritual", "Morning", "1 hr", "A well-known temple inside the Raj campus area."],
    ["Chandradhari Museum", "heritage", "Afternoon", "1 hr", "Useful stop for sculptures, manuscripts, and local heritage."],
    ["Harahi Lake", "nature", "Evening", "45 min", "A calm city lake area for a short walk and local views."]
  ],
  "West Bengal|Murshidabad": [
    ["Hazarduari Palace", "heritage", "Morning", "2 hrs", "A grand palace museum and the main heritage anchor of Murshidabad."],
    ["Katra Mosque", "heritage", "Morning", "45-90 min", "Historic mosque complex linked with Nawabi-era Murshidabad."],
    ["Kathgola Palace", "heritage", "Afternoon", "1 hr", "A mansion garden complex with old-world architecture and photo spots."],
    ["Motijheel", "nature", "Evening", "1 hr", "A lake-side heritage zone good for slower sightseeing."]
  ],
  "West Bengal|Bishnupur": [
    ["Rasmancha", "heritage", "Morning", "1 hr", "Terracotta temple architecture and one of Bishnupur's signature monuments."],
    ["Jor Bangla Temple", "heritage", "Morning", "45 min", "Known for detailed terracotta panels and Bengal temple style."],
    ["Madan Mohan Temple", "spiritual", "Morning", "45 min", "A historic temple that adds cultural depth to the Bishnupur circuit."],
    ["Bishnupur Terracotta Market", "city", "Afternoon", "1 hr", "Good for local crafts, souvenirs, and handmade terracotta pieces."]
  ],
  "Maharashtra|Nashik": [
    ["Trimbakeshwar Temple", "spiritual", "Morning", "1-2 hrs", "Major Jyotirlinga temple near Nashik; plan around crowd and darshan timing."],
    ["Sula Vineyards", "city", "Afternoon", "2 hrs", "Popular vineyard experience with views, tastings, and food options."],
    ["Pandavleni Caves", "heritage", "Morning", "1-2 hrs", "Ancient rock-cut caves with city views after a short climb."],
    ["Ramkund", "spiritual", "Morning or evening", "45 min", "Sacred ghat area connected with Nashik's pilgrimage identity."]
  ],
  "Maharashtra|Kolhapur": [
    ["Mahalakshmi Temple Kolhapur", "spiritual", "Morning", "1 hr", "A major Shakti temple and the heart of Kolhapur's pilgrimage circuit."],
    ["New Palace Kolhapur", "heritage", "Afternoon", "1 hr", "Royal-era palace museum with architecture, collections, and gardens."],
    ["Rankala Lake", "nature", "Evening", "1 hr", "Popular lake promenade for sunset walks and local snacks."],
    ["Panhala Fort", "heritage", "Morning", "2 hrs", "Historic hill fort near Kolhapur with wide views and Maratha-era stories."]
  ],
  "Maharashtra|Ratnagiri": [
    ["Ratnadurg Fort", "heritage", "Morning", "1-2 hrs", "Sea-facing fort with coastal views and a relaxed walking route."],
    ["Ganpatipule Temple", "spiritual", "Morning", "1-2 hrs", "Beachside Ganesh temple and one of the Konkan's best-known pilgrim spots."],
    ["Thiba Palace", "heritage", "Afternoon", "1 hr", "Historic palace linked with the exile of Myanmar's King Thibaw."],
    ["Aare Ware Beach", "beach", "Evening", "1 hr", "Scenic Konkan beach stretch for a quiet coastal stop."]
  ],
  "Karnataka|Udupi": [
    ["Sri Krishna Matha", "spiritual", "Morning", "1 hr", "Famous temple complex central to Udupi's identity and food culture."],
    ["Malpe Beach", "beach", "Evening", "1-2 hrs", "Popular beach for sunset, seafood, and easy coastal walks."],
    ["St Mary's Island", "nature", "Morning", "Half day", "Known for basalt rock formations; check ferry timing before going."],
    ["Kaup Beach Lighthouse", "beach", "Evening", "1 hr", "Beach and lighthouse viewpoint with strong sunset appeal."]
  ],
  "Karnataka|Badami": [
    ["Badami Cave Temples", "heritage", "Morning", "2 hrs", "Rock-cut cave temples with Chalukyan sculpture and cliff views."],
    ["Agastya Lake", "nature", "Evening", "45 min", "A scenic lake framed by cliffs, temples, and old town lanes."],
    ["Bhutanatha Temple", "heritage", "Evening", "1 hr", "Lakeside temple group with beautiful late-day light."],
    ["Banashankari Temple", "spiritual", "Morning", "45 min", "Important local temple often combined with Badami sightseeing."]
  ],
  "Tamil Nadu|Kanchipuram": [
    ["Kamakshi Amman Temple", "spiritual", "Morning", "1 hr", "Major temple dedicated to Goddess Kamakshi and a key Kanchipuram stop."],
    ["Ekambareswarar Temple", "spiritual", "Morning", "1 hr", "Large Shiva temple known for its gopuram, corridors, and sacred mango tree."],
    ["Kailasanathar Temple", "heritage", "Morning", "45 min", "One of the city's oldest temples with Pallava-era stone architecture."],
    ["Kanchipuram Silk Market", "city", "Afternoon", "1-2 hrs", "Good for exploring the city's famous silk saree weaving and shopping culture."]
  ],
  "Tamil Nadu|Thanjavur": [
    ["Brihadeeswarar Temple", "heritage", "Morning", "2 hrs", "UNESCO-listed Chola temple famous for scale, sculpture, and architecture."],
    ["Thanjavur Maratha Palace", "heritage", "Afternoon", "1-2 hrs", "Palace complex with museum sections, art, and royal-era spaces."],
    ["Saraswathi Mahal Library", "heritage", "Afternoon", "45 min", "Historic library known for manuscripts and scholarly collections."],
    ["Punnainallur Mariamman Temple", "spiritual", "Morning", "45 min", "Popular temple close to Thanjavur city."]
  ],
  "Kerala|Kozhikode": [
    ["Kozhikode Beach", "beach", "Evening", "1 hr", "Classic sunset and snack spot central to the city's coastal life."],
    ["Mananchira Square", "city", "Evening", "45 min", "Urban garden and historic tank area for a relaxed city walk."],
    ["Mishkal Mosque", "heritage", "Morning", "45 min", "Historic wooden mosque showing Kozhikode's old trading culture."],
    ["SM Street Kozhikode", "city", "Afternoon or evening", "1-2 hrs", "Busy market street for sweets, snacks, shopping, and local energy."]
  ],
  "Kerala|Thrissur": [
    ["Vadakkunnathan Temple", "spiritual", "Morning", "1 -2 hrs", "Ancient temple at the center of Thrissur's cultural life."],
    ["Sakthan Thampuran Palace", "heritage", "Afternoon", "1 hr", "Palace museum connected with the city's royal and cultural history."],
    ["Athirappilly Falls", "nature", "Post-monsoon", "2-3 hrs", "Kerala's famous waterfall day trip, best after rains."],
    ["Thrissur Round", "city", "Evening", "45 min", "Central circular road area good for local food and city atmosphere."]
  ],
  "Gujarat|Patan": [
    ["Rani ki Vav", "heritage", "Morning", "1-2 hrs", "UNESCO stepwell with intricate carvings and impressive underground architecture."],
    ["Sahastralinga Talav", "heritage", "Morning", "45 min", "Historic water structure connected with old Patan."],
    ["Patola Heritage Museum", "heritage", "Afternoon", "1 hr", "Good for understanding Patan's double-ikat textile tradition."],
    ["Patan Old Market", "city", "Afternoon", "1 hr", "Local lanes for textiles, snacks, and old-town movement."]
  ],
  "Gujarat|Junagadh": [
    ["Uparkot Fort", "heritage", "Morning", "1-2 hrs", "Old hill fort with stepwells, gateways, and layered history."],
    ["Girnar Hill", "spiritual", "Early morning", "Half day", "Pilgrimage hill with temples and a demanding stair climb."],
    ["Mahabat Maqbara", "heritage", "Morning", "45 min", "Striking Indo-Islamic architecture and one of Junagadh's most photogenic stops."],
    ["Sakkarbaug Zoological Garden", "nature", "Morning", "1-2 hrs", "Old zoo and family-friendly green stop in the city."]
  ],
  "Rajasthan|Bundi": [
    ["Taragarh Fort Bundi", "heritage", "Morning", "1-2 hrs", "Hill fort above Bundi with old gateways and dramatic views."],
    ["Garh Palace Bundi", "heritage", "Morning", "1-2 hrs", "Palace complex known for murals, courtyards, and Rajput architecture."],
    ["Raniji ki Baori", "heritage", "Afternoon", "45 min", "Decorated stepwell and one of Bundi's signature heritage spots."],
    ["Nawal Sagar Lake", "nature", "Evening", "45 min", "Lake view around old Bundi, best in softer evening light."]
  ],
  "Rajasthan|Bikaner": [
    ["Junagarh Fort", "heritage", "Morning", "2 hrs", "Well-preserved fort-palace complex with ornate halls and museums."],
    ["Karni Mata Temple", "spiritual", "Morning", "1 hr", "Distinctive temple near Deshnoke, famous for its unusual traditions."],
    ["Rampuria Havelis", "heritage", "Morning", "45 min", "Beautiful old merchant mansions in Bikaner's heritage streets."],
    ["Kote Gate Market", "city", "Evening", "1 hr", "Busy market for snacks, textiles, crafts, and local shopping."]
  ],
  "Odisha|Cuttack": [
    ["Barabati Fort", "heritage", "Morning", "45 min", "Historic fort ruins near the stadium area."],
    ["Cuttack Chandi Temple", "spiritual", "Morning", "45 min", "Popular city temple and an important local devotional stop."],
    ["Netaji Birth Place Museum", "heritage", "Afternoon", "1 hr", "Museum dedicated to Netaji Subhas Chandra Bose."],
    ["Silver Filigree Market Cuttack", "city", "Afternoon", "1 hr", "Good for seeing Cuttack's famous tarakasi silver craft tradition."]
  ],
  "Odisha|Sambalpur": [
    ["Hirakud Dam", "nature", "Morning or evening", "1-2 hrs", "Massive dam and reservoir viewpoint near Sambalpur."],
    ["Samaleswari Temple", "spiritual", "Morning", "45 min", "Important temple dedicated to Maa Samaleswari."],
    ["Debrigarh Wildlife Sanctuary", "nature", "Winter", "Half day", "Good nature excursion near Hirakud reservoir."],
    ["Sambalpuri Handloom Market", "city", "Afternoon", "1 hr", "Explore local textiles and Sambalpuri saree shopping."]
  ],
  "Uttar Pradesh|Mathura": [
    ["Shri Krishna Janmabhoomi", "spiritual", "Morning", "1-2 hrs", "Major pilgrimage complex linked with Lord Krishna's birth tradition."],
    ["Dwarkadhish Temple Mathura", "spiritual", "Morning", "45 min", "Historic temple in the old city, lively during festivals."],
    ["Vishram Ghat", "spiritual", "Evening", "45 min", "Yamuna ghat known for aarti and old-city atmosphere."],
    ["Mathura Peda Market", "city", "Afternoon", "45 min", "Local sweets and food stop around old Mathura lanes."]
  ],
  "Uttar Pradesh|Prayagraj": [
    ["Triveni Sangam", "spiritual", "Morning", "1-2 hrs", "Sacred confluence of Ganga, Yamuna, and the mythical Saraswati."],
    ["Anand Bhavan", "heritage", "Afternoon", "1 hr", "Historic house museum linked with India's freedom movement."],
    ["Allahabad Fort", "heritage", "Morning", "45 min", "Historic fort area near the Sangam; access can be limited."],
    ["Khusro Bagh", "heritage", "Evening", "45 min", "Mughal garden-tomb complex with peaceful walking space."]
  ],
  "Uttarakhand|Haridwar": [
    ["Har Ki Pauri", "spiritual", "Evening", "1-2 hrs", "Iconic Ganga ghat known for evening aarti, lamps, chants, and pilgrimage energy."],
    ["Mansa Devi Temple", "spiritual", "Morning", "1-2 hrs", "Hill temple with ropeway access and city views."],
    ["Chandi Devi Temple", "spiritual", "Morning", "1-2 hrs", "Another major hill temple often paired with Mansa Devi."],
    ["Bara Bazar Haridwar", "city", "Afternoon", "1 hr", "Local market for prasad, religious items, snacks, and shopping."]
  ],
  "Jharkhand|Jamshedpur": [
    ["Jubilee Park", "nature", "Evening", "1-2 hrs", "Large landscaped park and one of Jamshedpur's favorite leisure spaces."],
    ["Dimna Lake", "nature", "Morning", "1-2 hrs", "Reservoir and picnic spot with hill views outside the city."],
    ["Tata Steel Zoological Park", "nature", "Morning", "1-2 hrs", "Family-friendly zoo and green area near Jubilee Park."],
    ["Bhuvaneshwari Temple Jamshedpur", "spiritual", "Morning", "45 min", "Hilltop temple with a broad view over the city."]
  ],
  "Telangana|Bhadrachalam": [
    ["Bhadrachalam Temple", "spiritual", "Morning", "1 hr", "Major Rama temple on the Godavari pilgrimage route."],
    ["Parnasala", "heritage", "Morning", "1-2 hrs", "Mythological site associated with the Ramayana tradition."],
    ["Godavari River Ghat Bhadrachalam", "spiritual", "Evening", "45 min", "Riverfront area for views, rituals, and local movement."],
    ["Abhaya Anjaneya Temple", "spiritual", "Morning", "45 min", "Popular Hanuman temple stop in the town."]
  ],
  "Assam|Jorhat": [
    ["Majuli Ferry Point", "nature", "Morning", "Half day", "Gateway for ferries toward Majuli and Brahmaputra river views."],
    ["Hoollongapar Gibbon Sanctuary", "nature", "Morning", "2-3 hrs", "Forest sanctuary known for India's only apes, best with a local guide."],
    ["Tocklai Tea Research Institute", "heritage", "Afternoon", "45 min", "Tea heritage stop connected with Assam's plantation history."],
    ["Jorhat Market", "city", "Evening", "1 hr", "Local shopping and food area for a simple town experience."]
  ],
  "Meghalaya|Jowai": [
    ["Krang Suri Falls", "nature", "Morning", "2 hrs", "Clear blue waterfall pool and one of Jaintia Hills' scenic highlights."],
    ["Nartiang Monoliths", "heritage", "Morning", "1 hr", "Historic monolith site showing local megalithic heritage."],
    ["Thadlaskein Lake", "nature", "Evening", "45 min", "Calm lake stop near Jowai for a short break."],
    ["Ialong Park", "nature", "Morning", "1 hr", "Hill-view park with quiet walking space."]
  ]
};

export const extraCityNamesByRegion: Record<string, string> = {
  "Andhra Pradesh": "Amaravati,Guntur,Kakinada,Rajahmundry,Nellore,Kurnool,Anantapur,Chittoor,Kadapa,Ongole,Eluru,Srikakulam,Vizianagaram,Machilipatnam,Nandyal,Adoni,Proddatur,Hindupur,Tadipatri,Tenali,Bhimavaram,Madanapalle,Tadepalligudem,Narasaraopet",
  "Arunachal Pradesh": "Itanagar,Naharlagun,Bomdila,Pasighat,Roing,Tezu,Along,Anini,Changlang,Khonsa,Seppa,Yingkiong,Daporijo,Namsai,Bhalukpong,Dirang,Mechuka",
  "Assam": "Dibrugarh,Silchar,Jorhat,Tezpur,Tinsukia,Nagaon,Barpeta,Dhubri,Goalpara,Karimganj,Hailakandi,Bongaigaon,North Lakhimpur,Diphu,Golaghat,Haflong,Mangaldoi,Sivasagar,Nalbari,Rangia",
  "Bihar": "Gaya,Muzaffarpur,Bhagalpur,Darbhanga,Purnia,Arrah,Begusarai,Katihar,Munger,Chapra,Hajipur,Samastipur,Motihari,Bettiah,Sasaram,Siwan,Kishanganj,Jamui,Buxar,Madhubani,Sitamarhi,Supaul,Forbesganj",
  "Chhattisgarh": "Bhilai,Bilaspur,Korba,Durg,Rajnandgaon,Ambikapur,Dhamtari,Kanker,Raigarh,Janjgir,Surajpur,Kawardha,Mahasamund,Dantewada,Kondagaon,Balod,Bemetara,Khairagarh",
  "Goa": "Vasco da Gama,Ponda,Bicholim,Canacona,Calangute,Candolim,Anjuna,Arambol,Quepem,Sanguem,Valpoi,Curchorem,Cuncolim,Sanquelim,Old Goa,Colva",
  "Gujarat": "Surat,Vadodara,Rajkot,Bhavnagar,Jamnagar,Junagadh,Gandhinagar,Anand,Nadiad,Porbandar,Somnath,Patan,Modhera,Mandvi,Palitana,Saputara,Navsari,Bharuch,Valsad,Morbi,Gondal,Dholavira",
  "Haryana": "Faridabad,Panipat,Ambala,Hisar,Karnal,Rohtak,Sonipat,Yamunanagar,Rewari,Bhiwani,Jind,Kaithal,Palwal,Narnaul,Fatehabad,Sirsa,Charkhi Dadri,Thanesar",
  "Himachal Pradesh": "Kullu,Kasol,Mandi,Chamba,Dalhousie,Kasauli,Solan,Palampur,Bir,Billing,Una,Hamirpur,Nahan,Keylong,Spiti,Kalpa,Chitkul,McLeod Ganj",
  "Jharkhand": "Jamshedpur,Dhanbad,Bokaro,Giridih,Dumka,Chaibasa,Medininagar,Latehar,Netarhat,Simdega,Gumla,Lohardaga,Pakur,Sahibganj,Godda,Jamtara,Khunti",
  "Karnataka": "Mangaluru,Hubballi,Dharwad,Belagavi,Kalaburagi,Bidar,Shivamogga,Udupi,Chikkamagaluru,Coorg,Madikeri,Badami,Aihole,Pattadakal,Bijapur,Hassan,Chitradurga,Tumakuru,Karwar,Murudeshwar,Manipal,Dandeli",
  "Kerala": "Thiruvananthapuram,Kozhikode,Thrissur,Kollam,Kottayam,Palakkad,Kannur,Kasaragod,Thekkady,Varkala,Kovalam,Bekal,Guruvayur,Nilambur,Malappuram,Pathanamthitta,Kalpetta,Idukki,Kumarakom",
  "Madhya Pradesh": "Indore,Ujjain,Jabalpur,Rewa,Sagar,Satna,Mandu,Omkareshwar,Maheshwar,Pachmarhi,Chanderi,Datia,Shivpuri,Betul,Seoni,Katni,Burhanpur,Amarkantak,Sehore,Vidisha",
  "Maharashtra": "Nashik,Nagpur,Kolhapur,Solapur,Ahmednagar,Latur,Nanded,Akola,Amravati,Jalgaon,Ratnagiri,Alibaug,Mahabaleshwar,Lonavala,Matheran,Karad,Sangli,Beed,Osmanabad,Parbhani,Wardha,Chandrapur,Gondia,Bhandara",
  "Manipur": "Thoubal,Ukhrul,Churachandpur,Senapati,Tamenglong,Jiribam,Kakching,Moreh,Bishnupur,Chandel,Noney,Kangpokpi,Tengnoupal",
  "Meghalaya": "Tura,Jowai,Nongstoin,Williamnagar,Baghmara,Mairang,Nongpoh,Mawlynnong,Mawphlang,Mawsynram,Laitlum,Mawlyngbna,Nartiang",
  "Mizoram": "Lunglei,Serchhip,Kolasib,Mamit,Saiha,Lawngtlai,Saitual,Khawzawl,Hnahthial,Thenzawl,Vairengte,Bairabi",
  "Nagaland": "Dimapur,Mokokchung,Wokha,Tuensang,Zunheboto,Phek,Peren,Kiphire,Longleng,Tseminyu,Chumoukedima,Medziphema",
  "Odisha": "Cuttack,Rourkela,Sambalpur,Balasore,Baripada,Berhampur,Jeypore,Rayagada,Dhenkanal,Angul,Keonjhar,Bhadrak,Chilika,Gopalpur,Satkosia,Hirakud,Koraput,Bargarh",
  "Punjab": "Ludhiana,Jalandhar,Bathinda,Mohali,Hoshiarpur,Gurdaspur,Kapurthala,Firozpur,Pathankot,Moga,Sangrur,Barnala,Fazilka,Rupnagar,Tarn Taran,Faridkot",
  "Rajasthan": "Ajmer,Bikaner,Kota,Bundi,Chittorgarh,Mount Abu,Alwar,Bharatpur,Ranthambore,Sawai Madhopur,Shekhawati,Mandawa,Nathdwara,Kumbhalgarh,Barmer,Banswara,Jhalawar,Tonk,Sikar",
  "Sikkim": "Namchi,Geyzing,Mangan,Ravangla,Yuksom,Aritar,Zuluk,Nathang Valley,Lachen,Singtam,Rangpo,Jorethang",
  "Tamil Nadu": "Coimbatore,Tiruchirappalli,Thanjavur,Salem,Tirunelveli,Thoothukudi,Vellore,Kanchipuram,Mahabalipuram,Chidambaram,Kodaikanal,Yercaud,Coonoor,Pollachi,Kumbakonam,Dindigul,Sivakasi,Nagapattinam,Tenkasi",
  "Telangana": "Nizamabad,Karimnagar,Khammam,Adilabad,Mahbubnagar,Nalgonda,Siddipet,Medak,Bhongir,Jagtial,Nirmal,Suryapet,Vikarabad,Ramagundam,Mancherial",
  "Tripura": "Udaipur,Dharmanager,Kailashahar,Belonia,Khowai,Ambassa,Sonamura,Teliamura,Sabroom,Melaghar,Amarpur",
  "Uttar Pradesh": "Prayagraj,Mathura,Vrindavan,Kanpur,Meerut,Noida,Ghaziabad,Gorakhpur,Jhansi,Aligarh,Bareilly,Moradabad,Saharanpur,Muzaffarnagar,Chitrakoot,Fatehpur Sikri,Etawah,Faizabad,Mirzapur,Jaunpur,Ballia,Deoria",
  "Uttarakhand": "Haridwar,Dehradun,Almora,Kausani,Ranikhet,Auli,Joshimath,Badrinath,Kedarnath,Chopta,Lansdowne,Pithoragarh,Munsiyari,Tehri,New Tehri,Rudraprayag,Uttarkashi,Haldwani,Ramnagar",
  "West Bengal": "Siliguri,Digha,Shantiniketan,Malda,Murshidabad,Bishnupur,Chandannagar,Hooghly,Kalna,Tarapith,Mayapur,Jalpaiguri,Cooch Behar,Raiganj,Asansol,Durgapur,Haldia,Lataguri,Sandakphu",
  "Andaman and Nicobar Islands": "Neil Island,Baratang,Diglipur,Mayabunder,Rangat,Little Andaman,Car Nicobar,Campbell Bay,Wandoor",
  "Chandigarh": "Manimajra,Sector 17,Sector 22,Dhanas,Maloya,Kishangarh,Khuda Lahora",
  "Dadra and Nagar Haveli and Daman and Diu": "Diu,Amli,Naroli,Khanvel,Masat,Samarvarni,Fudam,Ghoghla,Nagoa",
  "Delhi": "Old Delhi,Mehrauli,Dwarka,Rohini,Saket,Karol Bagh,Connaught Place,Chandni Chowk,Hauz Khas,Nizamuddin,Janakpuri,Pitampura,Mayur Vihar",
  "Jammu and Kashmir": "Gulmarg,Pahalgam,Sonamarg,Anantnag,Baramulla,Kupwara,Patnitop,Katra,Udhampur,Rajouri,Poonch,Doda,Kishtwar,Bhaderwah",
  "Ladakh": "Kargil,Diskit,Hunder,Alchi,Lamayuru,Pangong,Tso Moriri,Hemis,Thiksey,Drass,Zanskar,Padum",
  "Lakshadweep": "Kavaratti,Bangaram,Minicoy,Kadmat,Kalpeni,Amini,Andrott,Chetlat,Bitra,Kiltan",
  "Puducherry": "Auroville,Mahe,Yanam,Villianur,Ariyankuppam,Oulgaret,Bahour,Nettapakkam"
};

export const additionalCityNamesByRegion: Record<string, string> = {
  "Andhra Pradesh": "Anakapalle,Dharmavaram,Guntakal,Gudivada,Kavali,Markapur,Palasa,Pithapuram,Amalapuram,Mangalagiri,Yemmiganur,Rayachoti,Rajampet,Samalkot,Puttur,Parvathipuram,Bobbili,Salur,Nuzvid,Pedana",
  "Arunachal Pradesh": "Tenga,Rupa,Basar,Hayuliang,Koloriang,Tuting,Mariyang,Hawai,Palin,Jang,Deomali,Kanubari,Longding,Likabali,Doimukh",
  "Assam": "Margherita,Digboi,Duliajan,Doom Dooma,Pathsala,Hojai,Morigaon,Biswanath Chariali,Gohpur,Sonari,Nazira,Bokakhat,Dergaon,Chabua,Sapekhati,Abhayapuri,Bilasipara",
  "Bihar": "Aurangabad,Nawada,Sheikhpura,Lakhisarai,Araria,Arwal,Banka,Bhabua,Gopalganj,Khagaria,Madhepura,Saharsa,Sheohar,Vaishali,Raxaul,Barh,Dalsinghsarai,Narkatiaganj",
  "Chhattisgarh": "Mungeli,Sakti,Sarangarh,Manendragarh,Gaurella,Baikunthpur,Pathalgaon,Jashpur,Narayanpur,Sukma,Bijapur,Balrampur,Bhatapara,Arang,Tilda Newra",
  "Goa": "Morjim,Siolim,Assagao,Saligao,Nerul,Reis Magos,Benaulim,Varca,Cavelossim,Majorda,Betalbatim,Nuvem,Chicalim,Verna,Corlim",
  "Gujarat": "Mehsana,Surendranagar,Godhra,Dahod,Amreli,Botad,Veraval,Una,Deesa,Palanpur,Himatnagar,Idar,Anjar,Gandhidham,Vapi,Umbergaon,Dang,Ahwa,Lunavada",
  "Haryana": "Pehowa,Shahabad,Samalkha,Hansi,Tohana,Gohana,Nuh,Sohna,Ladwa,Ratia,Ellenabad,Kalanaur,Beri,Assandh,Pundri,Barwala",
  "Himachal Pradesh": "Sundernagar,Jogindernagar,Nurpur,Parwanoo,Paonta Sahib,Theog,Arki,Bhoranj,Reckong Peo,Manikaran,Baijnath,Jwalamukhi,Dharampur,Banikhet",
  "Jharkhand": "Chakradharpur,Adityapur,Phusro,Chirkunda,Madhupur,Musabani,Bundu,Patratu,Rajmahal,Barhi,Chandil,Ghatshila,Itkhori,Mahuadanr",
  "Karnataka": "Kolar,Chikkaballapur,Ramanagara,Mandya,Raichur,Koppal,Gadag,Haveri,Chamarajanagar,Sirsi,Sakleshpur,Kundapura,Karkala,Honnavar,Yellapur,Bhatkal,Melukote,Srirangapatna",
  "Kerala": "Kozhikode Beach,Aluva,Perumbavoor,Muvattupuzha,Thalassery,Payyanur,Kanhangad,Ottapalam,Shoranur,Changanassery,Thiruvalla,Adoor,Punalur,Attingal,Nedumangad,Vaikom,Mattancherry",
  "Madhya Pradesh": "Dewas,Ratlam,Morena,Neemuch,Mandsaur,Itarsi,Hoshangabad,Narmadapuram,Damoh,Chhindwara,Balaghat,Dhar,Jhabua,Alirajpur,Khandwa,Khargone,Bina,Guna,Ashoknagar",
  "Maharashtra": "Panvel,Kalyan,Dombivli,Thane,Vasai,Virar,Bhiwandi,Ulhasnagar,Satara City,Phaltan,Wai,Chiplun,Malvan,Sawantwadi,Kudal,Ichalkaranji,Baramati,Shirdi,Trimbak,Paithan",
  "Manipur": "Lilong,Mayang Imphal,Nambol,Yairipok,Heirok,Wangjing,Ningthoukhong,Kumbi,Kwakta,Samurou,Andro,Saikul",
  "Meghalaya": "Smit,Nongkrem,Mawlai,Cherrapunjee,Lad Rymbai,Khliehriat,Amlarem,Resubelpara,Ampati,Dalu,Ranikor,Chokpot",
  "Mizoram": "Zawlnuam,Kawrthah,Biate,North Vanlaiphai,Khawhai,East Lungdar,Tlabung,Zobawk,Sangau,Tuipang,Phullen",
  "Nagaland": "Jalukie,Meluri,Atoizu,Akuluto,Chozuba,Pfutsero,Tuensang Village,Shamator,Aboi,Naginimora,Tuli,Changtongya",
  "Odisha": "Kendrapara,Jajpur,Pattamundai,Paradeep,Talcher,Sundargarh,Jharsuguda,Bhawanipatna,Phulbani,Malkangiri,Nabarangpur,Nuapada,Sonepur,Boudh,Khordha,Pipili,Raghurajpur",
  "Punjab": "Abohar,Malerkotla,Nabha,Rajpura,Khanna,Sunam,Muktsar,Mansa,Batala,Qadian,Dinanagar,Dasuya,Phillaur,Nakodar,Sultanpur Lodhi,Zirakpur,Kharar",
  "Rajasthan": "Dausa,Beawar,Pali,Nagaur,Didwana,Hanumangarh,Ganganagar,Suratgarh,Neem Ka Thana,Kishangarh,Makrana,Phalodi,Osian,Pokhran,Jalore,Sirohi,Pratapgarh,Dungarpur",
  "Sikkim": "Soreng,Pakyong,Rhenock,Rongli,Chungthang,Dikchu,Tadong,Majitar,Legship,Hee Bermiok,Okhrey",
  "Tamil Nadu": "Erode,Tiruppur,Karur,Namakkal,Dharmapuri,Krishnagiri,Ariyalur,Perambalur,Ramanathapuram,Virudhunagar,Rajapalayam,Karaikudi,Devakottai,Mayiladuthurai,Cuddalore,Pudukkottai,Valparai",
  "Telangana": "Kamareddy,Zaheerabad,Tandur,Kodad,Gadwal,Wanaparthy,Nagarkurnool,Armoor,Bodhan,Koratla,Metpally,Bellampalli,Kothagudem,Bhadrachalam,Mulugu",
  "Tripura": "Ranirbazar,Bishalgarh,Jirania,Mohanpur,Kamalpur,Gandacherra,Panisagar,Kumarghat,Santirbazar,Boxanagar",
  "Uttar Pradesh": "Firozabad,Shahjahanpur,Rampur,Hapur,Bulandshahr,Budaun,Mainpuri,Hathras,Etah,Farrukhabad,Unnao,Barabanki,Raebareli,Sultanpur,Azamgarh,Basti,Gonda,Bahraich,Lakhimpur,Hardoi",
  "Uttarakhand": "Roorkee,Kashipur,Rudrapur,Khatima,Sitarganj,Champawat,Bageshwar,Didihat,Askot,Lohaghat,Devprayag,Karnaprayag,Gopeshwar,Pauri,Srinagar Uttarakhand",
  "West Bengal": "Bolpur,Katwa,Burdwan,Krishnanagar,Ranaghat,Kalyani,Barasat,Barrackpore,Serampore,Arambagh,Contai,Tamluk,Bankura,Purulia,Jhargram,Alipurduar,Mirik,Kurseong",
  "Andaman and Nicobar Islands": "Bambooflat,Ferrargunj,Garacharma,Prothrapur,Long Island,Hut Bay,Katchal,Kamorta,Nancowry",
  "Chandigarh": "Behlana,Burail,Mauli Jagran,Raipur Kalan,Raipur Khurd,Sarangpur,Daria",
  "Dadra and Nagar Haveli and Daman and Diu": "Vapi Border,Moti Daman,Nani Daman,Dunetha,Marwad,Kachigam,Dabhel,Magarwada",
  "Delhi": "Lajpat Nagar,Greater Kailash,Green Park,Malviya Nagar,Rajouri Garden,Laxmi Nagar,Preet Vihar,Seelampur,Okhla,Vasant Kunj,Chanakyapuri,Patel Nagar",
  "Jammu and Kashmir": "Awantipora,Bijbehara,Shopian,Pulwama,Bandipora,Ganderbal,Uri,Sopore,Reasi,Akhnoor,Ramban,Banihal,Batote",
  "Ladakh": "Saspol,Nyoma,Hanle,Chushul,Tangtse,Khalsi,Sumur,Panamik,Turtuk,Choglamsar,Shey",
  "Lakshadweep": "Suheli Par,Kadmat Island,Kalpeni Island,Minicoy Island,Kavaratti Island,Agatti Island,Amini Island",
  "Puducherry": "Lawspet,Reddiarpalayam,Muthialpet,Mudaliarpet,Kottucherry,Thirunallar,Neravy,Tirumalairayanpattinam"
};

export const moreCityNamesByRegion: Record<string, string> = {
  "Andhra Pradesh": "Sattenapalle,Chirala,Repalle,Vinukonda,Piduguralla,Gudur,Venkatagiri,Naidupet,Palakollu,Narsapur",
  "Arunachal Pradesh": "Taliha,Sagalee,Yachuli,Raga,Lemmi,Pangin,Paying,Anjaw,Chowkham,Wakro",
  "Assam": "Majuli,Sualkuchi,Hajo,Palasbari,Raha,Jamugurihat,Lakhipur,Badarpur,Sarthebari,Kokrajhar",
  "Bihar": "Jehanabad,Rosera,Teghra,Jhanjharpur,Maner,Mokama,Marhaura,Revelganj,Piro,Bikramganj",
  "Chhattisgarh": "Chirmiri,Akaltara,Pendra,Katghora,Kurud,Nagri,Antagarh,Dongargarh,Khairagarh,Simga",
  "Goa": "Mapusa Market,Aldona,Parra,Moira,Arpora,Sinquerim,Bogmalo,Utorda,Agonda,Palolem",
  "Gujarat": "Khambhat,Sidhpur,Wankaner,Limbdi,Dhrangadhra,Halvad,Jetpur,Dhoraji,Manavadar,Vadnagar",
  "Haryana": "Bilaspur Haryana,Pinjore,Ismailabad,Uchana,Nissing,Nilokheri,Ateli,Bawal,Tauru,Farrukhnagar",
  "Himachal Pradesh": "Mashobra,Narkanda,Fagu,Shoja,Jibhi,Tirthan Valley,Pragpur,Garli,Rohru,Chopal",
  "Jharkhand": "Basukinath,Parasnath,Topchanchi,Maithon,Kiriburu,Noamundi,Seraikela,Chandwa,Netarhat Town,McCluskieganj",
  "Karnataka": "Somnathpur,Belur,Halebidu,Agumbe,Tirthahalli,Kabini,Nagarhole,Devanahalli,Nandi Hills,Magadi",
  "Kerala": "Cherai,Edappal,Tirur,Kondotty,Mannarkkad,Peerumedu,Vagamon,Marayoor,Poovar,Thenmala",
  "Madhya Pradesh": "Bhojpur,Sanchi,Bhimbetka,Maihar,Chitrakoot MP,Sonagiri,Mhow,Sailana,Asirgarh,Parsili",
  "Maharashtra": "Khopoli,Igatpuri,Bhandardara,Junnar,Murud Janjira,Tarkarli,Amboli,Dapoli,Harihareshwar,Velas",
  "Manipur": "Keibul Lamjao,Loktak,Sendra,Khongjom,Moirang Bazar,Leimaram,Willong,Khoupum,Tamei,Tousem",
  "Meghalaya": "Dawki Bazar,Shnongpdeng,Nongriat,Tyrna,Laitkynsew,Pynursla,Sohra Bazar,Cherrapunji Market,Mawkdok,Nongkhnum",
  "Mizoram": "Reiek,Hmuifang,Falkawn,Sialsuk,Phawngpui,Ngengpui,Zokhawthar,Chawngte,Bungtlang,West Phaileng",
  "Nagaland": "Khonoma,Kisama,Dzukou Base,Kigwema,Jakhama,Viswema,Longwa,Khensa,Ungma,Chuchuyimlang",
  "Odisha": "Daringbadi,Chandipur,Simlipal,Deomali,Taptapani,Rambha,Barkul,Bhitarkanika,Lalitgiri,Ratnagiri Odisha",
  "Punjab": "Sirhind,Fatehgarh Sahib,Chamkaur Sahib,Morinda,Dera Baba Nanak,Kartarpur Punjab,Harike,Talwandi Sabo,Mukerian,Ropar",
  "Rajasthan": "Abhaneri,Ranakpur,Khejarla,Khimsar,Menal,Bhangarh,Sariska,Rawatbhata,Shahpura Rajasthan,Kuchaman",
  "Sikkim": "Tsomgo,Nathula,Yumthang,Zero Point Sikkim,Kabi,Lingdum,Borong,Tarey Bhir,Temi,Tinkitam",
  "Tamil Nadu": "Srirangam,Rameshwaram,Dhanushkodi,Gingee,Tarangambadi,Pichavaram,Velankanni,Thiruvannamalai,Chettinad,Palani",
  "Telangana": "Yadadri,Jogulamba Gadwal,Basar,Laknavaram,Ananthagiri Hills,Alampur,Medaram,Pocharam,Nagarjuna Sagar Telangana,Eturunagaram",
  "Tripura": "Neermahal,Sepahijala,Boxanagar,Pilak,Devtamura,Chabimura,Matabari,Sepahijala Bazar,Dumboor,Baramura",
  "Uttar Pradesh": "Sravasti,Kushinagar,Bithoor,Naimisharanya,Deogarh UP,Sonbhadra,Shukratal,Garhmukteshwar,Soron, Bateshwar UP",
  "Uttarakhand": "Kainchi Dham,Jageshwar,Mukteshwar,Bhimtal,Sattal,Naukuchiatal,Kanatal,Dhanaulti,Chakrata,Mana",
  "West Bengal": "Mukutmanipur,Ayodhya Hills,Susunia,Garpanchkot,Taki,Henry Island,Bakkhali,Garhbeta,Dooars,Gorumara",
  "Andaman and Nicobar Islands": "Ross Island,North Bay Island,Chidiya Tapu,Limestone Caves,Mud Volcano,Parrot Island,Rutland Island,Shaheed Dweep,Swaraj Dweep",
  "Chandigarh": "Sector 26,Sector 35,Sector 43,Elante Area,IT Park Chandigarh,Khuda Ali Sher,Kajheri",
  "Dadra and Nagar Haveli and Daman and Diu": "Devka,Nagoa Beach,Ghoghla Beach,Diu Fort,Gangeshwar,Fudam Bird Sanctuary,Vanganga Lake",
  "Delhi": "Sunder Nursery,Lodhi Colony,Purana Qila,Champa Gali,Yamuna Ghat,Majnu ka Tilla,Dilli Haat",
  "Jammu and Kashmir": "Yusmarg,Doodhpathri,Aharbal,Mansar,Surinsar,Sanasar,Verinag,Kokernag,Peer Ki Gali,Tulail",
  "Ladakh": "Basgo,Stok,Uleytokpo,Takmachik,Merak,Spangmik,Chang La,Nyoma Market,Skurbuchan,Tingmosgang",
  "Lakshadweep": "Bangaram Island,Thinnakara,Parali Island,Cheriyam Island,Pitti Island,Perumal Par,Kiltan Island,Chetlat Island",
  "Puducherry": "Serenity Beach,Paradise Beach,Chunnambar,Arikamedu,Ousteri Lake,Chinna Veerampattinam,Manapet"
};

export function regionsType(region: string): string {
  const uts = [
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry"
  ];
  return uts.includes(region) ? "Union Territory" : "State";
}

// Pre-processed data sets to export:
export const destinations: Place[] = citySeeds.flatMap(([state, city, type, aliases, spots]) => {
  const parsedAliases = aliases.split(",").map((item) => item.trim());
  return spots.map(([name, category, bestTime, duration, tip]) => ({
    name,
    city,
    state,
    type,
    category,
    bestTime,
    duration,
    tip,
    wikiTitle: verifiedWikiTitles[name] || "",
    mediaSearch: `${name} ${city} ${state} India`,
    info: `${name} is ${categoryCopy[category]} in ${city}, ${state}.`,
    aliases: parsedAliases
  }));
});

export const getCityDirectory = (): Destination[] => {
  const curatedKeys = new Set(citySeeds.map(([state, city]) => `${state}|${city}`.toLowerCase()));
  const directoryCityKeys = new Set(curatedKeys);

  const curatedList: Destination[] = citySeeds.map(([state, city, type, aliases]) => ({
    state,
    city,
    type,
    aliases: aliases.split(",").map((item) => item.trim()),
    curated: true
  }));

  const extraList: Destination[] = [extraCityNamesByRegion, additionalCityNamesByRegion, moreCityNamesByRegion].flatMap((source) =>
    Object.entries(source).flatMap(([state, cityNames]) =>
      cityNames
        .split(",")
        .map((city) => city.trim())
        .filter(Boolean)
        .filter((city) => {
          const key = `${state}|${city}`.toLowerCase();
          if (directoryCityKeys.has(key)) return false;
          directoryCityKeys.add(key);
          return true;
        })
        .map((city) => ({
          state,
          city,
          type: regionsType(state),
          aliases: [],
          curated: false
        }))
    )
  );

  return [...curatedList, ...extraList].sort((a, b) => a.state.localeCompare(b.state) || a.city.localeCompare(b.city));
};

export const cityDirectory = getCityDirectory();

export const regionsList = [...new Set(cityDirectory.map((dest) => dest.state))].sort();

export const districtOverridePlaces = (destination: Destination | { city: string; state: string }): Place[] => {
  const key = `${destination.state}|${destination.city}`;
  return (districtAttractionOverrides[key] || []).map(([name, category, bestTime, duration, tip]) => ({
    name,
    city: destination.city,
    state: destination.state,
    type: "District attraction",
    category,
    bestTime,
    duration,
    tip,
    wikiTitle: verifiedWikiTitles[name] || name,
    mediaSearch: `${name} ${destination.city} ${destination.state} India`,
    info: `${name} is a tourist or attraction place connected with ${destination.city} district.`,
    aliases: []
  }));
};

export const allPlaces: Place[] = (() => {
  const seedList = destinations;
  const overridesList = cityDirectory.flatMap((destination) =>
    districtOverridePlaces(destination).map((place) => ({
      ...place,
      aliases: destination.aliases || []
    }))
  );

  const seen = new Set<string>();
  return [...seedList, ...overridesList].filter((place) => {
    const normName = place.name.trim().toLowerCase()
      .replace(/\([^)]*\)/g, "")
      .replace(/\bin\s+[a-z\s]+$/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
    const key = [normName, place.city.toLowerCase(), place.state.toLowerCase()].join("|");
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
})();

export const placeDetailOverrides: Record<string, string> = {
  "taj mahal": "A white marble Mughal mausoleum and India's most famous monument, known for symmetry, gardens, calligraphy, and sunrise views.",
  "golden temple": "The holiest Sikh gurdwara, loved for its gold-clad sanctum, sarovar reflections, langar, and peaceful devotional atmosphere.",
  "amber fort": "A hill fort-palace above Jaipur with courtyards, gates, mirror work, and sweeping Aravalli views.",
  "gateway of india": "Mumbai's iconic waterfront arch beside the harbour, best paired with Colaba walks and Elephanta ferry plans.",
  "hawa mahal": "Jaipur's honeycomb-style palace facade, built for royal processions and best photographed from the street opposite.",
  "charminar": "Hyderabad's landmark monument at the center of the old city, surrounded by bazaars, food lanes, pearls, and heritage streets.",
  "mysore palace": "A grand royal palace with ornate halls, paintings, courtyards, and famous evening illumination.",
  "dal lake": "Srinagar's signature lake experience with shikaras, houseboats, floating gardens, and mountain-backed water views.",
  "tawang monastery": "One of India's largest monasteries, known for mountain views, Buddhist art, prayer halls, and a calm high-altitude setting.",
  "marina beach": "A long Chennai beachfront for sunrise walks, local snacks, memorials, and everyday city life by the sea.",
  "vikramshila setu": "A long bridge over the Ganga that gives open river views, skyline photos, and an easy evening drive experience in Bhagalpur.",
  "budhanath temple": "A well-known Shiva temple in Bhagalpur, visited for worship, local rituals, and the old-city pilgrimage atmosphere.",
  "kuppaghat": "A peaceful spiritual campus linked with Santmat tradition, suitable for quiet time and reflective visits.",
  "champapuri": "An important Jain pilgrimage area near Bhagalpur, known for temples and religious heritage.",
  "bateshwar sthan": "A riverside religious and heritage spot visited for temple worship and Ganga-side atmosphere.",
  "vikramshila gangetic dolphin sanctuary": "A protected Ganga river stretch connected with Gangetic dolphin habitat and river ecology.",
  "sandis compound": "A popular Bhagalpur recreation ground and park area for walking, sports, open space, and evening family time.",
  "sujaganj bazaar": "A busy Bhagalpur market area for shopping, street food, textiles, and local city energy.",
  "bhagalpur silk market": "A local shopping experience focused on Bhagalpur's silk and textile identity.",
  "vishnupad temple": "A sacred Gaya temple on the Falgu River, closely connected with pilgrimage rituals and ancestral offerings.",
  "hazarduari palace": "A grand Murshidabad palace museum with Nawabi-era rooms, collections, architecture, and riverside heritage.",
  "rani ki vav": "A UNESCO-listed stepwell in Patan, famous for underground architecture, sculpture panels, and geometric beauty.",
  "brihadeeswarar temple": "A monumental Chola-era temple in Thanjavur, known for its huge vimana, stonework, and UNESCO heritage status.",
  "badami cave temples": "Rock-cut Chalukyan cave temples with sculpted halls, cliff views, and a strong early medieval heritage feel.",
  "trimbakeshwar temple": "A major Jyotirlinga temple near Nashik, important for Shiva worship and pilgrimage planning.",
  "har ki pauri": "Haridwar's most famous Ganga ghat, known for evening aarti, lamps, chants, and pilgrimage crowds.",
  "triveni sangam": "The sacred confluence at Prayagraj, visited for boat rides, rituals, and the spiritual meeting of rivers."
};

const placeTypeDetails: Array<[RegExp, string]> = [
  [/temple|mandir|matha|gurdwara|gurudwara|dargah|mosque|masjid|church|monastery|ashram|dham|peeth/i, "It is mainly visited for worship, rituals, architecture, and the local spiritual atmosphere."],
  [/fort|palace|mahal|garh|qila|citadel|haveli/i, "It is good for history, architecture, old royal spaces, viewpoints, and photography."],
  [/museum|memorial|library|birth place/i, "It is useful for understanding local history, culture, collections, and stories behind the region."],
  [/lake|talav|sarovar|river|ghat|sangam|backwater|lagoon|dam|reservoir/i, "It is best for water views, evening walks, boating possibilities, rituals, and slower sightseeing."],
  [/falls|waterfall|cascade/i, "It is a nature stop for waterfall views, post-monsoon scenery, photos, and short outdoor time."],
  [/beach|coast|cove|island|dunes/i, "It is best for sea views, sunsets, walks, relaxed food stops, and open coastal scenery."],
  [/park|garden|sanctuary|national park|zoo|wildlife|forest|hill|peak|valley|point|viewpoint/i, "It works well for greenery, views, wildlife interest, walking, and a relaxed break from the city."],
  [/bazaar|bazar|market|street|marg|chowk/i, "It is useful for local shopping, snacks, street life, textiles, crafts, and everyday city culture."],
  [/cave|stupa|ruins|monolith|stepwell|vav|caves/i, "It is good for heritage walks, old stonework, archaeology, stories, and photo-worthy details."]
];

export function buildPlaceDetail(place: Place): string {
  const normName = place.name.trim().toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .replace(/\bin\s+[a-z\s]+$/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

  if (placeDetailOverrides[normName]) return placeDetailOverrides[normName];

  const categoryLine = categoryCopy[place.category] || categoryCopy.city;
  const matchedType = placeTypeDetails.find(([pattern]) => pattern.test(place.name))?.[1];
  const base = matchedType || `${place.name} is ${categoryLine} in ${place.city}, ${place.state}.`;
  const tip = place.tip && !/check current timings/i.test(place.tip) ? ` ${place.tip}` : "";
  return `${base}${tip}`;
}
