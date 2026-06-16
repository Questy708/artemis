'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Compass, CalendarCheck } from 'lucide-react';

type LocationData = {
  id: string;
  name: string;
  x: number;
  y: number;
  labelPos: 'left' | 'right';
  description: string;
  industries: string[];
  image: string;
  students: string;
  scholars: string;
  estYear: string;
};

const locations: LocationData[] = [
  {
    id: 'malta',
    name: 'VALLETTA',
    x: 52,
    y: 39,
    labelPos: 'right',
    description: "The central governance hub of the Artemis Collegium Network. Home to the Chancellor's Office, the Central Council chambers, and the primary academic coordination centre for all micro-colleges.",
    industries: ['Governance', 'Policy', 'Central Administration'],
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&q=80&w=600',
    students: '2,450',
    scholars: '120',
    estYear: '2024'
  },
  {
    id: 'kigali',
    name: 'KIGALI',
    x: 56,
    y: 56,
    labelPos: 'right',
    description: 'A centre for sustainable technology and African studies. Kigali serves as a living laboratory for urban innovation, renewable energy systems, and community-driven development across East Africa.',
    industries: ['Sustainable Tech', 'Urban Innovation', 'African Studies'],
    image: 'https://images.unsplash.com/photo-1562947116-24e5be2d9213?auto=format&fit=crop&q=80&w=600',
    students: '1,200',
    scholars: '64',
    estYear: '2025'
  },
  {
    id: 'berlin',
    name: 'BERLIN',
    x: 51,
    y: 30,
    labelPos: 'right',
    description: 'The European innovation hub, housing the Forge incubator and the Center for Creative Industries. Berlin connects Artemis research to the European startup ecosystem and creative economy.',
    industries: ['Innovation', 'Creative Industries', 'Startup Ecosystem'],
    image: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&q=80&w=600',
    students: '1,850',
    scholars: '95',
    estYear: '2024'
  },
  {
    id: 'sf',
    name: 'SAN FRANCISCO',
    x: 15,
    y: 37,
    labelPos: 'right',
    description: 'The Silicon Innovation Hub anchors Artemis on the US West Coast. Proximity to leading technology companies and venture capital enables translational research partnerships and student entrepreneurship.',
    industries: ['Silicon Innovation', 'Technology Transfer', 'Venture Partnerships'],
    image: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&q=80&w=600',
    students: '3,100',
    scholars: '150',
    estYear: '2024'
  },
  {
    id: 'tokyo',
    name: 'TOKYO',
    x: 85,
    y: 37,
    labelPos: 'left',
    description: "The Pacific Robotics Node brings together Artemis researchers in autonomy, mechatronics, and physical AI. Tokyo's advanced manufacturing ecosystem provides unique prototyping capabilities.",
    industries: ['Robotics', 'Advanced Manufacturing', 'Autonomy'],
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=600',
    students: '1,600',
    scholars: '80',
    estYear: '2025'
  },
  {
    id: 'reykjavik',
    name: 'REYKJAVIK',
    x: 42,
    y: 18,
    labelPos: 'right',
    description: "The Arctic Research Hub focuses on cryosphere dynamics, geothermal energy, and climate feedback mechanisms. Iceland's extreme environment provides a natural laboratory for planetary science.",
    industries: ['Arctic Research', 'Geothermal Energy', 'Climate Science'],
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600',
    students: '750',
    scholars: '45',
    estYear: '2025'
  },
  {
    id: 'singapore',
    name: 'SINGAPORE',
    x: 77,
    y: 55,
    labelPos: 'left',
    description: "The Smart Infrastructure Node connects Artemis to Southeast Asia's rapid urban development. Research focuses on intelligent transport, digital governance, and sustainable city design.",
    industries: ['Smart Cities', 'Digital Governance', 'Sustainable Design'],
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=600',
    students: '2,100',
    scholars: '110',
    estYear: '2024'
  },
  {
    id: 'saopaulo',
    name: 'SÃO PAULO',
    x: 31,
    y: 66,
    labelPos: 'right',
    description: 'The Latin American centre for biodiversity research, social innovation, and the Civic Guild training grounds. São Paulo connects Artemis to the environmental and social challenges of the Global South.',
    industries: ['Biodiversity', 'Social Innovation', 'Civic Engagement'],
    image: 'https://images.unsplash.com/photo-1543059180-aa16dfb7d8c0?auto=format&fit=crop&q=80&w=600',
    students: '1,400',
    scholars: '70',
    estYear: '2025'
  },
  {
    id: 'london',
    name: 'LONDON',
    x: 47,
    y: 28,
    labelPos: 'left',
    description: 'The Anglo-Atlantic Node focuses on machine learning safety, algorithmic finance research, and legal-tech frameworks.',
    industries: ['AI Safety', 'Algorithmic Finance', 'Legal Technology'],
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?auto=format&fit=crop&q=80&w=600',
    students: '1,950',
    scholars: '105',
    estYear: '2024'
  },
  {
    id: 'cape_town',
    name: 'CAPE TOWN',
    x: 54,
    y: 74,
    labelPos: 'right',
    description: 'Cape Town centers on maritime law, blue economy research, biogeography studies, and coastal ecosystem regeneration.',
    industries: ['Blue Economy', 'Maritime Law', 'Ecological Restoration'],
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&q=80&w=600',
    students: '1,100',
    scholars: '55',
    estYear: '2025'
  },
  {
    id: 'sydney',
    name: 'SYDNEY',
    x: 89,
    y: 72,
    labelPos: 'left',
    description: 'The Oceania Node explores marine biology, automated logistics, and indigenous land management methods.',
    industries: ['Marine Biology', 'Autonomous Logistics', 'Indigenous Systems'],
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=600',
    students: '1,500',
    scholars: '75',
    estYear: '2024'
  },
  {
    id: 'mumbai',
    name: 'MUMBAI',
    x: 69,
    y: 48,
    labelPos: 'right',
    description: 'Mumbai specializes in decentralized micro-grids, digital trade routes, and high-density urban planning scaffolds.',
    industries: ['Micro-Grids', 'Digital Finance', 'Resilient Urbanism'],
    image: 'https://images.unsplash.com/photo-1570168007244-23704139443c?auto=format&fit=crop&q=80&w=600',
    students: '2,800',
    scholars: '130',
    estYear: '2025'
  },
  {
    id: 'seoul',
    name: 'SEOUL',
    x: 83,
    y: 36,
    labelPos: 'left',
    description: 'Seoul drives cutting-edge semiconductor research, human-machine interfaces, and future grid systems.',
    industries: ['Semiconductors', 'Interface Design', 'Grid Systems'],
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=600',
    students: '2,200',
    scholars: '98',
    estYear: '2024'
  },
  {
    id: 'vancouver',
    name: 'VANCOUVER',
    x: 14,
    y: 28,
    labelPos: 'right',
    description: 'Focusing on clean-tech solutions, complex forest ecosystems, and deep bio-monitoring networks in Western Canada.',
    industries: ['Clean Tech', 'Bio-Monitoring', 'Sustainable Forestry'],
    image: 'https://images.unsplash.com/photo-1559511259-66e654ae272a?auto=format&fit=crop&q=80&w=600',
    students: '1,350',
    scholars: '60',
    estYear: '2025'
  },
  {
    id: 'buenos_aires',
    name: 'BUENOS AIRES',
    x: 28,
    y: 72,
    labelPos: 'right',
    description: 'A critical center for South American creative technology, agriculture sciences, and sovereign localized governance research.',
    industries: ['Agricultural Tech', 'Creative Media', 'Local Governance'],
    image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&q=80&w=600',
    students: '1,250',
    scholars: '62',
    estYear: '2026'
  },
  {
    id: 'nairobi',
    name: 'NAIROBI',
    x: 57,
    y: 54,
    labelPos: 'left',
    description: 'Driving mobile-first systems research, decentralized cloud infrastructures, and drylands agricultural adaptation models.',
    industries: ['Mobile Infrastructure', 'Drylands Tech', 'Cloud Storage'],
    image: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=600',
    students: '1,650',
    scholars: '72',
    estYear: '2025'
  },
  {
    id: 'cairo',
    name: 'CAIRO',
    x: 55,
    y: 43,
    labelPos: 'right',
    description: 'This Middle-Eastern/North-African node connects historical legacy studies with water conservation tech and desert reclamation systems.',
    industries: ['Desert Reclamation', 'Historic Legacy', 'Water Engineering'],
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80&w=600',
    students: '1,450',
    scholars: '68',
    estYear: '2025'
  },
  {
    id: 'zurich',
    name: 'ZURICH',
    x: 49,
    y: 31,
    labelPos: 'left',
    description: 'Concentrating on secure cryptosystem designs, precision micromachining science, and advanced quantum algorithms.',
    industries: ['Cryptosystems', 'Micromachining', 'Quantum Computing'],
    image: 'https://images.unsplash.com/photo-1515488042361-404e92539b20?auto=format&fit=crop&q=80&w=600',
    students: '1,700',
    scholars: '85',
    estYear: '2024'
  },
  {
    id: 'dubai',
    name: 'DUBAI',
    x: 62,
    y: 44,
    labelPos: 'right',
    description: 'Focusing on hyper-scale climate mitigation, global transit protocols, and autonomous flight mechanics.',
    industries: ['Climate Action', 'Transit Networks', 'Autonomous Aviation'],
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=600',
    students: '2,000',
    scholars: '90',
    estYear: '2024'
  },
  {
    id: 'lagos',
    name: 'LAGOS',
    x: 49,
    y: 53,
    labelPos: 'left',
    description: 'The energetic center for West African commerce research, localized manufacturing networks, and distributed labor platforms.',
    industries: ['Local Manufacturing', 'Distributed Labor', 'West African Commerce'],
    image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=600',
    students: '1,800',
    scholars: '85',
    estYear: '2025'
  }
];

export default function ArtemisMap() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Sync activeLocationId based on activeIdx
  const activeLocationId = useMemo(() => locations[activeIdx]?.id || locations[0].id, [activeIdx]);

  // Track when user manually selects an item
  const handleLocationClick = (id: string) => {
    const idx = locations.findIndex(l => l.id === id);
    if (idx !== -1) {
      setActiveIdx(idx);
    }
  };

  // Auto-rotation player - rotates every 4 seconds if not hovered
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % locations.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const activeLocationData = useMemo(
    () => locations[activeIdx] || locations[0],
    [activeIdx]
  );

  return (
    <section className="py-20 max-w-[1000px] mx-auto w-full">
      {/* Section Header */}
      <div className="mb-12 px-6 lg:px-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <div className="mb-4 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Global Network</span>
          </div>
          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4 uppercase">
            Global Presence
          </h2>
          <p className="text-gray-500 max-w-lg text-[16px] leading-relaxed font-light">
            Sovereign nodes of the Artemis Collegium Network mapped across critical geopolitical matrices.
          </p>
        </div>
        <div className="bg-gray-50/80 border border-gray-100 p-3 rounded-sm self-start md:self-auto shrink-0 flex flex-col gap-1.5 min-w-[240px]">
          <div className="flex items-center gap-2 text-[10px] uppercase font-mono font-bold tracking-wider text-[#8A0000]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Live Node Scanner Active</span>
          </div>
          <p className="text-[11px] text-gray-500 leading-tight">
            Nodes rotate automatically. Hover over the map below to pause and explore manually.
          </p>
        </div>
      </div>

      {/* Map Container */}
      <div
        className="relative w-full overflow-hidden bg-white"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            // Keep current open or let them interact
          }
        }}
      >
        <img
          src="https://cdn.prod.website-files.com/677376e1e97650585235ab96/677e1de06571eae8d537fc47_map.avif"
          alt="World Map"
          className="w-full h-auto pointer-events-none select-none opacity-80"
          referrerPolicy="no-referrer"
        />

        {locations.map((loc, index) => (
          <div
            key={loc.id}
            className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${activeLocationId === loc.id ? 'z-40' : 'z-10'}`}
            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 350, damping: 25, delay: index * 0.05 }}
              className="relative flex items-center justify-center"
            >
              {/* Crimson Marker */}
              <button
                onClick={() => handleLocationClick(loc.id)}
                className={`relative w-4 h-4 rounded-full shrink-0 cursor-pointer transition-all border-[3px] border-white shadow-md hover:scale-125
                  ${activeLocationId === loc.id ? 'bg-[#121212] border-[#8A0000] scale-125 ring-4 ring-[#8A0000]/20' : 'bg-[#8A0000] hover:bg-red-800 animate-pulse-slow'}`}
                aria-label={`View ${loc.name}`}
              />

              {/* Static Label (Always Visible) */}
              <button
                onClick={() => handleLocationClick(loc.id)}
                className={`absolute bg-[#121212] text-white font-mono text-[8px] md:text-[9px] font-bold tracking-[0.12em] px-2 py-0.5 whitespace-nowrap top-1/2 -translate-y-1/2 shadow-md border cursor-pointer hover:border-[#8A0000]/50 transition-all
                  ${loc.labelPos === 'left' ? 'right-full mr-2 md:mr-3' : 'left-full ml-2 md:ml-3'}
                  ${activeLocationId === loc.id ? 'border-[#8A0000] text-amber-100 bg-[#8A0000]/20' : 'border-white/5'}`}
              >
                {loc.name}
              </button>
            </motion.div>
          </div>
        ))}

        {/* Floating Info Panel Overlay */}
        <AnimatePresence mode="popLayout">
          {activeLocationData && (
            <motion.div
              key={activeLocationData.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                left: `${activeLocationData.x}%`,
                top: `${activeLocationData.y}%`,
                x: activeLocationData.x > 50 ? 'calc(-100% - 16px)' : '16px',
                y: activeLocationData.y > 60 ? 'calc(-100% + 24px)' : '-24px'
              }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
              className="absolute w-[280px] sm:w-[320px] bg-white border border-gray-200/90 shadow-2xl p-4 flex flex-col z-50 rounded-sm hover:shadow-[0_20px_50px_rgba(138,0,0,0.15)] border-l-4 border-l-[#8A0000] pointer-events-auto"
              id="map-info-panel"
              style={{ position: 'absolute' }}
            >
              {/* Dynamic carets pointing towards the target marker pin */}
              {activeLocationData.x > 50 ? (
                <div 
                  className="absolute right-[-6px] border-y-[6px] border-y-transparent border-l-[6px] border-l-white drop-shadow-[2px_0_1px_rgba(0,0,0,0.05)]"
                  style={{ top: activeLocationData.y > 60 ? 'auto' : '24px', bottom: activeLocationData.y > 60 ? '24px' : 'auto' }}
                />
              ) : (
                <div 
                  className="absolute left-[-10px] border-y-[6px] border-y-transparent border-r-[6px] border-r-white drop-shadow-[-2px_0_1px_rgba(0,0,0,0.05)]" 
                  style={{ top: activeLocationData.y > 60 ? 'auto' : '24px', bottom: activeLocationData.y > 60 ? '24px' : 'auto' }}
                />
              )}

              <div className="flex items-center justify-between text-[9px] font-mono text-gray-500 uppercase tracking-widest bg-gray-50 border border-gray-100 px-2 py-1 rounded-sm mb-3">
                <span className="font-bold text-[#8A0000]">● Node {activeIdx + 1} / {locations.length}</span>
                <span>Est. {activeLocationData.estYear}</span>
              </div>

              {/* Compact Card Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-3">
                <h3 className="text-[15px] font-black uppercase tracking-tight text-gray-900">
                  {activeLocationData.name}
                </h3>
                <span className="text-[9px] uppercase font-mono tracking-wider font-bold text-[#8A0000] bg-[#8A0000]/5 px-1.5 py-0.5 rounded-sm">
                  {activeLocationData.id}
                </span>
              </div>

              {/* Specification Specs */}
              <p className="text-gray-600 text-[11.5px] leading-relaxed font-light mb-4">
                {activeLocationData.description}
              </p>

              {/* Academic Statistics */}
              <div className="grid grid-cols-2 gap-2 border-t border-b border-gray-100 py-2.5 mb-3.5 bg-gray-50/30">
                <div className="text-center border-r border-gray-100">
                  <div className="flex items-center justify-center gap-1 text-[#8A0000] text-xs font-mono font-bold">
                    <Users size={11} className="shrink-0" />
                    <span>{activeLocationData.students}</span>
                  </div>
                  <div className="text-[7.5px] font-mono text-gray-400 uppercase tracking-widest mt-0.5">Fellows</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-700 text-xs font-mono font-bold">
                    <Compass size={11} className="shrink-0 text-gray-400" />
                    <span>{activeLocationData.scholars}</span>
                  </div>
                  <div className="text-[7.5px] font-mono text-gray-400 uppercase tracking-widest mt-0.5">Scholars</div>
                </div>
              </div>

              {/* Socio-Technical Target Areas */}
              <div>
                <h4 className="text-[8px] font-mono uppercase tracking-widest text-[#8A0000] mb-2 font-bold">Socio-Technical Targets</h4>
                <ul className="flex flex-wrap gap-1">
                  {activeLocationData.industries.map((industry, i) => (
                    <li
                      key={i}
                      className="bg-gray-100/70 border border-gray-200/20 px-2 py-0.5 text-[8.5px] font-mono text-gray-600 rounded-sm"
                    >
                      {industry}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
