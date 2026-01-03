"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/contexts/LanguageContext";
import { Project } from "@/lib/sanity";

interface HomeClientProps {
  projects: Project[];
}

export default function HomeClient({ projects }: HomeClientProps) {
  const { language, t } = useLanguage();

  return (
    <>
      <Navigation />

      <main className="min-h-screen">
        <div className="max-w-screen-2xl mx-auto">
          {/* Page Header */}
          <FadeIn>
            <div className="border-b-1px border-editorial-border p-6 md:p-8">
              <div className="flex items-baseline justify-between flex-wrap gap-4">
                <div>
                  <h1 className="headline-large mb-2">
                    {t("프로젝트", "Projects")}
                  </h1>
                  <p className="text-editorial-gray text-sm">
                    {t("2024 — 2025 선택된 작업", "2024 — 2025 Selected Works")}
                  </p>
                </div>
                <div className="vertical-text text-xs tracking-wider text-editorial-gray">
                  {t("포트폴리오 아카이브", "PORTFOLIO ARCHIVE")}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Project Grid - Table Style */}
          <div className="grid grid-cols-1">
            {projects.map((project, index) => (
              <FadeIn key={project._id} delay={index * 0.05}>
                <Link href={`/project/${project._id}`}>
                  <article className="grid grid-cols-1 md:grid-cols-[120px_1fr_200px] border-b-1px border-editorial-border hover:bg-editorial-paper transition-colors duration-300 group">
                    {/* Date Column */}
                    <div className="p-4 md:p-6 border-b md:border-b-0 md:border-r-1px border-editorial-border">
                      <span className="text-label text-editorial-gray">
                        {project.date}
                      </span>
                    </div>

                    {/* Content Column */}
                    <div className="p-4 md:p-6 border-b md:border-b-0 md:border-r-1px border-editorial-border">
                      <div className="space-y-3">
                        <div>
                          <h2 className="headline-small mb-1 group-hover:underline">
                            {language === 'ko' ? project.title.ko : project.title.en}
                          </h2>
                          <p className="text-sm text-editorial-gray">
                            {language === 'ko' ? project.category.ko : project.category.en}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-label px-2 py-1 border-1px border-editorial-border"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Index Column */}
                    <div className="p-4 md:p-6 flex items-center justify-between md:justify-center">
                      <span className="text-index text-editorial-gray md:hidden">
                        {t("프로젝트", "Project")} #{index + 1}
                      </span>
                      <span className="text-index hidden md:block">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-editorial-gray md:hidden">→</span>
                    </div>
                  </article>
                </Link>
              </FadeIn>
            ))}
          </div>

          {/* Footer Info */}
          <div className="border-t-1px border-editorial-border p-6 md:p-8 mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-label mb-2">{t("총 프로젝트", "Total Projects")}</h3>
                <p className="text-2xl font-medium">{projects.length}</p>
              </div>
              <div>
                <h3 className="text-label mb-2">{t("최근 업데이트", "Last Updated")}</h3>
                <p className="text-sm">2025.01.02</p>
              </div>
              <div>
                <h3 className="text-label mb-2">{t("카테고리", "Categories")}</h3>
                <p className="text-sm">Print, Digital, Identity, Editorial</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
