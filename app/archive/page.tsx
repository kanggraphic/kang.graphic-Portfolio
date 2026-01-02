"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/contexts/LanguageContext";

type Category = "All" | "Print" | "Digital" | "Identity" | "Editorial";

// Temporary mock data
const projects = [
  { id: "1", year: "2025", title: { ko: "Kao／Primavista 젤 세안", en: "Kao／Primavista Gel Cleanser" }, category: "Digital" as Category },
  { id: "2", year: "2025", title: { ko: "MACNICA GR 제작", en: "MACNICA GR Production" }, category: "Print" as Category },
  { id: "3", year: "2024", title: { ko: "ORIX HOTELS 캠페인", en: "ORIX HOTELS Campaign" }, category: "Digital" as Category },
  { id: "4", year: "2024", title: { ko: "MEDULLA 리브랜딩", en: "MEDULLA Rebranding" }, category: "Identity" as Category },
  { id: "5", year: "2024", title: { ko: "디지털 투발루 아이덴티티", en: "Digital Tuvalu Identity" }, category: "Identity" as Category },
  { id: "6", year: "2024", title: { ko: "Territory in Flux", en: "Territory in Flux" }, category: "Editorial" as Category },
  { id: "7", year: "2023", title: { ko: "Rising Nations Initiative", en: "Rising Nations Initiative" }, category: "Print" as Category },
  { id: "8", year: "2023", title: { ko: "Climate Data Visualization", en: "Climate Data Visualization" }, category: "Digital" as Category },
];

export default function ArchivePage() {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const categories: Category[] = ["All", "Print", "Digital", "Identity", "Editorial"];

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const projectsByYear = filteredProjects.reduce((acc, project) => {
    if (!acc[project.year]) {
      acc[project.year] = [];
    }
    acc[project.year].push(project);
    return acc;
  }, {} as Record<string, typeof projects>);

  const years = Object.keys(projectsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <>
      <Navigation />

      <main className="min-h-screen">
        <div className="max-w-screen-2xl mx-auto">
          {/* Page Header */}
          <FadeIn>
            <div className="border-b-1px border-editorial-border">
              <div className="p-6 md:p-8">
                <h1 className="headline-xl mb-2">{t("아카이브", "Archive")}</h1>
                <p className="text-editorial-gray text-sm">
                  {t("모든 프로젝트 연대기", "Complete Project Timeline")}
                </p>
              </div>

              {/* Filter */}
              <div className="flex border-t-1px border-editorial-border">
                {categories.map((category, index) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`
                      flex-1 p-4 text-label transition-colors duration-200
                      ${index < categories.length - 1 ? 'border-r-1px border-editorial-border' : ''}
                      ${selectedCategory === category
                        ? 'bg-editorial-text text-editorial-bg'
                        : 'hover:bg-editorial-paper'
                      }
                    `}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Project List by Year */}
          <div className="divide-y-1px divide-editorial-border">
            {years.map((year, yearIndex) => (
              <FadeIn key={year} delay={yearIndex * 0.05}>
                <div className="grid grid-cols-1 md:grid-cols-[120px_1fr]">
                  {/* Year Column */}
                  <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r-1px border-editorial-border">
                    <h2 className="headline-medium">{year}</h2>
                    <p className="text-label text-editorial-gray mt-1">
                      {projectsByYear[year].length} {t("프로젝트", "Projects")}
                    </p>
                  </div>

                  {/* Projects Column */}
                  <div className="divide-y-1px divide-editorial-border">
                    {projectsByYear[year].map((project, index) => (
                      <Link key={project.id} href={`/project/${project.id}`}>
                        <div className="p-6 md:p-8 hover:bg-editorial-paper transition-colors duration-300 group">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="headline-small group-hover:underline mb-1">
                                {language === 'ko' ? project.title.ko : project.title.en}
                              </h3>
                              <p className="text-label text-editorial-gray">
                                {project.category}
                              </p>
                            </div>
                            <span className="text-editorial-gray">→</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Summary */}
          <div className="border-t-1px border-editorial-border p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <h3 className="text-label mb-2">{t("전체", "Total")}</h3>
                <p className="text-2xl font-medium">{filteredProjects.length}</p>
              </div>
              {categories.slice(1).map(category => (
                <div key={category}>
                  <h3 className="text-label mb-2">{category}</h3>
                  <p className="text-2xl font-medium">
                    {projects.filter(p => p.category === category).length}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
