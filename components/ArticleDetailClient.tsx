"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ArticleDetailClient({ article, slug }: { article: any; slug: string }) {
  const { language, t } = useLanguage();

  if (!article) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-editorial-gray">{t("아티클을 찾을 수 없습니다", "Article not found")}</p>
      </main>
    );
  }

  // Safe data extraction with fallbacks
  const title = language === 'ko' ? article.title?.ko : article.title?.en;
  const excerpt = language === 'ko' ? article.excerpt?.ko : article.excerpt?.en;
  const content = language === 'ko' ? article.content?.ko : article.content?.en;

  // Handle content splitting safely - ensure content is a string
  const paragraphs = content && typeof content === 'string' ? content.split('\n\n') : [];

  const date = article.publishedAt || article.date;
  const readTime = article.readTime || '5 min';

  return (
    <main className="min-h-screen">
      <div className="max-w-screen-2xl mx-auto">
        {/* Article Header */}
        <FadeIn>
          <div className="border-b-1px border-editorial-border">
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr]">
              {/* Meta Sidebar */}
              <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r-1px border-editorial-border">
                <div className="space-y-6">
                  {date && (
                    <div>
                      <h3 className="text-label mb-2">{t("날짜", "Date")}</h3>
                      <p className="text-sm">
                        {new Date(date).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  )}
                  {article.category && (
                    <div>
                      <h3 className="text-label mb-2">{t("카테고리", "Category")}</h3>
                      <p className="text-sm capitalize">{article.category}</p>
                    </div>
                  )}
                  {readTime && (
                    <div>
                      <h3 className="text-label mb-2">{t("읽는 시간", "Read Time")}</h3>
                      <p className="text-sm">{readTime}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Main Header */}
              <div className="p-6 md:p-8">
                <div className="max-w-3xl">
                  {title && (
                    <h1 className="headline-large mb-3">{title}</h1>
                  )}
                  {excerpt && (
                    <p className="text-sm text-editorial-gray leading-[1.4]">{excerpt}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Cover Image (if exists) */}
        {article.coverImage && (
          <FadeIn delay={0.1}>
            <div className="border-b-1px border-editorial-border p-6 md:p-8">
              <div className="aspect-[21/9] bg-editorial-paper border-1px border-editorial-border flex items-center justify-center">
                <span className="text-editorial-gray text-sm">
                  [{t("커버 이미지", "Cover Image")}]
                </span>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Article Content */}
        {paragraphs.length > 0 && (
          <FadeIn delay={0.2}>
            <div className="border-b-1px border-editorial-border p-6 md:p-8">
              <div className="max-w-3xl mx-auto">
                <article className="prose prose-editorial">
                  {paragraphs.map((paragraph: string, index: number) => (
                    <p key={index} className="text-sm leading-[1.5] mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </article>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Navigation */}
        <div className="border-t-1px border-editorial-border p-6 md:p-8">
          <div className="flex justify-between items-center">
            <Link
              href="/article"
              className="text-sm hover:underline flex items-center gap-2"
            >
              <span>←</span>
              <span>{t("모든 아티클", "All Articles")}</span>
            </Link>
            <div className="flex gap-4">
              <button className="text-sm text-editorial-gray hover:text-editorial-text">
                {t("이전 글", "Previous")}
              </button>
              <span className="text-editorial-gray">|</span>
              <button className="text-sm text-editorial-gray hover:text-editorial-text">
                {t("다음 글", "Next")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
