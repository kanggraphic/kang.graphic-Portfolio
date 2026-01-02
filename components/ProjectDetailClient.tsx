"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProjectDetailClient({ project, id }: { project: any; id: string }) {
  const { language, t } = useLanguage();

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-editorial-gray">{t("프로젝트를 찾을 수 없습니다", "Project not found")}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-screen-2xl mx-auto">
        {/* Project Header */}
        <FadeIn>
          <div className="border-b-1px border-editorial-border">
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
              {/* Meta Sidebar */}
              <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r-1px border-editorial-border">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-label mb-2">{t("날짜", "Date")}</h3>
                    <p className="text-sm">{project.date}</p>
                  </div>
                  <div>
                    <h3 className="text-label mb-2">{t("클라이언트", "Client")}</h3>
                    <p className="text-sm">{project.client}</p>
                  </div>
                  <div>
                    <h3 className="text-label mb-2">{t("연도", "Year")}</h3>
                    <p className="text-sm">{project.year}</p>
                  </div>
                  <div>
                    <h3 className="text-label mb-2">{t("역할", "Role")}</h3>
                    <p className="text-sm">{language === 'ko' ? project.role.ko : project.role.en}</p>
                  </div>
                </div>
              </div>

              {/* Main Header */}
              <div className="p-6 md:p-8">
                <div className="mb-4">
                  <p className="text-editorial-gray text-sm mb-2">
                    {language === 'ko' ? project.category.ko : project.category.en}
                  </p>
                  <h1 className="headline-xl mb-4">
                    {language === 'ko' ? project.title.ko : project.title.en}
                  </h1>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-label px-2 py-1 border-1px border-editorial-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="body-large max-w-2xl">
                  {language === 'ko' ? project.description.ko : project.description.en}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Project Images */}
        <div className="grid grid-cols-1">
          {project.images.map((image: string, index: number) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="border-b-1px border-editorial-border p-6 md:p-8">
                <div className="aspect-[16/10] bg-editorial-paper border-1px border-editorial-border flex items-center justify-center">
                  <span className="text-editorial-gray text-sm">
                    [{t("이미지", "Image")} {index + 1}]
                  </span>
                </div>
                <p className="text-xs text-editorial-gray mt-2">
                  {t("프로젝트 이미지", "Project Image")} {String(index + 1).padStart(2, '0')}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Project Specs */}
        <FadeIn>
          <div className="border-t-1px border-editorial-border p-6 md:p-8">
            <h2 className="headline-medium mb-6">{t("프로젝트 사양", "Project Specifications")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
              {(language === 'ko' ? project.specs.ko : project.specs.en).map((spec: string, index: number) => (
                <div key={index} className="flex gap-3">
                  <span className="text-editorial-gray text-sm">{String(index + 1).padStart(2, '0')}</span>
                  <p className="text-sm">{spec}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Navigation */}
        <div className="border-t-1px border-editorial-border p-6 md:p-8">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="text-sm hover:underline flex items-center gap-2"
            >
              <span>←</span>
              <span>{t("모든 프로젝트", "All Projects")}</span>
            </Link>
            <div className="flex gap-4">
              <button className="text-sm text-editorial-gray hover:text-editorial-text">
                {t("이전 프로젝트", "Previous")}
              </button>
              <span className="text-editorial-gray">|</span>
              <button className="text-sm text-editorial-gray hover:text-editorial-text">
                {t("다음 프로젝트", "Next")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
