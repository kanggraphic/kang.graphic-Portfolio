"use client";

import Navigation from "@/components/Navigation";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/contexts/LanguageContext";

// Client list data
const clients = [
  "Aēr", "AntMUSIC", "Austen Goodman", "Article One Eyewear",
  "Better World Fragrance House",
  "CNND SERVICES", "Chrome Hearts", "Coffee Barista", "Crazy & Santa Muerte",
  "Drake", "Damon & Charlie Constantinou", "Dali", "Dishan Karu", "DUSK to DAWN",
  "Ella Thomas", "Ep&Sci",
  "Formit Studio", "Fox Group",
  "Gentle Systems", "George Davies", "GONZO - EP",
  "Honest - EP",
  "Jordan Chan Realty",
  "Lululemon",
  "Minoritep", "March 2004", "Mandatory Attendance",
  "NOCTA", "Nike Basketball", "Nike Sportswear", "Nabil Elsahr",
  "Original Creative Agency",
  "Pyra - EP",
  "Ray-Ban Meta",
  "Scout Motors", "S-1 Studios", "SALT & STONE", "SEASONS - EP",
  "Talgh",
  "Victor Kinkera",
  "Woodpecker Coats",
];

export default function AboutPage() {
  const { language, t } = useLanguage();

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
                  <div>
                    <h3 className="text-label mb-3">{t("연락처", "Contact")}</h3>
                    <div className="text-sm space-y-1">
                      <p>kang@graphic.com</p>
                      <p>+82 10-0000-0000</p>
                    </div>
                  </div>

                  <div className="border-t-1px border-editorial-border pt-6">
                    <h3 className="text-label mb-3">{t("소셜", "Social")}</h3>
                    <div className="text-sm space-y-1">
                      <a href="#" className="block hover:underline">Instagram</a>
                      <a href="#" className="block hover:underline">LinkedIn</a>
                      <a href="#" className="block hover:underline">Behance</a>
                    </div>
                  </div>

                  <div className="border-t-1px border-editorial-border pt-6">
                    <h3 className="text-label mb-3">{t("전문 분야", "Expertise")}</h3>
                    <div className="text-sm space-y-1">
                      <p>{t("디자인 리서치", "Design Research")}</p>
                      <p>{t("비주얼 아이덴티티", "Visual Identity")}</p>
                      <p>{t("에디토리얼 디자인", "Editorial Design")}</p>
                      <p>{t("웹 개발", "Web Development")}</p>
                      <p>{t("데이터 시각화", "Data Visualization")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Main Content */}
            <FadeIn delay={0.2}>
              <div className="p-6 md:p-8 space-y-12">
                {/* Introduction */}
                <section>
                  <h2 className="headline-medium mb-4">
                    {t("편집 디자이너", "Editorial Designer")}
                  </h2>
                  <div className="body max-w-3xl space-y-4">
                    <p>
                      {t(
                        "저는 시각 디자인과 리서치를 기반으로 작업하는 그래픽 디자이너입니다. 특히 복잡한 주제를 명확하고 아름답게 시각화하는 것에 관심이 있습니다.",
                        "I am a graphic designer working with visual design and research. I am particularly interested in visualizing complex topics clearly and beautifully."
                      )}
                    </p>
                    <p>
                      {t(
                        "제 작업은 주로 디자인 리서치, 데이터 시각화, 그리고 편집 디자인을 중심으로 진행됩니다. 디자인은 단순히 아름다운 것을 만드는 것이 아니라, 복잡한 세계를 이해하고 전달하는 도구라고 믿습니다.",
                        "My work mainly focuses on design research, data visualization, and editorial design. I believe design is not simply about creating beautiful things, but a tool for understanding and communicating complex worlds."
                      )}
                    </p>
                  </div>
                </section>

                {/* Experience */}
                <section className="border-t-1px border-editorial-border pt-12">
                  <h2 className="headline-medium mb-6">{t("경력", "Experience")}</h2>
                  <div className="space-y-6">
                    {[
                      {
                        title: { ko: "독립 디자인 스튜디오", en: "Independent Design Studio" },
                        role: { ko: "대표 및 크리에이티브 디렉터", en: "Founder & Creative Director" },
                        period: "2023 — Present",
                        description: {
                          ko: "편집 디자인, 브랜딩, 디자인 리서치 프로젝트 진행",
                          en: "Editorial design, branding, and design research projects"
                        }
                      },
                      {
                        title: { ko: "디자인 리서치 랩", en: "Design Research Lab" },
                        role: { ko: "리서치 디자이너", en: "Research Designer" },
                        period: "2021 — 2023",
                        description: {
                          ko: "데이터 시각화 및 인터랙티브 디자인 프로젝트 참여",
                          en: "Data visualization and interactive design projects"
                        }
                      },
                      {
                        title: { ko: "에디토리얼 디자인 스튜디오", en: "Editorial Design Studio" },
                        role: { ko: "그래픽 디자이너", en: "Graphic Designer" },
                        period: "2019 — 2021",
                        description: {
                          ko: "출판물 디자인, 브랜딩, 타이포그래피 작업",
                          en: "Publication design, branding, typography"
                        }
                      },
                    ].map((exp, index) => (
                      <article key={index} className="border-b-1px border-editorial-border pb-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="headline-small">{language === 'ko' ? exp.title.ko : exp.title.en}</h3>
                            <p className="text-sm text-editorial-gray">{language === 'ko' ? exp.role.ko : exp.role.en}</p>
                          </div>
                          <span className="text-label text-editorial-gray">{exp.period}</span>
                        </div>
                        <p className="text-sm mt-2">{language === 'ko' ? exp.description.ko : exp.description.en}</p>
                      </article>
                    ))}
                  </div>
                </section>

                {/* Education */}
                <section className="border-t-1px border-editorial-border pt-12">
                  <h2 className="headline-medium mb-6">{t("학력", "Education")}</h2>
                  <div className="space-y-4">
                    {[
                      { degree: "MFA in Design", school: "Seoul National University", year: "2021" },
                      { degree: "BFA in Visual Communication", school: "Hongik University", year: "2019" },
                    ].map((edu, index) => (
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

                {/* Client List */}
                <section className="border-t-1px border-editorial-border pt-12">
                  <h2 className="headline-medium mb-6">{t("클라이언트", "Clients")}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
                    {clients.map((client, index) => (
                      <p key={index} className="text-sm">{client}</p>
                    ))}
                  </div>
                </section>
              </div>
            </FadeIn>
          </div>
        </div>
      </main>
    </>
  );
}
