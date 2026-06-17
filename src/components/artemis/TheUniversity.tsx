'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';
import { ChevronRight, ArrowRight } from 'lucide-react';

interface Props {
  goToPage: (page: string) => void;
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

/* ─── Data ─── */
const sectionLinks = [
  { title: 'Our history', link: 'history' },
  { title: 'Facts and figures', link: 'facts' },
  { title: 'Artemis Glossary', link: 'glossary' },
  { title: 'Our estate', link: 'estate' },
  { title: 'Brand', link: 'brand' },
];

const schools = [
  {
    name: 'School of Natural Sciences',
    desc: 'Encompassing physics, chemistry, biology, mathematics, and environmental science. The School of Natural Sciences drives fundamental research into the laws governing the universe, from quantum mechanics to ecosystem dynamics, equipping students with rigorous analytical frameworks and hands-on laboratory experience.',
  },
  {
    name: 'School of Engineering & Technology',
    desc: 'Spanning computer science, electrical engineering, mechanical engineering, and materials science. This school pushes the frontier of what can be built — from sustainable infrastructure to artificial intelligence systems — blending theoretical foundations with the practical imperative to solve real-world problems.',
  },
  {
    name: 'School of Arts & Humanities',
    desc: 'Covering literature, philosophy, history, linguistics, and the fine arts. The School of Arts & Humanities preserves and advances the traditions of critical inquiry, creative expression, and cultural understanding that form the intellectual bedrock of any great university.',
  },
  {
    name: 'School of Social Sciences',
    desc: 'Bringing together economics, political science, sociology, anthropology, and psychology. The School of Social Sciences examines the structures, behaviors, and institutions that shape human societies — producing research that informs public policy, governance, and social innovation.',
  },
  {
    name: 'School of Health & Medicine',
    desc: 'Integrating biomedical science, clinical practice, public health, and bioethics. This school trains the next generation of physicians, researchers, and health-system leaders, advancing discoveries from the molecular level to population-wide health interventions.',
  },
  {
    name: 'School of Education & Human Development',
    desc: 'Focusing on pedagogy, cognitive science, educational leadership, and human development across the lifespan. The school studies how people learn and grow, preparing educators and policymakers to build more effective, equitable learning systems worldwide.',
  },
  {
    name: 'School of Business',
    desc: 'Encompassing finance, strategy, entrepreneurship, and organizational leadership. The School of Business cultivates principled, innovative leaders who can navigate complexity and drive value creation in an era of rapid technological and social change.',
  },
];

const coreValues = [
  {
    title: 'Concern for Others',
    desc: 'Rooted in the African principle of Ubuntu — the belief in a universal bond of sharing that connects all humanity. We recognise that our individual flourishing is inseparable from the flourishing of others, and we build this conviction into every programme, policy, and partnership at Artemis.',
    icon: '♥',
  },
  {
    title: 'Adventurous & Open-Minded',
    desc: 'We look beyond present situations and challenge ourselves to think outside the box. The unknown is not a threat — it is an invitation. We cultivate intellectual courage, encouraging every member of our community to venture into unfamiliar territory and return with new perspective.',
    icon: '◈',
  },
  {
    title: 'Open Communication',
    desc: 'Information and ideas are the most valuable currency and should be shared generously. We communicate openly, honestly, and respectfully — and we make up for boldness with people willing to listen. Those who listen well are happier, and the people around them are better off.',
    icon: '◉',
  },
  {
    title: 'Creativity, Innovation & Excellence',
    desc: 'In all disciplines of study, made possible by the unconventional pursuit of knowledge, far transfer of theories into life-changing solutions, engaging with our host societies on collaborative projects and amplifying impact across the globe. Excellence is not a benchmark — it is a habit.',
    icon: '✦',
  },
  {
    title: 'Learning Continuously',
    desc: 'We recognise that learning is essential for adapting to changes in a dynamic world. We create knowledge and outsource insights to inform the daily operations of the university. Every experience — inside or outside the classroom — is an opportunity to grow.',
    icon: '⟲',
  },
  {
    title: 'Global Citizenship',
    desc: 'Among all members of the Artemis community, we facilitate non-discrimination, respect for diversity, and solidarity for humanity. This creates a sense of belonging among people with common goals — a community that transcends borders and embraces the full spectrum of human experience.',
    icon: '◎',
  },
];

const guidingPrinciples = [
  {
    title: 'Imagination',
    maxim: 'Develop and put to use your imaginative capacities, at all levels of the university.',
    desc: 'We develop and put to use our imaginative capacities across all levels — unlike traditional universities that have become bureaucracies with corporate tendencies that have dwarfed their imaginative powers. Our possibilities are neither there in the world to be read off nor yet discovered, but exist as an idea to be discovered. It takes a collective imaginative effort within our community to draw an image of what it might be. Such a practical imagination allows for the emergence of projects within our host societies.',
  },
  {
    title: 'Nurturing Curiosity',
    maxim: 'The more we know, the less we truly understand.',
    desc: 'We are deeply curious about ourselves and the world. Even when we think we have a full comprehension of something, we do not stop remaining curious about it. We act with the notion that the more we know, the less we truly understand. Yet we balance this by creating things and testing our understanding while simultaneously helping others to understand.',
  },
  {
    title: 'Active Concern',
    maxim: 'Strive to live out your concerns for the world.',
    desc: 'The University of Artemis has a concern for the whole Earth, and lives out this concern, with the difficulties that this concern will bring. This might open us to unsettled claims when controversial issues appear in the curriculum, but our concerns for persons\' learning ecologies to fully flourish orients us towards deliberately placing students in a pedagogical environment that may be personally stretching and discomfiting.',
  },
  {
    title: 'Deeply Human',
    maxim: 'We are each dependent upon one another and thus responsible for each other and future generations.',
    desc: 'We act with the understanding that we are each dependent upon one another and thus responsible for each other and future generations. The human animal was made to be in tribes. We want to foster a community that unites us as a human race and impacts us all positively. We act with care, consideration, and openness to others\' cultures, perspectives, and ideas. We use emotional intelligence to create deep, meaningful relationships. We understand human psychology, neuroscience, and motivations and seek to meet people where they are.',
  },
  {
    title: 'Exploration',
    maxim: 'An exploring university — never content to reside within boundaries.',
    desc: 'We always continue to explore possibilities for realising the potential of our academy in the world. The University of Artemis is an exploring university and we are never content to reside within our boundaries — of knowledge, academic identity, understanding, position, relationships with the world or pedagogical relationships. We are always self-critical, exploring possibilities for ourselves in the world. Our ventures forth, stretching into new spaces.',
  },
  {
    title: 'Wellbeing of the World',
    maxim: 'Continuously increase well-being in the world and its ecosystems.',
    desc: 'We aim to continuously increase well-being in the world, mostly guided by a determination to increase well-being in the world, especially the well-being of each of the ecosystems in which we are especially implicated. This opens us to profound challenges — there will be disputes both within and the wider world over both the meaning of well-being and its source and legitimation. "Wellbeing" acts as an ideational umbrella, under which competing insights can coexist, even if uneasily.',
  },
];

const goalsForEducation = [
  {
    title: 'Developing Centrally Important Human Values',
    desc: 'Education should help students develop important human values and strategies to evaluate arguments and make independent choices in this noisy world full of disorientations and unexpected changes. "Philosophical habits of mind" should be formed through the learning process to serve as a foundation in navigating future endeavours, whether in life, at work, or in the case of global insurgencies.',
  },
  {
    title: 'Pursuit for Universal Knowledge',
    desc: 'We are guided by the principle of branches of knowledge being one whole — hence the commitment to explore the boundaries of all disciplines while appreciating the advancements made by past and present institutions of learning. Actual change happens when useful knowledge is transferred and disseminated into the world population for good intentions of solving the most pressing issues of our societies.',
  },
  {
    title: 'Wellbeing of the World',
    desc: 'The University of Artemis aims to continually increase well-being within our community as well as the rest of the world since we are all implicated in the ecologies. We believe that education should help students develop centrally important human values, and strategies to be able to evaluate arguments and make independent choices in this noisy world full of disorientation and changes in society.',
  },
  {
    title: 'Academic Freedom',
    desc: 'Committed to creating spaces that afford both students and faculty the freedom to enjoy academic freedom. It is fundamental for driving self-discovery and the unconventional pursuit of knowledge — which is crucial for meeting the teaching and learning parties involved in the entire cycle of transfer. A student will venture into various ecosystems in which they are embedded through readings, field trips, intercultural exchange, and cross-disciplinary endeavours — hence creating infinite opportunities.',
  },
  {
    title: 'One School, Multiple Campuses',
    desc: 'The University of Artemis will focus on investment in real estate to establish decentralized residential colleges — learning and living centres in major cities across the globe. Spaces will serve to foster close, intimate associations of students, faculty, and host communities, hence creating multiple intellectual associations where conversations drive personal development, the connection of interdisciplinary ideas, and forge lifelong relations.',
  },
  {
    title: 'Gain a Global Mindset',
    desc: 'In an increasingly interconnected world, students need more than just settling within closed campus walls during their course of studying. We will combine travel to multiple global centres and remote learning to immerse students into new environments and help them discover themselves while developing soft skills required for their professional development — such as adaptability, resilience, cultural awareness, self-sufficiency and independence, curiosity, and ability to work with people from diverse backgrounds.',
  },
  {
    title: 'Fostering Innovations',
    desc: 'Our world is filled with enormous challenges that affect the well-being of populations — but these same challenges present potential opportunities for highly motivated individuals to come up with novel solutions. We believe education is an active force for exploring new ideas and answering questions that have remained unanswered in society. Students should be exposed to the mindsets and tools to craft solutions to these long-lasting challenges, both locally and globally.',
  },
];

const accreditationBodies = [
  { region: 'United Kingdom', bodies: ['Quality Assurance Agency for Higher Education (QAA)', 'British Accreditation Council (BAC)'] },
  { region: 'United States', bodies: ['Middle States Commission on Higher Education (MSCHE)', 'Western Association of Schools and Colleges (WASC)'] },
  { region: 'Asia', bodies: ['Asia-Pacific Quality Network (APQN)', 'National Assessment and Accreditation Council (NAAC) — India'] },
  { region: 'Africa', bodies: ['Council for Higher Education Accreditation (CHEA)', 'Association of African Universities (AAU)'] },
];

const academicPartners = [
  { name: 'University of Oxford', location: 'UK' },
  { name: 'Massachusetts Institute of Technology (MIT)', location: 'USA' },
  { name: 'National University of Singapore (NUS)', location: 'Singapore' },
  { name: 'University of Cape Town', location: 'South Africa' },
];

/* ─── Component ─── */
export default function TheUniversity({ goToPage }: Props) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  const visionAnim = useInView();
  const valuesAnim = useInView();
  const principlesAnim = useInView();
  const missionAnim = useInView();
  const goalsAnim = useInView();
  const accreditationAnim = useInView();
  const microCollegesAnim = useInView();
  const roleAnim = useInView();
  const schoolsAnim = useInView();
  const pressAnim = useInView();
  const lifelongAnim = useInView();
  const activeSection = useActiveSection(['vision', 'values', 'mission', 'principles', 'goals', 'micro-colleges', 'schools', 'press', 'lifelong-learning']);

  return (
    <div className="flex flex-col bg-white">

      {/* ── Hero Section ── */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[45vh] min-h-[360px] overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1523240715630-34360e206004?auto=format&fit=crop&q=80&w=1800"
          className="absolute inset-x-0 -top-[20%] w-full h-[140%] object-cover grayscale"
          style={{ y: heroY }}
          alt="The University of Artemis"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-16">
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              About Artemis
            </span>
          </div>
          <h1 className="text-[32px] sm:text-[44px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6 uppercase">
            The University
          </h1>
          <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light">
            The University of Artemis is a federated network of autonomous micro-colleges — a
            decentralized, global institution founded in 2024 by Abraham Kyeyune, reimagining the
            ancient guild model of the universitas for the digital age.
          </p>
        </div>
          </div>
        </div>
      </section>

      <OnThisPageNav
        sections={[
          { id: 'vision', label: 'Vision' },
          { id: 'values', label: 'Values' },
          { id: 'mission', label: 'Mission' },
          { id: 'principles', label: 'Principles' },
          { id: 'goals', label: 'Goals' },
          { id: 'accreditation', label: 'Accreditation' },
          { id: 'micro-colleges', label: 'Micro-Colleges' },
          { id: 'schools', label: 'Schools' },
          { id: 'press', label: 'Press' },
          { id: 'lifelong-learning', label: 'Lifelong Learning' },
        ]}
        activeSection={activeSection}
      />

      {/* ── Pages in This Section ── */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
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

      {/* ── Our Vision ── */}
      <section id="vision" className="scroll-mt-[110px] max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 py-16 lg:py-24">
        <div
          ref={visionAnim.ref}
          className={`transition-all duration-700 ${visionAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Our Vision
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                A new era of shared fate
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                In a flicker of historical time, humanity has evolved into a powerful force of change beyond what past generations could have ever imagined — from mapping the human genome to landing a man on the moon — we are witnessing a new era in which the defining feature is that of a species that is bound to the same fate.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                The University of Artemis is founded as an institution for the whole earth to help contribute positively towards human progress for both the present and future generations. We believe that of all inventions of human origin, education is a great equalizer and public good that can be used in building a better and just world in which everyone has access to the future we desire.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed">
                Our world has entered a new phase of civilisation — an epochal moment of accelerated change in which the long threads of interdependence — economic, political, social, and environmental — are binding the planet&apos;s people into a single community of fate.
              </p>
            </div>
            <div className="bg-[#8A0000] p-8 md:p-12 flex flex-col justify-center">
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 mb-6">
                Vision Statement
              </div>
              <p className="text-[20px] sm:text-[24px] font-bold text-white leading-snug mb-6">
                The University of Artemis is founded as an institution for the whole earth — to help contribute positively towards human progress for both the present and future generations.
              </p>
              <p className="text-[14px] text-white/70 leading-relaxed">
                We believe that education is a great equalizer and public good that can be used in building a better and just world in which everyone has access to the future we desire.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section id="values" className="scroll-mt-[110px] bg-gray-50 py-16 lg:py-24">
        <div
          ref={valuesAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${valuesAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              What We Value
            </span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            Core Values
          </h2>
          <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl mb-12">
            Core values are central to the culture and practices among our community of scholars, students, the communities that host our campuses, and the entire world. They guide every decision we make and every programme we build.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, i) => (
              <div key={i} className="group bg-white p-6 md:p-8 border border-gray-200 hover:border-[#8A0000] transition-all hover:shadow-sm flex flex-col">
                <div className="w-10 h-10 bg-[#8A0000]/[0.07] border border-[#8A0000]/20 flex items-center justify-center mb-5 group-hover:bg-[#8A0000]/[0.14] transition-colors text-[16px] text-[#8A0000]">
                  {value.icon}
                </div>
                <h3 className="text-[16px] font-bold text-[#141414] group-hover:text-[#8A0000] transition-colors leading-snug mb-3">
                  {value.title}
                </h3>
                <p className="text-[13px] text-gray-500 leading-relaxed flex-1">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section id="mission" className="scroll-mt-[110px] max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 py-16 lg:py-24">
        <div
          ref={missionAnim.ref}
          className={`transition-all duration-700 ${missionAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Our Mission
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                Mission
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                The mission of the University of Artemis is to enable individuals to place themselves in relation to the world. This is possible through the strong urge to foster an unconventional pursuit of knowledge that informs us to craft authentic transformative learning experiences.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed">
                We build inclusive decentralized learning environments worldwide to nurture deeply human global citizens, change-makers, innovators, artists, scientists, leaders, outliers, and futurists that are philosophically habituated to make connections between self-knowledge and broader social issues across all sectors.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="border-l-2 border-[#8A0000] pl-8">
                <p className="text-[18px] font-bold text-[#141414] leading-snug mb-4 italic">
                  &ldquo;To enable individuals to place themselves in relation to the world — through the unconventional pursuit of knowledge that crafts authentic transformative learning experiences.&rdquo;
                </p>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000]">
                  Artemis Mission Statement
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Guiding Principles ── */}
      <section id="principles" className="scroll-mt-[110px] bg-gray-50 py-16 lg:py-24">
        <div
          ref={principlesAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${principlesAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Our Guiding Principles
            </span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            Guiding Principles
          </h2>
          <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl mb-12">
            Artemis is designed to be ecological from within itself and the rest of the world — it lives from the earth and strives to do all for the whole earth, especially through its implications in the various ecosystems within which it is situated. These principles are not aspirational — they are structural.
          </p>

          <div className="space-y-8">
            {guidingPrinciples.map((principle, i) => (
              <div key={i} className="bg-white p-6 md:p-10 border border-gray-200 hover:border-[#8A0000]/40 transition-all">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
                  <div className="lg:w-[200px] shrink-0">
                    <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-2 uppercase">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-[20px] font-bold text-[#141414] leading-snug mb-3">
                      {principle.title}
                    </h3>
                    <p className="text-[12px] text-[#8A0000] font-semibold leading-relaxed italic">
                      &ldquo;{principle.maxim}&rdquo;
                    </p>
                  </div>
                  <div className="flex-1 border-l-0 lg:border-l border-gray-200 lg:pl-12">
                    <p className="text-[15px] text-gray-600 leading-relaxed">
                      {principle.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Goals for Education ── */}
      <section id="goals" className="scroll-mt-[110px] max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 py-16 lg:py-24">
        <div
          ref={goalsAnim.ref}
          className={`transition-all duration-700 ${goalsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Education
            </span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            Goals for Education
          </h2>
          <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl mb-12">
            Our purpose ignites through the mission of enabling individuals to place themselves in relation to the world. Education should help students develop important human values and strategies to evaluate arguments and make independent choices in this noisy world full of disorientations and unexpected changes. &ldquo;Philosophical habits of mind&rdquo; should be formed through the learning process to serve as a foundation in navigating future endeavours.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goalsForEducation.map((goal, i) => (
              <div key={i} className="group p-6 md:p-8 border border-gray-200 hover:border-[#8A0000] transition-all hover:shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 bg-[#8A0000]/[0.07] border border-[#8A0000]/20 flex items-center justify-center group-hover:bg-[#8A0000]/[0.14] transition-colors">
                    <span className="text-[10px] font-black text-[#8A0000]">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#141414] group-hover:text-[#8A0000] transition-colors leading-snug mb-3">
                      {goal.title}
                    </h3>
                    <p className="text-[13px] text-gray-500 leading-relaxed">
                      {goal.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Accreditation and Partnerships ── */}
      <section id="accreditation" className="scroll-mt-[110px] bg-gray-50 py-16 lg:py-24">
        <div
          ref={accreditationAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${accreditationAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Quality Assurance
            </span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
            Accreditation and Partnerships
          </h2>
          <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl mb-12">
            Our university is actively pursuing accreditation from several key accreditation bodies across different regions to ensure our programmes meet the highest standards of quality and rigour. We are committed to transparency and will provide updates on our accreditation status as we make progress.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
            {/* Accreditation */}
            <div>
              <div className="mb-6 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                  Accreditation (Pending)
                </span>
              </div>
              <div className="space-y-6">
                {accreditationBodies.map((region, i) => (
                  <div key={i} className="bg-white p-6 border border-gray-200">
                    <div className="text-[10px] font-bold text-[#8A0000] uppercase tracking-widest mb-3">
                      {region.region}
                    </div>
                    <ul className="space-y-2">
                      {region.bodies.map((body, j) => (
                        <li key={j} className="text-[14px] text-gray-600 leading-relaxed flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8A0000] mt-2 shrink-0"></span>
                          {body}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Partnerships */}
            <div>
              <div className="mb-6 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                  Academic and Industry Partners
                </span>
              </div>

              {/* Academic Partners */}
              <div className="bg-white p-6 border border-gray-200 mb-6">
                <div className="text-[10px] font-bold text-[#8A0000] uppercase tracking-widest mb-4">
                  Academic Partners
                </div>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-4">
                  Our academic partnerships include collaborations with top universities and research institutions around the world. These partnerships enable joint research initiatives, student and faculty exchange programmes, and access to cutting-edge resources and expertise.
                </p>
                <ul className="space-y-3">
                  {academicPartners.map((partner, i) => (
                    <li key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <span className="text-[14px] font-bold text-[#141414]">{partner.name}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{partner.location}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Industry Partners */}
              <div className="bg-white p-6 border border-gray-200">
                <div className="text-[10px] font-bold text-[#8A0000] uppercase tracking-widest mb-4">
                  Industry Partners
                </div>
                <p className="text-[13px] text-gray-500 leading-relaxed">
                  Our industry partnerships provide students with practical, real-world experiences and opportunities to engage with leading companies in various sectors. These collaborations include internships, project-based learning, and direct engagement with industry experts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Micro-Colleges ── */}
      <section id="micro-colleges" className="scroll-mt-[110px] max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-24">
        <div
          ref={microCollegesAnim.ref}
          className={`transition-all duration-700 ${microCollegesAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Academic Structure
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5">
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
                The Micro-Colleges
              </h2>
            </div>
            <div className="md:col-span-7">
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                At the heart of Artemis lie its <strong className="text-[#141414]">twenty micro-colleges</strong> —
                autonomous academic units bound together within a single institution. Each micro-college
                is self-governing, with its own identity, faculty, and traditions, yet all share a
                unified curriculum and digital infrastructure that binds the network into one coherent
                academic body.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Unlike the monolithic departments of traditional universities, Artemis micro-colleges
                are intimate scholarly communities — small enough that every student is known by name,
                yet large enough in collective ambition to rival any institution on Earth. They are the
                living embodiment of the ancient collegial ideal: a guild of scholars living and
                learning together.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-8">
                Each micro-college selects and admits its own students, provides housing and communal
                life, and delivers the close personal tutorial mentorship that defines the Artemis
                educational experience. Together, they form the human backbone of the University.
              </p>

              <div className="aspect-[16/9] rounded-lg overflow-hidden bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1523240715630-34360e206004?auto=format&fit=crop&q=80&w=1200"
                  className="w-full h-full object-cover grayscale brightness-90 hover:brightness-100 hover:grayscale-0 transition-all duration-500"
                  alt="Artemis Micro-Colleges"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Role of Micro-Colleges and the Network ── */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <div
            ref={roleAnim.ref}
            className={`transition-all duration-700 ${roleAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="relative flex items-center mb-16">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">
                Governance & Roles
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-4">
              Role of Micro-Colleges<br />and the Network
            </h2>
            <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl mb-16">
              The Artemis model separates the personal from the institutional. Micro-colleges are
              responsible for the human dimensions of education — community, mentorship, and
              belonging — while the Artemis Network handles the structural and academic
              infrastructure that ensures rigor and coherence across the federation.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left — What the Micro-Colleges do */}
              <div className="bg-white p-8 md:p-10 shadow-sm">
                <div className="mb-8 flex items-center space-x-3">
                  <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                    Micro-Colleges
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#141414] mb-8">
                  What the Micro-Colleges do
                </h3>
                <ul className="space-y-6">
                  {[
                    'Select and admit students, building a diverse and intentional community of scholars within each college',
                    'Provide housing, dining, common rooms, and communal spaces that foster belonging and intellectual fellowship',
                    'Deliver tutorials, personal mentorship, and pastoral care — ensuring no student is anonymous',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 w-1 h-full min-h-[48px] bg-[#8A0000] mr-4 rounded-full" />
                      <span className="text-[15px] text-gray-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — What the Artemis Network does */}
              <div className="bg-white p-8 md:p-10 shadow-sm">
                <div className="mb-8 flex items-center space-x-3">
                  <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                    The Network
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#141414] mb-8">
                  What the Artemis Network does
                </h3>
                <ul className="space-y-6">
                  {[
                    'Determine curriculum and academic standards, ensuring coherence and rigor across all micro-colleges',
                    'Organize lectures, seminars, and symposia — drawing on faculty and visiting scholars from across the global network',
                    'Provide research facilities, laboratories, libraries, and digital infrastructure accessible to every member',
                    'Set and administer examinations, maintaining the integrity of Artemis degrees worldwide',
                    'Award degrees and academic distinctions on behalf of the entire University',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 w-1 h-full min-h-[48px] bg-[#8A0000] mr-4 rounded-full" />
                      <span className="text-[15px] text-gray-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Schools and Research Divisions ── */}
      <section id="schools" className="scroll-mt-[110px] max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 py-24">
        <div
          ref={schoolsAnim.ref}
          className={`transition-all duration-700 ${schoolsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Academic Divisions
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            <div className="md:col-span-7">
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
                Schools and<br />Research Divisions
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-[16px] text-gray-600 leading-relaxed">
                Across its seven schools, Artemis organizes the full scope of human knowledge into
                collaborative research divisions. Each school sets research priorities, manages
                laboratory and digital infrastructure, and coordinates cross-college academic
                programming — ensuring that the intellectual output of the network exceeds the sum
                of its parts.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {schools.map((school, i) => (
              <div
                key={i}
                className="group p-6 md:p-8 bg-white border border-gray-100 hover:border-[#8A0000] transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-4 uppercase">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h4 className="font-bold text-[#141414] mb-4 text-[17px] leading-tight">
                    {school.name}
                  </h4>
                  <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
                    {school.desc}
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="text-gray-300 group-hover:text-[#8A0000] group-hover:translate-x-1 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Artemis University Press ── */}
      <section id="press" className="scroll-mt-[110px] max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-24">
        <div
          ref={pressAnim.ref}
          className={`transition-all duration-700 ${pressAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">
              Publishing
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-7">
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
                Artemis<br />University Press
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                The Artemis University Press is the publishing arm of the University, dedicated to
                disseminating scholarship and knowledge that advances the frontiers of human
                understanding. Operating across both print and digital formats, the Press publishes
                peer-reviewed monographs, academic journals, textbooks, and open-access resources
                that serve the global scholarly community.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-8">
                True to Artemis&apos;s founding ethos of accessibility, the Press prioritizes
                open-access distribution wherever possible, ensuring that the knowledge produced
                within the network reaches researchers, educators, and learners regardless of
                geography or economic circumstance. It currently publishes hundreds of new titles
                annually across every discipline represented in the seven schools.
              </p>
              <button
                onClick={() => goToPage('about')}
                className="flex items-center space-x-4 py-3 border-b-2 border-[#8A0000] text-[#8A0000] text-[13px] font-bold uppercase tracking-[0.2em] hover:text-black hover:border-black transition-colors group"
              >
                <span>Explore the Press</span>
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
            <div className="md:col-span-5">
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1578402027070-0f5ebd84ec9b?auto=format&fit=crop&q=80&w=800"
                  className="w-full h-full object-cover grayscale brightness-90 hover:brightness-100 hover:grayscale-0 transition-all duration-500"
                  alt="Artemis University Press"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Artemis Lifelong Learning ── */}
      <section id="lifelong-learning" className="scroll-mt-[110px] bg-gray-50 py-24">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          <div
            ref={lifelongAnim.ref}
            className={`transition-all duration-700 ${lifelongAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="mb-8 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                Continuing Education
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="md:col-span-7">
                <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
                  Artemis<br />Lifelong Learning
                </h2>
                <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                  Artemis Lifelong Learning extends the University&apos;s reach beyond the full-time
                  student body, offering continuing education to professionals, returning learners,
                  and curious minds at every stage of life. Through a blend of in-person intensives
                  at micro-college campuses and flexible online programs, it delivers the rigor of
                  an Artemis education in formats that meet learners where they are.
                </p>
                <p className="text-[16px] text-gray-600 leading-relaxed mb-8">
                  Each year, Artemis Lifelong Learning enrolls thousands of students from across the
                  globe in short courses, certificate programs, executive education, and graduate-level
                  qualifications — from diplomas to doctoral degrees. Whether refining a professional
                  skill or pursuing a long-deferred intellectual passion, lifelong learners find a
                  home within the Artemis network.
                </p>
                <button
                  onClick={() => goToPage('education')}
                  className="flex items-center space-x-4 py-3 border-b-2 border-[#8A0000] text-[#8A0000] text-[13px] font-bold uppercase tracking-[0.2em] hover:text-black hover:border-black transition-colors group"
                >
                  <span>Explore Programs</span>
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
              <div className="md:col-span-5 space-y-6">
                {/* Stats with left border accent */}
                {[
                  { value: '10,000+', label: 'Lifelong learners enrolled annually' },
                  { value: '200+', label: 'Short courses and certificate programs' },
                  { value: '25+', label: 'Countries represented in each cohort' },
                  { value: '7', label: 'Schools contributing curricula' },
                ].map((stat, i) => (
                  <div key={i} className="border-l-2 border-[#8A0000] pl-6">
                    <div className="text-[28px] font-black text-[#141414] leading-none mb-1 tabular-nums">
                      {stat.value}
                    </div>
                    <div className="text-[13px] text-gray-500 leading-snug">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
