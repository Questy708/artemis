'use client';

import React, { useState, useEffect, useRef } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, MapPin, Building2, Users, BookOpen,
  FlaskConical, Globe, Shield, Star, Crown, Mail,
  Scale, Brain, Cpu, GraduationCap, Briefcase,
  Gavel, Stethoscope, Atom, Search, Filter, X, ChevronDown,
  Clock, UsersRound, ArrowUpRight
} from 'lucide-react';

interface Props {
  goToPage: (page: string) => void;
}

/* ─── Hooks ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Data ─── */
const COMPENSATION_TABLE = [
  { title: 'Distinguished Professor', base: '$36,000/yr', london: '$48,600', nairobi: '$37,800', kampala: '$36,000' },
  { title: 'Professor', base: '$30,000/yr', london: '$40,500', nairobi: '$31,500', kampala: '$30,000' },
  { title: 'Associate Professor', base: '$24,000/yr', london: '$32,400', nairobi: '$25,200', kampala: '$24,000' },
  { title: 'Assistant Professor', base: '$18,000/yr', london: '$24,300', nairobi: '$18,900', kampala: '$18,000' },
  { title: 'Assistant Teaching Professor', base: '$12,000/yr', london: '$16,200', nairobi: '$12,600', kampala: '$12,000' },
];

const DIVISIONS = [
  { id: 'div-i', numeral: 'I', title: 'Humanities & Social Sciences', fields: ['Philosophy & Ethics', 'History & Cultural Studies', 'Economics & Political Economy', 'Sociology & Anthropology', 'Languages, Literature & Translation', 'Media & Communications'], icon: Scale, color: '#8A0000', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800' },
  { id: 'div-ii', numeral: 'II', title: 'Natural Sciences & Mathematics', fields: ['Mathematics & Statistics', 'Physics & Astronomy', 'Chemistry & Materials', 'Earth & Environmental Sciences'], icon: Atom, color: '#6B0000', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800' },
  { id: 'div-iii', numeral: 'III', title: 'Engineering & Technology', fields: ['Computer Science & AI', 'Engineering Sciences', 'Biomedical Engineering'], icon: Cpu, color: '#4a0e0e', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800' },
  { id: 'div-iv', numeral: 'IV', title: 'Business, Policy & Global Affairs', fields: ['Business & Entrepreneurship', 'Policy, Governance & International Affairs', 'Law & Justice'], icon: Gavel, color: '#3d0808', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800' },
  { id: 'div-v', numeral: 'V', title: 'Health & Life Sciences', fields: ['Biological Sciences', 'Public Health & Epidemiology', 'Psychology & Cognitive Sciences'], icon: Stethoscope, color: '#2d0505', image: 'https://images.unsplash.com/photo-1579165466949-3180a3d056d5?auto=format&fit=crop&q=80&w=800' },
];

const COLLEGE_LOCATIONS = [
  { city: 'Venice', tier: 'Central Node' }, { city: 'Valletta', tier: 'Central Node' }, { city: 'San Juan', tier: 'Central Node' },
  { city: 'London', tier: 'Tier A' }, { city: 'Tokyo', tier: 'Tier A' }, { city: 'Singapore', tier: 'Tier A' },
  { city: 'São Paulo', tier: 'Tier A' }, { city: 'Seoul', tier: 'Tier A' }, { city: 'Sydney', tier: 'Tier A' },
  { city: 'Tel Aviv', tier: 'Tier A' }, { city: 'Dubai', tier: 'Tier A' }, { city: 'Berlin', tier: 'Tier A' },
  { city: 'Toronto', tier: 'Tier A' }, { city: 'Hong Kong', tier: 'Tier A' }, { city: 'Cape Town', tier: 'Tier A' },
  { city: 'Nairobi', tier: 'Tier B' }, { city: 'Bangkok', tier: 'Tier B' }, { city: 'Istanbul', tier: 'Tier B' },
  { city: 'Mexico City', tier: 'Tier B' }, { city: 'Buenos Aires', tier: 'Tier B' }, { city: 'Casablanca', tier: 'Tier B' },
  { city: 'Kuala Lumpur', tier: 'Tier B' }, { city: 'Accra', tier: 'Tier B' }, { city: 'Medellín', tier: 'Tier B' },
  { city: 'Kigali', tier: 'Tier C' }, { city: 'Dhaka', tier: 'Tier C' }, { city: 'Kampala', tier: 'Tier C' },
  { city: 'Karachi', tier: 'Tier C' }, { city: 'Addis Ababa', tier: 'Tier C' }, { city: 'Colombo', tier: 'Tier C' },
  { city: 'Lusaka', tier: 'Tier C' }, { city: 'Kathmandu', tier: 'Tier C' }, { city: 'Bishkek', tier: 'Tier C' },
];

/* ─── Job Listings ─── */
const JOB_LISTINGS = [
  {
    id: 'dh-div-i',
    title: 'Division Head — Humanities & Social Sciences',
    rank: 'Distinguished Professor',
    division: 'div-i',
    type: 'Full-time · Permanent',
    locations: ['Venice', 'London', 'Berlin'],
    description: 'Lead Division I across 50 Colleges and 6 continents. Set the intellectual direction for 6 Centers of Inquiry, 16 programs, and ~400 faculty spanning philosophy, history, economics, sociology, languages, and media. You will define what human understanding means at a university designed from first principles.',
    responsibilities: [
      'Define and execute the intellectual vision for Division I across all 50 Colleges',
      'Recruit and mentor ~400 faculty across 6 fields and 6 Centers of Inquiry',
      'Oversee curriculum design for 16 undergraduate programs',
      'Represent the Division to the President, Board, and external partners',
      'Chair the Division I Faculty Council and Center Director meetings',
    ],
    requirements: [
      'Distinguished record of scholarship in a Division I field',
      'Senior academic leadership experience (dean, department chair, or equivalent)',
      'Demonstrated commitment to interdisciplinary and global education',
      'Willingness to travel extensively across Artemis College locations',
    ],
    stipend: '$36,000/yr base (location-adjusted)',
    reports: 'President',
    open: 1,
  },
  {
    id: 'dh-div-ii',
    title: 'Division Head — Natural Sciences & Mathematics',
    rank: 'Distinguished Professor',
    division: 'div-ii',
    type: 'Full-time · Permanent',
    locations: ['Venice', 'Tokyo', 'Singapore'],
    description: 'Lead Division II — the engine of how civilization understands what IS. Oversee 4 Centers of Inquiry, 10 programs, and ~400 faculty in mathematics, physics, chemistry, and environmental sciences. Build research infrastructure from scratch across 35 countries.',
    responsibilities: [
      'Define and execute the intellectual vision for Division II across all 50 Colleges',
      'Recruit and mentor ~400 faculty across 4 fields and 4 Centers of Inquiry',
      'Establish laboratory and research protocols for a distributed global network',
      'Build partnerships with international research institutions and observatories',
      'Chair the Division II Faculty Council and Center Director meetings',
    ],
    requirements: [
      'Distinguished record of scholarship in a Division II field',
      'Senior academic leadership experience in the natural sciences',
      'Experience building or scaling research operations',
      'Commitment to open science and public-access research models',
    ],
    stipend: '$36,000/yr base (location-adjusted)',
    reports: 'President',
    open: 1,
  },
  {
    id: 'dh-div-iii',
    title: 'Division Head — Engineering & Technology',
    rank: 'Distinguished Professor',
    division: 'div-iii',
    type: 'Full-time · Permanent',
    locations: ['Venice', 'Seoul', 'Toronto'],
    description: 'Lead the largest Division at Artemis — Engineering & Technology. With ~25,000 students, this division drives the future of computing, engineering, and biomedical innovation. Build the programs and research centers that will shape the next generation of technologists.',
    responsibilities: [
      'Define and execute the intellectual vision for Division III across all 50 Colleges',
      'Recruit and mentor ~400 faculty across 3 fields and 3 Centers of Inquiry',
      'Design curricula for 10 programs spanning AI, engineering, and biomedicine',
      'Establish innovation pipelines connecting research to real-world applications',
      'Chair the Division III Faculty Council and Center Director meetings',
    ],
    requirements: [
      'Distinguished record of scholarship in engineering, CS, or related field',
      'Senior academic leadership experience in technology education',
      'Experience with industry-academia partnerships and technology transfer',
      'Commitment to accessible, global technology education',
    ],
    stipend: '$36,000/yr base (location-adjusted)',
    reports: 'President',
    open: 1,
  },
  {
    id: 'dh-div-iv',
    title: 'Division Head — Business, Policy & Global Affairs',
    rank: 'Distinguished Professor',
    division: 'div-iv',
    type: 'Full-time · Permanent',
    locations: ['Venice', 'London', 'Dubai'],
    description: 'Lead Division IV — where civilization learns to organize itself. Business, governance, law, and policy across 50 Colleges. Build the programs that train the people who run the world to run it better.',
    responsibilities: [
      'Define and execute the intellectual vision for Division IV across all 50 Colleges',
      'Recruit and mentor ~400 faculty across 3 fields and 3 Centers of Inquiry',
      'Design curricula for 10 programs in business, policy, and law',
      'Build relationships with governments, NGOs, and global institutions',
      'Chair the Division IV Faculty Council and Center Director meetings',
    ],
    requirements: [
      'Distinguished record of scholarship in business, policy, law, or related field',
      'Senior academic leadership and policy experience',
      'Global perspective with experience across multiple jurisdictions',
      'Commitment to training leaders for public service and governance',
    ],
    stipend: '$36,000/yr base (location-adjusted)',
    reports: 'President',
    open: 1,
  },
  {
    id: 'dh-div-v',
    title: 'Division Head — Health & Life Sciences',
    rank: 'Distinguished Professor',
    division: 'div-v',
    type: 'Full-time · Permanent',
    locations: ['Venice', 'Cape Town', 'Nairobi'],
    description: 'Lead Division V — the oldest question in civilization: how do we stay alive? Build research and teaching programs across biological sciences, public health, and cognitive sciences that serve 100,000 students in 35 countries, most of them in the Global South.',
    responsibilities: [
      'Define and execute the intellectual vision for Division V across all 50 Colleges',
      'Recruit and mentor ~400 faculty across 3 fields and 3 Centers of Inquiry',
      'Design curricula for 9 programs spanning biology, public health, and psychology',
      'Build partnerships with WHO, national health systems, and research hospitals',
      'Chair the Division V Faculty Council and Center Director meetings',
    ],
    requirements: [
      'Distinguished record of scholarship in health, life sciences, or related field',
      'Senior academic leadership experience in health or life sciences education',
      'Experience with global health systems and epidemiological research',
      'Commitment to health equity and access in the developing world',
    ],
    stipend: '$36,000/yr base (location-adjusted)',
    reports: 'President',
    open: 1,
  },
  {
    id: 'prof-center',
    title: 'Professor & Center Director',
    rank: 'Professor',
    division: 'all',
    type: 'Full-time · Permanent',
    locations: ['Multiple locations across 35 countries'],
    description: 'Lead one of 19 Centers of Inquiry — a permanently endowed research operation with a 20-year runway and the freedom to pursue truth without institutional pressure. Build a world-class research team from scratch. Define the questions your Center will answer for civilization.',
    responsibilities: [
      'Establish and lead a Center of Inquiry with a 20-year research runway',
      'Recruit and mentor research faculty and graduate students',
      'Design and execute a multi-year research agenda',
      'Publish and disseminate research through the Artemis Press and global channels',
      'Manage Center budget, partnerships, and external collaborations',
    ],
    requirements: [
      'Outstanding research record in a relevant field',
      'Experience leading research teams or centers',
      'Vision for a long-term research program that addresses fundamental questions',
      'Commitment to open knowledge (7-year public domain rule)',
    ],
    stipend: '$30,000/yr base (location-adjusted)',
    reports: 'Division Head',
    open: 15,
  },
  {
    id: 'assoc-prof',
    title: 'Associate Professor',
    rank: 'Associate Professor',
    division: 'all',
    type: 'Full-time · Permanent',
    locations: ['Multiple locations across 35 countries'],
    description: 'Anchor the research output of your Division and mentor the next generation of scholars. Balance independent research with teaching and student supervision in the Oxford tutorial model. Senior scholars who combine research excellence with a passion for teaching.',
    responsibilities: [
      'Conduct and publish independent research within your Center of Inquiry',
      'Teach tutorials and seminars in the Oxford model (small groups, not lectures)',
      'Mentor junior faculty and supervise student research projects',
      'Contribute to curriculum development within your Division',
      'Participate in College governance and academic committees',
    ],
    requirements: [
      'Strong research and publication record in your field',
      'Teaching experience at the university level',
      'Ability to mentor and develop early-career scholars',
      'Commitment to interdisciplinary collaboration',
    ],
    stipend: '$24,000/yr base (location-adjusted)',
    reports: 'Center Director',
    open: 50,
  },
  {
    id: 'asst-prof',
    title: 'Assistant Professor — Research Faculty',
    rank: 'Assistant Professor',
    division: 'all',
    type: 'Full-time · Permanent',
    locations: ['Multiple locations across 35 countries'],
    description: 'Research faculty on the front lines of inquiry. Protected research time with no more than 40% teaching load. Join a Center of Inquiry with a 20-year runway and the freedom to pursue questions that matter. Build your career at a university where research comes first.',
    responsibilities: [
      'Conduct original research as a member of a Center of Inquiry',
      'Teach a limited load of tutorials (no more than 40% of your time)',
      'Publish findings through open-access and traditional channels',
      'Collaborate with faculty across Divisions and Colleges',
      'Supervise undergraduate and graduate research projects',
    ],
    requirements: [
      'PhD or equivalent terminal degree (completed or expected within 12 months)',
      'Demonstrated research potential through publications, preprints, or projects',
      'Ability to teach effectively in a tutorial-based model',
      'Willingness to relocate to one of 50 College locations',
    ],
    stipend: '$18,000/yr base (location-adjusted)',
    reports: 'Center Director',
    open: 370,
  },
  {
    id: 'atp',
    title: 'Assistant Teaching Professor',
    rank: 'Assistant Teaching Professor',
    division: 'all',
    type: 'Full-time · Permanent',
    locations: ['Multiple locations across 35 countries'],
    description: 'The backbone of the Oxford model at Artemis. Tutorial leaders. Student advisors. Pedagogical innovators. First-class citizens — with your own promotion ladder, research allowances, and governance rights. This is not a second-tier position. It is the position that makes the university work.',
    responsibilities: [
      'Lead tutorials in your subject area (the core teaching method at Artemis)',
      'Serve as Director of Studies for assigned students, guiding their academic path',
      'Develop innovative pedagogical approaches for diverse, global student cohorts',
      'Participate in College life as a full academic community member',
      'Contribute to curriculum design and assessment within your Division',
      'Pursue pedagogical research and scholarship of teaching',
    ],
    requirements: [
      'Masters degree or higher in your field (PhD preferred but not required)',
      'Teaching experience, ideally in small-group or tutorial settings',
      'Passion for student development and academic mentoring',
      'Ability to work across cultural contexts with students from 35+ countries',
      'Commitment to pedagogical innovation and continuous improvement',
    ],
    stipend: '$12,000/yr base (location-adjusted)',
    reports: 'College Director of Studies',
    open: 1560,
  },
];

const BENEFITS = [
  { icon: Globe, title: 'A mission that matters', desc: '200 million people are qualified for university and will never attend. You will change that number.' },
  { icon: Shield, title: 'Academic freedom', desc: 'No department politics. No tenure committee. No grant cycle. Your Center has a 20-year runway.' },
  { icon: GraduationCap, title: 'The Oxford model, global', desc: 'Tutorials, not lectures. Small groups, not auditoriums. Each student has a named Director of Studies.' },
  { icon: MapPin, title: '50 locations', desc: 'Venice. Tokyo. Nairobi. Kigali. Every College is a real place in a real city — not a Zoom room with a logo.' },
  { icon: Briefcase, title: 'Lean operations', desc: 'No bureaucracy. No committees. No deans who don\'t teach. Just scholars, students, and a mission.' },
];

/* ─── Rank badge color helper ─── */
function rankColor(rank: string) {
  if (rank === 'Distinguished Professor') return { bg: 'bg-[#8A0000]', text: 'text-white' };
  if (rank === 'Professor') return { bg: 'bg-[#6B0000]', text: 'text-white' };
  if (rank === 'Associate Professor') return { bg: 'bg-[#4a0e0e]', text: 'text-white' };
  if (rank === 'Assistant Professor') return { bg: 'bg-[#8A0000]/10', text: 'text-[#8A0000]' };
  return { bg: 'bg-gray-100', text: 'text-gray-600' };
}

/* ─── Main Component ─── */
export default function CareersPage({ goToPage }: Props) {
  const activeSection = useActiveSection(['positions', 'compensation', 'divisions', 'locations', 'benefits', 'apply']);
  const [divisionFilter, setDivisionFilter] = useState<string>('all');
  const [selectedJob, setSelectedJob] = useState<string>(JOB_LISTINGS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileDetail, setMobileDetail] = useState<string | null>(null);

  const heroAnim = useInView(0);
  const posAnim = useInView(0);
  const compAnim = useInView(0);
  const divAnim = useInView(0);
  const locAnim = useInView(0);
  const benAnim = useInView(0);
  const applyAnim = useInView(0);

  const filteredJobs = JOB_LISTINGS.filter(job => {
    const matchesDivision = divisionFilter === 'all' || job.division === 'all' || job.division === divisionFilter;
    const matchesSearch = searchQuery === '' ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.rank.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDivision && matchesSearch;
  });

  const activeJob = JOB_LISTINGS.find(j => j.id === selectedJob) || JOB_LISTINGS[0];

  return (
    <div className="flex flex-col bg-white w-full">

      {/* ══════════════════════════════════════════
          1. HERO
          ══════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[45vh] min-h-[360px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1800"
              alt="Work at Artemis"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-16">
              <div ref={heroAnim.ref} className={`transition-all duration-700 ${heroAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="mb-6 flex items-center space-x-3">
                  <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">2,000 Positions · 50 Colleges · 35 Countries</span>
                </div>
                <h1 className="text-[32px] sm:text-[48px] md:text-[64px] font-extrabold leading-[1.05] tracking-tighter text-white mb-5">
                  Work at Artemis
                </h1>
                <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light">
                  Faculty positions across five divisions. A university built from first principles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OnThisPageNav
        sections={[
          { id: 'positions', label: 'Open Positions' },
          { id: 'compensation', label: 'Compensation' },
          { id: 'divisions', label: 'Divisions' },
          { id: 'locations', label: 'Locations' },
          { id: 'benefits', label: 'Benefits' },
          { id: 'apply', label: 'How to Apply' },
        ]}
        activeSection={activeSection}
      />

      {/* ══════════════════════════════════════════
          2. OPEN POSITIONS — Split-View Job Board
          ══════════════════════════════════════════ */}
      <section id="positions" className="scroll-mt-[110px] w-full bg-white">
        <div ref={posAnim.ref} className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20 py-16 lg:py-24">
          {/* Section header */}
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Open Positions</span>
          </div>
          <h2 className="text-[28px] sm:text-[38px] lg:text-[46px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            2,000 faculty positions
          </h2>
          <p className="text-[17px] text-gray-600 leading-[1.75] max-w-2xl mb-10">
            We are hiring faculty to build the University of Artemis from scratch — every lecture, every tutorial, every Center of Inquiry launched with nothing but a mission and a 20-year runway.
          </p>

          {/* Search + Filter bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search positions..."
                className="w-full pl-11 pr-4 py-3 border border-gray-200 bg-white text-[14px] focus:outline-none focus:border-[#8A0000] transition-colors"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setDivisionFilter('all')}
                className={`px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider border transition-colors ${divisionFilter === 'all' ? 'bg-[#8A0000] text-white border-[#8A0000]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#8A0000] hover:text-[#8A0000]'}`}
              >
                All Divisions
              </button>
              {DIVISIONS.map((div) => (
                <button
                  key={div.id}
                  onClick={() => setDivisionFilter(div.id)}
                  className={`px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider border transition-colors ${divisionFilter === div.id ? 'bg-[#8A0000] text-white border-[#8A0000]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#8A0000] hover:text-[#8A0000]'}`}
                >
                  Div {div.numeral}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6 text-[12px] font-bold uppercase tracking-widest text-gray-400">
            {filteredJobs.length} position{filteredJobs.length !== 1 ? 's' : ''} found
          </div>

          {/* ═══ SPLIT VIEW: List + Detail ═══ */}
          {/* Desktop layout */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-0 border border-gray-200">
            {/* LEFT — Job List */}
            <div className="col-span-5 border-r border-gray-200 max-h-[820px] overflow-y-auto">
              {filteredJobs.map((job) => {
                const isActive = selectedJob === job.id;
                const rc = rankColor(job.rank);
                return (
                  <button
                    key={job.id}
                    onClick={() => setSelectedJob(job.id)}
                    className={`w-full text-left p-6 border-b border-gray-100 transition-all group ${isActive ? 'bg-[#8A0000]/[0.03] border-l-2 border-l-[#8A0000]' : 'border-l-2 border-l-transparent hover:bg-gray-50'}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className={`text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 ${rc.bg} ${rc.text}`}>{job.rank}</span>
                          {job.open > 1 && (
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8A0000]">{job.open} openings</span>
                          )}
                        </div>
                        <h3 className={`text-[15px] font-bold leading-snug mb-1.5 ${isActive ? 'text-[#8A0000]' : 'text-[#141414] group-hover:text-[#8A0000]'} transition-colors`}>
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-[12px] text-gray-500">
                          <span className="flex items-center gap-1"><MapPin size={11} /> {job.locations.slice(0, 2).join(', ')}</span>
                          <span className="flex items-center gap-1"><Briefcase size={11} /> {job.stipend}</span>
                        </div>
                      </div>
                      <ArrowUpRight size={14} className={`shrink-0 mt-1 transition-colors ${isActive ? 'text-[#8A0000]' : 'text-gray-300 group-hover:text-[#8A0000]'}`} />
                    </div>
                  </button>
                );
              })}
              {filteredJobs.length === 0 && (
                <div className="p-12 text-center">
                  <p className="text-[15px] text-gray-400">No positions match your search.</p>
                </div>
              )}
            </div>

            {/* RIGHT — Job Detail */}
            <div className="col-span-7 p-8 sm:p-10 max-h-[820px] overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeJob.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  {/* Detail header */}
                  <div className="mb-8 pb-6 border-b border-gray-100">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 ${rankColor(activeJob.rank).bg} ${rankColor(activeJob.rank).text}`}>{activeJob.rank}</span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{activeJob.type}</span>
                      {activeJob.open > 1 && (
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A0000] bg-[#8A0000]/5 px-2 py-0.5">{activeJob.open} openings</span>
                      )}
                    </div>
                    <h3 className="text-[22px] sm:text-[26px] font-extrabold text-[#141414] leading-tight mb-3">
                      {activeJob.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-[13px] text-gray-500">
                      <span className="flex items-center gap-1.5"><MapPin size={13} /> {activeJob.locations.join(', ')}</span>
                      <span className="flex items-center gap-1.5"><Briefcase size={13} /> {activeJob.stipend}</span>
                      <span className="flex items-center gap-1.5"><UsersRound size={13} /> Reports to {activeJob.reports}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[15px] sm:text-[16px] leading-[1.8] text-gray-600 mb-8">{activeJob.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Responsibilities */}
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A0000] mb-4">Key Responsibilities</h4>
                      <ul className="space-y-3">
                        {activeJob.responsibilities.map((r, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 bg-[#8A0000] rounded-full shrink-0 mt-2"></span>
                            <span className="text-[13px] sm:text-[14px] text-gray-600 leading-[1.6]">{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A0000] mb-4">Qualifications</h4>
                      <ul className="space-y-3">
                        {activeJob.requirements.map((r, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full shrink-0 mt-2"></span>
                            <span className="text-[13px] sm:text-[14px] text-gray-600 leading-[1.6]">{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Apply CTA */}
                  <div className="mt-10 pt-6 border-t border-gray-100">
                    <a
                      href={`mailto:faculty@artemisui.org?subject=Application: ${activeJob.title}`}
                      className="inline-flex items-center gap-3 px-8 py-4 bg-[#8A0000] text-white text-[12px] font-bold uppercase tracking-[0.25em] hover:bg-[#6B0000] transition-colors group"
                    >
                      <span>Apply Now</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <p className="text-[12px] text-gray-400 mt-3">Send your manifesto to faculty@artemisui.org</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ═══ MOBILE layout — card list with expand ═══ */}
          <div className="lg:hidden space-y-3">
            {filteredJobs.map((job) => {
              const isExpanded = mobileDetail === job.id;
              const rc = rankColor(job.rank);
              return (
                <div key={job.id} className="border border-gray-200">
                  <button
                    onClick={() => setMobileDetail(isExpanded ? null : job.id)}
                    className="w-full text-left p-5 group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className={`text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 ${rc.bg} ${rc.text}`}>{job.rank}</span>
                          {job.open > 1 && (
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8A0000]">{job.open} openings</span>
                          )}
                        </div>
                        <h3 className="text-[15px] font-bold text-[#141414] group-hover:text-[#8A0000] transition-colors leading-snug mb-1">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-[12px] text-gray-500">
                          <span className="flex items-center gap-1"><MapPin size={11} /> {job.locations.slice(0, 2).join(', ')}</span>
                          <span className="flex items-center gap-1"><Briefcase size={11} /> {job.stipend}</span>
                        </div>
                      </div>
                      <svg
                        className={`w-4 h-4 text-gray-400 shrink-0 mt-1 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 pt-0 border-t border-gray-100">
                        <p className="text-[14px] leading-[1.8] text-gray-600 mt-5 mb-6">{job.description}</p>
                        <div className="space-y-5">
                          <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A0000] mb-3">Key Responsibilities</h4>
                            <ul className="space-y-2">
                              {job.responsibilities.map((r, i) => (
                                <li key={i} className="flex items-start gap-2.5">
                                  <span className="w-1.5 h-1.5 bg-[#8A0000] rounded-full shrink-0 mt-1.5"></span>
                                  <span className="text-[13px] text-gray-600 leading-[1.5]">{r}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A0000] mb-3">Qualifications</h4>
                            <ul className="space-y-2">
                              {job.requirements.map((r, i) => (
                                <li key={i} className="flex items-start gap-2.5">
                                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full shrink-0 mt-1.5"></span>
                                  <span className="text-[13px] text-gray-600 leading-[1.5]">{r}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="mt-6 pt-5 border-t border-gray-100">
                          <a
                            href={`mailto:faculty@artemisui.org?subject=Application: ${job.title}`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#8A0000] text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#6B0000] transition-colors group"
                          >
                            <span>Apply Now</span>
                            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
            {filteredJobs.length === 0 && (
              <div className="py-12 text-center border border-gray-200">
                <p className="text-[15px] text-gray-400">No positions match your search.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. COMPENSATION — Full-bleed parallax image + white card
          ══════════════════════════════════════════ */}
      <section id="compensation" className="scroll-mt-[110px] w-full">
        <div className="max-w-[1600px] mx-auto">
          <div ref={compAnim.ref} className="relative w-full min-h-[420px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1800"
              alt="Compensation"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="relative z-10 flex items-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 py-10 lg:py-14">
              <div className={`transition-all duration-700 ${compAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="bg-white max-w-xl p-6 sm:p-8 lg:p-10 shadow-xl">
                  <div className="mb-4 flex items-center space-x-3">
                    <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Compensation</span>
                  </div>
                  <h2 className="text-[24px] sm:text-[32px] lg:text-[38px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
                    Compensation Structure
                  </h2>
                  <p className="text-[15px] text-gray-600 leading-[1.75] mb-4">
                    <span className="font-bold text-[#141414]">Years 1–5: Foundational Stipends.</span> UN Model 3 compensation — a base stipend with a location multiplier to support your work from day one.
                  </p>
                  <p className="text-[15px] text-gray-600 leading-[1.75] mb-5">
                    <span className="font-bold text-[#141414]">Year 6+: Career Compensation.</span> The Y6+ Quality Upgrade Fund transitions all faculty to career-level pay.
                  </p>
                  <div className="border-l-4 border-[#8A0000] pl-4 py-1">
                    <p className="text-[13px] text-gray-500 italic leading-[1.6]">
                      A fellowship stipend, not an employment contract. Designed so you can focus on your best work from the start.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compensation Table — separate section below the parallax */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20 py-12 lg:py-16">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A0000] mb-6">Stipend Schedule (USD)</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[440px]">
              <thead>
                <tr className="border-b-2 border-[#8A0000]">
                  <th className="text-left text-[10px] font-black uppercase tracking-[0.15em] text-[#8A0000] py-3 pr-3">Title</th>
                  <th className="text-right text-[10px] font-black uppercase tracking-[0.15em] text-[#8A0000] py-3 px-3">Base</th>
                  <th className="text-right text-[10px] font-black uppercase tracking-[0.15em] text-[#8A0000] py-3 px-3">London</th>
                  <th className="text-right text-[10px] font-black uppercase tracking-[0.15em] text-[#8A0000] py-3 px-3">Nairobi</th>
                  <th className="text-right text-[10px] font-black uppercase tracking-[0.15em] text-[#8A0000] py-3 pl-3">Kampala</th>
                </tr>
              </thead>
              <tbody>
                {COMPENSATION_TABLE.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-3.5 pr-3 text-[12px] sm:text-[13px] font-semibold text-[#141414]">{row.title}</td>
                    <td className="py-3.5 px-3 text-[12px] sm:text-[13px] text-right font-bold text-[#141414]">{row.base}</td>
                    <td className="py-3.5 px-3 text-[12px] sm:text-[13px] text-right text-gray-600">{row.london}</td>
                    <td className="py-3.5 px-3 text-[12px] sm:text-[13px] text-right text-gray-600">{row.nairobi}</td>
                    <td className="py-3.5 pl-3 text-[12px] sm:text-[13px] text-right text-gray-600">{row.kampala}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-400 mt-4">Location multipliers follow the UN post-adjustment system (Model 3).</p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. FIVE DIVISIONS — Stats row style
          ══════════════════════════════════════════ */}
      <section id="divisions" className="scroll-mt-[110px] w-full bg-gray-50 border-y border-gray-100">
        <div ref={divAnim.ref} className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20 py-16 lg:py-24">
          <div className={`transition-all duration-700 ${divAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="mb-6 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Academic Structure</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-12">
              <div>
                <h2 className="text-[28px] sm:text-[38px] lg:text-[46px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
                  Five Divisions
                </h2>
                <p className="text-[17px] text-gray-600 leading-[1.75]">
                  Each Division spans all 50 Colleges and is led by a Division Head who reports directly to the President. Together they cover the full breadth of human inquiry — from philosophy to physics, from business to biology. Explore the divisions to find where your expertise fits.
                </p>
              </div>
              <div className="border-l-4 border-[#8A0000] pl-6 py-2">
                <p className="text-[20px] font-bold text-[#141414] leading-tight mb-2">
                  &ldquo;Five divisions. No departments. No silos. Just organized inquiry.&rdquo;
                </p>
                <p className="text-[12px] font-bold uppercase tracking-widest text-[#8A0000]">
                  Artemis Academic Charter
                </p>
              </div>
            </div>

            {/* Division cards with images */}
            <div className="space-y-0">
              {DIVISIONS.map((div, i) => {
                const Icon = div.icon;
                return (
                  <div
                    key={div.id}
                    className="group border-b border-gray-200 hover:border-[#8A0000] transition-colors bg-white"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                      {/* Image */}
                      <div className="lg:col-span-4 aspect-[16/9] lg:aspect-auto bg-gray-100 overflow-hidden">
                        <img
                          src={div.image}
                          alt={div.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        />
                      </div>

                      {/* Content */}
                      <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-9 h-9 flex items-center justify-center" style={{ backgroundColor: div.color }}>
                            <Icon size={16} className="text-white" />
                          </div>
                          <span className="text-[9px] font-black tracking-[0.25em] text-gray-400 uppercase">Division {div.numeral}</span>
                        </div>
                        <h4 className="text-[20px] sm:text-[24px] font-black text-[#141414] group-hover:text-[#8A0000] transition-colors leading-tight mb-4">{div.title}</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {div.fields.map((field, j) => (
                            <span key={j} className="text-[11px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-3 py-1.5 group-hover:bg-[#8A0000]/5 group-hover:text-[#8A0000] transition-colors">
                              {field}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Link to Centers of Inquiry */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <button
                onClick={() => goToPage('centers-of-inquiry')}
                className="flex items-center gap-3 py-3 border-b-2 border-[#141414] text-[#141414] text-[13px] font-bold uppercase tracking-[0.2em] hover:text-[#8A0000] hover:border-[#8A0000] transition-all group"
              >
                <span>Explore the 19 Centers of Inquiry</span>
                <svg className="group-hover:translate-x-2 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. LOCATIONS — Horizontal scroll carousel
          ══════════════════════════════════════════ */}
      <section id="locations" className="scroll-mt-[110px] w-full">
        {/* Parallax hero image for locations */}
        <div className="max-w-[1600px] mx-auto">
          <div ref={locAnim.ref} className="relative w-full min-h-[340px] md:min-h-[400px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&q=80&w=1800"
              alt="Global College Locations"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="relative z-10 flex items-end h-full min-h-[340px] md:min-h-[400px] max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 py-10 lg:py-14">
              <div className={`transition-all duration-700 ${locAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="bg-white max-w-lg p-6 sm:p-8 shadow-xl">
                  <div className="mb-4 flex items-center space-x-3">
                    <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Where You'll Work</span>
                  </div>
                  <h2 className="text-[24px] sm:text-[32px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-3">
                    50 Colleges. 35 Countries.
                  </h2>
                  <p className="text-[15px] text-gray-600 leading-[1.75]">
                    Every College is a physical place — a repurposed convent, a converted warehouse, a former caravansarai. Not a Zoom room with a logo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tier rows */}
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20 py-12 lg:py-16">
          {['Central Node', 'Tier A', 'Tier B', 'Tier C'].map((tier) => {
            const cities = COLLEGE_LOCATIONS.filter(c => c.tier === tier);
            const tierColor = tier === 'Central Node' ? '#8A0000' : tier === 'Tier A' ? '#6B0000' : tier === 'Tier B' ? '#4a0e0e' : '#3d0808';
            const tierDesc = tier === 'Central Node'
              ? 'The three hubs that anchor the Artemis network — governance, operations, and global coordination.'
              : tier === 'Tier A'
              ? 'Major global cities with established infrastructure and strong academic ecosystems.'
              : tier === 'Tier B'
              ? 'Emerging academic hubs with growing research communities and cultural richness.'
              : 'Frontier locations where Artemis will have the greatest transformative impact.';
            return (
              <div key={tier} className="group mb-6 last:mb-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-gray-200 hover:border-[#8A0000]/30 transition-colors overflow-hidden">
                  {/* Tier info with accent */}
                  <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-center" style={{ backgroundColor: `${tierColor}06` }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ backgroundColor: tierColor }}>
                        <Building2 size={16} className="text-white" />
                      </div>
                      <div>
                        <h4 className="text-[18px] sm:text-[20px] font-black text-[#141414]">{tier}</h4>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{cities.length} cities</span>
                      </div>
                    </div>
                    <p className="text-[13px] text-gray-500 leading-[1.6] mt-2">{tierDesc}</p>
                  </div>
                  {/* Cities */}
                  <div className="lg:col-span-8 p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-gray-100 bg-white">
                    <div className="flex flex-wrap gap-2">
                      {cities.map((c, j) => (
                        <span key={j} className="text-[12px] font-semibold px-3 py-2 bg-gray-50 border border-gray-200 text-gray-700 group-hover:border-[#8A0000]/20 group-hover:bg-[#8A0000]/[0.02] transition-colors">
                          {c.city}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. BENEFITS — Horizontal stats row
          ══════════════════════════════════════════ */}
      <section id="benefits" className="scroll-mt-[110px] w-full bg-gray-50 border-y border-gray-100">
        <div ref={benAnim.ref} className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20 py-16 lg:py-24">
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Why Artemis</span>
          </div>
          <h2 className="text-[28px] sm:text-[38px] lg:text-[46px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-12">
            What you get
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
            {BENEFITS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  <div className="w-10 h-10 flex items-center justify-center bg-[#8A0000]/5 border border-[#8A0000]/10 mb-4">
                    <Icon size={16} className="text-[#8A0000]" />
                  </div>
                  <h4 className="text-[15px] font-bold text-[#141414] mb-2">{item.title}</h4>
                  <p className="text-[13px] leading-[1.7] text-gray-500">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. HOW TO APPLY — Full-bleed crimson CTA
          ══════════════════════════════════════════ */}
      <section id="apply" className="scroll-mt-[110px] w-full py-16 lg:py-24">
        <div ref={applyAnim.ref} className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20">
          <div className="bg-[#8A0000] text-white p-8 sm:p-12 lg:p-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left */}
              <div>
                <div className="mb-6 flex items-center space-x-3">
                  <span className="w-8 h-[1px] bg-white/30"></span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60">How to Apply</span>
                </div>
                <h2 className="text-[28px] sm:text-[38px] lg:text-[46px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6">
                  We are not reading CVs.<br />We are reading manifestos.
                </h2>
                <p className="text-[17px] text-white/70 leading-[1.75] mb-8">
                  Tell us what you would build, where you would build it, and why the Artemis mission matters more to you than a conventional salary.
                </p>
                <a
                  href="mailto:faculty@artemisui.org"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#8A0000] text-[12px] font-bold uppercase tracking-[0.25em] hover:bg-gray-100 transition-colors group"
                >
                  <Mail size={16} />
                  <span>faculty@artemisui.org</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <p className="text-[12px] text-white/40 mt-3">No form. No portal. No algorithm. A human will read it.</p>
              </div>

              {/* Right — Application checklist */}
              <div className="space-y-4">
                {[
                  { num: '01', text: 'Which Division and Center you want to build' },
                  { num: '02', text: 'Which College you want to live in' },
                  { num: '03', text: 'What you would teach in your first term' },
                  { num: '04', text: 'What you would research in your first year' },
                  { num: '05', text: 'Why the Artemis mission matters more to you than a conventional salary' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-white/10 border border-white/15 p-5">
                    <span className="text-[28px] font-black text-white/20 leading-none shrink-0">{item.num}</span>
                    <p className="text-[14px] sm:text-[15px] leading-[1.6] text-white/90 font-medium">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
