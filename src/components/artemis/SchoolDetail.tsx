'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';

interface Props {
  goToPage: (page: string, param?: string) => void;
  schoolName: string;
}

/* ─── School Data ─── */
const schoolData: Record<string, {
  description: string;
  longDescription: string;
  image: string;
  deanQuote: string;
  deanName: string;
  deanTitle: string;
  stats: { faculty: string; programs: string; research: string; students: string };
  highlights: { title: string; desc: string }[];
  researchAreas: string[];
  majors: string[];
}> = {
  "School of Natural Sciences": {
    description: "Understanding the physical and biological foundations of the natural world.",
    longDescription: "The School of Natural Sciences is the intellectual engine room of Artemis — where the fundamental laws of the universe are probed, tested, and reimagined. From the behaviour of subatomic particles to the dynamics of entire ecosystems, our scholars pursue questions that have driven human curiosity for millennia, armed with the most advanced experimental and computational tools ever built. The school's culture prizes precision, skepticism, and the willingness to follow evidence wherever it leads — even when the destination overturns centuries of assumption.",
    image: 'https://images.unsplash.com/photo-1579165466949-3180a3d056d5?auto=format&fit=crop&q=80&w=1400',
    deanQuote: "The universe does not reveal its secrets to the comfortable — only to those willing to look harder, think deeper, and accept that yesterday's certainties may be tomorrow's footnotes.",
    deanName: 'Prof. Elena Marchetti',
    deanTitle: 'Dean, School of Natural Sciences',
    stats: { faculty: '12', programs: '10', research: '$2M', students: '45' },
    highlights: [
      { title: 'Quantum Computing Lab', desc: "Home to one of the world's most advanced quantum annealing platforms, the QCL explores computational paradigms that could transform cryptography, drug discovery, and materials science within a decade." },
      { title: 'Biodiversity Mapping Initiative', desc: "A cross-continental effort to catalogue and model the planet's remaining biodiversity hotspots, combining satellite imagery, field genetics, and predictive AI to inform conservation policy in real time." },
      { title: 'Planetary Science Observatory', desc: 'Equipped with dedicated time on three major telescope arrays, the PSO contributes to the detection and characterization of exoplanets and the search for biosignatures beyond Earth.' },
    ],
    researchAreas: ['Quantum Information Science', 'Astrophysics & Cosmology', 'Molecular Biology', 'Environmental Systems', 'Pure Mathematics', 'Computational Chemistry'],
    majors: [
      "Biology (B.S.)", "Chemistry (B.S.)", "Physics (B.S.)", "Astronomy (B.S.)",
      "Applied Physics (B.S.)", "Environmental Science (B.S.)", "Geology (B.S.)",
      "Mathematics (B.S.)", "Agricultural Sciences (B.S.)", "Planetary Science (B.S.)"
    ],
  },
  "School of Engineering & Technology": {
    description: "Designing, building, and optimizing systems across software, data, machines, and materials.",
    longDescription: "The School of Engineering & Technology is where ambition meets execution. Our scholars do not simply study systems — they build them, break them, and rebuild them better. From sustainable infrastructure that withstands a changing climate to artificial intelligence systems that augment human capability, the school pushes the frontier of what can be built, tested, and deployed. Every student completes a capstone build project before graduation, ensuring that Artemis engineers leave with calloused hands and refined minds in equal measure.",
    image: 'https://images.unsplash.com/photo-1634947101456-d40e5122b048?auto=format&fit=crop&q=80&w=1400',
    deanQuote: "Engineering is not applied science — it is the discipline of making possible what was previously impossible. Our students learn to build the future, not just describe it.",
    deanName: 'Prof. Julian Sarkis',
    deanTitle: 'Dean, School of Engineering & Technology',
    stats: { faculty: '15', programs: '11', research: '$3M', students: '55' },
    highlights: [
      { title: 'Autonomous Systems Programme', desc: 'Developing self-governing robotic platforms for extreme environments — from deep-sea exploration to extraterrestrial construction — in partnership with the School of Natural Sciences.' },
      { title: 'Sustainable Materials Hub', desc: 'A dedicated facility for designing, testing, and scaling next-generation materials: bio-concrete, self-healing polymers, and carbon-negative composites for a decarbonizing world.' },
      { title: 'Forge Prototyping Lab', desc: 'State-of-the-art CNC machining, 3D printing, and electronics fabrication — where concepts become working prototypes in days, not months.' },
    ],
    researchAreas: ['Artificial Intelligence', 'Robotics & Mechatronics', 'Sustainable Infrastructure', 'Nanotechnology', 'Cybersecurity', 'Human-Computer Interaction'],
    majors: [
      "Mechanical Engineering (B.S.)", "Civil Engineering (B.S.)", "Chemical Engineering (B.S.)",
      "Software Engineering (B.S.)", "Computer Science (B.S.)", "Data Science (B.S.)",
      "Robotics (B.S.)", "Mechatronics (B.S.)", "Nanotechnology (B.S.)",
      "Architecture (B.S.)", "Design (B.A.)"
    ],
  },
  "School of Arts & Humanities": {
    description: "Exploring meaning through culture, language, time, and expression.",
    longDescription: "The School of Arts & Humanities is the soul of Artemis — the place where questions of meaning, beauty, justice, and truth are pursued with the same rigor that other schools bring to equations and experiments. Scholars here engage with the deepest questions of human existence while producing work that resonates far beyond the academy: novels that shift cultural conversation, philosophical arguments that reshape policy, historical research that reframes how we understand the present. The school's strength lies in its refusal to isolate the aesthetic from the political, the ancient from the digital, the personal from the universal.",
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1400',
    deanQuote: "A university without a vibrant humanities school is a factory, not an institution. We preserve the questions that make the answers worth seeking.",
    deanName: 'Prof. Amara Osei',
    deanTitle: 'Dean, School of Arts & Humanities',
    stats: { faculty: '10', programs: '14', research: '$1M', students: '30' },
    highlights: [
      { title: 'Comparative Civilization Centre', desc: "A research unit dedicated to tracing the threads that connect — and separate — the world's great intellectual traditions, from classical antiquity to contemporary global culture." },
      { title: 'Digital Humanities Studio', desc: 'Where computational tools meet cultural artifacts. Scholars use AI-assisted text analysis, 3D reconstruction, and network mapping to unlock insights hidden in vast archives.' },
      { title: 'Creative Writing Fellowship', desc: 'An annual cohort of twelve writers-in-residence who produce new work while mentoring undergraduate students in the craft of narrative, poetry, and dramatic writing.' },
    ],
    researchAreas: ['Philosophy of Mind', 'Comparative Literature', 'Digital Heritage', 'Performance Studies', 'Linguistic Anthropology', 'Visual Culture'],
    majors: [
      "Philosophy (B.A.)", "Comparative Literature (B.A.)", "Media & Communication Design (B.A.)",
      "History (B.A.)", "Art History (B.A.)", "Linguistics (B.A.)", "Theater & Performance (B.A.)",
      "Film & Media Studies (B.A.)", "Archaeology (B.A.)", "Art Practice (B.F.A.)",
      "Dance (B.F.A.)", "Classics (B.A.)", "Music (B.A.)", "Theater and Performance Studies (B.F.A.)"
    ],
  },
  "School of Social Sciences": {
    description: "Tackling global challenges through Anthropology, Political Science, Economics, and Urban Studies.",
    longDescription: "The School of Social Sciences examines the structures, behaviours, and institutions that shape human societies — producing research that informs public policy, governance, and social innovation. Scholars here work at the intersection of theory and practice, often embedded in real communities grappling with real challenges. Whether analyzing the macroeconomic dynamics of post-automation economies or studying the micro-politics of urban neighbourhoods, the school brings the same empirical rigor and ethical clarity that defines every Artemis discipline.",
    image: 'https://images.unsplash.com/photo-1570616969692-54d6ba3d0397?auto=format&fit=crop&q=80&w=1400',
    deanQuote: "The social sciences do not merely describe the world as it is — they illuminate the world as it could be, and provide the evidence base for building it.",
    deanName: 'Prof. Kwame Asante',
    deanTitle: 'Dean, School of Social Sciences',
    stats: { faculty: '9', programs: '6', research: '$1M', students: '25' },
    highlights: [
      { title: 'Urban Futures Initiative', desc: 'A cross-continental research programme studying how cities can adapt to climate migration, technological disruption, and demographic change — with pilot interventions in Valletta, Kigali, and Vancouver.' },
      { title: 'Governance Innovation Lab', desc: 'Designing and testing new models of democratic participation, digital governance, and institutional accountability for the twenty-first century.' },
      { title: 'Global Inequality Research Cluster', desc: 'Quantifying and analyzing the drivers of economic, health, and educational inequality worldwide, with a focus on policy-relevant findings.' },
    ],
    researchAreas: ['Behavioral Economics', 'Computational Social Science', 'Urban Governance', 'Political Theory', 'Anthropological Methods', 'Social Network Analysis'],
    majors: [
      "Anthropology (B.A.)", "Political Science (B.A.)", "Urban Studies (B.A.)",
      "Economics (B.A.)", "Global Governance & Systems (B.A.)", "Social Innovation & Design (B.A.)"
    ],
  },
  "School of Health & Medicine": {
    description: "Advancing human wellness, biological systems, and healthcare technologies with a focus on bioethics.",
    longDescription: "The School of Health & Medicine integrates biomedical science, clinical practice, public health, and bioethics into a single, cohesive programme. From molecular biology to population-wide health interventions, scholars advance discoveries that improve lives across the globe — always guided by a deep commitment to ethical practice and equitable access. The school trains physicians, researchers, and health-system leaders who understand that health is not merely the absence of disease but the presence of conditions that allow every human being to flourish.",
    image: 'https://images.unsplash.com/photo-1514416205405-075ab2f15964?auto=format&fit=crop&q=80&w=1400',
    deanQuote: "Medicine without ethics is technology. Ethics without medicine is philosophy. We train practitioners who embody both — and who understand that health equity is the measure of a civilization.",
    deanName: 'Dr. Fatima Al-Rashid',
    deanTitle: 'Dean, School of Health & Medicine',
    stats: { faculty: '11', programs: '8', research: '$2M', students: '35' },
    highlights: [
      { title: 'Precision Medicine Programme', desc: 'Leveraging genomic data, AI diagnostics, and personalized treatment protocols to move beyond one-size-fits-all medicine toward care tailored to the individual.' },
      { title: 'Global Health Equity Centre', desc: 'Researching and advocating for health systems that serve all populations — regardless of geography, income, or social status — with active programmes in twelve countries.' },
      { title: 'Bio-Regenerative Tissue Lab', desc: 'Pioneering the cultivation of engineered tissue scaffolds designed to accelerate wound healing in extreme environments, from deep-sea habitats to off-world colonies.' },
    ],
    researchAreas: ['Genomics & Precision Health', 'Global Health Systems', 'Neuroscience', 'Bioethics', 'Regenerative Medicine', 'Epidemiological Modelling'],
    majors: [
      "Neuroscience (B.S.)", "Public Health (B.S.)", "Biomedical Engineering (B.S.)",
      "Nutrition Science (B.S.)", "Genetics (B.S.)", "Immunobiology (B.S.)",
      "Biomedical Computation (B.S.)", "Food Systems (B.S.)"
    ],
  },
  "School of Education & Human Development": {
    description: "Advancing learning science, educational ecosystems, and meta-learning strategies.",
    longDescription: "The School of Education & Human Development studies how people learn, grow, and adapt — and trains the next generation of educators and policymakers to build more effective, equitable learning systems worldwide. Artemis itself serves as a living laboratory for educational innovation, making this school uniquely positioned to test and refine new models in real time. The school's research spans cognitive neuroscience, curriculum design, educational technology, and the sociology of knowledge — always with an eye toward practical impact in real classrooms and communities.",
    image: 'https://images.unsplash.com/photo-1630480330188-1818487a2426?auto=format&fit=crop&q=80&w=1400',
    deanQuote: "If we cannot reinvent how we learn, we cannot reinvent anything else. Education is the meta-discipline — the one that shapes the capacity for all the others.",
    deanName: 'Prof. Lena Johansson',
    deanTitle: 'Dean, School of Education & Human Development',
    stats: { faculty: '7', programs: '6', research: '$0.5M', students: '18' },
    highlights: [
      { title: 'Meta-Learning Research Unit', desc: 'Studying the science of learning how to learn — developing frameworks, tools, and assessments that help students become more effective, autonomous learners.' },
      { title: 'Cognitive Development Lab', desc: 'Investigating how the brain constructs knowledge across the lifespan, with implications for early childhood intervention, adult reskilling, and neurodivergent education.' },
      { title: 'Global Teacher Leadership Programme', desc: 'An intensive fellowship that equips experienced educators with the research skills, policy knowledge, and leadership capacity to drive systemic change in their home institutions.' },
    ],
    researchAreas: ['Cognitive Science of Learning', 'Educational Technology', 'Curriculum Theory', 'Developmental Psychology', 'Educational Policy', 'Assessment & Measurement'],
    majors: [
      "Education (B.A.)", "Learning Design & Technology (B.A.)", "Cognitive Science (B.A.)",
      "Developmental Psychology (B.A.)", "Educational Leadership (B.A.)", "Childhood & Human Development (B.A.)"
    ],
  },
  "School of Business": {
    description: "Developing leadership in international commerce, finance, analytics, and entrepreneurial systems.",
    longDescription: "The School of Business cultivates principled, innovative leaders who can navigate complexity and drive value creation in an era of rapid technological and social change. The curriculum is anchored in ethical reasoning and global perspective, ensuring that Artemis business graduates lead with both competence and conscience. From sustainable finance to supply chain resilience, from startup incubation to corporate governance reform, the school produces scholarship and practitioners who understand that long-term value creation requires more than quarterly thinking.",
    image: 'https://images.unsplash.com/photo-1613592237001-84fb727ce569?auto=format&fit=crop&q=80&w=1400',
    deanQuote: "The purpose of business education is not to produce maximizers of profit, but cultivators of value — leaders who understand that markets serve society, not the reverse.",
    deanName: 'Prof. David Chen',
    deanTitle: 'Dean, School of Business',
    stats: { faculty: '8', programs: '6', research: '$1M', students: '22' },
    highlights: [
      { title: 'Venture Studio Incubator', desc: 'A structured programme that transforms student and faculty ideas into investable ventures, providing seed funding, mentorship, and access to the Artemis network of 40+ industry partners.' },
      { title: 'Sustainable Finance Initiative', desc: 'Researching and promoting financial instruments, ESG frameworks, and investment strategies that align capital allocation with long-term ecological and social outcomes.' },
      { title: 'Global Supply Chain Observatory', desc: 'A real-time monitoring and research platform tracking supply chain disruptions, resilience strategies, and the geopolitical dynamics that shape global commerce.' },
    ],
    researchAreas: ['Entrepreneurial Strategy', 'Sustainable Finance', 'Behavioral Decision-Making', 'Supply Chain Analytics', 'Organizational Leadership', 'Digital Transformation'],
    majors: [
      "International Business (B.S.)", "Finance (B.S.)", "Business Analytics (B.S.)",
      "Supply Chain & Logistics (B.S.)", "Consulting & Strategy (B.S.)", "Entrepreneurship (B.S.)"
    ],
  },
};

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

const schoolNavSections = [
  { id: 'school-about', label: 'About' },
  { id: 'school-highlights', label: 'Highlights' },
  { id: 'school-programs', label: 'Programs' },
  { id: 'school-research', label: 'Research' },
];

/* ─── Component ─── */
export default function SchoolDetail({ goToPage, schoolName }: Props) {
  const data = schoolData[schoolName];
  const highlightsAnim = useInView();
  const programsAnim = useInView();
  const researchAnim = useInView();
  const activeSection = useActiveSection(schoolNavSections.map(s => s.id));
  
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  // Fallback for unknown schools
  if (!data) {
    return (
      <div className="flex flex-col bg-white">
        <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 pt-16 py-16 lg:py-24">
          <h1 className="text-[48px] font-extrabold leading-[1.05] tracking-tighter text-gray-900 mb-8 uppercase">
            {schoolName}
          </h1>
          <p className="text-[18px] text-gray-600 leading-relaxed mb-12">
            An Artemis College academic school. More information about this school will be available soon.
          </p>
          <button
            onClick={() => goToPage('colleges')}
            className="flex items-center space-x-4 py-3 border-b-2 border-[#8A0000] text-[#8A0000] text-[13px] font-bold uppercase tracking-[0.2em] hover:text-black hover:border-black transition-all group"
          >
            <span>Back to All Schools</span>
            <svg className="group-hover:translate-x-2 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
        <SubPageFooter goToPage={goToPage} />
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white">
      {/* ── 1. HERO ── */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[45vh] min-h-[360px] overflow-hidden">
        <motion.img
          src={data.image}
          alt={schoolName}
          style={{ y: heroY }}
          className="absolute inset-x-0 -top-[20%] w-full h-[140%] object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-8 lg:px-20 pb-16">
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Our Colleges
            </span>
          </div>
          <h1 className="text-[40px] md:text-[52px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6 uppercase">
            {schoolName}
          </h1>
          <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light">
            {data.description}
          </p>
        </div>
          </div>
        </div>
      </section>

      {/* On This Page Nav */}
      <OnThisPageNav sections={schoolNavSections} activeSection={activeSection} />

      {/* ── 2. ABOUT THE SCHOOL ── */}
      <section id="school-about" className="scroll-mt-[110px] max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24">
        {/* Section divider */}
        <div className="mb-6 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                About the School
              </span>
            </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — Text */}
          <div>
            <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
              Where depth meets<br />discovery
            </h2>
            <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
              {data.longDescription}
            </p>
          </div>

          {/* Right — Dean Quote + Stats */}
          <div>
            <div className="border-l-4 border-[#8A0000] pl-6 py-2 mb-10">
              <p className="text-[20px] font-bold text-[#141414] leading-tight mb-3 italic">
                &ldquo;{data.deanQuote}&rdquo;
              </p>
              <p className="text-[12px] font-bold uppercase tracking-widest text-[#8A0000]">
                {data.deanName}
              </p>
              <p className="text-[12px] text-gray-500">{data.deanTitle}</p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="relative pl-5 border-l-2 border-[#8A0000]">
                <div className="text-[28px] font-black text-[#141414] leading-none tabular-nums">{data.stats.faculty}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mt-1">Faculty</div>
              </div>
              <div className="relative pl-5 border-l-2 border-[#8A0000]">
                <div className="text-[28px] font-black text-[#141414] leading-none tabular-nums">{data.stats.programs}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mt-1">Programs</div>
              </div>
              <div className="relative pl-5 border-l-2 border-[#8A0000]">
                <div className="text-[28px] font-black text-[#141414] leading-none tabular-nums">{data.stats.research}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mt-1">Research</div>
              </div>
              <div className="relative pl-5 border-l-2 border-[#8A0000]">
                <div className="text-[28px] font-black text-[#141414] leading-none tabular-nums">{data.stats.students}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mt-1">Students</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. HIGHLIGHTS ── */}
      <section id="school-highlights" className="scroll-mt-[110px] bg-gray-50 py-16 lg:py-24">
        <div
          ref={highlightsAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${highlightsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Highlights</span>
          </div>

          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            Signature programmes &amp; facilities
          </h2>
          <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl mb-12">
            Each school within Artemis houses world-class facilities and flagship programmes that define its contribution to the university's research and teaching mission.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.highlights.map((highlight, i) => (
              <div key={i} className="bg-white p-8 border border-gray-200 hover:border-[#8A0000] transition-all shadow-sm hover:shadow-md">
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-4 uppercase">
                  0{i + 1}
                </div>
                <h3 className="text-[20px] font-bold text-[#141414] mb-4 leading-tight">
                  {highlight.title}
                </h3>
                <p className="text-[14px] text-gray-600 leading-relaxed">
                  {highlight.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PROGRAMS OF STUDY ── */}
      <section id="school-programs" className="scroll-mt-[110px] py-16 lg:py-24">
        <div
          ref={programsAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${programsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Section divider */}
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">Programs of Study</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
            <div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
                Programs of study
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed">
                The {schoolName} offers {data.majors.length} undergraduate programs spanning the full breadth of the discipline. Each program combines rigorous academic training with hands-on research experience, preparing graduates for careers in academia, industry, and public service.
              </p>
            </div>
            <div>
              <button
                onClick={() => goToPage('programs')}
                className="flex items-center space-x-4 py-3 border-b-2 border-[#8A0000] text-[#8A0000] text-[13px] font-bold uppercase tracking-[0.2em] hover:text-black hover:border-black transition-all group"
              >
                <span>View Full Course Catalog</span>
                <svg className="group-hover:translate-x-2 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.majors.map((major, idx) => (
              <button
                key={idx}
                onClick={() => goToPage('program_detail', major)}
                className="group p-5 border border-gray-200 hover:border-[#8A0000] transition-all text-left bg-white hover:shadow-sm"
              >
                <span className="text-[15px] font-bold text-gray-900 group-hover:text-[#8A0000] transition-colors block mb-3 leading-tight">
                  {major}
                </span>
                <svg className="w-4 h-4 text-gray-300 group-hover:text-[#8A0000] group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. RESEARCH AREAS ── */}
      <section id="school-research" className="scroll-mt-[110px] bg-gray-50 py-16 lg:py-24">
        <div
          ref={researchAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-8 lg:px-20 transition-all duration-700 ${researchAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Research</span>
          </div>

          <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            Research focus areas
          </h2>
          <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl mb-12">
            The school's research agenda is organized around interdisciplinary focus areas that reflect the most pressing questions and promising opportunities in the field.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.researchAreas.map((area, i) => (
              <div
                key={i}
                className="group p-6 bg-white border border-gray-200 hover:border-[#8A0000] transition-all cursor-pointer"
                onClick={() => goToPage('research')}
              >
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">
                  0{i + 1}
                </div>
                <h4 className="text-[15px] font-bold text-[#141414] group-hover:text-[#8A0000] transition-colors leading-tight">
                  {area}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CARD-AND-IMAGE PARALLAX ── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-20">
          <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full min-h-[380px] md:min-h-[460px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1624555130296-e551faf8969b?auto=format&fit=crop&q=80&w=1400"
              alt="Cross-school collaboration"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="relative z-10 flex items-end h-full min-h-[380px] md:min-h-[460px] p-5 sm:p-8 md:p-14">
              <div className="bg-white max-w-sm p-5 sm:p-8 shadow-xl">
                <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">Cross-School Collaboration</div>
                <h3 className="text-[24px] font-bold text-[#141414] mb-3 leading-tight">Beyond disciplinary borders</h3>
                <p className="text-[14px] text-gray-600 leading-relaxed mb-5">
                  The {schoolName.split(' ').slice(-1)[0]} does not work in isolation. Faculty hold joint appointments, students cross-register freely, and research teams are assembled from wherever the relevant expertise resides across the seven schools.
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

      {/* ── 7. CRIMSON CTA BAR ── */}
      <section className="bg-[#8A0000] py-16 px-8 lg:px-20">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-[28px] md:text-[36px] font-extrabold leading-tight tracking-tighter text-white mb-2">
              Ready to join the {schoolName.split(' ').slice(-1)[0]}?
            </h2>
            <p className="text-[16px] text-white/70 leading-relaxed max-w-lg">
              Explore our programs, meet our faculty, and discover how the {schoolName} can shape your academic journey and career trajectory.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <button
              onClick={() => goToPage('admissions')}
              className="px-8 py-3 border-2 border-white text-white font-bold uppercase text-[12px] tracking-widest hover:bg-white hover:text-[#8A0000] transition-colors"
            >
              Apply Now
            </button>
            <button
              onClick={() => goToPage('programs')}
              className="px-8 py-3 border-2 border-white text-white font-bold uppercase text-[12px] tracking-widest hover:bg-white hover:text-[#8A0000] transition-colors"
            >
              View Programs
            </button>
          </div>
        </div>
      </section>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
