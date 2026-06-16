'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import { ChevronRight, Download, ExternalLink, MapPin, Globe, Building2, Server } from 'lucide-react';

interface Props {
  goToPage: (page: string) => void;
  title: string;
  parentTitle: string;
  parentId: string;
}

/* ─── Scroll-triggered animation hook ─── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/* ─── Reusable section divider ─── */
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center py-12">
      <div className="flex-grow border-t border-gray-200"></div>
      <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">{label}</span>
      <div className="flex-grow border-t border-gray-200"></div>
    </div>
  );
}

/* ─── Red line accent label ─── */
function RedAccentLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-8 h-[1px] bg-[#8A0000]"></span>
      <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#8A0000]">{text}</span>
    </div>
  );
}

/* ─── Stat block ─── */
function StatBlock({ number, label, detail }: { number: string; label: string; detail?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`border-l-2 border-[#8A0000] pl-6 py-2 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="text-[36px] lg:text-[44px] font-extrabold tracking-tighter text-[#141414] leading-none">
        {number}
      </div>
      <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#8A0000] mt-2">{label}</div>
      {detail && <div className="text-[13px] text-gray-500 mt-1 leading-relaxed">{detail}</div>}
    </div>
  );
}

/* ─── Link row ─── */
function LinkRow({ label, onClick, icon }: { label: string; onClick: () => void; icon?: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center justify-between w-full py-4 border-b border-gray-100 hover:border-[#8A0000] transition-colors text-left"
    >
      <div className="flex items-center gap-3">
        {icon && <span className="text-gray-400 group-hover:text-[#8A0000] transition-colors">{icon}</span>}
        <span className="text-[15px] font-bold text-gray-700 group-hover:text-black transition-colors">{label}</span>
      </div>
      <ChevronRight size={18} className="text-gray-300 group-hover:text-[#8A0000] transition-colors" />
    </button>
  );
}

/* ─── Scroll-reveal wrapper ─── */
function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FACTS AND FIGURES PAGE
   ═══════════════════════════════════════════════════════ */
function FactsAndFigures({ goToPage }: { goToPage: (page: string) => void }) {
  const mainStats = [
    { number: '350+', label: 'Scholars', detail: 'Across all programmes and micro-colleges' },
    { number: '20', label: 'Micro-Colleges', detail: 'Autonomous learning communities worldwide' },
    { number: '6', label: 'Continents', detail: 'Physical presence spanning the globe' },
    { number: '$12M', label: 'Research Expenditure', detail: 'Annual investment in discovery' },
    { number: '0', label: 'Spin-Offs', detail: 'Building from foundational research' },
    { number: '120+', label: 'Staff', detail: 'Faculty, researchers, and professionals' },
    { number: '28+', label: 'Countries', detail: 'Represented in our scholar body' },
    { number: '15', label: 'Departments', detail: 'Spanning every discipline' },
  ];

  const demographics = [
    { region: 'Europe', pct: 32 },
    { region: 'Asia-Pacific', pct: 28 },
    { region: 'Africa', pct: 18 },
    { region: 'Americas', pct: 15 },
    { region: 'Middle East', pct: 7 },
  ];

  const researchGrowth = [
    { year: '2026', value: '$12M' },
    { year: '2028', value: '$35M' },
    { year: '2030', value: '$80M' },
  ];

  return (
    <>
      <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24">
        {/* Key Statistics */}
        <SectionDivider label="Key Statistics" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          {mainStats.map((stat, i) => (
            <StatBlock key={i} number={stat.number} label={stat.label} detail={stat.detail} />
          ))}
        </div>

        {/* Student Demographics */}
        <SectionDivider label="Student Demographics" />

        <RevealSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="text-[28px] font-bold text-[#141414] tracking-tight mb-4">A Global Scholar Body</h2>
              <p className="text-[14px] text-gray-500 leading-relaxed">
                Artemis scholars represent 28+ nationalities, creating one of the most diverse learning communities in higher education. Our decentralized model ensures representation from every corner of the world.
              </p>
            </div>
            <div className="lg:col-span-8 space-y-5">
              {demographics.map((d) => (
                <div key={d.region} className="flex items-center gap-4">
                  <span className="text-[13px] font-bold text-[#141414] w-28 shrink-0">{d.region}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#8A0000] rounded-full transition-all duration-1000"
                      style={{ width: `${d.pct}%` }}
                    />
                  </div>
                  <span className="text-[13px] font-bold text-[#8A0000] w-12 text-right">{d.pct}%</span>
                </div>
              ))}
              <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-3 gap-4">
                <div>
                  <div className="text-[28px] font-extrabold tracking-tighter text-[#141414]">52%</div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8A0000]">Postgraduate</div>
                </div>
                <div>
                  <div className="text-[28px] font-extrabold tracking-tighter text-[#141414]">48%</div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8A0000]">Undergraduate</div>
                </div>
                <div>
                  <div className="text-[28px] font-extrabold tracking-tighter text-[#141414]">11:1</div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8A0000]">Staff Ratio</div>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Research Growth */}
        <SectionDivider label="Research Growth" />

        <RevealSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="text-[28px] font-bold text-[#141414] tracking-tight mb-4">Trajectory of Discovery</h2>
              <p className="text-[14px] text-gray-500 leading-relaxed">
                Research expenditure has projected to grow sevenfold by 2030, fueled by cross-continental collaboration and the Artemis Commons digital infrastructure.
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="flex items-end gap-4 h-48">
                {researchGrowth.map((r, i) => {
                  const heights = [15, 45, 100];
                  return (
                    <div key={r.year} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-[13px] font-bold text-[#141414]">{r.value}</span>
                      <div
                        className="w-full bg-[#8A0000] rounded-t-sm transition-all duration-700"
                        style={{ height: `${heights[i]}%` }}
                      />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{r.year}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Financial Overview */}
        <SectionDivider label="Financial Overview" />

        <RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <StatBlock number="$18M" label="Total Revenue" detail="From tuition, grants, partnerships, and endowment returns" />
            <StatBlock number="$15M" label="Total Expenditure" detail="Across research, teaching, infrastructure, and digital estate" />
            <StatBlock number="$48M" label="Endowment" detail="Founding gifts and early endowment" />
          </div>
        </RevealSection>

        {/* Links */}
        <SectionDivider label="Resources" />

        <RevealSection>
          <div className="max-w-lg">
            <LinkRow label="Download factsheet (PDF)" onClick={() => {}} icon={<Download size={16} />} />
            <LinkRow label="Institutional research data" onClick={() => goToPage('research')} icon={<ExternalLink size={16} />} />
            <LinkRow label="Annual report 2024" onClick={() => {}} icon={<Download size={16} />} />
          </div>
        </RevealSection>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   ARTEMIS GLOSSARY PAGE
   ═══════════════════════════════════════════════════════ */
function ArtemisGlossary() {
  const terms = [
    { term: 'ACN', full: 'Artemis Collegium Network', def: 'The federated governance structure that unites all 20 micro-colleges under a single academic charter while preserving their institutional autonomy.' },
    { term: 'Guild System', full: 'Guild System', def: 'A professional affinity framework grouping scholars into cross-disciplinary guilds — Craft, Inquiry, Venture, and Civic — each with distinct rites of passage and mentorship structures.' },
    { term: 'Living Commons', full: 'Living Commons', def: 'Residential-learning hybrid spaces where scholars live, collaborate, and create together. Each commons is purpose-built around a thematic focus, from bio-ethics to quantum computation.' },
    { term: 'Homo Eruditus', full: 'Homo Eruditus', def: 'The Artemis ideal: the perpetually learning human. Our foundational philosophy holds that education is not a phase but an unbroken continuum of becoming.' },
    { term: 'Micro-College', full: 'Micro-College', def: 'A small, self-governing academic community of 200–800 scholars, each with a distinctive disciplinary or thematic identity. The primary unit of belonging at Artemis.' },
    { term: 'Node', full: 'Node', def: 'A physical or digital access point to the Artemis network. Every hub, commons, and virtual classroom is a node in the distributed university architecture.' },
    { term: 'Artemis Commons', full: 'Artemis Commons', def: 'The open digital platform providing virtual classrooms, research cloud, collaborative workspaces, and the Infinite Library — accessible to every Artemis scholar worldwide.' },
    { term: 'The Forge', full: 'The Forge', def: 'Artemis\'s venture incubation ecosystem. A structured programme that transforms research insights into viable enterprises, with dedicated seed funding and mentorship.' },
    { term: 'Nexus', full: 'Nexus', def: 'The annual gathering where all micro-colleges convene for a week of interdisciplinary exchange, presentations, and collective decision-making on university-wide matters.' },
    { term: 'Purpose Learning', full: 'Purpose Learning', def: 'Artemis\'s pedagogical framework that anchors every programme to a real-world challenge. Scholars declare a Purpose alongside their subject, ensuring study is never abstracted from impact.' },
    { term: 'Infinite Learning Continuum', full: 'Infinite Learning Continuum', def: 'The principle that Artemis enrolment is lifelong. Graduates retain full access to courses, research infrastructure, and community — learning does not end at degree conferral.' },
    { term: 'Capstone', full: 'Capstone', def: 'A culminating project or thesis that demonstrates mastery and purpose alignment. Required for all Artemis degrees, evaluated by cross-guild panels rather than single examiners.' },
    { term: 'Co-Design', full: 'Co-Design', def: 'The practice of involving scholars in shaping curriculum, governance, and campus experience. No major institutional decision is made without student representation in the process.' },
    { term: 'Digital Estate', full: 'Digital Estate', def: 'The entirety of Artemis\'s virtual infrastructure — from the Commons platform to research cloud, AI tutoring systems, and the distributed ledger for credential verification.' },
    { term: 'Guild Rite', full: 'Guild Rite', def: 'A milestone ceremony marking a scholar\'s progression within their guild. Rites are designed by guild members and celebrate growth, contribution, and readiness for new responsibilities.' },
    { term: 'The Infinite Library', full: 'The Infinite Library', def: 'A globally distributed digital repository of all Artemis research, course materials, and scholarly outputs. Open-access by default, it embodies the university\'s commitment to knowledge as a public good.' },
  ];

  return (
    <>
      <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24">
        <SectionDivider label="Core Terms" />

        {/* Glossary list */}
        <div className="space-y-0">
          {terms.map((t, i) => {
            const isCore = i < 8;
            return (
              <GlossaryEntry key={t.term} term={t.term} full={t.full} def={t.def} isCore={isCore} />
            );
          })}
        </div>

        <SectionDivider label="Philosophy & Practice" />

        <RevealSection>
          <div className="bg-gray-50 p-8 lg:p-12 rounded-lg">
            <RedAccentLabel text="On Language" />
            <p className="text-[15px] text-gray-600 leading-relaxed mb-6">
              The vocabulary of Artemis is intentionally distinct. Each term reflects a deliberate departure from traditional academic conventions — not for novelty&apos;s sake, but because the structures they describe are genuinely new. When we say &ldquo;micro-college&rdquo; instead of &ldquo;college,&rdquo; we are signalling a fundamentally different scale, governance model, and relationship between scholar and institution.
            </p>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              Language shapes thought. By articulating our structures with precision, we ensure that every member of the Artemis community shares a common understanding of what makes this university unlike any other.
            </p>
          </div>
        </RevealSection>
      </div>
    </>
  );
}

function GlossaryEntry({ term, full, def, isCore }: { term: string; full: string; def: string; isCore: boolean }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`border-b border-gray-100 py-6 grid grid-cols-1 lg:grid-cols-12 gap-4 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
    >
      <div className="lg:col-span-3 flex items-start gap-3">
        <span className={`shrink-0 w-2 h-2 rounded-full mt-2 ${isCore ? 'bg-[#8A0000]' : 'bg-gray-300'}`} />
        <div>
          <div className="text-[15px] font-extrabold text-[#141414]">{term}</div>
          <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 mt-0.5">{full}</div>
        </div>
      </div>
      <div className="lg:col-span-9">
        <p className="text-[14px] text-gray-600 leading-relaxed">{def}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   OUR ESTATE PAGE
   ═══════════════════════════════════════════════════════ */
function OurEstate({ goToPage }: { goToPage: (page: string) => void }) {
  const [activeHostelId, setActiveHostelId] = useState<string | null>(null);

  const estateHostels = [
    { id: 'valletta-estate', name: 'The Weavers Hall', city: 'Valletta', x: 52, y: 39, labelPos: 'right' as const, type: 'Commons Residence', desc: 'The heart of the Artemis Collegium. Weavers Hall anchors students in the art of community-building — where every corridor is a loom and every conversation a thread in something larger.' },
    { id: 'kigali-estate', name: 'Kepler House', city: 'Kigali', x: 57, y: 57, labelPos: 'right' as const, type: 'Scholar House', desc: 'Named for the astronomer who saw patterns in chaos. Kepler House is a haven for systems thinkers and sustainable innovators, overlooking the hills of Rwanda\'s innovation corridor.' },
    { id: 'berlin-estate', name: 'The Forge Lodge', city: 'Berlin', x: 52, y: 30, labelPos: 'right' as const, type: 'Guild Hall', desc: 'Where ideas are hammered into form. The Forge Lodge channels Berlin\'s creative raw energy into a guild of makers, artists, and provocateurs who believe the future is built, not predicted.' },
    { id: 'sf-estate', name: 'The Frontier Residence', city: 'San Francisco', x: 15, y: 37, labelPos: 'right' as const, type: 'Commons Residence', desc: 'Perched at the edge of the Pacific and the frontier of technology. Frontier residents are builders and dreamers who treat uncertainty as fuel and the unknown as home.' },
    { id: 'tokyo-estate', name: 'Sakura House', city: 'Tokyo', x: 85, y: 37, labelPos: 'left' as const, type: 'Scholar House', desc: 'A place of precision and contemplation. Sakura House bridges ancient craft and bleeding-edge technology, reflecting Tokyo\'s own duality — where temple gardens neighbour robotics labs.' },
    { id: 'reykjavik-estate', name: 'The Aurora Lodge', city: 'Reykjavik', x: 42, y: 17, labelPos: 'right' as const, type: 'Guild Hall', desc: 'The northernmost hostel in the network. Aurora Lodge is for those drawn to extremes — geothermal research, Arctic ecology, and the kind of clarity that only comes at the edge of the world.' },
    { id: 'singapore-estate', name: 'The Meridian Hall', city: 'Singapore', x: 77, y: 55, labelPos: 'left' as const, type: 'Commons Residence', desc: 'Where East meets West meets future. Meridian Hall is a crossroads — students here navigate cultural complexity with the same ease they navigate smart city infrastructure and digital governance.' },
    { id: 'saopaulo-estate', name: 'The Botanica House', city: 'São Paulo', x: 31, y: 66, labelPos: 'right' as const, type: 'Scholar House', desc: 'Rooted in the Atlantic Forest and the pulse of Latin America. Botanica House is for those who study life in all its forms — from biodiversity to social movements to the rhythms of the city.' },
    { id: 'oxford-estate', name: 'Bodley House', city: 'Oxford', x: 47, y: 27, labelPos: 'right' as const, type: 'Scholar House', desc: 'Inspired by Oxford\'s collegiate tradition, Bodley House is a micro-college within the Artemis network — a place of tutorials, common rooms, and the conviction that rigorous thought changes the world.' },
    { id: 'geneva-estate', name: 'The Calaton', city: 'Geneva', x: 49, y: 33, labelPos: 'right' as const, type: 'Guild Hall', desc: 'Overlooking Lake Geneva and the corridors of international power. The Calaton trains students in diplomacy, humanitarian policy, and the art of building institutions that outlast their founders.' },
    { id: 'nairobi-estate', name: 'The Rift Lodge', city: 'Nairobi', x: 56, y: 54, labelPos: 'right' as const, type: 'Commons Residence', desc: 'Built on the edge of the Great Rift Valley — a fitting metaphor. Rift Lodge is where students confront the deep fractures in global systems and learn to bridge them with technology and empathy.' },
    { id: 'mumbai-estate', name: 'The Gateway House', city: 'Mumbai', x: 68, y: 44, labelPos: 'left' as const, type: 'Guild Hall', desc: 'Named for the arch that welcomes travellers to India\'s greatest port city. Gateway House is a guild of entrepreneurs and social innovators who see opportunity where others see complexity.' },
    { id: 'seoul-estate', name: 'The Han Residence', city: 'Seoul', x: 82, y: 35, labelPos: 'left' as const, type: 'Scholar House', desc: 'Along the banks of the Han River, this hostel embodies Korea\'s blend of deep heritage and hyper-modernity. Han residents move between K-culture analysis and semiconductor design with equal fluency.' },
    { id: 'sydney-estate', name: 'The Southern Cross Lodge', city: 'Sydney', x: 87, y: 69, labelPos: 'left' as const, type: 'Commons Residence', desc: 'Guided by the constellation for which it\'s named. Southern Cross Lodge is the network\'s gateway to Oceania — a community of marine scientists, Indigenous knowledge holders, and adventurers.' },
    { id: 'capetown-estate', name: 'The Table Hall', city: 'Cape Town', x: 52, y: 71, labelPos: 'right' as const, type: 'Guild Hall', desc: 'In the shadow of Table Mountain, this guild hall brings together artists, activists, and architects. Table Hall is where the struggle for justice meets the craft of beautiful, lasting design.' },
    { id: 'buenosaires-estate', name: 'The Tango House', city: 'Buenos Aires', x: 28, y: 73, labelPos: 'right' as const, type: 'Scholar House', desc: 'A hostel that moves. Tango House takes its name from the dance — two partners, unpredictable, perfectly attuned. Students here study urban transformation, literature, and the politics of movement.' },
    { id: 'stockholm-estate', name: 'The Nordic Hall', city: 'Stockholm', x: 51, y: 22, labelPos: 'right' as const, type: 'Commons Residence', desc: 'Clean lines, clear thinking. Nordic Hall is a study in Scandinavian design principles applied to education — minimal waste, maximum wellbeing, and the quiet conviction that good systems produce good lives.' },
    { id: 'dubai-estate', name: 'The Oasis Lodge', city: 'Dubai', x: 61, y: 41, labelPos: 'left' as const, type: 'Guild Hall', desc: 'Rising from the desert, Oasis Lodge is a guild of futurists and financiers. Students here engage with global capital flows, urban megaprojects, and the ethics of building cities from nothing.' },
    { id: 'shanghai-estate', name: 'The Dragon Gate', city: 'Shanghai', x: 79, y: 39, labelPos: 'left' as const, type: 'Commons Residence', desc: 'At the mouth of the Yangtze, where tradition and velocity collide. Dragon Gate residents study manufacturing ecosystems, AI ethics, and the art of operating at unprecedented scale.' },
    { id: 'accra-estate', name: 'The Gold Coast House', city: 'Accra', x: 47, y: 51, labelPos: 'right' as const, type: 'Scholar House', desc: 'Reclaiming a colonial name with post-colonial ambition. Gold Coast House is a centre for Pan-African thought, digital sovereignty, and the creative industries reshaping West Africa\'s narrative.' },
    { id: 'lima-estate', name: 'The Andes Lodge', city: 'Lima', x: 22, y: 62, labelPos: 'right' as const, type: 'Guild Hall', desc: 'Where the Andes meet the Pacific. Andes Lodge is a guild of earth scientists, culinary innovators, and indigenous knowledge keepers — studying the deep time of landscapes and cultures.' },
    { id: 'montreal-estate', name: 'The Cartier House', city: 'Montreal', x: 24, y: 30, labelPos: 'right' as const, type: 'Scholar House', desc: 'A bilingual micro-college in the Francophone heart of North America. Cartier House bridges French and English intellectual traditions, with particular strength in AI research and philosophy of mind.' },
    { id: 'edinburgh-estate', name: 'The Arthur Seat Lodge', city: 'Edinburgh', x: 46, y: 25, labelPos: 'right' as const, type: 'Commons Residence', desc: 'Named for the ancient volcano at the city\'s heart. Arthur Seat Lodge is a community of storytellers, data scientists, and those who believe narrative and numbers are equally valid ways of knowing.' },
    { id: 'zagreb-estate', name: 'The Adriatic House', city: 'Zagreb', x: 52, y: 34, labelPos: 'left' as const, type: 'Guild Hall', desc: 'At the crossroads of Central Europe and the Mediterranean. Adriatic House is a guild of bridge-builders — students who navigate between cultures, systems, and histories with ease and intention.' },
  ];

  const activeHostel = useMemo(() => estateHostels.find(h => h.id === activeHostelId), [activeHostelId, estateHostels]);

  return (
    <>
      {/* ── Your World Expands ── */}
      <div className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
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
              alt="World Map — Artemis Estate Network"
              className="w-full h-auto pointer-events-none select-none opacity-80"
            />

            {/* Hostel Markers */}
            {estateHostels.map((hostel, index) => (
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
                  transition={{ type: 'spring', stiffness: 350, damping: 25, delay: index * 0.03 }}
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
                      <p className="text-gray-600 text-[14px] leading-relaxed">{activeHostel.desc}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Estate at a Glance ── */}
      <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24">
        <SectionDivider label="At a Glance" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          <StatBlock number="25,000" label="Sq Ft Research Space" detail="Across all physical hubs" />
          <StatBlock number="24" label="Residential Hostels" detail="Purpose-built living-learning communities across 6 continents" />
          <StatBlock number="8" label="Global Hubs" detail="Physical presence on every major continent" />
          <StatBlock number="99.9%" label="Uptime" detail="Digital platform availability, 2024" />
        </div>

        {/* Digital Estate */}
        <SectionDivider label="Digital Estate" />

        <RevealSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <h2 className="text-[28px] font-bold text-[#141414] tracking-tight mb-4">Artemis Commons</h2>
              <p className="text-[14px] text-gray-500 leading-relaxed mb-6">
                The digital backbone of the university. Artemis Commons is a distributed platform that ensures every scholar — regardless of location — has equal access to learning, research, and community.
              </p>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <DigitalEstateFeature
                icon={<Server size={20} />}
                title="Virtual Classrooms"
                desc="Immersive, low-latency learning spaces supporting real-time collaboration across time zones. Built on WebRTC with spatial audio for natural interaction."
              />
              <DigitalEstateFeature
                icon={<Globe size={20} />}
                title="Research Cloud"
                desc="A shared computational infrastructure providing GPU clusters, data lakes, and collaborative notebooks. Every researcher has equal allocation, regardless of hub."
              />
              <DigitalEstateFeature
                icon={<Building2 size={20} />}
                title="Infinite Library"
                desc="All Artemis research outputs, course materials, and scholarly works — open-access by default. Integrated AI-assisted discovery and citation tools."
              />
            </div>
          </div>
        </RevealSection>

        {/* Sustainability */}
        <SectionDivider label="Sustainability" />

        <RevealSection>
          <div className="bg-gray-50 p-8 lg:p-12 rounded-lg">
            <RedAccentLabel text="Carbon Negative by 2030" />
            <p className="text-[15px] text-gray-600 leading-relaxed mb-6">
              Artemis has committed to becoming carbon negative by 2030. Our distributed model inherently reduces the environmental cost of education — fewer daily commutes, shared digital infrastructure, and hubs designed to Passivhaus standards.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="border-l-2 border-[#8A0000] pl-4">
                <div className="text-[24px] font-extrabold text-[#141414]">72%</div>
                <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8A0000]">Renewable Energy</div>
                <div className="text-[12px] text-gray-500 mt-1">Across all hubs, 2024</div>
              </div>
              <div className="border-l-2 border-[#8A0000] pl-4">
                <div className="text-[24px] font-extrabold text-[#141414]">Zero</div>
                <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8A0000]">Single-Use Plastic</div>
                <div className="text-[12px] text-gray-500 mt-1">All campus operations</div>
              </div>
              <div className="border-l-2 border-[#8A0000] pl-4">
                <div className="text-[24px] font-extrabold text-[#141414]">1,200</div>
                <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8A0000]">Trees Planted</div>
                <div className="text-[12px] text-gray-500 mt-1">Via the Artemis Reforestation Trust</div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Links */}
        <SectionDivider label="Explore" />

        <RevealSection>
          <div className="max-w-lg">
            <LinkRow label="Campus maps" onClick={() => goToPage('campus')} icon={<MapPin size={16} />} />
            <LinkRow label="Hub details and directions" onClick={() => goToPage('estate')} icon={<ExternalLink size={16} />} />
            <LinkRow label="Digital platform access" onClick={() => {}} icon={<Globe size={16} />} />
            <LinkRow label="Sustainability plan 2024–2030" onClick={() => {}} icon={<Download size={16} />} />
          </div>
        </RevealSection>
      </div>
    </>
  );
}

function HubCard({ hub }: { hub: { name: string; location: string; desc: string; img: string } }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`group rounded-lg overflow-hidden border border-gray-100 hover:border-[#8A0000] transition-all duration-500 hover:shadow-lg ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={hub.img}
          alt={hub.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <MapPin size={14} className="text-[#8A0000]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8A0000]">{hub.location}</span>
        </div>
        <h3 className="text-[17px] font-bold text-[#141414] mb-2">{hub.name}</h3>
        <p className="text-[13px] text-gray-500 leading-relaxed">{hub.desc}</p>
      </div>
    </div>
  );
}

function DigitalEstateFeature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex gap-4 p-6 bg-gray-50 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 transition-all">
      <div className="shrink-0 text-[#8A0000] mt-1">{icon}</div>
      <div>
        <h4 className="text-[15px] font-bold text-[#141414] mb-1">{title}</h4>
        <p className="text-[13px] text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   BRAND PAGE
   ═══════════════════════════════════════════════════════ */
function Brand({ goToPage }: { goToPage: (page: string) => void }) {
  const colors = [
    { hex: '#8A0000', name: 'Crimson', role: 'Primary accent. Used for emphasis, links, markers, and interactive elements.' },
    { hex: '#141414', name: 'Near-Black', role: 'Strong headings, body emphasis, and structural text.' },
    { hex: '#FFFFFF', name: 'White', role: 'Primary background. Clean, expansive, and authoritative.' },
    { hex: '#F3F4F6', name: 'Gray-100', role: 'Secondary backgrounds, cards, and subtle separation.' },
    { hex: '#6B7280', name: 'Gray-500', role: 'Body text, descriptions, and supporting content.' },
  ];

  const typography = [
    { label: 'Display', style: 'text-[48px] lg:text-[64px] font-extrabold tracking-tighter uppercase', example: 'ARTEMIS' },
    { label: 'Heading', style: 'text-[28px] font-bold tracking-tight', example: 'Section Title' },
    { label: 'Subheading', style: 'text-[17px] font-bold', example: 'Content Subheading' },
    { label: 'Body', style: 'text-[15px] text-gray-600 leading-relaxed', example: 'Running text for paragraphs and descriptions.' },
    { label: 'Label', style: 'text-[12px] font-bold uppercase tracking-[0.2em]', example: 'SECTION LABEL' },
  ];

  return (
    <>
      <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24">
        {/* Brand Philosophy */}
        <SectionDivider label="Brand Philosophy" />

        <RevealSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="text-[28px] font-bold text-[#141414] tracking-tight mb-4">Clarity Over Cleverness</h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-[15px] text-gray-600 leading-relaxed mb-6">
                The Artemis brand speaks with the authority of an institution that has earned its confidence. We do not shout; we state. We do not decorate; we distill. Every visual and verbal choice reflects the university&apos;s commitment to substance over spectacle.
              </p>
              <p className="text-[15px] text-gray-600 leading-relaxed mb-6">
                Our identity is built on three pillars: <strong className="text-[#141414]">Conviction</strong> — we believe in the transformative power of education; <strong className="text-[#141414]">Inclusivity</strong> — knowledge belongs to everyone; and <strong className="text-[#141414]">Precision</strong> — we choose every word and pixel with intention.
              </p>
              <p className="text-[15px] text-gray-600 leading-relaxed">
                The crimson accent is not decorative. It is directional — guiding attention, marking significance, and providing continuity across every touchpoint of the Artemis experience.
              </p>
            </div>
          </div>
        </RevealSection>

        {/* Color Palette */}
        <SectionDivider label="Color Palette" />

        <RevealSection>
          <div className="space-y-6">
            {colors.map((c) => (
              <div key={c.hex} className="flex items-center gap-6 py-4 border-b border-gray-100">
                <div
                  className="w-16 h-16 rounded-lg shrink-0 border border-gray-100"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[15px] font-bold text-[#141414]">{c.name}</span>
                    <span className="text-[12px] font-mono text-gray-400">{c.hex}</span>
                  </div>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{c.role}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* Typography */}
        <SectionDivider label="Typography" />

        <RevealSection>
          <div className="space-y-8">
            {typography.map((t) => (
              <div key={t.label} className="border-b border-gray-100 pb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A0000]">{t.label}</span>
                </div>
                <div className={t.style}>{t.example}</div>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* Logo Usage */}
        <SectionDivider label="Logo Usage" />

        <RevealSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="text-[28px] font-bold text-[#141414] tracking-tight mb-4">The Artemis Wordmark</h2>
              <p className="text-[14px] text-gray-500 leading-relaxed">
                The Artemis wordmark is always set in uppercase with extra-bold weight and tight tracking. It never appears in lowercase, never in italics, and never with effects or gradients.
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-6">
                {/* Correct usage */}
                <div className="p-8 bg-gray-50 rounded-lg border-2 border-green-100">
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-green-700 mb-4">Correct Usage</div>
                  <div className="text-[36px] font-extrabold tracking-tighter text-[#141414] uppercase mb-2">ARTEMIS</div>
                  <p className="text-[12px] text-gray-500">Uppercase, extra-bold, tight tracking, on white or light backgrounds.</p>
                </div>
                {/* Incorrect usage */}
                <div className="p-8 bg-gray-50 rounded-lg border-2 border-red-100">
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A0000] mb-4">Incorrect Usage</div>
                  <div className="space-y-3">
                    <div className="text-[36px] font-light tracking-widest text-gray-300 italic lowercase">artemis</div>
                    <p className="text-[12px] text-gray-500">Never use lowercase, light weight, wide tracking, or italics.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Tone of Voice */}
        <SectionDivider label="Tone of Voice" />

        <RevealSection>
          <div className="bg-gray-50 p-8 lg:p-12 rounded-lg">
            <RedAccentLabel text="Writing as Artemis" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mt-6">
              <div>
                <h4 className="text-[15px] font-bold text-[#141414] mb-3">We Are</h4>
                <ul className="space-y-2 text-[14px] text-gray-600">
                  <li className="flex items-start gap-2"><span className="text-[#8A0000] mt-0.5">•</span> Confident but never arrogant</li>
                  <li className="flex items-start gap-2"><span className="text-[#8A0000] mt-0.5">•</span> Precise but never cold</li>
                  <li className="flex items-start gap-2"><span className="text-[#8A0000] mt-0.5">•</span> Ambitious but never grandiose</li>
                  <li className="flex items-start gap-2"><span className="text-[#8A0000] mt-0.5">•</span> Inclusive but never vague</li>
                  <li className="flex items-start gap-2"><span className="text-[#8A0000] mt-0.5">•</span> Direct but never blunt</li>
                </ul>
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-[#141414] mb-3">We Are Not</h4>
                <ul className="space-y-2 text-[14px] text-gray-600">
                  <li className="flex items-start gap-2"><span className="text-gray-300 mt-0.5">•</span> Hyperbolic or sales-driven</li>
                  <li className="flex items-start gap-2"><span className="text-gray-300 mt-0.5">•</span> Exclusionary or elitist</li>
                  <li className="flex items-start gap-2"><span className="text-gray-300 mt-0.5">•</span> Flippant or irreverent</li>
                  <li className="flex items-start gap-2"><span className="text-gray-300 mt-0.5">•</span> Jargon-heavy without explanation</li>
                  <li className="flex items-start gap-2"><span className="text-gray-300 mt-0.5">•</span> Passive or non-committal</li>
                </ul>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Download Links */}
        <SectionDivider label="Brand Assets" />

        <RevealSection>
          <div className="max-w-lg">
            <LinkRow label="Download logo pack (SVG + PNG)" onClick={() => {}} icon={<Download size={16} />} />
            <LinkRow label="Brand guidelines PDF" onClick={() => {}} icon={<Download size={16} />} />
            <LinkRow label="Web style guide" onClick={() => {}} icon={<ExternalLink size={16} />} />
            <LinkRow label="Editorial guidelines" onClick={() => {}} icon={<Download size={16} />} />
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-[14px] text-gray-500 leading-relaxed mb-4">
              For brand enquiries or partnership usage requests:
            </p>
            <button
              onClick={() => goToPage('contact-us')}
              className="text-[14px] font-bold text-[#8A0000] border-b-2 border-[#8A0000] pb-0.5 hover:text-[#6B0000] hover:border-[#6B0000] transition-colors"
            >
              Contact the Brand Team
            </button>
          </div>
        </RevealSection>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function GenericUniversitySubpage({ goToPage, title, parentTitle, parentId }: Props) {
  const heroImages: Record<string, { image: string; label: string }> = {
    'Facts and figures': { image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1800', label: 'By the Numbers' },
    'Artemis Glossary': { image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1800', label: 'Definitions' },
    'Our estate': { image: 'https://images.unsplash.com/photo-1634947101456-d40e5122b048?auto=format&fit=crop&q=80&w=1800', label: 'Infrastructure' },
    'Brand': { image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=1800', label: 'Visual Identity' },
  };
  const heroConfig = heroImages[title];

  return (
    <div className="flex flex-col bg-white">
      {/* Hero Image */}
      {heroConfig && (
        <section className="relative w-full overflow-hidden">
          <div className="max-w-[1600px] mx-auto">
            <div className="relative w-full h-[45vh] min-h-[360px] overflow-hidden">
          <img src={heroConfig.image} className="absolute inset-0 w-full h-full object-cover grayscale" alt={title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-8 lg:px-20 pb-16">
            <div className="mb-8 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">{heroConfig.label}</span>
            </div>
            <h1 className="text-[44px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6 uppercase">{title}</h1>
          </div>
            </div>
          </div>
        </section>
      )}

      {/* Page Content — switched by title */}
      {title === 'Facts and figures' && <FactsAndFigures goToPage={goToPage} />}
      {title === 'Artemis Glossary' && <ArtemisGlossary />}
      {title === 'Our estate' && <OurEstate goToPage={goToPage} />}
      {title === 'Brand' && <Brand goToPage={goToPage} />}

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
