"use client";

import Navigation from "@/components/Navigation";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/contexts/LanguageContext";
import { About } from "@/lib/sanity";

interface AboutClientProps {
  aboutData: About;
}

export default function AboutClient({ aboutData }: AboutClientProps) {
  const { language, t } = useLanguage();

  // Split bio into paragraphs
  const bioParagraphs = (language === 'ko' ? aboutData.bio.ko : aboutData.bio.en).split('\n\n');

  return (
    <>
      <Navigation />

      <main className="min-h-screen">
        <div className="max-w-screen-2xl mx-auto">
          {/* Page Header */}
          <FadeIn>
            <div className="border-b-1px border-editorial-border p-6 md:p-8">
              <h1 className="headline-xl mb-2">{t("소개", "About")}</h1>
              <p className="text-editorial-gray text-sm">
                {t("프로필 및 이력", "Profile & Experience")}
              </p>
            </div>
          </FadeIn>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr]">
            {/* Sidebar */}
            <FadeIn delay={0.1}>
              <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r-1px border-editorial-border">
                <div className="space-y-6">
                  {/* Contact */}
                  {(aboutData.email || aboutData.phone) && (
                    <div>
                      <h3 className="text-label mb-3">{t("연락처", "Contact")}</h3>
                      <div className="text-sm space-y-1">
                        {aboutData.email && <p>{aboutData.email}</p>}
                        {aboutData.phone && <p>{aboutData.phone}</p>}
                      </div>
                    </div>
                  )}

                  {/* Social */}
                  {aboutData.social && (
                    <div className="border-t-1px border-editorial-border pt-6">
                      <h3 className="text-label mb-3">{t("소셜", "Social")}</h3>
                      <div className="text-sm space-y-1">
                        {aboutData.social.instagram && (
                          <a href={aboutData.social.instagram} className="block hover:underline">Instagram</a>
                        )}
                        {aboutData.social.linkedin && (
                          <a href={aboutData.social.linkedin} className="block hover:underline">LinkedIn</a>
                        )}
                        {aboutData.social.behance && (
                          <a href={aboutData.social.behance} className="block hover:underline">Behance</a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Expertise */}
                  {aboutData.expertise && aboutData.expertise.length > 0 && (
                    <div className="border-t-1px border-editorial-border pt-6">
                      <h3 className="text-label mb-3">{t("전문 분야", "Expertise")}</h3>
                      <div className="text-sm space-y-1">
                        {aboutData.expertise.map((skill, index) => (
                          <p key={index}>{language === 'ko' ? skill.ko : skill.en}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>

            {/* Main Content */}
            <FadeIn delay={0.2}>
              <div className="p-6 md:p-8 space-y-12">
                {/* Introduction */}
                <section>
                  <h2 className="headline-medium mb-4">
                    {language === 'ko' ? aboutData.role.ko : aboutData.role.en}
                  </h2>
                  <div className="body max-w-3xl space-y-4">
                    {bioParagraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </section>

                {/* Experience */}
                {aboutData.experience && aboutData.experience.length > 0 && (
                  <section className="border-t-1px border-editorial-border pt-12">
                    <h2 className="headline-medium mb-6">{t("경력", "Experience")}</h2>
                    <div className="space-y-6">
                      {aboutData.experience.map((exp, index) => (
                        <article key={index} className="border-b-1px border-editorial-border pb-6">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="headline-small">
                                {language === 'ko' ? exp.title.ko : exp.title.en}
                              </h3>
                              <p className="text-sm text-editorial-gray">
                                {language === 'ko' ? exp.role.ko : exp.role.en}
                              </p>
                            </div>
                            <span className="text-label text-editorial-gray">{exp.period}</span>
                          </div>
                          <p className="text-sm mt-2">
                            {language === 'ko' ? exp.description.ko : exp.description.en}
                          </p>
                        </article>
                      ))}
                    </div>
                  </section>
                )}

                {/* Education */}
                {aboutData.education && aboutData.education.length > 0 && (
                  <section className="border-t-1px border-editorial-border pt-12">
                    <h2 className="headline-medium mb-6">{t("학력", "Education")}</h2>
                    <div className="space-y-4">
                      {aboutData.education.map((edu, index) => (
                        <div key={index} className="flex justify-between items-start">
                          <div>
                            <h3 className="headline-small">{edu.degree}</h3>
                            <p className="text-sm text-editorial-gray">{edu.school}</p>
                          </div>
                          <span className="text-label text-editorial-gray">{edu.year}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Client List */}
                {aboutData.clients && aboutData.clients.length > 0 && (
                  <section className="border-t-1px border-editorial-border pt-12">
                    <h2 className="headline-medium mb-6">{t("클라이언트", "Clients")}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
                      {aboutData.clients.map((client, index) => (
                        <p key={index} className="text-sm">{client}</p>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </main>
    </>
  );
}
