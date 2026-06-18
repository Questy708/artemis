'use client';

import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/artemis/Header';
import Sidebar from '@/components/artemis/Sidebar';
import Home from '@/components/artemis/Home';
import Research from '@/components/artemis/Research';
import Education from '@/components/artemis/Education';
import Innovation from '@/components/artemis/Innovation';
import Admissions from '@/components/artemis/Admissions';
import CampusLife from '@/components/artemis/CampusLife';
import Colleges from '@/components/artemis/Colleges';
import About from '@/components/artemis/About';

import TheUniversity from '@/components/artemis/TheUniversity';
import HowWeAreRun from '@/components/artemis/HowWeAreRun';
import OurPeople from '@/components/artemis/OurPeople';
import OurHistory from '@/components/artemis/OurHistory';
import FundraisingCampaign from '@/components/artemis/FundraisingCampaign';
import GenericAboutSubpage from '@/components/artemis/GenericAboutSubpage';
import GenericUniversitySubpage from '@/components/artemis/GenericUniversitySubpage';
import CollegiumAlliance from '@/components/artemis/CollegiumAlliance';

import UndergraduateStudy from '@/components/artemis/UndergraduateStudy';
import UndergraduateCurriculum from '@/components/artemis/UndergraduateCurriculum';

import ProgramsOfStudy from '@/components/artemis/ProgramsOfStudy';

import ProgramDetail from '@/components/artemis/ProgramDetail';
import Apply from '@/components/artemis/Apply';
import SchoolDetail from '@/components/artemis/SchoolDetail';
import AdmissionsSubpage from '@/components/artemis/AdmissionsSubpage';
import CentersOfInquiry from '@/components/artemis/CentersOfInquiry';
import CenterDetail from '@/components/artemis/CenterDetail';
import Blog from '@/components/artemis/Blog';
import BlogArticlePage from '@/components/artemis/BlogArticlePage';
import CareersPage from '@/components/artemis/CareersPage';
import ArtemisChatBot from '@/components/artemis/ArtemisChatBot';
import AdminDashboard from '@/components/artemis/AdminDashboard';
import T1Site from '@/components/t1/T1Site';
import ArtemisProjectApp from '@/components/artemis-project/ArtemisProjectApp';
import Breadcrumb, { BreadcrumbItem } from '@/components/artemis/Breadcrumb';
import SearchOverlay from '@/components/artemis/SearchOverlay';

/* ─── Page hierarchy map: child page → breadcrumb items ─── */
function getBreadcrumbs(currentPage: string, currentProgram: string): { items: BreadcrumbItem[]; currentLabel: string } | null {
  switch (currentPage) {
    case 'program_detail':
      return {
        items: [
          { label: 'Education', page: 'education' },
          { label: 'Programs of Study', page: 'programs' },
        ],
        currentLabel: currentProgram || 'Program Detail',
      };
    case 'school_detail':
      return {
        items: [
          { label: 'Colleges', page: 'colleges' },
        ],
        currentLabel: currentProgram || 'School Detail',
      };
    case 'center-detail':
      return {
        items: [
          { label: 'Research', page: 'research' },
          { label: 'Centers of Inquiry', page: 'centers-of-inquiry' },
        ],
        currentLabel: currentProgram || 'Center Detail',
      };
    case 'blog_article':
      return {
        items: [
          { label: 'Journal', page: 'blog' },
        ],
        currentLabel: currentProgram || 'Article',
      };
    case 'undergraduate':
      return {
        items: [
          { label: 'Education', page: 'education' },
        ],
        currentLabel: 'Undergraduate Study',
      };
    case 'undergraduate_curriculum':
      return {
        items: [
          { label: 'Education', page: 'education' },
          { label: 'Undergraduate Study', page: 'undergraduate' },
        ],
        currentLabel: 'Curriculum',
      };
    case 'programs':
      return {
        items: [
          { label: 'Education', page: 'education' },
        ],
        currentLabel: 'Programs of Study',
      };
    case 'centers-of-inquiry':
      return {
        items: [
          { label: 'Research', page: 'research' },
        ],
        currentLabel: 'Centers of Inquiry',
      };
    case 'collegium-alliance':
      return {
        items: [
          { label: 'Research', page: 'research' },
        ],
        currentLabel: 'Collegium Alliance',
      };
    // About subpages
    case 'how-we-are-run':
      return {
        items: [{ label: 'About', page: 'about' }],
        currentLabel: 'How We Are Run',
      };
    case 'our-people':
      return {
        items: [{ label: 'About', page: 'about' }],
        currentLabel: 'Our People',
      };
    case 'history':
      return {
        items: [{ label: 'About', page: 'about' }],
        currentLabel: 'History',
      };
    case 'access-at-artemis':
      return {
        items: [{ label: 'About', page: 'about' }],
        currentLabel: 'Access at Artemis',
      };
    case 'artemis-in-the-world':
      return {
        items: [{ label: 'About', page: 'about' }],
        currentLabel: 'Artemis in the World',
      };
    case 'visit-us':
      return {
        items: [{ label: 'About', page: 'about' }],
        currentLabel: 'Visit Us',
      };
    case 'jobs':
      return {
        items: [{ label: 'About', page: 'about' }],
        currentLabel: 'Careers',
      };
    case 'contact-us':
      return {
        items: [{ label: 'About', page: 'about' }],
        currentLabel: 'Contact Us',
      };
    case 'governance-finance':
      return {
        items: [
          { label: 'About', page: 'about' },
          { label: 'How We Are Run', page: 'how-we-are-run' },
        ],
        currentLabel: 'Governance & Finance',
      };
    case 'policies':
      return {
        items: [
          { label: 'About', page: 'about' },
          { label: 'How We Are Run', page: 'how-we-are-run' },
        ],
        currentLabel: 'Policies',
      };
    case 'strategic-plan':
      return {
        items: [
          { label: 'About', page: 'about' },
          { label: 'How We Are Run', page: 'how-we-are-run' },
        ],
        currentLabel: 'Strategic Plan',
      };
    case 'improvement':
      return {
        items: [
          { label: 'About', page: 'about' },
          { label: 'How We Are Run', page: 'how-we-are-run' },
        ],
        currentLabel: 'Continuous Improvement',
      };
    case 'equality':
      return {
        items: [
          { label: 'About', page: 'about' },
          { label: 'How We Are Run', page: 'how-we-are-run' },
        ],
        currentLabel: 'Equality & Diversity',
      };
    case 'sustainability':
      return {
        items: [
          { label: 'About', page: 'about' },
          { label: 'How We Are Run', page: 'how-we-are-run' },
        ],
        currentLabel: 'Sustainability',
      };
    case 'gazette':
      return {
        items: [
          { label: 'About', page: 'about' },
          { label: 'How We Are Run', page: 'how-we-are-run' },
        ],
        currentLabel: 'The Gazette',
      };
    // University subpages
    case 'the-university':
      return {
        items: [{ label: 'About', page: 'about' }],
        currentLabel: 'The University',
      };
    case 'facts':
      return {
        items: [
          { label: 'About', page: 'about' },
          { label: 'The University', page: 'the-university' },
        ],
        currentLabel: 'Facts & Figures',
      };
    case 'glossary':
      return {
        items: [
          { label: 'About', page: 'about' },
          { label: 'The University', page: 'the-university' },
        ],
        currentLabel: 'Glossary',
      };
    case 'estate':
      return {
        items: [
          { label: 'About', page: 'about' },
          { label: 'The University', page: 'the-university' },
        ],
        currentLabel: 'Our Estate',
      };
    case 'brand':
      return {
        items: [
          { label: 'About', page: 'about' },
          { label: 'The University', page: 'the-university' },
        ],
        currentLabel: 'Brand',
      };
    // Admissions subpages
    case 'tuition-expenses':
      return {
        items: [{ label: 'Admissions + Aid', page: 'admissions' }],
        currentLabel: 'Tuition & Expenses',
      };
    case 'international-students':
      return {
        items: [{ label: 'Admissions + Aid', page: 'admissions' }],
        currentLabel: 'International Students',
      };
    case 'transfer-students':
      return {
        items: [{ label: 'Admissions + Aid', page: 'admissions' }],
        currentLabel: 'Transfer Students',
      };
    case 'application-deadlines':
      return {
        items: [{ label: 'Admissions + Aid', page: 'admissions' }],
        currentLabel: 'Application Deadlines',
      };
    case 'visit-campus':
      return {
        items: [{ label: 'Admissions + Aid', page: 'admissions' }],
        currentLabel: 'Visit Campus',
      };
    case 'graduate-coming-soon':
      return {
        items: [{ label: 'Admissions + Aid', page: 'admissions' }],
        currentLabel: 'Graduate Programs',
      };
    // Other
    case 'fundraising':
      return {
        items: [],
        currentLabel: 'Give',
      };
    case 'nodes':
      return {
        items: [{ label: 'About', page: 'about' }],
        currentLabel: 'Institutional Nodes',
      };
    case 'visiting':
      return {
        items: [{ label: 'About', page: 'about' }],
        currentLabel: 'Visiting the Colleges',
      };
    case 'admin':
      return {
        items: [],
        currentLabel: 'Admin Dashboard',
      };

    default:
      return null;
  }
}

/* ─── Page transition wrapper ─── */
function PageTransition({ pageKey, children }: { pageKey: string; children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(true);
  const prevKeyRef = useRef(pageKey);

  useEffect(() => {
    if (prevKeyRef.current !== pageKey) {
      setIsVisible(false);
      // Brief fade out then fade in
      const timer = setTimeout(() => {
        setIsVisible(true);
        prevKeyRef.current = pageKey;
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [pageKey]);

  return (
    <div
      className={`transition-all duration-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
    >
      {children}
    </div>
  );
}

export default function ArtemisApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentProgram, setCurrentProgram] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Keyboard shortcuts: Cmd/Ctrl+K to open search, Cmd/Ctrl+Shift+A for admin
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setCurrentPage('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const goToPage = (page: string, program?: string) => {
    setCurrentPage(page);
    if (program) {
      setCurrentProgram(program);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Track scroll for Back to Top button and progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pageKey = `${currentPage}-${currentProgram}`;

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home goToPage={goToPage} />;
      case 'research':
        return <Research goToPage={goToPage} />;
      case 'centers-of-inquiry':
        return <CentersOfInquiry goToPage={goToPage} />;
      case 'center-detail':
        return <CenterDetail goToPage={goToPage} centerSlug={currentProgram} />;
      case 'education':
        return <Education goToPage={goToPage} />;
      case 'undergraduate':
        return <UndergraduateStudy goToPage={goToPage} />;
      case 'undergraduate_curriculum':
        return <UndergraduateCurriculum goToPage={goToPage} />;
      case 'programs':
        return <ProgramsOfStudy goToPage={goToPage} />;
      case 'program_detail':
        return <ProgramDetail goToPage={goToPage} programName={currentProgram} />;
      case 'school_detail':
        return <SchoolDetail goToPage={goToPage} schoolName={currentProgram} />;
      case 'apply':
        return <Apply goToPage={goToPage} />;

      // Admissions & Aid Subpages
      case 'tuition-expenses':
        return <AdmissionsSubpage goToPage={goToPage} pageId="tuition-expenses" />;
      case 'international-students':
        return <AdmissionsSubpage goToPage={goToPage} pageId="international-students" />;
      case 'transfer-students':
        return <AdmissionsSubpage goToPage={goToPage} pageId="transfer-students" />;
      case 'application-deadlines':
        return <AdmissionsSubpage goToPage={goToPage} pageId="application-deadlines" />;
      case 'visit-campus':
        return <AdmissionsSubpage goToPage={goToPage} pageId="visit-campus" />;
      case 'graduate-coming-soon':
        return <AdmissionsSubpage goToPage={goToPage} pageId="graduate-coming-soon" />;
      case 'innovation':
        return <Innovation goToPage={goToPage} />;
      case 'admissions':
        return <Admissions goToPage={goToPage} />;
      case 'campus':
        return <CampusLife goToPage={goToPage} />;
      case 'colleges':
        return <Colleges goToPage={goToPage} />;
      case 'collegium-alliance':
        return <CollegiumAlliance goToPage={goToPage} />;
      case 'blog':
        return <Blog goToPage={goToPage} />;
      case 'blog_article':
        return <BlogArticlePage goToPage={goToPage} articleSlug={currentProgram} />;
      case 'about':
        return <About goToPage={goToPage} />;
      case 'the-university':
        return <TheUniversity goToPage={goToPage} />;
      case 'catalog_page':
        return <GenericAboutSubpage goToPage={goToPage} id="catalog" title={currentProgram || 'Catalog Segment'} description="Artemis College Programs of Study component." />;
      case 'how-we-are-run':
        return <HowWeAreRun goToPage={goToPage} />;
      case 'fundraising':
        return <FundraisingCampaign goToPage={goToPage} />;
      case 'our-people':
        return <OurPeople goToPage={goToPage} />;
      case 'access-at-artemis':
        return <GenericAboutSubpage goToPage={goToPage} id="access" title="Access at Artemis" description="Ensuring equality of opportunity across the Artemis network." />;
      case 'artemis-in-the-world':
        return <GenericAboutSubpage goToPage={goToPage} id="world" title="Artemis in the world" description="Our global footprint and international research nodes." />;
      case 'visit-us':
        return <GenericAboutSubpage goToPage={goToPage} id="visit" title="Visit us" description="Guidelines for visiting our residency hubs and historic colleges." />;
      case 'jobs':
        return <CareersPage goToPage={goToPage} />;
      case 'contact-us':
        return <GenericAboutSubpage goToPage={goToPage} id="contact" title="Contact us" description="Connect with the Artemis Collegium central administration." />;
      
      // The University Subsections
      case 'history':
        return <OurHistory goToPage={goToPage} />;
      case 'facts':
        return <GenericUniversitySubpage goToPage={goToPage} title="Facts and figures" parentTitle="The University" parentId="the-university" />;
      case 'glossary':
        return <GenericUniversitySubpage goToPage={goToPage} title="Artemis Glossary" parentTitle="The University" parentId="the-university" />;
      case 'estate':
        return <GenericUniversitySubpage goToPage={goToPage} title="Our estate" parentTitle="The University" parentId="the-university" />;
      case 'brand':
        return <GenericUniversitySubpage goToPage={goToPage} title="Brand" parentTitle="The University" parentId="the-university" />;

      // How We Are Run Subsections
      case 'governance-finance':
        return <GenericAboutSubpage goToPage={goToPage} id="governance" title="Governance & Finance" description="How the internal systems of the university maintain operational excellence and financial sustainability." />;
      case 'policies':
        return <GenericAboutSubpage goToPage={goToPage} id="policies" title="Policies and Statements" description="Official university policies, regulatory statements, and institutional commitments." />;
      case 'strategic-plan':
        return <GenericAboutSubpage goToPage={goToPage} id="strategic" title="Strategic Plan" description="The Artemis 2025-2030 strategic plan for global expansion and academic excellence." />;
      case 'improvement':
        return <GenericAboutSubpage goToPage={goToPage} id="improvement" title="Change and Continuous Improvement" description="How Artemis embeds continuous improvement into every layer of the institution." />;
      case 'equality':
        return <GenericAboutSubpage goToPage={goToPage} id="equality" title="Equality and Diversity" description="Our commitment to building a diverse, equitable, and inclusive global community." />;
      case 'sustainability':
        return <GenericAboutSubpage goToPage={goToPage} id="sustainability" title="Sustainability" description="Artemis's commitment to environmental stewardship and carbon-negative operations." />;
      case 'gazette':
        return <GenericAboutSubpage goToPage={goToPage} id="gazette" title="The Gazette" description="The official publication of the University of Artemis — news, appointments, and notices." />;
      case 'nodes':
        return <GenericAboutSubpage goToPage={goToPage} id="world" title="Institutional Nodes" description="Artemis Collegium academic hubs and specialized research nodes across the globe." />;
      case 'visiting':
        return <GenericAboutSubpage goToPage={goToPage} id="visit" title="Visiting the Colleges" description="Information on opening times and admission protocols for our physical colleges." />;
      case 'admin':
        return <AdminDashboard goToPage={goToPage} />;

      default:
        return <Home goToPage={goToPage} />;
    }
  };

  const isHome = currentPage === 'home';
  const isMicroSite = currentPage === 't1' || currentPage === 'artemis-project';

  // Get breadcrumbs for current page
  const breadcrumbData = !isHome && !isMicroSite ? getBreadcrumbs(currentPage, currentProgram) : null;

  // Micro-sites render fullscreen with their own navbar/footer
  if (isMicroSite) {
    if (currentPage === 'artemis-project') {
      return (
        <div className="w-full min-h-screen">
          <ArtemisProjectApp onExit={() => goToPage('home')} />
        </div>
      );
    }
    return (
      <div className="w-full min-h-screen">
        <T1Site onExit={() => goToPage('home')} />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white flex flex-col font-sans text-[#141414]">
      {/* Fixed Header — always full-width, transparent over hero, opaque on scroll */}
      <Header
        onMenuClick={() => setSidebarOpen(true)}
        goHome={() => { setCurrentPage('home'); setSidebarOpen(false); }}
        goToPage={goToPage}
        onSearchClick={() => setSearchOpen(true)}
        currentPage={currentPage}
      />

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setSearchOpen(false)}
        goToPage={goToPage}
      />

      {/* Spacer for fixed header height — adjusted for announcement ticker */}
      <div className="h-20 shrink-0" />

      {isHome ? (
        /* ─── Homepage: sidebar + content side-by-side, centered with max-width ─── */
        <div className="flex flex-1 justify-center relative">
          <div className="flex w-full max-w-[1440px]">
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setSidebarOpen(false)}
              goHome={() => { setCurrentPage('home'); setSidebarOpen(false); }}
              goToPage={goToPage}
              onSearchClick={() => setSearchOpen(true)}
            />
            <main className="flex-1 flex flex-col min-w-0">
              <PageTransition pageKey={pageKey}>
                {renderPage()}
              </PageTransition>
            </main>
          </div>
        </div>
      ) : (
        /* ─── Subpages: full-viewport-width content, no sidebar in flow ─── */
        <>
          {/* Mobile drawer only — uses fixed positioning, zero layout impact */}
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setSidebarOpen(false)}
            goHome={() => { setCurrentPage('home'); setSidebarOpen(false); }}
            goToPage={goToPage}
            hideDesktopSidebar={true}
            onSearchClick={() => setSearchOpen(true)}
          />

          {/* Breadcrumb navigation — only on subpages */}
          {breadcrumbData && (
            <Breadcrumb
              items={breadcrumbData.items}
              currentPage={breadcrumbData.currentLabel}
              goToPage={goToPage}
              showBack={true}
            />
          )}

          <main className="flex-1 flex flex-col w-full">
            <PageTransition pageKey={pageKey}>
              {renderPage()}
            </PageTransition>
          </main>
        </>
      )}

      <ArtemisChatBot />

      {/* Enhanced Back to Top Button with Circular Progress Ring */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-[#121212] hover:bg-[#8A0000] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all lg:bottom-8 lg:right-8 group"
          aria-label="Back to top"
        >
          {/* Progress Ring Outline */}
          <svg className="w-12 h-12 absolute inset-0 -rotate-90 pointer-events-none">
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="2"
              fill="transparent"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="#8A0000"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 20}`}
              strokeDashoffset={`${2 * Math.PI * 20 * (1 - scrollProgress / 100)}`}
              className="transition-all duration-75"
            />
          </svg>
          <svg className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}

      {/* Mobile Bottom Tab Bar — only on small screens */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 lg:hidden safe-area-bottom">
        <div className="flex items-center justify-around h-14">
          {[
            { label: 'Home', page: 'home', icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            )},
            { label: 'Programs', page: 'programs', icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            )},
            { label: 'Admissions', page: 'admissions', icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            )},
            { label: 'Apply', page: 'apply', icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            )},
            { label: 'Search', page: '_search', icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            )},
          ].map((tab) => (
            <button
              key={tab.label}
              onClick={() => {
                if (tab.page === '_search') {
                  setSearchOpen(true);
                } else {
                  goToPage(tab.page);
                }
              }}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors ${
                currentPage === tab.page ? 'text-[#8A0000]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.icon}
              <span className="text-[9px] font-bold uppercase tracking-wider">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
