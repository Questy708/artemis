'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';

interface Props {
  goToPage: (page: string) => void;
}

/* ─── Data: Board of Trustees ─── */
const boardOfTrustees = [
  { name: 'Eleanor Voss', title: 'Chairman', initials: 'EV' },
  { name: 'Marcus Adebayo', title: 'Board Member', initials: 'MA' },
  { name: 'Dr. Hannah Choi', title: 'Board Member', initials: 'HC' },
  { name: 'Rajiv Mehta', title: 'Board Member', initials: 'RM' },
  { name: 'Dr. Sofia Laurent', title: 'Board Member', initials: 'SL' },
  { name: 'James Okonkwo', title: 'Board Member', initials: 'JO' },
  { name: 'Dr. Yuki Tanaka', title: 'Board Member', initials: 'YT' },
  { name: 'Catherine穆勒', title: 'Board Member', initials: 'CM' },
  { name: 'David Reis', title: 'Board Member', initials: 'DR' },
  { name: 'Dr. Amara Faye', title: 'Board Member', initials: 'AF' },
];

/* ─── Data: Leadership Cabinet ─── */
const leadershipCabinet = [
  {
    name: 'Dr. Catherine Hargreaves',
    title: 'Founding President',
    initials: 'CH',
    quote: 'Artemis exists to prove that brilliance is evenly distributed — opportunity is not. We are building the institution that closes that gap.',
  },
  {
    name: 'Dr. Samuel Osei',
    title: 'Provost, Chief Academic Officer',
    initials: 'SO',
    quote: 'A curriculum should be built on evidence of how learning works, not on tradition. Artemis is the first university to take that commitment seriously at every level.',
  },
  {
    name: 'Dr. Mei-Ling Zhao',
    title: 'Chief Discovery & Admissions Officer',
    initials: 'MZ',
    quote: 'Brilliance and drive know no borders. I\'m proud to lead the team that finds the extraordinary minds who will shape the Artemis community.',
  },
  {
    name: 'Nikolaus Pelz',
    title: 'Chief Financial Officer',
    initials: 'NP',
    quote: 'Building efficient financial solutions across cultural boundaries is what makes Artemis exciting. It is a truly global organization that embraces the opportunities found in diversity.',
  },
  {
    name: 'Dr. Ari Betof',
    title: 'Chief Advancement Officer',
    initials: 'AB',
    quote: 'Artemis lives at the intersection of theory and practice — helping students become their best selves while nurturing critical wisdom for the sake of the world.',
  },
  {
    name: 'Dr. Kayla Krupnick Walsh',
    title: 'Dean of Students',
    initials: 'KK',
    quote: 'Our team is building learning opportunities and promoting critical development in students regarding how they want to live and lead.',
  },
  {
    name: 'Benjamin Arturi',
    title: 'Founder and Advisor',
    initials: 'BA',
    quote: 'Nothing is more important for the world than nurturing critical wisdom. I founded Artemis to be the institution that systematically does that.',
  },
];

/* ─── Data: Research Leadership ─── */
const researchLeadership = [
  {
    name: 'Dr. Renata Holm',
    title: 'Vice-Provost for Research',
    initials: 'RH',
    quote: 'Artemis research is organised so that no finding is locked behind a paywall and no Centre of Inquiry operates in isolation. Open knowledge is not an ideal — it is our architecture.',
  },
  {
    name: 'Dr. Felipe Duarte',
    title: 'Director of Innovation & Partnerships',
    initials: 'FD',
    quote: 'Bridging the laboratory and the world is not a sideline — it is a core function. The Forge ecosystem ensures that Artemis ideas become Artemis impact.',
  },
  {
    name: 'Dr. Anika Patel',
    title: 'Director of Digital Learning',
    initials: 'AP',
    quote: 'The synchronous classroom does not replicate the in-person experience — it surpasses it. Every student, everywhere, is present and accounted for.',
  },
  {
    name: 'Dr. Tomás Eriksson',
    title: 'University Librarian & Knowledge Core Director',
    initials: 'TE',
    quote: 'The Knowledge Core is the living memory of the university. Everything we produce, discover, and teach flows through it — open, searchable, and permanent.',
  },
  {
    name: 'Dr. Linnea Bergström',
    title: 'Director of Sustainability',
    initials: 'LB',
    quote: 'Carbon-negative is not a target — it is a baseline. Every node we build, every programme we run, must leave the planet better than we found it.',
  },
  {
    name: 'Omar Farouk',
    title: 'Director of Communications',
    initials: 'OF',
    quote: 'The story of Artemis is not ours alone to tell. It belongs to every scholar, every node, every community we touch. Our job is to make that story visible.',
  },
  {
    name: 'Dr. Ji-Yeon Park',
    title: 'Director of Global Operations',
    initials: 'JP',
    quote: 'Coordinating twenty nodes across six continents is not a logistics problem — it is a design problem. And we designed the solution from day one.',
  },
];

/* ─── Data: Faculty ─── */
const faculty = [
  {
    name: 'Dr. Richard Holman',
    title: 'Dean of Faculty',
    initials: 'RH',
    dept: 'Computational Sciences',
    quote: 'A thorough grounding in logical analysis and computational tools is the sine qua non of being a citizen of modern society.',
    isHead: true,
  },
  {
    name: 'Dr. Dollie Davis',
    title: 'Associate Dean of Faculty',
    initials: 'DD',
    dept: 'Natural Sciences',
    quote: 'The Artemis experience provides students with an incredibly comprehensive and supportive learning environment. It is an honour to be part of this institution.',
    isHead: true,
  },
  {
    name: 'Dr. Arin Solberg',
    title: 'Professor of Synthetic Intelligence & Computation',
    initials: 'AS',
    dept: 'Synthetic Intelligence & Computation',
    quote: 'Autonomous reasoning is not just a research interest — it is the frontier that will define whether humanity collaborates with its creations or is displaced by them.',
  },
  {
    name: 'Dr. Priya Okafor',
    title: 'Associate Professor of Bio-Regenerative Arts',
    initials: 'PO',
    dept: 'Bio-Regenerative Arts',
    quote: 'Living materials are the future of design. At Artemis, we don\'t just study biodesign — we practice it as a form of planetary repair.',
  },
  {
    name: 'Dr. Luca Ferreira',
    title: 'Professor of Cosmological Humanities',
    initials: 'LF',
    dept: 'Cosmological Humanities',
    quote: 'The humanities cannot remain Earth-bound. As we reach for the stars, we need philosophers, ethicists, and historians who think beyond the atmosphere.',
  },
  {
    name: 'Dr. Miri Tanaka',
    title: 'Assistant Professor of Neo-Economics',
    initials: 'MT',
    dept: 'Neo-Economics',
    quote: 'Post-scarcity is not a utopia — it is an engineering problem. And the tools to solve it are already within reach.',
  },
  {
    name: 'Dr. Dimitri Volkov',
    title: 'Professor of Planetary Engineering',
    initials: 'DV',
    dept: 'Planetary Engineering',
    quote: 'We cannot engineer our way out of the climate crisis with the same thinking that created it. Artemis is where the new thinking lives.',
  },
  {
    name: 'Dr. Amara Diallo',
    title: 'Associate Professor of Cognitive Enhancement Studies',
    initials: 'AD',
    dept: 'Cognitive Enhancement Studies',
    quote: 'Cognitive equity means that enhancement is not a luxury for the few — it is a right for everyone. That principle guides every course I teach.',
  },
  {
    name: 'Dr. Jian Wei Chen',
    title: 'Professor of Quantum Information Science',
    initials: 'JC',
    dept: 'Quantum Information Science',
    quote: 'The quantum revolution will not wait for institutions to catch up. At Artemis, we are already teaching the mathematics and ethics of a post-quantum world.',
  },
  {
    name: 'Dr. Sofia Restrepo',
    title: 'Assistant Professor of Equitable Governance',
    initials: 'SR',
    dept: 'Equitable Governance',
    quote: 'Governance at scale requires more than good intentions. It requires deliberative systems designed for fairness — and the courage to implement them.',
  },
  {
    name: 'Dr. Obi Nwosu',
    title: 'Associate Professor of Digital Civilizations',
    initials: 'ON',
    dept: 'Digital Civilizations',
    quote: 'Digital civilisation is not something that happens to us — it is something we build. Heritage, community, and identity all have a place in the network.',
  },
  {
    name: 'Dr. Elena Voss',
    title: 'Professor of Adaptive Education Systems',
    initials: 'EV',
    dept: 'Adaptive Education Systems',
    quote: 'Personalised learning is not a product feature — it is a pedagogical commitment. Every student deserves a curriculum that adapts to how they learn best.',
  },
  {
    name: 'Dr. Kwame Asante',
    title: 'Assistant Professor of Climate Adaptation Science',
    initials: 'KA',
    dept: 'Climate Adaptation Science',
    quote: 'Climate adaptation is not just about surviving — it is about transforming food systems, migration patterns, and habitats so that communities thrive.',
  },
  {
    name: 'Dr. Yara Kuznetsova',
    title: 'Associate Professor of Synthetic Biology',
    initials: 'YK',
    dept: 'Synthetic Biology',
    quote: 'Programmable organisms and open-source biotechnology are the next great democratisation. Artemis students will not just read about it — they will build it.',
  },
];

/* ─── Data: Staff ─── */
const staffTeams = [
  {
    team: 'Admissions Team',
    members: [
      { name: 'Samantha Maskey', title: 'Associate Director of Admissions Programs', initials: 'SM' },
      { name: 'Ben Wilkoff', title: 'Associate Director of Admissions Operations', initials: 'BW' },
    ],
  },
  {
    team: 'Student Life Team',
    members: [
      { name: 'Matthew Erskine', title: 'Global Director, Student Life', initials: 'ME' },
      { name: 'Rachel Kim', title: 'Global Director, Coaching & Talent Development', initials: 'RK' },
      { name: 'Will Meek', title: 'Global Director, Mental Health & Wellness', initials: 'WM' },
      { name: 'Mara Steiner', title: 'Global Director of Student Life', initials: 'MS' },
      { name: 'Barbara Walder', title: 'Global Director, Student Life', initials: 'BW' },
    ],
  },
  {
    team: 'Discovery Team',
    members: [
      { name: 'Fatou Badiane-Toure', title: 'Global Director, Outreach', initials: 'FB' },
    ],
  },
];

const peopleStats = [
  { value: '120+', label: 'Staff', detail: 'Across all global nodes' },
  { value: '72', label: 'Faculty', detail: 'Distinguished scholars & researchers' },
  { value: '28+', label: 'Countries', detail: 'Represented in our community' },
  { value: '85%', label: 'Satisfaction', detail: 'Annual employee survey' },
];

/* ─── Hook: animate on scroll ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Person circle component ─── */
function PersonCircle({ initials, size = 'md' }: { initials: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-10 h-10 text-[10px]',
    md: 'w-14 h-14 text-[12px]',
    lg: 'w-20 h-20 text-[14px]',
  };
  return (
    <div className={`${sizeClasses[size]} rounded-full bg-[#8A0000]/[0.07] border border-[#8A0000]/20 flex items-center justify-center shrink-0`}>
      <span className="font-black text-[#8A0000] tracking-wider">{initials}</span>
    </div>
  );
}

/* ─── Component ─── */
export default function OurPeople({ goToPage }: Props) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  const heroAnim = useInView();
  const boardAnim = useInView();
  const cabinetAnim = useInView();
  const researchAnim = useInView();
  const facultyAnim = useInView();
  const statsAnim = useInView();
  const staffAnim = useInView();
  const activeSection = useActiveSection(['board', 'leadership', 'research', 'faculty', 'staff']);

  return (
    <div className="flex flex-col bg-white">

      {/* ── 1. HERO ── */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[45vh] min-h-[360px] overflow-hidden">
            <motion.img
              src="https://images.unsplash.com/photo-1613592237001-84fb727ce569?auto=format&fit=crop&q=80&w=1800"
              className="absolute inset-x-0 -top-[20%] w-full h-[140%] object-cover grayscale"
              style={{ y: heroY }}
              alt="The people of Artemis"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-16">
              <div className="mb-8 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                  The Artemis Community
                </span>
              </div>
              <h1 className="text-[32px] sm:text-[44px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6 uppercase">
                Our People
              </h1>
              <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light">
                The scholars, researchers, and staff who form the beating heart of the Artemis experiment — a global guild united by the pursuit of knowledge without borders.
              </p>
            </div>
          </div>
        </div>
      </section>

      <OnThisPageNav
        sections={[
          { id: 'board', label: 'Board of Trustees' },
          { id: 'leadership', label: 'Leadership' },
          { id: 'research', label: 'Research' },
          { id: 'faculty', label: 'Faculty' },
          { id: 'staff', label: 'Staff' },
        ]}
        activeSection={activeSection}
      />

      {/* ── 2. BOARD OF TRUSTEES ── */}
      <section id="board" className="py-16 lg:py-24 scroll-mt-[110px] bg-gray-50">
        <div
          ref={boardAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${boardAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Governance
            </span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            Board of Trustees
          </h2>
          <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl mb-12">
            The University of Artemis is structured so that no single individual can control the institution. The Board of Trustees provides strategic oversight, fiduciary governance, and external validation — ensuring that the university remains true to its founding charter, financially independent, and academically excellent.
          </p>

          {/* Board grid — 5 per row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
            {boardOfTrustees.map((person, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="mb-4 group-hover:scale-105 transition-transform">
                  <PersonCircle initials={person.initials} size="lg" />
                </div>
                <h3 className="text-[14px] font-bold text-[#141414] group-hover:text-[#8A0000] transition-colors leading-snug mb-1">
                  {person.name}
                </h3>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {person.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. LEADERSHIP CABINET ── */}
      <section id="leadership" className="py-16 lg:py-24 scroll-mt-[110px] bg-white">
        <div
          ref={cabinetAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${cabinetAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Leadership
            </span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            Cabinet
          </h2>
          <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl mb-12">
            The leadership team carries the operational responsibility for Artemis across every function — academic, financial, global, and cultural. Each member brings deep conviction that higher education must be rebuilt from first principles.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {leadershipCabinet.map((person, i) => (
              <div key={i} className="group flex gap-5 p-6 border border-gray-200 hover:border-[#8A0000] transition-all hover:shadow-sm">
                <div className="shrink-0 group-hover:scale-105 transition-transform">
                  <PersonCircle initials={person.initials} size="lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[16px] font-bold text-[#141414] group-hover:text-[#8A0000] transition-colors leading-snug mb-1">
                    {person.name}
                  </h3>
                  <div className="text-[10px] font-bold text-[#8A0000] uppercase tracking-widest mb-3">
                    {person.title}
                  </div>
                  <p className="text-[13px] text-gray-500 leading-relaxed italic">
                    &ldquo;{person.quote}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. RESEARCH LEADERSHIP ── */}
      <section id="research" className="py-16 lg:py-24 scroll-mt-[110px] bg-gray-50">
        <div
          ref={researchAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${researchAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Research & Innovation
            </span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            Research Leadership
          </h2>
          <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl mb-12">
            Artemis research is organised through Centers of Inquiry — independently operating, permanently endowed research centres that produce open-access knowledge under a 7-year mandatory release policy. The directors below lead the research enterprise and the infrastructure that makes it possible.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {researchLeadership.map((person, i) => (
              <div key={i} className="group flex gap-5 p-6 border border-gray-200 bg-white hover:border-[#8A0000] transition-all hover:shadow-sm">
                <div className="shrink-0 group-hover:scale-105 transition-transform">
                  <PersonCircle initials={person.initials} size="lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[16px] font-bold text-[#141414] group-hover:text-[#8A0000] transition-colors leading-snug mb-1">
                    {person.name}
                  </h3>
                  <div className="text-[10px] font-bold text-[#8A0000] uppercase tracking-widest mb-3">
                    {person.title}
                  </div>
                  <p className="text-[13px] text-gray-500 leading-relaxed italic">
                    &ldquo;{person.quote}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. DEAN, ASSOCIATE DEANS, AND FACULTY ── */}
      <section id="faculty" className="py-16 lg:py-24 scroll-mt-[110px] bg-white">
        <div
          ref={facultyAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${facultyAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Faculty
            </span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            Dean, Associate Deans, and Faculty
          </h2>
          <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl mb-12">
            Artemis faculty are not confined to a single discipline or a single campus. They are distributed scholars — thinkers who collaborate across nodes, time zones, and traditions to deliver a truly global education. Each faculty member holds a joint appointment across at least two Artemis nodes.
          </p>

          {/* Dean of Faculty — featured */}
          <div className="mb-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">
              Dean of Faculty
            </div>
            {faculty.filter(f => f.isHead && f.title.includes('Dean of Faculty')).map((person, i) => (
              <div key={i} className="group flex gap-6 p-6 border border-[#8A0000]/20 bg-[#8A0000]/[0.02] hover:bg-[#8A0000]/[0.04] transition-all">
                <div className="shrink-0 group-hover:scale-105 transition-transform">
                  <PersonCircle initials={person.initials} size="lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[18px] font-bold text-[#141414] group-hover:text-[#8A0000] transition-colors leading-snug mb-1">
                    {person.name}
                  </h3>
                  <div className="text-[10px] font-bold text-[#8A0000] uppercase tracking-widest mb-3">
                    {person.title}
                  </div>
                  <p className="text-[14px] text-gray-500 leading-relaxed italic">
                    &ldquo;{person.quote}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Associate Deans */}
          <div className="mb-10">
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">
              Associate Deans
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faculty.filter(f => f.isHead && f.title.includes('Associate Dean')).map((person, i) => (
                <div key={i} className="group flex gap-5 p-6 border border-gray-200 hover:border-[#8A0000] transition-all hover:shadow-sm">
                  <div className="shrink-0 group-hover:scale-105 transition-transform">
                    <PersonCircle initials={person.initials} size="md" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[16px] font-bold text-[#141414] group-hover:text-[#8A0000] transition-colors leading-snug mb-1">
                      {person.name}
                    </h3>
                    <div className="text-[10px] font-bold text-[#8A0000] uppercase tracking-widest mb-3">
                      {person.title}
                    </div>
                    <p className="text-[13px] text-gray-500 leading-relaxed italic">
                      &ldquo;{person.quote}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professors */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">
              Professors
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {faculty.filter(f => !f.isHead).map((person, i) => (
                <div key={i} className="group flex gap-4 p-5 border border-gray-200 hover:border-[#8A0000] transition-all hover:shadow-sm">
                  <div className="shrink-0 group-hover:scale-105 transition-transform">
                    <PersonCircle initials={person.initials} size="sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-bold text-[#141414] group-hover:text-[#8A0000] transition-colors leading-snug mb-1">
                      {person.name}
                    </h3>
                    <div className="text-[9px] font-bold text-[#8A0000] uppercase tracking-widest mb-2">
                      {person.title}
                    </div>
                    <p className="text-[12px] text-gray-500 leading-relaxed italic line-clamp-3">
                      &ldquo;{person.quote}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-200 flex items-center gap-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#8A0000]">
              Faculty appointments are ongoing — new profiles will appear as they are confirmed
            </span>
          </div>
        </div>
      </section>

      {/* ── 6. BY THE NUMBERS ── */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div
          ref={statsAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${statsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              By the Numbers
            </span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            A global workforce
          </h2>
          <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl mb-16">
            Behind every breakthrough at Artemis is a person — a scholar, a strategist, a steward of knowledge. Our people are the infrastructure of possibility.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            {peopleStats.map((stat, i) => (
              <div key={i} className="relative pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#8A0000]"></div>
                <div className="text-[36px] font-black text-[#141414] leading-none mb-2 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-1">
                  {stat.label}
                </div>
                <div className="text-[12px] text-gray-500 leading-snug">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. STAFF ── */}
      <section id="staff" className="py-16 lg:py-24 scroll-mt-[110px] bg-white">
        <div
          ref={staffAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${staffAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Staff
            </span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            Staff
          </h2>
          <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl mb-12">
            The staff of Artemis are the operational backbone of a distributed university — managing admissions, student life, outreach, and the day-to-day systems that make a global institution function seamlessly.
          </p>

          <div className="space-y-12">
            {staffTeams.map((team, i) => (
              <div key={i}>
                <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">
                  {team.team}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {team.members.map((person, j) => (
                    <div key={j} className="group flex gap-4 p-5 border border-gray-200 hover:border-[#8A0000] transition-all hover:shadow-sm">
                      <div className="shrink-0 group-hover:scale-105 transition-transform">
                        <PersonCircle initials={person.initials} size="sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[14px] font-bold text-[#141414] group-hover:text-[#8A0000] transition-colors leading-snug mb-1">
                          {person.name}
                        </h3>
                        <div className="text-[9px] font-bold text-[#8A0000] uppercase tracking-widest">
                          {person.title}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. WORKING AT ARTEMIS ── */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">
              Careers
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                Working at Artemis
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Artemis is not a conventional employer. We are a decentralized guild of scholars, engineers, administrators, and dreamers — united by the belief that knowledge should have no borders and talent should have no ceiling.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                From competitive benefits and flexible working arrangements to the rare opportunity of shaping a university from first principles, a career at Artemis is an invitation to build something that has never existed before.
              </p>
              <button
                onClick={() => goToPage('jobs')}
                className="flex items-center space-x-4 py-3 border-b-2 border-[#8A0000] text-[#8A0000] text-[13px] font-bold uppercase tracking-[0.2em] hover:text-black hover:border-black transition-all group"
              >
                <span>View Open Positions</span>
                <svg
                  className="group-hover:translate-x-2 transition-transform"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>

            <div>
              <div className="border-l-2 border-[#8A0000] pl-6 mb-10">
                <h3 className="text-[18px] font-bold text-[#141414] mb-3">
                  Why Artemis?
                </h3>
                <p className="text-[14px] text-gray-600 leading-relaxed">
                  We offer more than a job. We offer a place in a global intellectual movement — where your work reverberates across continents and your colleagues are among the most brilliant minds on the planet.
                </p>
              </div>
              <div className="space-y-0">
                {[
                  { label: 'Benefits & compensation', page: 'jobs' },
                  { label: 'Diversity & inclusion', page: 'about' },
                  { label: 'Professional development', page: 'education' },
                  { label: 'Artemis culture & values', page: 'about' },
                ].map((link, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(link.page)}
                    className="group flex justify-between items-center py-4 border-b border-gray-200 hover:border-[#8A0000] transition-colors w-full text-left"
                  >
                    <span className="text-[14px] font-bold text-gray-700 group-hover:text-[#8A0000] transition-colors">
                      {link.label}
                    </span>
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-[#8A0000] group-hover:translate-x-1 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
