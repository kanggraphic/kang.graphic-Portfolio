"use client";

import { useState } from "react";
import Link from "next/link";
import Masthead from "@/components/Masthead";
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

  const getArchiveCategory = (sanityCategory: { ko: string; en: string }): Category => {
    const categoryText = language === 'ko' ? sanityCategory.ko : sanityCategory.en;
    const lowerCategory = categoryText.toLowerCase();
    if (lowerCategory.includes('print') || lowerCategory.includes('인쇄')) return "Print";
    if (lowerCategory.includes('digital') || lowerCategory.includes('디지털')) return "Digital";
    if (lowerCategory.includes('identity') || lowerCategory.includes('아이덴티티')) return "Identity";
    if (lowerCategory.includes('editorial') || lowerCategory.includes('편집')) return "Editorial";
    return "Digital";
  };

  const projectsWithCategory = projects.map(project => ({
    ...project,
    year: project.date ? project.date.split('-')[0] : 'N/A',
    archiveCategory: getArchiveCategory(project.category),
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

  const years = Object.keys(projectsByYear).sort((a, b) => b.localeCompare(a));

  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white pb-24">
      <Masthead />

      <main className="boxed-container mt-[-1px] border-b-[1px] border-transparent">
        {/* Categorization Hub - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[150px_1fr_300px] divide-y lg:divide-y-0 lg:divide-x divide-editorial-border border-b-[1px] border-editorial-border sticky top-0 z-20 bg-white">
          <div className="p-4 px-6 type-mono font-bold flex items-center">
            {t("분류", "FILTER")}
          </div>
          <div className="flex divide-x divide-editorial-border overflow-x-auto no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                   min-w-[80px] lg:flex-1 p-3 type-mono font-bold transition-all duration-150 uppercase text-[10px] lg:text-xs
                  ${selectedCategory === category
                    ? 'bg-black text-white'
                    : 'hover:bg-black hover:text-white'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="hidden lg:flex p-3 px-6 type-mono font-bold items-center justify-end h-full">
            POS. {filteredProjects.length}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="p-32 text-center type-mono italic opacity-20">
            --- NO ARCHIVE ENTRIES FOUND ---
          </div>
        ) : (
          <div className="divide-y divide-editorial-border">
            {years.map((year) => (
              <section key={year} className="grid grid-cols-1 lg:grid-cols-[150px_1fr] lg:divide-x divide-editorial-border">
                {/* Year Header - Strictly Aligned to [150px] Column */}
                <div className="p-6 lg:p-10 flex flex-row lg:flex-col justify-between items-center lg:items-start bg-white border-b lg:border-b-0 border-editorial-border sticky top-[57px] lg:static z-10">
                  <h2 className="type-header text-base bg-white">{year}</h2>
                  <p className="type-mono opacity-40 mt-0 lg:mt-2">
                    {projectsByYear[year].length} LOGGED
                  </p>
                </div>

                {/* Year Projects Grid */}
                <div className="divide-y divide-editorial-border">
                  {projectsByYear[year].map((project, idx) => (
                    <Link
                      key={project._id}
                      href={`/project/${project._id}`}
                      className="grid grid-cols-1 lg:grid-cols-[1fr_300px] items-stretch table-row-hover lg:divide-x divide-editorial-border group"
                    >
                      <div className="p-6 lg:p-10 space-y-3">
                        <h3 className="type-header text-base leading-tight group-hover:underline underline-offset-8 decoration-2">
                          {language === 'ko' ? project.title.ko : project.title.en}
                        </h3>
                        <p className="type-mono opacity-30 font-bold italic">
                          REF: {year.slice(2)}-{String(idx + 1).padStart(2, '0')}
                        </p>
                      </div>

                      {/* Meta Column [300px] aligns with sidebar line */}
                      <div className="hidden lg:grid grid-cols-[1fr_80px] divide-x divide-editorial-border">
                        <div className="flex items-center justify-center type-mono font-bold opacity-30 group-hover:opacity-100 uppercase italic">
                          {project.archiveCategory}
                        </div>
                        <div className="flex justify-center items-center type-mono font-bold group-hover:bg-black group-hover:text-white transition-all">
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                      </div>

                      {/* Mobile Meta */}
                      <div className="lg:hidden p-6 pt-0 flex justify-between items-center type-mono opacity-30 font-bold">
                        <span>{project.archiveCategory}</span>
                        <span>#{String(idx + 1).padStart(2, '0')}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Footer Stats Row - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-[150px_1fr_300px] divide-y lg:divide-y-0 lg:divide-x divide-editorial-border bg-white">
          <div className="p-6 flex flex-row lg:flex-col justify-between items-center lg:items-start h-auto lg:h-28 border-b lg:border-b-0 border-editorial-border">
            <span className="type-mono opacity-30 font-bold">{t("합계", "TOTAL")}</span>
            <span className="type-header text-2xl leading-none">{filteredProjects.length}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-editorial-border items-center">
            {categories.slice(1).map(category => (
              <div key={category} className="p-6 flex flex-col justify-between h-24 lg:h-28 group hover:bg-black transition-colors">
                <span className="type-mono opacity-30 font-bold group-hover:text-white">{category}</span>
                <span className="type-header text-lg group-hover:text-white leading-none">
                  {projectsWithCategory.filter(p => p.archiveCategory === category).length}
                </span>
              </div>
            ))}
          </div>
          <div className="hidden lg:flex bg-white items-center justify-center p-6 h-28">
          </div>
        </div>
      </main>
    </div>
  );
}
