'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';
import { programsData, generateProgramData } from '@/lib/programs-data';

interface ProgramDetailProps {
  goToPage: (page: string, program?: string) => void;
  programName?: string;
}

export default function ProgramDetail({ goToPage, programName = "African Studies (B.A.)" }: ProgramDetailProps) {
  const actualProgramName = programName || "African Studies (B.A.)";
  const data = useMemo(() => programsData[actualProgramName] || generateProgramData(actualProgramName), [actualProgramName]);
  
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  const tabs = useMemo(() => [
    { id: 'overview', label: 'Overview' },
    { id: 'requirements', label: 'Summary of Requirements' },
    { id: 'firstyear', label: 'First Year' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'faculty', label: 'Faculty' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'courses', label: 'Courses' }
  ].filter(tab => {
    if (tab.id === 'certificates' && !data.certificateText) return false;
    return true;
  }), [data]);

  const activeSection = useActiveSection(tabs.map(t => t.id));

  const [facultyBios, setFacultyBios] = useState<{name: string, title: string, bio: string, specialty: string, image: string}[]>([]);
  const [isLoadingBios, setIsLoadingBios] = useState(true);

  // Load bios on mount or when data changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const getFacultyList = (str?: string) => {
        if (!str) return [];
        return str.split(',').map(s => s.trim()).filter(Boolean);
      };

      const extracted = [
        ...getFacultyList(data.facultyProfessors).map(n => ({ name: n, title: 'Professor' })),
        ...getFacultyList(data.facultyAssociate).map(n => ({ name: n, title: 'Associate Professor' })),
        ...getFacultyList(data.facultyAssistant).map(n => ({ name: n, title: 'Assistant Professor' })),
        ...getFacultyList(data.facultyLecturers).map(n => ({ name: n, title: 'Lecturer' }))
      ];

      const bios = extracted.map(f => {
        const cleanName = f.name.replace(/\(.*?\)/g, '').trim();
        const disciplineMatch = f.name.match(/\((.*?)\)/);
        const discipline = disciplineMatch ? disciplineMatch[1] : data.title;

        return {
          name: cleanName,
          title: f.title,
          specialty: discipline,
          image: `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanName)}&background=random&size=200`,
          bio: `${cleanName} is a ${f.title.toLowerCase()} specializing in ${discipline}. Their current research explores the intersections of ${discipline.toLowerCase()} and global theoretical models.`
        };
      });

      setFacultyBios(bios);
      setIsLoadingBios(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [data]);

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
          src={data.image || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600"} 
          alt={data.title} 
          className="absolute inset-x-0 -top-[20%] w-full h-[140%] object-cover grayscale"
          style={{ y: heroY }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-8 lg:px-20 pb-16">
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
              Academic Catalog 2026–2027
            </span>
          </div>
          <h1 className="text-[40px] md:text-[52px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6 uppercase">
            {data.title}
          </h1>
          <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light">
            Discover the pathways, core requirements, and cutting-edge curriculum that define our Programs of Study.
          </p>
        </div>
      </div>

      <OnThisPageNav
        sections={tabs.map(t => ({ id: t.id, label: t.label }))}
        activeSection={activeSection}
      />

      <div className="flex flex-col md:flex-row max-w-[1400px] w-full mx-auto pb-24 border-l border-r border-gray-200 relative">
        {/* Catalog Navigation Sidebar */}
        <aside className="w-full md:w-[320px] shrink-0 border-r border-gray-200 bg-white">
          <ul className="flex flex-col py-8 px-6 sticky top-24">
            {catalogNav.map((item, i) => (
              <li key={i}>
                <button
                  className={`w-full text-left py-3 text-[15px] hover:text-[#8A0000] border-t border-gray-100 ${item === 'Subjects of Instruction' ? 'text-[#8A0000] font-bold border-l-2 border-l-[#8A0000] pl-3 -ml-[14px]' : 'text-[#141414]'}`}
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
        <main className="flex-1 px-8 lg:px-20 py-16 lg:py-24 bg-white">
          <div className="flex flex-col gap-4 mb-10">
            <h2 className="text-[20px] font-bold text-[#141414] uppercase tracking-wide">
              Quick Actions
            </h2>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={() => goToPage('apply')}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#8A0000] text-white text-[12px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors shadow-lg shadow-[#8A0000]/20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Apply Now
            </button>
            <button
              onClick={() => goToPage('admissions')}
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-[#8A0000] text-[#8A0000] text-[12px] font-bold uppercase tracking-widest hover:bg-[#8A0000] hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Request Info
            </button>
          </div>

          <div className="max-w-4xl space-y-32">
            {/* Overview Section */}
            <section id="overview" className="scroll-mt-32">
              <div className="space-y-6">
                <p className="text-[15px] leading-relaxed text-[#141414]">
                  <strong>Director of undergraduate studies</strong>: <button onClick={() => goToPage('our-people')} className="text-[#8A0000] hover:underline font-bold">{data.directorName}</button>, {data.directorLocation};{' '}
                  {data.coDirectorTitle && data.coDirectorName && (
                    <span>{data.coDirectorTitle}: <button onClick={() => goToPage('our-people')} className="text-[#8A0000] hover:underline font-bold">{data.coDirectorName}</button>, {data.coDirectorLocation};{' '}</span>
                  )}
                  <span className="text-[#8A0000] font-bold">{data.website}</span>
                </p>
                {data.overviewParagraphs.map((p, i) => (
                  <p key={i} className="text-[15px] leading-relaxed text-[#141414]">{p}</p>
                ))}

                <h4 className="text-[20px] font-bold text-[#141414] mt-12 mb-6 border-b border-gray-100 pb-2">Requirements of the Major</h4>
                {data.requirementsParagraphs.map((p, i) => (
                  <p key={`req-${i}`} className="text-[15px] leading-relaxed text-[#141414]" dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                ))}

                <h4 className="text-[20px] font-bold text-[#141414] mt-12 mb-6 border-b border-gray-100 pb-2">Senior Requirement</h4>
                <p className="text-[15px] leading-relaxed text-[#141414]">{data.seniorRequirement}</p>

                <h4 className="text-[20px] font-bold text-[#141414] mt-12 mb-6 border-b border-gray-100 pb-2">Advising</h4>
                <p className="text-[15px] leading-relaxed text-[#141414]">{data.advising}</p>
              </div>
            </section>

            {/* Requirements Summary Section — Redesigned as numbered steps */}
            <section id="requirements" className="scroll-mt-32">
              <h3 className="text-[24px] font-bold text-[#141414] mb-2">Summary of Major Requirements</h3>
              <p className="text-gray-500 text-[14px] mb-10">{data.requirementsArray.length} requirements for completion</p>

              <div className="relative">
                {/* Vertical connector line */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200 hidden sm:block"></div>

                <div className="space-y-6">
                  {data.requirementsArray.map((req, i) => (
                    <div key={i} className="relative flex items-start gap-5 sm:gap-8">
                      {/* Step number */}
                      <div className="relative z-10 w-12 h-12 rounded-full bg-[#8A0000] text-white flex items-center justify-center font-bold text-[14px] shrink-0 shadow-md">
                        {i + 1}
                      </div>
                      {/* Content card */}
                      <div className="flex-1 bg-white border border-gray-200 rounded-xl p-5 hover:border-[#8A0000]/30 hover:shadow-md transition-all">
                        <h4 className="text-[15px] text-[#141414] font-bold mb-1">{req.name}</h4>
                        <p className="text-[14px] text-gray-600 leading-relaxed">{req.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Overview — Redesigned as summary cards */}
              <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#8A0000]/[0.04] border border-[#8A0000]/10 rounded-xl p-6">
                  <div className="text-[11px] font-bold text-[#8A0000] uppercase tracking-widest mb-2">Prerequisites</div>
                  <div className="text-[15px] font-semibold text-[#141414]">None</div>
                </div>
                <div className="bg-[#8A0000]/[0.04] border border-[#8A0000]/10 rounded-xl p-6">
                  <div className="text-[11px] font-bold text-[#8A0000] uppercase tracking-widest mb-2">Total Courses</div>
                  <div className="text-[15px] font-semibold text-[#141414]">12 Term Courses</div>
                </div>
                <div className="bg-[#8A0000]/[0.04] border border-[#8A0000]/10 rounded-xl p-6">
                  <div className="text-[11px] font-bold text-[#8A0000] uppercase tracking-widest mb-2">Distribution</div>
                  <div className="text-[14px] font-medium text-[#141414] leading-snug">{data.summaryDistribution}</div>
                </div>
              </div>
            </section>

            {/* First Year Section */}
            <section id="firstyear" className="scroll-mt-32">
              <h3 className="text-[24px] font-bold text-[#141414] mb-8">First-Year Guidelines</h3>
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-8 space-y-4">
                {data.firstYearParagraphs.map((p, i) => (
                  <p key={i} className="text-[15px] leading-relaxed text-gray-700">{p}</p>
                ))}
              </div>
            </section>

            {/* Certificates Section */}
            {data.certificateText && (
              <section id="certificates" className="scroll-mt-32">
                <h3 className="text-[24px] font-bold text-[#141414] mb-8">Certificates of Advanced Study</h3>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-[#8A0000] h-1"></div>
                  <div className="p-8 space-y-6 text-[15px] text-[#141414]">
                    <p className="leading-relaxed">{data.certificateText}</p>
                    {data.certificateRequirements && (
                      <div className="pt-6 border-t border-gray-100">
                        <h4 className="font-bold text-[16px] mb-4 uppercase tracking-tight text-[#8A0000]">Required Credentials</h4>
                        <p className="text-gray-600">{data.certificateRequirements}</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Faculty Section — Redesigned as rich profile cards */}
            <section id="faculty" className="scroll-mt-32">
              <h3 className="text-[24px] font-bold text-[#141414] mb-2">Departmental Faculty</h3>
              <p className="text-gray-500 text-[14px] mb-10">Meet the scholars shaping the {data.title} program</p>

              {isLoadingBios ? (
                <div className="flex justify-center items-center py-24">
                  <div className="w-12 h-12 rounded-full border-4 border-gray-100 border-t-[#8A0000] animate-spin"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Full Professors */}
                  {facultyBios.filter(f => f.title === 'Professor').length > 0 && (
                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-8 h-8 rounded-full bg-[#8A0000] flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                        </div>
                        <h4 className="text-[13px] font-bold text-[#8A0000] uppercase tracking-widest">Full Professors</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {facultyBios.filter(f => f.title === 'Professor').map((bio, idx) => (
                          <FacultyCard key={idx} bio={bio} goToPage={goToPage} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Associate Professors */}
                  {facultyBios.filter(f => f.title === 'Associate Professor').length > 0 && (
                    <div className="mt-10">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-8 h-8 rounded-full bg-[#141414] flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                        </div>
                        <h4 className="text-[13px] font-bold text-[#141414] uppercase tracking-widest">Associate Professors</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {facultyBios.filter(f => f.title === 'Associate Professor').map((bio, idx) => (
                          <FacultyCard key={idx} bio={bio} goToPage={goToPage} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Assistant Professors */}
                  {facultyBios.filter(f => f.title === 'Assistant Professor').length > 0 && (
                    <div className="mt-10">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                        </div>
                        <h4 className="text-[13px] font-bold text-gray-600 uppercase tracking-widest">Assistant Professors</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {facultyBios.filter(f => f.title === 'Assistant Professor').map((bio, idx) => (
                          <FacultyCard key={idx} bio={bio} goToPage={goToPage} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Lecturers */}
                  {facultyBios.filter(f => f.title === 'Lecturer').length > 0 && (
                    <div className="mt-10">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        </div>
                        <h4 className="text-[13px] font-bold text-gray-500 uppercase tracking-widest">Lecturers & Senior Lectors</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {facultyBios.filter(f => f.title === 'Lecturer').map((bio, idx) => (
                          <FacultyCard key={idx} bio={bio} goToPage={goToPage} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Roadmap Section */}
            <section id="roadmap" className="scroll-mt-32">
              <div className="bg-[#141414] text-white p-10 rounded-2xl">
                <h3 className="text-[22px] font-bold mb-4">Navigational Roadmap</h3>
                <p className="text-gray-400 text-[16px] leading-relaxed mb-8">
                  Navigate your academic journey from orientation to graduation with our integrated visual mapping system.
                </p>
                <button onClick={() => goToPage('undergraduate')} className="inline-flex items-center space-x-4 px-8 py-3 bg-white text-[#141414] font-bold uppercase tracking-widest text-[12px] hover:bg-[#8A0000] hover:text-white transition-all transform hover:-translate-y-1">
                  <span>Open Roadmap Library</span>
                  <span className="text-lg">&#8599;</span>
                </button>
              </div>
            </section>

            {/* Courses Section */}
            <section id="courses" className="scroll-mt-32 pb-24">
              <h3 className="text-[24px] font-bold text-[#141414] mb-2">Course Directory</h3>
              <p className="text-gray-500 text-[14px] mb-8">Explore the full course catalogue for this program</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.coursesLinks.map((link, i) => (
                  <div key={i} className={`flex items-center px-6 py-5 rounded-xl font-bold text-[13px] tracking-wider uppercase ${i === 0 ? 'text-white bg-[#8A0000] shadow-lg shadow-[#8A0000]/20' : 'text-[#141414] bg-white border border-gray-200'}`}>
                    <span>{link.label}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      <SubPageFooter goToPage={goToPage} />

      {/* Floating Bottom CTA — visible on scroll */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-200 py-3 px-8 lg:px-20 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] lg:hidden">
        <div className="flex items-center justify-between max-w-[1400px] mx-auto">
          <div className="min-w-0">
            <p className="text-[14px] font-bold text-[#141414] truncate">{data.title}</p>
            <p className="text-[11px] text-gray-500">12 courses required</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => goToPage('admissions')}
              className="px-4 py-2.5 border border-[#8A0000] text-[#8A0000] text-[11px] font-bold uppercase tracking-wider hover:bg-[#8A0000] hover:text-white transition-colors"
            >
              Info
            </button>
            <button
              onClick={() => goToPage('apply')}
              className="px-5 py-2.5 bg-[#8A0000] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-[#6B0000] transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Faculty Card Sub-Component ─── */
function FacultyCard({ bio, goToPage }: { bio: { name: string; title: string; specialty: string; image: string; bio: string }; goToPage: (page: string) => void }) {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-[#8A0000]/20 transition-all duration-300">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-[#8A0000] to-[#8A0000]/40"></div>
      <div className="p-5">
        {/* Avatar + Name */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={bio.image}
            alt={bio.name}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-[#8A0000]/20 transition-all"
          />
          <div className="min-w-0">
            <h5 className="font-bold text-[15px] text-[#141414] group-hover:text-[#8A0000] transition-colors truncate">{bio.name}</h5>
            <p className="text-[11px] font-semibold text-[#8A0000] uppercase tracking-wider">{bio.title}</p>
          </div>
        </div>
        {/* Specialty tag */}
        <div className="mb-3">
          <span className="inline-block text-[11px] font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
            {bio.specialty}
          </span>
        </div>
        {/* Bio excerpt */}
        <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-3">
          {bio.bio}
        </p>
      </div>
    </div>
  );
}
