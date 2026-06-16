'use client';

import { useRef, useEffect, useState } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import SubscribeForm from '@/components/artemis/SubscribeForm';
import { blogArticles, type BlogArticle, type BlogArticleSection } from '@/lib/artemis-data';

interface BlogArticlePageProps {
  goToPage: (page: string, program?: string) => void;
  articleSlug: string;
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

/* ─── Section renderer ─── */
function ArticleSection({ section, index }: { section: BlogArticleSection; index: number }) {
  const anim = useInView(0.1);

  // Image-only section
  if (section.image && !section.heading && !section.body && !section.pullquote) {
    return (
      <div
        ref={anim.ref}
        className={`my-12 transition-all duration-700 ${anim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <figure className="w-full">
          <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
            <img
              src={section.image}
              alt={section.imageCaption || ''}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          {section.imageCaption && (
            <figcaption className="mt-3 text-[12px] text-gray-500 italic leading-relaxed">
              {section.imageCaption}
            </figcaption>
          )}
        </figure>
      </div>
    );
  }

  // Pullquote section
  if (section.pullquote) {
    return (
      <div
        ref={anim.ref}
        className={`my-16 transition-all duration-700 ${anim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <blockquote className="border-l-4 border-[#8A0000] pl-8 py-2 max-w-2xl">
          <p className="text-[22px] sm:text-[26px] md:text-[30px] font-serif italic text-[#141414] leading-[1.4]">
            &ldquo;{section.pullquote}&rdquo;
          </p>
        </blockquote>
      </div>
    );
  }

  // Text section (with optional heading and optional image)
  return (
    <div
      ref={anim.ref}
      className={`my-10 transition-all duration-700 ${anim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      {section.heading && (
        <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-extrabold text-[#141414] leading-[1.15] tracking-tight mb-6">
          {section.heading}
        </h2>
      )}
      {section.image && (
        <figure className="mb-8">
          <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
            <img
              src={section.image}
              alt={section.imageCaption || ''}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          {section.imageCaption && (
            <figcaption className="mt-3 text-[12px] text-gray-500 italic leading-relaxed">
              {section.imageCaption}
            </figcaption>
          )}
        </figure>
      )}
      {section.body && (
        <div className="prose-artemis">
          {section.body.split('\n\n').map((paragraph, i) => (
            <p key={i} className="text-[16px] sm:text-[17px] text-gray-700 leading-[1.8] mb-6">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BlogArticlePage({ goToPage, articleSlug }: BlogArticlePageProps) {
  const heroAnim = useInView(0.1);
  const contentAnim = useInView(0.1);
  const relatedAnim = useInView(0.1);

  const article = blogArticles.find(a => a.slug === articleSlug);

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <h1 className="text-[36px] font-extrabold text-[#141414] mb-4">Article Not Found</h1>
        <p className="text-gray-500 mb-8">The article you are looking for does not exist.</p>
        <button
          onClick={() => goToPage('blog')}
          className="text-[11px] font-bold uppercase tracking-widest border-b-2 border-[#8A0000] text-[#8A0000] pb-1 hover:text-black hover:border-black transition-colors"
        >
          Back to Journal
        </button>
      </div>
    );
  }

  // Find related articles (same category, excluding current)
  const relatedArticles = blogArticles
    .filter(a => a.id !== article.id)
    .sort((a, b) => (a.category === article.category ? -1 : b.category === article.category ? 1 : 0))
    .slice(0, 3);

  return (
    <div className="flex flex-col bg-white">
      {/* ── 1. HERO ── */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[50vh] sm:h-[55vh] min-h-[400px] sm:min-h-[480px] overflow-hidden">
            <img
              src={article.image}
              alt={article.heroAlt || article.title}
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-16">
              <div
                ref={heroAnim.ref}
                className={`transition-all duration-700 ${heroAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                {/* Back link */}
                <button
                  onClick={() => goToPage('blog')}
                  className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors mb-6"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                  Back to Journal
                </button>

                {/* Category + Date */}
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 ${categoryColors[article.category] || 'bg-gray-200 text-gray-700'}`}>
                    {article.category}
                  </span>
                  <span className="text-[12px] text-white/60">{article.date}</span>
                  {article.readTime && (
                    <>
                      <span className="text-white/30">|</span>
                      <span className="text-[12px] text-white/60">{article.readTime}</span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-[28px] sm:text-[38px] md:text-[48px] lg:text-[54px] font-extrabold leading-[1.05] tracking-tighter text-white mb-4">
                  {article.title}
                </h1>

                {/* Author */}
                <p className="text-[14px] text-white/70 font-medium">By {article.author}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. ARTICLE BODY ── */}
      <section className="py-16 lg:py-24">
        <div
          ref={contentAnim.ref}
          className={`max-w-[800px] mx-auto w-full px-5 sm:px-8 transition-all duration-700 ${contentAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Intro / Summary */}
          <div className="mb-12">
            <p className="text-[18px] sm:text-[20px] text-gray-800 leading-[1.8] font-medium">
              {article.summary}
            </p>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-gray-200">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border border-gray-200 px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Article Sections */}
          {article.sections?.map((section, index) => (
            <ArticleSection key={index} section={section} index={index} />
          ))}

          {/* Share bar */}
          <div className="mt-16 pt-8 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Share</span>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 hover:border-[#8A0000] hover:text-[#8A0000] transition-colors text-gray-400">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 hover:border-[#8A0000] hover:text-[#8A0000] transition-colors text-gray-400">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 hover:border-[#8A0000] hover:text-[#8A0000] transition-colors text-gray-400">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
              </button>
            </div>
            <button
              onClick={() => goToPage('blog')}
              className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#8A0000] border-b border-[#8A0000] pb-1 hover:text-black hover:border-black transition-colors"
            >
              All Articles
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── 3. RELATED ARTICLES ── */}
      {relatedArticles.length > 0 && (
        <section className="bg-gray-50 py-16 lg:py-24">
          <div
            ref={relatedAnim.ref}
            className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${relatedAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Section divider */}
            <div className="relative flex items-center mb-12">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">More from the Journal</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((related) => (
                <article
                  key={related.id}
                  className="group cursor-pointer bg-white border border-gray-100 hover:border-[#8A0000] transition-all overflow-hidden shadow-sm hover:shadow-lg"
                  onClick={() => goToPage('blog_article', related.slug)}
                >
                  <div className="aspect-[16/10] bg-gray-100 overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 ${categoryColors[related.category] || 'bg-gray-200 text-gray-700'}`}>
                        {related.category}
                      </span>
                      <span className="text-[11px] text-gray-400">{related.date}</span>
                    </div>
                    <h3 className="text-[18px] font-bold text-[#141414] mb-3 leading-tight group-hover:text-[#8A0000] transition-colors line-clamp-3">
                      {related.title}
                    </h3>
                    <p className="text-[14px] text-gray-600 leading-relaxed line-clamp-3 mb-4">
                      {related.summary}
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
      )}

      {/* ── 4. SUBSCRIBE BAR ── */}
      <div className="bg-[#8A0000] text-white py-12">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="max-w-lg text-center md:text-left">
            <h4 className="text-[20px] font-bold mb-2">Stay in the loop</h4>
            <p className="text-[15px] font-medium leading-relaxed text-white/80">
              Subscribe to the Artemis Journal for weekly dispatches on research breakthroughs, campus life, and the founding campaign.
            </p>
          </div>
          <SubscribeForm source="blog-article" variant="compact" className="w-full md:w-auto" />
        </div>
      </div>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
