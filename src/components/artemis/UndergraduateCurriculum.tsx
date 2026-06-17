'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SubPageFooter from '@/components/artemis/SubPageFooter';

interface UndergraduateCurriculumProps {
  goToPage: (page: string, program?: string) => void;
}

export default function UndergraduateCurriculum({ goToPage }: UndergraduateCurriculumProps) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  const catalogNav = [
    "The Undergraduate Curriculum",
    "Academic Regulations",
    "Majors by Disciplines",
    "Majors in Artemis College",
    "Major Roadmaps",
    "Certificates in Artemis College",
    "Artemis College and Departmental Attributes",
    "Subjects of Instruction",
    "General Information"
  ];

  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* Catalog Header / Hero */}
      <div className="relative w-full h-[45vh] min-h-[360px] overflow-hidden">
        <motion.img 
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600" 
          alt="Artemis College Programs of Study" 
          className="absolute inset-x-0 -top-[20%] w-full h-[140%] object-cover grayscale"
          style={{ y: heroY }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-16">
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Academic Catalog 2026–2027
            </span>
          </div>
          <h1 className="text-[40px] md:text-[52px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6 uppercase">
            The Undergraduate Curriculum
          </h1>
          <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light">
            Discover the pathways, core requirements, and cutting-edge curriculum that define our Programs of Study.
          </p>
        </div>
      </div>
      
      <div className="bg-gray-100 border-b border-gray-200 px-5 sm:px-8 lg:px-20 py-3 flex flex-wrap text-sm text-gray-600 gap-4">
        <span className="hover:text-black cursor-pointer uppercase tracking-wider font-bold text-xs" onClick={() => goToPage('home')}>Artemis University Publications</span>
        <span>/</span>
        <span className="hover:text-black cursor-pointer uppercase tracking-wider font-bold text-xs" onClick={() => goToPage('education')}>Artemis College Programs of Study</span>
        <span>/</span>
        <span className="text-black uppercase tracking-wider font-bold text-xs">The Undergraduate Curriculum</span>
      </div>

      <div className="flex flex-col md:flex-row max-w-[1400px] w-full mx-auto pb-24 border-l border-r border-gray-200">
        {/* Catalog Navigation Sidebar */}
        <aside className="w-full md:w-[320px] shrink-0 border-r border-gray-200 bg-white">
          <ul className="flex flex-col py-8 px-6">
            {catalogNav.map((item, i) => (
              <li key={i}>
                <button 
                  className={`w-full text-left py-3 text-[15px] hover:text-[#8A0000] border-t border-gray-100 ${item === 'The Undergraduate Curriculum' ? 'text-[#8A0000] font-bold border-l-2 border-l-[#8A0000] pl-3 -ml-[14px]' : 'text-[#141414]'}`}
                  onClick={(e) => {
                    if(item === 'Majors in Artemis College') goToPage('programs');
                    else if (item === 'The Undergraduate Curriculum') goToPage('undergraduate_curriculum');
                    else goToPage('catalog_page', item);
                  }}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-5 sm:px-8 lg:px-20 py-16 lg:py-24 bg-white">
          <h1 className="text-[36px] font-serif font-bold text-[#141414] mb-8">
            The Undergraduate Curriculum
          </h1>

          <div className="max-w-3xl space-y-6 text-[#141414] text-[15px] leading-relaxed">
            <p>
              Artemis College, the undergraduate branch of Artemis University, offers instruction in more than 120 subjects spanning the liberal arts, sciences, and engineering. Its signature residential college system, centered at our Valletta node and expanding globally, sustains a supportive community of students, staff, scholars, and researchers. For its history, Artemis has provided leadership in undergraduate education in the liberal arts and sciences. While the University encompasses advanced computational and professional education across its orbital nodes, all undergraduate education at Artemis continues to be provided through the College. The College remains a recognized leader worldwide in fostering global citizens and forward-thinking innovators.
            </p>

            <p>Artemis College offers a liberal education that aims to:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Educate talented students of diverse backgrounds to lead and serve in a complex and changing global society.</li>
              <li>Provide a supportive residential community of learning in Valletta where cross-cultural experience and the free exchange of ideas underpin the pursuit of knowledge.</li>
              <li>Cultivate both the broad intellectual, moral, civic, and creative capacities and the more specialized skills that allow students to thrive beyond the physical and digital campus gates.</li>
              <li>Draw on the distinctive strengths and traditions of Artemis University as a globally networked leader across the arts, humanities, social sciences, empirical sciences, deep technology, and the professions.</li>
            </ul>

            <p>
              Artemis seeks to educate students who are broad-minded and autonomous, capable of making judgments and taking responsibility for their decisions within a decentralized, global context. An Artemis College education should encourage students to become curious, highly engaged global citizens. It should also prepare them optimally for their professional trajectories and further educational opportunities, assisting them to develop as active, persistent learners who thrive in highly complex, rapidly evolving environments.
            </p>

            <p>
              This philosophy of education corresponds with our foundational principles, which draw a strong distinction between merely &quot;expanding the mind&apos;s powers&quot; and &quot;storing it with knowledge.&quot; While acquiring empirical facts is important, learning how to think critically, collaboratively, and creatively across international and disciplinary boundaries takes absolute precedence.
            </p>

            <p>
              The College encourages students to learn broadly and deeply. Each student completes a major in one of the College&apos;s 80 highly interdisciplinary programs or departments. The distributional requirements ensure that students learn about a diverse variety of subjects and analytical approaches. In addition, the College strictly requires that all students take courses completing the Artemis Cross-Collegiate Innovation Core—developing advanced writing, multifaceted quantitative and computational reasoning, and exceptional global language competency—that hold the key to leadership opportunities in later study and life. In each skill, students are required to travel significant distance from their secondary education, so that each core competency matures substantially. A student working toward a bachelor&apos;s degree normally takes four or five rigorous courses each term, culminating in the B.A. or B.S. degree after completing thirty-six term courses or their equivalent across our orbital academic grid. A candidate for the bachelor&apos;s degree is required, in completing the thirty-six term courses, to fulfill the distributional requirements alongside the rigors of their chosen major program.
            </p>

            <p>
              In a time of absolute globalization, both intensive academic study of the international world and fundamental firsthand experience of diverse global cultures are required. Artemis College mandates all of its students to consider immersion via a summer, a term, or a year at one of our global partner nodes sometime during their college experience.
            </p>

            <p>
              Artemis College forms the heart of a great university and encourages students to participate actively in the conversation of a scholarly community that defines the pursuit of collaborative knowledge. While the College&apos;s foundational goal of educating talented individuals for global leadership remains steady, Artemis continually expands the frontier of subjects it teaches, pushing the excellence of its curriculum, cutting-edge pedagogy, global research integration, and the radical diversity of its student body. It currently offers instruction to over 200+ highly motivated students. Through our distributed central node in Malta, the residential colleges create enduring, intimate communities that serve as an essential part of the broader Artemis ecosystem. As a uniquely positioned community of learning, Artemis College heavily emphasizes instilling an ethos of profound service—a deep sense of responsibility on campus and an urgent call to contribute tangibly beyond it. Participation in the College and the wider University network requires absolute respect, open tolerance, and an unwavering willingness to collaborate across differences. Above all, it requires an active openness on the part of each member of the Artemis community—an openness to learn constantly and a sustaining humility about how much we have yet to discover.
            </p>
          </div>
        </main>
      </div>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
