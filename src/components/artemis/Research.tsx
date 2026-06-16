'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';

interface ResearchProps {
  goToPage: (page: string, centerSlug?: string) => void;
}

/* ─── Data ─── */
const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1579165466949-3180a3d056d5?auto=format&fit=crop&q=80&w=800',
    alt: 'Laboratory research',
    caption: 'A postdoctoral researcher in the Center for Synthetic Intelligence calibrates a neural mapping array — part of the Symbiotic Cognition Initiative that unifies neuroscience, philosophy, and computational engineering.',
  },
  {
    src: 'https://images.unsplash.com/photo-1514416205405-075ab2f15964?auto=format&fit=crop&q=80&w=800',
    alt: 'Biomedical research',
    caption: 'Bio-Regenerative Arts researchers cultivate engineered tissue scaffolds designed to accelerate wound healing in extreme environments, from deep-sea habitats to off-world colonies.',
  },
  {
    src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    alt: 'Autonomous systems',
    caption: 'Graduate researchers test an autonomous rover platform at the Artemis Proving Grounds — a cross-center initiative between Cosmological Humanities and Neo-Economics.',
  },
  {
    src: 'https://images.unsplash.com/photo-1613592237001-84fb727ce569?auto=format&fit=crop&q=80&w=800',
    alt: 'Venture demonstration',
    caption: 'Student entrepreneurs pitch at the Forge Demo Day, where Artemis spin-offs have collectively raised founding ventures through the Forge incubator since the program\'s inception.',
  },
  {
    src: 'https://images.unsplash.com/photo-1570616969692-54d6ba3d0397?auto=format&fit=crop&q=80&w=800',
    alt: 'Interdisciplinary collaboration',
    caption: 'Teams from the Neo-Economics Center and the Center for Synthetic Intelligence collaborate on post-automation governance models — research that informs policy across three continents.',
  },
];

const joinLinks = [
  { label: 'Support research at Artemis', page: 'fundraising' },
  { label: 'Partner with us', page: 'innovation' },
  { label: 'Become a student researcher', page: 'education' },
  { label: 'Participate in a study', page: 'about' },
  { label: 'Research events & lectures', page: 'campus' },
  { label: 'Research careers', page: 'jobs' },
];

const featuredProjects = [
  {
    title: 'The Synthetic Humanity Project',
    desc: 'A multi-year, cross-college initiative exploring the ethical and biological integration of AI into human cognition. Over 12 faculty from across the centers contribute to a research agenda that will define what it means to think alongside machines.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1400',
    tag: '01 — SYNTHETIC INTELLIGENCE',
  },
  {
    title: 'Bio-Regenerative Systems Initiative',
    desc: 'Pioneering closed-loop biological systems that sustain human life in extreme environments — from deep-sea habitats to extraterrestrial colonies. This initiative bridges the Center for Bio-Regenerative Arts with industry partners in aerospace and marine engineering.',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=1400',
    tag: '02 — BIO-REGENERATIVE ARTS',
  },
  {
    title: 'Cosmological Data Observatory',
    desc: 'Processing petabytes of telescope data with novel AI algorithms to map the large-scale structure of the universe and detect signatures of new physics — a collaboration between Cosmological Humanities and the global telescope network.',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1400',
    tag: '03 — COSMOLOGICAL HUMANITIES',
  },
];

const researchStats = [
  { value: '$12M', label: 'Research expenditure', detail: 'Annual spend across all centers' },
  { value: '20', label: 'Micro-Colleges', detail: 'Active research nodes worldwide' },
  { value: '#1', label: 'Transdisciplinary output', detail: 'Cross-field publications globally' },
  { value: '0', label: 'Spin-offs launched', detail: 'In development from foundational research' },
];

const highlightCards = [
  {
    tag: '01 — INFRASTRUCTURE',
    title: 'Space to innovate',
    desc: 'Over 25,000 sq ft of dedicated research space across three continents — from wet labs to quantum computing cleanrooms — designed to let ideas breathe and grow without constraint. Every Artemis researcher, regardless of rank or department, has access.',
    image: 'https://images.unsplash.com/photo-1634947101456-d40e5122b048?auto=format&fit=crop&q=80&w=800',
  },
  {
    tag: '02 — CHALLENGE',
    title: 'Solving wicked problems',
    desc: 'Artemis researchers tackle problems that refuse to stay within disciplinary borders: climate adaptation, pandemic preparedness, autonomous governance, and the ethics of cognitive enhancement. We build the right teams — regardless of organizational boundaries.',
    image: 'https://images.unsplash.com/photo-1579165466949-3180a3d056d5?auto=format&fit=crop&q=80&w=800',
  },
  {
    tag: '03 — VENTURE',
    title: 'Empowering entrepreneurs',
    desc: 'With ventures in incubation, building toward impact, Artemis translates discovery into impact faster than any peer institution. The Forge incubator and Nexus digital ecosystem connect developers, designers, and domain experts to build what comes next.',
    image: 'https://images.unsplash.com/photo-1613592237001-84fb727ce569?auto=format&fit=crop&q=80&w=800',
  },
];

const centers = [
  {
    name: 'Frontiers of Artemis Research',
    desc: 'The coordinating hub that defines and stewards Artemis\'s research identity — setting cross-cutting priorities, seeding bold interdisciplinary inquiries, and ensuring that every center contributes to a coherent, mission-driven knowledge enterprise.',
    img: 'https://images.unsplash.com/photo-1570616969692-54d6ba3d0397?auto=format&fit=crop&q=80&w=600',
    slug: 'frontiers-of-artemis-research',
  },
  {
    name: 'Civilization Architecture',
    desc: 'Designing the governance systems, legal frameworks, and social contracts that underpin resilient, just, and adaptable civilizations — from city-states to planetary polities.',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=600',
    slug: 'civilization-architecture',
  },
  {
    name: 'Planetary Systems',
    desc: 'Understanding Earth as an integrated system of atmosphere, hydrosphere, lithosphere, and biosphere — and extending that understanding to other worlds, from Mars to exoplanets.',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600',
    slug: 'planetary-systems',
  },
  {
    name: 'Space & Frontier Science',
    desc: 'Pushing the boundaries of human presence and scientific inquiry beyond Earth — from orbital habitats and lunar bases to deep-space propulsion and the ethics of cosmic expansion.',
    img: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=600',
    slug: 'space-frontier-science',
  },
  {
    name: 'Emerging Technologies',
    desc: 'Tracking, evaluating, and shaping the technologies that will define the next half-century — quantum computing, synthetic biology, neurotechnology, and the convergence of fields that creates entirely new capabilities.',
    img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600',
    slug: 'emerging-technologies',
  },
  {
    name: 'Next-Gen Education',
    desc: 'Reimagining how humans learn, teach, and create knowledge in an era of AI tutors, immersive environments, and lifelong learning continua — because the future of education is not a bigger classroom, it is a fundamentally different one.',
    img: 'https://images.unsplash.com/photo-1624555130296-e551faf8969b?auto=format&fit=crop&q=80&w=600',
    slug: 'next-gen-education',
  },
  {
    name: 'Materials, Matter & Manufacturing Futures',
    desc: 'From metamaterials and programmable matter to additive manufacturing at scale — designing the substances and processes that will build the infrastructure of the future.',
    img: 'https://images.unsplash.com/photo-1634947101456-d40e5122b048?auto=format&fit=crop&q=80&w=600',
    slug: 'materials-matter-manufacturing',
  },
  {
    name: 'Agriculture, Food Systems',
    desc: 'Securing humanity\'s food future through precision agriculture, cellular agriculture, closed-loop ecosystems, and equitable distribution — from urban vertical farms to planetary-scale food networks.',
    img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=600',
    slug: 'agriculture-food-systems',
  },
  {
    name: 'Robotics, Mechatronics & Physical Autonomy',
    desc: 'Building machines that move, sense, decide, and collaborate in the physical world — from surgical micro-robots to autonomous construction crews and swarm logistics systems.',
    img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600',
    slug: 'robotics-mechatronics-autonomy',
  },
  {
    name: 'Gaming & Worldbuilding',
    desc: 'Harnessing the power of play, simulation, and narrative worldbuilding as tools for research, education, and civic imagination — because the futures we can imagine are the futures we can build.',
    img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600',
    slug: 'gaming-worldbuilding',
  },
  {
    name: 'Energy Systems',
    desc: 'Engineering the energy infrastructure of a post-carbon civilization — from next-generation fusion and orbital solar to distributed microgrids and the politics of energy sovereignty.',
    img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=600',
    slug: 'energy-systems',
  },
  {
    name: 'Health & Bioethics',
    desc: 'Advancing human health while rigorously examining the moral dimensions of biomedical innovation — because curing disease is not enough; we must ensure that the cures are just, accessible, and humane.',
    img: 'https://images.unsplash.com/photo-1514416205405-075ab2f15964?auto=format&fit=crop&q=80&w=600',
    slug: 'health-bioethics',
  },
  {
    name: 'Urban Futures',
    desc: 'Designing cities that are resilient, equitable, and alive — integrating architecture, ecology, computation, and governance to create urban systems that adapt to their inhabitants rather than the reverse.',
    img: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&q=80&w=600',
    slug: 'urban-futures',
  },
  {
    name: 'Biotech & Life Sciences',
    desc: 'From gene editing and synthetic organisms to ecosystem engineering and de-extinction — pushing the boundaries of what life can do, with deep commitment to the ethics of reshaping the living world.',
    img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=600',
    slug: 'biotech-life-sciences',
  },
  {
    name: 'Fintech, DeFi & Economics',
    desc: 'Rethinking money, markets, and economic governance for a decentralized, automated, and globally interconnected world — designing financial systems that serve people, not the other way around.',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=600',
    slug: 'fintech-defi-economics',
  },
];

const learnMoreLinks = [
  {
    heading: 'Research',
    links: ['About Artemis research', 'Undergraduate research opportunities', 'Core facilities', 'Find an expert'],
  },
  {
    heading: 'Entrepreneurship & Innovation',
    links: ['Support for entrepreneurs', 'Corporate partnerships', 'Economic development', 'International development', 'Technology transfer'],
  },
];

/* ─── Hook: animate on scroll ─── */
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

/* ─── Component ─── */
export default function Research({ goToPage }: ResearchProps) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  const [activeGallery, setActiveGallery] = useState(0);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [centerScrollIndex, setCenterScrollIndex] = useState(0);
  const centersTrackRef = useRef<HTMLDivElement>(null);
  const centerCounterRef = useRef<HTMLSpanElement>(null);
  const heroAnim = useInView();
  const joinAnim = useInView();
  const statsAnim = useInView();
  const highlightsAnim = useInView();
  const cardsAnim = useInView();
  const facilitiesAnim = useInView();

  const activeSection = useActiveSection(['join', 'growth', 'highlights', 'centers', 'learn']);

  // Auto-cycle gallery
  useEffect(() => {
    const timer = setInterval(() => setActiveGallery(i => (i + 1) % galleryImages.length), 5000);
    return () => clearInterval(timer);
  }, []);

  // Centers carousel helpers
  const centersPerView = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const CARD_WIDTH_PLUS_GAP = 324; // 300px card + 24px gap

  const scrollCenters = (direction: 'left' | 'right') => {
    const track = centersTrackRef.current;
    if (!track) return;
    const perView = centersPerView();
    const scrollAmount = CARD_WIDTH_PLUS_GAP * perView;
    const newScroll = direction === 'right'
      ? track.scrollLeft + scrollAmount
      : track.scrollLeft - scrollAmount;
    track.scrollTo({ left: newScroll, behavior: 'smooth' });
  };

  // Auto-slide centers carousel
  useEffect(() => {
    const track = centersTrackRef.current;
    if (!track) return;
    const timer = setInterval(() => {
      const perView = centersPerView();
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= maxScroll - 10) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollCenters('right');
      }
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleCentersScroll = () => {
    const track = centersTrackRef.current;
    if (!track) return;
    const idx = Math.round(track.scrollLeft / CARD_WIDTH_PLUS_GAP);
    setCenterScrollIndex(Math.min(idx, centers.length - centersPerView()));
  };

  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* ── 1. HERO ── */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[45vh] min-h-[360px] overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1570616969692-54d6ba3d0397?auto=format&fit=crop&q=80&w=1800"
          className="absolute inset-x-0 -top-[20%] w-full h-[140%] object-cover grayscale"
          style={{ y: heroY }}
          alt="Research at Artemis"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-16">
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Knowledge Enterprise</span>
          </div>
          <h1 className="text-[30px] sm:text-[44px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6 uppercase">
            Advancing the<br />boundaries of<br />human knowledge
          </h1>
          <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light">
            At Artemis, research is not a siloed activity but a collective endeavor. We prioritize high-impact projects that address the core existential challenges of our time.
          </p>
        </div>
          </div>
        </div>
      </section>

      <OnThisPageNav
        sections={[
          { id: 'join', label: 'Join Us' },
          { id: 'growth', label: 'Growth & Impact' },
          { id: 'highlights', label: 'Highlights' },
          { id: 'centers', label: 'Centers' },
          { id: 'learn', label: 'Learn More' },
        ]}
        activeSection={activeSection}
      />

      {/* ── 2. REVOLUTIONIZING THE RESEARCH ENTERPRISE ── */}
      <section className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 py-16 lg:py-24">
        <div
          ref={heroAnim.ref}
          className={`transition-all duration-700 ${heroAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Section divider */}
          <div className="mb-6 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                Our Approach
              </span>
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left — Text */}
            <div>
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                Revolutionizing the research enterprise
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                The challenges that humanity faces — from health care to cybersecurity to affordable energy — are complex and interconnected. Solving them demands the creativity of many minds from many fields. Artemis connects those minds in an ecosystem where ideas thrive.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                We have reshaped the very structure of the university, centering our academic units and research institutes around grand challenges. Academic silos no longer serve. We build the right teams to accomplish our goals, regardless of disciplinary or organizational boundaries.
              </p>
              <button
                onClick={() => goToPage('innovation')}
                className="flex items-center space-x-4 py-3 border-b-2 border-[#141414] text-[#141414] text-[13px] font-bold uppercase tracking-[0.2em] hover:text-[#8A0000] hover:border-[#8A0000] transition-all group"
              >
                <span>Explore Our Model</span>
                <svg className="group-hover:translate-x-2 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>

            {/* Right — Gallery */}
            <div>
              <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                {galleryImages.map((img, i) => (
                  <img
                    key={i}
                    src={img.src}
                    alt={img.alt}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === activeGallery ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
              </div>
              {/* Thumbnail strip */}
              <div className="flex gap-2 mt-3">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveGallery(i)}
                    className={`flex-1 aspect-[4/3] overflow-hidden border-2 transition-all ${i === activeGallery ? 'border-[#8A0000]' : 'border-transparent opacity-50 hover:opacity-80'}`}
                  >
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              {/* Caption */}
              <p className="text-[13px] text-gray-500 leading-relaxed mt-3 min-h-[48px]">
                {galleryImages[activeGallery].caption}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. BE A PART OF ARTEMIS RESEARCH ── */}
      <section id="join" className="scroll-mt-[110px] bg-gray-50 py-16 lg:py-24">
        <div
          ref={joinAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${joinAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left */}
            <div>
              <div className="mb-8 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Get Involved</span>
              </div>
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
                Be a part of<br />Artemis research
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed">
                We invite students, faculty, staff, alumni, businesses and community members to join us in advancing discovery and innovation. Whatever your role, there is a place for you here.
              </p>
            </div>
            {/* Right — Link grid */}
            <div className="space-y-0">
              {joinLinks.map((link, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(link.page)}
                  className="group flex justify-between items-center py-4 border-b border-gray-200 hover:border-[#8A0000] transition-colors w-full text-left"
                >
                  <span className="text-[14px] font-bold text-gray-700 group-hover:text-[#8A0000] transition-colors">
                    {link.label}
                  </span>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-[#8A0000] group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. FEATURED PROJECTS ── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          {/* Section divider */}
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">Featured Projects</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            {featuredProjects.map((project, i) => (
              <div
                key={i}
                className="relative flex-1 min-h-[280px] md:min-h-[380px] overflow-hidden cursor-pointer group"
                onMouseEnter={() => setExpandedProject(i)}
                onMouseLeave={() => setExpandedProject(null)}
                onClick={() => setExpandedProject(expandedProject === i ? null : i)}
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/75 transition-colors duration-500" />
                <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                  <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-2 uppercase">{project.tag}</div>
                  <h3 className="text-[22px] md:text-[26px] font-bold text-white mb-2 leading-tight">
                    {project.title}
                  </h3>
                  <div className={`overflow-hidden transition-all duration-500 ${expandedProject === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-[14px] text-white/80 leading-relaxed mb-5">
                      {project.desc}
                    </p>
                    <button
                      onClick={(e) => { e.stopPropagation(); goToPage('centers-of-inquiry'); }}
                      className="text-[11px] font-bold uppercase tracking-widest border border-white text-white px-5 py-2 hover:bg-white hover:text-[#8A0000] transition-colors"
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. RESEARCH GROWTH & IMPACT ── */}
      <section id="growth" className="scroll-mt-[110px] py-16 lg:py-24">
        <div
          ref={statsAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${statsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">By the Numbers</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
            {/* Main — 8 cols */}
            <div className="lg:col-span-8">
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
                Research growth<br />and impact
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed max-w-xl">
                Artemis is one of the fastest-growing research enterprises in the world, more than doubling its research expenditure over the last ten years. We continually climb in global rankings for transdisciplinary output, and we lead in bringing innovations to market.
              </p>
            </div>
            {/* Sidebar — 4 cols */}
            <div className="lg:col-span-4 lg:border-l lg:border-gray-200 lg:pl-8">
              <div className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">Related links</div>
              <div className="space-y-3">
                {[
                  { label: 'Research highlights from the past year', page: 'about' },
                  { label: 'Knowledge Enterprise facts & figures', page: 'about' },
                  { label: 'Artemis faculty excellence', page: 'our-people' },
                  { label: 'Funding opportunities', page: 'fundraising' },
                ].map((link, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(link.page)}
                    className="block w-full text-left text-[14px] text-[#8A0000] hover:underline leading-snug"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            {researchStats.map((stat, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gray-100"></div>
                <div className="text-[36px] font-black text-[#141414] leading-none mb-2 tabular-nums">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-1">{stat.label}</div>
                <div className="text-[12px] text-gray-500 leading-snug">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. HIGHLIGHTS ── */}
      <section id="highlights" className="scroll-mt-[110px] py-16 lg:py-24 bg-gray-50">
        <div
          ref={highlightsAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${highlightsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">Highlights</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Card-and-image parallax section */}
          <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full min-h-[380px] md:min-h-[460px] overflow-hidden mb-20">
            <img
              src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1400"
              alt="Global Futures Lab"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="relative z-10 flex items-end h-full min-h-[380px] md:min-h-[460px] p-5 sm:p-8 md:p-14">
              <div className="bg-white max-w-sm p-5 sm:p-8 shadow-xl">
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">Global Initiative</div>
                <h3 className="text-[24px] font-bold text-[#141414] mb-3 leading-tight">Shaping tomorrow, today</h3>
                <p className="text-[14px] text-gray-600 leading-relaxed mb-5">
                  The Artemis Global Futures Laboratory is taking action toward a sustainable future in which well-being is attainable for everyone — bridging research, policy, and practice across continents.
                </p>
                <button
                  onClick={() => goToPage('innovation')}
                  className="text-[11px] font-bold uppercase tracking-widest border-b-2 border-[#8A0000] text-[#8A0000] pb-1 hover:text-black hover:border-black transition-colors"
                >
                  Visit Global Futures Lab →
                </button>
              </div>
            </div>
          </div>

          {/* Three highlight cards */}
          <div
            ref={cardsAnim.ref}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${cardsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {highlightCards.map((card, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[3/2] bg-gray-100 overflow-hidden mb-6">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">{card.tag}</div>
                <h3 className="text-[20px] font-bold text-[#141414] mb-3 group-hover:text-[#8A0000] transition-colors leading-tight">{card.title}</h3>
                <p className="text-[14px] text-gray-600 leading-relaxed mb-4">{card.desc}</p>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#141414] border-b border-black w-fit group-hover:text-[#8A0000] group-hover:border-[#8A0000] transition-all">
                  Learn more
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* ── 7. CORE RESEARCH FACILITIES ── */}
      <section className="py-16 lg:py-24">
        <div
          ref={facilitiesAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${facilitiesAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full min-h-[360px] md:min-h-[440px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1634947101456-d40e5122b048?auto=format&fit=crop&q=80&w=1400"
              alt="Core Research Facilities"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="relative z-10 flex items-end h-full min-h-[360px] md:min-h-[440px] p-5 sm:p-8 md:p-14">
              <div className="bg-white max-w-sm p-5 sm:p-8 shadow-xl">
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">Infrastructure</div>
                <h3 className="text-[24px] font-bold text-[#141414] mb-3 leading-tight">Core Research Facilities</h3>
                <p className="text-[14px] text-gray-600 leading-relaxed mb-5">
                  Artemis Core Research Facilities empower researchers, businesses and industry leaders by offering access to specialized equipment and the expertise of skilled scientists — open to every researcher regardless of department.
                </p>
                <button
                  onClick={() => goToPage('campus')}
                  className="text-[11px] font-bold uppercase tracking-widest border-b-2 border-[#8A0000] text-[#8A0000] pb-1 hover:text-black hover:border-black transition-colors"
                >
                  Explore Facilities →
                </button>
              </div>
            </div>
          </div>
        </div>
          </div>
      </section>

      {/* ── 8. CENTERS OF INQUIRY ── */}
      <section id="centers" className="scroll-mt-[110px] py-16 lg:py-24 overflow-hidden">
        {/* Intro — constrained width */}
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">Centers of Inquiry</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="mb-12">
            <div className="mb-8 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Replacing Departments</span>
            </div>
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
              Centers of Inquiry
            </h2>
            <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl mb-4">
              Our Centers of Inquiry stand as the epicenters of transformative research. These centers are structured to seamlessly blend curiosity-driven exploration with goal-oriented research, focusing on unraveling significant challenges. Inspired by the pursuit of knowledge as a cohesive whole, these centers are the cornerstone of our academic landscape.
            </p>
            <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl mb-8">
              Each center is a powerhouse of interdisciplinary collaboration, bringing together researchers from diverse disciplines to tackle complex challenges. They replace traditional academic departments, creating an intellectual environment where reality is seen as interconnected and holistic — fostering a philosophical habit of mind that encourages learners to perceive knowledge as unified.
            </p>
          </div>
        </div>

        {/* Carousel — constrained within max-w-[1400px] */}
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          {/* Nav header row */}
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={() => goToPage('centers-of-inquiry')}
              className="flex items-center space-x-3 py-3 border-b-2 border-[#8A0000] text-[#8A0000] text-[13px] font-bold uppercase tracking-[0.2em] hover:text-black hover:border-black transition-all group"
            >
              <span>Explore All Centers</span>
              <svg className="group-hover:translate-x-2 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            <div className="flex items-center gap-3">
              <span ref={centerCounterRef} className="text-[12px] font-bold text-gray-400 tracking-wider tabular-nums">
                {centerScrollIndex + 1}–{Math.min(centerScrollIndex + centersPerView(), centers.length)} / {centers.length}
              </span>
              <button
                onClick={() => scrollCenters('left')}
                className="w-11 h-11 border border-gray-300 hover:border-[#8A0000] hover:text-[#8A0000] flex items-center justify-center transition-colors"
                aria-label="Previous centers"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <button
                onClick={() => scrollCenters('right')}
                className="w-11 h-11 border border-gray-300 hover:border-[#8A0000] hover:text-[#8A0000] flex items-center justify-center transition-colors"
                aria-label="Next centers"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>

          {/* Scroll track */}
          <div
            ref={centersTrackRef}
            onScroll={handleCentersScroll}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {centers.map((center, i) => (
              <div
                key={i}
                onClick={() => goToPage('center-detail', center.slug)}
                className="group snap-start shrink-0 w-[280px] md:w-[300px] border border-gray-200 hover:border-[#8A0000] transition-all cursor-pointer bg-white shadow-sm hover:shadow-lg overflow-hidden"
              >
                <div className="aspect-[16/10] bg-gray-100 overflow-hidden relative">
                  <img src={center.img} alt={center.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 text-[10px] font-bold text-[#8A0000] tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="text-[15px] font-bold group-hover:text-[#8A0000] transition-colors leading-snug mb-2 min-h-[40px]">{center.name}</h4>
                  <p className="text-gray-500 text-[13px] leading-relaxed mb-3 line-clamp-3">{center.desc}</p>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#141414] border-b border-black w-fit group-hover:text-[#8A0000] group-hover:border-[#8A0000] transition-all">
                    Explore →
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 mt-4">
            <div className="h-[2px] bg-gray-100 w-full relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-[#8A0000] transition-all duration-300"
                style={{ width: `${((centerScrollIndex + centersPerView()) / centers.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. LEARN MORE ── */}
      <section id="learn" className="scroll-mt-[110px] bg-gray-50 py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Resources</span>
          </div>
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-12">
            Learn more about the<br />Knowledge Enterprise
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {learnMoreLinks.map((col, i) => (
              <div key={i}>
                <h3 className="text-[13px] font-bold uppercase tracking-widest text-gray-900 mb-4 border-b border-gray-200 pb-2">{col.heading}</h3>
                <div className="space-y-3">
                  {col.links.map((link, j) => (
                    <button
                      key={j}
                      onClick={() => goToPage('about')}
                      className="block text-[14px] text-[#8A0000] hover:underline text-left leading-snug"
                    >
                      {link}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
