import React, { useEffect, useState, useRef } from "react";
import { 
  MapPin, 
  Droplet, 
  Sun, 
  Layers, 
  Footprints, 
  Backpack, 
  Clock,
  Calendar,
  ExternalLink,
  ChevronRight,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";

const itineraryData = {
  "tripName": "Joshua Tree",
  "dates": { "start": "2026-05-09", "end": "2026-05-10" },
  "days": [
    {
      "date": "2026-05-09",
      "title": "Arrival and Indian Cove Chill Day",
      "segments": [
        { "id": "d1-drive", "start": "11:30", "end": "14:30", "title": "Drive from Torrance to Indian Cove", "description": "Relaxed drive from Torrance, CA to Indian Cove Campground near Twentynine Palms. Optionally stop once for lunch or coffee.", "mapSearch": "Torrance, CA to Indian Cove Campground, Indian Cove Rd, Twentynine Palms, CA", "links": ["https://www.recreation.gov/camping/campgrounds/232472", "https://www.nps.gov/jotr/planyourvisit/maps.htm"] },
        { "id": "d1-ranger", "start": "14:30", "end": "15:00", "title": "Ranger station & water fill", "description": "Stop at the Indian Cove ranger station to confirm details, pick up a paper map, and fill all water containers. No water available in the campground loops.", "mapSearch": "Indian Cove Ranger Station Joshua Tree", "links": ["https://www.recreation.gov/camping/campgrounds/232472"] },
        { "id": "d1-camp-setup", "start": "15:00", "end": "16:00", "title": "Set up campsite (Site 36)", "description": "Drive into Indian Cove Campground, find campsite 36, pitch tents, set up chairs, and take a hydration and relaxation break.", "mapSearch": "Indian Cove Campground Joshua Tree", "links": ["https://www.nps.gov/jotr/planyourvisit/maps.htm"] },
        { "id": "d1-nature-trail", "start": "16:00", "end": "17:00", "title": "Indian Cove Nature Trail", "description": "Short, easy 0.5-mile nature trail loop starting near the campground with interpretive signs about desert plants, geology, and ecology. Perfect for all ages and fitness levels.", "mapSearch": "Indian Cove Nature Trail Joshua Tree", "links": ["https://www.hikespeak.com/trails/indian-cove-in-joshua-tree/"] },
        { "id": "d1-golden-hour", "start": "17:00", "end": "19:00", "title": "Free time among the rocks", "description": "Relax at camp, wander among nearby boulders for photos, and soak in the golden-hour light painting the towering granite walls orange and amber.", "mapSearch": "Indian Cove Campground Joshua Tree", "links": [] },
        { "id": "d1-dinner", "start": "19:00", "end": "20:00", "title": "Camp dinner", "description": "Simple dinner at the campsite so the evening stays low-stress and everyone can decompress from the drive.", "mapSearch": "", "links": [] },
        { "id": "d1-stars", "start": "20:00", "end": "22:00", "title": "Stargazing in the cove", "description": "Enjoy dark skies and starry views framed by dramatic rock formations right from near your campsite. Indian Cove is renowned for some of the best accessible stargazing in Southern California.", "mapSearch": "Indian Cove Campground Joshua Tree", "links": [] }
      ]
    },
    {
      "date": "2026-05-10",
      "title": "Iconic Rock Hikes, Keys View & Drive Home",
      "segments": [
        { "id": "d2-breakfast-pack", "start": "07:00", "end": "08:30", "title": "Breakfast and pack up camp", "description": "Unhurried breakfast and breakdown of camp before heading into the main part of the park.", "mapSearch": "", "links": [] },
        { "id": "d2-drive-arch", "start": "08:30", "end": "09:15", "title": "Drive to Arch Rock / Heart Rock trailhead", "description": "Leave Indian Cove, enter the park via the North Entrance, and drive along Pinto Basin Road to the Twin Tanks/Arch Rock trailhead parking lot.", "mapSearch": "Twin Tanks Arch Rock Trailhead, Pinto Basin Road, Joshua Tree National Park", "links": ["https://livethatadventure.com/how-to-find-heart-rock-in-joshua-tree-national-park/"] },
        { "id": "d2-arch-heart", "start": "09:15", "end": "10:45", "title": "Hike Arch Rock and Heart Rock", "description": "Easy loop plus spur trail through desert rock formations to Arch Rock and Heart Rock. Plan 45–90 minutes at a gentle pace with photo stops.", "mapSearch": "Arch Rock Trail Joshua Tree; Heart Rock Joshua Tree", "links": ["https://livethatadventure.com/how-to-find-heart-rock-in-joshua-tree-national-park/"] },
        { "id": "d2-drive-skull", "start": "10:45", "end": "11:15", "title": "Drive to Skull Rock", "description": "Return to Park Boulevard and continue to the Skull Rock roadside pullouts near Jumbo Rocks Campground.", "mapSearch": "Skull Rock, Joshua Tree National Park", "links": [] },
        { "id": "d2-skull-stop", "start": "11:15", "end": "12:00", "title": "Skull Rock photo stop", "description": "Short walk from the car to Skull Rock for photos. Optionally begin the longer Skull Rock loop trail if everyone feels energetic.", "mapSearch": "Skull Rock Trail Joshua Tree", "links": ["https://utahsadventurefamily.com/skull-rock-trail-joshua-tree/"] },
        { "id": "d2-lunch", "start": "12:00", "end": "13:30", "title": "Lunch (picnic or in town)", "description": "Picnic at a nearby pullout/picnic area or exit via the West Entrance for a sit-down lunch in Joshua Tree or Yucca Valley.", "mapSearch": "Restaurants near Joshua Tree, CA", "links": [] },
        { "id": "d2-hidden-valley", "start": "13:30", "end": "14:15", "title": "Hidden Valley Nature Trail", "description": "Short, iconic 1-mile loop through a rock-enclosed valley with Joshua trees and boulders. Great final walk for everyone.", "mapSearch": "Hidden Valley Nature Trail Parking, Joshua Tree National Park", "links": ["https://www.nps.gov/thingstodo/hike-hidden-valley-trail.htm"] },
        { "id": "d2-drive-keys-view", "start": "14:15", "end": "14:35", "title": "Drive to Keys View", "description": "Drive up fully paved Keys View Road from Park Boulevard (about 5.5 miles) to the Keys View parking area on the ridge above Coachella Valley.", "mapSearch": "Keys View, Joshua Tree National Park", "links": ["https://www.nps.gov/jotr/planyourvisit/keysview.htm"] },
        { "id": "d2-keys-view-stop", "start": "14:35", "end": "15:05", "title": "Keys View panorama stop", "description": "Very short, paved walk from the parking lot to a high viewpoint with sweeping views over Coachella Valley, Salton Sea, San Andreas Fault, and distant mountains. Ideal low-effort finale for the trip.", "mapSearch": "Keys View, Joshua Tree National Park", "links": ["https://www.nps.gov/jotr/planyourvisit/keysview.htm"] },
        { "id": "d2-exit-drive", "start": "15:05", "end": "18:15", "title": "Drive back to Torrance", "description": "Descend from Keys View to Park Boulevard, exit the park, and drive home to Torrance, CA, with flexibility for a snack or coffee stop on the way.", "mapSearch": "Keys View, Joshua Tree National Park to Torrance, CA", "links": ["https://www.nps.gov/jotr/planyourvisit/maps.htm"] }
      ]
    }
  ]
};

const packingCategories = [
  {
    id: "water",
    title: "Water",
    icon: Droplet,
    items: [
      "Bring 1 gallon (4L) per person per day minimum.",
      "Use hard-sided jugs for camp, a hydration pack or 2+ bottles for hikes.",
      "No potable water at Indian Cove campground — fill everything at the ranger station before entering."
    ]
  },
  {
    id: "sun",
    title: "Sun Protection",
    icon: Sun,
    items: [
      "SPF 50+ sunscreen (reapply every 90 min).",
      "Wide-brim hat mandatory.",
      "UV-blocking sunglasses.",
      "Sun-protective shirt or lightweight long sleeves for afternoon hiking.",
      "Lip balm with SPF."
    ]
  },
  {
    id: "layers",
    title: "Layers",
    icon: Layers,
    items: [
      "Desert nights in May can drop to 45–55°F even when days hit 90°F.",
      "Pack a warm fleece or puffy jacket, long pants, warm socks for stargazing.",
      "A light windbreaker doubles as dust protection."
    ]
  },
  {
    id: "footwear",
    title: "Footwear",
    icon: Footprints,
    items: [
      "Closed-toe trail shoes or hiking boots for rocky terrain — do not wear sandals on trails.",
      "Camp sandals or flip-flops for around the campsite.",
      "Moisture-wicking socks."
    ]
  },
  {
    id: "extras",
    title: "Extras",
    icon: Backpack,
    items: [
      "Headlamp with fresh batteries (essential for camp and stargazing).",
      "Camp chairs and a small table.",
      "First aid kit.",
      "Bear-safe food container or cooler with lid.",
      "Trash bags (leave no trace).",
      "Phone charger / portable battery.",
      "Paper NPS map (cell signal is poor).",
      "Snacks that handle heat: nuts, jerky, dried fruit, energy bars — no chocolate."
    ]
  }
];

const safetyTips = [
  { title: "Heat awareness", desc: "May daytime temps regularly hit 85–95°F. Hike before 10 AM and after 4 PM. Rest in shade midday." },
  { title: "Hydration", desc: "Thirst is a lagging indicator — drink before you feel thirsty. Electrolyte packets help, especially for older hikers." },
  { title: "Water at Indian Cove", desc: "The campground has NO water. Fill every container at the ranger station or in town before arriving." },
  { title: "Wildlife", desc: "Watch for rattlesnakes on trails — stick to marked paths and watch where you step. Keep food sealed tight; ravens are bold and fast." },
  { title: "Cell signal", desc: "Minimal to none inside the park. Download offline maps (Google Maps or AllTrails) before leaving Torrance. Bring a paper NPS map." },
  { title: "Weather", desc: "May can bring surprise wind and dust. Check the NPS forecast the morning of departure. Light layers go a long way." },
  { title: "Leave No Trace", desc: "Pack out all trash. Stay on marked trails. Don't move or climb on rock piles with wildlife habitat." },
  { title: "Park entry", desc: "$35/vehicle fee. Keep your receipt — it's valid for 7 days. InterAgency passes (America the Beautiful) accepted." },
];

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    // Force dark mode for this page specifically to ensure our theme works
    document.documentElement.classList.add('dark');

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      
      setScrollProgress(Number(scroll) * 100);
      setParallaxY(totalScroll * 0.3); // Slow scroll for parallax
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.card-animate').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground pb-24">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-100 ease-out" style={{ width: `${scrollProgress}%` }} />
      
      {/* Sticky Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between overflow-x-auto no-scrollbar gap-4 text-sm font-medium">
          <button onClick={() => scrollTo('overview')} className="whitespace-nowrap hover:text-primary transition-colors">Overview</button>
          <button onClick={() => scrollTo('day-1')} className="whitespace-nowrap hover:text-primary transition-colors">Day 1</button>
          <button onClick={() => scrollTo('day-2')} className="whitespace-nowrap hover:text-primary transition-colors">Day 2</button>
          <button onClick={() => scrollTo('packing')} className="whitespace-nowrap hover:text-primary transition-colors">Packing</button>
          <button onClick={() => scrollTo('tips')} className="whitespace-nowrap hover:text-primary transition-colors">Safety & Tips</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="overview" className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden pt-14">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ transform: `translateY(${parallaxY}px)` }}>
          <div className="stars-layer opacity-60"></div>
          <div className="hero-gradient absolute inset-0"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center space-y-8 mt-12 card-animate in-view">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-4">
            <Calendar className="w-4 h-4" />
            <span>May 9–10, 2026</span>
            <span className="w-1 h-1 rounded-full bg-primary/50 mx-1"></span>
            <span>Group of 4</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-[1.1]">
            {itineraryData.tripName.split('–')[0].trim()}
            <span className="block text-3xl md:text-4xl lg:text-5xl mt-4 text-primary font-normal italic">
              – {itineraryData.tripName.split('–')[1].trim()}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto font-light leading-relaxed">
            A curated overnight camping escape to the deep desert. Rough granite, creosote, and stars so bright they feel close enough to touch.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button onClick={() => scrollTo('day-1')} size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 text-base h-12 px-8">
              View Day 1 Itinerary
            </Button>
            <Button onClick={() => scrollTo('packing')} size="lg" variant="outline" className="w-full sm:w-auto border-border bg-card/50 backdrop-blur hover:bg-accent/50 text-foreground text-base h-12 px-8">
              Packing & Tips
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 md:px-6 space-y-32 py-24">
        
        {/* Days Generation */}
        {itineraryData.days.map((day, dayIndex) => (
          <section key={day.date} id={`day-${dayIndex + 1}`} className="space-y-12">
            <div className="text-center space-y-4 card-animate">
              <h2 className="text-3xl md:text-4xl font-serif text-primary">Day {dayIndex + 1}</h2>
              <p className="text-xl md:text-2xl text-foreground/90">{day.title}</p>
            </div>

            <div className="relative border-l-2 border-border/50 ml-4 md:ml-6 space-y-12 pb-8">
              {day.segments.map((segment) => (
                <div key={segment.id} className="relative pl-8 md:pl-12 card-animate">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary"></div>
                  
                  <div className="bg-card rounded-xl p-6 md:p-8 border border-card-border shadow-lg shadow-black/20 hover:border-primary/30 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-4">
                      <div className="inline-flex items-center gap-1.5 text-primary font-medium text-sm bg-primary/10 px-2.5 py-1 rounded-md self-start">
                        <Clock className="w-4 h-4" />
                        {segment.start} – {segment.end}
                      </div>
                      <h3 className="text-xl md:text-2xl font-serif text-card-foreground leading-snug">
                        {segment.title}
                      </h3>
                    </div>
                    
                    <p className="text-foreground/70 leading-relaxed mb-6">
                      {segment.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="bg-background/50 border-border/50 hover:bg-accent/50 text-foreground">
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-popover border-popover-border text-popover-foreground max-w-lg">
                          <DialogHeader>
                            <DialogTitle className="font-serif text-2xl text-primary">{segment.title}</DialogTitle>
                            <DialogDescription className="text-foreground/80 flex items-center gap-2 mt-2">
                              <Clock className="w-4 h-4" /> {segment.start} – {segment.end}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4 text-base leading-relaxed text-foreground/90">
                            {segment.description}
                          </div>
                          {segment.links.length > 0 && (
                            <div className="pt-4 border-t border-border flex flex-col gap-2">
                              <h4 className="text-sm font-medium text-foreground/60 uppercase tracking-wider">Reference Links</h4>
                              {segment.links.map((link, i) => (
                                <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm">
                                  <ExternalLink className="w-4 h-4" />
                                  <span className="truncate">{new URL(link).hostname}</span>
                                </a>
                              ))}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      {segment.mapSearch && (
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(segment.mapSearch)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 gap-2"
                        >
                          <MapPin className="w-4 h-4" />
                          Open in Maps
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Packing Section */}
        <section id="packing" className="space-y-12 pt-12">
          <div className="text-center space-y-4 card-animate">
            <h2 className="text-3xl md:text-4xl font-serif text-primary">Packing Essentials</h2>
            <p className="text-lg text-foreground/80 max-w-xl mx-auto">Click each category to view detailed packing notes.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 card-animate">
            {packingCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Dialog key={category.id}>
                  <DialogTrigger asChild>
                    <button className="flex items-center gap-3 px-6 py-4 rounded-full bg-card border border-card-border hover:border-primary/50 hover:bg-accent/30 transition-all text-lg font-medium group shadow-sm">
                      <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                      {category.title}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-popover border-popover-border text-popover-foreground max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3 font-serif text-2xl text-primary">
                        <Icon className="w-6 h-6" />
                        {category.title}
                      </DialogTitle>
                    </DialogHeader>
                    <ul className="space-y-4 py-4">
                      {category.items.map((item, i) => (
                        <li key={i} className="flex gap-3 text-foreground/90 leading-relaxed">
                          <ChevronRight className="w-5 h-5 text-primary/70 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </DialogContent>
                </Dialog>
              )
            })}
          </div>
        </section>

        {/* Safety & Tips Section */}
        <section id="tips" className="space-y-8 pt-12 card-animate">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-serif text-primary flex items-center justify-center gap-3">
              <AlertTriangle className="w-8 h-8" />
              Safety & Desert Tips
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {safetyTips.map((tip, i) => (
              <div key={i} className="bg-card/50 backdrop-blur p-6 rounded-xl border border-card-border/50 hover:border-primary/30 transition-colors">
                <h4 className="text-lg font-medium text-foreground mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {tip.title}
                </h4>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center pb-8 pt-12 border-t border-border/30 mt-12 px-6">
        <p className="text-foreground/40 text-sm flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
          See you in the desert
          <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
        </p>
      </footer>
    </div>
  );
}
