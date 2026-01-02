import NewspaperHeader from "@/components/NewspaperHeader";

const projects = [
  {
    id: 1,
    title: "Territory in Flux",
    subtitle: "기후변화와 영토 주권",
    category: "Design Research",
    year: "2025",
    description: "작은 섬나라들의 주권이 기후변화와 지정학적 협상 속에서 어떻게 재정의되는지 탐구하는 프로젝트"
  },
  {
    id: 2,
    title: "Rising Nations Initiative",
    subtitle: "디지털 국가 프로젝트",
    category: "Interaction Design",
    year: "2024",
    description: "투발루의 메타버스 국가 건설과 디지털 시민권에 대한 인터랙티브 경험 디자인"
  },
  {
    id: 3,
    title: "Post-Territorial State",
    subtitle: "영토 없는 국가",
    category: "Visual Identity",
    year: "2024",
    description: "새로운 국가 정체성을 위한 비주얼 시스템 및 브랜딩 프로젝트"
  },
  {
    id: 4,
    title: "Climate Migration Atlas",
    subtitle: "기후 이주 지도",
    category: "Data Visualization",
    year: "2023",
    description: "전 세계 기후 난민 이동 경로와 데이터를 시각화한 인터랙티브 아틀라스"
  },
  {
    id: 5,
    title: "Maritime Sovereignty",
    subtitle: "해양 주권 타임라인",
    category: "Editorial Design",
    year: "2023",
    description: "UNCLOS부터 현재까지 해양법의 변화를 추적하는 타임라인 북"
  },
  {
    id: 6,
    title: "Small Island Developing States",
    subtitle: "작은 섬나라 연구",
    category: "Research Publication",
    year: "2022",
    description: "기후위기 최전선에 있는 태평양 도서국들의 생존 전략 리서치 출판물"
  },
];

export default function ArchivePage() {
  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-[1600px] mx-auto">
        <NewspaperHeader />

        <div className="mt-8">
          <div className="divider-horizontal pb-6 mb-8">
            <h1 className="headline-large">ARCHIVE</h1>
            <p className="headline-small font-normal mt-2">프로젝트 아카이브</p>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <article key={project.id} className="divider-horizontal pb-6 group cursor-pointer">
                {/* Project Number */}
                <div className="flex items-start justify-between mb-3">
                  <span className="w-8 h-8 bg-newspaper-text text-newspaper-bg flex items-center justify-center font-gothic font-bold">
                    {project.id}
                  </span>
                  <span className="caption">{project.year}</span>
                </div>

                {/* Image Placeholder */}
                <div className="aspect-[4/3] border border-newspaper-divider mb-4 flex items-center justify-center bg-newspaper-bg/50 group-hover:border-newspaper-text transition-colors">
                  <span className="caption">[Project Image]</span>
                </div>

                {/* Project Info */}
                <div className="space-y-2">
                  <p className="caption uppercase">{project.category}</p>
                  <h2 className="headline-small group-hover:underline">{project.title}</h2>
                  <h3 className="font-gothic text-base">{project.subtitle}</h3>
                  <p className="text-newspaper text-sm leading-relaxed">{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
