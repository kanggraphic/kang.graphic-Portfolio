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
          <div className="p-6 lg:p-8 type-mono font-bold opacity-30 sticky top-0">
            {project.date ? new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }).toUpperCase() : project.year}
          </div>

          {/* Center: Title & Description [1fr] */}
          <div className="p-6 md:p-12 lg:p-16 space-y-8 bg-white">
            <div className="flex flex-col gap-2">
              <p className="type-mono opacity-40 font-bold tracking-widest">
                {category}
              </p>
              <h1 className="type-display text-2xl lg:text-3xl leading-none">
                {title}
              </h1>
            </div>

            <div className="type-content opacity-90 whitespace-pre-line max-w-2xl">
              {description || ""}
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-x-4 gap-y-2 pt-4 border-t-[1px] border-editorial-border/40 w-full max-w-sm">
                {tags.map(tag => (
                  <span key={tag} className="type-mono text-[10px] opacity-40">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Spec [300px] */}
          {/* Aligned carefully to valid Editorial Design standards */}
          <div className="p-6 md:p-10 bg-white space-y-12">
            <section>
              <h3 className="type-mono mb-6 border-b-[1px] border-black pb-1 font-bold">{t("세부 정보", "DETAILS")}</h3>
              <dl className="space-y-6">
                {project.client && (
                  <div className="space-y-1">
                    <dt className="type-mono opacity-40 font-bold">{t("클라이언트", "CLIENT")}</dt>
                    <dd className="type-header text-sm">{project.client}</dd>
                  </div>
                )}
                {role && (
                  <div className="space-y-1">
                    <dt className="type-mono opacity-40 font-bold">{t("역할", "ROLE")}</dt>
                    <dd className="type-header text-sm">{role}</dd>
                  </div>
                )}
                {project.year && (
                  <div className="space-y-1">
                    <dt className="type-mono opacity-40 font-bold">{t("연도", "YEAR")}</dt>
                    <dd className="type-header text-sm">{project.year}</dd>
                  </div>
                )}
              </dl>
            </section>

            {specs.length > 0 && (
              <section className="pt-8 border-t border-editorial-border/30">
                <h3 className="type-mono mb-6 opacity-40 font-bold">{t("사양", "SPECIFICATIONS")}</h3>
                <ul className="space-y-2">
                  {specs.map((spec, i) => (
                    <li key={i} className="type-body text-[12px] flex gap-3 leading-tight opacity-80">
                      <span className="type-mono opacity-30 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>


        {/* Images Hub - Clean, Static, No Animation */}
        <div className="grid grid-cols-1 lg:grid-cols-[150px_1fr_300px] lg:divide-x divide-editorial-border border-b-[1px] border-editorial-border bg-white">
          <div className="hidden lg:block bg-zinc-50/10"></div>

          <div className="divide-y divide-editorial-border">
            {images.length > 0 ? (
              images.map((image, index) => {
                const imageUrl = getSanityImageUrl(image, 2400);
                return (
                  <div key={index} className="p-0 flex flex-col">
                    <div className="relative w-full bg-white">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={`${title} - ${index + 1}`}
                          width={2400}
                          height={1600}
                          className="w-full h-auto object-cover block"
                          sizes="(max-width: 1200px) 100vw, 900px"
                          priority={index === 0}
                        />
                      )}
                    </div>
                    {/* Caption area if needed, otherwise minimal padding */}
                    <div className="p-4 flex justify-between items-center type-mono opacity-30 font-bold border-t-[1px] border-editorial-border/20">
                      <span>FIG. {String(index + 1).padStart(2, '0')}</span>
                      <span>POS: {index + 1} / {images.length}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-24 text-center type-mono italic opacity-20">
                --- NO VISUAL ASSETS AVAILABLE ---
              </div>
            )}
          </div>

          <div className="hidden lg:block bg-white"></div>
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
