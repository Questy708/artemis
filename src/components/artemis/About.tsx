'use client';

import { useState, useEffect, useRef } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';

interface AboutProps {
  goToPage: (page: string) => void;
}

/* ─── Data ─── */
const sectionLinks = [
  { title: 'The University', link: 'the-university' },
  { title: 'How We Are Run', link: 'how-we-are-run' },
  { title: 'Our People', link: 'our-people' },
  { title: 'Access at Artemis', link: 'access-at-artemis' },
  { title: 'Artemis in the World', link: 'artemis-in-the-world' },
  { title: 'Visit Us', link: 'visit-us' },
  { title: 'Careers', link: 'jobs' },
  { title: 'Contact Us', link: 'contact-us' },
];

const teasers = [
  {
    title: 'Our History',
    desc: 'Artemis is a unique and historic institution. As a pioneer in decentralized education, it can lay claim to years of continuous innovation since its founding in 2024.',
    img: 'https://images.unsplash.com/photo-1630480330188-1818487a2426?auto=format&fit=crop&q=80&w=800',
    link: 'history',
  },
  {
    title: 'Institutional Nodes',
    desc: 'List of Artemis Collegium academic hubs and specialized research nodes across the globe.',
    img: 'https://images.unsplash.com/photo-1679653226697-2b0fbf7c17f7?auto=format&fit=crop&q=80&w=800',
    link: 'nodes',
  },
  {
    title: 'Facts and Figures',
    desc: 'There are more than 350 founding scholars at Artemis, building the inaugural cohort of a new kind of university.',
    img: 'https://images.unsplash.com/photo-1594750852563-5ed8e0421d40?auto=format&fit=crop&q=80&w=800',
    link: 'facts',
  },
  {
    title: 'Visiting the Colleges',
    desc: 'Information on opening times and admission protocols for our physical colleges and permanent residency halls.',
    img: 'https://images.unsplash.com/photo-1679653226697-2b0fbf7c17f7?auto=format&fit=crop&q=80&w=800',
    link: 'visiting',
  },
];

const keyStats = [
  { value: '350+', label: 'Scholars', detail: 'Undergraduate and postgraduate students across the global network' },
  { value: '5', label: 'Micro-Colleges', detail: 'Founding micro-colleges across four continents' },
  { value: '2024', label: 'Founding Year', detail: 'A new chapter in decentralized global education' },
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
export default function About({ goToPage }: AboutProps) {
  const storyAnim = useInView();
  const pagesAnim = useInView();
  const cardsAnim = useInView();
  const peopleAnim = useInView();
  const activeSection = useActiveSection(['university', 'people', 'visit', 'contact']);

  return (
    <div className="flex flex-col bg-white">
      {/* ── 1. Hero ── */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[45vh] min-h-[360px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1594750852563-5ed8e0421d40?auto=format&fit=crop&q=80&w=1800"
          className="absolute inset-0 w-full h-full object-cover grayscale"
          alt="About Artemis"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-16">
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">The Institution</span>
          </div>
          <h1 className="text-[32px] sm:text-[44px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6 uppercase">
            About Artemis
          </h1>
          <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light">
            Artemis is a world-leading centre of learning, teaching and research — a pioneer in decentralized global education, connecting scholars and ideas across borders.
          </p>
        </div>
          </div>
        </div>
      </section>

      <OnThisPageNav
        sections={[
          { id: 'university', label: 'The University' },
          { id: 'people', label: 'People' },
          { id: 'visit', label: 'Visit' },
          { id: 'contact', label: 'Contact' },
        ]}
        activeSection={activeSection}
      />

      {/* ── 2. Our Story ── */}
      <section className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 py-16 lg:py-24">
        <div
          ref={storyAnim.ref}
          className={`transition-all duration-700 ${storyAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Section divider */}
          <div className="mb-6 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                Our Story
              </span>
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left — Rich text */}
            <div>
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                A pioneer in decentralized global education
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Since its founding, Artemis has reimagined what a university can be. Rather than concentrating knowledge in a single campus, we have built a network of Micro-Colleges — each a node of academic excellence — linked by a shared commitment to interdisciplinary inquiry and radical access.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Our scholars do not just study the world; they reshape it. From synthetic intelligence to bio-regenerative arts, from cosmological humanities to neo-economics, Artemis brings together fields that were never meant to be separate and builds the teams that make breakthroughs possible.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                We believe that the most urgent challenges of our time — climate adaptation, equitable governance, cognitive enhancement — demand more than any single discipline can offer. At Artemis, borders between fields are porous, and collaboration is not optional but structural.
              </p>
              <button
                onClick={() => goToPage('the-university')}
                className="flex items-center space-x-4 py-3 border-b-2 border-[#8A0000] text-[#8A0000] text-[13px] font-bold uppercase tracking-[0.2em] hover:text-[#141414] hover:border-[#141414] transition-all group"
              >
                <span>The University</span>
                <svg className="group-hover:translate-x-2 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>

            {/* Right — Key stats with left-border style */}
            <div>
              <div className="mb-8 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">By the Numbers</span>
              </div>
              <div className="space-y-8">
                {keyStats.map((stat, i) => (
                  <div key={i} className="relative pl-6 border-l-2 border-[#8A0000]">
                    <div className="text-[36px] font-black text-[#141414] leading-none mb-2 tabular-nums">{stat.value}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-1">{stat.label}</div>
                    <div className="text-[13px] text-gray-500 leading-snug">{stat.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Pages in This Section ── */}
      <section id="university" className="scroll-mt-[110px] bg-gray-50 py-16 lg:py-24">
        <div
          ref={pagesAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${pagesAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20 items-start">
            <div>
              <div className="mb-6 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Explore</span>
              </div>
              <h2 className="text-[28px] sm:text-[32px] font-extrabold leading-[1.05] tracking-tighter text-[#141414]">
                Pages in this section
              </h2>
            </div>
            <div className="flex flex-col">
              {sectionLinks.map((item, i) => (
                <button
                  key={item.title}
                  onClick={() => goToPage(item.link)}
                  className="group flex items-center justify-between py-5 border-b border-gray-200 hover:border-[#8A0000] transition-colors w-full text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000]">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[16px] font-bold text-[#141414] group-hover:text-[#8A0000] transition-colors">{item.title}</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-[#8A0000] group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Teaser Cards ── */}
      <section className="py-16 lg:py-24">
        <div
          ref={cardsAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${cardsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">Discover</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 lg:gap-16">
            {teasers.map((teaser, i) => (
              <div key={teaser.title} className="group cursor-pointer">
                <div className="aspect-[3/2] bg-gray-100 overflow-hidden mb-6">
                  <img
                    src={teaser.img}
                    alt={teaser.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">0{i + 1} — {teaser.title.toUpperCase()}</div>
                <h3 className="text-[20px] font-bold text-[#141414] mb-3 group-hover:text-[#8A0000] transition-colors leading-tight">
                  {teaser.title}
                </h3>
                <p className="text-[14px] text-gray-600 leading-relaxed mb-4">{teaser.desc}</p>
                <div
                  onClick={() => goToPage(teaser.link)}
                  className="text-[11px] font-bold uppercase tracking-widest text-[#8A0000] border-b-2 border-[#8A0000] w-fit pb-0.5 cursor-pointer hover:text-[#141414] hover:border-[#141414] transition-colors"
                >
                  Learn more
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Our People — Card-and-Image Parallax ── */}
      <section id="people" className="scroll-mt-[110px] py-16 lg:py-24 bg-gray-50">
        <div
          ref={peopleAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${peopleAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full min-h-[380px] md:min-h-[460px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1624555130296-e551faf8969b?auto=format&fit=crop&q=80&w=1400"
              alt="Our People at Artemis"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="relative z-10 flex items-end h-full min-h-[380px] md:min-h-[460px] p-5 sm:p-8 md:p-14">
              <div className="bg-white max-w-sm p-5 sm:p-8 shadow-xl">
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">Our People</div>
                <h3 className="text-[24px] font-bold text-[#141414] mb-3 leading-tight">
                  The minds that make Artemis
                </h3>
                <p className="text-[14px] text-gray-600 leading-relaxed mb-5">
                  From world-renowned faculty to dedicated support staff, the people of Artemis are the foundation of everything we do. Our community of scholars, researchers, and professionals drives the innovation and discovery that define our institution.
                </p>
                <button
                  onClick={() => goToPage('our-people')}
                  className="flex items-center space-x-3 text-[11px] font-bold uppercase tracking-widest border-b-2 border-[#8A0000] text-[#8A0000] pb-1 hover:text-black hover:border-black transition-colors group"
                >
                  <span>Meet Our People</span>
                  <svg className="group-hover:translate-x-2 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
          </div>
      </section>

      {/* ── 7. Crimson CTA Bar ── */}
      <section id="visit" className="scroll-mt-[110px] py-16">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <div className="bg-[#8A0000] px-8 py-16 md:px-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-[24px] sm:text-[32px] md:text-[40px] font-extrabold leading-tight tracking-tighter text-white mb-2">
              Discover more about Artemis
            </h2>
            <p className="text-[16px] text-white/70 leading-relaxed max-w-lg">
              Whether you are a prospective student, a visiting scholar, or simply curious — there is a place for you here.
            </p>
          </div>
          <button
            onClick={() => goToPage('the-university')}
            className="flex items-center space-x-3 bg-white text-[#8A0000] px-8 py-4 text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors shrink-0 group"
          >
            <span>Explore</span>
            <svg className="group-hover:translate-x-2 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
          </div>
        </div>
      </section>

      {/* ── 8. Contact Anchor ── */}
      <section id="contact" className="scroll-mt-[110px] py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">Get in Touch</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
                Contact us
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                Have questions about Artemis? Want to learn more about our programs, plan a visit, or connect with a specific department? We are here to help.
              </p>
              <button
                onClick={() => goToPage('contact-us')}
                className="flex items-center space-x-4 py-3 border-b-2 border-[#8A0000] text-[#8A0000] text-[13px] font-bold uppercase tracking-[0.2em] hover:text-[#141414] hover:border-[#141414] transition-all group"
              >
                <span>Contact Us</span>
                <svg className="group-hover:translate-x-2 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
            <div className="space-y-6">
              <div className="border-l-2 border-[#8A0000] pl-6">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-1">General Enquiries</div>
                <p className="text-[14px] text-gray-600 leading-relaxed">info@artemisui.org</p>
              </div>
              <div className="border-l-2 border-[#8A0000] pl-6">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-1">Admissions</div>
                <p className="text-[14px] text-gray-600 leading-relaxed">admissions@artemisui.org</p>
              </div>
              <div className="border-l-2 border-[#8A0000] pl-6">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-1">Visit</div>
                <p className="text-[14px] text-gray-600 leading-relaxed">123 Innovative Way, Knowledge City, Global Hub</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
