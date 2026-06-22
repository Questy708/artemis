'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Shield, Zap, Star, Crown, Building2,
  FlaskConical, GraduationCap, BookOpen,
  Users, Globe,
  ChevronDown, Check, Lock, Bitcoin, Wallet, CreditCard,
  Banknote, Repeat, Rocket, Landmark,
  Heart, Sparkles,
  Briefcase, FileText, Gift, HandCoins, Phone,
  Scale, MapPin, Eye, CircleDot, Download
} from 'lucide-react';

interface Props {
  goToPage: (page: string) => void;
}

/* ─── Data ─── */
const CAMPAIGN = { goal: 100_000_000, raised: 5_000, donors: 342, currency: 'USD' };
const fmtNum = (n: number) => n.toLocaleString('en-US');
const fmtShort = (n: number) => n >= 1_000_000 ? `${(n/1_000_000).toFixed(n%1_000_000===0?0:1)}M` : n >= 1_000 ? `${(n/1_000).toFixed(0)}K` : fmtNum(n);
const sym = '$';
const pct = Math.round((CAMPAIGN.raised / CAMPAIGN.goal) * 100);

const MILESTONES = [
  { title: 'The Quiet Phase', target: 50_000_000, reached: false, desc: 'No public announcement. No website. No press. The quiet phase secures lead gifts before the world knows we exist. This is standard practice — Yale secured $3.5B before announcing "For Humanity."', icon: Lock, date: 'Months 1–3', deliverables: ['Lead donor cultivation and solicitation', '$50M in binding commitments secured', 'Campaign cabinet fully operational'] },
  { title: 'The Public Phase', target: 85_000_000, reached: false, desc: 'The campaign goes public. Website launches. Events held. Press engaged. The full case statement reaches every major prospect worldwide.', icon: Globe, date: 'Months 4–6', deliverables: ['Public website and campaign materials live', 'Regional events across all 35 countries', '$85M cumulative commitments'] },
  { title: 'Close & Capitalise', target: 100_000_000, reached: false, desc: 'All $100M commitments secured. Properties acquired. Legal incorporation across 25 jurisdictions. The foundation is poured.', icon: Landmark, date: 'Months 7–9', deliverables: ['All $100M commitments secured', 'Properties acquired and repurposing begun', 'Legal incorporation across 25 countries'] },
  { title: 'Build & Launch', target: 100_000_000, reached: false, desc: 'Faculty onboarded. Colleges opened. Students arriving. The university becomes operational. The match lights the fuel.', icon: Building2, date: 'Months 10–12', deliverables: ['Faculty onboarded and in place', 'Colleges opened and operational', 'Students arriving — university is live'] },
];

const FIVE_PILLARS = [
  { id: 'p1', title: 'Place', subtitle: 'The 50 Colleges', goal: 82_000_000, pct: 82, icon: Building2, desc: 'A university without a physical place is a YouTube channel. Community requires co-location. Tutorials require rooms. We are not building campuses — we are finding existing buildings and giving them a second life as Colleges. Repurposed convents, warehouses, offices, factories. Each one acquired. Each one owned. Each one permanent.', details: 'Properties are 82 cents of every dollar raised. Even at 50% naming uptake, the gifts cover the property costs. Named gifts are endowments — the property is the asset. Donor names a College; the College owns the building.', color: '#8A0000' },
  { id: 'p2', title: 'Minds', subtitle: 'Faculty Launch', goal: 7_000_000, pct: 7, icon: Users, desc: '2,000 faculty must be hired, onboarded, and in place before students arrive. This pillar covers roughly 3 months of faculty compensation before tuition revenue flows. After Day 1, the P&L covers all faculty compensation from tuition. This is a one-time bridge.', details: 'A $5M Distinguished Professorship at 4.5% yield generates $225K/year — enough to sustain one position in perpetuity. The naming gifts are endowments; the $7M pre-launch cost is the bridge.', color: '#8A0000' },
  { id: 'p3', title: 'Access', subtitle: 'Year 1 Scholarships', goal: 5_000_000, pct: 5, icon: GraduationCap, desc: '$3,000/year is accessible to 90% of qualified students worldwide. The remaining 10% — 10,000 students in Year 1 — need assistance. After Year 1, the $262M annual surplus funds 13,300 scholarships per year. This $5M bridges the first cohort.', details: 'After Year 1, the surplus self-funds scholarships at $40M/year. Your seed gift does not run a programme — it launches a permanent scholarship machine.', color: '#8A0000' },
  { id: 'p4', title: 'Excellence', subtitle: 'Research & Inquiry', goal: 3_000_000, pct: 3, icon: Star, desc: 'Research seed funds, visiting fellowships, the Artemis Press, Centers of Inquiry. The mechanisms that turn a good university into an inevitable one.', details: '19 Centers of Inquiry and 42 Active Projects need startup capital: research equipment, fieldwork budgets, database subscriptions, publication subsidies, and the open knowledge infrastructure that powers the 7-year release. After Year 1, faculty time (already compensated) covers most ongoing project work. This $3M is the seed that makes every Center operational from Day 1.', color: '#8A0000' },
  { id: 'p5', title: 'Progress', subtitle: 'Innovation & Infrastructure', goal: 3_000_000, pct: 3, icon: Rocket, desc: 'Innovation labs, the Global Challenge Fund, technology infrastructure. The bridge between scholarship and the world it serves.', details: "The university that outlives its founders needs a corpus that outlives its donors. After Year 1, the surplus builds the endowment at $60M/year. But the first deposit — the seed — comes from the founding campaign. $3M at 4.5% = $135K/year in perpetuity from Day 1. That's enough to fund 11 full scholarships forever, before any surplus is generated. Founders' Circle gifts are cumulative across all pillars.", color: '#8A0000' },
];

const NAMING_OPPORTUNITIES = [
  { title: 'Tier C College', amount: 2_000_000, desc: 'Name a College in cities like Kigali, Dhaka, Kampala, Karachi. ~1,100 students. Your name becomes home to the next generation of leaders in your region.', icon: Building2, type: 'College' },
  { title: 'Tier B College', amount: 5_000_000, desc: 'Name a College in major global cities. ~2,000 students. A permanent physical presence bearing your name, serving scholars for centuries.', icon: Building2, type: 'College' },
  { title: 'Tier A College', amount: 10_000_000, desc: 'Name a flagship College in the world\'s great knowledge capitals. ~2,500 students. The highest-profile naming opportunity outside the Central Nodes.', icon: Building2, type: 'College' },
  { title: 'Central Node', amount: 25_000_000, desc: 'Name one of three Central Nodes — Venice, San Francisco, Singapore. ~5,000 students. The apex of the Artemis network, bearing your name in perpetuity.', icon: Landmark, type: 'Central Node' },
  { title: 'Distinguished Professorship', amount: 5_000_000, desc: 'At 4.5% yield, generates $225K/year — sustaining one position in perpetuity at career-level compensation. The naming gift is an endowment.', icon: Crown, type: 'Endowment' },
  { title: 'Center of Inquiry', amount: 10_000_000, desc: 'Name one of 19 Centers of Inquiry — a permanently endowed, independently operating research centre carrying your name.', icon: FlaskConical, type: 'Naming' },
  { title: 'Degree Program', amount: 3_000_000, desc: 'Name one of 55 degree programs. Your name associated with a specific discipline and every graduate who carries it forward.', icon: BookOpen, type: 'Naming' },
  { title: 'Scholarship Fund', amount: 12_000, desc: 'Fund one student\'s full scholarship for four years. $3,000/year \u00d7 4 years. The most direct way to change a life.', icon: GraduationCap, type: 'Scholarship' },
];

const GIVING_CIRCLES = [
  { name: "The Founders' Circle", range: '$10M+', min: 10_000_000, color: '#8A0000', icon: Crown, benefits: ['Name engraved on the university\'s founding document at Venice Central Node', 'Permanent seat on Board of Visitors', 'Private annual dinner with the President at rotating Central Node', 'Named endowment fund or equivalent naming opportunity', 'Recognition plaque at all 50 Colleges', 'Biographical feature in annual campaign report'] },
  { name: "The Guardians' Circle", range: '$5M \u2013 $9.9M', min: 5_000_000, color: '#6B0000', icon: Shield, benefits: ['Named College or Center of Inquiry', 'Recognition plaque at all 50 Colleges', 'Annual Guardian\'s Lecture \u2014 a public lecture series named by you', 'Annual private briefing with the President', 'Named endowment fund'] },
  { name: "The Builders' Circle", range: '$1M \u2013 $4.9M', min: 1_000_000, color: '#4338ca', icon: Building2, benefits: ['Named Professorship, Scholarship Fund, or major program', 'Recognition plaque at all 50 Colleges', 'Annual Builder\'s Report \u2014 detailed impact report on your named gift', 'Invitation to annual gathering', 'Feature in campaign newsletter'] },
  { name: "The Fellows' Circle", range: '$100K \u2013 $999K', min: 100_000, color: '#0e7490', icon: Star, benefits: ['Named scholarship fund or tutorial room at chosen College', 'Recognition at chosen College', 'Annual Fellow\'s Newsletter from the President', 'Invitation to regional events'] },
  { name: 'Friends of Artemis', range: '$10K \u2013 $99K', min: 10_000, color: '#15803d', icon: Heart, benefits: ['Name in founding Donor Roll (permanent digital and print record)', 'Digital certificate of founding support', 'Quarterly progress updates', 'Invitation to online events'] },
  { name: 'The 99', range: '$99', min: 99, color: '#6b7280', icon: Users, benefits: ['Waitlist priority for enrollment', 'Digital recognition on community wall', 'Monthly community updates', 'The knowledge that you were first in line'] },
];

const TIER_COLORS: Record<string, string> = { founders: '#8A0000', guardians: '#6B0000', builders: '#4338ca', fellows: '#0e7490', friends: '#15803d', the99: '#6b7280' };
const TIER_LABELS: Record<string, string> = { founders: "Founders' Circle", guardians: "Guardians' Circle", builders: "Builders' Circle", fellows: "Fellows' Circle", friends: 'Friends of Artemis', the99: 'The 99' };

const LEGAL_ENTITIES = [
  {
    tier: 'Primary',
    status: 'Incorporated',
    jurisdiction: 'United States',
    name: 'Delaware Non-Stock Corporation',
    classification: '501(c)(3) — Educational & Charitable',
    keyBenefit: 'Tax-deductible donations in the world\'s largest philanthropy market ($499B in 2024). Every dollar given reduces the donor\'s US tax liability.',
    structure: [
      'Non-stock corporation — no shareholders, no owner',
      'IRS Form 1023 filed for 501(c)(3) determination',
      'Retroactive deductibility within 27 months of incorporation',
      'Required: 3+ independent board members, no single controller',
    ],
    color: '#8A0000',
    icon: Landmark,
  },
  {
    tier: 'Secondary',
    status: 'Pre-Filing',
    jurisdiction: 'England & Wales',
    name: 'Charitable Incorporated Organisation',
    classification: 'Charity Commission — Advancement of Education',
    keyBenefit: 'Gift Aid turns every £1M into £1.25M through HMRC top-up. UK donors receive full tax relief. Aligns with University of London consortium partnership.',
    structure: [
      'CIO or Company Limited by Guarantee',
      '3+ trustees required with UK registered office',
      'Gift Aid eligibility — 25% government supplement',
      'Recognised by Commonwealth jurisdictions worldwide',
    ],
    color: '#6B0000',
    icon: Building2,
  },
  {
    tier: 'Tertiary',
    status: 'Planned',
    jurisdiction: 'Switzerland',
    name: 'Fondation under Swiss Civil Code',
    classification: 'International Foundation — Geneva Canton',
    keyBenefit: 'Endowment management in a neutral jurisdiction with minimal tax drag. Signals institutional permanence to European and Gulf donors. Home to WHO, CERN, IOC.',
    structure: [
      'Minimum CHF 50,000 initial capital',
      'Cantonal authority approval required',
      'No capital gains tax on endowment growth',
      'Governed by Swiss foundation supervision',
    ],
    color: '#4a0e0e',
    icon: Scale,
  },
];

const FISCAL_SPONSORS = ['Rockefeller Philanthropy Advisors', 'NGOsource', 'Global Impact'];

const ACCOUNTABILITY_GUARANTEES = [
  { title: 'Board Independence', desc: 'No single individual controls more than one-third of board seats. Majority independent directors required.', icon: Users },
  { title: 'Annual Audit', desc: 'Full independent audit by a Big Four firm. Published annually. No exceptions.', icon: Eye },
  { title: 'Public Reporting', desc: 'Every dollar received and disbursed is published in an annual impact report, available to every donor and the public.', icon: FileText },
];

const DONOR_SEGMENTS = [
  { segment: 'Lead Donors', count: '10 gifts', target: '$70M', pct: 70, desc: '70% of the campaign from 10 donors. This is how founding campaigns work.' },
  { segment: 'Major Donors', count: '20 gifts', target: '$20M', pct: 20, desc: '20 donors at the $1M\u2013$5M level, building the academic infrastructure.' },
  { segment: 'Community', count: 'Unlimited', target: '$10M', pct: 10, desc: 'Hundreds of donors at $10K\u2013$999K, seeding scholarships, rooms, and research.' },
];

const WAYS_TO_GIVE = [
  { title: 'Online', desc: 'Make a one-time or recurring gift by card, PayPal, or cryptocurrency directly on this page. Fast, secure, and immediate confirmation of your contribution.', icon: CreditCard },
  { title: 'Bank or Wire Transfer', desc: 'Transfer directly from your bank. Suitable for large contributions and international donors. See the donation form for our account details, or contact our advancement team for assistance with international transfers.', icon: Banknote },
  { title: 'Cryptocurrency', desc: 'Donate Bitcoin (BTC) or Ethereum (ETH) directly to Artemis. Crypto donations are recorded on the public chain, making your contribution a permanent part of the university\'s founding record. Contact crypto@artemisui.org with your transaction hash.', icon: Bitcoin },
  { title: 'Securities and Stock', desc: 'Donate appreciated stocks, bonds, or mutual funds to avoid capital gains tax while maximising your impact. Our advancement team will facilitate the transfer and provide all necessary documentation for your records.', icon: Briefcase },
  { title: 'Planned Giving', desc: 'Include Artemis in your estate plan through a will, trust, or beneficiary designation. Planned gifts create a permanent legacy and may provide significant tax benefits. We work with your advisors to structure a gift that aligns with your financial goals.', icon: FileText },
  { title: 'Employer Matching', desc: 'Many employers match charitable contributions dollar-for-dollar. Check with your HR department to see if your company participates \u2014 your gift to Artemis could be doubled at no additional cost to you.', icon: HandCoins },
  { title: 'Donor-Advised Funds', desc: 'Recommend a grant from your donor-advised fund (DAF) to the University of Artemis. DAF gifts are a tax-efficient way to support the founding while maintaining flexibility in your giving strategy.', icon: Gift },
  { title: 'In-Kind Contributions', desc: 'Donate equipment, technology, library materials, real estate, or professional services. In-kind gifts that support the academic mission are valued and recognised in the same way as financial contributions.', icon: Heart },
];

const DONORS = [
  { name: 'The Nordgren Foundation', amount: 100000, date: '28 Apr', msg: 'Investing in the infrastructure of imagination.', tier: 'fellows' },
  { name: 'Chen Wei Laboratories', amount: 50000, date: '4 May', msg: null, tier: 'friends' },
  { name: 'Dr. Elena Vasquez', amount: 25000, date: '10 May', msg: 'For the students who will change everything.', tier: 'friends' },
  { name: 'Anonymous Patron', amount: 40000, date: '7 May', msg: 'Because knowledge should have no borders.', tier: 'friends' },
  { name: 'The Matsuo Trust', amount: 30000, date: '18 Apr', msg: null, tier: 'friends' },
  { name: 'Liu Fang Foundation', amount: 15000, date: '25 Apr', msg: null, tier: 'friends' },
  { name: 'James & Priya Okonkwo', amount: 5000, date: '8 May', msg: null, tier: 'the99' },
  { name: 'The Al-Rashidi Family', amount: 3000, date: '5 May', msg: 'In memory of Fatima Al-Rashidi.', tier: 'the99' },
  { name: 'Dr. Robert & Sarah Kimani', amount: 2500, date: '22 Apr', msg: 'For the next generation of African scholars.', tier: 'the99' },
  { name: 'Sven & Astrid Lindqvist', amount: 5000, date: '20 Apr', msg: 'For the north, and for everywhere.', tier: 'the99' },
  { name: 'Anonymous', amount: 1000, date: '23 Apr', msg: null, tier: 'the99' },
  { name: 'Takeshi Yamamoto', amount: 500, date: '2 May', msg: null, tier: 'the99' },
  { name: 'Maria Santos', amount: 250, date: '3 May', msg: 'Proud to be part of the founding.', tier: 'the99' },
  { name: 'Amara Osei', amount: 100, date: '27 Apr', msg: 'Every great university starts with a first believer.', tier: 'the99' },
  { name: 'Isla McGregor', amount: 150, date: '15 Apr', msg: 'A small stone in a great cathedral.', tier: 'the99' },
];

const CRYPTO = { BTC: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', ETH: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' };
const PRESETS = [25, 100, 500, 1000, 5000, 10000];

const RESOURCES = [
  { id: 'founding-prospectus', title: 'Founding Prospectus', desc: 'The complete donor-facing deck: vision, model, financial engine, naming opportunities, and the ask. Designed to close.', icon: FileText, file: '/resources/artemis-founding-prospectus.pdf', pages: 26 },
  { id: 'campaign-overview', title: 'Campaign Overview', desc: 'A concise summary of the $100M founding campaign: milestones, pillars, allocation, and how to give.', icon: Zap, file: '/resources/artemis-campaign-overview.pdf', pages: 21 },
  { id: 'case-for-support', title: 'Case for Support', desc: 'The detailed narrative: why Artemis, why now, and why your gift creates a self-sustaining institution.', icon: Heart, file: '/resources/artemis-case-for-support.pdf', pages: 24 },
  { id: 'financial-model', title: 'Financial Model Breakdown', desc: 'Full pro-forma: where every dollar goes, revenue projections, OPEX ratios, and endowment growth.', icon: CreditCard, file: '/resources/artemis-financial-model.pdf', pages: 21 },
  { id: 'tax-guide', title: 'Tax Deductibility Guide', desc: 'Jurisdiction-by-jurisdiction guide: US 501(c)(3), UK Gift Aid, Swiss foundations, and more.', icon: Scale, file: '/resources/artemis-tax-guide.pdf', pages: 23 },
  { id: 'legal-entities', title: 'Legal Entity Overview', desc: 'Corporate structure across three jurisdictions, governance documents, and incorporation details.', icon: Landmark, file: '/resources/artemis-legal-entities.pdf', pages: 24 },
  { id: 'naming-booklet', title: 'Naming Opportunities Booklet', desc: 'All naming opportunities with descriptions, amounts, and scope — Colleges, Central Nodes, Professorships, and more.', icon: Crown, file: '/resources/artemis-naming-booklet.pdf', pages: 24 },
  { id: 'giving-circles', title: 'Giving Circles Benefits Guide', desc: 'Full details on each circle: benefits, recognition, events, and annual impact.', icon: Star, file: '/resources/artemis-giving-circles.pdf', pages: 21 },
  { id: 'campus-plan', title: 'Campus Master Plan', desc: 'Repurposing philosophy, 3 Central Nodes, College tiers, and the global node network.', icon: Building2, file: '/resources/artemis-campus-master-plan.pdf', pages: 24 },
  { id: 'alliance-map', title: 'Collegium Alliance Map', desc: 'Regional breakdown: 50 Colleges, 6 continents, 35 countries, and Central Node locations.', icon: MapPin, file: '/resources/artemis-collegium-map.pdf', pages: 22 },
  { id: 'academic-prospectus', title: 'Academic Prospectus', desc: 'Programs of study, curriculum pillars, tutorial system, and the competency-based grading model.', icon: BookOpen, file: '/resources/artemis-academic-prospectus.pdf', pages: 22 },
  { id: 'research-portfolio', title: 'Centers of Inquiry Research Portfolio', desc: 'The 19 Centers, their research domains, current projects, and the 7-year release policy.', icon: FlaskConical, file: '/resources/artemis-research-portfolio.pdf', pages: 23 },
  { id: 'strategic-plan', title: 'Strategic Plan 2025-2030', desc: 'The full 5-year strategic roadmap: year-by-year targets, academic, financial, and infrastructure plans.', icon: Rocket, file: '/resources/artemis-strategic-plan.pdf', pages: 19 },
  { id: 'manifesto', title: 'The Founding Manifesto', desc: 'The master document — a theory of everything Artemis. Planetary, need-blind, self-sustaining. For students, investors, and partners. The blueprint and the call to action.', icon: Sparkles, file: '/resources/artemis-manifesto.pdf', pages: 55 },
];

/* ─── Helpers ─── */
function getGivingCircle(amount: number) {
  if (amount >= 10_000_000) return GIVING_CIRCLES[0];
  if (amount >= 5_000_000) return GIVING_CIRCLES[1];
  if (amount >= 1_000_000) return GIVING_CIRCLES[2];
  if (amount >= 100_000) return GIVING_CIRCLES[3];
  if (amount >= 10_000) return GIVING_CIRCLES[4];
  if (amount >= 99) return GIVING_CIRCLES[5];
  return null;
}

/* ─── Hooks ─── */
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

/* ─── Animation helpers ─── */
const clipReveal = (visible: boolean) => ({
  initial: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  animate: visible ? { clipPath: 'inset(0 0 0% 0)', opacity: 1 } : {},
  transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as any },
});

const slideLeft = (visible: boolean, delay = 0) => ({
  initial: { x: -60, opacity: 0 },
  animate: visible ? { x: 0, opacity: 1 } : {},
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as any },
});

const slideRight = (visible: boolean, delay = 0) => ({
  initial: { x: 60, opacity: 0 },
  animate: visible ? { x: 0, opacity: 1 } : {},
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as any },
});

const scaleIn = (visible: boolean, delay = 0) => ({
  initial: { scale: 0.85, opacity: 0 },
  animate: visible ? { scale: 1, opacity: 1 } : {},
  transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as any },
});

const fadeUp = (visible: boolean, delay = 0) => ({
  initial: { y: 30, opacity: 0 },
  animate: visible ? { y: 0, opacity: 1 } : {},
  transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as any },
});

/* ─── Animated Counter Component ─── */
function AnimatedCounter({ value, prefix = '', suffix = '', className = '' }: { value: number; prefix?: string; suffix?: string; className?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        const duration = 2000;
        const start = performance.now();
        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(eased * value));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, hasAnimated]);

  const formatted = display >= 1000 ? display.toLocaleString('en-GB') : display.toString();
  return <span ref={ref} className={className}>{prefix}{formatted}{suffix}</span>;
}

/* ─── Phase Slider Component ─── */
function PhaseSlider() {
  const [active, setActive] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const total = MILESTONES.length;

  const scrollTo = (idx: number) => {
    setActive(Math.max(0, Math.min(idx, total - 1)));
    if (sliderRef.current) {
      const child = sliderRef.current.children[idx] as HTMLElement;
      if (child) {
        sliderRef.current.scrollTo({ left: child.offsetLeft - 20, behavior: 'smooth' });
      }
    }
  };

  const handleScroll = useCallback(() => {
    if (!sliderRef.current) return;
    const scrollLeft = sliderRef.current.scrollLeft;
    const childWidth = (sliderRef.current.children[0] as HTMLElement)?.offsetWidth || 400;
    const newActive = Math.round(scrollLeft / childWidth);
    if (newActive !== active && newActive >= 0 && newActive < total) {
      setActive(newActive);
    }
  }, [active, total]);

  return (
    <div>
      {/* Phase step indicators */}
      <div className="flex items-center mb-8 sm:mb-12">
        {MILESTONES.map((ms, i) => {
          const Icon = ms.icon;
          return (
            <React.Fragment key={i}>
              <button
                onClick={() => scrollTo(i)}
                className={`flex items-center gap-2 px-3 sm:px-5 py-2.5 transition-all shrink-0 ${
                  i === active
                    ? 'bg-[#8A0000] text-white'
                    : i < active
                    ? 'bg-[#8A0000]/10 text-[#8A0000]'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                <Icon size={16} />
                <span className="text-[11px] sm:text-[13px] font-black uppercase tracking-wider hidden sm:inline">{ms.title}</span>
                <span className="text-[11px] sm:text-[13px] font-black uppercase tracking-wider sm:hidden">{['I','II','III','IV'][i]}</span>
              </button>
              {i < total - 1 && (
                <div className={`flex-1 h-[2px] min-w-[20px] ${i < active ? 'bg-[#8A0000]' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Horizontal scrolling cards */}
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {MILESTONES.map((ms, i) => {
          const Icon = ms.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="snap-start shrink-0 w-[85vw] sm:w-[600px] md:w-[700px] bg-white border border-gray-200 p-6 sm:p-8 lg:p-10"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className={`w-12 h-12 flex items-center justify-center border-2 ${i <= active ? 'bg-[#8A0000] border-[#8A0000]' : 'bg-white border-gray-300'}`}>
                  <Icon size={20} className={i <= active ? 'text-white' : 'text-gray-400'} />
                </div>
                <div>
                  <h4 className="text-[22px] sm:text-[26px] font-black text-[#141414]">{ms.title}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[13px] font-black text-[#8A0000]">{sym}{fmtShort(ms.target)}</span>
                    <span className="text-[12px] text-gray-400">{ms.date}</span>
                  </div>
                </div>
              </div>

              <p className="text-[15px] sm:text-[16px] text-gray-600 leading-[1.75] mb-6">{ms.desc}</p>

              <div className="border-t border-gray-100 pt-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8A0000] mb-3 block">Deliverables</span>
                <ul className="space-y-2.5">
                  {ms.deliverables.map((d, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <Check size={14} className="mt-0.5 shrink-0 text-[#8A0000]" />
                      <span className="text-[13px] sm:text-[14px] text-gray-600">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation arrows */}
      <div className="flex items-center justify-between mt-6 sm:mt-8">
        <div className="flex gap-2">
          {MILESTONES.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === active ? 'bg-[#8A0000] w-8' : i < active ? 'bg-[#8A0000]/40' : 'bg-gray-300'}`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => scrollTo(active - 1)}
            disabled={active === 0}
            className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:border-[#8A0000] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button
            onClick={() => scrollTo(active + 1)}
            disabled={active === total - 1}
            className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:border-[#8A0000] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Resource Group (category sub-section) ─── */
function ResourceGroup({ label, items, animVisible }: { label: string; items: typeof RESOURCES; animVisible: boolean }) {
  if (!items.length) return null;
  return (
    <div className="mt-10 sm:mt-12">
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-5"
      >
        <span className="w-6 h-[1px] bg-[#8A0000]/60"></span>
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8A0000]/90">{label}</span>
        <span className="text-[11px] text-white/25">{items.length} document{items.length !== 1 ? 's' : ''}</span>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((res, i) => {
          const Icon = res.icon;
          return (
            <motion.a
              key={res.id}
              href={res.file}
              download
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.2) }}
              viewport={{ once: true }}
              className="group relative bg-white/[0.03] border border-white/10 hover:border-[#8A0000]/50 hover:bg-white/[0.06] transition-all rounded-xl p-5 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#8A0000]/10 shrink-0 group-hover:bg-[#8A0000]/20 transition-colors">
                  <Icon size={16} className="text-[#ff6b6b]" />
                </div>
                <Download size={15} className="text-white/20 group-hover:text-[#ff6b6b] transition-colors" />
              </div>
              <h4 className="text-[14px] font-bold text-white mb-1.5 group-hover:text-[#ff6b6b] transition-colors leading-tight">{res.title}</h4>
              <p className="text-[11px] text-white/45 leading-relaxed flex-1 mb-4">{res.desc}</p>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/30">PDF</span>
                <span className="text-[10px] font-semibold text-white/40">{res.pages} pages</span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function FundraisingCampaign({ goToPage }: Props) {
  const activeSection = useActiveSection(['case', 'pillars', 'ask', 'phases', 'opportunities', 'circles', 'ways', 'give', 'resources', 'accountability']);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFreq, setRecurringFreq] = useState('monthly');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'crypto' | 'paypal'>('card');
  const [cryptoCoin, setCryptoCoin] = useState<'BTC' | 'ETH'>('BTC');
  const [selectedPerk, setSelectedPerk] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [donationResult, setDonationResult] = useState<{ success: boolean; message: string } | null>(null);
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);
  const [expandedCircle, setExpandedCircle] = useState<string | null>(null);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactArea, setContactArea] = useState('General enquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactResult, setContactResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleContactSubmit = useCallback(async () => {
    if (!contactName || !contactEmail || !contactMessage) return;
    setContactSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: contactName, email: contactEmail, area: contactArea, message: contactMessage }),
      });
      const data = await res.json();
      if (data.success) {
        setContactResult({ success: true, message: data.message });
        setContactName(''); setContactEmail(''); setContactArea('General enquiry'); setContactMessage('');
      } else {
        setContactResult({ success: false, message: data.error || 'Something went wrong.' });
      }
    } catch { setContactResult({ success: false, message: 'Network error.' }); }
    finally { setContactSubmitting(false); }
  }, [contactName, contactEmail, contactArea, contactMessage]);

  const heroAnim = useInView(0);
  const caseAnim = useInView(0);
  const pillarsAnim = useInView(0);
  const phasesAnim = useInView(0);
  const opportunitiesAnim = useInView(0);
  const circlesAnim = useInView(0);
  const waysAnim = useInView(0);
  const giveAnim = useInView(0);
  const beyondAnim = useInView(0);
  const askAnim = useInView(0);
  const accountabilityAnim = useInView(0);
  const resourcesAnim = useInView(0);

  const effectiveAmount = selectedAmount || parseFloat(customAmount) || 0;

  const handleDonate = useCallback(async () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (!amount || amount <= 0 || !donorEmail) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorEmail, donorName: isAnonymous ? null : donorName, isAnonymous,
          amount, currency: CAMPAIGN.currency, paymentMethod: paymentMethod === 'crypto' ? `crypto_${cryptoCoin.toLowerCase()}` : paymentMethod,
          perkId: selectedPerk, isRecurring, recurringFreq: isRecurring ? recurringFreq : null, message: donorMessage || null,
        }),
      });
      const data = await res.json();
      if (data.success && data.checkoutUrl) {
        // Stripe, PayPal, or DONATION_LINK — redirect to checkout
        window.location.href = data.checkoutUrl;
      } else if (data.success) {
        // No gateway — donation recorded as pending
        setDonationResult({ success: true, message: data.message || 'Thank you! Your donation has been recorded. We will follow up with payment details.' });
      } else {
        setDonationResult({ success: false, message: data.error || 'Something went wrong.' });
      }
    } catch { setDonationResult({ success: false, message: 'Network error.' }); }
    finally { setSubmitting(false); }
  }, [selectedAmount, customAmount, donorEmail, donorName, isAnonymous, paymentMethod, cryptoCoin, selectedPerk, isRecurring, recurringFreq, donorMessage]);

  /* ─── Impact text helper ─── */
  const getImpactText = (amount: number) => {
    if (amount >= 25_000_000) return 'Name a Central Node — Venice, San Francisco, or Singapore. The apex of the Artemis network, bearing your name in perpetuity.';
    if (amount >= 10_000_000) return 'Name a Tier A College or Center of Inquiry. Your name permanently associated with a flagship institution.';
    if (amount >= 5_000_000) return "Name a Tier B College or Distinguished Professorship. A permanent endowment in your name.";
    if (amount >= 2_000_000) return 'Name a Tier C College. Your name becomes home to the next generation of leaders.';
    if (amount >= 1_000_000) return "Name a Professorship or major program. A lasting academic legacy.";
    if (amount >= 100_000) return "Named scholarship fund or tutorial room at your chosen College.";
    if (amount >= 12_000) return "Fund a student's full scholarship for four years. The most direct way to change a life.";
    if (amount >= 10_000) return 'Your name in the founding Donor Roll — a permanent record of the founders.';
    if (amount >= 99) return 'Waitlist priority for enrollment. You were first in line.';
    return 'Every contribution counts in the founding of a university.';
  };

  return (
    <div className="flex flex-col bg-white">

      {/* ══════════════════════════════════════════
          1. HERO
          ══════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[40vh] sm:h-[45vh] min-h-[300px] sm:min-h-[360px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1624555130296-e551faf8969b?auto=format&fit=crop&q=80&w=1800"
              alt="For Civilization — The Founding Campaign"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-10 sm:pb-16">
              <div ref={heroAnim.ref} className={`transition-all duration-700 ${heroAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="mb-8 flex items-center space-x-3">
                  <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">The Founding Campaign</span>
                </div>
                <h1 className="text-[30px] sm:text-[44px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-4 uppercase">
                  For Civilization
                </h1>
                <p className="text-[15px] sm:text-[18px] text-white/70 max-w-xl leading-relaxed font-light mb-4 sm:mb-6">
                  The Founding Campaign for the University of Artemis. $100M. 12 months. The kickstart that makes everything else self-sustaining.
                </p>
                <p className="text-[13px] sm:text-[15px] text-[#8A0000]/90 font-bold uppercase tracking-[0.15em] mb-6 sm:mb-8">
                  $100M. 4 phases to launch. The zero-to-one moment for civilization.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => document.getElementById('give')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center space-x-3 px-8 py-4 bg-[#8A0000] text-white text-[12px] font-bold uppercase tracking-[0.25em] hover:bg-[#6B0000] transition-colors group">
                    <span>Give Now</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button onClick={() => document.getElementById('case')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center space-x-3 px-8 py-4 border border-white/25 text-white/60 text-[12px] font-bold uppercase tracking-[0.25em] hover:bg-white/10 hover:text-white transition-colors">
                    <span>Read the Case</span>
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OnThisPageNav
        sections={[
          { id: 'case', label: 'Why Now, Why Us' },
          { id: 'pillars', label: 'Five Pillars' },
          { id: 'ask', label: 'The Ask' },
          { id: 'phases', label: 'Timeline' },
          { id: 'opportunities', label: 'Naming' },
          { id: 'circles', label: 'Giving Circles' },
          { id: 'ways', label: 'Ways to Give' },
          { id: 'give', label: 'Give Now' },
          { id: 'resources', label: 'Resources' },
          { id: 'accountability', label: 'Accountability' },
        ]}
        activeSection={activeSection}
      />

      {/* ══════════════════════════════════════════
          CAMPAIGN PROGRESS
          ══════════════════════════════════════════ */}
      <section className="bg-white py-12 sm:py-20 lg:py-28 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          {/* Section Header */}
          <div className="mb-10 sm:mb-14">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A0000] block mb-3">Campaign Progress</span>
            <div className="flex items-baseline gap-3 flex-wrap">
              <AnimatedCounter value={CAMPAIGN.raised} prefix={sym} className="text-[28px] sm:text-[36px] md:text-[48px] font-black tracking-tighter text-[#141414]" />
              <span className="text-[16px] sm:text-[20px] font-normal text-gray-400">of {sym}{fmtShort(CAMPAIGN.goal)} goal</span>
              <span className="text-[14px] sm:text-[18px] font-black text-[#8A0000]">({pct}%)</span>
            </div>
          </div>

          {/* Clear progress bar */}
          <div className="mb-12 sm:mb-16">
            <div className="relative h-3 sm:h-4 bg-gray-100 w-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#8A0000] to-[#a01010]"
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                transition={{ duration: 2, ease: 'easeOut' }}
                viewport={{ once: true }}
              />
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
                style={{ width: '30%' }}
                animate={{ x: ['-100%', `${pct * 10}%`] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
              />
            </div>

            {/* Milestone markers on the bar */}
            <div className="relative mt-4">
              <div className="flex justify-between text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-gray-400">
                <span>{sym}0</span>
                <span>{sym}25M</span>
                <span>{sym}50M</span>
                <span>{sym}75M</span>
                <span>{sym}100M</span>
              </div>
            </div>
          </div>

          {/* Stats + Pillar breakdown row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
            {[
              { label: 'Donors', value: CAMPAIGN.donors, animate: true, icon: Users },
              { label: 'Avg. Gift', value: Math.round(CAMPAIGN.raised / CAMPAIGN.donors), prefix: sym, animate: true, icon: CreditCard },
              { label: 'Countries', value: 35, animate: false, icon: Globe },
              { label: 'Months', value: 12, animate: false, icon: Zap },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-gray-50 shrink-0">
                  <stat.icon size={16} className="text-[#8A0000]" />
                </div>
                <div>
                  {stat.animate ? (
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix}
                      className="text-[20px] font-black text-[#141414] leading-none"
                    />
                  ) : (
                    <div className="text-[20px] font-black text-[#141414] leading-none">
                      {stat.prefix || ''}{stat.value.toLocaleString()}
                    </div>
                  )}
                  <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-1">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>


        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. THE CASE — Why Now, Why Us
          ══════════════════════════════════════════ */}
      <section id="case" className="scroll-mt-[110px] py-16 sm:py-24 lg:py-36">
        <div ref={caseAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">

          {/* Section Title — full width */}
          <motion.h2 {...slideLeft(caseAnim.visible)} className="text-[28px] sm:text-[40px] md:text-[52px] lg:text-[64px] font-black leading-[1] tracking-tighter text-[#141414] mb-16 sm:mb-24">
            Why Now, <span className="text-[#8A0000]">Why Us</span>
          </motion.h2>

          {/* Full-Width Content */}
          <div>

          {/* ── A. The Broken System — Built for a Gone World ── */}
          <motion.div {...fadeUp(caseAnim.visible, 0.15)} className="mb-20 sm:mb-28">
            <h3 className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#8A0000] mb-4">The Broken System</h3>
            <p className="text-[20px] sm:text-[24px] md:text-[28px] font-bold text-[#141414] leading-snug mb-6">
              The world doesn&rsquo;t have a university problem.<br />It has a <span className="text-[#8A0000]">civilization problem</span>.
            </p>
            <p className="text-[15px] sm:text-[17px] text-gray-600 leading-[1.8] mb-4">
              The modern university was designed for a world that no longer exists. It was built to serve the industrial economy &mdash; to sort workers into fixed career tracks, to certify competencies that lasted a lifetime, to produce specialists for a stable and predictable labour market. That world is gone. The institutions remain, like factories without a product, certifying skills that machines now perform better and cheaper.
            </p>
            <p className="text-[15px] sm:text-[17px] text-gray-600 leading-[1.8] mb-10">
              This is not a problem that can be solved by reforming existing institutions. You cannot retrofit a cathedral into a spacecraft. The university of 2026 cannot be built by adding AI modules to a curriculum designed in 1926. The architecture itself &mdash; centralised, exclusionary, disciplinary, slow &mdash; is the problem. Not the people in it. Not even the ideas. The <strong className="text-[#141414]">structure</strong>.
            </p>

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10">
              {[
                { stat: '$75K', unit: '/year', desc: 'average tuition at a top-50 global university. A gate, not a door. Price as proxy for quality has produced the most expensive exclusion mechanism in human history.' },
                { stat: '1.5%', unit: '', desc: 'of the world\'s population has access to a research-class education. The other 98.5% are not less capable. They are less admitted. Talent is distributed equally. Opportunity is not.' },
                { stat: '65%', unit: '', desc: 'of children entering primary school today will work in jobs that don\'t yet exist. Yet universities still certify for fixed disciplines on four-year cycles. The half-life of a degree is collapsing faster than institutions can adapt.' },
                { stat: '800M', unit: '', desc: 'capable minds on Earth will never set foot in a research university. Not because they lack ability. Because the system was never built for them. It was built for the few who could pay, relocate, and wait.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(caseAnim.visible, 0.2 + i * 0.08)}
                  className="border border-gray-200 p-6 sm:p-8 bg-white hover:border-[#8A0000]/30 transition-colors"
                >
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-[36px] sm:text-[48px] md:text-[56px] font-black text-[#8A0000] leading-none tracking-tighter">{item.stat}</span>
                    {item.unit && <span className="text-[14px] sm:text-[16px] font-bold text-[#8A0000]/70">{item.unit}</span>}
                  </div>
                  <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Post-labour economics argument */}
            <motion.div {...fadeUp(caseAnim.visible, 0.5)} className="border-l-4 border-[#8A0000] pl-5 sm:pl-8 py-2 mb-8">
              <h4 className="text-[14px] sm:text-[16px] font-black text-[#8A0000] uppercase tracking-[0.15em] mb-3">Post-Labour Economics & the Advent of Homo Eruditus</h4>
              <p className="text-[15px] sm:text-[16px] text-gray-600 leading-[1.8] mb-4">
                For three centuries, the economic model was simple: learn a skill, trade your labour for income, retire. <strong className="text-[#141414]">That contract is broken.</strong> AI and automation are not replacing jobs one at a time &mdash; they are dissolving the entire category of &ldquo;job&rdquo; as a stable, lifelong unit. The industrial economy needed homo economicus: the rational, self-interested worker who trades time for wages. The knowledge economy needs something else entirely.
              </p>
              <p className="text-[15px] sm:text-[16px] text-gray-600 leading-[1.8] mb-4">
                Enter <strong className="text-[#8A0000]">homo eruditus</strong> &mdash; the educated human. Not a worker trained for a single function, but a mind capable of continuous learning, cross-disciplinary synthesis, and adaptive reasoning. The species that will thrive in the post-labour economy is not the one with the most specialised degree. It is the one with the deepest capacity to <em>learn, unlearn, and relearn</em>.
              </p>
              <p className="text-[15px] sm:text-[16px] text-gray-600 leading-[1.8]">
                No existing university was built to produce homo eruditus. They were built to produce homo economicus &mdash; and they&rsquo;re still optimising for a world that no longer exists. The system isn&rsquo;t broken because it lacks ambition. It&rsquo;s broken because it lacks <strong className="text-[#141414]">architecture</strong>. Local institutions in a global age. Ivory towers in a flat world. Cost centres masquerading as public goods.
              </p>
            </motion.div>
          </motion.div>

          {/* ── B. Why Now ── */}
          <motion.div {...fadeUp(caseAnim.visible, 0.25)} className="mb-20 sm:mb-28">
            <h3 className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#8A0000] mb-4">Why Now</h3>
            <p className="text-[20px] sm:text-[24px] md:text-[28px] font-bold text-[#141414] leading-snug mb-10">
              Four forces converged. <span className="text-[#8A0000]">The window is open.</span>
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {[
                {
                  num: '01',
                  title: 'AI Killed the Old Curriculum',
                  text: 'When machines can write code, analyse data, draft legal briefs, and compose essays faster than any graduate, the university that certifies those skills alone is certifying obsolescence. The half-life of domain expertise has collapsed from decades to years. What remains valuable is not what you know but how fast you can learn what\'s next. The universities that survive will be the ones built for cognitive agility, not content delivery. The window to build one is open now — and closing.',
                  highlight: 'Cognitive agility > content delivery'
                },
                {
                  num: '02',
                  title: 'The Access Crisis Is Structural, Not Financial',
                  text: 'The anti-Ivy narrative says elite universities are too expensive. That\'s true but insufficient. The real problem is structural: the model itself requires exclusion. A single-campus institution serving 20,000 students in one city cannot serve 100,000 across 35 countries — no matter how much financial aid you throw at it. You cannot solve an architectural problem with a scholarship. The system doesn\'t just exclude by price. It excludes by geography, by language, by format, by the fundamental assumption that learning requires relocation to a single place.',
                  highlight: 'Architecture, not aid'
                },
                {
                  num: '03',
                  title: 'The Post-Labour Economy Demands Homo Eruditus',
                  text: 'The industrial economy needed homo economicus — the worker who trades time for wages in a stable career. The post-labour economy needs homo eruditus: the mind that learns, unlearns, and relearns across disciplines, across careers, across a lifetime. No existing university was designed to produce this species of human. They were built for a world where a degree lasted a lifetime. In a world where a degree lasts five years, the only lasting credential is the capacity to learn itself.',
                  highlight: 'Learn, unlearn, relearn'
                },
                {
                  num: '04',
                  title: 'Digital Infrastructure Finally Makes It Possible',
                  text: 'Five years ago, a global university with 50 physical colleges and digital-first infrastructure was a fantasy. Today, the tools exist: high-fidelity remote tutorial platforms, AI-assisted pedagogy, real-time cross-continental collaboration, and the proven viability of the Oxford collegiate model at distance. The technology didn\'t exist to do this properly before. It does now. The question is no longer "can it be done?" but "who will do it first?"',
                  highlight: 'Technology caught up with the vision'
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(caseAnim.visible, 0.35 + i * 0.1)}
                  className="relative border-t-2 border-[#8A0000] pt-6 sm:pt-8"
                >
                  <span className="text-[48px] sm:text-[64px] font-black text-[#8A0000]/10 leading-none absolute top-0 right-0">{item.num}</span>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-[#8A0000] mb-3 bg-[#8A0000]/5 px-3 py-1">{item.highlight}</span>
                  <h4 className="text-[16px] sm:text-[18px] font-black text-[#141414] mb-3">{item.title}</h4>
                  <p className="text-[14px] sm:text-[15px] text-gray-600 leading-[1.75]">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── C. Why Us — Visionary Points ── */}
          <motion.div {...fadeUp(caseAnim.visible, 0.3)} className="mb-20 sm:mb-28">
            {/* Thematic Statement */}
            <motion.div {...fadeUp(caseAnim.visible, 0.25)} className="mb-12 sm:mb-16">
              <p className="text-[20px] sm:text-[26px] md:text-[32px] font-light text-[#141414] leading-[1.5] tracking-tight">
                The last time the world needed a new kind of university, <span className="font-black text-[#8A0000]">Bologna was invented</span>. That was 1088. <span className="font-black">It is time again.</span>
              </p>
            </motion.div>

            <h3 className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#8A0000] mb-4">Why Us</h3>

            {/* Center Image — Architectural/Academic */}
            <motion.div {...fadeUp(caseAnim.visible, 0.28)} className="mb-10 relative overflow-hidden mx-auto max-w-[1400px]">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200"
                alt="Academic architecture — the intersection of tradition and innovation"
                className="w-full h-[200px] sm:h-[280px] md:h-[340px] object-cover grayscale border-l-4 border-[#8A0000]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 sm:gap-y-10">
              {[
                {
                  title: 'A New Species, Not a Renovation',
                  text: 'We didn\'t improve the university. We reimagined it from first principles. The difference between reforming an institution and inventing one is the difference between painting a house and laying a new foundation.',
                },
                {
                  title: 'Built for Homo Eruditus',
                  text: 'Every existing university produces homo economicus — the worker who trades time for wages. Artemis produces homo eruditus — the mind that learns, unlearns, and relearns across a lifetime. The species that will inherit the post-labour economy.',
                },
                {
                  title: '50 Places, Not One',
                  text: 'A campus is a point. A network is a continent. 50 Colleges across 35 countries means knowledge doesn\'t require relocation. Community still requires place. But not one place. Every place.',
                },
                {
                  title: 'Self-Sustaining From Day One',
                  text: '$262M annual surplus from Year 1. The founding campaign is the match. After that, the fire sustains itself. Your gift doesn\'t fund operations — it funds permanence.',
                },
                {
                  title: '$3,000 by Architecture, Not by Charity',
                  text: 'Affordability isn\'t a scholarship programme. It\'s an engineering decision. We didn\'t discount the price. We designed the price to be the mission.',
                },
                {
                  title: 'Consortium-Born Prestige',
                  text: 'Sciences Po. Bologna. Ca\' Foscari. UCT. London. We didn\'t build reputation from nothing. We carry the standards of the institutions that invented the university beyond their walls.',
                },
                {
                  title: 'Open by Default',
                  text: 'Research enters the public domain after seven years. Teaching shared across the Collegium. Knowledge locked behind paywalls serves no one. Closed systems don\'t just exclude people — they exclude progress itself.',
                },
                {
                  title: 'The University Every Other University Will Become',
                  text: 'Not because we compete with them. Because the forces that make Artemis necessary will eventually force every university in this direction. We\'re just first.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(caseAnim.visible, 0.35 + i * 0.06)}
                  className="border-l-2 border-[#8A0000] pl-5 sm:pl-6"
                >
                  <h4 className="text-[15px] sm:text-[17px] font-black text-[#141414] mb-2">{item.title}</h4>
                  <p className="text-[14px] sm:text-[15px] text-gray-600 leading-[1.75]">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── D. The First Principles ── */}
          <motion.div {...fadeUp(caseAnim.visible, 0.45)}>
            <h3 className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#8A0000] mb-4">The First Principles</h3>
            <p className="text-[20px] sm:text-[24px] md:text-[28px] font-bold text-[#141414] leading-snug mb-10">
              Our financial architecture isn&rsquo;t charity. It&rsquo;s <span className="text-[#8A0000]">engineering</span>.
            </p>

            {/* Financial Statement Table */}
            <motion.div {...fadeUp(caseAnim.visible, 0.55)} className="border border-gray-200 bg-white mb-8">
              <div className="grid grid-cols-3 gap-0 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 border-b border-gray-200 px-6 py-4">
                <span>Component</span>
                <span className="text-right">Value</span>
                <span className="text-right">Notes</span>
              </div>
              {[
                { component: 'Students at $3,000/yr', value: '100,000', note: '$300M annual revenue' },
                { component: 'Faculty (UN Model 3)', value: '2,000', note: 'Competitive, global-class pay' },
                { component: 'Operating Expenditure', value: '$37.89M', note: '12.4% of revenue' },
                { component: 'Annual Surplus', value: '$262M+', note: 'Reinvested — endowment, expansion, access' },
              ].map((row, i) => (
                <div key={i} className={`grid grid-cols-3 gap-0 px-6 py-5 ${i < 3 ? 'border-b border-gray-100' : 'bg-[#8A0000]/[0.03]'}`}>
                  <span className="text-[14px] sm:text-[15px] font-semibold text-[#141414]">{row.component}</span>
                  <span className="text-[14px] sm:text-[15px] font-black text-[#8A0000] text-right tabular-nums">{row.value}</span>
                  <span className="text-[13px] sm:text-[14px] text-gray-500 text-right">{row.note}</span>
                </div>
              ))}
            </motion.div>

            <motion.p {...fadeUp(caseAnim.visible, 0.6)} className="text-[15px] sm:text-[16px] text-gray-500 leading-[1.8] mb-6">
              This isn&rsquo;t a projection. It&rsquo;s arithmetic. The Oxford collegiate model, scaled globally, with digital-first infrastructure, produces a university that is self-sustaining from Year 1 — and generative forever after.
            </motion.p>
            <motion.p {...fadeUp(caseAnim.visible, 0.65)} className="text-[18px] sm:text-[20px] md:text-[22px] font-black text-[#141414] leading-snug">
              Every dollar given to the founding campaign doesn&rsquo;t plug a hole. It builds the foundation that makes the hole <span className="text-[#8A0000]">impossible</span>.
            </motion.p>

            <motion.button {...fadeUp(caseAnim.visible, 0.7)} onClick={() => document.getElementById('give')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center space-x-4 py-2 mt-10 border-b-2 border-[#8A0000] text-[#8A0000] text-[12px] font-bold uppercase tracking-[0.2em] hover:text-[#141414] hover:border-[#141414] transition-all group">
              <span>Support the Campaign</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </motion.div>

          </div>{/* End full-width content */}

        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. FIVE PILLARS — The Campaign Structure
          ══════════════════════════════════════════ */}
      <section id="pillars" className="scroll-mt-[110px] bg-gray-50 py-16 sm:py-24 lg:py-36">
        <div ref={pillarsAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* LEFT — Intro + dominating 82% stat */}
            <div className="lg:col-span-5">
              <motion.h2 {...slideLeft(pillarsAnim.visible)} className="text-[32px] sm:text-[44px] md:text-[56px] font-black leading-[0.92] tracking-tighter text-[#141414] mb-4">
                Five pillars
              </motion.h2>
              <motion.p {...fadeUp(pillarsAnim.visible, 0.15)} className="text-[16px] text-gray-600 max-w-md leading-relaxed mb-10 sm:mb-14">Every dollar of the $100M campaign falls into one of five pillars. Place dominates &mdash; because without rooms, there is no community.</motion.p>

              {/* Dominating 82% stat */}
              <motion.div {...scaleIn(pillarsAnim.visible, 0.25)} className="border-l-4 border-[#8A0000] pl-5 sm:pl-8 mb-10 sm:mb-14">
                <div className="text-[64px] sm:text-[96px] lg:text-[120px] font-black text-[#8A0000] leading-none tracking-tighter">82%</div>
                <div className="text-[14px] sm:text-[16px] font-bold text-[#141414] mt-2">of every dollar goes to Place</div>
                <p className="text-[13px] text-gray-500 mt-2 leading-relaxed">50 Colleges. 35 countries. Acquired and repurposed. Each one permanent. Each one owned.</p>
              </motion.div>

              {/* Campaign summary table */}
              <motion.div {...fadeUp(pillarsAnim.visible, 0.35)} className="bg-white">
                <div className="divide-y divide-gray-100">
                  {[
                    { label: 'Campaign Goal', value: `${sym}${fmtShort(CAMPAIGN.goal)}`, highlight: false },
                    { label: 'Raised to Date', value: `${sym}${fmtShort(CAMPAIGN.raised)}`, highlight: true },
                    { label: 'Remaining', value: `${sym}${fmtShort(CAMPAIGN.goal - CAMPAIGN.raised)}`, highlight: false },
                    { label: 'Founding Donors', value: fmtNum(CAMPAIGN.donors), highlight: false },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-4 sm:py-5 px-4 sm:px-6">
                      <span className="text-[11px] sm:text-[13px] font-bold text-gray-500 uppercase tracking-[0.15em]">{row.label}</span>
                      <span className={`text-[22px] sm:text-[28px] font-black leading-none ${row.highlight ? 'text-[#8A0000]' : 'text-[#141414]'}`}>{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="px-6 py-5 bg-gray-50">
                  <p className="text-[13px] text-gray-500 leading-relaxed">82% of all contributions go directly to property acquisition and repurposing.</p>
                  <button onClick={() => document.getElementById('give')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center space-x-3 mt-4 px-6 py-3 bg-[#8A0000] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#6B0000] transition-colors group">
                    <span>Contribute Now</span><ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* RIGHT — Pillar cards */}
            <div className="lg:col-span-7">
              <div className="space-y-4">
                {FIVE_PILLARS.map((p, i) => {
                  const Icon = p.icon;
                  const isExpanded = expandedPillar === p.id;
                  return (
                    <motion.div key={p.id} {...slideRight(pillarsAnim.visible, i * 0.1)} className="bg-white border border-gray-200 overflow-hidden">
                      <button
                        onClick={() => setExpandedPillar(isExpanded ? null : p.id)}
                        className="w-full text-left p-5 sm:p-6 lg:p-8 flex items-start gap-4 sm:gap-6 hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-[#8A0000]/10 shrink-0">
                          <Icon size={22} className="text-[#8A0000]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-3 mb-1">
                            <h4 className="text-[20px] sm:text-[24px] font-bold text-[#141414]">{p.title}</h4>
                            <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{p.subtitle}</span>
                          </div>
                          <div className="flex items-baseline gap-4 mb-3">
                            <span className="text-[28px] sm:text-[36px] font-black text-[#8A0000] leading-none">{p.pct}%</span>
                            <span className="text-[14px] sm:text-[16px] font-bold text-gray-400">{sym}{fmtShort(p.goal)}</span>
                          </div>
                          {/* Mini progress bar */}
                          <div className="h-2 bg-gray-100 w-full overflow-hidden">
                            <motion.div className="h-full bg-[#8A0000]" initial={{ width: 0 }} whileInView={{ width: `${p.pct}%` }} transition={{ duration: 1.2, delay: i * 0.1, ease: 'easeOut' }} viewport={{ once: true }} />
                          </div>
                        </div>
                        <ChevronDown size={18} className={`text-gray-400 shrink-0 mt-2 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 sm:px-6 lg:px-8 pb-6 sm:pb-8 border-t border-gray-100 pt-4 sm:pt-6">
                              <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed mb-4">{p.desc}</p>
                              <div className="p-4 bg-gray-50 border-l-2 border-[#8A0000]">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A0000] block mb-2">How it works</span>
                                <p className="text-[13px] text-gray-600 leading-relaxed">{p.details}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. TIMELINE — 4 Phases to Launch (Horizontal Slider)
          ══════════════════════════════════════════ */}
      <section id="phases" className="scroll-mt-[110px] py-16 sm:py-24 lg:py-36 bg-gray-50">
        <div ref={phasesAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          {/* Header */}
          <motion.div {...clipReveal(phasesAnim.visible)} className="mb-10 sm:mb-16">
            <h2 className="text-[32px] sm:text-[44px] md:text-[56px] font-black leading-[0.92] tracking-tighter text-[#141414] mb-4">
              4 phases to launch
            </h2>
            <p className="text-[16px] text-gray-600 leading-relaxed">From campaign to campus. Not just fundraising — a complete launch sequence. Each phase has concrete deliverables. Not aspirations — commitments.</p>
          </motion.div>

          {/* Horizontal Phase Slider */}
          <PhaseSlider />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. NAMING OPPORTUNITIES
          ══════════════════════════════════════════ */}
      <section id="opportunities" className="scroll-mt-[110px] bg-gray-50 py-16 sm:py-24 lg:py-36">
        <div ref={opportunitiesAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          {/* Intro */}
          <motion.h2 {...clipReveal(opportunitiesAnim.visible)} className="text-[32px] sm:text-[44px] md:text-[56px] font-black leading-[0.92] tracking-tighter text-[#141414] mb-4">
            Naming<br />opportunities
          </motion.h2>
          <motion.p {...fadeUp(opportunitiesAnim.visible, 0.15)} className="text-[15px] sm:text-[16px] text-gray-600 max-w-2xl leading-relaxed mb-4">Every gift at the naming level carries your name in perpetuity. Colleges, professorships, centers, programs, scholarships &mdash; each one a permanent mark on the university that reshapes civilisation.</motion.p>
          <motion.p {...fadeUp(opportunitiesAnim.visible, 0.2)} className="text-[13px] sm:text-[14px] text-gray-500 mb-10 sm:mb-16">Contact our advancement team at <a href="mailto:donate@artemisui.org" className="text-[#8A0000] font-bold hover:underline">donate@artemisui.org</a> to discuss naming opportunities.</motion.p>

          {/* Table-style layout */}
          <motion.div {...fadeUp(opportunitiesAnim.visible, 0.25)} className="mb-12 sm:mb-20">
            {/* Desktop table */}
            <div className="hidden md:block bg-white border border-gray-200 overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 bg-white">
                <div className="col-span-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Type</div>
                <div className="col-span-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Opportunity</div>
                <div className="col-span-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 text-right">Amount</div>
              </div>
              {/* Table rows */}
              {NAMING_OPPORTUNITIES.map((opp, i) => {
                const Icon = opp.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors group cursor-default items-center"
                  >
                    <div className="col-span-2 flex items-center gap-2">
                      <Icon size={14} className="text-[#8A0000]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000]">{opp.type}</span>
                    </div>
                    <div className="col-span-5">
                      <h4 className="text-[15px] font-bold text-[#141414] group-hover:text-[#8A0000] transition-colors">{opp.title}</h4>
                      <p className="text-[12px] text-gray-500 mt-0.5 leading-snug hidden lg:block">{opp.desc}</p>
                    </div>
                    <div className="col-span-5 text-right">
                      <div className="text-[20px] font-black text-[#8A0000] leading-none">{sym}{fmtShort(opp.amount)}</div>
                      <span className="text-[10px] text-gray-400">{opp.type === 'College' ? 'Per College' : opp.type === 'Central Node' ? 'Per Node' : opp.type === 'Endowment' ? 'Per Chair' : opp.type === 'Scholarship' ? '4-year fund' : 'Naming'}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {NAMING_OPPORTUNITIES.map((opp, i) => {
                const Icon = opp.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="bg-white border border-gray-200 p-4 hover:bg-gray-50 transition-colors group cursor-default"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={14} className="text-[#8A0000]" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#8A0000]">{opp.type}</span>
                    </div>
                    <h4 className="text-[15px] font-bold text-[#141414] mb-1">{opp.title}</h4>
                    <p className="text-[12px] text-gray-500 leading-snug mb-2">{opp.desc}</p>
                    <div className="flex items-baseline justify-between">
                      <div className="text-[20px] font-black text-[#8A0000] leading-none">{sym}{fmtShort(opp.amount)}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Donor Segments */}
          <motion.div {...clipReveal(opportunitiesAnim.visible)}>
            <h3 className="text-[24px] sm:text-[28px] font-bold text-[#141414] mb-6">How the campaign breaks down</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {DONOR_SEGMENTS.map((seg, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(opportunitiesAnim.visible, i * 0.1)}
                  className="bg-white border border-gray-200 p-5 sm:p-6"
                >
                  <div className="flex items-baseline justify-between mb-3">
                    <h4 className="text-[16px] font-bold text-[#141414]">{seg.segment}</h4>
                    <span className="text-[28px] font-black text-[#8A0000] leading-none">{seg.pct}%</span>
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-[12px] font-bold text-gray-500 uppercase tracking-widest">{seg.count}</span>
                    <span className="text-[14px] font-bold text-[#141414]">{seg.target}</span>
                  </div>
                  <div className="h-2 bg-gray-100 w-full overflow-hidden mb-3">
                    <motion.div className="h-full bg-[#8A0000]" initial={{ width: 0 }} whileInView={{ width: `${seg.pct}%` }} transition={{ duration: 1, delay: i * 0.15, ease: 'easeOut' }} viewport={{ once: true }} />
                  </div>
                  <p className="text-[12px] text-gray-500 leading-relaxed">{seg.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. GIVING CIRCLES
          ══════════════════════════════════════════ */}
      <section id="circles" className="scroll-mt-[110px] py-16 sm:py-24 lg:py-36">
        <div ref={circlesAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          {/* Tier legend horizontal bar */}
          <motion.div {...clipReveal(circlesAnim.visible)} className="mb-10 sm:mb-16">
            <h2 className="text-[32px] sm:text-[44px] md:text-[56px] font-black leading-[0.92] tracking-tighter text-[#141414] mb-6 sm:mb-8">Giving circles</h2>
            <div className="flex flex-wrap gap-6 lg:gap-12 pb-8 border-b border-gray-200">
              {GIVING_CIRCLES.map((t, i) => {
                const TIcon = t.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <TIcon size={18} style={{ color: t.color }} />
                    <div>
                      <div className="text-[13px] font-bold text-[#141414]">{t.name}</div>
                      <div className="text-[11px] text-gray-400">{t.range}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Giving Circles expandable cards */}
          <div className="space-y-4 mb-16 sm:mb-24">
            {GIVING_CIRCLES.map((gc, i) => {
              const GCIcon = gc.icon;
              const isExpanded = expandedCircle === gc.name;
              return (
                <motion.div key={gc.name} {...fadeUp(circlesAnim.visible, i * 0.08)} className="border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setExpandedCircle(isExpanded ? null : gc.name)}
                    className="w-full text-left p-5 sm:p-6 lg:p-8 flex items-center gap-4 sm:gap-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shrink-0" style={{ backgroundColor: gc.color + '15' }}>
                      <GCIcon size={22} style={{ color: gc.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[18px] sm:text-[22px] font-bold text-[#141414]">{gc.name}</h4>
                      <span className="text-[13px] text-gray-500">{gc.range}</span>
                    </div>
                    <ChevronDown size={18} className={`text-gray-400 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 lg:px-8 pb-6 sm:pb-8 border-t border-gray-100 pt-4 sm:pt-6">
                          <ul className="space-y-3">
                            {gc.benefits.map((b, j) => (
                              <li key={j} className="flex items-start gap-3">
                                <Check size={14} className="mt-0.5 shrink-0" style={{ color: gc.color }} />
                                <span className="text-[14px] text-gray-600 leading-relaxed">{b}</span>
                              </li>
                            ))}
                          </ul>
                          <button onClick={() => document.getElementById('give')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center space-x-3 mt-6 px-6 py-3 bg-[#8A0000] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors group">
                            <span>Join This Circle</span><ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Recent Donors Wall */}
          <div>
            <h3 className="text-[22px] sm:text-[28px] font-bold text-[#141414] mb-6 sm:mb-8">Recent donors</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {DONORS.map((d, i) => (
                <motion.div key={i} {...fadeUp(circlesAnim.visible, i * 0.03)} className="flex items-start gap-3 p-4 bg-gray-50 hover:bg-white hover:border-gray-300 border border-gray-100 transition-colors">
                  <div className="shrink-0 w-9 h-9 flex items-center justify-center text-[13px] font-bold" style={{ backgroundColor: TIER_COLORS[d.tier] + '15', color: TIER_COLORS[d.tier] }}>{d.name.charAt(0)}</div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-[#141414] truncate">{d.name}</span>
                      <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 shrink-0" style={{ color: TIER_COLORS[d.tier], backgroundColor: TIER_COLORS[d.tier] + '10' }}>{TIER_LABELS[d.tier]}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[12px] font-bold text-[#8A0000]">{sym}{fmtShort(d.amount)}</span>
                      <span className="text-[10px] text-gray-400">{d.date}</span>
                    </div>
                    {d.msg && <p className="text-[11px] text-gray-400 mt-1 italic truncate">&ldquo;{d.msg}&rdquo;</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. WAYS TO GIVE — Icon Grid
          ══════════════════════════════════════════ */}
      <section id="ways" className="scroll-mt-[110px] bg-gray-50 py-16 sm:py-24 lg:py-36">
        <div ref={waysAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <motion.h2 {...clipReveal(waysAnim.visible)} className="text-[32px] sm:text-[44px] md:text-[56px] font-black leading-[0.92] tracking-tighter text-[#141414] mb-8 sm:mb-12">
            Ways to give
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-200">
            {WAYS_TO_GIVE.map((w, i) => {
              const Icon = w.icon;
              return (
                <motion.div
                  key={i}
                  {...fadeUp(waysAnim.visible, i * 0.06)}
                  className={`p-5 sm:p-8 lg:p-10 hover:bg-gray-50 transition-colors group border-b border-gray-200 last:border-b-0 md:border-b-0 ${i % 2 === 1 ? 'md:border-l md:border-gray-200' : ''} ${i < WAYS_TO_GIVE.length - 2 ? 'md:border-b md:border-gray-200' : ''} ${i >= WAYS_TO_GIVE.length - 2 && i % 2 === 1 ? 'md:border-l md:border-gray-200' : ''}`}
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#8A0000]/10 shrink-0">
                      <Icon size={18} className="sm:hidden text-[#8A0000]" />
                      <Icon size={22} className="hidden sm:block text-[#8A0000]" />
                    </div>
                    <div>
                      <h4 className="text-[16px] sm:text-[18px] font-bold text-[#141414] mb-1 sm:mb-2 group-hover:text-[#8A0000] transition-colors">{w.title}</h4>
                      <p className="text-[13px] sm:text-[14px] text-gray-500 leading-relaxed">{w.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Contact CTA band */}
          <motion.div {...fadeUp(waysAnim.visible, 0.5)} className="mt-8 sm:mt-12 p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-3 text-center md:text-left">
              <Phone size={16} className="text-[#8A0000] shrink-0" />
              <span className="text-[13px] sm:text-[14px] text-gray-600">Questions about giving? Our advancement team is here to help.</span>
            </div>
            <a href="mailto:donate@artemisui.org" className="flex items-center space-x-3 px-6 py-2.5 border-2 border-[#8A0000] text-[#8A0000] text-[10px] font-bold uppercase tracking-widest hover:bg-[#8A0000] hover:text-white transition-colors group shrink-0">
              <span>donate@artemisui.org</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. GIVE NOW — Redesigned Premium Card
          ══════════════════════════════════════════ */}
      <section id="give" className="scroll-mt-[110px]">
        <div className="max-w-[1600px] mx-auto bg-[#FAFAF8] py-16 sm:py-24 lg:py-32">
        <div ref={giveAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <motion.div {...clipReveal(giveAnim.visible)} className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8A0000]">Join the Founding</span>
          </motion.div>
          <motion.h2 {...fadeUp(giveAnim.visible, 0.05)} className="text-[32px] sm:text-[44px] md:text-[56px] font-black leading-[0.92] tracking-tighter text-[#141414] mb-4">
            Give now
          </motion.h2>
          <motion.p {...fadeUp(giveAnim.visible, 0.1)} className="text-[14px] sm:text-[16px] text-gray-600 max-w-2xl leading-relaxed mb-10 sm:mb-14">Choose your amount, select your payment method, and join the founding. For major gifts and naming opportunities, contact <a href="mailto:donate@artemisui.org" className="text-[#8A0000] font-bold hover:underline">donate@artemisui.org</a>.</motion.p>

          {/* Modern split layout: sticky impact panel + form */}
          <motion.div {...fadeUp(giveAnim.visible, 0.15)} className="grid lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left: sticky impact summary */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24 rounded-2xl bg-[#0c0a09] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute -top-1/3 -right-1/4 w-[300px] h-[300px] rounded-full bg-[#8A0000]/30 blur-[80px]"></div>
                </div>
                <div className="relative p-8 sm:p-10">
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#ff6b6b] mb-6">Your Impact</div>
                  {effectiveAmount > 0 ? (
                    <>
                      <div className="mb-6">
                        <span className="text-[48px] sm:text-[56px] font-black text-white leading-none tracking-tighter">
                          {sym}{effectiveAmount.toLocaleString()}
                        </span>
                        {isRecurring && (
                          <span className="text-[13px] text-[#ff6b6b] font-bold ml-3">{recurringFreq} &middot; {sym}{fmtShort(effectiveAmount * (recurringFreq === 'monthly' ? 12 : recurringFreq === 'quarterly' ? 4 : 1))}/yr</span>
                        )}
                      </div>
                      {(() => {
                        const circle = getGivingCircle(effectiveAmount);
                        if (!circle) return null;
                        const CircleIcon = circle.icon;
                        return (
                          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                            <CircleIcon size={20} style={{ color: circle.color }} />
                            <span className="text-[16px] font-black text-white">{circle.name}</span>
                            <span className="text-[12px] text-white/40">&mdash; {circle.range}</span>
                          </div>
                        );
                      })()}
                      <p className="text-[18px] sm:text-[20px] font-bold text-white/90 leading-snug mb-8">
                        {getImpactText(effectiveAmount)}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/[0.05] rounded-lg p-4">
                          <div className="text-[20px] font-black text-[#ff6b6b]">{fmtShort(effectiveAmount)}</div>
                          <div className="text-[9px] font-bold uppercase tracking-widest text-white/40 mt-1">Your Gift</div>
                        </div>
                        <div className="bg-white/[0.05] rounded-lg p-4">
                          <div className="text-[20px] font-black text-[#ff6b6b]">{isRecurring ? 'Recurring' : 'One-time'}</div>
                          <div className="text-[9px] font-bold uppercase tracking-widest text-white/40 mt-1">Frequency</div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-[18px] text-white/30 italic py-8">Select an amount to see your impact</p>
                  )}
                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2">
                    <Lock size={11} className="text-white/30" />
                    <span className="text-[10px] text-white/30">Secure payment — redirected to complete your donation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: form steps */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1: Amount */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-7 h-7 rounded-full bg-[#8A0000] text-white text-[12px] font-bold flex items-center justify-center">1</span>
                  <h3 className="text-[15px] font-bold text-[#141414]">Select your amount</h3>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                  {PRESETS.map(amt => (
                    <button key={amt} onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }} className={`py-4 text-[15px] sm:text-[16px] font-black border-2 rounded-lg transition-all duration-200 ${selectedAmount === amt ? 'bg-[#8A0000] text-white border-[#8A0000] shadow-md shadow-[#8A0000]/20' : 'bg-white text-gray-700 border-gray-200 hover:border-[#8A0000] hover:text-[#8A0000]'}`}>
                      {sym}{fmtShort(amt)}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[16px] font-bold text-gray-300">{sym}</span>
                  <input type="number" value={customAmount} onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }} placeholder="Custom amount" className="w-full pl-8 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 focus:border-[#8A0000] focus:outline-none focus:bg-white text-[16px] font-bold text-[#141414] placeholder:text-gray-300 placeholder:font-normal transition-all rounded-lg" />
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Repeat size={15} className="text-[#8A0000]" />
                      <span className="text-[13px] font-bold text-[#141414]">Make it recurring</span>
                    </div>
                    <button onClick={() => setIsRecurring(!isRecurring)} className={`w-11 h-5 rounded-full transition-colors relative ${isRecurring ? 'bg-[#8A0000]' : 'bg-gray-300'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${isRecurring ? 'left-[24px]' : 'left-0.5'}`} />
                    </button>
                  </div>
                  {isRecurring && (
                    <div className="flex gap-2 mt-3">
                      {['monthly', 'quarterly', 'annual'].map(f => (
                        <button key={f} onClick={() => setRecurringFreq(f)} className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest border-2 rounded-lg transition-all ${recurringFreq === f ? 'bg-[#8A0000] text-white border-[#8A0000]' : 'bg-white text-gray-500 border-gray-200 hover:border-[#8A0000]'}`}>{f}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Step 2: Payment Method */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-7 h-7 rounded-full bg-[#8A0000] text-white text-[12px] font-bold flex items-center justify-center">2</span>
                  <h3 className="text-[15px] font-bold text-[#141414]">Payment method</h3>
                </div>
                <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-4">
                  {[
                    { key: 'card' as const, icon: CreditCard, label: 'Card' },
                    { key: 'bank' as const, icon: Banknote, label: 'Bank' },
                    { key: 'crypto' as const, icon: Bitcoin, label: 'Crypto' },
                    { key: 'paypal' as const, icon: Wallet, label: 'PayPal' },
                  ].map(m => (
                    <button key={m.key} onClick={() => setPaymentMethod(m.key)} className={`flex flex-col items-center gap-2 py-4 border-2 rounded-lg transition-all duration-200 ${paymentMethod === m.key ? 'bg-[#8A0000] border-[#8A0000] text-white shadow-md shadow-[#8A0000]/20' : 'bg-white border-gray-200 text-gray-400 hover:border-[#8A0000] hover:text-[#8A0000]'}`}>
                      <m.icon size={20} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">{m.label}</span>
                    </button>
                  ))}
                </div>

                {paymentMethod === 'crypto' && (
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-3 mb-3"><Bitcoin size={16} className="text-[#8A0000]" /><span className="text-[13px] font-bold text-[#141414]">Cryptocurrency</span></div>
                    <div className="flex gap-2 mb-3">
                      {(['BTC', 'ETH'] as const).map(coin => (
                        <button key={coin} onClick={() => setCryptoCoin(coin)} className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest border-2 rounded-lg transition-all ${cryptoCoin === coin ? 'bg-[#8A0000] text-white border-[#8A0000]' : 'bg-white text-gray-500 border-gray-200'}`}>{coin}</button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-[11px] text-gray-600 bg-white px-3 py-2 flex-1 break-all font-mono border border-gray-100 rounded">{CRYPTO[cryptoCoin]}</code>
                      <button onClick={() => navigator.clipboard?.writeText(CRYPTO[cryptoCoin])} className="px-3 py-2 bg-gray-100 text-gray-600 text-[9px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors rounded">Copy</button>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-2">After sending, email crypto@artemisui.org with your transaction hash.</p>
                  </div>
                )}

                {paymentMethod === 'bank' && (
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-3 mb-3"><Banknote size={16} className="text-[#8A0000]" /><span className="text-[13px] font-bold text-[#141414]">Bank Transfer</span></div>
                    <div className="space-y-0">
                      {[['Account', 'Artemis University Founding Fund'],['Sort Code', '20-45-78'],['Account No', '73128945'],['IBAN', 'GB29 BARC 2045 7873 1289 45'],['Reference', 'ARTEMIS-FOUNDING']].map(([label, value], i) => (
                        <div key={i} className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0">
                          <span className="text-[11px] text-gray-500">{label}</span>
                          <div className="flex items-center gap-2">
                            <code className="text-[11px] font-bold text-[#141414] font-mono">{value}</code>
                            <button onClick={() => navigator.clipboard?.writeText(value)} className="text-[9px] text-[#8A0000] font-bold uppercase tracking-widest hover:underline">Copy</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Step 3: Your Details */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-7 h-7 rounded-full bg-[#8A0000] text-white text-[12px] font-bold flex items-center justify-center">3</span>
                  <h3 className="text-[15px] font-bold text-[#141414]">Your details</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] mb-2">Name</label>
                    <input type="text" value={donorName} onChange={(e) => setDonorName(e.target.value)} disabled={isAnonymous} placeholder={isAnonymous ? 'Anonymous' : 'Your name'} className={`w-full border border-gray-200 bg-gray-50 px-4 py-3 text-[14px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A0000]/20 focus:border-[#8A0000] focus:bg-white transition-all rounded-lg ${isAnonymous ? 'opacity-40' : ''}`} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] mb-2">Email *</label>
                    <input type="email" value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} placeholder="you@email.com" className="w-full border border-gray-200 bg-gray-50 px-4 py-3 text-[14px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A0000]/20 focus:border-[#8A0000] focus:bg-white transition-all rounded-lg" />
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <button onClick={() => setIsAnonymous(!isAnonymous)} className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${isAnonymous ? 'bg-[#8A0000] border-[#8A0000]' : 'bg-white border-gray-300'}`}>
                    {isAnonymous && <Check size={12} className="text-white" />}
                  </button>
                  <span className="text-[13px] text-gray-600">Give anonymously</span>
                </div>
                <div className="mt-4">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] mb-2">Message (optional)</label>
                  <textarea value={donorMessage} onChange={(e) => setDonorMessage(e.target.value)} placeholder="Why you're supporting Artemis..." rows={2} className="w-full border border-gray-200 bg-gray-50 px-4 py-3 text-[14px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A0000]/20 focus:border-[#8A0000] focus:bg-white transition-all resize-none rounded-lg" />
                </div>
              </div>

              {/* Submit */}
              <motion.button
                onClick={handleDonate}
                disabled={submitting || !donorEmail || effectiveAmount <= 0}
                whileHover={!submitting && donorEmail && effectiveAmount > 0 ? { scale: 1.01 } : {}}
                whileTap={!submitting && donorEmail && effectiveAmount > 0 ? { scale: 0.99 } : {}}
                className={`w-full py-5 rounded-xl text-[15px] font-black uppercase tracking-[0.25em] flex items-center justify-center gap-4 transition-all duration-200 ${submitting || !donorEmail || effectiveAmount <= 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#8A0000] text-white hover:bg-[#6B0000] shadow-xl shadow-[#8A0000]/25'}`}
              >
                {submitting ? 'Processing...' : 'Give Now'} {!submitting && <ArrowRight size={20} />}
              </motion.button>
            </div>
          </motion.div>

          <AnimatePresence>
            {donationResult && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-8 p-8 border-2 ${donationResult.success ? 'bg-emerald-50 border-emerald-300' : 'bg-red-50 border-red-300'}`}>
                <span className={`text-[16px] font-bold block mb-2 ${donationResult.success ? 'text-emerald-700' : 'text-red-700'}`}>{donationResult.success ? 'Thank you for your generosity.' : 'Donation failed.'}</span>
                <p className={`text-[14px] ${donationResult.success ? 'text-emerald-600' : 'text-red-600'}`}>{donationResult.message}</p>
                {donationResult.success && <button onClick={() => { setDonationResult(null); setSelectedAmount(null); setCustomAmount(''); setDonorName(''); setDonorEmail(''); setDonorMessage(''); setSelectedPerk(null); }} className="mt-4 text-[11px] font-bold uppercase tracking-widest text-[#8A0000] border-b border-[#8A0000] pb-1 hover:text-[#141414] hover:border-[#141414] transition-colors">Make another contribution</button>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          THE ASK
          ══════════════════════════════════════════ */}
      <section id="ask" className="scroll-mt-[110px] bg-white py-16 sm:py-24 lg:py-36">
        <div ref={askAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <motion.div {...fadeUp(askAnim.visible)} className="bg-[#8A0000] p-8 sm:p-12 lg:p-20 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 block mb-6">The Ask</span>
            <h2 className="text-[36px] sm:text-[52px] md:text-[72px] lg:text-[88px] font-black leading-[0.9] tracking-tighter text-white mb-6">
              $100 million.<br />12 months.<br />For Civilization.
            </h2>
            <p className="text-[16px] sm:text-[18px] text-white/70 leading-relaxed max-w-2xl mx-auto mb-8">
              This is the founding campaign. Not an annual fund. Not a capital drive. The zero-to-one moment — the moment a university that should have existed for centuries finally does.
            </p>
            <p className="text-[15px] sm:text-[17px] text-white/80 leading-relaxed max-w-2xl mx-auto mb-10">
              After this, Artemis is self-sustaining. Forever. Every student who walks through our doors, every paper our faculty publishes, every community our Colleges anchor — all of it funded by the model itself.
            </p>
            <div className="border-t border-white/20 pt-8 max-w-xl mx-auto">
              <p className="text-[20px] sm:text-[24px] md:text-[28px] font-black text-white tracking-tight leading-tight">
                You&apos;re not giving to a university.<br />You&apos;re founding one.
              </p>
            </div>
            <div className="mt-10">
              <button onClick={() => document.getElementById('give')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center space-x-3 px-10 py-5 bg-white text-[#8A0000] text-[12px] font-bold uppercase tracking-[0.25em] hover:bg-gray-100 transition-colors group">
                <span>Give Now</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          10. BEYOND THE FOUNDING
          ══════════════════════════════════════════ */}
      <section id="beyond" className="scroll-mt-[110px] py-16 sm:py-24 lg:py-36">
        <div ref={beyondAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <motion.h2 {...clipReveal(beyondAnim.visible)} className="text-[32px] sm:text-[44px] md:text-[56px] font-black leading-[0.92] tracking-tighter text-[#141414] mb-4">
            Beyond the founding
          </motion.h2>
          <motion.p {...fadeUp(beyondAnim.visible, 0.1)} className="text-[15px] sm:text-[16px] text-gray-600 max-w-2xl leading-relaxed mb-10 sm:mb-16">When the $100M is raised and 100,000 students walk through the doors of 50 Colleges, the founding campaign ends. But the university is just beginning. The match lights the fuel. The fire sustains itself.</motion.p>

          {/* Elevator Pitch */}
          <motion.div {...scaleIn(beyondAnim.visible, 0.15)} className="bg-[#8A0000] p-6 sm:p-10 lg:p-14 mb-12 sm:mb-20">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 block mb-4">The Elevator Pitch</span>
            <p className="text-[16px] sm:text-[20px] md:text-[24px] font-light text-white leading-[1.6] mb-6">
              200 million people qualified for university who will never attend. Artemis enrolls 100,000 students at $3,000/year across 50 Colleges in 35 countries. After Year 1, the university generates $262M annual surplus &mdash; funding 13,300 scholarships, building $60M/year endowment, and operating at 12.4% cost ratio.
            </p>
            <p className="text-[14px] sm:text-[16px] text-white/70 font-bold uppercase tracking-[0.15em]">The $100M founding campaign is the match. Tuition is the fuel. The fire sustains itself.</p>
          </motion.div>

          {/* Four phase cards with images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-24">
            {[
              { phase: 'Phase I', title: 'The Founding', period: '2025 \u2014 2028', goal: sym + '100M', desc: 'The founding campaign. 50 Colleges acquired. 2,000 faculty hired. 100,000 students enrolled. The match that lights the fuel. Your gift is the spark that makes everything else self-sustaining.', icon: Rocket, img: 'https://images.unsplash.com/photo-1594750852563-5ed8e0421d40?auto=format&fit=crop&q=80&w=600' },
              { phase: 'Phase II', title: 'The Expansion', period: '2028 \u2014 2033', goal: 'Surplus', desc: 'After Year 1, $262M annual surplus self-funds expansion. New Colleges acquired from surplus. Scholarships scaled to 13,300/year. Endowment growing at $60M/year. No further campaign needed.', icon: Globe, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600' },
              { phase: 'Phase III', title: 'The Network', period: '2033 \u2014 2040', goal: 'Endowment', desc: 'The endowment reaches self-sustaining levels. Artemis operates independently of any single funding source. 100+ Colleges. Research endowment in perpetuity. A planetary university that renews itself with each generation.', icon: Landmark, img: 'https://images.unsplash.com/photo-1739298061766-e2751d92e9db?auto=format&fit=crop&q=80&w=600' },
              { phase: 'Phase IV', title: 'The Perpetuity', period: '2040 \u2014 Beyond', goal: 'Perpetual', desc: 'Artemis operates in perpetuity, independent of tuition dependency, government funding, or commercial pressure. A global scholarly commons that endures for centuries. The founding campaign becomes the Artemis Foundation.', icon: Building2, img: 'https://images.unsplash.com/photo-1624555130296-e551faf8969b?auto=format&fit=crop&q=80&w=600' },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={i} {...scaleIn(beyondAnim.visible, i * 0.12)} className="bg-white border border-gray-200 overflow-hidden hover:border-[#8A0000]/30 transition-colors group">
                  <div className="relative h-[160px] sm:h-[200px] overflow-hidden">
                    <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 flex items-end justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A0000] block mb-1">{p.phase}</span>
                        <h4 className="text-[18px] sm:text-[22px] font-bold text-white">{p.title}</h4>
                      </div>
                      <div className="text-right">
                        <div className="text-[16px] sm:text-[20px] font-black text-white leading-none">{p.goal}</div>
                        <div className="text-[9px] font-bold uppercase tracking-widest text-white/50">{p.period}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 lg:p-8">
                    <Icon size={22} className="text-[#8A0000] mb-3" />
                    <p className="text-[14px] text-gray-600 leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Voices from the Future */}
          <div className="mb-12 sm:mb-24">
            <div className="relative flex items-center mb-8 sm:mb-14">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Voices from the Future</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
              {[
                { quote: "I was the first in my village to attend university \u2014 and the first to attend one that didn't care about my village's wealth. Artemis saw my mind, not my postcode. The scholarship that brought me here was funded by someone I will never meet, but whose name I carry in my thesis dedication.", name: 'Amara Osei', role: 'Inaugural Cohort, Weavers Commons', loc: 'Accra \u2192 Geneva' },
                { quote: "I donated because I remember being seventeen and brilliant and broke. I remember the university that let me in anyway \u2014 and how that changed everything. Artemis is that chance, scaled to the planet. I couldn't not give.", name: 'Dr. Elena Vasquez', role: "Founders' Circle, Founding Donor", loc: 'Mexico City' },
              ].map((v, i) => (
                <motion.div key={i} {...fadeUp(beyondAnim.visible, i * 0.15)}>
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#8A0000] opacity-20 mb-4 sm:mb-6" viewBox="0 0 24 24" fill="currentColor"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/></svg>
                  <p className="text-[15px] sm:text-[17px] md:text-[19px] text-gray-700 leading-relaxed mb-5 sm:mb-8 font-light italic">{v.quote}</p>
                  <div className="text-[13px] sm:text-[14px] font-bold text-[#141414]">{v.name}</div>
                  <div className="text-[11px] sm:text-[12px] text-gray-500">{v.role} &mdash; {v.loc}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact — 3-column layout + inline form */}
          <motion.div {...fadeUp(beyondAnim.visible, 0.3)}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-5">
                <h3 className="text-[22px] sm:text-[28px] font-bold text-[#141414] mb-3 sm:mb-4">Talk to our advancement team</h3>
                <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed mb-6 sm:mb-8">Whether you are considering a major gift, exploring naming opportunities, or want to discuss how your contribution can have the greatest impact &mdash; our advancement team is here to help.</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-[#8A0000] mb-2">Email</div>
                    <a href="mailto:donate@artemisui.org" className="text-[14px] font-bold text-[#141414] hover:text-[#8A0000] transition-colors">donate@artemisui.org</a>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-[#8A0000] mb-2">Phone</div>
                    <p className="text-[14px] font-bold text-[#141414]">+44 (0) 20 7946 0958</p>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-[#8A0000] mb-2">Post</div>
                    <p className="text-[13px] text-gray-600 leading-snug">Advancement Office<br />Rue de Lausanne 47<br />1201 Geneva, CH</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="bg-white border border-gray-200 p-5 sm:p-8">
                  <h4 className="text-[14px] font-bold text-[#141414] mb-5">Send us a message</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-[0.15em] mb-2">Your Name *</label>
                      <input type="text" placeholder="Full name" value={contactName} onChange={e => setContactName(e.target.value)} className="w-full border border-gray-300 bg-white px-4 py-3 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A0000]/30 focus:border-[#8A0000] transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-[0.15em] mb-2">Email *</label>
                      <input type="email" placeholder="you@email.com" value={contactEmail} onChange={e => setContactEmail(e.target.value)} className="w-full border border-gray-300 bg-white px-4 py-3 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A0000]/30 focus:border-[#8A0000] transition-all" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-[0.15em] mb-2">Area of Interest</label>
                    <select value={contactArea} onChange={e => setContactArea(e.target.value)} className="w-full border border-gray-300 bg-white px-4 py-3 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A0000]/30 focus:border-[#8A0000] transition-all">
                      <option>General enquiry</option>
                      <option>Naming opportunities</option>
                      <option>Planned giving / Estate plans</option>
                      <option>Securities / Stock transfer</option>
                      <option>Employer matching</option>
                      <option>Donor-advised fund</option>
                      <option>Cryptocurrency</option>
                      <option>In-kind contributions</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="mt-4">
                    <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-[0.15em] mb-2">Message</label>
                    <textarea rows={3} placeholder="Tell us about your philanthropic goals..." value={contactMessage} onChange={e => setContactMessage(e.target.value)} className="w-full border border-gray-300 bg-white px-4 py-3 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A0000]/30 focus:border-[#8A0000] transition-all resize-none" />
                  </div>
                  {contactResult && (
                    <div className={`mt-4 p-3 text-[13px] font-medium ${contactResult.success ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
                      {contactResult.message}
                    </div>
                  )}
                  <button onClick={handleContactSubmit} disabled={contactSubmitting} className="mt-4 w-full py-3 bg-[#8A0000] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    {contactSubmitting ? 'Sending...' : 'Send Enquiry'} <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ACCOUNTABILITY — Legal Architecture
          ══════════════════════════════════════════ */}
      <section id="accountability" className="scroll-mt-[110px] py-16 sm:py-24 lg:py-36 bg-gray-50 border-t border-gray-100">
        <div ref={accountabilityAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          {/* Section Header */}
          <motion.div {...fadeUp(accountabilityAnim.visible)}>
            <div className="mb-6 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Accountability</span>
            </div>
            <h2 className="text-[28px] sm:text-[40px] md:text-[52px] lg:text-[56px] font-black leading-[1] tracking-tighter text-[#141414] mb-4">
              Built to endure.<br />Structured to last.
            </h2>
            <p className="text-[15px] sm:text-[17px] text-gray-600 max-w-2xl leading-relaxed mb-12 sm:mb-16">
              Here is the legal architecture behind the founding.
            </p>
          </motion.div>

          {/* Three legal entity cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-gray-200 mb-12 sm:mb-16">
            {LEGAL_ENTITIES.map((entity, i) => {
              const Icon = entity.icon;
              return (
                <motion.div
                  key={i}
                  {...fadeUp(accountabilityAnim.visible, i * 0.1)}
                  className={`bg-white ${i > 0 ? 'border-t lg:border-t-0 lg:border-l border-gray-200' : ''}`}
                >
                  <div className="p-6 sm:p-8">
                    {/* Tier badge + status */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[9px] font-black uppercase tracking-[0.25em] px-2.5 py-1 text-white" style={{ backgroundColor: entity.color }}>{entity.tier}</span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{entity.status}</span>
                    </div>

                    {/* Jurisdiction + entity type */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ backgroundColor: entity.color }}>
                        <Icon size={18} className="text-white" />
                      </div>
                      <div>
                        <h4 className="text-[15px] sm:text-[17px] font-black text-[#141414] leading-tight">{entity.jurisdiction}</h4>
                        <p className="text-[12px] text-gray-500 mt-0.5">{entity.name}</p>
                      </div>
                    </div>

                    {/* Classification */}
                    <div className="bg-gray-50 border border-gray-100 p-3 mb-5">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8A0000] block mb-1">Classification</span>
                      <p className="text-[12px] sm:text-[13px] font-semibold text-[#141414]">{entity.classification}</p>
                    </div>

                    {/* Key Benefit */}
                    <div className="mb-5">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-2">Key Benefit</span>
                      <p className="text-[13px] sm:text-[14px] text-gray-600 leading-[1.7]">{entity.keyBenefit}</p>
                    </div>

                    {/* Structure */}
                    <div className="border-t border-gray-100 pt-4">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-3">Structure</span>
                      <ul className="space-y-2">
                        {entity.structure.map((item, j) => (
                          <li key={j} className="flex items-start gap-2.5">
                            <Check size={12} className="mt-1 shrink-0" style={{ color: entity.color }} />
                            <span className="text-[12px] sm:text-[13px] text-gray-600 leading-[1.5]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Interim Fiscal Sponsorship */}
          <motion.div {...fadeUp(accountabilityAnim.visible, 0.3)} className="bg-white border border-gray-200 p-6 sm:p-8 lg:p-10 mb-12 sm:mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <span className="text-[9px] font-black uppercase tracking-[0.25em] px-2.5 py-1 bg-[#8A0000]/10 text-[#8A0000] inline-block mb-4">Interim Fiscal Sponsorship</span>
                <h3 className="text-[20px] sm:text-[24px] font-black text-[#141414] leading-tight mb-4">
                  Fully tax-deductible from Day 1
                </h3>
                <p className="text-[14px] sm:text-[15px] text-gray-600 leading-[1.75]">
                  From Day 1 through 501(c)(3) approval, a recognised fiscal sponsor receives and disburses all donations on Artemis\'s behalf. This means every gift is fully tax-deductible immediately — no waiting for the IRS. Once the determination letter is issued, all prior donations are treated as if they were made directly to Artemis.
                </p>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-4">Covered by</span>
                <div className="space-y-0">
                  {FISCAL_SPONSORS.map((sponsor, i) => (
                    <div key={i} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-b-0">
                      <div className="w-8 h-8 flex items-center justify-center bg-[#8A0000]/5 shrink-0">
                        <Shield size={14} className="text-[#8A0000]" />
                      </div>
                      <span className="text-[14px] sm:text-[15px] font-bold text-[#141414]">{sponsor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Three accountability guarantees */}
          <motion.div {...fadeUp(accountabilityAnim.visible, 0.4)}>
            <div className="relative flex items-center mb-10 sm:mb-14">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Guarantees</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200">
              {ACCOUNTABILITY_GUARANTEES.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className={`p-6 sm:p-8 bg-white ${i > 0 ? 'border-t md:border-t-0 md:border-l border-gray-200' : ''}`}>
                    <div className="w-10 h-10 flex items-center justify-center bg-[#8A0000]/5 border border-[#8A0000]/10 mb-4">
                      <Icon size={18} className="text-[#8A0000]" />
                    </div>
                    <h4 className="text-[16px] sm:text-[18px] font-black text-[#141414] mb-2">{item.title}</h4>
                    <p className="text-[13px] sm:text-[14px] text-gray-600 leading-[1.7]">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          RESOURCES — Downloadable Documents
          ══════════════════════════════════════════ */}
      <section id="resources" className="scroll-mt-[110px]">
        <div className="max-w-[1600px] mx-auto py-16 sm:py-24 lg:py-32 bg-[#0c0a09] border-t border-[#8A0000]/20">
        <div ref={resourcesAnim.ref} className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <motion.div {...clipReveal(resourcesAnim.visible)} className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8A0000]">Library</span>
          </motion.div>
          <motion.h2 {...fadeUp(resourcesAnim.visible, 0.05)} className="text-[32px] sm:text-[44px] md:text-[56px] font-black leading-[0.92] tracking-tighter text-white mb-4">
            Resources
          </motion.h2>
          <motion.p {...fadeUp(resourcesAnim.visible, 0.1)} className="text-[16px] text-white/50 max-w-2xl leading-relaxed mb-10 sm:mb-14">
            Everything you need to evaluate, share, and decide. Download, print, or forward to your advisors.
          </motion.p>

          {/* ─── Featured: The Founding Manifesto ─── */}
          {(() => {
            const manifesto = RESOURCES.find(r => r.id === 'manifesto');
            if (!manifesto) return null;
            const MIcon = manifesto.icon;
            return (
              <motion.a
                href={manifesto.file}
                download
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative block mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#8A0000]/30 via-[#0c0a09] to-[#0c0a09] border border-[#8A0000]/30 hover:border-[#8A0000]/60 transition-all"
              >
                <div className="absolute -top-1/4 -right-1/4 w-[40vw] h-[40vw] rounded-full bg-[#8A0000]/20 blur-[100px] group-hover:bg-[#8A0000]/30 transition-colors"></div>
                <div className="relative grid lg:grid-cols-12 gap-6 p-8 sm:p-10 lg:p-12 items-center">
                  <div className="lg:col-span-8">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8A0000]/20 border border-[#8A0000]/40">
                        <MIcon size={12} className="text-[#ff6b6b]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff6b6b]">Master Document</span>
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">{manifesto.pages} pages · Landscape</span>
                    </div>
                    <h3 className="text-[28px] sm:text-[36px] lg:text-[44px] font-black tracking-tight text-white mb-3 leading-[1.05]">
                      {manifesto.title}
                    </h3>
                    <p className="text-[14px] sm:text-[15px] text-white/55 leading-relaxed max-w-xl mb-6">
                      {manifesto.desc}
                    </p>
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#8A0000] group-hover:bg-[#6B0000] transition-colors text-white text-[12px] font-bold uppercase tracking-[0.2em]">
                      <Download size={15} />
                      Download Manifesto
                    </div>
                  </div>
                  <div className="lg:col-span-4 hidden lg:flex justify-end">
                    <div className="relative w-[200px] h-[140px] rounded-lg overflow-hidden shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                      <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600" alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#8A0000]/80 via-[#0c0a09]/40 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#ff6b6b] mb-1">Vol. I · MMXXV</div>
                        <div className="text-[13px] font-black text-white leading-tight">The Artemis Manifesto</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })()}

          {/* ─── Category Group: Strategy & Campaign ─── */}
          <ResourceGroup
            label="Strategy & Campaign"
            items={RESOURCES.filter(r => ['founding-prospectus','campaign-overview','case-for-support','strategic-plan'].includes(r.id))}
            animVisible={resourcesAnim.visible}
          />

          {/* ─── Category Group: Financial & Legal ─── */}
          <ResourceGroup
            label="Financial & Legal"
            items={RESOURCES.filter(r => ['financial-model','tax-guide','legal-entities','giving-circles','naming-booklet'].includes(r.id))}
            animVisible={resourcesAnim.visible}
          />

          {/* ─── Category Group: Campus & Academic ─── */}
          <ResourceGroup
            label="Campus & Academic"
            items={RESOURCES.filter(r => ['campus-plan','alliance-map','academic-prospectus','research-portfolio'].includes(r.id))}
            animVisible={resourcesAnim.visible}
          />
        </div>
        </div>
      </section>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
