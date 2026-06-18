'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import {
  ArrowRight, ArrowUpRight, Check, Heart, Sparkles, Shield, Crown,
  Building2, Users, GraduationCap, Star, Rocket, Landmark, Lock,
  Globe, FlaskConical, BookOpen, HandCoins, ChevronDown, Quote,
} from 'lucide-react';

interface Props {
  goToPage: (page: string) => void;
}

/* ─── Campaign data (remixed from FundraisingCampaign) ─── */
const CAMPAIGN = { goal: 100_000_000, raised: 2_100_000, donors: 342, currency: 'USD' };
const fmtNum = (n: number) => n.toLocaleString('en-US');
const fmtShort = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M` :
  n >= 1_000 ? `$${(n / 1_000).toFixed(0)}K` : `$${fmtNum(n)}`;
const pct = Math.min(100, Math.round((CAMPAIGN.raised / CAMPAIGN.goal) * 100));

const PRESETS = [99, 250, 1000, 5000, 25000];

const PILLARS = [
  { id: 'place', title: 'Place', subtitle: 'The 50 Colleges', goal: 82_000_000, share: 82, icon: Building2,
    desc: 'Repurposed convents, warehouses, factories — each acquired, owned, permanent. Community requires co-location.',
    detail: 'Properties are 82¢ of every dollar raised. Named gifts are endowments; the property is the asset.' },
  { id: 'minds', title: 'Minds', subtitle: 'Faculty Launch', goal: 7_000_000, share: 7, icon: Users,
    desc: 'A one-time bridge: ~3 months of faculty compensation before tuition revenue flows.',
    detail: 'A $5M Distinguished Professorship at 4.5% yield sustains one position in perpetuity.' },
  { id: 'access', title: 'Access', subtitle: 'Year 1 Scholarships', goal: 5_000_000, share: 5, icon: GraduationCap,
    desc: '10,000 students in the first cohort need assistance. After Year 1, the surplus self-funds scholarships at $40M/year.',
    detail: 'Your seed gift launches a permanent scholarship machine — it doesn\'t run a programme.' },
  { id: 'excellence', title: 'Excellence', subtitle: 'Research & Inquiry', goal: 3_000_000, share: 3, icon: Star,
    desc: 'Seed capital for 19 Centers of Inquiry and 42 active projects — equipment, fieldwork, publications.',
    detail: 'After Year 1, faculty time (already compensated) covers most ongoing project work.' },
  { id: 'progress', title: 'Progress', subtitle: 'Innovation & Infrastructure', goal: 3_000_000, share: 3, icon: Rocket,
    desc: 'Innovation labs, the Global Challenge Fund, technology infrastructure — scholarship meeting the world.',
    detail: '$3M at 4.5% = $135K/year in perpetuity from Day 1 — enough to fund 11 full scholarships forever.' },
];

const CIRCLES = [
  { name: "Founders' Circle", range: '$10M+', min: 10_000_000, icon: Crown, accent: '#8A0000',
    perks: ['Name on the founding document at Venice Central Node', 'Permanent Board of Visitors seat', 'Named endowment'] },
  { name: "Guardians' Circle", range: '$5M – $9.9M', min: 5_000_000, icon: Shield, accent: '#6B0000',
    perks: ['Named College or Center of Inquiry', 'Annual Guardian\'s Lecture', 'President\'s private briefing'] },
  { name: "Builders' Circle", range: '$1M – $4.9M', min: 1_000_000, icon: Building2, accent: '#7c2d12',
    perks: ['Named Professorship, Scholarship, or program', 'Recognition at all 50 Colleges', 'Annual impact report'] },
  { name: "Fellows' Circle", range: '$100K – $999K', min: 100_000, icon: Star, accent: '#0e7490',
    perks: ['Named scholarship or tutorial room', 'Annual Fellow\'s Newsletter', 'Regional event invitations'] },
  { name: 'Friends of Artemis', range: '$10K – $99K', min: 10_000, icon: Heart, accent: '#15803d',
    perks: ['Permanent founding Donor Roll entry', 'Digital certificate of founding support', 'Quarterly updates'] },
  { name: 'The 99', range: '$99', min: 99, icon: Sparkles, accent: '#6b7280',
    perks: ['Waitlist priority for enrollment', 'Community wall recognition', 'Monthly community updates'] },
];

const DONORS = [
  { name: 'The Nordgren Foundation', amount: 100000, date: '28 Apr', msg: 'Investing in the infrastructure of imagination.' },
  { name: 'Chen Wei Laboratories', amount: 50000, date: '4 May', msg: null },
  { name: 'Dr. Elena Vasquez', amount: 25000, date: '10 May', msg: 'For the students who will change everything.' },
  { name: 'Anonymous Patron', amount: 40000, date: '7 May', msg: 'Because knowledge should have no borders.' },
  { name: 'Amara Osei', amount: 100, date: '27 Apr', msg: 'Every great university starts with a first believer.' },
  { name: 'Maria Santos', amount: 250, date: '3 May', msg: 'Proud to be part of the founding.' },
];

function getImpactText(amount: number): string {
  if (amount >= 25_000_000) return 'Name a Central Node — Venice, San Francisco, or Singapore. The apex of the Artemis network.';
  if (amount >= 10_000_000) return 'Name a Tier A College or Center of Inquiry — a flagship institution in your name.';
  if (amount >= 5_000_000) return 'Name a Tier B College or Distinguished Professorship — a permanent endowment.';
  if (amount >= 2_000_000) return 'Name a Tier C College — home to the next generation of leaders.';
  if (amount >= 1_000_000) return 'Name a Professorship or major program — a lasting academic legacy.';
  if (amount >= 100_000) return 'Named scholarship fund or tutorial room at your chosen College.';
  if (amount >= 12_000) return 'Fund a student\'s full four-year scholarship. The most direct way to change a life.';
  if (amount >= 10_000) return 'Your name in the founding Donor Roll — a permanent record of the founders.';
  if (amount >= 99) return 'Waitlist priority for enrollment. You were first in line.';
  return 'Every contribution counts in the founding of a university.';
}

function getCircle(amount: number) {
  return CIRCLES.find((c) => amount >= c.min) ?? null;
}

/* ─── Tiny in-view hook (state-based, no ref-during-render) ─── */
function useInView<T extends HTMLElement = HTMLDivElement>(rootMargin = '-10% 0px') {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { rootMargin, threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);
  return { ref, inView };
}

/* ─── Animated counter ─── */
function Counter({ to, prefix = '', suffix = '', duration = 1600 }: { to: number; prefix?: string; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const { ref, inView } = useInView<HTMLSpanElement>();
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  const display = to >= 1000 ? Math.round(val).toLocaleString('en-US') : Math.round(val).toString();
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

export default function Give2({ goToPage }: Props) {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0.4]);

  /* ─── Donation form state ─── */
  const [amount, setAmount] = useState<number | null>(250);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFreq, setRecurringFreq] = useState<'monthly' | 'yearly'>('monthly');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'crypto' | 'paypal'>('card');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  /* ─── Contact form state ─── */
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactArea, setContactArea] = useState('General enquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactResult, setContactResult] = useState<{ success: boolean; message: string } | null>(null);

  const effectiveAmount = amount ?? (parseFloat(customAmount) || 0);
  const impact = useMemo(() => getImpactText(effectiveAmount), [effectiveAmount]);
  const circle = useMemo(() => getCircle(effectiveAmount), [effectiveAmount]);

  const handleDonate = useCallback(async () => {
    if (!effectiveAmount || effectiveAmount <= 0) {
      setResult({ success: false, message: 'Please choose or enter an amount.' });
      return;
    }
    if (!donorEmail) {
      setResult({ success: false, message: 'An email address is required to record your gift.' });
      return;
    }
    setSubmitting(true);
    setResult(null);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorEmail,
          donorName: isAnonymous ? null : donorName,
          isAnonymous,
          amount: effectiveAmount,
          currency: CAMPAIGN.currency,
          paymentMethod,
          perkId: circle ? circle.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : null,
          isRecurring,
          recurringFreq: isRecurring ? recurringFreq : null,
          message: donorMessage || null,
        }),
      });
      const data = await res.json();
      if (data.success && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else if (data.success) {
        setResult({ success: true, message: data.message || 'Thank you! Your gift has been recorded. We will follow up with payment details.' });
        setCustomAmount(''); setDonorMessage('');
      } else {
        setResult({ success: false, message: data.error || 'Something went wrong.' });
      }
    } catch {
      setResult({ success: false, message: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  }, [effectiveAmount, donorEmail, donorName, isAnonymous, paymentMethod, circle, isRecurring, recurringFreq, donorMessage]);

  const handleContact = useCallback(async () => {
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
    } catch {
      setContactResult({ success: false, message: 'Network error.' });
    } finally {
      setContactSubmitting(false);
    }
  }, [contactName, contactEmail, contactArea, contactMessage]);

  return (
    <div className="flex flex-col bg-[#FAFAF8] text-[#141414]">
      {/* ════════════ HERO ════════════ */}
      <section className="relative w-full overflow-hidden bg-[#0c0a09] text-white">
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8A0000]/30 via-[#0c0a09] to-[#0c0a99]" />
          <div className="absolute -top-1/3 -right-1/4 w-[60vw] h-[60vw] rounded-full bg-[#8A0000]/20 blur-[120px]" />
          <div className="absolute -bottom-1/3 -left-1/4 w-[50vw] h-[50vw] rounded-full bg-[#4338ca]/10 blur-[120px]" />
        </motion.div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 pt-24 lg:pt-32 pb-16 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-[#8A0000]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8A0000]">The Founding Campaign</span>
            </div>
            <h1 className="text-[40px] sm:text-[64px] lg:text-[88px] font-extrabold leading-[0.95] tracking-[-0.03em] mb-6 max-w-4xl">
              For Civilization.
            </h1>
            <p className="text-[17px] sm:text-[20px] text-white/60 max-w-xl leading-relaxed font-light mb-10">
              $100M. 12 months. The kickstart that makes everything else self-sustaining — the zero-to-one moment for a planetary university.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#give"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#8A0000] text-white text-[12px] font-bold uppercase tracking-[0.22em] hover:bg-[#6B0000] transition-colors"
              >
                Give Now
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#case"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/15 text-white/70 text-[12px] font-bold uppercase tracking-[0.22em] hover:bg-white/5 hover:text-white transition-colors"
              >
                Read the Case
                <ChevronDown size={14} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── Live progress bar (sticky-feel, sits at hero bottom) ── */}
        <div className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-sm">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Stat label="Raised" value={<Counter to={CAMPAIGN.raised} prefix="$" />} />
            <Stat label="Goal" value={fmtShort(CAMPAIGN.goal)} />
            <Stat label="Founding Donors" value={<Counter to={CAMPAIGN.donors} />} />
            <Stat label="Of Goal" value={<><Counter to={pct} suffix="%" /></>} />
          </div>
          <div className="h-1.5 bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#8A0000] to-[#dc2626]"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1.6, ease: 'easeOut', delay: 0.4 }}
            />
          </div>
        </div>
      </section>

      {/* ════════════ CASE FOR SUPPORT ════════════ */}
      <Section id="case" eyebrow="Why now, why us" title="A university built to outlast its founders.">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7 space-y-6 text-[16px] leading-[1.75] text-gray-600">
            <p>
              The University of Artemis is a planetary university — 50 colleges across 35 countries, 2,000 faculty,
              60,000 students. It is need-blind by design: qualified students accepted regardless of financial
              background. That ambition has a price, and that price has a deadline.
            </p>
            <p>
              The Founding Campaign is the <strong className="text-[#141414]">one-time capital raise</strong> that
              makes everything else self-sustaining. After Year 1, the operating surplus funds 13,300 scholarships
              per year, builds the endowment at $60M/year, and sustains every faculty line from tuition. This is the
              bridge from idea to institution.
            </p>
            <p>
              We are not asking you to fund a programme. We are asking you to fund the{' '}
              <strong className="text-[#141414]">foundation</strong> — the place, the minds, the access, the
              excellence, and the progress. Five pillars. One campaign. Twelve months.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Campaign Progress</span>
                <span className="text-[13px] font-bold text-[#8A0000]">{pct}%</span>
              </div>
              <div className="space-y-5">
                {PILLARS.map((p) => {
                  const pPct = Math.round((p.share / 100) * 100);
                  return (
                    <div key={p.id}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[13px] font-semibold text-[#141414] flex items-center gap-2">
                          <p.icon size={14} className="text-[#8A0000]" />
                          {p.title}
                        </span>
                        <span className="text-[12px] text-gray-500">{fmtShort(p.goal)}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-[#8A0000]"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pPct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ════════════ FIVE PILLARS — BENTO ════════════ */}
      <Section id="pillars" eyebrow="Where your gift goes" title="Five pillars. Every dollar accounted for.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Featured large tile */}
          <div className="md:col-span-2 lg:col-span-2 lg:row-span-2 bg-[#0c0a99] text-white rounded-2xl p-8 flex flex-col justify-between min-h-[280px] relative overflow-hidden group">
            <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-[#8A0000]/30 blur-2xl group-hover:bg-[#8A0000]/40 transition-colors" />
            <div className="relative">
              <Building2 className="text-[#8A0000] mb-5" size={28} />
              <div className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-2">{PILLARS[0].subtitle}</div>
              <h3 className="text-[28px] font-extrabold tracking-tight mb-3">{PILLARS[0].title}</h3>
              <p className="text-[14px] text-white/60 leading-relaxed max-w-md">{PILLARS[0].desc}</p>
            </div>
            <div className="relative flex items-end justify-between mt-6">
              <span className="text-[32px] font-extrabold">{fmtShort(PILLARS[0].goal)}</span>
              <span className="text-[13px] text-white/40">{PILLARS[0].share}% of campaign</span>
            </div>
          </div>

          {PILLARS.slice(1).map((p) => (
            <div key={p.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#8A0000]/30 hover:shadow-md transition-all group">
              <p.icon className="text-[#8A0000] mb-4 group-hover:scale-110 transition-transform" size={22} />
              <div className="text-[10px] uppercase tracking-[0.18em] text-gray-400 mb-1">{p.subtitle}</div>
              <h3 className="text-[18px] font-bold tracking-tight mb-2">{p.title}</h3>
              <p className="text-[12px] text-gray-500 leading-relaxed mb-4">{p.desc}</p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-[15px] font-bold text-[#141414]">{fmtShort(p.goal)}</span>
                <span className="text-[11px] text-gray-400">{p.share}%</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ════════════ GIVING CIRCLES ════════════ */}
      <Section id="circles" eyebrow="Recognition" title="The circles that built the foundation.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CIRCLES.map((c) => (
            <div
              key={c.name}
              className="bg-white border border-gray-200 rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${c.accent}12` }}>
                  <c.icon size={20} style={{ color: c.accent }} />
                </div>
                <span className="text-[12px] font-bold text-gray-400">{c.range}</span>
              </div>
              <h3 className="text-[16px] font-bold tracking-tight mb-4">{c.name}</h3>
              <ul className="space-y-2">
                {c.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-[12px] text-gray-500 leading-relaxed">
                    <Check size={13} className="mt-0.5 shrink-0" style={{ color: c.accent }} />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ════════════ DONOR WALL ════════════ */}
      <section id="donors" className="py-20 lg:py-28 bg-[#0c0a99] text-white">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-[#8A0000]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8A0000]">Recent Founders</span>
          </div>
          <h2 className="text-[32px] sm:text-[44px] font-extrabold tracking-tight mb-12 max-w-2xl">
            The first believers.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DONORS.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="border border-white/10 rounded-xl p-6 hover:border-white/25 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] font-semibold">{d.name}</span>
                  <span className="text-[13px] font-bold text-[#8A0000]">{fmtShort(d.amount)}</span>
                </div>
                {d.msg ? (
                  <p className="text-[13px] text-white/50 italic leading-relaxed flex items-start gap-2">
                    <Quote size={12} className="mt-1 shrink-0 text-white/30" />
                    {d.msg}
                  </p>
                ) : (
                  <p className="text-[12px] text-white/30">{d.date}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ GIVE FORM ════════════ */}
      <Section id="give" eyebrow="Make your gift" title="One form. Every circle.">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left: amount picker + impact */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 block">Choose an amount</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {PRESETS.map((p) => (
                    <button
                      key={p}
                      onClick={() => { setAmount(p); setCustomAmount(''); }}
                      className={`py-3 rounded-lg text-[14px] font-bold border transition-all ${
                        amount === p
                          ? 'bg-[#8A0000] text-white border-[#8A0000]'
                          : 'bg-white text-[#141414] border-gray-200 hover:border-[#8A0000]/50'
                      }`}
                    >
                      {fmtShort(p)}
                    </button>
                  ))}
                </div>
                <div className="relative mt-3">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[14px]">$</span>
                  <input
                    type="number"
                    min={1}
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setAmount(null); }}
                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 bg-white text-[14px] focus:outline-none focus:border-[#8A0000] focus:ring-2 focus:ring-[#8A0000]/10 transition-all"
                  />
                </div>
              </div>

              {/* Live impact preview */}
              <div className="bg-[#0c0a99] text-white rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={15} className="text-[#8A0000]" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">Your impact</span>
                </div>
                <p className="text-[15px] leading-relaxed mb-4 min-h-[48px]">{impact}</p>
                <AnimatePresence mode="wait">
                  {circle && (
                    <motion.div
                      key={circle.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center justify-between pt-4 border-t border-white/10"
                    >
                      <span className="text-[12px] text-white/50">Giving circle</span>
                      <span className="text-[13px] font-bold flex items-center gap-2">
                        <circle.icon size={14} style={{ color: circle.accent }} />
                        {circle.name}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Frequency toggle */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 block">Frequency</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsRecurring(false)}
                    className={`flex-1 py-2.5 rounded-lg text-[12px] font-bold uppercase tracking-wider border transition-all ${
                      !isRecurring ? 'bg-[#141414] text-white border-[#141414]' : 'bg-white text-gray-500 border-gray-200'
                    }`}
                  >One-time</button>
                  <button
                    onClick={() => setIsRecurring(true)}
                    className={`flex-1 py-2.5 rounded-lg text-[12px] font-bold uppercase tracking-wider border transition-all ${
                      isRecurring ? 'bg-[#141414] text-white border-[#141414]' : 'bg-white text-gray-500 border-gray-200'
                    }`}
                  >Recurring</button>
                </div>
                {isRecurring && (
                  <div className="flex gap-2 mt-2">
                    {(['monthly', 'yearly'] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setRecurringFreq(f)}
                        className={`flex-1 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider border transition-all ${
                          recurringFreq === f ? 'bg-[#8A0000] text-white border-[#8A0000]' : 'bg-white text-gray-500 border-gray-200'
                        }`}
                      >{f}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: donor details + payment */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-gray-200 rounded-2xl p-7 sm:p-9 shadow-sm">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <Field label="Full name">
                  <input value={donorName} onChange={(e) => setDonorName(e.target.value)} disabled={isAnonymous}
                    placeholder="Your name" className={inputCls} />
                </Field>
                <Field label="Email" required>
                  <input type="email" value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="you@email.com" className={inputCls} />
                </Field>
              </div>

              <label className="flex items-center gap-2 mb-4 cursor-pointer group">
                <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#8A0000] focus:ring-[#8A0000]" />
                <span className="text-[13px] text-gray-600 group-hover:text-[#141414]">Give anonymously</span>
              </label>

              <Field label="Message (optional)">
                <textarea value={donorMessage} onChange={(e) => setDonorMessage(e.target.value)} rows={2}
                  placeholder="A word for the founding record…" className={`${inputCls} resize-none`} />
              </Field>

              <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 mt-6 block">Payment method</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                {([
                  { id: 'card', label: 'Card' },
                  { id: 'paypal', label: 'PayPal' },
                  { id: 'bank', label: 'Bank' },
                  { id: 'crypto', label: 'Crypto' },
                ] as const).map((m) => (
                  <button key={m.id} onClick={() => setPaymentMethod(m.id)}
                    className={`py-2.5 rounded-lg text-[12px] font-bold uppercase tracking-wider border transition-all ${
                      paymentMethod === m.id ? 'bg-[#141414] text-white border-[#141414]' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                    }`}>{m.label}</button>
                ))}
              </div>

              {/* Result / error */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`mb-5 px-4 py-3 rounded-lg text-[13px] ${
                      result.success ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >{result.message}</motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={handleDonate}
                disabled={submitting || !effectiveAmount || !donorEmail}
                className="w-full py-4 bg-[#8A0000] text-white text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-[#6B0000] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 group"
              >
                {submitting ? (
                  <>Processing…</>
                ) : (
                  <>
                    Give {fmtShort(effectiveAmount)}{isRecurring ? ` / ${recurringFreq}` : ''}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              <p className="text-[11px] text-gray-400 text-center mt-3 leading-relaxed">
                Your gift is recorded in the founding ledger. Payment is processed via the configured gateway —
                if none is set, our advancement team will follow up with details.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ════════════ CONTACT ════════════ */}
      <Section id="contact" eyebrow="Talk to us" title="Major gifts, wire transfers, crypto, bequests.">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <p className="text-[16px] leading-[1.75] text-gray-600">
              For gifts above $100K, named opportunities, or bespoke arrangements (bequests, crypto transfers,
              international wires), our advancement team will work with you directly — confidentially and personally.
            </p>
            <div className="space-y-3">
              {[
                { icon: HandCoins, label: 'advancement@artemisui.org' },
                { icon: Landmark, label: 'Venice Central Node · Malta · Singapore' },
                { icon: Shield, label: '501(c)(3) · Delaware Non-Stock Corporation' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 text-[14px] text-gray-700">
                  <div className="w-9 h-9 rounded-lg bg-[#8A0000]/8 flex items-center justify-center">
                    <item.icon size={16} className="text-[#8A0000]" />
                  </div>
                  {item.label}
                </div>
              ))}
            </div>
            <button
              onClick={() => goToPage('fundraising')}
              className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.15em] text-[#8A0000] hover:gap-3 transition-all"
            >
              View the full case statement
              <ArrowUpRight size={15} />
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <Field label="Name"><input value={contactName} onChange={(e) => setContactName(e.target.value)} className={inputCls} placeholder="Your name" /></Field>
              <Field label="Email"><input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className={inputCls} placeholder="you@email.com" /></Field>
            </div>
            <Field label="Area">
              <select value={contactArea} onChange={(e) => setContactArea(e.target.value)} className={inputCls}>
                <option>General enquiry</option>
                <option>Major gifts</option>
                <option>Donations</option>
                <option>Partnerships</option>
                <option>Bequests &amp; planned giving</option>
              </select>
            </Field>
            <Field label="Message">
              <textarea value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} rows={4} className={`${inputCls} resize-none`} placeholder="How can we help?" />
            </Field>
            <AnimatePresence>
              {contactResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className={`mb-4 px-4 py-3 rounded-lg text-[13px] ${
                    contactResult.success ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >{contactResult.message}</motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={handleContact}
              disabled={contactSubmitting || !contactName || !contactEmail || !contactMessage}
              className="w-full py-3.5 bg-[#141414] text-white text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >{contactSubmitting ? 'Sending…' : 'Send message'}</button>
          </div>
        </div>
      </Section>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}

/* ─── Helpers ─── */
const inputCls = "w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[14px] focus:outline-none focus:border-[#8A0000] focus:ring-2 focus:ring-[#8A0000]/10 transition-all";

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-1.5">{label}</div>
      <div className="text-[22px] sm:text-[26px] font-extrabold tracking-tight">{value}</div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block mb-4">
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">
        {label}{required && <span className="text-[#8A0000]"> *</span>}
      </span>
      {children}
    </label>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section id={id} className="py-20 lg:py-28 scroll-mt-24">
      <div ref={ref} className={`max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-[#8A0000]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8A0000]">{eyebrow}</span>
          </div>
          <h2 className="text-[28px] sm:text-[40px] lg:text-[48px] font-extrabold tracking-[-0.02em] leading-[1.05] max-w-3xl">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}
