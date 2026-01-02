"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/contexts/LanguageContext";

// Temporary mock data
const articles = [
  {
    id: "1",
    date: "2025-01-02",
    title: { ko: "편집 디자인의 문법을 웹으로", en: "Translating Editorial Grammar to Web" },
    excerpt: {
      ko: "종이 매체의 질서를 웹 환경으로 전이시키는 실험적 접근에 대하여",
      en: "On the experimental approach to transferring print media order to web environments"
    },
    readTime: "5 min",
  },
  {
    id: "2",
    date: "2024-12-15",
    title: { ko: "그리드 시스템과 타이포그래피", en: "Grid Systems and Typography" },
    excerpt: {
      ko: "최소한의 요소로 최대의 구조적 긴장감을 형성하는 방법",
      en: "Creating maximum structural tension with minimal elements"
    },
    readTime: "7 min",
  },
  {
    id: "3",
    date: "2024-11-20",
    title: { ko: "디지털 아카이브의 미래", en: "The Future of Digital Archives" },
    excerpt: {
      ko: "콘텐츠 중심의 포트폴리오 구조에 대한 고찰",
      en: "Reflections on content-first portfolio structures"
    },
    readTime: "6 min",
  },
];

export default function ArticlePage() {
  const { language, t } = useLanguage();

  return (
    <>
      <Navigation />

      <main className="min-h-screen">
        <div className="max-w-screen-2xl mx-auto">
          {/* Page Header */}
          <FadeIn>
            <div className="border-b-1px border-editorial-border p-6 md:p-8">
              <h1 className="headline-xl mb-2">{t("아티클", "Articles")}</h1>
              <p className="text-editorial-gray text-sm">
                {t("디자인 철학 및 연구 기록", "Design Philosophy & Research Notes")}
              </p>
            </div>
          </FadeIn>

          {/* Article List */}
          <div className="grid grid-cols-1">
            {articles.map((article, index) => (
              <FadeIn key={article.id} delay={index * 0.05}>
                <Link href={`/article/${article.id}`}>
                  <article className="grid grid-cols-1 md:grid-cols-[150px_1fr_100px] border-b-1px border-editorial-border hover:bg-editorial-paper transition-colors duration-300 group">
                    {/* Date Column */}
                    <div className="p-4 md:p-6 border-b md:border-b-0 md:border-r-1px border-editorial-border">
                      <time className="text-label text-editorial-gray">
                        {new Date(article.date).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </time>
                    </div>

                    {/* Content Column */}
                    <div className="p-4 md:p-6 border-b md:border-b-0 md:border-r-1px border-editorial-border">
                      <h2 className="headline-small mb-2 group-hover:underline">
                        {language === 'ko' ? article.title.ko : article.title.en}
                      </h2>
                      <p className="text-sm text-editorial-gray">
                        {language === 'ko' ? article.excerpt.ko : article.excerpt.en}
                      </p>
                    </div>

                    {/* Read Time Column */}
                    <div className="p-4 md:p-6 flex items-center justify-between md:justify-center">
                      <span className="text-label text-editorial-gray">
                        {article.readTime}
                      </span>
                      <span className="text-editorial-gray md:hidden">→</span>
                    </div>
                  </article>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
