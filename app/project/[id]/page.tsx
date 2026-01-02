import Link from "next/link";
import Navigation from "@/components/Navigation";
import FadeIn from "@/components/FadeIn";
import ProjectDetailClient from "@/components/ProjectDetailClient";

// Generate static params for static export
export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
  ];
}

// Temporary mock data
const projectData: Record<string, any> = {
  "1": {
    date: "2025-JUL",
    title: { ko: "Kao／Primavista 젤 세안", en: "Kao／Primavista Gel Cleanser" },
    category: { ko: "포토 프로덕션", en: "Photo Production" },
    tags: ["PHOTO PRODUCE", "GRAPHIC", "TALENT"],
    client: "Kao Corporation",
    year: "2025",
    role: { ko: "아트 디렉션, 그래픽 디자인", en: "Art Direction, Graphic Design" },
    description: {
      ko: "Kao의 Primavista 브랜드를 위한 젤 세안제 캠페인. 제품의 부드러운 텍스처와 피부에 대한 순한 접근을 시각적으로 표현했습니다. 미니멀한 구성과 깨끗한 색상 팔레트를 통해 제품의 본질에 집중했습니다.",
      en: "Gel cleanser campaign for Kao's Primavista brand. Visually expressed the product's gentle texture and mild approach to skin. Focused on the essence of the product through minimal composition and clean color palette.",
    },
    specs: {
      ko: [
        "포토 프로덕션 및 아트 디렉션",
        "그래픽 디자인 및 레이아웃",
        "탤런트 캐스팅 및 스타일링",
        "최종 산출물: 디지털 캠페인",
      ],
      en: [
        "Photo Production & Art Direction",
        "Graphic Design & Layout",
        "Talent Casting & Styling",
        "Deliverables: Digital Campaign",
      ],
    },
    images: [
      "/images/placeholder-1.jpg",
      "/images/placeholder-detail-1.jpg",
      "/images/placeholder-detail-2.jpg",
    ],
  },
};

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const id = params.id;
  const project = projectData[id];

  return (
    <>
      <Navigation />
      <ProjectDetailClient project={project} id={id} />
    </>
  );
}
