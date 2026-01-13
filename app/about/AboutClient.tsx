"use client";

import FadeIn from "@/components/FadeIn";
import Masthead from "@/components/Masthead";
import { useLanguage } from "@/contexts/LanguageContext";
import { About } from "@/lib/sanity";

interface AboutClientProps {
  aboutData: About;
}

export default function AboutClient({ aboutData }: AboutClientProps) {
  const { language, t } = useLanguage();

  const bioParagraphs = (language === 'ko' ? aboutData.bio.ko : aboutData.bio.en).split('\n\n');

  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white pb-24">
      <Masthead />

      <main className="boxed-container mt-[-1px] border-b-[1px] border-transparent">
        {/* Intro Section - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] border-b-[1px] border-editorial-border divide-y lg:divide-y-0 lg:divide-x divide-editorial-border">
          <div className="p-6 md:p-12 lg:p-16 space-y-10">
            <section>
              <h2 className="type-header bg-black text-white inline-block px-2 py-0.5 mb-8 text-sm">
                {language === 'ko' ? aboutData.role.ko : aboutData.role.en}
              </h2>
              <div className="space-y-8 max-w-2xl">
                {bioParagraphs.map((paragraph, index) => (
                  <p key={index} className="type-body leading-relaxed text-justify">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          </div>

          <div className="p-6 md:p-10 bg-white space-y-12 h-full">
            {/* Contact info */}
            <section>
              <h3 className="type-mono mb-8 border-b-[1px] border-black pb-1 font-bold">{t("연락처", "CONTACT HUB")}</h3>
              <div className="space-y-8">
                {aboutData.email && (
                  <div className="flex flex-col border-b-[1px] border-editorial-border pb-3">
                    <span className="type-mono opacity-30 mb-2 font-bold">ADDRESS</span>
                    <span className="type-header text-xs lg:text-sm underline break-all">{aboutData.email}</span>
                  </div>
                )}
                {aboutData.social && (
                  <div className="grid grid-cols-1 gap-4">
                    {Object.entries(aboutData.social).map(([platform, url]) => (
                      url && (
                        <a key={platform} href={url as string} className="type-header text-[12px] lg:text-sm flex justify-between items-center group border-b-[1px] border-editorial-border pb-3 last:border-0">
                          <span className="uppercase">{platform}</span>
                          <span className="type-mono opacity-0 group-hover:opacity-100 italic transition-opacity">↗</span>
                        </a>
                      )
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Expertise */}
            {aboutData.expertise && aboutData.expertise.length > 0 && (
              <section>
                <h3 className="type-mono mb-8 border-b-[1px] border-black pb-1 font-bold">{t("전문 분야", "COMPETENCIES")}</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {aboutData.expertise.map((skill, index) => (
                    <span key={index} className="type-mono text-[10px] lg:text-[11px] uppercase opacity-40 font-bold tracking-wider">
                      # {language === 'ko' ? skill.ko : skill.en}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Experience & Education - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] divide-y lg:divide-y-0 lg:divide-x divide-editorial-border border-b-[1px] border-editorial-border lg:border-b-0">
          <section className="p-6 md:p-12 lg:p-16 space-y-16">
            <h3 className="type-mono mb-12 border-b-[1px] border-black pb-1 font-bold uppercase">{t("경력", "CURRICULUM VITAE")}</h3>
            <div className="divide-y divide-editorial-border">
              {aboutData.experience?.map((exp, index) => (
                <article key={index} className="grid grid-cols-1 md:grid-cols-[150px_1fr] py-10 first:pt-0 last:pb-0 group gap-4 lg:gap-8">
                  <div className="type-mono font-bold pt-1 opacity-40 group-hover:opacity-100 transition-opacity">
                    {exp.period}
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="type-header text-base leading-tight group-hover:underline underline-offset-8 decoration-2">
                        {language === 'ko' ? exp.title.ko : exp.title.en}
                      </h4>
                      <p className="type-header text-[10px] lg:text-[11px] mt-4 opacity-30 italic">
                        {language === 'ko' ? exp.role.ko : exp.role.en}
                      </p>
                    </div>
                    <p className="type-body text-xs lg:text-sm leading-relaxed max-w-xl text-justify">
                      {language === 'ko' ? exp.description.ko : exp.description.en}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="p-6 md:p-10 bg-white divide-y divide-editorial-border">
            {/* Education */}
            <section className="mb-16 pb-16">
              <h3 className="type-mono mb-12 border-b-[1px] border-black pb-1 font-bold uppercase">{t("학력", "EDUCATION")}</h3>
              <div className="space-y-10">
                {aboutData.education?.map((edu, index) => (
                  <div key={index} className="space-y-3 group">
                    <span className="type-mono font-bold opacity-20 group-hover:opacity-100 transition-opacity">{edu.year}</span>
                    <div>
                      <h4 className="type-header leading-tight">{edu.degree}</h4>
                      <p className="type-body mt-2 opacity-60">{edu.school}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>

        {/* Clients Section - Moved out of sidebar for full-width grid layout */}
        {aboutData.clients && aboutData.clients.length > 0 && (
          <section className="grid grid-cols-1 lg:grid-cols-[150px_1fr] border-y-[1px] border-editorial-border divide-y lg:divide-y-0 lg:divide-x divide-editorial-border">
            <div className="p-6 lg:p-10 type-mono font-bold opacity-30 flex items-center lg:justify-center">
              {t("클라이언트", "CLIENTS")}
            </div>
            <div className="p-6 lg:p-10">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-3">
                {aboutData.clients.map((client, index) => (
                  <p key={index} className="type-header text-[11px] lg:text-[12px] border-b-[1px] border-editorial-border pb-1 hover:bg-black hover:text-white px-1 transition-all">
                    {client}
                  </p>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
