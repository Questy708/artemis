'use client';

import { useState, useEffect, useRef } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';

interface AdmissionsProps {
  goToPage: (page: string) => void;
}

/* ─── Data ─── */
const pathCards = [
  {
    title: 'Undergraduate',
    desc: 'For high school students and transfers seeking their first degree in a paradigm-shifting environment — where every discipline is a gateway, not a boundary.',
    image: 'https://images.unsplash.com/photo-1594750852563-5ed8e0421d40?auto=format&fit=crop&q=80&w=800',
    tag: '01 — UNDERGRADUATE',
    cta: 'Learn More',
    page: 'undergraduate',
  },
  {
    title: 'Graduate',
    desc: 'Advanced research and professional programmes are under development. Graduate study at Artemis will push past the edge of known knowledge — stay tuned.',
    image: 'https://images.unsplash.com/photo-1579165466949-3180a3d056d5?auto=format&fit=crop&q=80&w=800',
    tag: '02 — GRADUATE',
    cta: 'Coming Soon',
    page: 'graduate-coming-soon',
    comingSoon: true,
  },
  {
    title: 'Financial Aid',
    desc: 'Artemis is committed to meeting 100% of demonstrated need for all admitted students — because talent is universal, but opportunity should be too.',
    image: 'https://images.unsplash.com/photo-1613592237001-84fb727ce569?auto=format&fit=crop&q=80&w=800',
    tag: '03 — FINANCIAL AID',
    cta: 'Calculate Aid',
    page: 'tuition-expenses',
  },
];

const admissionsStats = [
  { value: '6%', label: 'Acceptance rate', detail: 'One of the most selective universities in the world' },
  { value: '100%', label: 'Need met', detail: 'Demonstrated financial need fully covered' },
  { value: '28+', label: 'Countries represented', detail: 'A truly global student body' },
  { value: '20', label: 'Micro-College options', detail: 'Interdisciplinary academic communities' },
];

/* ─── Application Cycles (Minerva-inspired) ─── */
const applicationCycles = [
  {
    name: 'Early Action',
    deadline: '1 November 2026',
    aidDeadline: '8 November 2026',
    decisionBy: '19 December 2026',
    description: 'Apply early to maximise your financial aid prospects and receive your decision before the end of the calendar year. Early Action is non-binding — you are free to consider other offers.',
    highlight: true,
    tag: 'RECOMMENDED',
  },
  {
    name: 'Regular Decision I',
    deadline: '13 January 2027',
    aidDeadline: '20 January 2027',
    decisionBy: '5 March 2027',
    description: 'The first regular cycle offers a balanced timeline for applicants who need additional time to prepare their portfolio while still receiving a decision well in advance of enrolment deadlines.',
    highlight: false,
    tag: null,
  },
  {
    name: 'Regular Decision II',
    deadline: '24 February 2027',
    aidDeadline: '3 March 2027',
    decisionBy: '10 April 2027',
    description: 'A second regular cycle for those who need more time to finalise their application materials. Financial aid is still available, though funds are more limited at this stage.',
    highlight: false,
    tag: null,
  },
  {
    name: 'Extended Decision',
    deadline: '7 April 2027',
    aidDeadline: 'Not available',
    decisionBy: 'Rolling',
    description: 'The final cycle for late applicants. Please note that financial aid is not available in the Extended Decision cycle. Applicants who require aid should apply in an earlier cycle.',
    highlight: false,
    tag: 'NO AID',
  },
];

const infoLinks = [
  { label: 'Tuition and Expenses', page: 'tuition-expenses' },
  { label: 'International Students', page: 'international-students' },
  { label: 'Transfer Students', page: 'transfer-students' },
  { label: 'Application Deadlines', page: 'application-deadlines' },
  { label: 'Visit Campus', page: 'visit-campus', comingSoon: true },
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
export default function Admissions({ goToPage }: AdmissionsProps) {
  const pathsAnim = useInView();
  const statsAnim = useInView();
  const cyclesAnim = useInView();
  const aidAnim = useInView();
  const infoAnim = useInView();
  const activeSection = useActiveSection(['paths', 'cycles', 'aid', 'info']);

  return (
    <div className="flex flex-col bg-white">
      {/* ── 1. HERO ── */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[45vh] min-h-[360px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1594750852563-5ed8e0421d40?auto=format&fit=crop&q=80&w=1800"
          className="absolute inset-0 w-full h-full object-cover grayscale"
          alt="Applying to Artemis"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-16">
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Begin Here</span>
          </div>
          <h1 className="text-[32px] sm:text-[44px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6 uppercase">
            Applying to<br />Artemis
          </h1>
          <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light">
            We seek the boldest minds — those who look at the horizon and see not a limit, but a challenge they are ready to meet. Your journey starts with a single step.
          </p>
        </div>
          </div>
        </div>
      </section>

      <OnThisPageNav
        sections={[
          { id: 'paths', label: 'Paths' },
          { id: 'cycles', label: 'Cycles' },
          { id: 'aid', label: 'Aid' },
          { id: 'info', label: 'Info' },
        ]}
        activeSection={activeSection}
      />

      {/* ── 2. YOUR PATH — 3-card grid ── */}
      <section id="paths" className="scroll-mt-[110px] py-16 lg:py-24">
        <div
          ref={pathsAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${pathsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Section divider */}
          <div className="mb-6 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                Your Path
              </span>
            </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pathCards.map((card, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[3/2] bg-gray-100 overflow-hidden mb-6 relative">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  {card.comingSoon && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white text-[14px] font-bold uppercase tracking-[0.3em] border-2 border-white px-6 py-2">Coming Soon</span>
                    </div>
                  )}
                </div>
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">{card.tag}</div>
                <h3 className="text-[20px] font-bold text-[#141414] mb-3 group-hover:text-[#8A0000] transition-colors leading-tight">{card.title}</h3>
                <p className="text-[14px] text-gray-600 leading-relaxed mb-4">{card.desc}</p>
                <button
                  onClick={() => goToPage(card.page)}
                  className={`flex items-center space-x-3 text-[11px] font-bold uppercase tracking-widest border-b-2 pb-1 transition-colors group/btn ${
                    card.comingSoon 
                      ? 'border-gray-400 text-gray-400 cursor-default' 
                      : 'border-[#8A0000] text-[#8A0000] hover:text-black hover:border-black'
                  }`}
                >
                  <span>{card.cta}</span>
                  {!card.comingSoon && (
                    <svg className="group-hover/btn:translate-x-2 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. ADMISSIONS BY THE NUMBERS ── */}
      <section className="py-16 lg:py-24">
        <div
          ref={statsAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${statsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">By the Numbers</span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-16">
            Admissions by<br />the numbers
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            {admissionsStats.map((stat, i) => (
              <div key={i} className="relative pl-6 border-l-2 border-[#8A0000]">
                <div className="text-[36px] font-black text-[#141414] leading-none mb-2 tabular-nums">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-1">{stat.label}</div>
                <div className="text-[12px] text-gray-500 leading-snug">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. APPLICATION CYCLES (Minerva-style) ── */}
      <section id="cycles" className="scroll-mt-[110px] py-16 lg:py-24 bg-gray-50">
        <div
          ref={cyclesAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${cyclesAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Application Cycles</span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
            Choose your cycle
          </h2>
          <p className="text-[16px] text-gray-600 max-w-2xl leading-relaxed mb-12">
            Artemis offers four admissions cycles per academic year. You may apply in only one cycle per year. We strongly recommend applying in Early Action to maximise your financial aid prospects, as funds become more limited in later cycles. There is no application fee for any cycle.
          </p>

          {/* Cycle cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-12">
            {applicationCycles.map((cycle, i) => (
              <div 
                key={i} 
                className={`bg-white p-8 border ${cycle.highlight ? 'border-[#8A0000]' : 'border-gray-100'} relative`}
              >
                {cycle.tag && (
                  <div className={`absolute top-0 right-0 px-3 py-1 text-[9px] font-bold uppercase tracking-widest ${
                    cycle.tag === 'RECOMMENDED' ? 'bg-[#8A0000] text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {cycle.tag}
                  </div>
                )}
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-2 uppercase">
                  {String(i + 1).padStart(2, '0')} — {cycle.name.toUpperCase()}
                </div>
                <h3 className="text-[20px] font-bold text-[#141414] mb-4 leading-tight">{cycle.name}</h3>
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-[12px] font-bold uppercase tracking-widest text-gray-500">Application Deadline</span>
                    <span className="text-[14px] font-bold text-[#141414]">{cycle.deadline}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-[12px] font-bold uppercase tracking-widest text-gray-500">Aid Deadline</span>
                    <span className={`text-[14px] font-bold ${cycle.aidDeadline === 'Not available' ? 'text-gray-400' : 'text-[#141414]'}`}>{cycle.aidDeadline}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-[12px] font-bold uppercase tracking-widest text-gray-500">Decision By</span>
                    <span className="text-[14px] font-bold text-[#141414]">{cycle.decisionBy}</span>
                  </div>
                </div>
                <p className="text-[14px] text-gray-600 leading-relaxed">{cycle.description}</p>
              </div>
            ))}
          </div>

          {/* Key notes */}
          <div className="bg-white border border-gray-100 p-8">
            <h4 className="text-[14px] font-bold text-[#141414] mb-4 uppercase tracking-wide">Important notes</h4>
            <ul className="space-y-3 text-[14px] text-gray-600 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#8A0000] rounded-full mt-2 shrink-0"></span>
                <span>Financial aid applications are due one week after the admissions cycle deadline — no exceptions or extensions are granted.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#8A0000] rounded-full mt-2 shrink-0"></span>
                <span>Applicants denied in one cycle may not reapply in a subsequent cycle within the same academic year.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#8A0000] rounded-full mt-2 shrink-0"></span>
                <span>There is no application fee for any admissions cycle at Artemis.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#8A0000] rounded-full mt-2 shrink-0"></span>
                <span>Artemis is need-aware: financial need is considered when making final admissions recommendations. Applying early maximises your aid prospects.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 5. FINANCIAL AID ── */}
      <section id="aid" className="scroll-mt-[110px] py-16 lg:py-24">
        <div
          ref={aidAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${aidAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full min-h-[380px] md:min-h-[460px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1613592237001-84fb727ce569?auto=format&fit=crop&q=80&w=1400"
              alt="Financial Aid at Artemis"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="relative z-10 flex items-end h-full min-h-[380px] md:min-h-[460px] p-5 sm:p-8 md:p-14">
              <div className="bg-white max-w-sm p-5 sm:p-8 shadow-xl">
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">Our Commitment</div>
                <h3 className="text-[24px] font-bold text-[#141414] mb-3 leading-tight">Need-aware admissions</h3>
                <p className="text-[14px] text-gray-600 leading-relaxed mb-5">
                  Artemis meets 100% of demonstrated financial need for every admitted student through a combination of need-based scholarships, work-study, and low-interest loans. Aid is funded entirely through private philanthropy — not government programmes — ensuring equitable access regardless of nationality.
                </p>
                <button
                  onClick={() => goToPage('tuition-expenses')}
                  className="flex items-center space-x-3 text-[11px] font-bold uppercase tracking-widest border-b-2 border-[#8A0000] text-[#8A0000] pb-1 hover:text-black hover:border-black transition-colors group"
                >
                  <span>Tuition & Expenses</span>
                  <svg className="group-hover:translate-x-2 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
          </div>
      </section>

      {/* ── 6. MORE INFORMATION — link grid ── */}
      <section id="info" className="scroll-mt-[110px] bg-gray-50 py-16 lg:py-24">
        <div
          ref={infoAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${infoAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Resources</span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-12">
            More information
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {infoLinks.map((link, i) => (
              <button
                key={i}
                onClick={() => goToPage(link.page)}
                className="group flex justify-between items-center py-4 border-b border-gray-200 hover:border-[#8A0000] transition-colors w-full text-left"
              >
                <span className="flex items-center gap-3">
                  <span className="text-[14px] font-bold text-gray-700 group-hover:text-[#8A0000] transition-colors">
                    {link.label}
                  </span>
                  {link.comingSoon && (
                    <span className="text-[9px] font-bold uppercase tracking-widest bg-gray-200 text-gray-500 px-2 py-0.5">Coming Soon</span>
                  )}
                </span>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-[#8A0000] group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
