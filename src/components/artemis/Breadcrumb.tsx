'use client';

import { ChevronRight, ArrowLeft } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  page: string;
  program?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  currentPage: string;
  goToPage: (page: string, program?: string) => void;
  /** Show a back-arrow button as the first item */
  showBack?: boolean;
}

export default function Breadcrumb({ items, currentPage, goToPage, showBack = true }: BreadcrumbProps) {
  return (
    <div className="bg-white border-b border-gray-100 w-full">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-20 py-3">
        <div className="flex items-center gap-2 text-[12px] font-medium overflow-x-auto hide-scrollbar">
          {/* Back button */}
          {showBack && items.length > 0 && (
            <button
              onClick={() => {
                const parent = items[items.length - 1];
                goToPage(parent.page, parent.program);
              }}
              className="flex items-center gap-1 text-[#8A0000] hover:text-[#6A0000] transition-colors shrink-0 mr-2 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="uppercase tracking-wider font-bold text-[11px]">Back</span>
            </button>
          )}

          {/* Home link */}
          <button
            onClick={() => goToPage('home')}
            className="text-gray-400 hover:text-[#8A0000] transition-colors shrink-0 uppercase tracking-wider font-bold text-[11px]"
          >
            Home
          </button>

          {/* Breadcrumb items */}
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-2 shrink-0">
              <ChevronRight size={12} className="text-gray-300" />
              <button
                onClick={() => goToPage(item.page, item.program)}
                className="text-gray-400 hover:text-[#8A0000] transition-colors uppercase tracking-wider font-bold text-[11px]"
              >
                {item.label}
              </button>
            </span>
          ))}

          {/* Current page (non-clickable) */}
          <span className="flex items-center gap-2 shrink-0">
            <ChevronRight size={12} className="text-gray-300" />
            <span className="text-[#141414] uppercase tracking-wider font-bold text-[11px]">
              {currentPage}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
