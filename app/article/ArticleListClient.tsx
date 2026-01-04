"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/contexts/LanguageContext";
import { Article } from "@/lib/sanity";

interface ArticleListClientProps {
  articles: Article[];
}

export default function ArticleListClient({ articles }: ArticleListClientProps) {
  const { language, t } = useLanguage();

  // Calculate read time based on excerpt length (rough estimate)
  const getReadTime = (article: Article) => {
    const excerpt = language === 'ko' ? article.excerpt?.ko : article.excerpt?.en;
    const wordCount = excerpt?.split(' ').length || 0;
    const minutes = Math.max(3, Math.ceil(wordCount / 200));
    return `${minutes} min`;
  };

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

          {/* Empty State or Article List */}
          {articles.length === 0 ? (
            <FadeIn>
              <div className="border-b-1px border-editorial-border p-12 md:p-16 text-center">
                <p className="text-editorial-gray text-sm mb-2">
                  {t("아직 아티클이 없습니다", "No articles yet")}
                </p>
                <p className="text-xs text-editorial-gray">
                  {t("Sanity Studio에서 아티클을 추가해주세요", "Please add articles in Sanity Studio")}
                </p>
              </div>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-1">
              {articles.map((article, index) => (
                <FadeIn key={article._id} delay={index * 0.05}>
                  <Link href={`/article/${article.slug.current}`}>
                    <article className="grid grid-cols-1 md:grid-cols-[150px_1fr_100px] border-b-1px border-editorial-border hover:bg-editorial-paper transition-colors duration-300 group">
                      {/* Date Column */}
                      <div className="p-4 md:p-6 border-b md:border-b-0 md:border-r-1px border-editorial-border">
                        <time className="text-label text-editorial-gray">
                          {new Date(article.publishedAt).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US', {
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
                        {article.excerpt && (
                          <p className="text-sm text-editorial-gray">
                            {language === 'ko' ? article.excerpt.ko : article.excerpt.en}
                          </p>
                        )}
                      </div>

                      {/* Read Time Column */}
                      <div className="p-4 md:p-6 flex items-center justify-between md:justify-center">
                        <span className="text-label text-editorial-gray">
                          {getReadTime(article)}
                        </span>
                        <span className="text-editorial-gray md:hidden">→</span>
                      </div>
                    </article>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
