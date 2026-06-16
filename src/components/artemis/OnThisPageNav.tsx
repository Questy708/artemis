'use client';

import { useState, useEffect } from 'react';

/* ─── Hook: track which section is currently in view ─── */
export function useActiveSection(sectionIds: string[], offset = 160) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');

  useEffect(() => {
    const handleScroll = () => {
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom > offset) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
}

/* ─── Types ─── */
interface NavSection {
  id: string;
  label: string;
}

interface OnThisPageNavProps {
  sections: NavSection[];
  activeSection: string;
}

/* ─── Component: "On This Page" sticky navigation bar ─── */
export default function OnThisPageNav({ sections, activeSection }: OnThisPageNavProps) {
  return (
    <div className="sticky top-[50px] z-40 bg-white border-b border-gray-200 w-full">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20">
        <div className="flex items-center h-[52px] gap-4 sm:gap-8 overflow-x-auto hide-scrollbar">
          <span className="text-[13px] font-bold text-[#8A0000] whitespace-nowrap shrink-0">
            On This Page:
          </span>
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`text-[13px] font-semibold whitespace-nowrap shrink-0 transition-colors border-b-2 pb-1 ${
                activeSection === s.id
                  ? 'text-[#8A0000] border-[#8A0000]'
                  : 'text-gray-500 border-transparent hover:text-[#8A0000] hover:border-[#8A0000]'
              }`}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
