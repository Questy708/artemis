'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  goToPage: (page: string, program?: string) => void;
}

interface SearchResult {
  title: string;
  page: string;
  program?: string;
  category: string;
}

const searchIndex: SearchResult[] = [
  // Education
  { title: 'Education', page: 'education', category: 'Education' },
  { title: 'Undergraduate Study', page: 'undergraduate', category: 'Education' },
  { title: 'Undergraduate Curriculum', page: 'undergraduate_curriculum', category: 'Education' },
  { title: 'Programs of Study', page: 'programs', category: 'Education' },
  // Research
  { title: 'Research', page: 'research', category: 'Research' },
  { title: 'Centers of Inquiry', page: 'centers-of-inquiry', category: 'Research' },
  { title: 'Collegium Alliance', page: 'collegium-alliance', category: 'Research' },
  // Innovation
  { title: 'Innovation', page: 'innovation', category: 'Innovation' },
  // Admissions
  { title: 'Admissions + Aid', page: 'admissions', category: 'Admissions' },
  { title: 'Tuition & Expenses', page: 'tuition-expenses', category: 'Admissions' },
  { title: 'International Students', page: 'international-students', category: 'Admissions' },
  { title: 'Transfer Students', page: 'transfer-students', category: 'Admissions' },
  { title: 'Application Deadlines', page: 'application-deadlines', category: 'Admissions' },
  { title: 'Visit Campus', page: 'visit-campus', category: 'Admissions' },
  { title: 'Apply Now', page: 'apply', category: 'Admissions' },
  // Campus
  { title: 'Campus Life', page: 'campus', category: 'Campus' },
  // Colleges
  { title: 'Colleges', page: 'colleges', category: 'Colleges' },
  // About
  { title: 'About Artemis', page: 'about', category: 'About' },
  { title: 'The University', page: 'the-university', category: 'About' },
  { title: 'How We Are Run', page: 'how-we-are-run', category: 'About' },
  { title: 'Our People', page: 'our-people', category: 'About' },
  { title: 'Our History', page: 'history', category: 'About' },
  { title: 'Access at Artemis', page: 'access-at-artemis', category: 'About' },
  { title: 'Artemis in the World', page: 'artemis-in-the-world', category: 'About' },
  { title: 'Visit Us', page: 'visit-us', category: 'About' },
  { title: 'Careers', page: 'jobs', category: 'About' },
  { title: 'Contact Us', page: 'contact-us', category: 'About' },
  { title: 'Facts and Figures', page: 'facts', category: 'About' },
  { title: 'Artemis Glossary', page: 'glossary', category: 'About' },
  { title: 'Our Estate', page: 'estate', category: 'About' },
  { title: 'Brand', page: 'brand', category: 'About' },
  // Other
  { title: 'Journal / Blog', page: 'blog', category: 'Other' },
  { title: 'Give / Fundraising', page: 'fundraising', category: 'Other' },
  { title: 'Governance & Finance', page: 'governance-finance', category: 'About' },
  { title: 'Policies', page: 'policies', category: 'About' },
  { title: 'Strategic Plan', page: 'strategic-plan', category: 'About' },
  { title: 'Sustainability', page: 'sustainability', category: 'About' },
  { title: 'Equality and Diversity', page: 'equality', category: 'About' },
  // Experience
  { title: 'Artemis 2100 — Future of Education', page: 't1', category: 'Experience' },
];

export default function SearchOverlay({ isOpen, onClose, goToPage }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Focus input when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const filteredResults = query.trim().length > 0
    ? searchIndex.filter(r =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelect = useCallback((result: SearchResult) => {
    goToPage(result.page, result.program);
    onClose();
  }, [goToPage, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-[15vh] animate-in fade-in duration-200"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="bg-white w-full max-w-[640px] mx-4 shadow-2xl rounded-lg overflow-hidden border border-gray-200">
        {/* Search input */}
        <div className="flex items-center px-5 py-4 border-b border-gray-100 gap-3">
          <Search size={20} className="text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, programs, and resources..."
            className="flex-1 text-[15px] text-[#141414] placeholder-gray-400 outline-none bg-transparent"
            suppressHydrationWarning
          />
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors" suppressHydrationWarning>
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Results */}
        {query.trim().length > 0 && (
          <div className="max-h-[400px] overflow-y-auto py-2">
            {filteredResults.length > 0 ? (
              <>
                {filteredResults.map((result, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(result)}
                    className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors text-left group"
                    suppressHydrationWarning
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] bg-[#8A0000]/5 px-2 py-0.5 rounded shrink-0">
                        {result.category}
                      </span>
                      <span className="text-[14px] font-medium text-[#141414] truncate">
                        {result.title}
                      </span>
                    </div>
                    <ArrowRight size={14} className="text-gray-300 group-hover:text-[#8A0000] group-hover:translate-x-0.5 transition-all shrink-0 ml-3" />
                  </button>
                ))}
              </>
            ) : (
              <div className="px-5 py-8 text-center">
                <p className="text-[14px] text-gray-400">No results found for &ldquo;{query}&rdquo;</p>
              </div>
            )}
          </div>
        )}

        {/* Quick links when empty */}
        {query.trim().length === 0 && (
          <div className="py-4 px-5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Quick Links</p>
            <div className="flex flex-wrap gap-2">
              {['Programs', 'Admissions', 'Research', 'Campus Life', 'Colleges', 'Apply'].map((label) => {
                const pageMap: Record<string, string> = {
                  'Programs': 'programs',
                  'Admissions': 'admissions',
                  'Research': 'research',
                  'Campus Life': 'campus',
                  'Colleges': 'colleges',
                  'Apply': 'apply',
                };
                return (
                  <button
                    key={label}
                    onClick={() => { goToPage(pageMap[label]); onClose(); }}
                    className="px-3 py-1.5 text-[12px] font-medium text-gray-600 bg-gray-50 hover:bg-[#8A0000]/5 hover:text-[#8A0000] rounded transition-colors"
                    suppressHydrationWarning
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer hint */}
        <div className="px-5 py-2.5 border-t border-gray-100 bg-gray-50">
          <p className="text-[11px] text-gray-400">
            Press <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-mono">ESC</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
}
