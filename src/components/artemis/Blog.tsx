'use client';

import { useState, useEffect, useRef } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import SubscribeForm from '@/components/artemis/SubscribeForm';
import { blogArticles, type BlogArticle } from '@/lib/artemis-data';

interface BlogProps {
  goToPage: (page: string, program?: string) => void;
}

/* ─── Hook: animate on scroll ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Category colors ─── */
const categoryColors: Record<string, string> = {
  Campaign: 'bg-[#8A0000] text-white',
  Research: 'bg-gray-900 text-white',
  Innovation: 'bg-gray-800 text-white',
  'Campus Life': 'bg-[#8A0000]/10 text-[#8A0000]',
};


export default function Blog({ goToPage }: BlogProps) {
  const heroAnim = useInView();
  const gridAnim = useInView();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const categories = ['All', 'Campaign', 'Research', 'Innovation', 'Campus Life'];
  const filteredArticles = activeFilter && activeFilter !== 'All'
    ? blogArticles.filter(a => a.category === activeFilter)
    : blogArticles;

  // Featured = first article
  const featured = blogArticles[0];
  const rest = filteredArticles.filter(a => a.id !== featured.id || (activeFilter && activeFilter !== 'All'));

  return (
    <div className="flex flex-col bg-white">
      {/* ── 1. HERO ── */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[45vh] min-h-[360px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1578402027070-0f5ebd84ec9b?auto=format&fit=crop&q=80&w=1800"
              className="absolute inset-0 w-full h-full object-cover grayscale"
              alt="Artemis Blog"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-16">
              <div className="mb-8 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Stories & Ideas</span>
              </div>
              <h1 className="text-[30px] sm:text-[44px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-6 uppercase">
                The Artemis<br />Journal
              </h1>
              <p className="text-[18px] text-white/70 max-w-xl leading-relaxed font-light">
                Dispatches from the frontiers of research, campus life, and the founding campaign — the stories shaping the University of Artemis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. FEATURED ARTICLE ── */}
      <section className="py-16 lg:py-24">
        <div
          ref={heroAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${heroAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Featured</span>
          </div>

          <div
            className="group cursor-pointer"
            onClick={() => goToPage('blog_article', featured.slug)}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              <div className="aspect-[16/10] bg-gray-100 overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 ${categoryColors[featured.category] || 'bg-gray-200 text-gray-700'}`}>
                    {featured.category}
                  </span>
                  <span className="text-[12px] text-gray-400">{featured.date}</span>
                  {featured.readTime && (
                    <span className="text-[12px] text-gray-400">| {featured.readTime}</span>
                  )}
                </div>
                <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-extrabold leading-[1.1] tracking-tighter text-[#141414] mb-4 group-hover:text-[#8A0000] transition-colors">
                  {featured.title}
                </h2>
                <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                  {featured.summary}
                </p>
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#8A0000] border-b border-[#8A0000] w-fit group-hover:text-black group-hover:border-black transition-colors pb-1">
                  <span>Read Full Story</span>
                  <svg className="group-hover:translate-x-2 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FILTER + ARTICLE GRID ── */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div
          ref={gridAnim.ref}
          className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${gridAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Section divider */}
          <div className="relative flex items-center mb-12">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">All Articles</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat === 'All' ? null : cat)}
                className={`text-[11px] font-bold uppercase tracking-widest px-4 py-2 border transition-all ${
                  (activeFilter === null && cat === 'All') || activeFilter === cat
                    ? 'border-[#8A0000] text-[#8A0000] bg-[#8A0000]/5'
                    : 'border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Article cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeFilter && activeFilter !== 'All' ? filteredArticles : blogArticles.filter(a => a.id !== featured.id)).map((article) => (
              <article
                key={article.id}
                className="group cursor-pointer bg-white border border-gray-100 hover:border-[#8A0000] transition-all overflow-hidden shadow-sm hover:shadow-lg"
                onClick={() => goToPage('blog_article', article.slug)}
              >
                <div className="aspect-[16/10] bg-gray-100 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 ${categoryColors[article.category] || 'bg-gray-200 text-gray-700'}`}>
                      {article.category}
                    </span>
                    <span className="text-[11px] text-gray-400">{article.date}</span>
                    {article.readTime && (
                      <span className="text-[11px] text-gray-400">| {article.readTime}</span>
                    )}
                  </div>
                  <h3 className="text-[18px] font-bold text-[#141414] mb-3 leading-tight group-hover:text-[#8A0000] transition-colors line-clamp-3">
                    {article.title}
                  </h3>
                  <p className="text-[14px] text-gray-600 leading-relaxed line-clamp-3 mb-4">
                    {article.summary}
                  </p>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#141414] border-b border-black w-fit group-hover:text-[#8A0000] group-hover:border-[#8A0000] transition-all">
                    Read more
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. SUBSCRIBE BAR ── */}
      <div className="max-w-[1600px] mx-auto w-full">
        <div className="bg-[#8A0000] text-white py-12 px-5 sm:px-8 lg:px-20 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="max-w-lg text-center md:text-left">
            <h4 className="text-[20px] font-bold mb-2">Stay in the loop</h4>
            <p className="text-[15px] font-medium leading-relaxed text-white/80">
              Subscribe to the Artemis Journal for weekly dispatches on research breakthroughs, campus life, and the founding campaign.
            </p>
          </div>
          <SubscribeForm source="blog" variant="compact" className="w-full md:w-auto" />
        </div>
      </div>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
