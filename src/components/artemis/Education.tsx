'use client';

import { useState, useRef, useEffect } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';

interface EducationProps {
  goToPage: (page: string) => void;
}

/* ─── Data ─── */
const academicPrograms = [
  {
    title: 'Undergraduate Study',
    description: 'Artemis provides a liberal arts education that fosters intellectual curiosity, independent thinking, and leadership skills — grounded in the Homo Eruditus philosophy of lifelong learning.',
    image: 'https://images.unsplash.com/photo-1594750852563-5ed8e0421d40?auto=format&fit=crop&q=80&w=600',
    linkText: 'Explore Undergraduate Programs',
    linkTarget: 'undergraduate',
  },
  {
    title: 'Graduate & Professional Study',
    description: 'Our advanced degree programs are close-knit communities with access to vast resources, designed for those who seek to push the boundaries of their discipline.',
    image: 'https://images.unsplash.com/photo-1675179190669-ef6bc809d8d7?auto=format&fit=crop&q=80&w=600',
    linkText: 'Explore Graduate Programs',
    linkTarget: 'graduate-coming-soon',
  },
  {
    title: 'Departments & Programs',
    description: 'Artemis has well over 100 departments and programs spanning the humanities, sciences, social sciences, and emerging interdisciplinary fields.',
    image: 'https://images.unsplash.com/photo-1570616969692-54d6ba3d0397?auto=format&fit=crop&q=80&w=600',
    linkText: 'Browse Departments',
    linkTarget: 'programs',
  },
  {
    title: 'Global Education',
    description: 'People come from afar to study here, and our students learn and grow through international travel, study abroad, and cross-cultural research partnerships.',
    image: 'https://images.unsplash.com/photo-1687172140737-22c4c3371f3e?auto=format&fit=crop&q=80&w=600',
    linkText: 'Explore Global Programs',
    linkTarget: 'collegium-alliance',
  },
  {
    title: 'Summer Session',
    description: 'Artemis provides educational opportunities year-round. Our summer offerings allow students to accelerate their studies or explore entirely new fields.',
    image: 'https://images.unsplash.com/photo-1611697047951-c7f9824a5636?auto=format&fit=crop&q=80&w=600',
    linkText: 'View Summer Offerings',
    linkTarget: 'undergraduate',
  },
  {
    title: 'Non-Degree Offerings',
    description: 'Explore the diverse programs available for non-matriculating students — from professional certificates to community learning initiatives.',
    image: 'https://images.unsplash.com/photo-1655720357872-ce227e4164ba?auto=format&fit=crop&q=80&w=600',
    linkText: 'Discover Non-Degree Options',
    linkTarget: 'admissions',
  },
  {
    title: 'Online Learning',
    description: 'Step inside a virtual Artemis classroom and learn from some of our most renowned faculty members — accessible from anywhere in the world.',
    image: 'https://images.unsplash.com/photo-1634947101456-d40e5122b048?auto=format&fit=crop&q=80&w=600',
    linkText: 'Start Learning Online',
    linkTarget: 'programs',
  },
  {
    title: 'K-12 Education',
    description: 'Artemis extends its educational philosophy to younger students through innovative K-12 programs that foster early intellectual development, cultivating curiosity and critical thinking from the earliest years of formal education.',
    image: 'https://images.unsplash.com/photo-1570616969692-54d6ba3d0397?auto=format&fit=crop&q=80&w=600',
    linkText: 'Explore K-12 Programs',
    linkTarget: 'admissions',
  },
  {
    title: 'Dual-Degree Pathway (P-TECH)',
    description: "Earn a university degree while still in high school. Modeled after the P-TECH initiative and inspired by Avenues: The World School, this pathway combines secondary and tertiary education into a seamless six-year program that awards both a high school diploma and an associate or bachelor's degree.",
    image: 'https://images.unsplash.com/photo-1624555130296-e551faf8969b?auto=format&fit=crop&q=80&w=600',
    linkText: 'Explore Dual-Degree',
    linkTarget: 'admissions',
  },
];

const educationStats = [
  { value: '100+', label: 'Departments', detail: 'Spanning every major discipline' },
  { value: '20', label: 'Micro-Colleges', detail: 'Dynamic skill-based learning nodes' },
  { value: 'ECTS', label: 'Credits', detail: 'Globally transferable qualifications' },
  { value: '100%', label: 'Need Met', detail: 'Financial aid for admitted students' },
];

const curriculumLinks = [
  { label: 'Course catalog & registration', page: 'programs' },
  { label: 'Interdisciplinary degree programs', page: 'colleges' },
  { label: 'Skill-based certifications', page: 'undergraduate_curriculum' },
  { label: 'Academic advising & support', page: 'undergraduate' },
  { label: 'Honors & distinction pathways', page: 'undergraduate' },
  { label: 'Study abroad opportunities', page: 'collegium-alliance' },
];

const gridLinks = [
  { label: 'Browse course catalog', page: 'programs' },
  { label: 'Explore interdisciplinary degrees', page: 'colleges' },
  { label: 'Skill-based certifications', page: 'undergraduate_curriculum' },
  { label: 'Academic advising & support', page: 'undergraduate' },
  { label: 'Honors & distinction pathways', page: 'undergraduate' },
  { label: 'Study abroad opportunities', page: 'collegium-alliance' },
];

const sidebarLinks = [
  { label: 'Undergraduate programs', page: 'undergraduate' },
  { label: 'Graduate programs', page: 'graduate-coming-soon' },
  { label: 'Departments & programs', page: 'programs' },
  { label: 'Global education', page: 'collegium-alliance' },
  { label: 'Academic calendar', page: 'application-deadlines' },
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

/*
 * LAYOUT SYSTEM — matching ASU blueprint
 *
 * ASU uses a layered approach:
 *   1. Full-viewport-width backgrounds (bg-white, bg-gray-50, bg-[#8A0000])
 *   2. Centered content container inside each section (max-w-[1400px])
 *   3. The hero image is FULL-BLEED — no max-width at all
 *   4. Global learning image is also FULL-BLEED
 *   5. Two-column grids fill the full container width
 *
 * Key: Section backgrounds go edge-to-edge.
 *      Only TEXT content is constrained and centered.
 */

/* ─── Component ─── */
export default function Education({ goToPage }: EducationProps) {
  const approachAnim = useInView();
  const programsAnim = useInView();
  const globalAnim = useInView();
  const statsAnim = useInView();

  const carouselRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let animId: number;
    let lastTime = 0;
    const pixelsPerSecond = 50;

    const animate = (time: number) => {
      if (lastTime) {
        const delta = time - lastTime;
        if (!isPausedRef.current) {
          el.scrollLeft += (pixelsPerSecond * delta) / 1000;
          const halfWidth = el.scrollWidth / 2;
          if (el.scrollLeft >= halfWidth) {
            el.scrollLeft -= halfWidth;
          }
        }
      }
      lastTime = time;
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const sectionIds = ['approach', 'programs', 'curriculum', 'global', 'by-the-numbers'];
  const activeSection = useActiveSection(sectionIds);

  return (
    <div className="flex flex-col bg-white w-full">

      {/* ═══════════════════════════════════════════
          1. HERO — Wider image container — max-w-[1600px], 200px wider than content
          The image spans a wider container than the content below.
          Only the text overlay is positioned inside a centered container.
          ═══════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[45vh] min-h-[360px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1686213011642-b25f94b95b96?auto=format&fit=crop&q=80&w=2560"
          className="absolute inset-0 w-full h-full object-cover grayscale"
          alt="Education at Artemis"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        {/* Text overlay — centered container, but image is full-bleed */}
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-16">
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Homo Eruditus
            </span>
          </div>
          <h1 className="text-[32px] sm:text-[48px] md:text-[64px] font-extrabold leading-[1.05] tracking-tighter text-white mb-5">
            Education at<br />Artemis
          </h1>
          <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light">
            Transforming human potential through learning for life. We move beyond static degrees
            to dynamic, skill-based certifications and interdisciplinary exploration.
          </p>
        </div>
          </div>
        </div>
      </section>

      <OnThisPageNav
        sections={[
          { id: 'approach', label: 'Our Approach' },
          { id: 'programs', label: 'Programs' },
          { id: 'curriculum', label: 'Curriculum' },
          { id: 'global', label: 'Global Learning' },
          { id: 'by-the-numbers', label: 'By the Numbers' },
        ]}
        activeSection={activeSection}
      />

      {/* ═══════════════════════════════════════════
          2. OUR APPROACH — 6-6 two-column (ASU pattern)
          Background: full-width white
          Content: centered in max-w-[1400px]
          Grid: 2 equal columns filling the full container width
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
                  learner. We encourage our students to explore the academic landscape, venturing into
                  unfamiliar fields of knowledge and, perhaps, discovering new passions that will take
                  them in a different direction altogether.
                </p>
                <p className="text-[17px] text-gray-600 leading-[1.75] mb-8">
                  Along the way, faculty members help guide them, and fellow students offer diverse
                  perspectives that can shed new light on the path. We also encourage our students to
                  travel literally, by going abroad for study, research, or work. By nurturing this
                  spirit of inquiry, Artemis aims to prepare global citizens who are instilled with a
                  lifelong love of learning.
                </p>
                <button
                  onClick={() => goToPage('undergraduate')}
                  className="flex items-center gap-3 py-3 border-b-2 border-[#141414] text-[#141414] text-[13px] font-bold uppercase tracking-[0.2em] hover:text-[#8A0000] hover:border-[#8A0000] transition-all group"
                >
                  <span>Explore Our Model</span>
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
                    alt="Students collaborating"
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
          3. JOIN US — 6-6 grid links (ASU pattern)
          Background: full-width gray-50
          Content: centered in max-w-[1400px]
          ═══════════════════════════════════════════ */}
      <section className="w-full bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left — Text */}
            <div>
              <h2 className="text-[28px] sm:text-[38px] lg:text-[46px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
                Be a part of<br />Artemis education
              </h2>
              <p className="text-[17px] text-gray-600 leading-[1.75]">
                We invite students, faculty, staff, alumni, businesses and community members to
                join us in advancing discovery and learning. Whether you are beginning your academic
                journey, seeking to deepen your expertise, or looking to contribute to a global
                community of scholars, Artemis has a path for you.
              </p>
            </div>

            {/* Right — 2-column grid links */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {gridLinks.map((link, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(link.page)}
                  className="flex items-start gap-3 text-left group"
                >
                  <span className="mt-1 w-6 h-6 rounded-full bg-[#8A0000]/10 flex items-center justify-center shrink-0 group-hover:bg-[#8A0000]/20 transition-colors">
                    <svg className="w-3 h-3 text-[#8A0000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </span>
                  <span className="text-[15px] font-semibold text-gray-700 group-hover:text-[#8A0000] transition-colors leading-snug">
                    {link.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. PROGRAMS OF STUDY
          Background: full-width white
          Content: centered in max-w-[1400px]
          Cards: 3-column grid filling the full container width
          ═══════════════════════════════════════════ */}
      <section id="programs" className="scroll-mt-[110px] w-full bg-white">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-20 pt-16 lg:pt-24">
          <div
            ref={programsAnim.ref}
            className={`transition-all duration-700 ${programsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Section divider */}
            <div className="relative flex items-center mb-14">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Programs of Study
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="mb-14">
              <h2 className="text-[28px] sm:text-[38px] lg:text-[46px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
                Nine paths to<br />mastery
              </h2>
              <p className="text-[17px] text-gray-600 leading-[1.75] max-w-2xl">
                Whether you are beginning your academic journey or seeking to deepen your expertise,
                Artemis offers a program tailored to your ambitions. Each path is designed to be
                interdisciplinary, flexible, and globally relevant.
              </p>
            </div>
          </div>
        </div>

        {/* Auto-scrolling horizontal carousel — duplicated items for seamless loop */}
        <div className="max-w-[1600px] mx-auto pb-16 lg:pb-24">
          <style>{`.programs-carousel::-webkit-scrollbar { display: none; }`}</style>
          <div
            ref={carouselRef}
            className="programs-carousel overflow-x-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseEnter={() => { isPausedRef.current = true; }}
            onMouseLeave={() => { isPausedRef.current = false; }}
            onTouchStart={() => { isPausedRef.current = true; }}
            onTouchEnd={() => { setTimeout(() => { isPausedRef.current = false; }, 6000); }}
          >
            <div className="flex gap-6 px-5 sm:px-8 lg:px-20" style={{ width: 'fit-content' }}>
              {[...academicPrograms, ...academicPrograms].map((program, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[280px] sm:w-[380px] lg:w-[500px] group bg-white border border-gray-200 hover:border-[#8A0000] transition-all cursor-pointer shadow-sm hover:shadow-lg overflow-hidden"
                  onClick={() => goToPage(program.linkTarget)}
                >
                  <div className="aspect-[3/2] bg-gray-100 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">
                      {String((i % academicPrograms.length) + 1).padStart(2, '0')} &mdash; {program.title.toUpperCase().replace('&', '&')}
                    </div>
                    <h3 className="text-[18px] font-bold text-[#141414] mb-2 group-hover:text-[#8A0000] transition-colors leading-tight">
                      {program.title}
                    </h3>
                    <p className="text-[14px] text-gray-600 leading-[1.6] mb-4">
                      {program.description}
                    </p>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#8A0000] border-b-2 border-[#8A0000] pb-0.5 group-hover:text-black group-hover:border-black transition-all inline-flex items-center gap-2">
                      <span>{program.linkText}</span>
                      <span>&rarr;</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. CURRICULUM — 8-4 layout (ASU pattern)
          Background: full-width gray-50
          Content: centered in max-w-[1400px]
          Grid: 8-col main + 4-col sidebar
          ═══════════════════════════════════════════ */}
      <section id="curriculum" className="scroll-mt-[110px] w-full bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left — Main content (8 cols) */}
            <div className="lg:col-span-8">
              <div className="mb-8 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                  Curriculum
                </span>
              </div>
              <h2 className="text-[28px] sm:text-[38px] lg:text-[46px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
                Dynamic skill-based<br />certifications
              </h2>
              <p className="text-[17px] text-gray-600 leading-[1.75] mb-4">
                Artemis has reimagined the traditional curriculum. Rather than fixed degree tracks
                alone, we offer dynamic, skill-based certifications that adapt to the evolving needs
                of the world — and of each student.
              </p>
              <p className="text-[17px] text-gray-600 leading-[1.75] mb-4">
                Our interdisciplinary degrees cross traditional boundaries, allowing students to
                combine fields in ways that reflect the complexity of real-world challenges. Every
                program integrates theory with practice, ensuring that graduates are not just
                knowledgeable, but capable.
              </p>
              <p className="text-[17px] text-gray-600 leading-[1.75] mb-8">
                From the first year, students engage with capstone projects embedded in our Centers
                of Inquiry, and every program culminates in a portfolio-based assessment that
                demonstrates real competency — not just seat time.
              </p>

              {/* Link rows */}
              <div className="space-y-0 border-t border-gray-200">
                {curriculumLinks.map((link, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(link.page)}
                    className="group flex justify-between items-center py-4 border-b border-gray-200 hover:border-[#8A0000] transition-colors w-full text-left"
                  >
                    <span className="text-[15px] font-semibold text-gray-700 group-hover:text-[#8A0000] transition-colors">
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

            {/* Right — Sidebar navigation (4 cols) */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-gray-200 p-6 lg:sticky lg:top-[170px]">
                <h3 className="text-[14px] font-bold uppercase tracking-widest text-[#8A0000] mb-4">
                  Related Links
                </h3>
                <nav className="space-y-0">
                  {sidebarLinks.map((link, i) => (
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
          6. GLOBAL LEARNING — FULL-BLEED image with overlay card
          The image spans the wider container (like the hero).
          Only the overlay card and section divider are inside the container.
          ═══════════════════════════════════════════ */}
      <section id="global" className="scroll-mt-[110px] w-full bg-white">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20 py-16 lg:py-24">
          <div
            ref={globalAnim.ref}
            className={`transition-all duration-700 ${globalAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Section divider */}
            <div className="relative flex items-center mb-14">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Global Learning
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
          </div>
        </div>

        {/* Full-bleed image — breaks OUT of the content container */}
        <div className="max-w-[1600px] mx-auto">
        <div className="relative w-full min-h-[420px] md:min-h-[500px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1687172140737-22c4c3371f3e?auto=format&fit=crop&q=80&w=2560"
            alt="Global Learning at Artemis"
            className="absolute inset-0 w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20 h-full flex items-end min-h-[340px] sm:min-h-[420px] md:min-h-[500px] pb-10 md:pb-14">
            <div className="bg-white max-w-md p-5 sm:p-8 md:p-10 shadow-xl">
              <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">
                Global Initiative
              </div>
              <h3 className="text-[26px] font-bold text-[#141414] mb-3 leading-tight">
                The world is your campus
              </h3>
              <p className="text-[15px] text-gray-600 leading-[1.7] mb-6">
                People come from afar to study at Artemis, and our students learn and grow through
                international travel, research partnerships, and cross-cultural exchange programs
                spanning six continents.
              </p>
              <button
                onClick={() => goToPage('collegium-alliance')}
                className="text-[11px] font-bold uppercase tracking-widest border-b-2 border-[#8A0000] text-[#8A0000] pb-1 hover:text-black hover:border-black transition-colors"
              >
                Explore Global Programs &rarr;
              </button>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. STATS — 4 equal columns on gray
          Background: full-width gray-50
          Content: centered in max-w-[1400px]
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
            {educationStats.map((stat, i) => (
              <div key={i} className="relative">
                <div className="text-[44px] lg:text-[56px] font-black text-[#141414] leading-none mb-3 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-2">
                  {stat.label}
                </div>
                <div className="text-[14px] text-gray-500 leading-snug">{stat.detail}</div>
                {i < educationStats.length - 1 && (
                  <div className="hidden lg:block absolute -right-8 top-0 bottom-0 w-px bg-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
