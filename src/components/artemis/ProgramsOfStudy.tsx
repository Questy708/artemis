'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';

interface ProgramsOfStudyProps {
  goToPage: (page: string, program?: string) => void;
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

const schoolSections = [
  {
    id: 'school-natural-sciences',
    label: 'Natural Sciences',
    heading: 'School of Natural Sciences',
    desc: 'From the quantum to the cosmological — rigorous training in the fundamental laws governing matter, energy, and life. Students work alongside research faculty from their first year, with access to laboratories and observatories across the global network.',
    majors: [
      "Biology (B.S.)",
      "Chemistry (B.S.)",
      "Physics (B.S.)",
      "Astronomy (B.S.)",
      "Applied Physics (B.S.)",
      "Environmental Science (B.S.)",
      "Geology (B.S.)",
      "Mathematics (B.S.)",
      "Agricultural Sciences (B.S.)",
      "Planetary Science (B.S.)",
    ]
  },
  {
    id: 'school-engineering-technology',
    label: 'Engineering & Technology',
    heading: 'School of Engineering & Technology',
    desc: 'Designing and building the systems that shape the future. Artemis engineering graduates combine deep technical expertise with ethical reasoning and cross-disciplinary fluency — prepared not just to write code or build structures, but to ask why and for whom.',
    majors: [
      "Mechanical Engineering (B.S.)",
      "Civil Engineering (B.S.)",
      "Chemical Engineering (B.S.)",
      "Software Engineering (B.S.)",
      "Computer Science (B.S.)",
      "Data Science (B.S.)",
      "Robotics (B.S.)",
      "Mechatronics (B.S.)",
      "Nanotechnology (B.S.)",
      "Architecture (B.S.)",
      "Design (B.A.)",
    ]
  },
  {
    id: 'school-arts-humanities',
    label: 'Arts & Humanities',
    heading: 'School of Arts & Humanities',
    desc: 'The interpretive disciplines that give meaning to knowledge and beauty to expression. Artemis humanities students engage with canonical texts, contemporary media, and creative practice across cultures — developing the critical imagination that leadership demands.',
    majors: [
      "Philosophy (B.A.)",
      "Comparative Literature (B.A.)",
      "Media & Communication Design (B.A.)",
      "History (B.A.)",
      "Art History (B.A.)",
      "Linguistics (B.A.)",
      "Theater & Performance (B.A.)",
      "Film & Media Studies (B.A.)",
      "Archaeology (B.A.)",
      "Art Practice (B.F.A.)",
      "Dance (B.F.A.)",
      "Classics (B.A.)",
      "Music (B.A.)",
      "Theater and Performance Studies (B.F.A.)",
    ]
  },
  {
    id: 'school-social-sciences',
    label: 'Social Sciences',
    heading: 'School of Social Sciences',
    desc: 'Understanding the structures that govern human societies — from local communities to global institutions. Artemis social scientists combine quantitative rigour with qualitative depth, preparing to shape policy, drive innovation, and challenge orthodoxies.',
    majors: [
      "Anthropology (B.A.)",
      "Political Science (B.A.)",
      "Urban Studies (B.A.)",
      "Economics (B.A.)",
      "Global Governance & Systems (B.A.)",
      "Social Innovation & Design (B.A.)",
    ]
  },
  {
    id: 'school-health-medicine',
    label: 'Health & Medicine',
    heading: 'School of Health & Medicine',
    desc: 'Advancing human health through biological insight, computational power, and clinical precision. Artemis health science students train in cross-continental research environments that span genomics labs, public health field stations, and biomedical computation clusters.',
    majors: [
      "Neuroscience (B.S.)",
      "Public Health (B.S.)",
      "Biomedical Engineering (B.S.)",
      "Nutrition Science (B.S.)",
      "Genetics (B.S.)",
      "Immunobiology (B.S.)",
      "Biomedical Computation (B.S.)",
      "Food Systems (B.S.)",
    ]
  },
  {
    id: 'school-education-human-development',
    label: 'Education & Human Development',
    heading: 'School of Education & Human Development',
    desc: 'Studying how people learn, grow, and flourish — and designing the systems that help them do so. From cognitive science to learning technology, Artemis education students work at the intersection of research, practice, and innovation.',
    majors: [
      "Education (B.A.)",
      "Learning Design & Technology (B.A.)",
      "Cognitive Science (B.A.)",
      "Developmental Psychology (B.A.)",
      "Educational Leadership (B.A.)",
      "Childhood & Human Development (B.A.)",
    ]
  },
  {
    id: 'school-business',
    label: 'Business',
    heading: 'School of Business',
    desc: 'Training leaders who understand that commerce is a tool, not an end. Artemis business students combine analytical sharpness with ethical grounding and global perspective — prepared to build enterprises that create lasting value beyond profit.',
    majors: [
      "International Business (B.S.)",
      "Finance (B.S.)",
      "Business Analytics (B.S.)",
      "Supply Chain & Logistics (B.S.)",
      "Consulting & Strategy (B.S.)",
      "Entrepreneurship (B.S.)",
    ]
  },
];

/* Count total majors */
const TOTAL_MAJORS = schoolSections.reduce((sum, s) => sum + s.majors.length, 0);

/* Degree filter options */
const DEGREE_FILTERS = [
  { value: 'all', label: 'All Degrees' },
  { value: 'B.A.', label: 'Bachelor of Arts (B.A.)' },
  { value: 'B.S.', label: 'Bachelor of Science (B.S.)' },
  { value: 'B.F.A.', label: 'Bachelor of Fine Arts (B.F.A.)' },
];

export default function ProgramsOfStudy({ goToPage }: ProgramsOfStudyProps) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  const heroAnim = useInView();
  const introAnim = useInView();
  const [searchQuery, setSearchQuery] = useState('');
  const [degreeFilter, setDegreeFilter] = useState('all');

  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [isComparing, setIsComparing] = useState(false);

  const toggleCompare = (major: string) => {
    if (selectedPrograms.includes(major)) {
      setSelectedPrograms(selectedPrograms.filter(p => p !== major));
    } else {
      if (selectedPrograms.length < 3) {
        setSelectedPrograms([...selectedPrograms, major]);
      } else {
        alert("You can only compare up to 3 programs at once.");
      }
    }
  };

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

  const sectionIds = schoolSections.map(s => s.id);
  const activeSection = useActiveSection(sectionIds);

  /* Filter logic */
  const filteredSections = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return schoolSections.map(section => {
      const filteredMajors = section.majors.filter(major => {
        const matchesSearch = !q || major.toLowerCase().includes(q);
        const matchesDegree = degreeFilter === 'all' || major.includes(degreeFilter);
        return matchesSearch && matchesDegree;
      });
      return { ...section, filteredMajors };
    }).filter(section => section.filteredMajors.length > 0);
  }, [searchQuery, degreeFilter]);

  const totalResults = filteredSections.reduce((sum, s) => sum + s.filteredMajors.length, 0);

  return (
    <div className="flex flex-col bg-white">
      {/* ── Hero Section ── */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[45vh] min-h-[360px] overflow-hidden">
            <motion.img
              src="https://images.unsplash.com/photo-1594750852563-5ed8e0421d40?auto=format&fit=crop&q=80&w=1800"
              alt="Programs of Study"
              style={{ y: heroY }}
              className="absolute inset-x-0 -top-[20%] w-full h-[140%] object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-8 lg:px-20 pb-16">
              <div
                ref={heroAnim.ref}
                className={`transition-all duration-700 ${heroAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <div className="mb-8 flex items-center space-x-3">
                  <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Academic Catalogue</span>
                </div>
                <h1 className="text-[30px] sm:text-[44px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6">
                  Artemis College <br className="hidden sm:inline" />
                  Programs of Study <span className="text-white/60">2026–2027</span>
                </h1>
                <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light">
                  A complete catalogue of undergraduate majors offered by Artemis College — seven schools, sixty-plus degree programmes, one unified standard of excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── On This Page Navigation ── */}
      <OnThisPageNav
        sections={schoolSections.map(s => ({ id: s.id, label: s.label }))}
        activeSection={activeSection}
      />

      {/* ── Search & Filter Bar ── */}
      <section className="bg-white border-b border-gray-200 sticky top-[102px] z-20">
        <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-5">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1 w-full sm:max-w-md">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input
                type="text"
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#8A0000]/20 focus:border-[#8A0000] transition-all bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </div>

            {/* Degree Filter */}
            <div className="flex items-center gap-2">
              {DEGREE_FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setDegreeFilter(filter.value)}
                  className={`px-3.5 py-2 text-[12px] font-bold uppercase tracking-wider rounded-lg border transition-all ${
                    degreeFilter === filter.value
                      ? 'bg-[#8A0000] text-white border-[#8A0000]'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#8A0000] hover:text-[#8A0000]'
                  }`}
                >
                  {filter.value === 'all' ? 'All' : filter.value}
                </button>
              ))}
            </div>

            {/* Results count */}
            {(searchQuery || degreeFilter !== 'all') && (
              <div className="text-[12px] font-medium text-gray-500 shrink-0">
                {totalResults} program{totalResults !== 1 ? 's' : ''} found
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Catalogue Quick Nav + Introduction ── */}
      <section className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24">
        <div
          ref={introAnim.ref}
          className={`transition-all duration-700 ${introAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              The Catalogue
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left — Introduction */}
            <div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                Majors in Artemis College
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Artemis College offers undergraduate majors across seven interdisciplinary schools — each designed to prepare students for a world that demands both deep expertise and broad adaptability. Every major is built on a common foundation of critical thinking, ethical reasoning, and global perspective.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed">
                Students declare a major by the end of their second year, with the flexibility to combine fields through double majors, minors, and certificates. All programmes lead to the same globally recognised Artemis degree, regardless of which college node you attend.
              </p>

              {/* Stats row */}
              <div className="mt-8 flex gap-8">
                <div>
                  <div className="text-[28px] font-black text-[#8A0000]">{TOTAL_MAJORS}+</div>
                  <div className="text-[12px] font-bold uppercase tracking-wider text-gray-500">Programs</div>
                </div>
                <div>
                  <div className="text-[28px] font-black text-[#8A0000]">7</div>
                  <div className="text-[12px] font-bold uppercase tracking-wider text-gray-500">Schools</div>
                </div>
                <div>
                  <div className="text-[28px] font-black text-[#8A0000]">35</div>
                  <div className="text-[12px] font-bold uppercase tracking-wider text-gray-500">Countries</div>
                </div>
              </div>
            </div>

            {/* Right — Catalogue Quick Navigation */}
            <div className="pt-4">
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">Quick Navigation</div>
              <ul className="space-y-0">
                {catalogNav.map((item, i) => (
                  <li key={i}>
                    <button
                      className={`w-full text-left py-3 text-[15px] border-t border-gray-100 hover:text-[#8A0000] transition-colors ${item === 'Majors in Artemis College' ? 'text-[#8A0000] font-bold' : 'text-[#141414]'}`}
                      onClick={() => {
                        if (item === 'Majors in Artemis College') {
                          // Already on this page
                        } else if (item === 'The Undergraduate Curriculum') {
                          goToPage('undergraduate_curriculum');
                        } else {
                          goToPage('catalog_page', item);
                        }
                      }}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── School Sections (alternating white/gray-50) ── */}
      {filteredSections.length === 0 ? (
        <section className="py-24 text-center">
          <div className="max-w-md mx-auto px-8">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h3 className="text-[20px] font-bold text-[#141414] mb-2">No programs found</h3>
            <p className="text-[15px] text-gray-500 mb-6">Try adjusting your search or filter criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setDegreeFilter('all'); }}
              className="px-6 py-3 bg-[#8A0000] text-white text-[12px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </section>
      ) : (
        filteredSections.map((section, idx) => {
          const originalIdx = schoolSections.findIndex(s => s.id === section.id);
          return (
            <section
              key={section.id}
              id={section.id}
              className={`scroll-mt-[110px] py-16 lg:py-24 ${originalIdx % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}
            >
              <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-20">
                {/* Section divider */}
                <div className="relative flex items-center mb-12">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">
                    {String(originalIdx + 1).padStart(2, '0')} — {section.label}
                  </span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">
                  {section.heading}
                </h2>

                <p className="text-[16px] text-gray-600 leading-relaxed mb-10 max-w-3xl">
                  {section.desc}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
                  {section.filteredMajors.map((major, i) => {
                    const degrees = major.includes("B.S.") ? "B.S." : major.includes("B.F.A.") ? "B.F.A." : major.includes("B.A.") ? "B.A." : "Degree";
                    const cleanMajor = major.replace(" (B.S.)", "").replace(" (B.A.)", "").replace(" (B.F.A.)", "");
                    // Determinant pseudo-random image for variety based on index
                    const images = [
                      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600",
                      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
                      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600",
                      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600",
                      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
                      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
                    ];
                    const image = images[(i + originalIdx) % images.length];

                    return (
                    <div 
                      key={i}
                      className="group cursor-pointer bg-white border border-gray-100/80 shadow-sm hover:shadow-lg hover:border-[#8A0000]/30 transition-all duration-400 ease-out flex flex-col rounded-sm overflow-hidden"
                    >
                      <div className="relative h-32 overflow-hidden bg-gray-50 flex shrink-0" onClick={() => goToPage('program_detail', major)}>
                        <img 
                          src={image} 
                          alt={cleanMajor}
                          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase bg-black group-hover:bg-[#8A0000] px-2 py-0.5 tracking-wider font-semibold transition-colors">
                            {degrees}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 flex flex-col flex-1 relative">
                        <button
                          onClick={() => goToPage('program_detail', major)}
                          className="text-left text-[14px] font-bold text-gray-900 group-hover:text-[#8A0000] uppercase tracking-tight leading-snug transition-colors mb-2 line-clamp-2 min-h-[40px]"
                        >
                          {cleanMajor}
                        </button>
                        
                        <p className="text-[11px] text-gray-500 leading-relaxed font-light mb-4 flex-1 line-clamp-3">
                          The study and application of principles in {cleanMajor} to solve global challenges through interdisciplinary research and practice.
                        </p>

                        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={() => toggleCompare(major)}
                            className={`text-[8px] uppercase tracking-wider font-bold transition-colors flex items-center gap-1.5 ${selectedPrograms.includes(major) ? 'text-[#8A0000]' : 'text-gray-400 hover:text-[#8A0000]'}`}
                          >
                            <span className={`w-1 h-1 rounded-full ${selectedPrograms.includes(major) ? 'bg-[#8A0000]' : 'bg-gray-300'}`}></span>
                            {selectedPrograms.includes(major) ? 'Remove' : 'Compare'}
                          </button>
                          <button
                            onClick={() => goToPage('program_detail', major)}
                            className="text-[9px] font-mono uppercase tracking-widest text-[#8A0000] font-bold hover:underline"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                </div>

                {/* CTA for this school */}
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <button
                    onClick={() => goToPage('apply')}
                    className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-[#8A0000] hover:underline transition-all"
                  >
                    Apply to {section.label}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            </section>
          );
        })
      )}

      {/* ── SubPageFooter ── */}
      <SubPageFooter goToPage={goToPage} />

      {/* Floating Compare Bar */}
      {selectedPrograms.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#141414] text-white p-4 flex items-center justify-between z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
           <div className="max-w-[1400px] w-full mx-auto px-4 lg:px-16 flex items-center justify-between">
             <div className="text-[13px] font-bold">
               Comparing {selectedPrograms.length}/3 Programs
             </div>
             <div className="flex gap-4">
               <button onClick={() => setSelectedPrograms([])} className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors">Clear</button>
               <button onClick={() => setIsComparing(true)} className="px-6 py-2 bg-[#8A0000] hover:bg-[#6B0000] text-white text-[11px] font-bold uppercase tracking-wider transition-colors">View Comparison</button>
             </div>
           </div>
        </div>
      )}

      {/* Comparison Modal */}
      {isComparing && (
        <div className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-4 lg:p-10 backdrop-blur-sm">
          <div className="bg-white max-w-5xl w-full p-8 lg:p-12 relative overflow-y-auto max-h-[90vh]">
             <button onClick={() => setIsComparing(false)} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
             <h2 className="text-[32px] font-extrabold tracking-tighter text-[#141414] mb-8">Program Comparison</h2>
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse min-w-[700px]">
                 <thead>
                   <tr>
                     <th className="p-5 border-b-2 border-gray-900 text-[12px] font-bold uppercase tracking-wider text-gray-500 w-[20%]">Feature</th>
                     {selectedPrograms.map(p => (
                       <th key={p} className="p-5 border-b-2 border-gray-900 text-[18px] font-bold text-[#141414] leading-tight w-[26%]">
                         {p}
                       </th>
                     ))}
                   </tr>
                 </thead>
                 <tbody>
                   <tr>
                     <td className="p-5 border-b border-gray-200 font-bold text-[11px] uppercase tracking-wider text-gray-500">Core Focus</td>
                     {selectedPrograms.map(p => (
                       <td key={p} className="p-5 border-b border-gray-200 text-[14px] text-gray-700 leading-relaxed">
                         The study and application of principles in <strong>{p.replace(' (B.S.)','').replace(' (B.A.)','').replace(' (B.F.A.)','')}</strong> to solve global challenges through interdisciplinary research and practice.
                       </td>
                     ))}
                   </tr>
                   <tr>
                     <td className="p-5 border-b border-gray-200 font-bold text-[11px] uppercase tracking-wider text-gray-500">Credit Requirements</td>
                     {selectedPrograms.map(p => (
                       <td key={p} className="p-5 border-b border-gray-200 text-[14px] text-gray-700 leading-relaxed">
                         120 Credits Total<br />
                         <span className="text-gray-500 text-[12px]">• 60 Foundation Core<br />• 40 Major Field<br />• 20 Electives/Minor</span>
                       </td>
                     ))}
                   </tr>
                   <tr>
                     <td className="p-5 border-b border-gray-200 font-bold text-[11px] uppercase tracking-wider text-gray-500">Duration</td>
                     {selectedPrograms.map(p => (
                       <td key={p} className="p-5 border-b border-gray-200 text-[14px] text-gray-700">8 Semesters (4 Years)</td>
                     ))}
                   </tr>
                 </tbody>
               </table>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
