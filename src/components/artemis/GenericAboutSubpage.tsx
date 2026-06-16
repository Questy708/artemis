'use client';

import React, { useState, useEffect, useRef } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import { ChevronRight, Mail, MapPin, Phone, Globe, Users, GraduationCap, Accessibility, Briefcase } from 'lucide-react';

interface Props {
  goToPage: (page: string) => void;
  title: string;
  id: string;
  description: string;
}

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

/* ─── Page Data ─── */
const pageData: Record<string, {
  heroImage: string;
  heroLabel: string;
  stats: { value: string; label: string; detail: string }[];
  links: { title: string; page: string }[];
}> = {
  access: {
    heroImage: 'https://images.unsplash.com/photo-1687172140737-22c4c3371f3e?auto=format&fit=crop&q=80&w=1800',
    heroLabel: 'Equity & Inclusion',
    stats: [
      { value: '100%', label: 'Need Met', detail: 'Full financial need met for every admitted student across the Artemis network' },
      { value: '28+', label: 'Countries', detail: 'Scholars represented from over 28 nations, creating a truly global community' },
      { value: '45+', label: 'Languages Supported', detail: 'Multilingual support services and adaptive learning resources' },
      { value: '24/7', label: 'Accessibility Support', detail: 'Round-the-clock assistive technology and accommodation services' },
    ],
    links: [
      { title: 'Admissions process', page: 'admissions' },
      { title: 'Financial aid', page: 'tuition-expenses' },
      { title: 'Disability services', page: 'campus' },
      { title: 'Digital accessibility', page: 'campus' },
      { title: 'Student support', page: 'undergraduate' },
    ],
  },
  world: {
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1800',
    heroLabel: 'Global Network',
    stats: [
      { value: '6', label: 'Continents', detail: 'Active academic presence spanning six continents' },
      { value: '20', label: 'Nodes', detail: 'Micro-Colleges and specialized research hubs worldwide' },
      { value: '80+', label: 'Partner Institutions', detail: 'Collaborative agreements with leading universities and research centers' },
      { value: '28+', label: 'Countries Represented', detail: 'Scholars from every inhabited continent and cultural tradition' },
    ],
    links: [
      { title: 'International partnerships', page: 'research' },
      { title: 'Study abroad programmes', page: 'education' },
      { title: 'Research collaborations', page: 'research' },
      { title: 'Global impact report', page: 'about' },
    ],
  },
  visit: {
    heroImage: 'https://images.unsplash.com/photo-1675179190669-ef6bc809d8d7?auto=format&fit=crop&q=80&w=1800',
    heroLabel: 'Come See Us',
    stats: [
      { value: '3', label: 'Public Hubs', detail: 'Central nodes open for guided tours and public engagement' },
      { value: '12', label: 'Open Days / Year', detail: 'Scheduled open days across our global residency hubs' },
      { value: '10,000+', label: 'Annual Visitors', detail: 'Scholars, families, and curious minds welcomed each year' },
    ],
    links: [
      { title: 'Book a tour', page: 'campus' },
      { title: 'Open day schedule', page: 'admissions' },
      { title: 'Travel & accommodation', page: 'estate' },
      { title: 'Virtual tour', page: 'campus' },
      { title: 'Group visits', page: 'contact-us' },
    ],
  },
  jobs: {
    heroImage: 'https://images.unsplash.com/photo-1655720357872-ce227e4164ba?auto=format&fit=crop&q=80&w=1800',
    heroLabel: 'Build the Future',
    stats: [
      { value: '120+', label: 'Staff', detail: 'Faculty, researchers, and professional staff across all nodes' },
      { value: '20', label: 'Global Locations', detail: 'Career opportunities spanning our worldwide network' },
      { value: '85%', label: 'Staff Satisfaction', detail: 'Consistently high marks in our annual workplace survey' },
      { value: 'Competitive', label: 'Benefits', detail: 'Comprehensive packages including relocation and research support' },
    ],
    links: [
      { title: 'Current openings', page: 'our-people' },
      { title: 'Faculty careers', page: 'research' },
      { title: 'Research positions', page: 'research' },
      { title: 'Benefits & perks', page: 'about' },
    ],
  },
  contact: {
    heroImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1800',
    heroLabel: 'Get in Touch',
    stats: [
      { value: '24hr', label: 'Response Time', detail: 'Average response time for general enquiries' },
      { value: '4', label: 'Departments', detail: 'Dedicated contact points for all major enquiries' },
      { value: 'Global', label: 'Reach', detail: 'Connect with any node across the Artemis network' },
    ],
    links: [
      { title: 'Request information', page: 'admissions' },
      { title: 'Report an issue', page: 'about' },
      { title: 'Feedback form', page: 'about' },
      { title: 'Directory', page: 'our-people' },
    ],
  },
  governance: {
    heroImage: 'https://images.unsplash.com/photo-1613592237001-84fb727ce569?auto=format&fit=crop&q=80&w=1800',
    heroLabel: 'Governance & Finance',
    stats: [
      { value: '£18M', label: 'Annual Revenue', detail: 'From tuition, research grants, endowment returns, and partnerships' },
      { value: '60%', label: 'Lower Overhead', detail: 'Decentralized model reduces operational drag by nearly 60%' },
      { value: '90%', label: 'Capital to Academics', detail: 'Of capital directed to academic and research programmes' },
    ],
    links: [
      { title: 'Annual financial report', page: 'how-we-are-run' },
      { title: 'Endowment performance', page: 'fundraising' },
      { title: 'Governance structure', page: 'how-we-are-run' },
      { title: 'Audit & compliance', page: 'how-we-are-run' },
    ],
  },
  policies: {
    heroImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1800',
    heroLabel: 'Policies',
    stats: [
      { value: '50+', label: 'Active Policies', detail: 'Covering academic integrity, data governance, and community standards' },
      { value: 'Annual', label: 'Review Cycle', detail: 'Every policy reviewed and updated on an annual basis' },
      { value: 'Open', label: 'Consultation', detail: 'All policies developed through open community consultation' },
    ],
    links: [
      { title: 'Academic integrity policy', page: 'about' },
      { title: 'Data governance framework', page: 'about' },
      { title: 'Community standards', page: 'campus' },
      { title: 'Research ethics', page: 'research' },
    ],
  },
  strategic: {
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1800',
    heroLabel: 'Strategy 2025-2030',
    stats: [
      { value: '5', label: 'Strategic Pillars', detail: 'Access, Excellence, Impact, Resilience, Innovation' },
      { value: '40', label: 'Target Nodes', detail: 'Expanding from 20 to 40 micro-colleges by 2030' },
      { value: '£80M', label: 'Revenue Target', detail: 'Projected annual revenue by end of strategic period' },
    ],
    links: [
      { title: 'Download strategic plan', page: 'about' },
      { title: 'Progress dashboard', page: 'facts' },
      { title: 'Vice-Chancellor foreword', page: 'about' },
      { title: 'Annual review', page: 'about' },
    ],
  },
  improvement: {
    heroImage: 'https://images.unsplash.com/photo-1634947101456-d40e5122b048?auto=format&fit=crop&q=80&w=1800',
    heroLabel: 'Continuous Improvement',
    stats: [
      { value: '85%', label: 'Actioned Feedback', detail: 'Of scholar feedback results in concrete improvements' },
      { value: 'Quarterly', label: 'Review Cycles', detail: 'Systematic review of all operational processes' },
      { value: '12', label: 'Guild Audits/Year', detail: 'Cross-guild quality assurance audits conducted annually' },
    ],
    links: [
      { title: 'Submit feedback', page: 'contact-us' },
      { title: 'Quality assurance', page: 'about' },
      { title: 'Change proposals', page: 'about' },
    ],
  },
  equality: {
    heroImage: 'https://images.unsplash.com/photo-1687172140737-22c4c3371f3e?auto=format&fit=crop&q=80&w=1800',
    heroLabel: 'Equality & Diversity',
    stats: [
      { value: '28+', label: 'Countries', detail: 'Scholars from every inhabited continent and cultural tradition' },
      { value: '50/50', label: 'Gender Balance', detail: 'Committed to gender parity in faculty and leadership' },
      { value: '100%', label: 'Inclusive Access', detail: 'Need-blind admissions with full financial need met' },
    ],
    links: [
      { title: 'Diversity report', page: 'access-at-artemis' },
      { title: 'Inclusion programmes', page: 'campus' },
      { title: 'Equity initiatives', page: 'access-at-artemis' },
    ],
  },
  sustainability: {
    heroImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1800',
    heroLabel: 'Sustainability',
    stats: [
      { value: 'Carbon', label: 'Negative', detail: 'All Artemis nodes operate carbon-negative since 2025' },
      { value: '100%', label: 'Renewable Energy', detail: 'Every physical hub powered by certified renewable sources' },
      { value: 'Zero', label: 'Waste Target', detail: 'On track for zero operational waste by 2028' },
    ],
    links: [
      { title: 'Sustainability report', page: 'about' },
      { title: 'Green infrastructure', page: 'estate' },
      { title: 'Climate research', page: 'research' },
    ],
  },
  gazette: {
    heroImage: 'https://images.unsplash.com/photo-1578402027070-0f5ebd84ec9b?auto=format&fit=crop&q=80&w=1800',
    heroLabel: 'The Gazette',
    stats: [
      { value: 'Weekly', label: 'Publication', detail: 'Published every Monday during term time' },
      { value: '5,000+', label: 'Readers', detail: 'Scholars, staff, and alumni across the network' },
      { value: 'Open', label: 'Submissions', detail: 'Community members may submit notices and articles' },
    ],
    links: [
      { title: 'Latest edition', page: 'about' },
      { title: 'Archive', page: 'about' },
      { title: 'Submit a notice', page: 'contact-us' },
    ],
  },
  catalog: {
    heroImage: 'https://images.unsplash.com/photo-1594750852563-5ed8e0421d40?auto=format&fit=crop&q=80&w=1800',
    heroLabel: 'Academic Catalog',
    stats: [
      { value: '61', label: 'Programs', detail: 'Spanning the liberal arts, sciences, and engineering' },
      { value: '7', label: 'Schools', detail: 'Each with distinct expertise and identity' },
      { value: 'ECTS', label: 'Credits', detail: 'Globally transferable qualifications' },
    ],
    links: [
      { title: 'Browse programs', page: 'programs' },
      { title: 'Undergraduate curriculum', page: 'undergraduate_curriculum' },
      { title: 'Academic regulations', page: 'education' },
    ],
  },
};

/* ─── World Hubs Data ─── */
const worldHubs = [
  { city: 'Valletta', region: 'Malta', focus: 'Central Governance', desc: 'The administrative heart of the Artemis Collegium, housing the Senate Chamber and the Office of the Provost-General.', image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=600' },
  { city: 'Kigali', region: 'Rwanda', focus: 'Sustainable Tech', desc: 'Pioneering adaptive infrastructure and climate-resilient technology research in partnership with East African institutions.', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600' },
  { city: 'Vancouver', region: 'Canada', focus: 'Network Theory', desc: 'Advancing the mathematical and computational foundations of decentralized systems and network science.', image: 'https://images.unsplash.com/photo-1496247749665-49cf5bf875d4?auto=format&fit=crop&q=80&w=600' },
  { city: 'Cyberjaya', region: 'Malaysia', focus: 'Digital Governance', desc: 'Exploring the intersection of policy, law, and technology to shape the governance frameworks of tomorrow.', image: 'https://images.unsplash.com/photo-1613592237001-84fb727ce569?auto=format&fit=crop&q=80&w=600' },
  { city: 'Reykjavik', region: 'Iceland', focus: 'Arctic Research', desc: 'Monitoring geophysical systems and conducting research on sustainable energy and polar ecosystem resilience.', image: 'https://images.unsplash.com/photo-1570616969692-54d6ba3d0397?auto=format&fit=crop&q=80&w=600' },
  { city: 'Tokyo', region: 'Japan', focus: 'Pacific Robotics', desc: 'Integrating synthetic intelligence with advanced robotics, human-machine interfaces, and next-generation manufacturing.', image: 'https://images.unsplash.com/photo-1579165466949-3180a3d056d5?auto=format&fit=crop&q=80&w=600' },
];

/* ─── Jobs Listings Data ─── */
const jobListings = [
  { title: 'Faculty Position — Synthetic Intelligence', location: 'Valletta / Remote', type: 'Full-time, Permanent', desc: 'Lead undergraduate and postgraduate teaching in synthetic intelligence, with a research focus on emergent cognition and ethical AI architectures.' },
  { title: 'Research Fellow — Bio-Regenerative Arts', location: 'Kigali Node', type: 'Fixed-term, 3 years', desc: 'Conduct interdisciplinary research bridging biotechnology and artistic practice, with emphasis on living materials and ecological design.' },
  { title: 'Director of Digital Infrastructure', location: 'Cyberjaya Node', type: 'Full-time, Permanent', desc: 'Oversee the federated digital estate of the Artemis network, ensuring resilient, secure, and accessible infrastructure for all nodes.' },
  { title: 'Student Experience Coordinator', location: 'Vancouver Node', type: 'Full-time, Permanent', desc: 'Design and deliver programming that supports scholar wellbeing, community building, and cross-node collaboration.' },
];

/* ─── Contact Blocks ─── */
const contactBlocks = [
  { label: 'General Enquiries', email: 'info@artemisui.org', desc: 'For broad questions about Artemis, our programmes, or the network.' },
  { label: 'Admissions', email: 'admissions@artemisui.org', desc: 'Application queries, entry requirements, and offer-holder support.' },
  { label: 'Media & Press', email: 'press@artemisui.org', desc: 'Journalist enquiries, press kits, interview requests, and media partnerships.' },
  { label: 'Research Partnerships', email: 'research@artemisui.org', desc: 'Collaborative proposals, joint ventures, and institutional partnerships.' },
];

/* ─── Reusable Sub-components ─── */

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="relative flex items-center mb-16">
      <div className="flex-grow border-t border-gray-200"></div>
      <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">{label}</span>
      <div className="flex-grow border-t border-gray-200"></div>
    </div>
  );
}

function RedLabel({ text }: { text: string }) {
  return (
    <div className="mb-8 flex items-center space-x-3">
      <span className="w-8 h-[1px] bg-[#8A0000]"></span>
      <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">{text}</span>
    </div>
  );
}

function StatsGrid({ stats }: { stats: { value: string; label: string; detail: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {stats.map((stat, i) => (
        <div key={i} className="relative pl-6 border-l-2 border-[#8A0000]">
          <div className="text-[36px] font-black text-[#141414] leading-none mb-2 tabular-nums">{stat.value}</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-1">{stat.label}</div>
          <div className="text-[13px] text-gray-500 leading-snug">{stat.detail}</div>
        </div>
      ))}
    </div>
  );
}

function LinkRows({ links, goToPage }: { links: { title: string; page: string }[]; goToPage: (page: string) => void }) {
  return (
    <div className="flex flex-col">
      {links.map((link, i) => (
        <button
          key={i}
          onClick={() => goToPage(link.page)}
          className="group flex justify-between items-center py-4 border-b border-gray-200 hover:border-[#8A0000] transition-colors w-full text-left"
        >
          <span className="text-[14px] font-bold text-gray-700 group-hover:text-[#8A0000] transition-colors">
            {link.title}
          </span>
          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#8A0000] group-hover:translate-x-1 transition-all" />
        </button>
      ))}
    </div>
  );
}

function UnderlineCTA({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-3 py-3 border-b-2 border-[#8A0000] text-[#8A0000] text-[13px] font-bold uppercase tracking-[0.2em] hover:text-[#141414] hover:border-[#141414] transition-all group"
    >
      <span>{text}</span>
      <svg className="group-hover:translate-x-2 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
    </button>
  );
}

/* ─── Access Content ─── */
function AccessContent({ goToPage }: { goToPage: (page: string) => void }) {
  const anim1 = useInView();
  const anim2 = useInView();
  const anim3 = useInView();
  const anim4 = useInView();

  return (
    <>
      {/* Need-Blind Admissions */}
      <section className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24">
        <div ref={anim1.ref} className={`transition-all duration-700 ${anim1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionDivider label="Our Commitment" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                Need-blind admissions
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Artemis is committed to ensuring that no qualified scholar is denied admission due to financial circumstances. Our need-blind admissions policy means that your ability to pay is never a factor in the decision to offer you a place.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Once admitted, we meet 100% of demonstrated financial need through a combination of grants, work-study opportunities, and node-specific bursaries. This commitment extends across every college and programme in the Artemis network, from Valletta to Kigali, from Vancouver to Tokyo.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                We believe that talent is distributed equally across the world, but opportunity is not. Our mission is to correct that imbalance — one scholar at a time.
              </p>
              <UnderlineCTA text="Admissions process" onClick={() => goToPage('admissions')} />
            </div>
            <div>
              <StatsGrid stats={pageData.access.stats} />
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility Services */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div ref={anim2.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${anim2.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <RedLabel text="Accessibility" />
          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
            Removing barriers to learning
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Artemis provides comprehensive accessibility services across all nodes. Every Micro-College is equipped with adaptive technology suites, and our digital platforms are designed to WCAG 2.1 AA standards — with a roadmap toward full AAA compliance.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Our Disability Resources team works with each scholar to develop a personalized accommodation plan, covering everything from assistive technology and exam adjustments to physical access modifications and note-taking support.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                We recognize that accessibility is not a static checklist but an ongoing commitment. Our Accessibility Advisory Council — composed of scholars with lived experience — reviews and refines our practices every term.
              </p>
              <UnderlineCTA text="Disability services" onClick={() => goToPage('access-at-artemis')} />
            </div>
            <div className="space-y-8">
              <div className="bg-white p-6 border border-gray-100">
                <div className="flex items-start gap-4">
                  <Accessibility className="w-5 h-5 text-[#8A0000] shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[14px] font-bold text-[#141414] mb-2">Physical Accessibility</h4>
                    <p className="text-[14px] text-gray-500 leading-relaxed">All Artemis nodes are designed or retrofitted for full wheelchair access, with hearing loops, braille signage, and sensory rooms available at every location.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 border border-gray-100">
                <div className="flex items-start gap-4">
                  <Globe className="w-5 h-5 text-[#8A0000] shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[14px] font-bold text-[#141414] mb-2">Digital Accessibility</h4>
                    <p className="text-[14px] text-gray-500 leading-relaxed">Our learning platform, research repositories, and administrative systems are all built with accessibility-first design principles, supporting screen readers, keyboard navigation, and custom display settings.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 border border-gray-100">
                <div className="flex items-start gap-4">
                  <Users className="w-5 h-5 text-[#8A0000] shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[14px] font-bold text-[#141414] mb-2">Accommodations</h4>
                    <p className="text-[14px] text-gray-500 leading-relaxed">Personalized accommodation plans, assistive technology provisioning, exam adjustments, and dedicated support coordinators for every registered scholar.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Access */}
      <section className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24">
        <div ref={anim3.ref} className={`transition-all duration-700 ${anim3.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionDivider label="Financial Access" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                Financial access for all
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Beyond need-blind admissions, Artemis operates a suite of financial access programmes designed to eliminate economic barriers at every stage of the scholar journey — from application to graduation and beyond.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                The Artemis Opportunity Fund provides application fee waivers, travel grants for campus visits, and emergency financial assistance. Our Node Bursary Programme ensures that scholars at every location have access to locally relevant financial support, calibrated to regional cost of living.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                We also partner with external organizations to offer sponsored fellowships, paid research internships, and post-graduation transition grants — because access does not end at admission.
              </p>
              <UnderlineCTA text="Financial aid" onClick={() => goToPage('admissions')} />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1594750852563-5ed8e0421d40?auto=format&fit=crop&q=80&w=800"
                alt="Scholars collaborating at Artemis"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div ref={anim4.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${anim4.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <RedLabel text="Explore" />
          <h2 className="text-[28px] font-extrabold tracking-tighter text-[#141414] mb-8">Related resources</h2>
          <LinkRows links={pageData.access.links} goToPage={goToPage} />
        </div>
      </section>
    </>
  );
}

/* ─── World Content ─── */
function WorldContent({ goToPage }: { goToPage: (page: string) => void }) {
  const anim1 = useInView();
  const anim2 = useInView();
  const anim3 = useInView();
  const anim4 = useInView();

  return (
    <>
      {/* Global Network Intro */}
      <section className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24">
        <div ref={anim1.ref} className={`transition-all duration-700 ${anim1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionDivider label="Global Presence" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                A university without borders
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Artemis was founded on the principle that knowledge should not be confined to a single geography. Our network of Micro-Colleges and research nodes spans six continents, each one a semi-autonomous hub of academic excellence connected by shared governance and a unified curriculum.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Scholars at any Artemis node can study abroad at another, participate in cross-node research consortia, and access the full digital resources of the network. Our federated model means that every location retains its unique character while contributing to the collective strength of the whole.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                From the Mediterranean governance chambers of Valletta to the cutting-edge robotics labs of Tokyo, Artemis is where the world comes to think forward.
              </p>
              <UnderlineCTA text="International partnerships" onClick={() => goToPage('research')} />
            </div>
            <div>
              <StatsGrid stats={pageData.world.stats} />
            </div>
          </div>
        </div>
      </section>

      {/* Hub Grid */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div ref={anim2.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${anim2.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <RedLabel text="Our Nodes" />
          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-12">
            Global hubs of inquiry
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {worldHubs.map((hub, i) => (
              <div key={hub.city} className="group cursor-pointer bg-white border border-gray-100 overflow-hidden">
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={hub.image}
                    alt={`${hub.city} — ${hub.focus}`}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-2 uppercase">
                    {hub.region} — {hub.focus}
                  </div>
                  <h3 className="text-[20px] font-bold text-[#141414] mb-3 group-hover:text-[#8A0000] transition-colors leading-tight">
                    {hub.city}
                  </h3>
                  <p className="text-[14px] text-gray-600 leading-relaxed">{hub.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* International Partnerships */}
      <section className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24">
        <div ref={anim3.ref} className={`transition-all duration-700 ${anim3.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionDivider label="Partnerships" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                Collaboration by design
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Artemis maintains active partnerships with over 80 institutions worldwide, spanning research universities, national laboratories, cultural organizations, and policy institutes. These partnerships are not ceremonial — they are structural, embedding collaborative pathways directly into our curriculum and research programmes.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Our Study Abroad Programme allows scholars to spend a term or a full year at a partner institution, earning credits that count seamlessly toward their Artemis degree. Meanwhile, our Joint Research Ventures pair Artemis faculty with international collaborators on multi-year, cross-disciplinary projects.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                The Artemis Global Impact Report, published biennially, documents the measurable outcomes of our international engagement — from jointly authored publications to spin-out ventures and policy recommendations adopted by governments worldwide.
              </p>
              <UnderlineCTA text="Research collaborations" onClick={() => goToPage('research')} />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
                alt="International collaboration at Artemis"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div ref={anim4.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${anim4.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <RedLabel text="Explore" />
          <h2 className="text-[28px] font-extrabold tracking-tighter text-[#141414] mb-8">Related resources</h2>
          <LinkRows links={pageData.world.links} goToPage={goToPage} />
        </div>
      </section>
    </>
  );
}

/* ─── Visit Content ─── */
function VisitContent({ goToPage }: { goToPage: (page: string) => void }) {
  const anim1 = useInView();
  const anim2 = useInView();
  const anim3 = useInView();
  const anim4 = useInView();

  return (
    <>
      {/* Visiting Artemis Intro */}
      <section className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24">
        <div ref={anim1.ref} className={`transition-all duration-700 ${anim1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionDivider label="Plan Your Visit" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                Welcome to the network
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Whether you are a prospective scholar, a visiting academic, or simply curious about the Artemis network, we encourage you to visit our hubs in person. Three of our nodes are open to the public for guided tours, and our annual Open Day programme provides a deeper look at life and work within the Collegium.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                The Malta Central Governance Node in Valletta is our primary visitor destination, offering tours of the Senate Chamber, the Digital Estate Control Room, and the Mediterranean Research Terrace. Our Vancouver and Kigali nodes also welcome visitors by appointment.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                For those unable to travel, our Virtual Tour experience provides an immersive, high-fidelity walkthrough of every public space across the network — accessible from any device, anywhere in the world.
              </p>
              <UnderlineCTA text="Book a tour" onClick={() => goToPage('visit-us')} />
            </div>
            <div>
              <StatsGrid stats={pageData.visit.stats} />
            </div>
          </div>
        </div>
      </section>

      {/* Open Days & Tours */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div ref={anim2.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${anim2.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <RedLabel text="Experiences" />
          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-12">
            Open days & tours
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 border border-gray-100">
              <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">Guided Tours</div>
              <h4 className="text-[18px] font-bold text-[#141414] mb-3">Walk the network</h4>
              <p className="text-[14px] text-gray-600 leading-relaxed mb-4">
                Expert-led tours of our public hubs, covering architecture, research facilities, and the daily life of an Artemis Micro-College. Tours last approximately 90 minutes and are available year-round.
              </p>
              <div className="text-[12px] font-bold text-[#8A0000] uppercase tracking-widest">Available daily</div>
            </div>
            <div className="bg-white p-6 border border-gray-100">
              <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">Open Days</div>
              <h4 className="text-[18px] font-bold text-[#141414] mb-3">Experience Artemis</h4>
              <p className="text-[14px] text-gray-600 leading-relaxed mb-4">
                Full-day events featuring sample lectures, faculty panels, student Q&A sessions, and hands-on workshops. Open Days are held 12 times per year across different nodes.
              </p>
              <div className="text-[12px] font-bold text-[#8A0000] uppercase tracking-widest">12 per year</div>
            </div>
            <div className="bg-white p-6 border border-gray-100">
              <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">Virtual Tour</div>
              <h4 className="text-[18px] font-bold text-[#141414] mb-3">Visit from anywhere</h4>
              <p className="text-[14px] text-gray-600 leading-relaxed mb-4">
                A high-fidelity immersive walkthrough of every public space in the Artemis network. Navigate freely, explore research labs, lecture halls, and common spaces in 360-degree detail.
              </p>
              <div className="text-[12px] font-bold text-[#8A0000] uppercase tracking-widest">Always open</div>
            </div>
          </div>
        </div>
      </section>

      {/* Travel & Accommodation */}
      <section className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24">
        <div ref={anim3.ref} className={`transition-all duration-700 ${anim3.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionDivider label="Travel" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                Getting here & staying over
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                The Valletta node is served by Malta International Airport, with direct flights from most European and many intercontinental hubs. A dedicated Artemis shuttle operates between the airport and the Central Governance Node on event days.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                For visitors attending Open Days or extended visits, we have negotiated rates with partner hotels in Valletta and Sliema. Visiting scholars may also apply for short-term accommodation in the Artemis Residency Halls, subject to availability.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                Group visits of 10 or more can be arranged through our Visitor Coordination Office, which provides bespoke itineraries, catering options, and dedicated guides.
              </p>
              <UnderlineCTA text="Travel & accommodation" onClick={() => goToPage('visit-us')} />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1611697047951-c7f9824a5636?auto=format&fit=crop&q=80&w=800"
                alt="Artemis campus grounds"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div ref={anim4.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${anim4.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <RedLabel text="Explore" />
          <h2 className="text-[28px] font-extrabold tracking-tighter text-[#141414] mb-8">Related resources</h2>
          <LinkRows links={pageData.visit.links} goToPage={goToPage} />
        </div>
      </section>
    </>
  );
}

/* ─── Jobs Content ─── */
function JobsContent({ goToPage }: { goToPage: (page: string) => void }) {
  const anim1 = useInView();
  const anim2 = useInView();
  const anim3 = useInView();
  const anim4 = useInView();

  return (
    <>
      {/* Working at Artemis */}
      <section className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24">
        <div ref={anim1.ref} className={`transition-all duration-700 ${anim1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionDivider label="Your Career" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                Building the future of knowledge
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Working at Artemis means joining a global community of scholars, researchers, and professionals who are redefining what a university can be. We are not looking for people who want to maintain the status quo — we are looking for people who want to reinvent it.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Our team spans faculty, research, professional services, and operational roles across 20 locations worldwide. Whether you are leading a seminar in synthetic intelligence, managing the digital infrastructure that connects our nodes, or coordinating the scholar experience in Vancouver, your work will have a direct impact on the future of global education.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                We offer competitive compensation, comprehensive benefits, relocation support, and — uniquely — the opportunity to work across multiple nodes during your career through our Internal Mobility Programme.
              </p>
              <UnderlineCTA text="Current openings" onClick={() => goToPage('jobs')} />
            </div>
            <div>
              <StatsGrid stats={pageData.jobs.stats} />
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div ref={anim2.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${anim2.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <RedLabel text="Featured Roles" />
          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-12">
            Open positions
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {jobListings.map((job, i) => (
              <div key={i} className="bg-white p-6 border border-gray-100 hover:border-[#8A0000] transition-colors group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-[10px] font-bold text-[#8A0000] tracking-widest uppercase">{job.type}</div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#8A0000] group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="text-[18px] font-bold text-[#141414] mb-2 group-hover:text-[#8A0000] transition-colors leading-tight">
                  {job.title}
                </h4>
                <div className="flex items-center gap-2 text-[12px] text-gray-500 mb-3">
                  <MapPin className="w-3 h-3" />
                  <span>{job.location}</span>
                </div>
                <p className="text-[14px] text-gray-600 leading-relaxed">{job.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24">
        <div ref={anim3.ref} className={`transition-all duration-700 ${anim3.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionDivider label="Benefits" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                More than a job
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Artemis offers a comprehensive benefits package designed to support your professional growth and personal wellbeing. Our approach recognizes that great work requires great conditions.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                From flexible working arrangements and sabbatical opportunities to research funding and cross-node exchange programmes, every aspect of the Artemis employment experience is designed to help you do the best work of your career.
              </p>
              <UnderlineCTA text="Benefits & perks" onClick={() => goToPage('jobs')} />
            </div>
            <div className="space-y-6">
              <div className="border-l-2 border-[#8A0000] pl-6">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-1">Internal Mobility</div>
                <p className="text-[14px] text-gray-600 leading-relaxed">Work across different nodes during your career through our structured Internal Mobility Programme.</p>
              </div>
              <div className="border-l-2 border-[#8A0000] pl-6">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-1">Research Funding</div>
                <p className="text-[14px] text-gray-600 leading-relaxed">Dedicated research allowances for faculty and research staff, with competitive internal grant programmes.</p>
              </div>
              <div className="border-l-2 border-[#8A0000] pl-6">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-1">Flexible Working</div>
                <p className="text-[14px] text-gray-600 leading-relaxed">Remote-friendly policies, flexible hours, and asynchronous collaboration tools designed for a distributed workforce.</p>
              </div>
              <div className="border-l-2 border-[#8A0000] pl-6">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-1">Relocation Support</div>
                <p className="text-[14px] text-gray-600 leading-relaxed">Comprehensive relocation packages including visa assistance, housing support, and settling-in allowances.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div ref={anim4.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${anim4.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <RedLabel text="Explore" />
          <h2 className="text-[28px] font-extrabold tracking-tighter text-[#141414] mb-8">Related resources</h2>
          <LinkRows links={pageData.jobs.links} goToPage={goToPage} />
        </div>
      </section>
    </>
  );
}

/* ─── Contact Content ─── */
function ContactContent({ goToPage }: { goToPage: (page: string) => void }) {
  const anim1 = useInView();
  const anim2 = useInView();
  const anim3 = useInView();
  const anim4 = useInView();

  return (
    <>
      {/* Contact Intro */}
      <section className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24">
        <div ref={anim1.ref} className={`transition-all duration-700 ${anim1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionDivider label="Connect" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                How to reach us
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                The Artemis Collegium central administration is based at the Central Governance Node in Valletta, Malta. From here, we coordinate the operations of the entire global network — admissions, governance, communications, and institutional partnerships.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Whether you have a question about admissions, need to reach a specific department, or want to explore a research partnership, our team is here to help. We aim to respond to all enquiries within 24 hours.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                For time-sensitive media enquiries, please use the dedicated press contact below. For all other matters, the general enquiries team will direct your message to the appropriate office.
              </p>
              <UnderlineCTA text="Request information" onClick={() => goToPage('contact-us')} />
            </div>
            <div>
              <StatsGrid stats={pageData.contact.stats} />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Blocks */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div ref={anim2.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${anim2.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <RedLabel text="Departments" />
          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-12">
            Direct contacts
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {contactBlocks.map((block, i) => (
              <div key={i} className="bg-white p-6 border border-gray-100 hover:border-[#8A0000] transition-colors group">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-[#8A0000] shrink-0 mt-1" />
                  <div>
                    <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-2 uppercase">{block.label}</div>
                    <p className="text-[14px] text-gray-600 leading-relaxed mb-3">{block.desc}</p>
                    <a
                      href={`mailto:${block.email}`}
                      className="text-[14px] font-bold text-[#141414] border-b-2 border-[#8A0000] pb-0.5 hover:text-[#8A0000] hover:border-[#141414] transition-colors"
                    >
                      {block.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Physical Address */}
      <section className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24">
        <div ref={anim3.ref} className={`transition-all duration-700 ${anim3.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionDivider label="Location" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                Central Governance Node
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                The administrative headquarters of the Artemis Collegium is located in Valletta, Malta — a UNESCO World Heritage Site and a historic crossroads of Mediterranean culture and governance.
              </p>
              <div className="space-y-6">
                <div className="border-l-2 border-[#8A0000] pl-6">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-2">Postal Address</div>
                  <p className="text-[14px] text-gray-600 leading-relaxed">
                    University of Artemis<br />
                    Central Governance Node<br />
                    Old Mint Street 42<br />
                    Valletta VLT 1515, Malta
                  </p>
                </div>
                <div className="border-l-2 border-[#8A0000] pl-6">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-2">Reception</div>
                  <p className="text-[14px] text-gray-600 leading-relaxed">
                    Open Monday–Friday, 08:00–18:00 CET<br />
                    Closed on Maltese public holidays
                  </p>
                </div>
                <div className="border-l-2 border-[#8A0000] pl-6">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-2">Switchboard</div>
                  <p className="text-[14px] text-gray-600 leading-relaxed">+356 2123 4567</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1655720357872-ce227e4164ba?auto=format&fit=crop&q=80&w=800"
                alt="Valletta, Malta — home of the Artemis Central Governance Node"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div ref={anim4.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${anim4.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <RedLabel text="Explore" />
          <h2 className="text-[28px] font-extrabold tracking-tighter text-[#141414] mb-8">Related resources</h2>
          <LinkRows links={pageData.contact.links} goToPage={goToPage} />
        </div>
      </section>
    </>
  );
}

/* ─── Main Component ─── */
export default function GenericAboutSubpage({ goToPage, title, id, description }: Props) {
  const data = pageData[id];

  const renderContent = () => {
    switch (id) {
      case 'access':
      case 'equality':
        return <AccessContent goToPage={goToPage} />;
      case 'world':
      case 'sustainability':
        return <WorldContent goToPage={goToPage} />;
      case 'visit':
        return <VisitContent goToPage={goToPage} />;
      case 'jobs':
        return <JobsContent goToPage={goToPage} />;
      case 'contact':
      case 'governance':
      case 'policies':
      case 'strategic':
      case 'improvement':
      case 'gazette':
      case 'catalog':
        return <ContactContent goToPage={goToPage} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col bg-white">
      {/* Sub-header breadcrumb */}
      <div className="bg-white border-b border-gray-200 w-full">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
          <div className="flex items-center h-[52px] gap-8 overflow-x-auto hide-scrollbar">
            <h2 className="text-[14px] font-bold tracking-tight text-[#8A0000] mr-10 whitespace-nowrap cursor-pointer hover:opacity-80" onClick={() => goToPage('about')}>
            About Artemis
            </h2>
            <div className="hidden md:flex space-x-6 text-[12px] font-bold uppercase tracking-widest text-gray-400 overflow-x-auto hide-scrollbar">
            <span className="text-black whitespace-nowrap border-b-2 border-[#8A0000]">{title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[45vh] min-h-[360px] overflow-hidden">
        <img
          src={data?.heroImage || 'https://images.unsplash.com/photo-1523240715630-34360e206004?auto=format&fit=crop&q=80&w=1800'}
          className="absolute inset-0 w-full h-full object-cover grayscale"
          alt={title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-8 lg:px-20 pb-16">
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">{data?.heroLabel || 'About Artemis'}</span>
          </div>
          <h1 className="text-[44px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6 uppercase">
            {title}
          </h1>
          <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light">
            {description}
          </p>
        </div>
          </div>
        </div>
      </section>

      {/* Page-Specific Content */}
      {renderContent()}

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
