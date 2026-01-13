"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Masthead from "@/components/Masthead";
import { useLanguage } from "@/contexts/LanguageContext";
import { Project } from "@/lib/sanity";

interface HomeClientProps {
  projects: Project[];
}

export default function HomeClient({ projects }: HomeClientProps) {
  const { language, t } = useLanguage();

  const SidebarContent = (
    <div className="space-y-20">
      {/* Index Section */}
      <section>
        <h3 className="type-mono mb-6 border-b-[1px] border-black pb-1 font-bold">
          {t("아카이브 개요", "ARCHIVE INDEX")}
        </h3>
        <div className="space-y-6">
          <p className="type-body italic leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="type-body leading-relaxed">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
          </p>
        </div>
      </section>

      {/* Disciplines */}
      <section>
        <h3 className="type-mono mb-6 border-b-[1px] border-black pb-1 font-bold">
          {t("분야", "DISCIPLINES")}
        </h3>
        <ul className="grid grid-cols-1 divide-y divide-editorial-border border-b-[1px] border-editorial-border">
          {["Editorial Design", "Visual Identity", "Design Research", "Digital Media", "Exhibition"].map(item => (
            <li key={item} className="type-header py-3 flex justify-between items-center group cursor-pointer hover:bg-black hover:text-white px-2 transition-all">
              <span>{item}</span>
              <span className="type-mono opacity-20 group-hover:opacity-100 italic transition-opacity">0x</span>
            </li>
          ))}
        </ul>
      </section>

      {/* System info */}
      <section className="pt-10 border-t-[1px] border-black type-mono space-y-2">
        <p className="font-bold">© 2024-2025 KANG GRAPHIC</p>
        <p className="font-bold">{t("모든 권리 보유", "ALL RIGHTS RESERVED")}</p>
        <p className="opacity-20 font-bold uppercase">Archive System v3.0 / LATENCY: 0MS</p>
      </section>
    </div>
  );

  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white pb-24">
      <Masthead />

      <main className="boxed-container mt-[-1px] grid-layout border-b-[1px] border-transparent">
        {/* Column 1: Projects List (The Table) */}
        <div className="divide-y divide-editorial-border overflow-hidden">
          {/* Table Header - Strictly Aligned [150px | 1fr | 300px] */}
          <div className="hidden lg:grid lg:grid-cols-[150px_1fr_300px] divide-x divide-editorial-border bg-white border-b-[1px] border-editorial-border">
            <div className="p-3 px-4 type-mono">{t("연도", "YEAR")}</div>
            <div className="p-3 px-4 type-mono">{t("제목", "TITLE / SCOPE")}</div>
            <div className="grid grid-cols-[1fr_80px] divide-x divide-editorial-border">
              <div className="p-3 px-4 type-mono text-center">{t("분야", "TAG")}</div>
              <div className="p-3 px-4 type-mono text-center">...</div>
            </div>
          </div>

          {projects.length === 0 ? (
            <div className="p-32 text-center type-mono italic opacity-20">
              --- NO RECORDED ASSETS FOUND ---
            </div>
          ) : (
            projects.map((project, index) => (
              <FadeIn key={project._id} delay={index * 0.02}>
                <Link
                  href={`/project/${project._id}`}
                  className="grid grid-cols-1 lg:grid-cols-[150px_1fr_300px] items-stretch table-row-hover lg:divide-x divide-editorial-border group"
                >
                  {/* Year */}
                  <div className="p-4 lg:p-8 type-mono opacity-30 group-hover:opacity-100 border-b lg:border-b-0 border-editorial-border lg:border-none flex items-center lg:justify-center">
                    {project.date}
                  </div>

                  {/* Title & Description */}
                  <div className="p-4 lg:p-8 space-y-3">
                    <h2 className="type-header group-hover:underline underline-offset-4 decoration-1">
                      {language === 'ko' ? project.title?.ko : project.title?.en}
                    </h2>
                    <p className="type-body line-clamp-2 max-w-xl opacity-80 group-hover:opacity-100">
                      {language === 'ko' ? project.description?.ko : project.description?.en}
                    </p>
                  </div>

                  {/* Meta Column [300px] - Strictly Aligned with Sidebar */}
                  <div className="hidden lg:grid grid-cols-[1fr_80px] divide-x divide-editorial-border">
                    <div className="flex items-center justify-center type-mono opacity-40 group-hover:opacity-100 uppercase text-center italic">
                      {language === 'ko' ? project.category?.ko : project.category?.en}
                    </div>
                    <div className="flex justify-center items-center type-mono opacity-20 group-hover:opacity-100">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Mobile Meta (Tags & Index) */}
                  <div className="lg:hidden p-4 pt-0 flex justify-between items-center type-mono opacity-30">
                    <span>{language === 'ko' ? project.category?.ko : project.category?.en}</span>
                    <span>#{String(index + 1).padStart(2, '0')}</span>
                  </div>
                </Link>
              </FadeIn>
            ))
          )}

          <div className="h-64 bg-white"></div>
        </div>

        {/* Column 2: Sidebar [300px] */}
        <aside className="p-10 border-t-[1px] lg:border-t-0 border-editorial-border relative">
          <div className="sticky top-12">
            {SidebarContent}
          </div>
        </aside>
      </main>
    </div>
  );
}
