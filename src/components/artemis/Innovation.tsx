'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';
import { ArrowRight, Lightbulb, FlaskConical, Users, Rocket, Building2, ChevronRight, ExternalLink, ArrowDown } from 'lucide-react';

interface InnovationProps {
  goToPage: (page: string) => void;
}

/* ─── Data ─── */

const portfolioCompanies = [
  {
    name: 'Helix Diagnostics',
    channel: 'AI + Health',
    desc: 'AI-powered molecular diagnostics platform that reduces testing turnaround from days to hours. Built on Artemis research in synthetic biology and machine learning, Helix enables point-of-care clinicians to identify pathogens and recommend treatment in under thirty minutes.',
    status: 'Launched',
    founded: '2025',
    img: 'https://images.unsplash.com/photo-1514416205405-075ab2f15964?auto=format&fit=crop&q=80&w=600',
  },
  {
    name: 'FerroGrid',
    channel: 'Clean Energy',
    desc: 'Next-generation wide-bandgap semiconductor power supply units for AI data centres and high-density computing. FerroGrid\'s GaN transistor technology, derived from Artemis fusion energy research, delivers 40% greater energy efficiency than conventional silicon-based systems.',
    status: 'In Development',
    founded: '2025',
    img: 'https://images.unsplash.com/photo-1634947101456-d40e5122b048?auto=format&fit=crop&q=80&w=600',
  },
  {
    name: 'Aether Propulsion',
    channel: 'Clean Energy',
    desc: 'Satellite propulsion systems leveraging superconducting magnet technology originally developed for Artemis fusion research. Aether\'s thrusters deliver higher specific impulse at lower power draw, enabling longer satellite missions and deeper-space capability.',
    status: 'In Development',
    founded: '2026',
    img: 'https://images.unsplash.com/photo-1708738793054-32b71e3fc822?auto=format&fit=crop&q=80&w=600',
  },
  {
    name: 'Meridian Health',
    channel: 'AI + Health',
    desc: 'Patient-centred health records platform that uses AI to personalise and humanise clinical data. Meridian transforms raw EHR inputs into narratives that patients understand and trust, closing the communication gap between providers and the people they serve.',
    status: 'Launched',
    founded: '2025',
    img: 'https://images.unsplash.com/photo-1666886573681-a8fbe983a3fd?auto=format&fit=crop&q=80&w=600',
  },
  {
    name: 'CarbonLock',
    channel: 'Climate',
    desc: 'Permanent carbon capture materials derived from Artemis geothermal and materials science research. CarbonLock\'s mineralisation process sequesters CO2 into stable rock forms at ambient temperature, offering a scalable pathway to negative emissions without energy-intensive compression.',
    status: 'Proto',
    founded: '2026',
    img: 'https://images.unsplash.com/photo-1622050701194-fb04fcf65867?auto=format&fit=crop&q=80&w=600',
  },
];

const modelPhases = [
  {
    number: '01',
    name: 'Define',
    desc: 'A venture channel is defined through sponsorship and strategic alignment. Artemis works with partners to identify urgent problem spaces and map the technology landscape — creating a focused hunting ground for new ventures.',
    icon: Lightbulb,
  },
  {
    number: '02',
    name: 'Discover',
    desc: 'A Venture Builder is recruited and embedded deep within Artemis research labs. Over approximately six months, they systematically scout technologies, interview faculty, assess intellectual property, and identify market needs — building a living map of opportunity.',
    icon: FlaskConical,
  },
  {
    number: '03',
    name: 'Explore',
    desc: 'Venture Builders form teams with Venture Fellows, faculty advisors, and industry collaborators. Together they rapidly prototype low-fidelity technical and market solutions to the most promising problems, advancing the best fits through a rigorous stage-gate process.',
    icon: Users,
  },
  {
    number: '04',
    name: 'Build',
    desc: 'Selected ventures receive dedicated prototyping funding, hands-on mentorship, and access to Artemis labs and infrastructure. Venture Fellows join full-time to de-risk technical assumptions and validate commercial viability — iterating from concept to working prototype.',
    icon: Building2,
  },
  {
    number: '05',
    name: 'Launch',
    desc: 'The strongest Proto Ventures become independent companies launched from Artemis. Founders receive continued advisory support, access to the Artemis investor network, and pathways to follow-on funding — achieving escape velocity as world-changing ventures.',
    icon: Rocket,
  },
];

const teamMembers = [
  {
    name: 'Dr. Elena Vasquez',
    initials: 'EV',
    role: 'Managing Director',
    desc: 'Former partner at a leading deep-tech venture firm. Oversees all studio operations, channel strategy, and venture formation. Lectures on venture design at the Artemis Collegium.',
  },
  {
    name: 'Dr. Kwame Asante',
    initials: 'KA',
    role: 'Venture Builder, AI + Health',
    desc: 'Physician-scientist and serial entrepreneur. Embedded within the Artemis Center for Computational Biology, scouting breakthroughs at the intersection of machine learning and clinical medicine.',
  },
  {
    name: 'Dr. Yuki Tanaka',
    initials: 'YT',
    role: 'Venture Builder, Clean Energy',
    desc: 'Nuclear engineer and former CTO of a fusion energy startup. Based at the Artemis Energy Systems Lab, identifying commercial pathways from fusion and advanced energy research.',
  },
];

const ventureStats = [
  { value: '3', label: 'Active Channels', detail: 'AI + Health, Clean Energy, Climate' },
  { value: '5', label: 'Portfolio Companies', detail: 'Two launched, three in development' },
  { value: '12+', label: 'Venture Fellows', detail: 'Recruited per semester across all channels' },
  { value: '$0', label: 'Equity Taken', detail: 'We don\'t take equity from our ventures' },
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

/* ─── Component ─── */
export default function Innovation({ goToPage }: InnovationProps) {
  const aboutAnim = useInView();
  const portfolioAnim = useInView();
  const modelAnim = useInView();
  const peopleAnim = useInView();
  const statsAnim = useInView();
  const [activePhase, setActivePhase] = useState(0);

  const activeSection = useActiveSection(['about', 'portfolio', 'model', 'people']);

  return (
    <div className="flex flex-col bg-white">
      {/* ── 1. HERO ── */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[50vh] min-h-[420px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1555066931-bf19f8fd1085?auto=format&fit=crop&q=80&w=1800"
              className="absolute inset-0 w-full h-full object-cover"
              alt="Artemis Venture Studio"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a0505]/90 via-[#1a0505]/50 to-[#1a0505]/20" />
            <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-16">
              <div className="mb-8 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#D97706]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D97706]">
                  Artemis Venture Studio
                </span>
              </div>
              <h1 className="text-[32px] sm:text-[44px] md:text-[60px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6">
                Translating ideas<br />into impactful ventures
              </h1>
              <p className="text-[18px] text-white/85 max-w-xl leading-relaxed font-light">
                The first venture studio of its kind within a university. We combine translation
                expertise and deep research access to identify, build, and launch startups from
                Artemis technology — deliberately, not by chance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <OnThisPageNav
        sections={[
          { id: 'about', label: 'About' },
          { id: 'portfolio', label: 'Portfolio' },
          { id: 'model', label: 'Our Model' },
          { id: 'people', label: 'People' },
        ]}
        activeSection={activeSection}
      />

      {/* ── 2. ABOUT ── */}
      <section id="about" className="scroll-mt-[110px] max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 py-16 lg:py-24">
        <div
          ref={aboutAnim.ref}
          className={`transition-all duration-700 ${aboutAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              About the Studio
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                Problems first,<br />not technology push
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Many potentially world-changing inventions remain on the lab room floor. Artemis
                Venture Studio exists to change that. We seek out the world&apos;s hardest problems
                and deliberately build ventures to solve them — replacing serendipity with a
                repeatable, rigorous process.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Unlike traditional accelerators or incubators, we do not wait for founders to walk
                through the door. Our Venture Builders are embedded inside Artemis research labs,
                scouting breakthroughs at the source. They combine deep technical expertise with
                market knowledge to identify opportunities that would otherwise go unrecognised.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                Critically, we do not take equity from the ventures we create. Our mission is to
                maximise the translation of Artemis research into real-world impact — not to capture
                financial upside. This alignment with founders, not against them, is what makes the
                studio model uniquely powerful within a university setting.
              </p>

              {/* Key differentiators */}
              <div className="space-y-4">
                {[
                  { label: 'Problem-first', detail: 'We start with urgent problems, not technology looking for a market.' },
                  { label: 'Embedded in labs', detail: 'Venture Builders work alongside researchers, not from the outside.' },
                  { label: 'No equity taken', detail: 'Our incentive is impact, not ownership.' },
                  { label: 'Deliberate process', detail: 'Repeatable, stage-gated methodology replaces chance.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-[#8A0000] mt-2 shrink-0" />
                    <div>
                      <span className="text-[14px] font-bold text-[#141414]">{item.label}</span>
                      <span className="text-[14px] text-gray-500"> — {item.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — image + stats */}
            <div className="space-y-8">
              <div className="group">
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1624555130296-e551faf8969b?auto=format&fit=crop&q=80&w=1000"
                    alt="Venture Studio collaboration"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <div
                ref={statsAnim.ref}
                className={`grid grid-cols-2 gap-6 transition-all duration-700 ${statsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                {ventureStats.map((stat, i) => (
                  <div key={i} className="border-l-2 border-[#8A0000] pl-5">
                    <div className="text-[36px] font-black text-[#141414] leading-none mb-1 tabular-nums">{stat.value}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-1">{stat.label}</div>
                    <div className="text-[12px] text-gray-500 leading-snug">{stat.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. PORTFOLIO ── */}
      <section id="portfolio" className="scroll-mt-[110px] bg-gray-50 py-16 lg:py-24">
        <div
          ref={portfolioAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${portfolioAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Portfolio
            </span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            Ventures launched<br />from Artemis research
          </h2>
          <p className="text-[16px] text-gray-500 max-w-2xl leading-relaxed font-light mb-12">
            Each portfolio company began as a research insight that the Venture Studio identified,
            shaped, and accelerated toward independence. We measure success not just by funding
            raised, but by the additionality we provide — would this venture exist without us?
          </p>

          <div className="space-y-8">
            {portfolioCompanies.map((company, i) => (
              <div
                key={company.name}
                className="bg-white border border-gray-200 hover:border-[#8A0000] transition-colors group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-0">
                  <div className="aspect-[4/3] lg:aspect-auto overflow-hidden bg-gray-100">
                    <img
                      src={company.img}
                      alt={company.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="p-6 lg:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 ${
                        company.status === 'Launched'
                          ? 'bg-green-50 text-green-700'
                          : company.status === 'In Development'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {company.status}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000]">
                        {company.channel}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400">Est. {company.founded}</span>
                    </div>
                    <h3 className="text-[22px] font-bold text-[#141414] mb-3 group-hover:text-[#8A0000] transition-colors leading-tight">
                      {company.name}
                    </h3>
                    <p className="text-[15px] text-gray-600 leading-relaxed">{company.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. OUR MODEL ── */}
      <section id="model" className="scroll-mt-[110px] py-16 lg:py-24">
        <div
          ref={modelAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${modelAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Our Model
            </span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            From problem to venture,<br />deliberately
          </h2>
          <p className="text-[16px] text-gray-500 max-w-2xl leading-relaxed font-light mb-12">
            Our five-phase framework ensures that every venture we launch is built on a real need,
            grounded in world-class research, and de-risked through disciplined iteration. Click
            each phase to learn more.
          </p>

          {/* Phase selector */}
          <div className="flex flex-wrap gap-2 mb-10">
            {modelPhases.map((phase, i) => (
              <button
                key={phase.name}
                onClick={() => setActivePhase(i)}
                className={`px-4 py-3 sm:px-5 text-[11px] sm:text-[12px] font-bold uppercase tracking-widest transition-all ${
                  activePhase === i
                    ? 'bg-[#8A0000] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {phase.number} — {phase.name}
              </button>
            ))}
          </div>

          {/* Phase content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#8A0000]/10 flex items-center justify-center">
                    {(() => {
                      const Icon = modelPhases[activePhase].icon;
                      return <Icon size={28} className="text-[#8A0000]" />;
                    })()}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000]">Phase {modelPhases[activePhase].number}</div>
                    <h3 className="text-[28px] font-extrabold text-[#141414] tracking-tight leading-none">
                      {modelPhases[activePhase].name}
                    </h3>
                  </div>
                </div>
                <p className="text-[16px] text-gray-600 leading-relaxed mb-8">
                  {modelPhases[activePhase].desc}
                </p>

                {/* Visual progress line */}
                <div className="flex items-center gap-2">
                  {modelPhases.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 transition-colors duration-300 ${
                        i <= activePhase ? 'bg-[#8A0000]' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <div className="hidden sm:flex justify-between mt-2">
                  {modelPhases.map((p, i) => (
                    <span
                      key={i}
                      className={`text-[9px] font-bold uppercase tracking-wider ${
                        i <= activePhase ? 'text-[#8A0000]' : 'text-gray-300'
                      }`}
                    >
                      {p.name}
                    </span>
                  ))}
                </div>
                <div className="flex sm:hidden justify-between mt-2">
                  {modelPhases.map((p, i) => (
                    <span
                      key={i}
                      className={`text-[9px] font-bold ${
                        i <= activePhase ? 'text-[#8A0000]' : 'text-gray-300'
                      }`}
                    >
                      {p.number}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right — How It Works explanation */}
              <div>
                <div className="bg-gray-50 border border-gray-200 p-8 lg:p-10 mb-8">
                  <h4 className="text-[18px] font-bold text-[#141414] mb-4 tracking-tight">How it works</h4>
                  <div className="space-y-4 text-[15px] text-gray-600 leading-relaxed">
                    <p>
                      The Venture Studio process starts with identification of opportunities around problems and technology spaces, which generate a channel. A channel is proposed through sponsorship — corporations, foundations, or government agencies fund a focused area of exploration.
                    </p>
                    <p>
                      Artemis hires a Venture Builder with deep technology and translation experience to lead discovery and experimentation around a specific channel. They pursue approximately six months of extensive opportunity searching inside the university.
                    </p>
                    <p>
                      Venture Builders form teams with Venture Fellows — current Artemis community members with deep-tech backgrounds. Together they rapidly prototype low-fidelity technical and market solutions, advancing the best fits through a stage-gate process.
                    </p>
                  </div>
                </div>

                {/* Stage-Gate visual — horizontal panels */}
                <div className="border border-gray-200">
                  {/* Desktop: horizontal panels */}
                  <div className="hidden sm:flex">
                    {modelPhases.map((phase, i) => (
                      <button
                        key={phase.name}
                        onClick={() => setActivePhase(i)}
                        className={`flex-1 py-4 px-2 text-center border-r border-dashed border-gray-200 last:border-r-0 transition-all duration-300 group ${
                          activePhase === i ? 'bg-[#8A0000]/5' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className={`text-[9px] font-bold uppercase tracking-widest mb-1 ${
                          activePhase === i ? 'text-[#8A0000]' : 'text-gray-400'
                        }`}>
                          {phase.number}
                        </div>
                        <div className={`text-[11px] sm:text-[13px] font-bold tracking-tight ${
                          activePhase === i ? 'text-[#8A0000]' : 'text-gray-600 group-hover:text-gray-800'
                        }`}>
                          {phase.name}
                        </div>
                      </button>
                    ))}
                  </div>
                  {/* Mobile: vertical list */}
                  <div className="flex sm:hidden flex-col">
                    {modelPhases.map((phase, i) => (
                      <button
                        key={phase.name}
                        onClick={() => setActivePhase(i)}
                        className={`flex items-center gap-3 py-3 px-4 border-b border-gray-100 last:border-b-0 transition-all duration-300 text-left ${
                          activePhase === i ? 'bg-[#8A0000]/5' : 'hover:bg-gray-50'
                        }`}
                      >
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${
                          activePhase === i ? 'text-[#8A0000]' : 'text-gray-400'
                        }`}>
                          {phase.number}
                        </span>
                        <span className={`text-[13px] font-bold tracking-tight ${
                          activePhase === i ? 'text-[#8A0000]' : 'text-gray-600'
                        }`}>
                          {phase.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* How teams are constructed */}
          <div className="mt-16">
            <h3 className="text-[22px] sm:text-[26px] font-extrabold text-[#141414] tracking-tight mb-8">
              How teams are constructed
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                {
                  role: 'Venture Builder',
                  desc: 'Full-time, funded position with deep technical expertise and market knowledge. Embedded in research labs for 1–2 years. Drives venture formation, leads team building, and oversees Fellows.',
                  accent: '#8A0000',
                },
                {
                  role: 'Venture Fellow',
                  desc: 'Postdocs and graduate students with deep-tech backgrounds. 5–7 recruited per semester across all channels. Many join Proto Ventures full-time as co-founders.',
                  accent: '#D97706',
                },
                {
                  role: 'Faculty Advisors',
                  desc: 'Source of big ideas and technologies. Act as technical advisors and consultants to Proto Ventures, providing domain expertise and access to lab infrastructure.',
                  accent: '#6B7280',
                },
                {
                  role: 'Advisory Board',
                  desc: 'Per-channel group of industry experts and senior faculty. Defines focus areas, approves ideas moving through each stage gate, and selects projects for prototyping funding.',
                  accent: '#374151',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-gray-200 p-6 hover:border-[#8A0000] transition-colors group">
                  <div className="w-8 h-[2px] mb-4" style={{ backgroundColor: item.accent }} />
                  <h4 className="text-[16px] font-bold text-[#141414] mb-3 tracking-tight group-hover:text-[#8A0000] transition-colors">{item.role}</h4>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* The Ideal Venture Builder */}
            <div className="bg-gray-50 border border-gray-200 p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-3">
                    The Ideal Venture Builder
                  </div>
                  <h4 className="text-[20px] font-bold text-[#141414] mb-6 tracking-tight">
                    One-third postdoc, one-third founder, one-third investor
                  </h4>
                  <p className="text-[15px] text-gray-600 leading-relaxed mb-6">
                    The best Venture Builders are not career academics, nor are they pure business
                    operators. They sit at the intersection of deep technical knowledge, entrepreneurial
                    instinct, and market sophistication — rare individuals who can read a research paper
                    and a term sheet with equal fluency.
                  </p>
                </div>
                <div>
                  <div className="space-y-3 mb-8">
                    {[
                      'Compensated like a VC associate, autonomy like a PI',
                      'IP rights like a postdoc, leadership like a founder',
                      'Dedicated budget to create teams and run projects',
                      'Expected to join a resulting venture as senior management',
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8A0000] mt-2 shrink-0" />
                        <span className="text-[14px] text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Related programmes — outline buttons */}
                  <div className="pt-6 border-t border-gray-200">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
                      Related Programmes
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: 'Artemis Sandbox', page: 'campus' },
                        { label: 'Collegium Accelerator', page: 'collegium-alliance' },
                        { label: 'Delta V Summer', page: 'campus' },
                        { label: 'Innovation Fund', page: 'fundraising' },
                      ].map((btn, i) => (
                        <button
                          key={i}
                          onClick={() => goToPage(btn.page)}
                          className="border border-gray-300 text-gray-600 px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest hover:bg-[#8A0000] hover:text-white hover:border-[#8A0000] transition-all duration-300"
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additionality callout */}
          <div className="mt-16 bg-gray-50 p-8 lg:p-12 border-l-4 border-[#8A0000]">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-[#8A0000]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                Our North Star Metric
              </span>
            </div>
            <h3 className="text-[24px] font-extrabold text-[#141414] mb-3 tracking-tight">Additionality</h3>
            <p className="text-[16px] text-gray-600 leading-relaxed max-w-3xl">
              The single most important question we ask at every stage gate: <em>Would this venture
              exist without the Venture Studio?</em> If the answer is yes — if the founders and the
              technology would have found each other regardless — then we have not added value. Our
              goal is to create ventures that would not otherwise exist, translating research into
              impact that the market alone would leave behind.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. PEOPLE ── */}
      <section id="people" className="scroll-mt-[110px] bg-gray-50 py-16 lg:py-24">
        <div
          ref={peopleAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${peopleAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              People
            </span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            The team behind<br />the ventures
          </h2>
          <p className="text-[16px] text-gray-500 max-w-2xl leading-relaxed font-light mb-12">
            Our Venture Builders are the engine of the studio. They combine the technical depth of a
            postdoc, the hustle of a startup founder, and the market intuition of a venture
            investor. They are embedded in labs, not offices — and they build companies, not
            presentations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <div
                key={member.name}
                className="bg-white border border-gray-200 hover:border-[#8A0000] transition-colors group overflow-hidden"
              >
                {/* Placeholder avatar with initials */}
                <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-[#8A0000]/10 flex items-center justify-center">
                    <span className="text-[28px] font-extrabold text-[#8A0000]">{member.initials}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-2">
                    {member.role}
                  </div>
                  <h3 className="text-[20px] font-bold text-[#141414] mb-3 group-hover:text-[#8A0000] transition-colors leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-[14px] text-gray-600 leading-relaxed">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Join the studio CTA */}
          <div className="mt-12 text-center">
            <button
              onClick={() => goToPage('jobs')}
              className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest border-b-2 border-[#8A0000] text-[#8A0000] pb-1 hover:text-black hover:border-black transition-colors group"
            >
              <span>Join the Studio</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 6. CRIMSON CTA BAR ── */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <div className="bg-[#8A0000] px-8 py-16 md:px-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-white mb-2">
                Ready to build?
              </h2>
              <p className="text-[16px] text-white/70 leading-relaxed max-w-lg">
                Whether you&apos;re a researcher with a breakthrough, an entrepreneur seeking
                deep-tech opportunity, or a corporation wanting to sponsor a channel — Artemis
                Venture Studio is your launchpad.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <button
                onClick={() => goToPage('fundraising')}
                className="flex items-center space-x-3 bg-white text-[#8A0000] px-8 py-4 text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors group"
              >
                <span>Sponsor a Channel</span>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button
                onClick={() => goToPage('jobs')}
                className="flex items-center space-x-3 border border-white text-white px-8 py-4 text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#8A0000] transition-colors group"
              >
                <span>Join as a Builder</span>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
