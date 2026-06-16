'use client';

import { useState, useEffect, useRef } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';

interface CollegesProps {
  goToPage: (page: string, program?: string) => void;
}

/* ─── Data ─── */
const schools = [
  {
    name: 'School of Natural Sciences',
    shortDesc: 'Understanding the physical and biological foundations of the natural world.',
    fullDesc: 'Encompassing physics, chemistry, biology, mathematics, and environmental science, the School of Natural Sciences drives fundamental research into the laws governing the universe — from quantum mechanics to ecosystem dynamics. Students develop rigorous analytical frameworks and hands-on laboratory experience that prepare them for careers in research, medicine, and technology.',
    image: 'https://images.unsplash.com/photo-1579165466949-3180a3d056d5?auto=format&fit=crop&q=80&w=800',
    tag: '01 — NATURAL SCIENCES',
    stats: { faculty: '12', programs: '10', research: '$2M' },
    highlights: ['Quantum Computing Lab', 'Biodiversity Mapping Initiative', 'Planetary Science Observatory'],
  },
  {
    name: 'School of Engineering & Technology',
    shortDesc: 'Designing, building, and optimizing systems across software, data, machines, and materials.',
    fullDesc: 'Spanning computer science, electrical engineering, mechanical engineering, and materials science, this school pushes the frontier of what can be built — from sustainable infrastructure to artificial intelligence systems. The curriculum blends theoretical foundations with the practical imperative to solve real-world problems, and every student completes a capstone build project before graduation.',
    image: 'https://images.unsplash.com/photo-1634947101456-d40e5122b048?auto=format&fit=crop&q=80&w=800',
    tag: '02 — ENGINEERING & TECHNOLOGY',
    stats: { faculty: '15', programs: '11', research: '$3M' },
    highlights: ['Autonomous Systems Programme', 'Sustainable Materials Hub', 'Forge Prototyping Lab'],
  },
  {
    name: 'School of Arts & Humanities',
    shortDesc: 'Exploring meaning through culture, language, time, and expression.',
    fullDesc: 'Covering literature, philosophy, history, linguistics, and the fine arts, the School of Arts & Humanities preserves and advances the traditions of critical inquiry, creative expression, and cultural understanding that form the intellectual bedrock of any great university. Scholars here engage with the deepest questions of human existence while producing work that resonates far beyond the academy.',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800',
    tag: '03 — ARTS & HUMANITIES',
    stats: { faculty: '10', programs: '14', research: '$1M' },
    highlights: ['Comparative Civilization Centre', 'Digital Humanities Studio', 'Creative Writing Fellowship'],
  },
  {
    name: 'School of Social Sciences',
    shortDesc: 'Tackling global challenges through Anthropology, Political Science, Economics, and Urban Studies.',
    fullDesc: 'Bringing together economics, political science, sociology, anthropology, and psychology, the School of Social Sciences examines the structures, behaviors, and institutions that shape human societies — producing research that informs public policy, governance, and social innovation. Scholars here work at the intersection of theory and practice, often embedded in real communities grappling with real challenges.',
    image: 'https://images.unsplash.com/photo-1570616969692-54d6ba3d0397?auto=format&fit=crop&q=80&w=800',
    tag: '04 — SOCIAL SCIENCES',
    stats: { faculty: '9', programs: '6', research: '$1M' },
    highlights: ['Urban Futures Initiative', 'Governance Innovation Lab', 'Global Inequality Research Cluster'],
  },
  {
    name: 'School of Health & Medicine',
    shortDesc: 'Advancing human wellness, biological systems, and healthcare technologies with a focus on bioethics.',
    fullDesc: 'Integrating biomedical science, clinical practice, public health, and bioethics, this school trains the next generation of physicians, researchers, and health-system leaders. From molecular biology to population-wide health interventions, scholars advance discoveries that improve lives across the globe — always guided by a deep commitment to ethical practice and equitable access.',
    image: 'https://images.unsplash.com/photo-1514416205405-075ab2f15964?auto=format&fit=crop&q=80&w=800',
    tag: '05 — HEALTH & MEDICINE',
    stats: { faculty: '11', programs: '8', research: '$2M' },
    highlights: ['Precision Medicine Programme', 'Global Health Equity Centre', 'Bio-Regenerative Tissue Lab'],
  },
  {
    name: 'School of Education & Human Development',
    shortDesc: 'Advancing learning science, educational ecosystems, and meta-learning strategies.',
    fullDesc: 'Focusing on pedagogy, cognitive science, educational leadership, and human development across the lifespan, the school studies how people learn and grow — preparing educators and policymakers to build more effective, equitable learning systems worldwide. Artemis itself serves as a living laboratory for educational innovation, making this school uniquely positioned to test and refine new models in real time.',
    image: 'https://images.unsplash.com/photo-1630480330188-1818487a2426?auto=format&fit=crop&q=80&w=800',
    tag: '06 — EDUCATION & HUMAN DEVELOPMENT',
    stats: { faculty: '7', programs: '6', research: '$0.5M' },
    highlights: ['Meta-Learning Research Unit', 'Cognitive Development Lab', 'Global Teacher Leadership Programme'],
  },
  {
    name: 'School of Business',
    shortDesc: 'Developing leadership in international commerce, finance, analytics, and entrepreneurial systems.',
    fullDesc: 'Encompassing finance, strategy, entrepreneurship, and organizational leadership, the School of Business cultivates principled, innovative leaders who can navigate complexity and drive value creation in an era of rapid technological and social change. The curriculum is anchored in ethical reasoning and global perspective, ensuring that Artemis business graduates lead with both competence and conscience.',
    image: 'https://images.unsplash.com/photo-1613592237001-84fb727ce569?auto=format&fit=crop&q=80&w=800',
    tag: '07 — BUSINESS',
    stats: { faculty: '8', programs: '6', research: '$1M' },
    highlights: ['Venture Studio Incubator', 'Sustainable Finance Initiative', 'Global Supply Chain Observatory'],
  },
];

const collegesStats = [
  { value: '7', label: 'Academic Schools', detail: 'Spanning every major discipline' },
  { value: '72', label: 'Faculty', detail: 'Distinguished scholars & researchers' },
  { value: '61', label: 'Programs of Study', detail: 'Undergraduate & graduate pathways' },
  { value: '$10.5M', label: 'Research Expenditure', detail: 'Annual investment across all schools' },
];

const exploreLinks = [
  { label: 'Programs of Study', page: 'programs' },
  { label: 'Undergraduate Study', page: 'undergraduate' },
  { label: 'Course Catalog', page: 'undergraduate_curriculum' },
  { label: 'Research Opportunities', page: 'research' },
  { label: 'Graduate Admissions', page: 'admissions' },
  { label: 'Faculty Directory', page: 'our-people' },
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
export default function Colleges({ goToPage }: CollegesProps) {
  const introAnim = useInView();
  const statsAnim = useInView();
  const schoolsAnim = useInView();
  const exploreAnim = useInView();
  const activeSection = useActiveSection(['overview', 'schools', 'explore']);

  return (
    <div className="flex flex-col bg-white">
      {/* ── 1. HERO ── */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[45vh] min-h-[360px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1687172140737-22c4c3371f3e?auto=format&fit=crop&q=80&w=1800"
          className="absolute inset-0 w-full h-full object-cover grayscale"
          alt="Our Colleges"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-16">
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Academic Structure</span>
          </div>
          <h1 className="text-[32px] sm:text-[44px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6 uppercase">
            Specialized<br />Excellence
          </h1>
          <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light">
            Each school within Artemis represents a pillar of human achievement, dedicated to deep expertise and cross-collegiate collaboration. We break the barriers between science and humanities.
          </p>
        </div>
          </div>
        </div>
      </section>

      <OnThisPageNav
        sections={[
          { id: 'overview', label: 'Overview' },
          { id: 'schools', label: 'Schools' },
          { id: 'explore', label: 'Explore' },
        ]}
        activeSection={activeSection}
      />

      {/* ── 2. OVERVIEW ── */}
      <section id="overview" className="scroll-mt-[110px] max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 py-16 lg:py-24">
        <div
          ref={introAnim.ref}
          className={`transition-all duration-700 ${introAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
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
                Seven schools,<br />one mission
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                The University of Artemis is organized into seven academic schools, each a semi-autonomous unit with its own Dean, Faculty Council, and research agenda. Together they span the full breadth of human inquiry — from the subatomic to the societal, from the ancient text to the algorithmic frontier.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Unlike the rigid departmental silos of traditional universities, Artemis schools are porous by design. Faculty hold joint appointments across schools, students design interdisciplinary pathways that cross boundaries, and research challenges are tackled by teams assembled from wherever the relevant expertise resides. The school structure provides depth; the network provides breadth.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                Each school sets its own research priorities, manages laboratory and digital infrastructure, and coordinates cross-college academic programming — ensuring that the intellectual output of the network exceeds the sum of its parts.
              </p>
              <button
                onClick={() => goToPage('education')}
                className="flex items-center space-x-4 py-3 border-b-2 border-[#141414] text-[#141414] text-[13px] font-bold uppercase tracking-[0.2em] hover:text-[#8A0000] hover:border-[#8A0000] transition-all group"
              >
                <span>Explore Education at Artemis</span>
                <svg className="group-hover:translate-x-2 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>

            {/* Right — Quote + Image */}
            <div>
              <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden mb-6">
                <img
                  src="https://images.unsplash.com/photo-1594750852563-5ed8e0421d40?auto=format&fit=crop&q=80&w=800"
                  alt="Students collaborating across disciplines"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="border-l-4 border-[#8A0000] pl-6 py-2">
                <p className="text-[22px] font-bold text-[#141414] leading-tight mb-2">
                  &ldquo;The borders between disciplines are where the most interesting discoveries live.&rdquo;
                </p>
                <p className="text-[12px] font-bold uppercase tracking-widest text-[#8A0000]">
                  Artemis Founding Principle
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. STATS ROW ── */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div
          ref={statsAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${statsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">By the Numbers</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            {collegesStats.map((stat, i) => (
              <div key={i} className="relative pl-6 border-l-2 border-[#8A0000]">
                <div className="text-[36px] font-black text-[#141414] leading-none mb-2 tabular-nums">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-1">{stat.label}</div>
                <div className="text-[12px] text-gray-500 leading-snug">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. SCHOOLS GRID ── */}
      <section id="schools" className="scroll-mt-[110px] py-16 lg:py-24">
        <div
          ref={schoolsAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${schoolsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Section divider */}
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">Our Schools</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="mb-12">
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
              Seven pillars of<br />knowledge
            </h2>
            <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl">
              From the subatomic to the societal, our seven schools organize the full scope of human knowledge into collaborative research divisions — each with distinct expertise, yet all united by a shared commitment to interdisciplinary inquiry.
            </p>
          </div>

          {/* School cards */}
          <div className="space-y-0">
            {schools.map((school, i) => (
              <div
                key={i}
                onClick={() => goToPage('school_detail', school.name)}
                className="group border-b border-gray-200 hover:border-[#8A0000] transition-colors cursor-pointer"
              >
                {/* Top row: Image + Basic info */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                  {/* Image */}
                  <div className="md:col-span-4 aspect-[16/9] md:aspect-auto bg-gray-100 overflow-hidden">
                    <img
                      src={school.image}
                      alt={school.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="md:col-span-8 p-8 md:p-10 flex flex-col justify-center">
                    <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-4 uppercase">
                      {school.tag}
                    </div>
                    <h3 className="text-[24px] md:text-[28px] font-bold text-[#141414] group-hover:text-[#8A0000] transition-colors leading-tight mb-4">
                      {school.name}
                    </h3>
                    <p className="text-[15px] text-gray-600 leading-relaxed mb-6">
                      {school.fullDesc}
                    </p>

                    {/* Stats row */}
                    <div className="flex gap-8 mb-6">
                      <div>
                        <div className="text-[20px] font-black text-[#141414] leading-none tabular-nums">{school.stats.faculty}</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mt-1">Faculty</div>
                      </div>
                      <div>
                        <div className="text-[20px] font-black text-[#141414] leading-none tabular-nums">{school.stats.programs}</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mt-1">Programs</div>
                      </div>
                      <div>
                        <div className="text-[20px] font-black text-[#141414] leading-none tabular-nums">{school.stats.research}</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mt-1">Research</div>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {school.highlights.map((h, j) => (
                        <span key={j} className="text-[11px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-3 py-1.5">
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#8A0000] border-b-2 border-[#8A0000] w-fit pb-0.5 group-hover:text-black group-hover:border-black transition-colors">
                      <span>Explore School</span>
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CARD-AND-IMAGE PARALLAX ── */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full min-h-[380px] md:min-h-[460px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1624555130296-e551faf8969b?auto=format&fit=crop&q=80&w=1400"
              alt="Interdisciplinary collaboration at Artemis"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="relative z-10 flex items-end h-full min-h-[380px] md:min-h-[460px] p-5 sm:p-8 md:p-14">
              <div className="bg-white max-w-sm p-5 sm:p-8 shadow-xl">
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">Cross-School Collaboration</div>
                <h3 className="text-[24px] font-bold text-[#141414] mb-3 leading-tight">Borders between fields are porous</h3>
                <p className="text-[14px] text-gray-600 leading-relaxed mb-5">
                  Faculty hold joint appointments across schools. Students design interdisciplinary pathways that cross boundaries. Research teams are assembled from wherever the relevant expertise resides — not from wherever the org chart places it.
                </p>
                <button
                  onClick={() => goToPage('research')}
                  className="text-[11px] font-bold uppercase tracking-widest border-b-2 border-[#8A0000] text-[#8A0000] pb-1 hover:text-black hover:border-black transition-colors"
                >
                  Explore Research →
                </button>
              </div>
            </div>
          </div>
        </div>
          </div>
      </section>

      {/* ── 6. EXPLORE MORE ── */}
      <section id="explore" className="scroll-mt-[110px] py-16 lg:py-24">
        <div
          ref={exploreAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${exploreAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Explore</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-12">
            <div>
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
                Discover your<br />path at Artemis
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed">
                Whether you are seeking a specific program, exploring research opportunities, or simply trying to understand what makes Artemis different, these resources will guide you deeper into the academic experience we offer.
              </p>
            </div>

            {/* Link rows with chevrons */}
            <div className="space-y-0">
              {exploreLinks.map((link, i) => (
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

      {/* ── 7. CRIMSON CTA BAR ── */}
      <section className="bg-[#8A0000] py-16 px-5 sm:px-8 lg:px-20">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-[28px] md:text-[36px] font-extrabold leading-tight tracking-tighter text-white mb-2">
              Find the school that fits your ambition
            </h2>
            <p className="text-[16px] text-white/70 leading-relaxed max-w-lg">
              Every school at Artemis shares a commitment to interdisciplinary inquiry, global perspective, and the belief that the most important discoveries happen at the intersection of fields.
            </p>
          </div>
          <button
            onClick={() => goToPage('admissions')}
            className="flex items-center space-x-3 bg-white text-[#8A0000] px-8 py-4 text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors shrink-0 group"
          >
            <span>Start Your Application</span>
            <svg className="group-hover:translate-x-2 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      </section>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
