'use client';

import React, { useState, useEffect, useRef } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';
import { ChevronRight } from 'lucide-react';

interface Props {
  goToPage: (page: string) => void;
}

/* ─── Data ─── */
const sectionLinks = [
  { title: "Governance & finance", link: "governance-finance" },
  { title: "Policies and statements", link: "policies" },
  { title: "Fundraising", link: "fundraising" },
  { title: "Strategic plan", link: "strategic-plan" },
  { title: "Change and continuous improvement", link: "improvement" },
  { title: "Equality and diversity", link: "equality" },
  { title: "Sustainability", link: "sustainability" },
  { title: "The Gazette", link: "gazette" },
];

const governanceRoles = [
  {
    title: "Chancellor / President",
    desc: "The strategic head of the university, leading planetary partnerships and global funding alliances. Appointed by a combined vote of Deans, Guild Chairs, and the Civic Assembly, the Chancellor embodies the outward-facing ambition of Artemis while safeguarding its internal autonomy.",
  },
  {
    title: "Provost",
    desc: "Oversees academic integrity and curricular coherence across the guild network. The Provost chairs the Capstone & Curriculum Council and ensures that the seven schools remain aligned with Artemis's founding charter and evolving research mission.",
  },
  {
    title: "Deans of Schools",
    desc: "Seven Deans lead each academic school, managing faculty appointments, school-level governance forums, and cross-school research initiatives. Deans sit on the Academic Senate and report jointly to the Provost and their school's Faculty Council.",
  },
  {
    title: "Guild Chairs",
    desc: "Elected by interdisciplinary committees within each Guild to coordinate seasonal research challenges, field partnerships, and the allocation of venture seed funding. Guild Chairs represent the scholar-practitioner voice in all major governance decisions.",
  },
  {
    title: "Civic Assembly",
    desc: "A representative body drawn from students, staff, alumni, and community partners. The Civic Assembly holds deliberative power on matters of equity, sustainability, and public engagement — ensuring that Artemis remains accountable to the communities it serves.",
  },
];

const sevenSchools = [
  {
    name: "School of Natural Sciences",
    desc: "From quantum mechanics to biodiversity, advancing fundamental understanding of the physical and living world.",
  },
  {
    name: "School of Engineering & Technology",
    desc: "Designing systems, materials, and infrastructures that reshape the boundaries of what is buildable.",
  },
  {
    name: "School of Arts & Humanities",
    desc: "Preserving and reinventing the cultural, philosophical, and literary traditions that give meaning to progress.",
  },
  {
    name: "School of Social Sciences",
    desc: "Analyzing the structures of human society — governance, economics, justice — to inform better collective decisions.",
  },
  {
    name: "School of Health & Medicine",
    desc: "Translating biomedical discovery into clinical practice and public health outcomes across populations.",
  },
  {
    name: "School of Education & Human Development",
    desc: "Studying how people learn, grow, and adapt — and training the next generation of educators and mentors.",
  },
  {
    name: "School of Business",
    desc: "Equipping leaders with the strategic, ethical, and analytical frameworks to navigate complex global markets.",
  },
];

const governanceStats = [
  { value: "7", label: "Academic Schools", detail: "Each with independent governance" },
  { value: "12", label: "Guilds", detail: "Interdisciplinary research collectives" },
  { value: "1", label: "Civic Assembly", detail: "Community voice in governance" },
  { value: "50+", label: "Nations Represented", detail: "Across faculty, staff, and students" },
];

const teaserCards = [
  {
    title: "Governance and finance",
    img: "https://images.unsplash.com/photo-1613592237001-84fb727ce569?auto=format&fit=crop&q=80&w=600",
    desc: "How the internal systems of the university maintain operational excellence and financial transparency.",
    link: "governance-finance",
  },
  {
    title: "University Officers",
    img: "https://images.unsplash.com/photo-1655720357872-ce227e4164ba?auto=format&fit=crop&q=80&w=600",
    desc: "The roles and responsibilities of senior Artemis personnel who steward the institution's mission.",
    link: "our-people",
  },
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
export default function HowWeAreRun({ goToPage }: Props) {
  const heroAnim = useInView();
  const linksAnim = useInView();
  const governanceAnim = useInView();
  const schoolsAnim = useInView();
  const pressAnim = useInView();
  const lifelongAnim = useInView();
  const teaserAnim = useInView();
  const activeSection = useActiveSection(['governance', 'finance', 'policies']);

  return (
    <div className="flex flex-col bg-white">


      {/* ── Hero Section ── */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[45vh] min-h-[360px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1613592237001-84fb727ce569?auto=format&fit=crop&q=80&w=1800"
          className="absolute inset-0 w-full h-full object-cover grayscale"
          alt="How Artemis is run"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-16">
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Governance</span>
          </div>
          <h1 className="text-[32px] sm:text-[44px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6 uppercase">
            How we<br />are run
          </h1>
          <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light">
            Artemis is governed as a dynamic commons — a federation of schools, guilds, and civic bodies where power is distributed, not concentrated. Our structure is designed for agility, transparency, and epistemic accountability.
          </p>
        </div>
          </div>
        </div>
      </section>

      <OnThisPageNav
        sections={[
          { id: 'governance', label: 'Governance' },
          { id: 'finance', label: 'Finance' },
          { id: 'policies', label: 'Policies' },
        ]}
        activeSection={activeSection}
      />

      {/* ── Pages in This Section ── */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div
          ref={linksAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${linksAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20 items-start">
            <div>
              <div className="mb-6 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                  Explore
                </span>
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

      {/* ── The Governance Model ── */}
      <section id="governance" className="py-16 lg:py-24 bg-gray-50 scroll-mt-[110px]">
        <div
          ref={governanceAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${governanceAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Structure</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-5">
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
                The Governance<br />Model
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed">
                Unlike traditional universities that centralize authority in a single governing council, Artemis distributes decision-making across five interlocking bodies — each with distinct powers and mutual accountability. This structure ensures that no single faction can dominate, and that the university remains responsive to both scholarly imperatives and societal obligations.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-8">
                {governanceRoles.map((role, i) => (
                  <div key={i} className="flex items-start">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-[#8A0000]/10 flex items-center justify-center mr-5 mt-0.5">
                      <span className="text-[13px] font-black text-[#8A0000]">0{i + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-[17px] font-bold text-[#141414] mb-2">{role.title}</h4>
                      <p className="text-[15px] text-gray-600 leading-relaxed">{role.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 pt-12 border-t border-gray-200">
            {governanceStats.map((stat, i) => (
              <div key={i} className="relative pl-5 border-l-2 border-[#8A0000]">
                <div className="text-[36px] font-black text-[#141414] leading-none mb-2 tabular-nums">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-1">{stat.label}</div>
                <div className="text-[12px] text-gray-500 leading-snug">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Seven Schools ── */}
      <section className="py-16 lg:py-24">
        <div
          ref={schoolsAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${schoolsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">Academic Structure</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="mb-12">
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
              The Seven Schools
            </h2>
            <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl">
              Artemis is organized into seven academic schools, each a semi-autonomous unit with its own Dean, Faculty Council, and research agenda. Together they span the full breadth of human inquiry — from the subatomic to the societal.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {sevenSchools.map((school, i) => (
              <div
                key={school.name}
                className="group p-8 bg-white border border-gray-200 hover:border-[#8A0000] transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                <div className="flex items-center mb-4">
                  <span className="text-[10px] font-bold text-[#8A0000] mr-4 tracking-widest">0{i + 1}</span>
                  <h4 className="text-[17px] font-bold text-[#141414] group-hover:text-[#8A0000] transition-colors leading-tight">
                    {school.name}
                  </h4>
                </div>
                <p className="text-[14px] text-gray-500 leading-relaxed mb-5">{school.desc}</p>
                <div className="flex items-center">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#141414] border-b border-black group-hover:text-[#8A0000] group-hover:border-[#8A0000] transition-all">
                    Explore School
                  </span>
                  <svg
                    className="w-3.5 h-3.5 ml-2 text-[#141414] group-hover:text-[#8A0000] group-hover:translate-x-1 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Artemis University Press ── */}
      <section id="finance" className="py-16 lg:py-24 bg-gray-50 scroll-mt-[110px]">
        <div
          ref={pressAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${pressAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="mb-8 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Publishing</span>
              </div>
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
                Artemis University Press
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Artemis University Press is a global leader in publishing, serving the university&apos;s mission to further excellence in research, scholarship, and education by publishing worldwide in both digital and physical formats.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-8">
                With a catalogue spanning every academic discipline, the Press ensures that groundbreaking work produced within the Artemis network reaches scholars, policymakers, and curious minds across every continent.
              </p>
              <button
                onClick={() => goToPage('about')}
                className="text-[11px] font-bold uppercase tracking-widest border-b-2 border-[#8A0000] text-[#8A0000] pb-1 hover:text-black hover:border-black transition-colors"
              >
                Visit Artemis University Press →
              </button>
            </div>
            <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1578402027070-0f5ebd84ec9b?auto=format&fit=crop&q=80&w=800"
                alt="Artemis University Press"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Lifelong Learning ── */}
      <section id="policies" className="py-16 lg:py-24 scroll-mt-[110px]">
        <div
          ref={lifelongAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${lifelongAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 md:order-1 aspect-[4/3] bg-gray-200 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1570616969692-54d6ba3d0397?auto=format&fit=crop&q=80&w=800"
                alt="Artemis Lifelong Learning"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="mb-8 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Continuing Education</span>
              </div>
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
                Lifelong Learning
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Artemis Lifelong Learning is one of the most dynamic providers of continuing adult education in the world, enrolling thousands of students from across the globe on hundreds of part-time programmes each year.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-8">
                From undergraduate certificates to doctoral degrees, online courses to intensive summer programmes, Lifelong Learning extends the Artemis experience beyond the traditional student body — because the pursuit of knowledge has no expiry date.
              </p>
              <button
                onClick={() => goToPage('education')}
                className="text-[11px] font-bold uppercase tracking-widest border-b-2 border-[#8A0000] text-[#8A0000] pb-1 hover:text-black hover:border-black transition-colors"
              >
                Explore Lifelong Learning →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Teaser Cards ── */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div
          ref={teaserAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${teaserAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">Explore Further</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {teaserCards.map((card, i) => (
              <div key={i} className="group cursor-pointer" onClick={() => goToPage(card.link)}>
                <div className="aspect-[3/2] bg-gray-200 overflow-hidden mb-6">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <h4 className="text-[20px] font-bold text-[#141414] mb-3 group-hover:text-[#8A0000] transition-colors">
                  {card.title}
                </h4>
                <p className="text-[14px] text-gray-600 leading-relaxed mb-5">{card.desc}</p>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#141414] border-b border-black w-fit group-hover:text-[#8A0000] group-hover:border-[#8A0000] transition-all">
                  Learn more
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
