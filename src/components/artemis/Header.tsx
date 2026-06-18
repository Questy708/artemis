'use client';

import { Search, Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

/* ─── Artemis Shield Logo ─── */
function ArtemisLogo({ size = 28, color = 'white' }: { size?: number; color?: 'white' | 'crimson' }) {
  const stroke = color === 'white' ? 'white' : '#8A0000';
  const fill = color === 'white' ? 'white' : '#8A0000';
  const bgFill = color === 'white' ? 'rgba(255,255,255,0.08)' : 'rgba(138,0,0,0.06)';
  const lineColor = color === 'white' ? 'rgba(255,255,255,0.3)' : 'rgba(138,0,0,0.25)';
  const dotColor = color === 'white' ? 'rgba(255,255,255,0.5)' : 'rgba(138,0,0,0.4)';

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 3L4 9V19.5C4 28.5 11 35.5 20 37.5C29 35.5 36 28.5 36 19.5V9L20 3Z"
        stroke={stroke}
        strokeWidth="1.8"
        fill="none"
      />
      <path
        d="M20 5.5L6.5 10.8V19.5C6.5 27.2 12.4 33.2 20 35C27.6 33.2 33.5 27.2 33.5 19.5V10.8L20 5.5Z"
        fill={bgFill}
      />
      <path
        d="M20 11L14 24H16.5L17.8 20.8H22.2L23.5 24H26L20 11ZM18.6 18.8L20 14.8L21.4 18.8H18.6Z"
        fill={fill}
      />
      <line x1="12" y1="28" x2="28" y2="28" stroke={lineColor} strokeWidth="0.8" />
      <circle cx="15" cy="30.5" r="0.8" fill={dotColor} />
      <circle cx="20" cy="30.5" r="0.8" fill={dotColor} />
      <circle cx="25" cy="30.5" r="0.8" fill={dotColor} />
    </svg>
  );
}

/* ─── Navigation structure with dropdowns ─── */
interface NavChild {
  label: string;
  page: string;
  description?: string;
}

interface NavLink {
  label: string;
  page: string;
  children?: NavChild[];
}

const NAV_STRUCTURE: NavLink[] = [
  {
    label: 'Education',
    page: 'education',
    children: [
      { label: 'Undergraduate Study', page: 'undergraduate', description: 'Degree programmes and pathways' },
      { label: 'Programs of Study', page: 'programs', description: 'Browse all available programmes' },
    ],
  },
  {
    label: 'Research',
    page: 'research',
    children: [
      { label: 'Centers of Inquiry', page: 'centers-of-inquiry', description: 'Interdisciplinary research hubs' },
      { label: 'Collegium Alliance', page: 'collegium-alliance', description: 'Global research collaboration' },
    ],
  },
  {
    label: 'Innovation',
    page: 'innovation',
  },
  {
    label: 'Admissions',
    page: 'admissions',
    children: [
      { label: 'Tuition & Expenses', page: 'tuition-expenses', description: 'Fees, funding and financial aid' },
      { label: 'International Students', page: 'international-students', description: 'Requirements and support' },
      { label: 'Transfer Students', page: 'transfer-students', description: 'Credit transfer and pathways' },
      { label: 'Application Deadlines', page: 'application-deadlines', description: 'Key dates and timelines' },
      { label: 'Visit Campus', page: 'visit-campus', description: 'Tours and open days' },
      { label: 'Graduate Programs', page: 'graduate-coming-soon', description: 'Postgraduate study options' },
    ],
  },
  {
    label: 'Campus Life',
    page: 'campus',
  },
  {
    label: 'Colleges',
    page: 'colleges',
  },
  {
    label: 'About',
    page: 'about',
    children: [
      { label: 'The University', page: 'the-university', description: 'Mission, facts and governance' },
      { label: 'How We Are Run', page: 'how-we-are-run', description: 'Governance and organisation' },
      { label: 'Our People', page: 'our-people', description: 'Leadership and faculty' },
      { label: 'History', page: 'history', description: 'Our founding and heritage' },
      { label: 'Access at Artemis', page: 'access-at-artemis', description: 'Inclusion and accessibility' },
      { label: 'Careers', page: 'jobs', description: 'Work with us' },
      { label: 'Contact Us', page: 'contact-us', description: 'Get in touch' },
    ],
  },
  {
    label: 'Journal',
    page: 'blog',
  },
];

interface HeaderProps {
  onMenuClick: () => void;
  goHome: () => void;
  goToPage: (page: string) => void;
  onSearchClick?: () => void;
  currentPage?: string;
}

export default function Header({ onMenuClick, goHome, goToPage, onSearchClick, currentPage = 'home' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenSection, setMobileOpenSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to check if a page or any of its children is active
  const isActive = (link: NavLink) => {
    if (currentPage === link.page) return true;
    if (link.children?.some(c => c.page === currentPage)) return true;
    return false;
  };

  return (
    <header className={cn(
      "w-full fixed top-0 left-0 z-[100] transition-all duration-300",
      scrolled
        ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]"
        : "bg-white/70 backdrop-blur-lg"
    )}>
      {/* ─── Inline marquee animation ─── */}
      <style>{`
        @keyframes header-marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-header-marquee {
          display: inline-flex;
          white-space: nowrap;
          animation: header-marquee 40s linear infinite;
        }
      `}</style>

      {/* ─── Announcement Ticker Bar ─── */}
      <div className="w-full bg-[#121212] text-white py-1 border-b border-[#8A0000]/20 overflow-hidden relative z-[101]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20 flex items-center justify-between text-[9px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 mr-4 shrink-0 bg-[#121212] pr-4 z-10 relative">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8A0000] animate-pulse"></span>
            <span className="font-bold text-[#8A0000]">BULLETIN:</span>
          </div>
          <div className="flex-1 overflow-hidden relative">
            <div className="animate-header-marquee flex gap-16 hover:[animation-play-state:paused] cursor-help">
              <span>• APPLICATIONS FOR FELLOWS COHORT 2026 GENERAL ACCREDITED ADMISSIONS ARE NOW OPEN •</span>
              <span>• SPECIAL BRIEFING: NAVIGATING POST-LABOUR CIVILIZATION SYSTEM CHANNELS AT 18:00 UTC •</span>
              <span>• NEWMicro-Colleges added in Kigali and Valletta Nodes •</span>
              <span>• RESEARCH UPDATE: SYNTHETIC BIOLOGY SKILLS-GAP ANALYSIS CO-PUBLISHED IN THE COMMONS •</span>
              {/* Duplicate for infinite effect */}
              <span>• APPLICATIONS FOR FELLOWS COHORT 2026 GENERAL ACCREDITED ADMISSIONS ARE NOW OPEN •</span>
              <span>• SPECIAL BRIEFING: NAVIGATING POST-LABOUR CIVILIZATION SYSTEM CHANNELS AT 18:00 UTC •</span>
              <span>• NEWMicro-Colleges added in Kigali and Valletta Nodes •</span>
              <span>• RESEARCH UPDATE: SYNTHETIC BIOLOGY SKILLS-GAP ANALYSIS CO-PUBLISHED IN THE COMMONS •</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between h-14 max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">

        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <button className="lg:hidden p-1.5" onClick={() => { onMenuClick(); }}>
            <Menu size={20} className="text-gray-900" />
          </button>
          <button
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={goHome}
          >
            <ArtemisLogo size={28} color="crimson" />
            <div className="leading-[1.15] group-hover:opacity-80 transition-opacity text-gray-900">
              <div className="text-[11px] font-semibold tracking-tight">University of</div>
              <div className="text-[13px] font-bold tracking-tight">Artemis</div>
            </div>
          </button>
        </div>

        {/* Center: Desktop Nav Links with Dropdowns */}
        <nav className="hidden lg:flex items-center gap-1 text-[11px] font-bold tracking-[0.15em] uppercase text-gray-500">
          {NAV_STRUCTURE.map((link) => (
            link.children ? (
              <div
                key={link.page}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.page)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  onClick={() => goToPage(link.page)}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 transition-all cursor-pointer relative group",
                    isActive(link) ? "text-gray-900" : "hover:text-gray-900"
                  )}
                  suppressHydrationWarning
                >
                  <span>{link.label}</span> <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  <span className={cn(
                    "absolute bottom-[-2px] left-3 right-6 h-[2.5px] bg-[#8A0000] transition-all duration-300 origin-left scale-y-75",
                    isActive(link) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )} />
                </button>

                {/* Dropdown panel */}
                {openDropdown === link.page && (
                  <div className="absolute top-full left-0 pt-1">
                    <div className="bg-white border border-gray-100 shadow-2xl shadow-black/10 flex flex-col min-w-[280px] overflow-hidden">
                      {/* Main page link */}
                      <button
                        onClick={() => { goToPage(link.page); setOpenDropdown(null); }}
                        className={cn(
                          "px-6 py-3.5 hover:bg-gray-50 transition-colors text-[11px] text-left cursor-pointer flex items-center gap-4 border-b border-gray-100",
                          currentPage === link.page ? "text-gray-900 font-bold" : "text-gray-700"
                        )}
                      >
                        <span className="w-5 text-gray-300">
                          <ArtemisLogo size={14} color="crimson" />
                        </span>
                        <span>All {link.label}</span>
                      </button>
                      {/* Children */}
                      {link.children.map((child) => (
                        <button
                          key={child.page}
                          onClick={() => { goToPage(child.page); setOpenDropdown(null); }}
                          className={cn(
                            "px-6 py-3.5 hover:bg-gray-50 transition-colors text-left cursor-pointer border-b border-gray-50 last:border-0",
                            currentPage === child.page ? "bg-gray-50" : ""
                          )}
                        >
                          <div className={cn(
                            "text-[11px] font-bold tracking-[0.1em] uppercase",
                            currentPage === child.page ? "text-gray-900" : "text-gray-600"
                          )}>
                            {child.label}
                          </div>
                          {child.description && (
                            <div className="text-[10px] text-gray-400 mt-0.5 normal-case tracking-normal font-normal">
                              {child.description}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                key={link.page}
                onClick={() => goToPage(link.page)}
                className={cn(
                  "px-3 py-2 transition-all cursor-pointer relative group",
                  currentPage === link.page ? "text-gray-900" : "hover:text-gray-900"
                )}
                suppressHydrationWarning
              >
                <span>{link.label}</span>
                <span className={cn(
                  "absolute bottom-[-2px] left-3 right-3 h-[2.5px] bg-[#8A0000] transition-all duration-300 origin-left scale-y-75",
                  currentPage === link.page ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )} />
              </button>
            )
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* 2100 badge */}
          <button
            onClick={() => goToPage('t1')}
            className="hidden lg:inline-flex border border-[#007f9c]/40 text-[#007f9c] px-3 py-1 text-[10px] uppercase tracking-wider cursor-pointer transition-colors hover:bg-[#007f9c]/10"
            suppressHydrationWarning
          >
            2100
          </button>

          {/* Give */}
          <button
            onClick={() => goToPage('fundraising')}
            className="hidden lg:inline-flex border border-gray-300 text-gray-600 px-3 py-1 text-[10px] uppercase tracking-wider cursor-pointer transition-colors hover:bg-gray-50"
            suppressHydrationWarning
          >
            Give
          </button>

          {/* Give 2 — modern redesign */}
          <button
            onClick={() => goToPage('give-2')}
            className="hidden lg:inline-flex border border-[#8A0000] text-[#8A0000] px-3 py-1 text-[10px] uppercase tracking-wider cursor-pointer transition-colors hover:bg-[#8A0000] hover:text-white"
            suppressHydrationWarning
          >
            Give 2
          </button>

          {/* Apply */}
          <button
            onClick={() => goToPage('apply')}
            className="hidden lg:inline-flex px-3 py-1 text-[10px] uppercase tracking-wider cursor-pointer transition-colors bg-[#8A0000] text-white hover:bg-[#6B0000]"
            suppressHydrationWarning
          >
            Apply
          </button>

          {/* Search */}
          <button
            onClick={onSearchClick}
            className="flex items-center cursor-pointer p-2 hover:opacity-70 transition-opacity text-gray-600"
            aria-label="Search"
            suppressHydrationWarning
          >
            <Search size={17} />
          </button>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-1.5 text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ─── Mobile Menu ─── */}
      {mobileMenuOpen && (
        <div className="w-full bg-white shadow-xl shadow-black/10 flex flex-col md:hidden max-h-[80vh] overflow-y-auto">
          {NAV_STRUCTURE.map((link) => (
            <div key={link.page}>
              {link.children ? (
                <>
                  <div className="flex items-center justify-between px-6 py-3">
                    <button
                      onClick={() => goToPage(link.page)}
                      className={cn(
                        "text-[12px] font-bold tracking-[0.15em] uppercase cursor-pointer",
                        currentPage === link.page ? "text-gray-900" : "text-gray-500"
                      )}
                      suppressHydrationWarning
                    >
                      {link.label}
                    </button>
                    <button
                      onClick={() => setMobileOpenSection(mobileOpenSection === link.page ? null : link.page)}
                      className="p-1 cursor-pointer"
                    >
                      <ChevronDown className={cn(
                        "w-4 h-4 text-gray-400 transition-transform",
                        mobileOpenSection === link.page && "rotate-180"
                      )} />
                    </button>
                  </div>
                  {mobileOpenSection === link.page && (
                    <div className="flex flex-col pb-2 border-l-2 border-gray-100 ml-6">
                      {link.children.map((child) => (
                        <button
                          key={child.page}
                          onClick={() => { goToPage(child.page); setMobileMenuOpen(false); }}
                          className={cn(
                            "py-2.5 pl-6 pr-6 text-left text-[11px] font-bold tracking-[0.1em] uppercase cursor-pointer",
                            currentPage === child.page ? "text-gray-900" : "text-gray-500"
                          )}
                          suppressHydrationWarning
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => { goToPage(link.page); setMobileMenuOpen(false); }}
                  className={cn(
                    "w-full text-left px-6 py-3 text-[12px] font-bold tracking-[0.15em] uppercase cursor-pointer",
                    currentPage === link.page ? "text-gray-900" : "text-gray-500"
                  )}
                  suppressHydrationWarning
                >
                  {link.label}
                </button>
              )}
            </div>
          ))}

          {/* Mobile action buttons */}
          <div className="flex gap-2 px-6 py-4 border-t border-gray-100 mt-2">
            <button
              onClick={() => { goToPage('give-2'); setMobileMenuOpen(false); }}
              className="flex-1 py-2.5 border border-[#8A0000] text-[#8A0000] text-[11px] font-bold uppercase tracking-wider hover:bg-[#8A0000] hover:text-white transition-colors text-center"
              suppressHydrationWarning
            >
              Give 2
            </button>
            <button
              onClick={() => { goToPage('apply'); setMobileMenuOpen(false); }}
              className="flex-1 py-2.5 bg-[#8A0000] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-[#6B0000] transition-colors text-center"
              suppressHydrationWarning
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
