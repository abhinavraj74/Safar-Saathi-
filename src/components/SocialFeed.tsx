import React, { useState, useEffect } from "react";
import { MessageSquare, Heart, Image, Share2, Tag, Check, Award, Compass, Send } from "lucide-react";

interface Post {
  id: string;
  authorName: string;
  authorAvatar: string;
  locationTag: string;
  title: string;
  body: string;
  photoUrl: string;
  likes: number;
  commentsCount: number;
  isCurated?: boolean;
}

interface SocialFeedProps {
  language?: "en" | "hi";
}

export default function SocialFeed({ language = "en" }: SocialFeedProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newLocTag, setNewLocTag] = useState("Varanasi, India");
  const [selectedPhoto, setSelectedPhoto] = useState("https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=600&q=80");
  const [isCopied, setIsCopied] = useState(false);
  const [likedPostIds, setLikedPostIds] = useState<Set<string>>(new Set());

  // Curated travel photos for simple picker
  const presetPhotos = [
    { label: language === "hi" ? "वाराणसी घाट" : "Varanasi Ghats", url: "https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=600&q=80" },
    { label: language === "hi" ? "जयपुर किला" : "Jaipur Fort", url: "https://images.unsplash.com/photo-1477587458883-47135dfdb56f?auto=format&fit=crop&w=600&q=80" },
    { label: language === "hi" ? "पेरिस सीन" : "Paris Seine", url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80" },
    { label: language === "hi" ? "टोक्यो नियॉन" : "Tokyo Neon", url: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&q=80" },
    { label: language === "hi" ? "रोम कोलोसियम" : "Rome Colosseum", url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80" }
  ];

  // Seed data
  const seedingPosts: Post[] = [
    {
      id: "cur-3",
      authorName: language === "hi" ? "प्रियंका शर्मा" : "Priyanka Sharma",
      authorAvatar: "💃",
      locationTag: language === "hi" ? "वाराणसी, भारत" : "Varanasi, India",
      title: language === "hi" ? "पवित्र गंगा पर अद्भुत सूर्योदय नौका विहार" : "Sunrise Boat Ride over holy Ganga",
      body: language === "hi"
        ? "वाराणसी में सुबह 5:00 बजे सोकर उठी। अस्सी घाट पर सुबह के शांत कोहरे के बीच बहते सैकड़ों दीयों का अलौकिक दृश्य हमेशा मेरी आत्मा को प्रफुल्लित रखेगा। वहां अद्भुत स्थानीय कारीगरों से मिलकर कई कलाकृतियां खरीदीं। सफर साथी ने हमारे इस दिव्य अनुभव को अत्यंत सुगम बनाया!"
        : "Woke up at 5:00 AM in Varanasi. The morning fog lifting over Assi Ghat as hundreds of lamps floated downstream is a view that will stay in my soul forever. Met amazing local artisans too. Safar Saathi guided my trip perfectly!",
      photoUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=600&q=80",
      likes: 89,
      commentsCount: 23,
      isCurated: true
    },
    {
      id: "cur-jaipur",
      authorName: language === "hi" ? "अमित पटवर्धन" : "Amit Patwardhan",
      authorAvatar: "🕌",
      locationTag: language === "hi" ? "जयपुर, भारत" : "Jaipur, India",
      title: language === "hi" ? "आमेर किला, जयपुर में मनमोहक सूर्यास्त" : "Majestic Sunset at Amber Fort, Jaipur",
      body: language === "hi"
        ? "अभी-अभी आमेर किले में शाम के लाइट एंड साउंड शो का दिव्य अनुभव लिया। माओटा झील के पार महल को सुनहरे मुकुट की तरह जगमगाते देखना अकल्पनीय था। यदि आप जयपुर घूमने आ रहे हैं, तो हवा महल और शाही वेधशाला के पीछे का गौरवशाली इतिहास समझने के लिए सफर साथी के प्रमाणित गाइड का उपयोग करें!"
        : "Just experienced the evening sound and light show at Amber Fort. Seeing the palace complex light up like a golden crown against the Maota Lake was awe-inspiring. If you explore Jaipur, hire a certified local guide from Safar Saathi to explain the amazing history behind the Hawa Mahal and the royal observatory!",
      photoUrl: "https://images.unsplash.com/photo-1477587458883-47135dfdb56f?auto=format&fit=crop&w=600&q=80",
      likes: 112,
      commentsCount: 29,
      isCurated: true
    },
    {
      id: "cur-2",
      authorName: "Akihiro Sato",
      authorAvatar: "🌸",
      locationTag: language === "hi" ? "टोक्यो, जापान" : "Tokyo, Japan",
      title: language === "hi" ? "रात 10 बजे असाकुसा में विहंगम सेंसो-जी मंदिर" : "Sensō-ji Temple in Asakusa at 10 PM",
      body: language === "hi"
        ? "यदि आप बिना सेल्फी स्टिक और अनावश्यक भीड़ के टोक्यो की प्राचीन आध्यात्मिक शक्ति को महसूस करना चाहते हैं, तो रात 9 या 10 बजे के बाद असाकुसा दर्शन करें। मुख्य प्रवेश द्वार पर टंगी विशाल लालटेनें मन में असीम शांति भर देती हैं।"
        : "If you want to feel the true spiritual energy of Tokyo without the sea of selfie sticks, visit Asakusa after 9 or 10 PM. The main gates stay lit with giant lanterns and the silence is absolutely haunting. Perfect photo spots too!",
      photoUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&q=80",
      likes: 56,
      commentsCount: 14,
      isCurated: true
    },
    {
      id: "cur-1",
      authorName: "Carlos Menendez",
      authorAvatar: "👨‍💻",
      locationTag: language === "hi" ? "पेरिस, फ्रांस" : "Paris, France",
      title: language === "hi" ? "बजट अनुकूल पेरिस यात्रा बिल्कुल संभव है!" : "Paris on a Budget is completely Possible!",
      body: language === "hi"
        ? "सीन नदी के सुरम्य किनारों पर टहलते हुए 4 अद्भुत दिन बिताए। महंगी टैक्सी को भूल जाइए, मेट्रो सेवा आपको मात्र कुछ रुपयों में पूरा शहर घुमा सकती है। लक्ज़मबर्ग गार्डन के घास पर पिकनिक मनाने का आनंद ही निराला है।"
        : "Just spent 4 days walking along the Seine. Skip the pricey taxis - the Metro gets you everywhere for pennies. Pro-tip: Buy a baguette, buy some brie at a local Monoprix, and picnic directly on the lawns of Luxembourg Gardens. Best dinner you can have!",
      photoUrl: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=600&q=80",
      likes: 42,
      commentsCount: 9,
      isCurated: true
    }
  ];

  useEffect(() => {
    // Clear old state force reload of prioritized seed posts for India
    localStorage.removeItem("safar_social_posts");
    setPosts(seedingPosts);
  }, [language]);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newBody.trim()) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      authorName: "Me (Safar Explorer)",
      authorAvatar: "🧭",
      locationTag: newLocTag,
      title: newTitle,
      body: newBody,
      photoUrl: selectedPhoto,
      likes: 1,
      commentsCount: 0
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem("safar_social_posts", JSON.stringify(updated));

    // Reset fields
    setNewTitle("");
    setNewBody("");
    setNewLocTag("Varanasi, India");
  };

  const handleLike = (id: string) => {
    const nextLikes = new Set(likedPostIds);
    let likeDiff = 1;
    if (nextLikes.has(id)) {
      nextLikes.delete(id);
      likeDiff = -1;
    } else {
      nextLikes.add(id);
    }
    setLikedPostIds(nextLikes);

    const updated = posts.map((p) => {
      if (p.id === id) {
        return { ...p, likes: p.likes + likeDiff };
      }
      return p;
    });
    setPosts(updated);
    localStorage.setItem("safar_social_posts", JSON.stringify(updated));
  };

  const handleShareFavList = () => {
    // Collect simulated deep-link copy
    const targetLink = `${window.location.origin}/shared?wishlist=${encodeURIComponent("Tokyo,Paris,Varanasi")}`;
    navigator.clipboard.writeText(targetLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Feed Stream - Left */}
      <div className="lg:col-span-8 space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-brand-surface border border-brand-forest/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Header detail */}
            <div className="p-4 flex items-center justify-between border-b border-brand-ink/5 bg-[#faf9f5]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-brand-forest/10 flex items-center justify-center text-lg border border-brand-forest/15">
                  {post.authorAvatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-ink">{post.authorName}</h4>
                  <div className="flex items-center gap-1 text-[10px] text-brand-muted">
                    <Tag className="w-3 h-3 text-[#e56b55]" />
                    <span className="font-semibold">{post.locationTag}</span>
                  </div>
                </div>
              </div>
              {post.isCurated && (
                <span className="inline-flex items-center gap-1 text-[9px] bg-brand-forest/10 text-brand-forest px-2.5 py-1 rounded-full font-bold">
                  <Award className="w-3 h-3" />
                  Gold Guide
                </span>
              )}
            </div>

            {/* Photo frame */}
            {post.photoUrl && (
              <div className="h-56 w-full relative overflow-hidden bg-brand-forest/5 flex items-center justify-center">
                <img
                  src={post.photoUrl}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Written block */}
            <div className="p-5 space-y-2">
              <h5 className="font-extrabold text-sm md:text-base text-brand-ink leading-snug">
                {post.title}
              </h5>
              <p className="text-xs md:text-sm text-brand-muted leading-relaxed whitespace-pre-line">
                {post.body}
              </p>
            </div>

            {/* Interaction indicators */}
            <div className="p-4 border-t border-brand-ink/5 bg-[#fcfbfa] flex items-center justify-between text-xs font-semibold">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                  likedPostIds.has(post.id) ? "text-[#e56b55]" : "text-brand-muted hover:text-brand-coral"
                }`}
              >
                <Heart className={`w-4 h-4 ${likedPostIds.has(post.id) ? "fill-[#e56b55]" : ""}`} />
                <span>{post.likes} {language === "hi" ? "पसंद" : "Likes"}</span>
              </button>

              <div className="text-brand-muted hover:text-brand-forest flex items-center gap-1.5 cursor-pointer">
                <MessageSquare className="w-4 h-4" />
                <span>{post.commentsCount} {language === "hi" ? "टिप्पणियाँ" : "Comments"}</span>
              </div>

              <button
                onClick={handleShareFavList}
                className="text-brand-muted hover:text-brand-forest flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>{language === "hi" ? "शेयर कोड" : "Share Code"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Editor & Side Hub - Right */}
      <div className="lg:col-span-4 space-y-6">
        {/* CREATE POST PAD */}
        <div className="bg-brand-surface border border-brand-forest/10 p-5 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-brand-ink/5 pb-3">
            <Compass className="w-4.5 h-4.5 text-brand-forest animate-spin-slow" />
            <h4 className="font-extrabold text-sm text-brand-ink">
              {language === "hi" ? "यात्रा रिपोर्ट प्रकाशित करें" : "Publish Trip Report"}
            </h4>
          </div>

          <form onSubmit={handleCreatePost} className="space-y-3.5">
            <div>
              <label className="text-[10px] uppercase font-bold text-brand-muted block mb-1">
                {language === "hi" ? "पोस्ट का शीर्षक" : "Post Title"}
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder={language === "hi" ? "अपनी अंतर्दृष्टि को एक शीर्षक दें..." : "Give your insight a title..."}
                required
                className="w-full bg-[#fcfaf5] text-xs font-semibold p-2.5 rounded-lg border border-brand-forest/10 focus:outline-none focus:border-brand-forest"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-brand-muted block mb-1">
                {language === "hi" ? "आपने कहाँ की यात्रा की?" : "Where did you visit?"}
              </label>
              <input
                type="text"
                value={newLocTag}
                onChange={(e) => setNewLocTag(e.target.value)}
                placeholder={language === "hi" ? "उदा. वाराणसी, भारत या कोच्चि, केरल" : "e.g. Kyoto, Japan or Kochi, Kerala"}
                required
                className="w-full bg-[#fcfaf5] text-xs font-semibold p-2.5 rounded-lg border border-[#749683]/10 focus:outline-none focus:border-brand-forest border-brand-forest/10"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-brand-muted block mb-1">
                {language === "hi" ? "अपने अनुभव का वर्णन करें" : "Describe your Experience"}
              </label>
              <textarea
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                placeholder={language === "hi" ? "यात्रा हैक्स, स्वादिष्ट भोजन सिफारिशें, परिवहन विवरण..." : "Travel hacks, food recommendations, transportation details..."}
                rows={4}
                required
                className="w-full bg-[#fcfaf5] text-xs font-semibold p-2.5 rounded-lg border border-brand-forest/10 focus:outline-none focus:border-brand-forest"
              />
            </div>

            {/* Preset Photo Grid */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-brand-muted block">
                {language === "hi" ? "क्यूरेटर फोटो चुनें" : "Select Curator Photo"}
              </label>
              <div className="flex flex-wrap gap-1">
                {presetPhotos.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPhoto(preset.url)}
                    className={`text-[10px] px-2.5 py-1.5 rounded-md font-semibold cursor-pointer border ${
                      selectedPhoto === preset.url
                        ? "bg-brand-forest text-white border-brand-forest"
                        : "bg-white text-brand-muted border-brand-forest/10 hover:bg-brand-sun/10"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#df6b57] hover:bg-[#c95b48] text-white text-xs font-extrabold w-full py-2.5 rounded-lg cursor-pointer transition-colors flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              {language === "hi" ? "लाउंज में प्रकाशित करें" : "Publish to Lounge"}
            </button>
          </form>
        </div>

        {/* SOCIAL SHARE WISHLIST WIDGET */}
        <div className="bg-gradient-to-br from-[#122822] to-brand-forest p-5 rounded-2xl text-white space-y-4 shadow-sm">
          <div>
            <h4 className="font-extrabold text-sm text-brand-sun">
              {language === "hi" ? "पसंदीदा सूची साझा करें" : "Share Favorites List"}
            </h4>
            <p className="text-[11px] text-white/80 mt-1 leading-relaxed">
              {language === "hi" 
                ? "अपने सपनों के गंतव्यों की सूची सीधे अपने साथ यात्रा करने वाले साथी यात्रियों के साथ साझा करें या सहेजी गई सूची सिंक करें!"
                : "Showcase your dream destinations list directly with your companion travelers or sync with your friends!"}
            </p>
          </div>

          <button
            onClick={handleShareFavList}
            className="w-full bg-white text-brand-forest hover:bg-brand-sun/10 hover:text-brand-forest text-xs font-extrabold py-2.5 px-4 rounded-lg cursor-pointer transition-all flex items-center justify-center gap-2 shadow-md"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-[#e56b55]" />
                {language === "hi" ? "लिंक सफलतापूर्वक कॉपी हो गया!" : "Copied Link Successfully!"}
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                {language === "hi" ? "साझा एक्सप्लोरर लिंक कॉपी करें" : "Copy Shared Explorer Link"}
              </>
            )}
          </button>
          <small className="text-[9px] text-white/50 block text-center italic">
            {language === "hi" 
              ? "आपकी सहेजी गई मदों के आधार पर एक सिंक किया गया डीप-लिंक तैयार करता है।" 
              : "Generates a synced deep-link pairing based on your saved items."}
          </small>
        </div>
      </div>
    </div>
  );
}
