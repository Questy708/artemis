'use client';

import React from 'react';

interface FooterProps {
  goToPage: (page: string) => void;
}

export default function SubPageFooter({ goToPage }: FooterProps) {
  const mainLinks = [
    { label: 'Education', page: 'education' },
    { label: 'Research', page: 'research' },
    { label: 'Innovation', page: 'innovation' },
    { label: 'Admissions + Aid', page: 'admissions' },
    { label: 'Campus Life', page: 'campus' },
    { label: 'Colleges', page: 'colleges' },
    { label: 'About', page: 'about' },
    { label: 'Journal', page: 'blog' },
  ];

  const quickLinks = [
    { label: 'Visit', page: 'visit-us' },
    { label: 'Events', page: 'campus' },
    { label: 'People', page: 'our-people' },
    { label: 'Jobs', page: 'jobs' },
    { label: 'Contact', page: 'contact-us' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', page: 'policies' },
    { label: 'Accessibility', page: 'access-at-artemis' },
    { label: 'Sustainability Pledge', page: 'sustainability' },
  ];

  const socialLinks = [
    { 
      label: 'X', 
      href: 'https://x.com/artemisuni',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    { 
      label: 'Facebook', 
      href: 'https://facebook.com/artemisuni',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
        </svg>
      )
    },
    { 
      label: 'LinkedIn', 
      href: 'https://linkedin.com/school/artemisuni',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    { 
      label: 'Instagram', 
      href: 'https://instagram.com/artemisuni',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      )
    },
  ];

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    if (email) {
      alert(`Systems notice: "${email}" registered inside the Artemis Commons Dispatch.`);
      e.currentTarget.reset();
    }
  };

  return (
    <footer className="bg-[#121212] text-white w-full shrink-0 relative">

      {/* ── Gradient line divider: Crimson to Gold ── */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#8A0000] via-[#D4A853] to-transparent shrink-0 opacity-80" />

      <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">

        {/* ── Top: Brand identity & Newsletter Card ── */}
        <div className="pt-16 pb-12 border-b border-white/[0.06] grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Logo, tagline, and principal CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-3.5 mb-4 select-none">
                <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 3L4 9V19.5C4 28.5 11 35.5 20 37.5C29 35.5 36 28.5 36 19.5V9L20 3Z" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none"/>
                  <path d="M20 5.5L6.5 10.8V19.5C6.5 27.2 12.4 33.2 20 35C27.6 33.2 33.5 27.2 33.5 19.5V10.8L20 5.5Z" fill="rgba(255,255,255,0.02)"/>
                  <path d="M20 11L14 24H16.5L17.8 20.8H22.2L23.5 24H26L20 11ZM18.6 18.8L20 14.8L21.4 18.8H18.6Z" fill="rgba(255,255,255,0.4)"/>
                  <line x1="12" y1="28" x2="28" y2="28" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
                  <circle cx="15" cy="30.5" r="0.8" fill="rgba(255,255,255,0.15)"/>
                  <circle cx="20" cy="30.5" r="0.8" fill="rgba(255,255,255,0.15)"/>
                  <circle cx="25" cy="30.5" r="0.8" fill="rgba(255,255,255,0.15)"/>
                </svg>
                <div className="leading-[1.1]">
                  <div className="text-[11px] font-medium tracking-tight text-white/45">University of</div>
                  <div className="text-[16px] font-bold tracking-tight text-white/80 uppercase">Artemis</div>
                </div>
              </div>
              <p className="text-[13px] text-white/30 max-w-sm leading-relaxed font-light">
                A global collegiate federation reimagining academic credentials, resource mapping, and student-led civic action for a post-labor civilization.
              </p>
            </div>
            
            <div className="flex items-center gap-3.5 pt-2">
              <button
                onClick={() => goToPage('fundraising')}
                className="border border-white/10 text-white/50 hover:text-white hover:border-[#8A0000] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer"
              >
                Give to Artemis
              </button>
              <button
                onClick={() => goToPage('apply')}
                className="bg-[#8A0000] hover:bg-red-800 text-white px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 cursor-pointer"
              >
                Apply for Entry
              </button>
            </div>
          </div>

          {/* Upgraded Newsletter Sign-up */}
          <div className="lg:col-span-5 bg-white/[0.01] border border-white/5 p-6 rounded-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-3 h-[2px] bg-[#8A0000]"></div>
            
            <span className="text-[9px] font-mono uppercase text-[#D4A853] tracking-wider mb-1 block">
              Commons Registry
            </span>
            <h4 className="text-[14px] font-bold text-white uppercase tracking-tight mb-2">
              Subscribe to Systems Update
            </h4>
            <p className="text-[12.5px] text-white/30 leading-relaxed font-light mb-4">
              Receive academic releases, systemic briefs, and regional field bulletins dispatching from the Artemis Council.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 font-mono">
              <input
                type="email"
                name="email"
                placeholder="EMAIL ADDRESS..."
                required
                className="bg-white/[0.03] border border-white/10 text-white placeholder-white/20 px-3 py-2 text-[11px] focus:outline-none focus:border-[#8A0000] flex-1 min-w-0"
              />
              <button
                type="submit"
                className="bg-[#8A0000] hover:bg-red-800 text-white px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
              >
                JOIN
              </button>
            </form>
          </div>
        </div>

        {/* ── Middle: Reconfigured navigation grid ── */}
        <div className="py-12 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-x-6 gap-y-6">
          {mainLinks.map((link, i) => (
            <button
              key={link.page}
              onClick={() => goToPage(link.page)}
              className="group cursor-pointer text-left focus:outline-none"
            >
              <div className="text-[8px] font-mono text-white/15 mb-2 group-hover:text-[#8A0000] transition-colors duration-300">
                0{i + 1}
              </div>
              <div className="text-[12.5px] text-white/40 group-hover:text-white transition-colors duration-300 leading-tight font-medium">
                {link.label}
              </div>
            </button>
          ))}
        </div>

        {/* ── Quick links, Legal and Social vectors ── */}
        <div className="py-8 border-t border-white/[0.04] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11.5px]">
            {quickLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => goToPage(link.page)}
                className="text-white/30 hover:text-white/60 transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <span className="text-white/[0.05] hidden sm:inline">|</span>
            {legalLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => goToPage(link.page)}
                className="text-white/30 hover:text-white/60 transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Social (SVG Graphics) */}
          <div className="flex items-center gap-4.5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/20 hover:text-[#8A0000] hover:scale-110 active:scale-95 transition-all duration-200 p-1 bg-white/[0.02] border border-white/5 rounded-full hover:border-[#8A0000]/30"
                aria-label={`Artemis on ${social.label}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Experimental sandbox node ── */}
        <div className="py-5 border-t border-white/[0.03] flex items-center justify-between">
          <button
            onClick={() => goToPage('artemis-project')}
            className="flex items-center gap-2.5 text-[10px] text-white/20 hover:text-white/55 transition-colors duration-300 cursor-pointer group focus:outline-none"
          >
            <span className="w-5 h-5 rounded border border-white/[0.08] group-hover:border-white/20 flex items-center justify-center text-[8px] font-bold font-mono transition-colors duration-300">
              AP
            </span>
            <span className="uppercase tracking-[0.20em] font-mono">Artemis System Node</span>
            <span className="text-[8.5px] text-[#D4A853]/60 bg-amber-950/20 border border-amber-900/30 px-1.5 py-0.5 ml-1 uppercase tracking-wider transition-colors duration-300">
              Experimental Core
            </span>
          </button>
        </div>

        {/* ── Bottom: Copyright line ── */}
        <div className="py-6 border-t border-white/[0.03] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[10px] text-white/15">
          <p>&copy; {new Date().getFullYear()} University of Artemis. All rights and systems reserved.</p>
          <p className="font-mono uppercase tracking-[0.25em] text-[#D4A853]/55">
            Artemis Collegium &middot; Federated World Wide
          </p>
        </div>
      </div>
    </footer>
  );
}
