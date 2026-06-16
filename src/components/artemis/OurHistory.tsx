'use client';

import React, { useRef } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';
import { motion, useScroll, useSpring } from 'framer-motion';

interface Props {
  goToPage: (page: string) => void;
}

const TimelineSection = ({ period, title, children, isLast }: any) => {
  return (
    <div className="flex flex-col lg:flex-row relative z-20 group">
      <div className="lg:w-1/3 lg:pr-12 pt-8 lg:pt-16 pb-4 lg:pb-16 flex items-start lg:justify-end shrink-0 md:pl-16 lg:pl-0">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight lg:sticky lg:top-[120px] bg-white lg:bg-transparent py-2">
          {period}
        </h2>
      </div>
      
      {/* Dot marker */}
      <div className="absolute left-[5px] md:left-[21px] lg:left-[calc(33.333333%+1.5rem)] top-[50px] lg:top-[85px] w-[14px] h-[14px] rounded-full bg-white border-[3px] border-gray-300 group-hover:border-[#8A0000] group-hover:scale-125 transform -translate-x-1/2 transition-all z-20" />
      
      <div className={`lg:w-2/3 pl-8 md:pl-16 pt-2 lg:pt-16 pb-16 ${!isLast ? 'border-b border-gray-100' : ''}`}>
        <h3 className="text-xl font-bold text-gray-900 mb-6">{title}</h3>
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed text-[15px] clear-both overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function OurHistory({ goToPage }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end start"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const activeSection = useActiveSection(['timeline', 'founding', 'milestones']);

  return (
    <div className="flex flex-col bg-white">


      {/* Hero Section */}
      <div className="bg-white pt-16 pb-8">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-12">
            <div className="max-w-2xl">
              <h1 className="text-[48px] lg:text-[64px] font-extrabold leading-[1] tracking-tighter text-gray-900 uppercase">
                Our history
              </h1>
            </div>
            <div className="lg:max-w-[320px] mb-2">
              <p className="text-[14px] leading-relaxed text-gray-600 font-medium">
                Artemis is a modern institution built on an ancient concept, redefining the idea of a university for the digital age.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20 -mt-4 relative z-10 mb-20">
        <div className="aspect-[21/9] rounded-lg overflow-hidden shadow-sm bg-gray-100">
          <img 
            src="https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-full object-cover grayscale brightness-90" 
            alt="Historical texts and documents" 
          />
        </div>
      </div>

      <OnThisPageNav
        sections={[
          { id: 'timeline', label: 'Timeline' },
          { id: 'founding', label: 'Founding' },
          { id: 'milestones', label: 'Milestones' },
        ]}
        activeSection={activeSection}
      />

      {/* Content Section */}
      <div id="timeline" className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 scroll-mt-[110px]" ref={containerRef}>
        <div className="relative pt-6 pb-20">
          {/* Animated Background Line */}
          <div className="absolute top-[50px] lg:top-[80px] bottom-0 left-[5px] md:left-[21px] lg:left-[calc(33.333333%+1.5rem)] w-[2px] bg-gray-100 transform -translate-x-1/2 z-0" />
          <motion.div 
            className="absolute top-[50px] lg:top-[80px] bottom-0 left-[5px] md:left-[21px] lg:left-[calc(33.333333%+1.5rem)] w-[2px] bg-[#8A0000] origin-top transform -translate-x-1/2 z-10"
            style={{ scaleY }}
          />

          <div className="flex flex-col">
            <TimelineSection period="Antiquity – 11th Cent." title="Precursors to the University">
              <p>Before the modern concept of a university was born, higher learning took place in various decentralized forms across the globe. From the philosophical academies of ancient Greece to the monastic and cathedral schools of medieval Europe, and the Madrasas of the Islamic Golden Age, learning was often tied closely to religious or elite philosophical circles.</p>
              <figure className="my-8">
                 <img src="https://images.unsplash.com/photo-1548048026-5a1a941d93da?auto=format&fit=crop&q=80&w=1000" className="w-full aspect-[21/9] object-cover rounded-lg grayscale brightness-95 shadow-sm" alt="Monastic precursors" />
                 <figcaption className="text-[13px] mt-3 px-4 border-l-2 border-[#8A0000] text-gray-500 italic">Early centers of learning focused on textual preservation and theological study.</figcaption>
              </figure>
              <p>These early institutions laid the groundwork for texts and traditions, but lacked the distinct legal and structural autonomy that would define the next era of academic evolution.</p>
            </TimelineSection>

            <TimelineSection period="11th – 15th Century" title="The Birth of the Universitas">
              <figure className="my-2 sm:w-[45%] float-right ml-8 mb-6">
                 <img src="https://images.unsplash.com/photo-1581362072978-14998d01fdaa?auto=format&fit=crop&q=80&w=1000" className="w-full object-cover rounded-lg grayscale brightness-95 shadow-sm" alt="Ancient text" />
                 <figcaption className="text-[13px] mt-3 px-4 border-l-2 border-[#8A0000] text-gray-500 italic">Chartering the first universitas shifted learning to scholar guilds.</figcaption>
              </figure>
              <p>The Latin term <em>universitas magistrorum et scholarium</em> originally referred simply to a &quot;community of masters and scholars.&quot; It was a guild—a decentralized, self-governing corporation united by the pursuit of knowledge and protected by royal or papal charters.</p>
              <p>The first recognized universities emerged in Bologna (1088), Paris (c. 1150), and Oxford (c. 1167). The collegiate model, particularly strong in early Oxford and Cambridge, emerged as independent residential and teaching foundations, ensuring scholarly autonomy and interdisciplinary cross-pollination.</p>
              <p>For centuries, this model shaped the great intellectual centers of the world, fostering deep academic rigor and institutional resilience against outside interference.</p>
            </TimelineSection>

            <TimelineSection period="19th – 20th Century" title="The Research University &amp; Massification">
              <p>In 1810, the University of Berlin introduced the Humboldtian model, integrating teaching with cutting-edge research and emphasizing academic freedom. This spawned the modern Research University, a framework that dominated global higher education throughout the 19th and 20th centuries.</p>
              <figure className="my-8">
                 <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1000" className="w-full aspect-[21/9] object-cover rounded-lg grayscale brightness-95 shadow-sm" alt="Classic library" />
                 <figcaption className="text-[13px] mt-3 px-4 border-l-2 border-[#8A0000] text-gray-500 italic">The 19th century saw universities pivot toward empirical research and mass education.</figcaption>
              </figure>
              <p>The post-WWII era saw massive expansion—the transition from elite to mass higher education. While this democratized access, it also introduced bureaucracy, shifting power away from the &quot;scholarly guild&quot; and centralizing it within massive administrative frameworks. Categories multiplied: land-grant universities, polytechnics, liberal arts colleges, and state university systems.</p>
            </TimelineSection>

            <TimelineSection period="2020" title="The Genesis Drafts">
              <div id="founding" className="scroll-mt-[110px]" />
              <figure className="my-2 sm:w-[45%] float-left mr-8 mb-6">
                 <img src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80&w=1000" className="w-full object-cover rounded-lg grayscale brightness-95 shadow-sm" alt="Drafting concepts" />
                 <figcaption className="text-[13px] mt-3 px-4 border-l-2 border-[#8A0000] text-gray-500 italic">Early structural outlines for the Artemis network.</figcaption>
              </figure>
              <p>By early 2020, as the world moved rapidly toward distributed interaction, visionary founder <strong>Abraham Kyeyune</strong> recognized an opportunity to rescue the university from bureaucratic bloat and return it to its decentralized guild origins, now powered by digital infrastructure.</p>
              <p>Kyeyune drafted the original Artemis Concept—a framework detailing a global network of semi-autonomous academic hubs linked by a singular, rigorous curriculum and shared digital estate. Rather than a singular physical campus, Artemis would be a web of connected colleges and academic societies.</p>
            </TimelineSection>

            <TimelineSection period="2022" title="Pioneering the Vision">
              <p>Kyeyune enlisted a tight-knit cadre of pioneering educators and technologists to assemble the Artemis Concept. Among them was <strong>Dr. Elara Vance</strong>, who architected the early digital humanities framework, ensuring that classical pedagogical models translated flawlessly into a distributed environment.</p>
              <p><strong>Prof. Julian Sarkis</strong>, a systems engineer, developed the federated governance models still used today by the governing body, allowing individual nodes to operate autonomously while contributing to the central Artemis Trust.</p>
            </TimelineSection>

            <TimelineSection period="Today" title="A Global Network" isLast>
              <div id="milestones" className="scroll-mt-[110px]" />
              <p>What began as a conceptual draft by Abraham Kyeyune has rapidly evolved into a prestige network. Today, Artemis operates as a federation of colleges, research divisions, and academic societies spread across international boundaries.</p>
              <figure className="my-8">
                 <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000" className="w-full aspect-[21/9] object-cover rounded-lg grayscale brightness-95 shadow-sm" alt="Global network" />
                 <figcaption className="text-[13px] mt-3 px-4 border-l-2 border-[#8A0000] text-gray-500 italic">Artemis unites scholars worldwide into a single decentralized guild.</figcaption>
              </figure>
              <p>The mission remains a faithful homage to the 11th century: to honor the ancient tradition of the scholarly guild—a true <em>universitas</em>—while pushing the boundaries of what is institutionally possible in the modern digital age.</p>
            </TimelineSection>
          </div>
        </div>
      </div>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
