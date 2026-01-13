"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Masthead from "@/components/Masthead";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ArticleDetailClient({ article, slug }: { article: any; slug: string }) {
  const { language, t } = useLanguage();

  if (!article) {
    return (
      <main className="min-h-screen flex items-center justify-center type-mono italic">
        {t("아티클을 찾을 수 없습니다", "ARTICLE NOT FOUND")}
      </main>
    );
  }

  const title = language === 'ko' ? article.title?.ko : article.title?.en;
  const excerpt = language === 'ko' ? article.excerpt?.ko : article.excerpt?.en;
  const content = language === 'ko' ? article.content?.ko : article.content?.en;
  const paragraphs = content && typeof content === 'string' ? content.split('\n\n') : [];
  const date = article.publishedAt || article.date;
  const readTime = article.readTime || '5 MIN';

  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white pb-24">
      <Masthead />

      <main className="boxed-container mt-[-1px]">
        {/* Article Header Grid [150px | 1fr | 300px] */}
        <div className="grid grid-cols-1 lg:grid-cols-[150px_1fr_300px] divide-y lg:divide-y-0 lg:divide-x divide-editorial-border border-b-[1px] border-editorial-border">
          {/* Meta Sidebar [150px] */}
          <div className="p-6 space-y-10 bg-white">
            <section>
              <h3 className="type-mono mb-6 border-b-[1px] border-black pb-1 font-bold">{t("발행", "LOGGED")}</h3>
              <p className="type-header text-[12px]">
                {new Date(date).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </section>
            <section>
              <h3 className="type-mono mb-6 border-b-[1px] border-black pb-1 font-bold">{t("범주", "FIELD")}</h3>
              <p className="type-header text-[12px]">{article.category || "RESEARCH"}</p>
            </section>
            <section>
              <h3 className="type-mono mb-6 border-b-[1px] border-black pb-1 font-bold">{t("소요", "LATENCY")}</h3>
              <p className="type-header text-[12px]">{readTime}</p>
            </section>
          </div>

          {/* Main Title Area [1fr] */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="type-mono opacity-30 mb-8 flex gap-4 font-bold">
              <span>REF: {slug.toUpperCase()}</span>
              <span>CORE: INTEL-RPT</span>
            </div>
            <h1 className="type-display text-2xl md:text-3xl mb-8">
              {title}
            </h1>
            <p className="type-body text-base italic leading-snug border-l-4 border-black pl-6 opacity-70">
              {excerpt}
            </p>
          </div>

          {/* Right Filler [300px] */}
          <div className="hidden lg:block bg-white"></div>
        </div>

        {/* Footer Navigation - Aligned to [150px | 1fr | 300px] */}
        <div className="grid grid-cols-1 lg:grid-cols-[150px_1fr_300px] divide-x divide-editorial-border h-24 border-b-[1px] border-editorial-border">
          <Link href="/article" className="p-6 hover:bg-black hover:text-white transition-all flex items-center justify-center type-header group">
            <span className="mr-0">←</span>
          </Link>
          <div className="flex items-center justify-center type-header uppercase tracking-widest opacity-20">
            {t("기록 전체", "INDEX ALL")}
          </div>
          <div className="grid grid-cols-2 divide-x divide-editorial-border h-full">
            <button className="p-6 hover:bg-black hover:text-white transition-all flex items-center justify-center type-header group">
              <span className="text-[10px] opacity-30">{t("이전", "PREV")}</span>
            </button>
            <button className="p-6 hover:bg-black hover:text-white transition-all flex items-center justify-center type-header group">
              <span className="text-[10px] opacity-30">{t("다음", "NEXT")}</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
