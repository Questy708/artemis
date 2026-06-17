'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';

interface UndergraduateStudyProps {
  goToPage: (page: string) => void;
}

/* ─── Data ─── */
const journeyYears = [
  {
    year: 'Year 1',
    title: 'Inception & Core',
    desc: 'Foundational Core + Interdisciplinary Exposure. Focus on learning to learn, think, and act. Students enter a Micro-College, join a Living Commons, and begin their journey through the Homo Eruditus curriculum with courses that span the humanities, sciences, and social sciences.',
    icon: '01',
  },
  {
    year: 'Year 2',
    title: 'Concentration & Orientation',
    desc: 'Concentration Courses + Guild Orientation. Integration with real-world problems begins. Students declare a concentration within one of the seven schools while continuing interdisciplinary exploration. Guild orientations connect students to professional communities of practice.',
    icon: '02',
  },
  {
    year: 'Year 3',
    title: 'Advanced Work & Deployment',
    desc: 'Advanced Coursework + Studio Work + Global Deployment. Extensive field-based inquiry through Artemis\'s global node network. Students spend at least one semester at a different campus, engaging in cross-cultural research and collaborative projects with international partners.',
    icon: '03',
  },
  {
    year: 'Year 4',
    title: 'Capstone & Contribution',
    desc: 'Capstone + Embedded Inquiry/Internship + Public Contribution. Delivering open IP and research that benefits the commons. Every senior completes a capstone project within a Center of Inquiry, demonstrating both epistemic contribution and civic impact.',
    icon: '04',
  },
];

const metaCompetencies = [
  { name: 'Systems Thinking', desc: 'Understanding how parts interact within wholes — from ecosystems to economies to social movements.' },
  { name: 'Ethical Reasoning', desc: 'Navigating moral complexity with intellectual honesty, empathy, and a commitment to justice.' },
  { name: 'Commons Literacy', desc: 'Recognizing and stewarding shared resources — knowledge, ecology, culture, and digital infrastructure.' },
  { name: 'Empirical Inquiry', desc: 'Designing rigorous investigations, evaluating evidence, and distinguishing knowledge from belief.' },
  { name: 'Communicative Precision', desc: 'Expressing ideas with clarity across media, cultures, and disciplines — from code to narrative to visual design.' },
  { name: 'Reflective Practice', desc: 'Cultivating self-awareness, iterative improvement, and the discipline of learning from failure.' },
];

const undergradStats = [
  { value: '350+', label: 'Undergraduates', detail: 'Founding cohort across the global network' },
  { value: '7', label: 'Schools', detail: 'Spanning every major discipline' },
  { value: '20', label: 'Micro-Colleges', detail: 'Intimate scholarly communities worldwide' },
  { value: 'ECTS', label: 'Credits', detail: 'Globally transferable qualifications' },
];

const exploreLinks = [
  { label: 'Programs of Study', page: 'programs', desc: 'Browse available majors, minors, and academic requirements' },
  { label: 'Course Catalog', page: 'undergraduate_curriculum', desc: 'Explore the full curriculum and course offerings' },
  { label: 'Artemis College', page: 'colleges', desc: 'Learn about the undergraduate liberal arts college' },
  { label: 'Undergraduate Research', page: 'research', desc: 'Discover research opportunities for undergraduates' },
  { label: 'Global Education', page: 'collegium-alliance', desc: 'Study abroad and international exchange programs' },
  { label: 'Apply to Artemis', page: 'admissions', desc: 'Start your application to Artemis' },
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
export default function UndergraduateStudy({ goToPage }: UndergraduateStudyProps) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  const approachAnim = useInView();
  const journeyAnim = useInView();
  const competenciesAnim = useInView();
  const statsAnim = useInView();

  const sectionIds = ['approach', 'journey', 'competencies', 'by-the-numbers', 'explore'];
  const activeSection = useActiveSection(sectionIds);

  return (
    <div className="flex flex-col bg-white w-full">

      {/* ═══════════════════════════════════════════
          1. HERO
          ═══════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[45vh] min-h-[360px] overflow-hidden">
            <motion.img
              src="https://images.unsplash.com/photo-1594750852563-5ed8e0421d40?auto=format&fit=crop&q=80&w=2560"
              className="absolute inset-x-0 -top-[20%] w-full h-[140%] object-cover grayscale"
              style={{ y: heroY }}
              alt="Undergraduate Study at Artemis"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-16">
              <div className="mb-6 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                  Homo Eruditus
                </span>
              </div>
              <h1 className="text-[32px] sm:text-[48px] md:text-[64px] font-extrabold leading-[1.05] tracking-tighter text-white mb-5">
                Undergraduate<br />Study
              </h1>
              <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light">
                At Artemis, we view college as a time for students to explore, exercise curiosity,
                and discover new interests and abilities — preparing them not just for a career,
                but for a lifetime of purposeful learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ON THIS PAGE — sticky section navigation
          ═══════════════════════════════════════════ */}
      <OnThisPageNav
        sections={[
          { id: 'approach', label: 'Our Approach' },
          { id: 'journey', label: '4-Year Journey' },
          { id: 'competencies', label: 'Competencies' },
          { id: 'by-the-numbers', label: 'By the Numbers' },
          { id: 'explore', label: 'Explore' },
        ]}
        activeSection={activeSection}
      />

      {/* ═══════════════════════════════════════════
          2. OUR APPROACH — two-column layout
          ═══════════════════════════════════════════ */}
      <section id="approach" className="scroll-mt-[110px] w-full bg-white">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20 py-16 lg:py-24">
          <div
            ref={approachAnim.ref}
            className={`transition-all duration-700 ${approachAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
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
                <h2 className="text-[28px] sm:text-[38px] lg:text-[46px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
                  Learning without<br />boundaries
                </h2>
                <p className="text-[17px] text-gray-600 leading-[1.75] mb-4">
                  Education at Artemis is designed around the concept of &lsquo;Homo Eruditus&rsquo;&mdash;the lifelong
                  learner. We provide students with an immersive, collaborative, and inspiring environment
                  where they can develop a broadly informed, highly disciplined intellect that will help
                  them be successful in whatever work they finally choose.
                </p>
                <p className="text-[17px] text-gray-600 leading-[1.75] mb-8">
                  All undergraduates attend Artemis College, an intimate learning environment offering
                  instruction in the liberal arts and sciences. Our students graduate with the values
                  and knowledge they need to pursue meaningful work, find passion in life-long learning,
                  and lead successful and purposeful lives.
                </p>
                <button
                  onClick={() => goToPage('colleges')}
                  className="flex items-center gap-3 py-3 border-b-2 border-[#141414] text-[#141414] text-[13px] font-bold uppercase tracking-[0.2em] hover:text-[#8A0000] hover:border-[#8A0000] transition-all group"
                >
                  <span>Explore Artemis College</span>
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

              {/* Right — Image + Quote */}
              <div>
                <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden mb-8">
                  <img
                    src="https://images.unsplash.com/photo-1594750852563-5ed8e0421d40?auto=format&fit=crop&q=80&w=800"
                    alt="Students collaborating at Artemis College"
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <div className="border-l-4 border-[#8A0000] pl-6 py-2">
                  <p className="text-[22px] font-bold text-[#141414] leading-tight mb-2">
                    &ldquo;The mind is not a vessel to be filled, but a fire to be kindled.&rdquo;
                  </p>
                  <p className="text-[12px] font-bold uppercase tracking-widest text-[#8A0000]">
                    Artemis Founding Principle
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. THE 4-YEAR JOURNEY — Timeline layout
          ═══════════════════════════════════════════ */}
      <section id="journey" className="scroll-mt-[110px] w-full bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20 py-16 lg:py-24">
          <div
            ref={journeyAnim.ref}
            className={`transition-all duration-700 ${journeyAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="mb-8 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                The Curriculum
              </span>
            </div>

            <h2 className="text-[28px] sm:text-[38px] lg:text-[46px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
              The 4-year journey
            </h2>
            <p className="text-[17px] text-gray-600 leading-[1.75] max-w-2xl mb-16">
              The Artemis undergraduate experience is structured as a four-year progression from
              foundational exploration to capstone contribution. Each year builds on the last,
              deepening expertise while broadening perspective.
            </p>

            {/* Timeline cards */}
            <div className="space-y-0">
              {journeyYears.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-10 border-t border-gray-200 last:border-b"
                >
                  {/* Year indicator */}
                  <div className="lg:col-span-2">
                    <div className="text-[12px] font-bold text-[#8A0000] uppercase tracking-widest mb-1">
                      {item.year}
                    </div>
                    <div className="text-[36px] font-black text-[#141414] leading-none group-hover:text-[#8A0000] transition-colors">
                      {item.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-10">
                    <h3 className="text-[24px] font-bold text-[#141414] mb-3 group-hover:text-[#8A0000] transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[16px] text-gray-600 leading-[1.75] max-w-3xl">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. CORE META-COMPETENCIES — Full-bleed image with overlay
          ═══════════════════════════════════════════ */}
      <section id="competencies" className="scroll-mt-[110px] w-full bg-white">
        <div
          ref={competenciesAnim.ref}
          className={`transition-all duration-700 ${competenciesAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Section divider */}
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20 py-16 lg:py-24">
            <div className="relative flex items-center mb-14">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Meta-Competencies
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="mb-14">
              <h2 className="text-[28px] sm:text-[38px] lg:text-[46px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
                Six pillars of<br />meta-learning
              </h2>
              <p className="text-[17px] text-gray-600 leading-[1.75] max-w-2xl">
                Artemis centers its curriculum on meta-learning: the skill of learning how to learn,
                sense, decide, and act in complex environments. These six competencies are woven
                through every course, every project, and every interaction.
              </p>
            </div>
          </div>

          {/* Full-bleed image with overlay card */}
          <div className="max-w-[1600px] mx-auto">
            <div className="relative w-full min-h-[420px] md:min-h-[500px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1570616969692-54d6ba3d0397?auto=format&fit=crop&q=80&w=2560"
                alt="Meta-competencies at Artemis"
                className="absolute inset-0 w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20 h-full flex items-end min-h-[420px] md:min-h-[500px] pb-10 md:pb-14">
                <div className="bg-white max-w-md p-8 md:p-10 shadow-xl">
                  <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">
                    Core Curriculum
                  </div>
                  <h3 className="text-[26px] font-bold text-[#141414] mb-3 leading-tight">
                    Learning to learn
                  </h3>
                  <p className="text-[15px] text-gray-600 leading-[1.7] mb-6">
                    Every Artemis graduate leaves with mastery of six meta-competencies that transcend
                    any single discipline — the intellectual toolkit for navigating an uncertain world.
                  </p>
                  <button
                    onClick={() => goToPage('undergraduate_curriculum')}
                    className="text-[11px] font-bold uppercase tracking-widest border-b-2 border-[#8A0000] text-[#8A0000] pb-1 hover:text-black hover:border-black transition-colors"
                  >
                    Explore Curriculum &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Competency cards grid */}
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20 py-16 lg:py-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {metaCompetencies.map((comp, idx) => (
                <div
                  key={idx}
                  className="group bg-white border border-gray-200 hover:border-[#8A0000] transition-all cursor-pointer p-6 md:p-8"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#8A0000]/10 flex items-center justify-center text-[#8A0000] font-bold text-sm group-hover:bg-[#8A0000] group-hover:text-white transition-colors">
                      {idx + 1}
                    </div>
                    <h3 className="text-[18px] font-bold text-[#141414] group-hover:text-[#8A0000] transition-colors leading-tight">
                      {comp.name}
                    </h3>
                  </div>
                  <p className="text-[14px] text-gray-600 leading-[1.7]">
                    {comp.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. BY THE NUMBERS — 4 equal columns
          ═══════════════════════════════════════════ */}
      <section id="by-the-numbers" className="scroll-mt-[110px] w-full bg-gray-50">
        <div
          ref={statsAnim.ref}
          className={`max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20 py-16 lg:py-24 transition-all duration-700 ${statsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-12 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              By the Numbers
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            {undergradStats.map((stat, i) => (
              <div key={i} className="relative">
                <div className="text-[44px] lg:text-[56px] font-black text-[#141414] leading-none mb-3 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-2">
                  {stat.label}
                </div>
                <div className="text-[14px] text-gray-500 leading-snug">{stat.detail}</div>
                {i < undergradStats.length - 1 && (
                  <div className="hidden lg:block absolute -right-8 top-0 bottom-0 w-px bg-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. EXPLORE MORE — Link grid (8-4 layout)
          ═══════════════════════════════════════════ */}
      <section id="explore" className="scroll-mt-[110px] w-full bg-white">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left — Main content (8 cols) */}
            <div className="lg:col-span-8">
              <div className="mb-8 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                  Explore
                </span>
              </div>
              <h2 className="text-[28px] sm:text-[38px] lg:text-[46px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
                Discover your<br />path at Artemis
              </h2>
              <p className="text-[17px] text-gray-600 leading-[1.75] mb-8 max-w-2xl">
                Whether you are exploring majors, seeking research opportunities, or planning your
                application, these resources will guide you deeper into the undergraduate experience
                at Artemis.
              </p>

              {/* Link rows */}
              <div className="space-y-0 border-t border-gray-200">
                {exploreLinks.map((link, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(link.page)}
                    className="group flex justify-between items-center py-5 border-b border-gray-200 hover:border-[#8A0000] transition-colors w-full text-left"
                  >
                    <div>
                      <span className="text-[15px] font-semibold text-gray-700 group-hover:text-[#8A0000] transition-colors">
                        {link.label}
                      </span>
                      <p className="text-[13px] text-gray-500 mt-1">{link.desc}</p>
                    </div>
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-[#8A0000] group-hover:translate-x-1 transition-all shrink-0 ml-4"
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

            {/* Right — Sidebar (4 cols) */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-gray-200 p-6 sticky top-[170px]">
                <h3 className="text-[14px] font-bold uppercase tracking-widest text-[#8A0000] mb-4">
                  Related Links
                </h3>
                <nav className="space-y-0">
                  {[
                    { label: 'Graduate Programs', page: 'graduate-coming-soon' },
                    { label: 'Academic Calendar', page: 'application-deadlines' },
                    { label: 'Financial Aid', page: 'tuition-expenses' },
                    { label: 'Campus Life', page: 'campus' },
                    { label: 'Admissions', page: 'admissions' },
                  ].map((link, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(link.page)}
                      className="block w-full text-left py-3 border-b border-gray-100 text-[14px] font-medium text-gray-700 hover:text-[#8A0000] hover:pl-2 transition-all"
                    >
                      {link.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. APPLY CTA — crimson band
          ═══════════════════════════════════════════ */}
      <section className="w-full bg-[#8A0000] py-16 px-5 sm:px-8 lg:px-20">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-[28px] md:text-[36px] font-extrabold text-white leading-tight tracking-tight mb-2">
              Ready to begin your journey?
            </h3>
            <p className="text-[17px] text-white/70 leading-[1.75] max-w-lg">
              Applications for the Class of 2031 are now open. Start your digital portfolio today
              and take the first step toward an education without boundaries.
            </p>
          </div>
          <button
            onClick={() => goToPage('admissions')}
            className="shrink-0 bg-white text-[#8A0000] px-8 py-4 text-[13px] font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors shadow-lg"
          >
            Start Application
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
