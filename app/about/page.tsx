import { sanityFetch, queries, About } from "@/lib/sanity";
import AboutClient from "./AboutClient";

// Mock data as fallback for development
const mockAbout: About = {
  _id: "mock-about",
  _type: "about",
  name: {
    ko: "강그래픽",
    en: "Kang Graphic"
  },
  role: {
    ko: "편집 디자이너 강동구",
    en: "Editorial Designer Kang Dong-gu"
  },
  bio: {
    ko: "저는 시각 디자인과 리서치를 기반으로 작업하는 그래픽 디자이너입니다. 특히 복잡한 주제를 명확하고 아름답게 시각화하는 것에 관심이 있습니다.\n\n제 작업은 주로 디자인 리서치, 데이터 시각화, 그리고 편집 디자인을 중심으로 진행됩니다. 디자인은 단순히 아름다운 것을 만드는 것이 아니라, 복잡한 세계를 이해하고 전달하는 도구라고 믿습니다.",
    en: "I am a graphic designer working with visual design and research. I am particularly interested in visualizing complex topics clearly and beautifully.\n\nMy work mainly focuses on design research, data visualization, and editorial design. I believe design is not simply about creating beautiful things, but a tool for understanding and communicating complex worlds."
  },
  email: "kang@graphic.com",
  phone: "+82 10-0000-0000",
  social: {
    instagram: "#",
    linkedin: "#",
    behance: "#"
  },
  expertise: [
    { ko: "디자인 리서치", en: "Design Research" },
    { ko: "비주얼 아이덴티티", en: "Visual Identity" },
    { ko: "에디토리얼 디자인", en: "Editorial Design" },
    { ko: "웹 개발", en: "Web Development" },
    { ko: "데이터 시각화", en: "Data Visualization" }
  ],
  experience: [
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
    }
  ],
  education: [
    { degree: "MFA in Design", school: "Seoul National University", year: "2021" },
    { degree: "BFA in Visual Communication", school: "Hongik University", year: "2019" }
  ],
  clients: [
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
    "Woodpecker Coats"
  ]
};

export default async function AboutPage() {
  let aboutData: About | null = null;

  try {
    const sanityAbout = await sanityFetch<About>(queries.about);
    if (sanityAbout) {
      aboutData = sanityAbout;
    }
  } catch (error) {
    console.log('Failed to fetch about data from Sanity:', error);
  }

  // Use mock data as fallback
  if (!aboutData) {
    aboutData = mockAbout;
  }

  return <AboutClient aboutData={aboutData} />;
}
