"use client";

import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Masthead from "@/components/Masthead";
import { useLanguage } from "@/contexts/LanguageContext";
import { Project, getSanityImageUrl } from "@/lib/sanity";

interface ProjectDetailProps {
  project: Project & {
    client?: string;
    year?: string;
    role?: { ko: string; en: string };
    specs?: { ko: string[]; en: string[] };
  };
  id: string;
}

export default function ProjectDetailClient({ project, id }: ProjectDetailProps) {
  const { language, t } = useLanguage();

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center type-mono italic">
        {t("프로젝트를 찾을 수 없습니다", "PROJECT NOT FOUND")}
      </main>
    );
  }

  const title = language === 'ko' ? project.title?.ko : project.title?.en;
  const category = language === 'ko' ? project.category?.ko : project.category?.en;
  const description = language === 'ko' ? project.description?.ko : project.description?.en;
  const role = language === 'ko' ? (project.role?.ko || project.role?.en) : (project.role?.en || project.role?.ko);
  const tags = project.tags || [];
  const images = project.images || [];
  const specs = project.specs ? (language === 'ko' ? project.specs.ko : project.specs.en) : [];

  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white pb-24">
      <Masthead />

      <main className="boxed-container mt-[-1px]">
        {/* Project Title & Meta - Table Style [150px | 1fr | 300px] */}
        <div className="grid grid-cols-1 lg:grid-cols-[150px_1fr_300px] divide-y lg:divide-y-0 lg:divide-x divide-editorial-border border-b-[1px] border-editorial-border">
          {/* Left: Date/Year Meta [150px] */}
          <div className="p-8 type-mono font-bold opacity-30">
            {project.date}
          </div>

          {/* Center: Title & Description [1fr] */}
          <div className="p-8 md:p-12 space-y-8">
            <div className="flex items-center gap-4 type-mono opacity-40 mb-2">
              <span>{category}</span>
            </div>
            <h1 className="type-display">
              {title}
            </h1>
            <p className="type-body max-w-2xl leading-relaxed whitespace-pre-line">
              {description || "[SPECIFICATION DATA PENDING]"}
            </p>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-x-4 gap-y-2 pt-4">
                {tags.map(tag => (
                  <span key={tag} className="type-mono text-[11px] uppercase opacity-40 font-bold tracking-wider">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Spec [300px] */}
          <div className="p-8 md:p-10 bg-white space-y-10">
            <section>
              <h3 className="type-mono mb-6 border-b-[1px] border-black pb-1 font-bold">{t("세부 정보", "INFO & SPEC")}</h3>
              <dl className="grid grid-cols-1 divide-y divide-editorial-border">
                {project.client && (
                  <div className="py-3 flex justify-between items-baseline">
                    <dt className="type-mono opacity-40">{t("클라이언트", "CLIENT")}</dt>
                    <dd className="type-header">{project.client}</dd>
                  </div>
                )}
                {role && (
                  <div className="py-3 flex justify-between items-baseline">
                    <dt className="type-mono opacity-40">{t("역할", "ROLE")}</dt>
                    <dd className="type-header text-right max-w-[180px]">{role}</dd>
                  </div>
                )}
                {project.year && (
                  <div className="py-3 flex justify-between items-baseline">
                    <dt className="type-mono opacity-40">{t("연도", "YEAR")}</dt>
                    <dd className="type-header">{project.year}</dd>
                  </div>
                )}
              </dl>
            </section>

            {specs.length > 0 && (
              <section>
                <h3 className="type-mono mb-6 border-b-[1px] border-black pb-1 font-bold">{t("사양", "SPECIFICATIONS")}</h3>
                <ul className="space-y-2">
                  {specs.map((spec, i) => (
                    <li key={i} className="type-body text-[13px] flex gap-3 italic leading-tight">
                      <span className="type-mono opacity-20 mt-0.5 font-bold">{String(i + 1).padStart(2, '0')}</span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>

        {/* Images Hub - Full width but boxed */}
        <div className="divide-y divide-editorial-border border-b-[1px] border-editorial-border bg-white">
          {images.length > 0 ? (
            images.map((image, index) => {
              const imageUrl = getSanityImageUrl(image, 2000);
              return (
                <FadeIn key={index} className="p-8 md:p-16 flex flex-col items-center">
                  <div className="relative w-full aspect-[4/3] max-w-4xl bg-white border-[1px] border-editorial-border grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden shadow-sm">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={`${title} - ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1200px) 100vw, 1200px"
                      />
                    )}
                  </div>
                  <div className="w-full max-w-4xl mt-6 flex justify-between items-start type-mono opacity-30 font-bold">
                    <span>FIG. {String(index + 1).padStart(2, '0')}</span>
                    <span className="text-right">POS: {index + 1} / {images.length}</span>
                  </div>
                </FadeIn>
              );
            })
          ) : (
            <div className="p-24 text-center type-mono italic opacity-30">
              --- NO VISUAL ASSETS AVAILABLE ---
            </div>
          )}
        </div>

        {/* Pagination Hub - Aligned to [150px | 1fr | 300px] */}
        <div className="grid grid-cols-1 lg:grid-cols-[150px_1fr_300px] divide-x divide-editorial-border h-24 border-b-[1px] border-editorial-border">
          <Link href="/" className="p-6 hover:bg-black hover:text-white transition-all flex items-center justify-center type-header group">
            <span className="mr-0">←</span>
          </Link>
          <Link href="/" className="p-6 hover:bg-black hover:text-white transition-all flex justify-center items-center type-header">
            {t("아카이브", "BACK TO INDEX")}
          </Link>
          <div className="grid grid-cols-2 divide-x divide-editorial-border h-full">
            <button className="p-6 hover:bg-black hover:text-white transition-all flex items-center justify-center type-header group">
              <span className="text-[10px] opacity-30">{t("이전", "PREV")}</span>
            </button>
            <button className="p-6 hover:bg-black hover:text-white transition-all flex items-center justify-center type-header group">
              <span className="text-[10px] opacity-30">{t("다음", "NEXT")}</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
