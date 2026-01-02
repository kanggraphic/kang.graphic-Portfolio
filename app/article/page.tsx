import NewspaperHeader from "@/components/NewspaperHeader";

const articles = [
  {
    id: 1,
    title: "Territory in Flux: 영토는 고정되어 있지 않다",
    subtitle: "기후변화 시대의 영토 주권",
    category: "Design Research",
    date: "2025.01",
    readTime: "15 min read",
    preview: "투발루가 선언한 '영구적 해양 경계' 고정은 기후변화 시대에 영토와 주권의 의미를 다시 묻는다.",
  },
  {
    id: 2,
    title: "Rising Nations: 떠오르는 국가들",
    subtitle: "작은 섬나라들의 생존 전략",
    category: "Research",
    date: "2024.12",
    readTime: "12 min read",
    preview: "투발루, 키리바시, 마셜제도, 나우루 4개국이 시작한 'Rising Nations Initiative'는 기후위기에 대한 새로운 대응 방식을 제시한다.",
  },
  {
    id: 3,
    title: "Digital Tuvalu: 메타버스 국가의 탄생",
    subtitle: "디지털 공간에서의 주권",
    category: "Technology",
    date: "2024.11",
    readTime: "10 min read",
    preview: "투발루가 메타버스에 구축한 디지털 국가는 물리적 영토를 잃어가는 국가의 새로운 가능성을 보여준다.",
  },
  {
    id: 4,
    title: "UNCLOS와 기후변화: 법의 한계",
    subtitle: "해양법협약의 재해석",
    category: "Legal Studies",
    date: "2024.10",
    readTime: "18 min read",
    preview: "1982년 유엔해양법협약은 기후변화로 인한 육지 소실을 예상하지 못했다. 이제 국제법은 어떻게 변화해야 하는가?",
  },
  {
    id: 5,
    title: "Climate Migration: 이주가 아닌 선택",
    subtitle: "기후 난민의 정치학",
    category: "Social Studies",
    date: "2024.09",
    readTime: "14 min read",
    preview: "태평양 도서국 주민들은 '기후 난민'이라는 용어를 거부한다. 그들은 이주가 아닌 다른 선택지를 모색하고 있다.",
  },
  {
    id: 6,
    title: "Post-Territorial State: 영토 없는 국가",
    subtitle: "새로운 국가 형태의 출현",
    category: "Political Theory",
    date: "2024.08",
    readTime: "16 min read",
    preview: "영토가 국가의 필수 요소라는 베스트팔렌 체제의 원칙이 도전받고 있다. 영토 없는 국가는 가능한가?",
  },
  {
    id: 7,
    title: "Small Island, Big Ocean: 작은 섬의 큰 바다",
    subtitle: "EEZ의 역설",
    category: "Geography",
    date: "2024.07",
    readTime: "11 min read",
    preview: "작은 섬나라들의 배타적 경제수역(EEZ)은 육지 면적의 수천 배에 달한다. 이 바다를 지키는 것이 곧 국가를 지키는 것이다.",
  },
  {
    id: 8,
    title: "Designing for Disappearance: 소멸을 위한 디자인",
    subtitle: "기록과 기억의 디자인",
    category: "Design Philosophy",
    date: "2024.06",
    readTime: "13 min read",
    preview: "사라질 운명에 처한 것들을 어떻게 디자인할 것인가? 투발루 프로젝트를 통해 '소멸의 디자인'에 대해 탐구한다.",
  },
];

export default function ArticlePage() {
  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-[1600px] mx-auto">
        <NewspaperHeader />

        <div className="mt-8">
          <div className="divider-horizontal pb-6 mb-8">
            <h1 className="headline-large">ARTICLE</h1>
            <p className="headline-small font-normal mt-2">글과 리서치 목록</p>
          </div>

          {/* Magazine TOC Style Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
            {/* Main Article List */}
            <div className="space-y-0">
              {articles.map((article, index) => (
                <article
                  key={article.id}
                  className="divider-horizontal py-6 group cursor-pointer hover:bg-newspaper-bg/50 transition-colors px-4 -mx-4"
                >
                  <div className="flex gap-6">
                    {/* Number */}
                    <div className="flex-shrink-0">
                      <span className="font-gothic font-bold text-4xl text-newspaper-divider group-hover:text-newspaper-text transition-colors">
                        {String(article.id).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <span className="caption uppercase">{article.category}</span>
                        <div className="text-right">
                          <span className="caption block">{article.date}</span>
                          <span className="caption block">{article.readTime}</span>
                        </div>
                      </div>

                      <h2 className="headline-medium mb-2 group-hover:underline">
                        {article.title}
                      </h2>
                      <h3 className="font-gothic text-lg mb-3 text-newspaper-gray">
                        {article.subtitle}
                      </h3>
                      <p className="text-newspaper">
                        {article.preview}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Sidebar */}
            <div className="divider-vertical pl-8 space-y-8">
              {/* Featured */}
              <div className="side-box">
                <h3 className="headline-small mb-3">Featured</h3>
                <div className="space-y-4">
                  <div>
                    <p className="caption mb-1">Most Read</p>
                    <p className="font-gothic text-sm font-bold">Territory in Flux</p>
                  </div>
                  <div className="divider-horizontal pt-4">
                    <p className="caption mb-1">Latest</p>
                    <p className="font-gothic text-sm font-bold">영토는 고정되어 있지 않다</p>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="headline-small mb-3">Categories</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Design Research</span>
                    <span className="caption">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Technology</span>
                    <span className="caption">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Social Studies</span>
                    <span className="caption">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Legal Studies</span>
                    <span className="caption">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Political Theory</span>
                    <span className="caption">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Design Philosophy</span>
                    <span className="caption">1</span>
                  </div>
                </div>
              </div>

              {/* Archive Years */}
              <div className="divider-horizontal pt-4">
                <h3 className="headline-small mb-3">Archive</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>2025</span>
                    <span className="caption">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2024</span>
                    <span className="caption">7</span>
                  </div>
                </div>
              </div>

              {/* Subscribe Box */}
              <div className="side-box">
                <h3 className="headline-small mb-2">Subscribe</h3>
                <p className="text-xs mb-3">
                  새로운 글과 프로젝트 소식을 받아보세요.
                </p>
                <div className="border border-newspaper-divider">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-3 py-2 text-sm bg-transparent focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
