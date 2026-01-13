"use client";

import Link from "next/link";
import Masthead from "@/components/Masthead";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/contexts/LanguageContext";
import { Article } from "@/lib/sanity";

interface ArticleListClientProps {
  articles: Article[];
}

export default function ArticleListClient({ articles }: ArticleListClientProps) {
  const { language, t } = useLanguage();

  const getReadTime = (article: Article) => {
    const excerpt = language === 'ko' ? article.excerpt?.ko : article.excerpt?.en;
    const wordCount = excerpt?.split(' ').length || 0;
    const minutes = Math.max(3, Math.ceil(wordCount / 200));
    return `${minutes} MIN`;
  };

  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white pb-24">
      <Masthead />

      <main className="boxed-container mt-[-1px] divide-y divide-editorial-border overflow-hidden border-b-[1px] border-transparent">
        {/* Table Header - Perfectly Aligned Grid [150px | 1fr | 300px] */}
        <div className="hidden lg:grid lg:grid-cols-[150px_1fr_300px] divide-x divide-editorial-border bg-white">
          <div className="p-3 px-4 type-mono font-bold">{t("날짜", "PUBLISHED")}</div>
          <div className="p-3 px-4 type-mono font-bold">{t("제목 및 요약", "TITLE / SYNOPSIS")}</div>
          <div className="grid grid-cols-[1fr_80px] divide-x divide-editorial-border">
            <div className="p-3 px-4 type-mono font-bold text-center">{t("시간", "READ")}</div>
            <div className="p-3 px-4 type-mono font-bold text-center">...</div>
          </div>
        </div>

        {articles.length === 0 ? (
          <div className="p-32 text-center type-mono italic opacity-20">
            --- NO RESEARCH PAPERS LOGGED ---
          </div>
        ) : (
          articles.map((article, index) => (
            <FadeIn key={article._id} delay={index * 0.05}>
              <Link
                href={`/article/${article.slug.current}`}
                className="grid grid-cols-1 lg:grid-cols-[150px_1fr_300px] items-stretch table-row-hover lg:divide-x divide-editorial-border group"
              >
                {/* Date */}
                <div className="p-4 lg:p-10 type-mono flex items-center font-bold opacity-30 group-hover:opacity-100 italic transition-opacity border-b lg:border-b-0 border-editorial-border lg:border-none">
                  <time>
                    {new Date(article.publishedAt).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </time>
                </div>

                {/* Content */}
                <div className="p-4 lg:p-10 space-y-4">
                  <h2 className="type-header group-hover:underline underline-offset-8 decoration-2 text-base">
                    {language === 'ko' ? article.title.ko : article.title.en}
                  </h2>
                  {article.excerpt && (
                    <p className="type-body line-clamp-2 max-w-2xl opacity-70 group-hover:opacity-100 transition-opacity">
                      {language === 'ko' ? article.excerpt.ko : article.excerpt.en}
                    </p>
                  )}
                </div>

                {/* Meta Column [300px wide area] */}
                <div className="hidden lg:grid grid-cols-[1fr_80px] divide-x divide-editorial-border">
                  <div className="flex items-center justify-center type-mono font-bold opacity-30 group-hover:opacity-100">
                    {getReadTime(article)}
                  </div>
                  <div className="flex justify-center items-center type-mono font-bold group-hover:bg-black group-hover:text-white transition-all">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Mobile Meta */}
                <div className="lg:hidden p-4 pt-0 flex justify-between items-center type-mono opacity-30 font-bold">
                  <span>{getReadTime(article)}</span>
                  <span>#{String(index + 1).padStart(2, '0')}</span>
                </div>
              </Link>
            </FadeIn>
          ))
        )}

        {/* Filler to maintain vertical lines */}
        <div className="h-64 bg-white"></div>
      </main>
    </div>
  );
}
