import { sanityFetch, queries, Project } from "@/lib/sanity";
import HomeClient from "./HomeClient";

// Mock data as fallback
const mockProjects: Project[] = [
  {
    _id: "1",
    _type: "project" as const,
    date: "2025-JUL",
    title: { ko: "Kao／Primavista 젤 세안", en: "Kao／Primavista Gel Cleanser" },
    category: { ko: "포토 프로덕션", en: "Photo Production" },
    tags: ["PHOTO PRODUCE", "GRAPHIC", "TALENT"],
    slug: { current: "1" },
  },
  {
    _id: "2",
    _type: "project" as const,
    date: "2025-SEP",
    title: { ko: "MACNICA／「マクニカでくくる」GR제작", en: "MACNICA／GR Production" },
    category: { ko: "그래픽 디자인", en: "Graphic Design" },
    tags: ["PHOTO PRODUCE", "GRAPHIC", "TALENT"],
    slug: { current: "2" },
  },
  {
    _id: "3",
    _type: "project" as const,
    date: "2024-NOV",
    title: { ko: "ORIX HOTELS & RESORTS／「온천편」「식사편」「객실편」", en: "ORIX HOTELS & RESORTS／Campaign" },
    category: { ko: "포토 프로덕션", en: "Photo Production" },
    tags: ["PHOTO PRODUCE", "GRAPHIC", "TALENT"],
    slug: { current: "3" },
  },
  {
    _id: "4",
    _type: "project" as const,
    date: "2024-NOV",
    title: { ko: "MEDULLA／rebranding", en: "MEDULLA／rebranding" },
    category: { ko: "브랜딩", en: "Branding" },
    tags: ["PHOTO PRODUCE", "GRAPHIC"],
    slug: { current: "4" },
  },
  {
    _id: "5",
    _type: "project" as const,
    date: "2024-OCT",
    title: { ko: "디지털 투발루 아이덴티티", en: "Digital Tuvalu Identity" },
    category: { ko: "비주얼 아이덴티티", en: "Visual Identity" },
    tags: ["GRAPHIC", "IDENTITY"],
    slug: { current: "5" },
  },
  {
    _id: "6",
    _type: "project" as const,
    date: "2024-AUG",
    title: { ko: "Territory in Flux 편집 디자인", en: "Territory in Flux Editorial" },
    category: { ko: "에디토리얼", en: "Editorial" },
    tags: ["EDITORIAL", "PRINT"],
    slug: { current: "6" },
  },
];

export default async function Home() {
  // Fetch from Sanity with proper null handling
  let projects: Project[] = [];

  try {
    const sanityProjects = await sanityFetch<Project[]>(queries.allProjects);
    // Ensure we have a valid array
    if (Array.isArray(sanityProjects) && sanityProjects.length > 0) {
      projects = sanityProjects;
    }
  } catch (error) {
    console.log('Failed to fetch from Sanity:', error);
  }

  // Show mock data only in development
  if (projects.length === 0 && process.env.NODE_ENV === 'development') {
    projects = mockProjects;
  }

  // Always pass an array (never null/undefined)
  return <HomeClient projects={projects || []} />;
}
