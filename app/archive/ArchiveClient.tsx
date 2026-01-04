"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/contexts/LanguageContext";
import { Project } from "@/lib/sanity";

type Category = "All" | "Print" | "Digital" | "Identity" | "Editorial";

interface ArchiveClientProps {
  projects: Project[];
}

export default function ArchiveClient({ projects }: ArchiveClientProps) {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const categories: Category[] = ["All", "Print", "Digital", "Identity", "Editorial"];

  // Map Sanity categories to archive categories
  const getArchiveCategory = (sanityCategory: { ko: string; en: string }): Category => {
    const categoryText = language === 'ko' ? sanityCategory.ko : sanityCategory.en;
    const lowerCategory = categoryText.toLowerCase();

    if (lowerCategory.includes('print') || lowerCategory.includes('인쇄')) return "Print";
    if (lowerCategory.includes('digital') || lowerCategory.includes('디지털')) return "Digital";
    if (lowerCategory.includes('identity') || lowerCategory.includes('아이덴티티')) return "Identity";
    if (lowerCategory.includes('editorial') || lowerCategory.includes('편집')) return "Editorial";

    return "Digital"; // Default fallback
  };

  // Transform projects with archive category
  const projectsWithCategory = projects.map(project => ({
    ...project,
    archiveCategory: getArchiveCategory(project.category),
    year: new Date(project.date).getFullYear().toString(),
  }));

  const filteredProjects = selectedCategory === "All"
    ? projectsWithCategory
    : projectsWithCategory.filter(p => p.archiveCategory === selectedCategory);

  const projectsByYear = filteredProjects.reduce((acc, project) => {
    if (!acc[project.year]) {
      acc[project.year] = [];
    }
    acc[project.year].push(project);
    return acc;
  }, {} as Record<string, typeof projectsWithCategory>);

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

          {/* Empty State or Project List */}
          {filteredProjects.length === 0 ? (
            <FadeIn>
              <div className="border-b-1px border-editorial-border p-12 md:p-16 text-center">
                <p className="text-editorial-gray text-sm mb-2">
                  {t("아직 프로젝트가 없습니다", "No projects yet")}
                </p>
                <p className="text-xs text-editorial-gray">
                  {t("Sanity Studio에서 프로젝트를 추가해주세요", "Please add projects in Sanity Studio")}
                </p>
              </div>
            </FadeIn>
          ) : (
            <>
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
                        {projectsByYear[year].map((project) => (
                          <Link key={project._id} href={`/project/${project._id}`}>
                            <div className="p-6 md:p-8 hover:bg-editorial-paper transition-colors duration-300 group">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h3 className="headline-small group-hover:underline mb-1">
                                    {language === 'ko' ? project.title.ko : project.title.en}
                                  </h3>
                                  <p className="text-label text-editorial-gray">
                                    {project.archiveCategory}
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
                    <p className="text-lg font-medium">{filteredProjects.length}</p>
                  </div>
                  {categories.slice(1).map(category => (
                    <div key={category}>
                      <h3 className="text-label mb-2">{category}</h3>
                      <p className="text-lg font-medium">
                        {projectsWithCategory.filter(p => p.archiveCategory === category).length}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
