'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import SubPageFooter from '@/components/artemis/SubPageFooter';

interface CampusLifeProps {
  goToPage: (page: string) => void;
}

/* ─── Hostel Data (for map) ─── */
type HostelData = {
  id: string;
  name: string;
  city: string;
  x: number;
  y: number;
  labelPos: 'left' | 'right';
  type: string;
  description: string;
  character: string;
};

const hostels: HostelData[] = [
  {
    id: 'valletta-weavers',
    name: 'The Weavers Hall',
    city: 'Valletta',
    x: 52,
    y: 39,
    labelPos: 'right',
    type: 'Commons Residence',
    description: 'The heart of the Artemis Collegium. Weavers Hall anchors students in the art of community-building — where every corridor is a loom and every conversation a thread in something larger.',
    character: 'Collaborative, civic-minded, grounded in dialogue',
  },
  {
    id: 'kigali-kepler',
    name: 'Kepler House',
    city: 'Kigali',
    x: 57,
    y: 57,
    labelPos: 'right',
    type: 'Scholar House',
    description: 'Named for the astronomer who saw patterns in chaos. Kepler House is a haven for systems thinkers and sustainable innovators, overlooking the hills of Rwanda\'s innovation corridor.',
    character: 'Analytical, forward-looking, community-driven',
  },
  {
    id: 'berlin-forge',
    name: 'The Forge Lodge',
    city: 'Berlin',
    x: 52,
    y: 30,
    labelPos: 'right',
    type: 'Guild Hall',
    description: 'Where ideas are hammered into form. The Forge Lodge channels Berlin\'s creative raw energy into a guild of makers, artists, and provocateurs who believe the future is built, not predicted.',
    character: 'Creative, restless, prototyping-oriented',
  },
  {
    id: 'sf-frontier',
    name: 'The Frontier Residence',
    city: 'San Francisco',
    x: 15,
    y: 37,
    labelPos: 'right',
    type: 'Commons Residence',
    description: 'Perched at the edge of the Pacific and the frontier of technology. Frontier residents are builders and dreamers who treat uncertainty as fuel and the unknown as home.',
    character: 'Entrepreneurial, experimental, high-velocity',
  },
  {
    id: 'tokyo-sakura',
    name: 'Sakura House',
    city: 'Tokyo',
    x: 85,
    y: 37,
    labelPos: 'left',
    type: 'Scholar House',
    description: 'A place of precision and contemplation. Sakura House bridges ancient craft and bleeding-edge technology, reflecting Tokyo\'s own duality — where temple gardens neighbour robotics labs.',
    character: 'Disciplined, contemplative, detail-obsessed',
  },
  {
    id: 'reykjavik-aurora',
    name: 'The Aurora Lodge',
    city: 'Reykjavik',
    x: 42,
    y: 17,
    labelPos: 'right',
    type: 'Guild Hall',
    description: 'The northernmost hostel in the network. Aurora Lodge is for those drawn to extremes — geothermal research, Arctic ecology, and the kind of clarity that only comes at the edge of the world.',
    character: 'Resilient, nature-bound, quietly radical',
  },
  {
    id: 'singapore-meridian',
    name: 'The Meridian Hall',
    city: 'Singapore',
    x: 77,
    y: 55,
    labelPos: 'left',
    type: 'Commons Residence',
    description: 'Where East meets West meets future. Meridian Hall is a crossroads — students here navigate cultural complexity with the same ease they navigate smart city infrastructure and digital governance.',
    character: 'Adaptable, cosmopolitan, systems-savvy',
  },
  {
    id: 'saopaulo-botanica',
    name: 'The Botanica House',
    city: 'São Paulo',
    x: 31,
    y: 66,
    labelPos: 'right',
    type: 'Scholar House',
    description: 'Rooted in the Atlantic Forest and the pulse of Latin America. Botanica House is for those who study life in all its forms — from biodiversity to social movements to the rhythms of the city.',
    character: 'Vibrant, socially conscious, ecologically minded',
  },
  {
    id: 'oxford-bodley',
    name: 'Bodley House',
    city: 'Oxford',
    x: 47,
    y: 27,
    labelPos: 'right',
    type: 'Scholar House',
    description: 'Inspired by Oxford\'s collegiate tradition, Bodley House is a micro-college within the Artemis network — a place of tutorials, common rooms, and the conviction that rigorous thought changes the world.',
    character: 'Intellectual, tradition-honouring, debate-loving',
  },
  {
    id: 'geneva-calaton',
    name: 'The Calaton',
    city: 'Geneva',
    x: 49,
    y: 33,
    labelPos: 'right',
    type: 'Guild Hall',
    description: 'Overlooking Lake Geneva and the corridors of international power. The Calaton trains students in diplomacy, humanitarian policy, and the art of building institutions that outlast their founders.',
    character: 'Principled, diplomatic, institution-minded',
  },
  {
    id: 'nairobi-rift',
    name: 'The Rift Lodge',
    city: 'Nairobi',
    x: 56,
    y: 54,
    labelPos: 'right',
    type: 'Commons Residence',
    description: 'Built on the edge of the Great Rift Valley — a fitting metaphor. Rift Lodge is where students confront the deep fractures in global systems and learn to bridge them with technology and empathy.',
    character: 'Bold, restorative, technologically optimistic',
  },
  {
    id: 'mumbai-gateway',
    name: 'The Gateway House',
    city: 'Mumbai',
    x: 68,
    y: 44,
    labelPos: 'left',
    type: 'Guild Hall',
    description: 'Named for the arch that welcomes travellers to India\'s greatest port city. Gateway House is a guild of entrepreneurs and social innovators who see opportunity where others see complexity.',
    character: 'Resourceful, dynamic, impact-driven',
  },
  {
    id: 'seoul-han',
    name: 'The Han Residence',
    city: 'Seoul',
    x: 82,
    y: 35,
    labelPos: 'left',
    type: 'Scholar House',
    description: 'Along the banks of the Han River, this hostel embodies Korea\'s blend of deep heritage and hyper-modernity. Han residents move between K-culture analysis and semiconductor design with equal fluency.',
    character: 'Intensive, culturally layered, innovation-focused',
  },
  {
    id: 'sydney-southerncross',
    name: 'The Southern Cross Lodge',
    city: 'Sydney',
    x: 87,
    y: 69,
    labelPos: 'left',
    type: 'Commons Residence',
    description: 'Guided by the constellation for which it\'s named. Southern Cross Lodge is the network\'s gateway to Oceania — a community of marine scientists, Indigenous knowledge holders, and adventurers.',
    character: 'Exploratory, ocean-minded, community-rooted',
  },
  {
    id: 'capetown-table',
    name: 'The Table Hall',
    city: 'Cape Town',
    x: 52,
    y: 71,
    labelPos: 'right',
    type: 'Guild Hall',
    description: 'In the shadow of Table Mountain, this guild hall brings together artists, activists, and architects. Table Hall is where the struggle for justice meets the craft of beautiful, lasting design.',
    character: 'Creative, justice-oriented, architecturally minded',
  },
  {
    id: 'buenosaires-tango',
    name: 'The Tango House',
    city: 'Buenos Aires',
    x: 28,
    y: 73,
    labelPos: 'right',
    type: 'Scholar House',
    description: 'A hostel that moves. Tango House takes its name from the dance — two partners, unpredictable, perfectly attuned. Students here study urban transformation, literature, and the politics of movement.',
    character: 'Passionate, literary, politically engaged',
  },
  {
    id: 'stockholm-nordic',
    name: 'The Nordic Hall',
    city: 'Stockholm',
    x: 51,
    y: 22,
    labelPos: 'right',
    type: 'Commons Residence',
    description: 'Clean lines, clear thinking. Nordic Hall is a study in Scandinavian design principles applied to education — minimal waste, maximum wellbeing, and the quiet conviction that good systems produce good lives.',
    character: 'Orderly, design-conscious, sustainability-first',
  },
  {
    id: 'dubai-oasis',
    name: 'The Oasis Lodge',
    city: 'Dubai',
    x: 61,
    y: 41,
    labelPos: 'left',
    type: 'Guild Hall',
    description: 'Rising from the desert, Oasis Lodge is a guild of futurists and financiers. Students here engage with global capital flows, urban megaprojects, and the ethics of building cities from nothing.',
    character: 'Ambitious, globally connected, ethically questioning',
  },
  {
    id: 'shanghai-dragon',
    name: 'The Dragon Gate',
    city: 'Shanghai',
    x: 79,
    y: 39,
    labelPos: 'left',
    type: 'Commons Residence',
    description: 'At the mouth of the Yangtze, where tradition and velocity collide. Dragon Gate residents study manufacturing ecosystems, AI ethics, and the art of operating at unprecedented scale.',
    character: 'Fast-thinking, scale-minded, culturally deep',
  },
  {
    id: 'accra-goldcoast',
    name: 'The Gold Coast House',
    city: 'Accra',
    x: 47,
    y: 51,
    labelPos: 'right',
    type: 'Scholar House',
    description: 'Reclaiming a colonial name with post-colonial ambition. Gold Coast House is a centre for Pan-African thought, digital sovereignty, and the creative industries reshaping West Africa\'s narrative.',
    character: 'Afro-futurist, culturally proud, digitally native',
  },
  {
    id: 'lima-andes',
    name: 'The Andes Lodge',
    city: 'Lima',
    x: 22,
    y: 62,
    labelPos: 'right',
    type: 'Guild Hall',
    description: 'Where the Andes meet the Pacific. Andes Lodge is a guild of earth scientists, culinary innovators, and indigenous knowledge keepers — studying the deep time of landscapes and cultures.',
    character: 'Earth-connected, culinary, ancestrally aware',
  },
  {
    id: 'montreal-cartier',
    name: 'The Cartier House',
    city: 'Montreal',
    x: 24,
    y: 30,
    labelPos: 'right',
    type: 'Scholar House',
    description: 'A bilingual micro-college in the Francophone heart of North America. Cartier House bridges French and English intellectual traditions, with particular strength in AI research and philosophy of mind.',
    character: 'Bilingual, philosophical, research-intensive',
  },
  {
    id: 'edinburgh-arthur',
    name: 'The Arthur Seat Lodge',
    city: 'Edinburgh',
    x: 46,
    y: 25,
    labelPos: 'right',
    type: 'Commons Residence',
    description: 'Named for the ancient volcano at the city\'s heart. Arthur Seat Lodge is a community of storytellers, data scientists, and those who believe narrative and numbers are equally valid ways of knowing.',
    character: 'Narrative-driven, data-fluent, mythologically aware',
  },
  {
    id: 'zagreb-adriatic',
    name: 'The Adriatic House',
    city: 'Zagreb',
    x: 52,
    y: 34,
    labelPos: 'left',
    type: 'Guild Hall',
    description: 'At the crossroads of Central Europe and the Mediterranean. Adriatic House is a guild of bridge-builders — students who navigate between cultures, systems, and histories with ease and intention.',
    character: 'Mediating, culturally fluent, bridge-building',
  },
];

/* ─── Day in the Life ─── */
const dayMoments = [
  {
    time: '07:00',
    title: 'Morning Run or Meditation',
    desc: 'The harbour in Valletta, the river trail in Seoul, the volcanic path in Edinburgh — every city offers a different way to wake up. Some hostels hold group meditation; others, a quiet kitchen with coffee already brewing from the early risers.',
    image: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?auto=format&fit=crop&q=80&w=600',
    icon: 'sunrise',
  },
  {
    time: '10:00',
    title: 'Seminar or Studio',
    desc: 'Small-group tutorials in the Oxford tradition, or hands-on prototyping in the Forge Lodge workshop. Morning is for the deepest work — the kind that changes how you see the world.',
    image: 'https://images.unsplash.com/photo-1570616969692-54d6ba3d0397?auto=format&fit=crop&q=80&w=600',
    icon: 'book',
  },
  {
    time: '13:00',
    title: 'Lunch with the World',
    desc: 'The communal kitchen is where cultures collide deliciously. Your hostel-mate from Mumbai teaches you to make dal while the Berliner argues about the perfect pretzel. Every meal is a geography lesson.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600',
    icon: 'bowl',
  },
  {
    time: '16:00',
    title: 'Guild Sessions & Club Meetings',
    desc: 'Robotics practice, debate society, climate action planning, open-mic rehearsal, or just reading in the garden. This is when the hostel becomes a village — everyone doing their thing, together.',
    image: 'https://images.unsplash.com/photo-1687172140737-22c4c3371f3e?auto=format&fit=crop&q=80&w=600',
    icon: 'bolt',
  },
  {
    time: '19:00',
    title: 'The Common Table',
    desc: 'Friday evening, every hostel sets one long table. No devices, no agendas — only food and conversation that ranges from philosophy to gossip to plans for the weekend. This is the ritual that holds the network together.',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600',
    icon: 'wine',
  },
  {
    time: '23:00',
    title: 'Late-Night Common Room',
    desc: 'The best conversations happen when the work is done. A physicist and a poet arguing about time. A group planning a weekend hike up Table Mountain. Someone playing guitar. The common room never really closes.',
    image: 'https://images.unsplash.com/photo-1624555130296-e551faf8969b?auto=format&fit=crop&q=80&w=600',
    icon: 'moon',
  },
];

/* ─── Clubs & Societies ─── */
const societies = [
  { name: 'The Debating Union', desc: 'Weekly motions that range from the philosophical to the political. Chapters at every hostel compete in an annual Grand Tournament held each spring in Oxford.', members: '320+' },
  { name: 'Artemis Makers Guild', desc: 'From 3D-printed prosthetics to hand-bound books. The Makers Guild shares designs across the network — a prototype born in Berlin can be iterated in Nairobi by the next morning.', members: '180+' },
  { name: 'Climate Action Collective', desc: 'Student-led sustainability initiatives across every hub: urban farming in Kigali, carbon auditing in Stockholm, reef monitoring in Sydney. Action, not just discussion.', members: '250+' },
  { name: 'The Open Mic Society', desc: 'Poetry, comedy, music, and the occasional chaotic experiment. Every hostel has a night — and the best acts are streamed live to the entire network on Saturday evenings.', members: '400+' },
  { name: 'Intramural Athletics', desc: 'Friendly competition is the point: football in São Paulo, bouldering in Reykjavik, cricket in Mumbai, swimming in Sydney. The annual Artemis Games rotate between hubs.', members: '600+' },
  { name: 'Global Cookbook Society', desc: 'Students document and share recipes from their hostels and cities. The Artemis Cookbook, published annually, is part travelogue, part kitchen manual, part love letter to home.', members: '150+' },
];

/* ─── Student Voices ─── */
const studentVoices = [
  {
    quote: 'I arrived at the Weavers Hall thinking I\'d be homesick within a week. By the third night, I was teaching my hostel-mates how to make chapati and learning to salsa from a girl from Buenos Aires. Home isn\'t a place — it\'s the people who stay up late arguing with you.',
    name: 'Amara Osei',
    detail: 'Third year · Accra → Valletta → Berlin → Tokyo',
  },
  {
    quote: 'The Common Table changed my life. Every Friday, you sit down with people you might never have spoken to, and by dessert you\'ve discovered something about the world — and about yourself — that no lecture could teach.',
    name: 'Lukas Richter',
    detail: 'Second year · Berlin → Kigali → Oxford',
  },
  {
    quote: 'When I rotated to São Paulo, I was terrified. Three weeks later, I was leading a climate workshop in the Atlantic Forest with students from six countries. Artemis doesn\'t just move you — it expands what you think you\'re capable of.',
    name: 'Mei-Lin Chen',
    detail: 'Fourth year · Singapore → San Francisco → São Paulo → Seoul',
  },
  {
    quote: 'The hostel becomes your world. The common room is where the physicist and the painter become best friends. The kitchen is where revolutions are planned over burnt toast. It\'s messy, it\'s beautiful, it\'s the most alive I\'ve ever felt.',
    name: 'Tomás Rivera',
    detail: 'First year · Buenos Aires → Valletta',
  },
];

/* ─── Traditions ─── */
const traditions = [
  {
    name: 'The Crossing',
    desc: 'When students arrive at a new hostel for the first time, they cross its threshold carrying a single object from their previous hostel — a tradition that transforms arrival into continuity. The object might be a handwritten note, a small carving, a pressed flower — something that says "I was there, and it mattered."',
  },
  {
    name: 'The Common Table',
    desc: 'Every hostel sets one long table on Friday evenings. No devices, no agendas — only food and conversation. The ritual travels with students from city to city, creating a shared rhythm that makes every new place feel like home by the end of the first week.',
  },
  {
    name: 'The Send-Off',
    desc: 'Before rotating to their next hub, students present a fragment of what they\'ve learned to their hostel community — a song, a sketch, a piece of code, a story. It is part celebration, part transmission, ensuring knowledge doesn\'t stay in one place.',
  },
  {
    name: 'The Co-Design Immersion',
    desc: 'In their first week at any hostel, every student enters a 24-hour co-design challenge with their new peers. Together they prototype solutions to a real community challenge, planting a learning contract at their new hub — a living symbol that they belong here now.',
  },
];

/* ─── Stats ─── */
const campusStats = [
  { value: '24', label: 'Hostels', detail: 'Each one a home' },
  { value: '50+', label: 'Clubs & Societies', detail: 'Founded and run by students' },
  { value: '6', label: 'Continents', detail: 'Where your stories unfold' },
  { value: '1', label: 'Common Table', detail: 'Every Friday, everywhere' },
];

/* ─── Photo Strip Data ─── */
const photoStripImages = [
  { src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600', alt: 'Students cooking together in a hostel kitchen' },
  { src: 'https://images.unsplash.com/photo-1687172140737-22c4c3371f3e?auto=format&fit=crop&q=80&w=600', alt: 'Friends gathered in a common room' },
  { src: 'https://images.unsplash.com/photo-1654000689690-6b7005949b6f?auto=format&fit=crop&q=80&w=600', alt: 'Students playing sports on campus' },
  { src: 'https://images.unsplash.com/photo-1687172140737-22c4c3371f3e?auto=format&fit=crop&q=80&w=600', alt: 'Open mic night with students performing' },
  { src: 'https://images.unsplash.com/photo-1594750852563-5ed8e0421d40?auto=format&fit=crop&q=80&w=600', alt: 'Students exploring a European city' },
  { src: 'https://images.unsplash.com/photo-1630480330188-1818487a2426?auto=format&fit=crop&q=80&w=600', alt: 'Studying outdoors in the sunshine' },
  { src: 'https://images.unsplash.com/photo-1686213011642-b25f94b95b96?auto=format&fit=crop&q=80&w=600', alt: 'Graduation celebration with friends' },
  { src: 'https://images.unsplash.com/photo-1687172140737-22c4c3371f3e?auto=format&fit=crop&q=80&w=600', alt: 'Cultural festival on campus' },
  { src: 'https://images.unsplash.com/photo-1630480330188-1818487a2426?auto=format&fit=crop&q=80&w=600', alt: 'Coffee shop studying with friends' },
  { src: 'https://images.unsplash.com/photo-1624555130296-e551faf8969b?auto=format&fit=crop&q=80&w=600', alt: 'Group project collaboration' },
];

/* ─── Time Icon Components ─── */
function TimeIcon({ type }: { type: string }) {
  switch (type) {
    case 'sunrise':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4" /><path d="m4.93 4.93 2.83 2.83" /><path d="M20 12h4" /><path d="m19.07 4.93-2.83 2.83" /><path d="M12 12a4 4 0 0 0-4 4" /><path d="M2 16h20" />
        </svg>
      );
    case 'book':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
      );
    case 'bowl':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12a10 10 0 0 0 20 0" /><path d="M12 2v4" /><path d="M8 2v2" /><path d="M16 2v2" />
        </svg>
      );
    case 'bolt':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'wine':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8A0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 22h8" /><path d="M7 10h10" /><path d="M12 22V2" /><path d="M12 2C9.5 2 7 5 7 10s2.5 8 5 8 5-3 5-8-2.5-8-5-8" />
        </svg>
      );
    case 'moon':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      );
    default:
      return null;
  }
}

/* ─── Hook: animate on scroll ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !visible.current) {
          visible.current = true;
          setIsVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible: isVisible };
}

/* ─── Component ─── */
export default function CampusLife({ goToPage }: CampusLifeProps) {
  const heroAnim = useInView();
  const dayAnim = useInView();
  const voicesAnim = useInView();
  const hostelAnim = useInView();
  const clubsAnim = useInView();
  const traditionsAnim = useInView();
  const mapAnim = useInView();
  const statsAnim = useInView();

  const [activeHostelId, setActiveHostelId] = useState<string | null>(null);
  const activeHostel = useMemo(() => hostels.find((h) => h.id === activeHostelId), [activeHostelId]);

  return (
    <div className="flex flex-col bg-white">
      {/* ── 1. Hero — warm, vibrant, alive ── */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[55vh] min-h-[340px] sm:min-h-[440px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1594750852563-5ed8e0421d40?auto=format&fit=crop&q=80&w=1800"
              className="absolute inset-0 w-full h-full object-cover"
              alt="Students at Artemis"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-16">
              <div className="mb-8 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                  Life at Artemis
                </span>
              </div>
              <h1 className="text-[32px] sm:text-[44px] md:text-[60px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6">
                Where living<br />is the curriculum
              </h1>
              <p className="text-[18px] text-white/85 max-w-xl leading-relaxed font-light">
                Artemis students don&rsquo;t just study the world — they live in it. Over four years,
                you&rsquo;ll call multiple cities home, share meals with people who reshape your thinking,
                and discover that the most important lessons happen far from any classroom.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Life in Color — auto-scrolling photo strip ── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 mb-6">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Life in Color
            </span>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto w-full relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <style>{`
            @keyframes scrollStrip {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-scroll-strip {
              animation: scrollStrip 40s linear infinite;
              will-change: transform;
            }
            .animate-scroll-strip:hover {
              animation-play-state: paused;
            }
          `}</style>
          <div className="overflow-hidden">
            <div className="flex animate-scroll-strip" style={{ width: 'max-content' }}>
              {[...photoStripImages, ...photoStripImages].map((img, i) => (
                <div key={i} className="flex-shrink-0 mx-2 md:mx-3">
                  <div className="w-[240px] h-[160px] md:w-[300px] md:h-[200px] overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. A Day in Your Life ── */}
      <section className="py-16 lg:py-24">
        <div
          ref={dayAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${
            dayAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              A Day in Your Life
            </span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            Same rhythm,<br />different skyline
          </h2>
          <p className="text-[16px] text-gray-500 max-w-2xl leading-relaxed font-light mb-12">
            Whether you wake up in Valletta or Tokyo, the rhythm of Artemis life has a familiar
            pulse — morning reflection, deep work, communal meals, and the kind of conversations
            that don&rsquo;t happen in lecture halls.
          </p>

          <div className="space-y-8">
            {dayMoments.map((moment, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-[160px_1fr_280px] gap-6 lg:gap-12 items-start">
                <div className="flex lg:flex-col items-baseline lg:items-start gap-3 lg:gap-1">
                  <div className="flex items-center gap-2">
                    <TimeIcon type={moment.icon} />
                    <span className="text-[28px] font-black text-[#8A0000] leading-none tabular-nums">{moment.time}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-[20px] font-bold text-[#141414] mb-2 leading-tight">{moment.title}</h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed">{moment.desc}</p>
                </div>
                <div className="aspect-[3/2] bg-gray-200 overflow-hidden shrink-0 hidden lg:block rounded-sm">
                  <img
                    src={moment.image}
                    alt={moment.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Student Voices — prominent, warm ── */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div
          ref={voicesAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${
            voicesAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Student Voices
            </span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-12">
            Don&rsquo;t take our word for it
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {studentVoices.map((voice, i) => (
              <div key={i} className="bg-white p-8 lg:p-10 rounded-sm border-l-4 border-[#8A0000] shadow-sm">
                <svg className="w-8 h-8 text-[#8A0000]/30 mb-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-[17px] md:text-[18px] text-gray-800 leading-relaxed mb-6 italic font-light">
                  &ldquo;{voice.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#8A0000] flex items-center justify-center text-white text-[14px] font-bold">
                    {voice.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-[#141414]">{voice.name}</p>
                    <p className="text-[12px] text-gray-500 font-mono tracking-wider">{voice.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Your Hostel, Your Home ── */}
      <section className="py-16 lg:py-24">
        <div
          ref={hostelAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${
            hostelAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Your Hostel, Your Home
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                Not a dorm.<br />A micro-college.
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Inspired by Oxford&rsquo;s collegiate system and Minerva&rsquo;s global rotation, Artemis
                hostels are residential communities with their own culture, traditions, and identity.
                Each one is a world unto itself — common rooms where debates run past midnight,
                shared kitchens where five cuisines cook simultaneously, and gardens where you can
                think in peace.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                You don&rsquo;t just live in a hostel — you belong to it. And when you rotate to the next
                city, you carry that belonging with you. The hostel you leave behind stays in your
                story forever; the one you arrive at becomes home within days.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                From the Aurora Lodge in Reykjavik to the Southern Cross in Sydney, every hostel
                has its own character — but they all share the same heartbeat: the conviction that
                how you live matters as much as what you learn.
              </p>
              <button
                onClick={() => {
                  const hostelSection = document.getElementById('hostel-map');
                  if (hostelSection) hostelSection.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center space-x-4 py-3 border-b-2 border-[#141414] text-[#141414] text-[13px] font-bold uppercase tracking-[0.2em] hover:text-[#8A0000] hover:border-[#8A0000] transition-all group"
              >
                <span>Explore all 24 hostels</span>
                <svg className="group-hover:translate-x-2 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>

            <div className="space-y-6">
              <div className="group">
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden rounded-sm">
                  <img
                    src="https://images.unsplash.com/photo-1687172140737-22c4c3371f3e?auto=format&fit=crop&q=80&w=1000"
                    alt="Students in a hostel common room"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-[12px] text-gray-500 mt-3 leading-relaxed">
                  The common room at Weavers Hall, Valletta — where the physicist and the painter
                  become best friends.
                </p>
              </div>
              <div className="group">
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden rounded-sm">
                  <img
                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1000"
                    alt="Students cooking together"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-[12px] text-gray-500 mt-3 leading-relaxed">
                  The shared kitchen at Botanica House, São Paulo — where every meal is a geography lesson.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Clubs, Guilds & Societies ── */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div
          ref={clubsAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${
            clubsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Clubs, Guilds & Societies
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-12">
            <div>
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                Find your people,<br />build your thing
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                With over fifty student-run organisations spanning every hostel, there&rsquo;s a club for
                every passion — and if there isn&rsquo;t, you can start one. The Debating Union argues
                across time zones. The Makers Guild shares prototypes between continents by morning.
                The Global Cookbook Society documents the recipes that make each hostel smell like home.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed">
                These aren&rsquo;t resume-padding activities. They&rsquo;re where lifelong friendships form,
                where you discover talents you didn&rsquo;t know you had, and where the line between play
                and purpose disappears entirely.
              </p>
            </div>
            <div className="group">
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden rounded-sm">
                <img
                  src="https://images.unsplash.com/photo-1687172140737-22c4c3371f3e?auto=format&fit=crop&q=80&w=1000"
                  alt="Students in club activities"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-[12px] text-gray-500 mt-3 leading-relaxed">
                Open Mic Night at Sakura House, Tokyo — streamed live to every hostel on Saturday evenings.
              </p>
            </div>
          </div>

          {/* Society cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {societies.map((soc, i) => (
              <div key={i} className="border border-gray-200 bg-white p-6 hover:border-[#8A0000] transition-colors group rounded-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-[#8A0000] tracking-widest uppercase">{soc.members} members</span>
                </div>
                <h4 className="text-[18px] font-bold text-[#141414] mb-2 group-hover:text-[#8A0000] transition-colors leading-tight">
                  {soc.name}
                </h4>
                <p className="text-[14px] text-gray-600 leading-relaxed">{soc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Traditions that Travel ── */}
      <section className="py-16 lg:py-24">
        <div
          ref={traditionsAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${
            traditionsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Traditions that Travel
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
            <div>
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                Rituals that move<br />with you
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                In the Oxford tradition, every college has its rituals. At Artemis, those rituals
                don&rsquo;t belong to a building — they belong to the community. Wherever students rotate,
                the traditions travel with them, creating continuity across continents and turning
                every new city into home by the end of the first week.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed">
                From the Crossing to the Common Table, these practices bind the network together
                — not through uniformity, but through a shared commitment to presence, reflection,
                and the belief that how you live matters as much as what you learn.
              </p>
            </div>
            <div className="group">
              <div className="aspect-[4/3] bg-gray-200 overflow-hidden rounded-sm">
                <img
                  src="https://images.unsplash.com/photo-1624555130296-e551faf8969b?auto=format&fit=crop&q=80&w=1000"
                  alt="Traditions at Artemis"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-[12px] text-gray-500 mt-3 leading-relaxed">
                The Common Table at The Forge Lodge, Berlin — the same ritual, a different city,
                every Friday evening.
              </p>
            </div>
          </div>

          {/* Tradition cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {traditions.map((trad, i) => (
              <div key={i} className="border border-gray-200 bg-white p-6 hover:border-[#8A0000] transition-colors group rounded-sm">
                <div className="flex items-start gap-4">
                  <span className="text-[10px] font-bold text-[#8A0000] tracking-widest mt-1 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="text-[18px] font-bold text-[#141414] mb-2 group-hover:text-[#8A0000] transition-colors leading-tight">
                      {trad.name}
                    </h4>
                    <p className="text-[14px] text-gray-600 leading-relaxed">{trad.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. The Map — your world expands ── */}
      <section id="hostel-map" className="bg-gray-50 py-16 lg:py-24">
        <div
          ref={mapAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${
            mapAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Your World Expands
            </span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            Every semester,<br />a new home
          </h2>
          <p className="text-[16px] text-gray-500 max-w-2xl leading-relaxed font-light mb-10">
            Over four years, you&rsquo;ll rotate through global hubs — each one a different city, a
            different hostel, a different perspective. The map below shows all 24 hostels in the
            network. Click any pin to discover what living there is like.
          </p>

          {/* 4-year rotation at a glance */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
            {[
              { year: 'Year 1', title: 'Foundation', cities: 'Valletta · Berlin' },
              { year: 'Year 2', title: 'Expansion', cities: 'Kigali · São Paulo · Accra' },
              { year: 'Year 3', title: 'Deepening', cities: 'Tokyo · Oxford · Sydney' },
              { year: 'Year 4', title: 'Integration', cities: 'Your choice · Global' },
            ].map((step, i) => (
              <div key={i} className="relative pl-5 border-l-2 border-[#8A0000]/30">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-1">{step.year}</div>
                <h3 className="text-[16px] font-bold text-[#141414] mb-1 leading-tight">{step.title}</h3>
                <p className="text-[12px] font-mono text-gray-400 tracking-wider">{step.cities}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <div
            className="relative w-full overflow-hidden bg-white border border-gray-200"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveHostelId(null);
            }}
          >
            <img
              src="https://cdn.prod.website-files.com/677376e1e97650585235ab96/677e1de06571eae8d537fc47_map.avif"
              alt="World Map — Artemis Hostel Network"
              className="w-full h-auto pointer-events-none select-none opacity-80"
            />

            {/* Hostel Markers */}
            {hostels.map((hostel, index) => (
              <div
                key={hostel.id}
                className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${
                  activeHostelId === hostel.id ? 'z-40' : 'z-10'
                }`}
                style={{ left: `${hostel.x}%`, top: `${hostel.y}%` }}
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25, delay: index * 0.04 }}
                  className="relative flex items-center justify-center"
                >
                  <button
                    onClick={() => setActiveHostelId(activeHostelId === hostel.id ? null : hostel.id)}
                    className={`relative rounded-full shrink-0 cursor-pointer transition-all duration-200 ${
                      activeHostelId === hostel.id
                        ? 'w-5 h-5 md:w-6 md:h-6 bg-[#8A0000] ring-4 ring-[#8A0000]/20'
                        : 'w-3.5 h-3.5 md:w-4 md:h-4 bg-[#8A0000] hover:bg-red-800 hover:ring-4 hover:ring-[#8A0000]/10 border-2 border-transparent hover:border-black'
                    }`}
                    aria-label={`View ${hostel.name} in ${hostel.city}`}
                  />
                  <div
                    className={`absolute whitespace-nowrap top-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-200 ${
                      activeHostelId === hostel.id ? 'opacity-0' : 'opacity-100'
                    } ${hostel.labelPos === 'left' ? 'right-full mr-2 md:mr-3' : 'left-full ml-2 md:ml-3'}`}
                  >
                    <span className="bg-black text-white font-mono text-[9px] md:text-[11px] font-bold tracking-[0.12em] px-2 py-1">
                      {hostel.name}
                    </span>
                  </div>
                </motion.div>
              </div>
            ))}

            {/* Info Panel */}
            <AnimatePresence>
              {activeHostel && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-3 bottom-3 right-3 md:w-80 lg:w-96 bg-white border border-gray-200 shadow-2xl p-6 md:p-8 flex flex-col z-50 overflow-y-auto"
                >
                  <button onClick={() => setActiveHostelId(null)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black transition-colors" aria-label="Close panel">
                    <X className="w-5 h-5" />
                  </button>
                  <div className="mb-3 mt-4">
                    <span className="bg-[#8A0000]/10 text-[#8A0000] text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                      {activeHostel.type}
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold uppercase tracking-tight text-[#141414] mb-1">{activeHostel.name}</h3>
                  <p className="text-[12px] font-bold uppercase tracking-widest text-gray-500 mb-6">{activeHostel.city}</p>
                  <div className="space-y-5 flex-1">
                    <div>
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#8A0000] mb-2">About</h4>
                      <p className="text-gray-600 text-[14px] leading-relaxed">{activeHostel.description}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#8A0000] mb-2">Character</h4>
                      <p className="text-gray-800 text-[14px] leading-relaxed font-medium">{activeHostel.character}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="mt-6 flex flex-wrap gap-6 items-center text-[11px] text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#8A0000] inline-block" />
              <span className="font-medium">Commons Residence</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#8A0000] inline-block" />
              <span className="font-medium">Scholar House</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#8A0000] inline-block rotate-45" />
              <span className="font-medium">Guild Hall</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. Stats — warm framing ── */}
      <section className="py-16 lg:py-24">
        <div
          ref={statsAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${
            statsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              By the Numbers
            </span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-12">
            Life at scale
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            {campusStats.map((stat, i) => (
              <div key={i} className="relative pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#8A0000]" />
                <div className="text-[36px] font-black text-[#141414] leading-none mb-2 tabular-nums">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-1">{stat.label}</div>
                <div className="text-[12px] text-gray-500 leading-snug">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. Crimson CTA bar ── */}
      <section className="bg-[#8A0000] py-16 px-5 sm:px-8 lg:px-20">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-[28px] md:text-[36px] font-extrabold leading-tight tracking-tighter text-white mb-2">
              Come see it for yourself
            </h2>
            <p className="text-[16px] text-white/70 leading-relaxed max-w-lg">
              Walk the common rooms, share a Common Table with future peers, feel the pulse of a
              city that will reshape your thinking. There is no substitute for being here.
            </p>
          </div>
          <button
            onClick={() => goToPage('visit-us')}
            className="flex items-center space-x-3 bg-white text-[#8A0000] px-8 py-4 text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors shrink-0 group"
          >
            <span>Visit Campus</span>
            <svg className="group-hover:translate-x-2 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      </section>

      {/* ── 11. Footer ── */}
      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
