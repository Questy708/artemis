'use client';

import React, { useState, useEffect, useRef } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';

interface Props {
  goToPage: (page: string) => void;
  pageId: string;
}

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

/* ─── Shared components ─── */
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

/* ─── Page data ─── */
const pageConfigs: Record<string, {
  title: string;
  subtitle: string;
  heroImage: string;
  heroLabel: string;
}> = {
  'tuition-expenses': {
    title: 'Tuition & Expenses',
    subtitle: 'Transparent costs for a world-class education',
    heroImage: 'https://images.unsplash.com/photo-1655720357872-ce227e4164ba?auto=format&fit=crop&q=80&w=1800',
    heroLabel: 'Investing in Your Future',
  },
  'international-students': {
    title: 'International Students',
    subtitle: 'A truly global university for scholars from every nation',
    heroImage: 'https://images.unsplash.com/photo-1687172140737-22c4c3371f3e?auto=format&fit=crop&q=80&w=1800',
    heroLabel: 'Without Borders',
  },
  'transfer-students': {
    title: 'Transfer Students',
    subtitle: 'Continue your journey at Artemis',
    heroImage: 'https://images.unsplash.com/photo-1686213011642-b25f94b95b96?auto=format&fit=crop&q=80&w=1800',
    heroLabel: 'A New Chapter',
  },
  'application-deadlines': {
    title: 'Application Deadlines',
    subtitle: 'Key dates for the 2026-2027 admissions cycle',
    heroImage: 'https://images.unsplash.com/photo-1611697047951-c7f9824a5636?auto=format&fit=crop&q=80&w=1800',
    heroLabel: 'Mark Your Calendar',
  },
  'visit-campus': {
    title: 'Visit Campus',
    subtitle: 'Experience Artemis in person',
    heroImage: 'https://images.unsplash.com/photo-1675179190669-ef6bc809d8d7?auto=format&fit=crop&q=80&w=1800',
    heroLabel: 'Coming Soon',
  },
  'graduate-coming-soon': {
    title: 'Graduate Programmes',
    subtitle: 'Advanced study at the frontier of knowledge',
    heroImage: 'https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?auto=format&fit=crop&q=80&w=1800',
    heroLabel: 'Coming Soon',
  },
};

/* ─── TUITION & EXPENSES ─── */
function TuitionContent({ goToPage }: { goToPage: (page: string) => void }) {
  const anim1 = useInView();
  const anim2 = useInView();
  const anim3 = useInView();

  return (
    <>
      <section id="annual-costs" className="scroll-mt-[110px] max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24">
        <div ref={anim1.ref} className={`transition-all duration-700 ${anim1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionDivider label="Annual Costs" />
          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
            What it costs to attend Artemis
          </h2>
          <p className="text-[16px] text-gray-600 leading-relaxed mb-12 max-w-2xl">
            The University of Artemis operates on a transparent, all-inclusive pricing model. The annual cost covers tuition, accommodation at your designated node, all learning materials, and access to the full digital infrastructure of the network. There are no hidden fees, no lab charges, and no textbook costs.
          </p>

          {/* Cost breakdown */}
          <div className="bg-white border border-gray-100 overflow-hidden mb-12">
            <div className="grid grid-cols-2 bg-gray-50 border-b border-gray-100 px-8 py-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Item</span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 text-right">Annual Cost (USD)</span>
            </div>
            {[
              { item: 'Tuition', cost: '$38,000' },
              { item: 'Room & Board (Node Residency)', cost: '$14,600' },
              { item: 'Learning Materials & Digital Access', cost: '$2,000' },
              { item: 'Student Activity Fee', cost: '$600' },
              { item: 'Health & Wellness Programme', cost: '$1,400' },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-2 px-8 py-4 border-b border-gray-50">
                <span className="text-[14px] text-gray-700">{row.item}</span>
                <span className="text-[14px] font-bold text-[#141414] text-right">{row.cost}</span>
              </div>
            ))}
            <div className="grid grid-cols-2 px-8 py-5 bg-[#8A0000]/5">
              <span className="text-[14px] font-bold text-[#141414]">Total Annual Cost of Attendance</span>
              <span className="text-[18px] font-black text-[#8A0000] text-right">$56,600</span>
            </div>
          </div>
        </div>
      </section>

      <section id="financial-aid" className="scroll-mt-[110px] bg-gray-50 py-16 lg:py-24">
        <div ref={anim2.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${anim2.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <RedLabel text="Financial Aid" />
          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
            Need-based aid packages
          </h2>
          <p className="text-[16px] text-gray-600 leading-relaxed mb-8 max-w-2xl">
            Artemis meets 100% of demonstrated financial need for every admitted student. Aid packages are composed of three components: need-based scholarships (grants that do not need to be repaid), a work-study allocation of up to $5,000 per year, and low-interest student loans designed to minimise long-term debt. There are no merit-based scholarships — every rupee of aid goes toward demonstrated need.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div className="bg-white p-6 border border-gray-100">
              <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">01 — Scholarships</div>
              <h4 className="text-[18px] font-bold text-[#141414] mb-3">Need-Based Grants</h4>
              <p className="text-[14px] text-gray-600 leading-relaxed">Gift aid that does not require repayment. Awarded based on demonstrated financial need and funded entirely through private philanthropy.</p>
            </div>
            <div className="bg-white p-6 border border-gray-100">
              <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">02 — Work-Study</div>
              <h4 className="text-[18px] font-bold text-[#141414] mb-3">Earn While You Learn</h4>
              <p className="text-[14px] text-gray-600 leading-relaxed">Up to $5,000 annually through on-node and digital work placements. Gain professional experience while offsetting costs.</p>
            </div>
            <div className="bg-white p-6 border border-gray-100">
              <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">03 — Loans</div>
              <h4 className="text-[18px] font-bold text-[#141414] mb-3">Low-Interest Financing</h4>
              <p className="text-[14px] text-gray-600 leading-relaxed">Minimal-debt loan options designed to bridge remaining gaps, with favourable repayment terms and income-contingent schedules.</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
              <div className="relative pl-4 border-l-2 border-[#8A0000]">
                <div className="text-[30px] font-black text-[#141414] leading-none mb-1">70%+</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight">Students Receiving Aid</div>
              </div>
              <div className="relative pl-4 border-l-2 border-[#8A0000]">
                <div className="text-[30px] font-black text-[#141414] leading-none mb-1">100%</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight">Need Met</div>
              </div>
              <div className="relative pl-4 border-l-2 border-[#8A0000]">
                <div className="text-[30px] font-black text-[#141414] leading-none mb-1">$5K</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight">Annual Work-Study</div>
              </div>
              <div className="relative pl-4 border-l-2 border-[#8A0000]">
                <div className="text-[30px] font-black text-[#141414] leading-none mb-1">0</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight">Application Fee</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-aid-works" className="scroll-mt-[110px] max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24">
        <div ref={anim3.ref} className={`transition-all duration-700 ${anim3.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionDivider label="How Aid Works" />
          <h2 className="text-[28px] font-extrabold tracking-tighter text-[#141414] mb-8">Applying for financial aid</h2>
          <div className="space-y-6 max-w-2xl">
            <div className="flex items-start gap-4">
              <div className="text-[12px] font-bold text-[#8A0000] tracking-widest mt-1 shrink-0">STEP 1</div>
              <div>
                <h4 className="text-[14px] font-bold text-[#141414] mb-1">Submit your admissions application</h4>
                <p className="text-[14px] text-gray-600 leading-relaxed">Indicate your interest in financial aid on your application form. This must be done in the same cycle as your admissions application.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-[12px] font-bold text-[#8A0000] tracking-widest mt-1 shrink-0">STEP 2</div>
              <div>
                <h4 className="text-[14px] font-bold text-[#141414] mb-1">Complete the Financial Aid Questionnaire</h4>
                <p className="text-[14px] text-gray-600 leading-relaxed">After submitting your application, access the Artemis Financial Aid Centre to complete a detailed questionnaire about your family&apos;s financial situation.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-[12px] font-bold text-[#8A0000] tracking-widest mt-1 shrink-0">STEP 3</div>
              <div>
                <h4 className="text-[14px] font-bold text-[#141414] mb-1">Upload supporting documents</h4>
                <p className="text-[14px] text-gray-600 leading-relaxed">Provide income statements, tax returns (or local equivalents), and bank statements for the past two years. The aid deadline is one week after your admissions cycle deadline.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-[12px] font-bold text-[#8A0000] tracking-widest mt-1 shrink-0">STEP 4</div>
              <div>
                <h4 className="text-[14px] font-bold text-[#141414] mb-1">Receive your aid package</h4>
                <p className="text-[14px] text-gray-600 leading-relaxed">Your aid offer is included with your admissions decision. Aid is reviewed annually and can be appealed if circumstances change significantly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── INTERNATIONAL STUDENTS ─── */
function InternationalContent({ goToPage }: { goToPage: (page: string) => void }) {
  const anim1 = useInView();
  const anim2 = useInView();
  const anim3 = useInView();

  return (
    <>
      <section id="global-admissions" className="scroll-mt-[110px] max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24">
        <div ref={anim1.ref} className={`transition-all duration-700 ${anim1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionDivider label="Global Admissions" />
          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
            One application, every nation
          </h2>
          <p className="text-[16px] text-gray-600 leading-relaxed mb-6 max-w-2xl">
            There is no separate application or different process for international students at Artemis. The same three-part application applies to all applicants regardless of nationality, and all students — regardless of citizenship — are eligible to apply for financial aid. With scholars from over 140 countries, the majority of our student body is international by design.
          </p>
          <p className="text-[16px] text-gray-600 leading-relaxed mb-12 max-w-2xl">
            Our federated model means that no single country dominates the Artemis experience. You will study alongside peers from every inhabited continent, rotating between global nodes that each offer a distinct cultural and intellectual context.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            <div className="relative pl-6 border-l-2 border-[#8A0000]">
              <div className="text-[36px] font-black text-[#141414] leading-none mb-2">140+</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-1">Countries</div>
              <div className="text-[12px] text-gray-500 leading-snug">Scholars from every inhabited continent</div>
            </div>
            <div className="relative pl-6 border-l-2 border-[#8A0000]">
              <div className="text-[36px] font-black text-[#141414] leading-none mb-2">0</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-1">Application Fee</div>
              <div className="text-[12px] text-gray-500 leading-snug">For all applicants worldwide</div>
            </div>
            <div className="relative pl-6 border-l-2 border-[#8A0000]">
              <div className="text-[36px] font-black text-[#141414] leading-none mb-2">6</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-1">Continents</div>
              <div className="text-[12px] text-gray-500 leading-snug">Study across multiple global nodes</div>
            </div>
            <div className="relative pl-6 border-l-2 border-[#8A0000]">
              <div className="text-[36px] font-black text-[#141414] leading-none mb-2">100%</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] leading-tight mb-1">Aid Eligible</div>
              <div className="text-[12px] text-gray-500 leading-snug">Regardless of nationality</div>
            </div>
          </div>
        </div>
      </section>

      <section id="english-proficiency" className="scroll-mt-[110px] bg-gray-50 py-16 lg:py-24">
        <div ref={anim2.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${anim2.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <RedLabel text="English Proficiency" />
          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
            Assessed through your application
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Artemis does not require separate English proficiency test scores such as TOEFL, IELTS, or Duolingo. Instead, your English fluency is assessed directly through the application — specifically through your personal statement, mission statement, and the accomplishment descriptions you provide.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                All classes at Artemis are conducted in English, and you will need to demonstrate the ability to engage with complex academic material, participate in seminar discussions, and produce written work at a university level. The application itself serves as your proficiency assessment.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                If admitted, all scholars have access to our Academic English Programme, which provides ongoing language support tailored to the demands of interdisciplinary study at the university level.
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-white p-6 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="text-[10px] font-bold text-[#8A0000] tracking-widest uppercase mt-1">No TOEFL</div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#141414] mb-2">No Separate Test Required</h4>
                    <p className="text-[14px] text-gray-500 leading-relaxed">Your writing in the application demonstrates your English ability. There is no need to register for or submit TOEFL, IELTS, or Duolingo scores.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="text-[10px] font-bold text-[#8A0000] tracking-widest uppercase mt-1">Support</div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#141414] mb-2">Academic English Programme</h4>
                    <p className="text-[14px] text-gray-500 leading-relaxed">All scholars have access to ongoing language support, writing centres, and communication workshops throughout their studies.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="visa-records" className="scroll-mt-[110px] max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24">
        <div ref={anim3.ref} className={`transition-all duration-700 ${anim3.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionDivider label="Visa & Records" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-[28px] font-extrabold tracking-tighter text-[#141414] mb-8">Visa support & academic records</h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Artemis provides visa support letters for all admitted international students. Because scholars rotate between global nodes as part of the curriculum, you may need to secure multiple visas during your studies. Our International Student Office assists with every step of the process, from initial documentation to renewal and transitions.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                We accept academic records from all international examination systems — including IB, A-Levels, national baccalaureates, and regional curricula. When reporting your grades, you will indicate your country&apos;s grading scale, and our admissions team evaluates your academic trajectory within the context of your local education system.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                International families must provide income documentation — tax returns or local equivalents — and bank statements as part of the financial aid process. These materials are reviewed in their original context; no conversion to a particular national standard is required.
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 border border-gray-100">
                <h4 className="text-[14px] font-bold text-[#141414] mb-3">Accepted Curricula</h4>
                <ul className="space-y-2 text-[14px] text-gray-600">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#8A0000] rounded-full shrink-0"></span>International Baccalaureate (IB)</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#8A0000] rounded-full shrink-0"></span>UK A-Levels and BTEC</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#8A0000] rounded-full shrink-0"></span>French Baccalaureate</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#8A0000] rounded-full shrink-0"></span>German Abitur</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#8A0000] rounded-full shrink-0"></span>National examination systems</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#8A0000] rounded-full shrink-0"></span>Advanced Placement (AP)</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#8A0000] rounded-full shrink-0"></span>All regional curricula worldwide</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── TRANSFER STUDENTS ─── */
function TransferContent({ goToPage }: { goToPage: (page: string) => void }) {
  const anim1 = useInView();
  const anim2 = useInView();

  return (
    <>
      <section id="transfer-admissions" className="scroll-mt-[110px] max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24">
        <div ref={anim1.ref} className={`transition-all duration-700 ${anim1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionDivider label="Transfer Admissions" />
          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
            Continue your journey at Artemis
          </h2>
          <p className="text-[16px] text-gray-600 leading-relaxed mb-6 max-w-2xl">
            The University of Artemis welcomes transfer applicants who have completed at least one year of full-time study at an accredited institution. We recognise that your academic path may not have followed a straight line — and we value the perspective and maturity that transfer students bring to the Artemis community.
          </p>
          <p className="text-[16px] text-gray-600 leading-relaxed mb-12 max-w-2xl">
            Transfer applicants use the same application as first-year applicants, with additional requirements: official transcripts from all post-secondary institutions attended, a transfer statement explaining your reasons for seeking a move to Artemis, and a dean&apos;s reference from your current institution.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="bg-white p-8 border border-gray-100">
              <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">01 — Eligibility</div>
              <h4 className="text-[18px] font-bold text-[#141414] mb-3">Who can apply</h4>
              <p className="text-[14px] text-gray-600 leading-relaxed">Applicants who have completed at least one year (minimum 30 ECTS credits or equivalent) of full-time study at an accredited institution are eligible. Students currently in their first semester are not eligible and should apply as first-year applicants.</p>
            </div>
            <div className="bg-white p-8 border border-gray-100">
              <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">02 — Credit Transfer</div>
              <h4 className="text-[18px] font-bold text-[#141414] mb-3">ECTS-compatible credits</h4>
              <p className="text-[14px] text-gray-600 leading-relaxed">Artemis uses the European Credit Transfer System (ECTS) as its unified credit mapping. Credits earned at institutions using other systems are evaluated on a case-by-case basis. A maximum of 60 ECTS credits (approximately one year of study) may be transferred.</p>
            </div>
            <div className="bg-white p-8 border border-gray-100">
              <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">03 — Requirements</div>
              <h4 className="text-[18px] font-bold text-[#141414] mb-3">What you need</h4>
              <p className="text-[14px] text-gray-600 leading-relaxed">Official transcripts from all post-secondary institutions, a transfer statement (max 500 words), a dean&apos;s or academic advisor reference, and the standard Artemis application form including accomplishments and mission statement.</p>
            </div>
            <div className="bg-white p-8 border border-gray-100">
              <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">04 — Financial Aid</div>
              <h4 className="text-[18px] font-bold text-[#141414] mb-3">Aid for transfers</h4>
              <p className="text-[14px] text-gray-600 leading-relaxed">Transfer students are eligible for the same need-based financial aid as first-year students, following the same application process and deadlines. Aid is determined by demonstrated financial need, not by entry pathway.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="apply-now" className="scroll-mt-[110px] bg-gray-50 py-16 lg:py-24">
        <div ref={anim2.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${anim2.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <RedLabel text="Apply Now" />
          <h2 className="text-[28px] font-extrabold tracking-tighter text-[#141414] mb-8">Ready to transfer?</h2>
          <p className="text-[16px] text-gray-600 leading-relaxed mb-8 max-w-2xl">
            Transfer applicants follow the same application cycles as first-year applicants. We encourage you to apply in Early Action to maximise your financial aid prospects. There is no separate transfer application — simply indicate your transfer status on the standard application form.
          </p>
          <button
            onClick={() => goToPage('apply')}
            className="flex items-center space-x-3 text-[11px] font-bold uppercase tracking-widest border-b-2 border-[#8A0000] text-[#8A0000] pb-1 hover:text-black hover:border-black transition-colors group"
          >
            <span>Start Application</span>
            <svg className="group-hover:translate-x-2 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      </section>
    </>
  );
}

/* ─── APPLICATION DEADLINES ─── */
function DeadlinesContent({ goToPage }: { goToPage: (page: string) => void }) {
  const anim1 = useInView();
  const anim2 = useInView();

  const deadlines = [
    { cycle: 'Early Action', appDeadline: '1 November 2026', aidDeadline: '8 November 2026', decision: '19 December 2026', recommended: true },
    { cycle: 'Regular Decision I', appDeadline: '13 January 2027', aidDeadline: '20 January 2027', decision: '5 March 2027', recommended: false },
    { cycle: 'Regular Decision II', appDeadline: '24 February 2027', aidDeadline: '3 March 2027', decision: '10 April 2027', recommended: false },
    { cycle: 'Extended Decision', appDeadline: '7 April 2027', aidDeadline: 'Not available', decision: 'Rolling', recommended: false },
  ];

  return (
    <>
      <section id="key-dates" className="scroll-mt-[110px] max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24">
        <div ref={anim1.ref} className={`transition-all duration-700 ${anim1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionDivider label="Key Dates" />
          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
            2026-2027 admissions cycle
          </h2>
          <p className="text-[16px] text-gray-600 leading-relaxed mb-12 max-w-2xl">
            You may apply in only one cycle per academic year. If denied, you cannot reapply in a subsequent cycle. We strongly recommend Early Action to maximise financial aid prospects. There is no application fee for any cycle.
          </p>

          {/* Deadline table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-[#8A0000]">
                  <th className="py-4 pr-4 text-[10px] font-bold uppercase tracking-widest text-[#8A0000]">Cycle</th>
                  <th className="py-4 pr-4 text-[10px] font-bold uppercase tracking-widest text-[#8A0000]">Application Deadline</th>
                  <th className="py-4 pr-4 text-[10px] font-bold uppercase tracking-widest text-[#8A0000]">Aid Deadline</th>
                  <th className="py-4 text-[10px] font-bold uppercase tracking-widest text-[#8A0000]">Decision By</th>
                </tr>
              </thead>
              <tbody>
                {deadlines.map((d, i) => (
                  <tr key={i} className={`border-b border-gray-100 ${d.recommended ? 'bg-[#8A0000]/5' : ''}`}>
                    <td className="py-5 pr-4">
                      <span className="text-[14px] font-bold text-[#141414]">{d.cycle}</span>
                      {d.recommended && <span className="ml-2 text-[9px] font-bold uppercase tracking-widest bg-[#8A0000] text-white px-2 py-0.5">Recommended</span>}
                    </td>
                    <td className="py-5 pr-4 text-[14px] font-bold text-[#141414]">{d.appDeadline}</td>
                    <td className={`py-5 pr-4 text-[14px] ${d.aidDeadline === 'Not available' ? 'text-gray-400' : 'font-bold text-[#141414]'}`}>{d.aidDeadline}</td>
                    <td className="py-5 text-[14px] font-bold text-[#141414]">{d.decision}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="important-notes" className="scroll-mt-[110px] bg-gray-50 py-16 lg:py-24">
        <div ref={anim2.ref} className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${anim2.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <RedLabel text="Important Notes" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#8A0000] rounded-full mt-2 shrink-0"></span>
                <p className="text-[14px] text-gray-600 leading-relaxed"><strong className="text-[#141414]">Aid deadlines are firm.</strong> Financial aid applications are due one week after the admissions deadline. No exceptions or extensions are granted, and you cannot apply for aid after receiving your admissions decision.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#8A0000] rounded-full mt-2 shrink-0"></span>
                <p className="text-[14px] text-gray-600 leading-relaxed"><strong className="text-[#141414]">One cycle per year.</strong> You may apply in only one cycle. If denied, you must wait until the next academic year to reapply.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#8A0000] rounded-full mt-2 shrink-0"></span>
                <p className="text-[14px] text-gray-600 leading-relaxed"><strong className="text-[#141414]">Extended Decision = No aid.</strong> The Extended Decision cycle does not offer financial aid. Applicants requiring aid should apply in an earlier cycle.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#8A0000] rounded-full mt-2 shrink-0"></span>
                <p className="text-[14px] text-gray-600 leading-relaxed"><strong className="text-[#141414]">No application fee.</strong> There is no cost to apply to Artemis in any cycle.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#8A0000] rounded-full mt-2 shrink-0"></span>
                <p className="text-[14px] text-gray-600 leading-relaxed"><strong className="text-[#141414]">Need-aware process.</strong> Financial need is considered when making final admissions recommendations. Applying early maximises your chances of comprehensive aid.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#8A0000] rounded-full mt-2 shrink-0"></span>
                <p className="text-[14px] text-gray-600 leading-relaxed"><strong className="text-[#141414]">All deadlines are 23:59 UTC.</strong> Please convert to your local time zone to ensure timely submission.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => goToPage('apply')}
              className="px-10 py-4 bg-[#8A0000] text-white text-[14px] font-bold uppercase tracking-widest hover:bg-[#141414] transition-colors rounded"
            >
              Start Your Application
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── VISIT CAMPUS (COMING SOON) ─── */
function VisitCampusContent() {
  const anim1 = useInView();

  return (
    <section className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24">
      <div ref={anim1.ref} className={`transition-all duration-700 ${anim1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex flex-col items-center text-center py-16 lg:py-24">
          <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-6 uppercase">Coming Soon</div>
          <h2 className="text-[36px] md:text-[48px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
            Visit the Artemis Network
          </h2>
          <p className="text-[18px] text-gray-600 max-w-xl leading-relaxed mb-8">
            We are preparing an immersive visit programme that will allow prospective scholars to experience our global nodes in person. Guided tours, open days, and virtual experiences are all in development.
          </p>
          <div className="inline-block px-6 py-3 border-2 border-[#8A0000] text-[#8A0000] text-[12px] font-bold uppercase tracking-widest">
            Coming Soon
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── GRADUATE COMING SOON ─── */
function GraduateComingSoonContent() {
  const anim1 = useInView();

  return (
    <section className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24">
      <div ref={anim1.ref} className={`transition-all duration-700 ${anim1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex flex-col items-center text-center py-16 lg:py-24">
          <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-6 uppercase">Under Development</div>
          <h2 className="text-[36px] md:text-[48px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
            Graduate Programmes
          </h2>
          <p className="text-[18px] text-gray-600 max-w-xl leading-relaxed mb-8">
            Advanced research and professional study across multi-disciplinary hubs is under active development at Artemis. Graduate programmes will push past the edge of known knowledge — stay tuned for announcements regarding programme offerings, application cycles, and research opportunities.
          </p>
          <div className="inline-block px-6 py-3 border-2 border-[#8A0000] text-[#8A0000] text-[12px] font-bold uppercase tracking-widest">
            Coming Soon
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Nav sections per page ─── */
const navSectionsMap: Record<string, { id: string; label: string }[]> = {
  'tuition-expenses': [
    { id: 'annual-costs', label: 'Annual Costs' },
    { id: 'financial-aid', label: 'Financial Aid' },
    { id: 'how-aid-works', label: 'How Aid Works' },
  ],
  'international-students': [
    { id: 'global-admissions', label: 'Global Admissions' },
    { id: 'english-proficiency', label: 'English Proficiency' },
    { id: 'visa-records', label: 'Visa & Records' },
  ],
  'transfer-students': [
    { id: 'transfer-admissions', label: 'Transfer Admissions' },
    { id: 'apply-now', label: 'Apply Now' },
  ],
  'application-deadlines': [
    { id: 'key-dates', label: 'Key Dates' },
    { id: 'important-notes', label: 'Important Notes' },
  ],
};

/* ─── MAIN COMPONENT ─── */
export default function AdmissionsSubpage({ goToPage, pageId }: Props) {
  const config = pageConfigs[pageId];
  const navSections = navSectionsMap[pageId] || [];
  const activeSection = useActiveSection(navSections.map(s => s.id));
  if (!config) {
    return (
      <div className="flex-1 flex flex-col bg-white">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-20 py-16 lg:py-24 text-center">
          <h1 className="text-[36px] font-bold">Page not found</h1>
          <button onClick={() => goToPage('admissions')} className="mt-6 text-[#8A0000] underline">Return to Admissions</button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (pageId) {
      case 'tuition-expenses':
        return <TuitionContent goToPage={goToPage} />;
      case 'international-students':
        return <InternationalContent goToPage={goToPage} />;
      case 'transfer-students':
        return <TransferContent goToPage={goToPage} />;
      case 'application-deadlines':
        return <DeadlinesContent goToPage={goToPage} />;
      case 'visit-campus':
        return <VisitCampusContent />;
      case 'graduate-coming-soon':
        return <GraduateComingSoonContent />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col bg-white">
      {/* Hero */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[45vh] min-h-[360px] overflow-hidden">
        <img
          src={config.heroImage}
          alt={config.title}
          className="absolute inset-0 w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-8 lg:px-20 pb-16">
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">{config.heroLabel}</span>
          </div>
          <h1 className="text-[40px] md:text-[50px] font-extrabold leading-[1.05] tracking-tighter text-white mb-3 uppercase">
            {config.title}
          </h1>
          <p className="text-[16px] text-white/70 max-w-lg leading-relaxed font-light">
            {config.subtitle}
          </p>
        </div>
          </div>
        </div>
      </section>

      {/* On This Page Nav */}
      {navSections.length > 0 && (
        <OnThisPageNav sections={navSections} activeSection={activeSection} />
      )}

      {/* Page content */}
      {renderContent()}

      {/* Footer */}
      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
