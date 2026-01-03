import Navigation from "@/components/Navigation";
import ArticleDetailClient from "@/components/ArticleDetailClient";

// Generate static params for static export
export function generateStaticParams() {
  return [
    { slug: '1' },
    { slug: '2' },
    { slug: '3' },
  ];
}

// Temporary mock data
const articleData: Record<string, any> = {
  "1": {
    date: "2025-01-02",
    title: { ko: "편집 디자인의 문법을 웹으로", en: "Translating Editorial Grammar to Web" },
    category: "editorial",
    readTime: "5 min",
    excerpt: {
      ko: "종이 매체의 질서를 웹 환경으로 전이시키는 실험적 접근에 대하여",
      en: "On the experimental approach to transferring print media order to web environments"
    },
    content: {
      ko: `편집 디자인은 오랜 역사를 가진 종이 매체의 언어입니다. 그리드 시스템, 타이포그래피의 위계, 여백의 사용 등 수많은 규칙과 문법이 수백 년에 걸쳐 정립되어 왔습니다.

이러한 편집 디자인의 문법을 웹 환경으로 옮기는 것은 단순한 번역이 아닙니다. 스크린의 제약, 반응형 디자인의 필요성, 인터랙션의 가능성 등 웹만의 특성을 고려해야 합니다.

본 프로젝트는 JXL, Hinokage, Melody Digital 등의 레퍼런스를 연구하며, 테이블 그리드 시스템을 기반으로 한 새로운 접근을 시도했습니다. 1px 보더를 활용한 구조적 긴장감, 최소한의 색상 팔레트, 그리고 밀도 있는 레이아웃을 통해 종이 매체의 질서를 웹으로 전이시켰습니다.

결과적으로 디지털 환경에서도 편집 디자인 고유의 엄격함과 아름다움을 유지하면서, 동시에 웹의 역동성을 살릴 수 있었습니다.`,
      en: `Editorial design is the language of print media with a long history. Numerous rules and grammar, such as grid systems, typographic hierarchy, and use of white space, have been established over hundreds of years.

Translating this editorial design grammar into the web environment is not a simple translation. We must consider web-specific characteristics such as screen constraints, responsive design needs, and interaction possibilities.

This project studied references like JXL, Hinokage, and Melody Digital, attempting a new approach based on a table-grid system. Through structural tension using 1px borders, a minimal color palette, and dense layouts, we transferred the order of print media to the web.

As a result, we maintained the rigor and beauty inherent in editorial design even in the digital environment, while simultaneously bringing out the dynamism of the web.`
    },
    coverImage: "/images/placeholder-1.jpg",
  },
  "2": {
    date: "2024-12-15",
    title: { ko: "그리드 시스템과 타이포그래피", en: "Grid Systems and Typography" },
    category: "design",
    readTime: "7 min",
    excerpt: {
      ko: "최소한의 요소로 최대의 구조적 긴장감을 형성하는 방법",
      en: "Creating maximum structural tension with minimal elements"
    },
    content: {
      ko: `그리드 시스템은 디자인의 뼈대입니다. 보이지 않는 질서 속에서 콘텐츠는 자신의 자리를 찾고, 타이포그래피는 명확한 위계를 형성합니다.

스위스 국제 타이포그래피 양식에서 시작된 엄격한 그리드의 전통은 현대에 이르러 더욱 다양한 형태로 진화했습니다. 하지만 그 본질은 변하지 않았습니다. 바로 '질서 속의 자유'입니다.

이 글에서는 Josef Müller-Brockmann의 그리드 시스템을 현대적으로 재해석하여, 웹 환경에서 어떻게 적용할 수 있는지 탐구합니다.`,
      en: `Grid systems are the skeleton of design. Within invisible order, content finds its place, and typography forms a clear hierarchy.

The tradition of strict grids that began with Swiss International Typographic Style has evolved into more diverse forms in modern times. However, its essence remains unchanged: 'freedom within order.'

This article explores how Josef Müller-Brockmann's grid system can be reinterpreted in a modern way and applied in web environments.`
    },
    coverImage: "/images/placeholder-2.jpg",
  },
  "3": {
    date: "2024-11-20",
    title: { ko: "디지털 아카이브의 미래", en: "The Future of Digital Archives" },
    category: "editorial",
    readTime: "6 min",
    excerpt: {
      ko: "콘텐츠 중심의 포트폴리오 구조에 대한 고찰",
      en: "Reflections on content-first portfolio structures"
    },
    content: {
      ko: `포트폴리오는 단순히 작업물을 나열하는 공간이 아닙니다. 그것은 디자이너의 사고방식, 작업 과정, 그리고 철학을 담는 아카이브입니다.

전통적인 포트폴리오는 시각적 임팩트에 집중했습니다. 큰 이미지, 화려한 인터랙션, 눈을 사로잡는 레이아웃. 하지만 이러한 접근은 정작 중요한 콘텐츠를 가리는 경우가 많습니다.

콘텐츠 우선(Content-First) 접근은 이와 반대입니다. 명확한 위계, 읽기 쉬운 타이포그래피, 그리고 집중을 방해하지 않는 미니멀한 디자인. 이를 통해 작업의 본질이 드러납니다.`,
      en: `A portfolio is not just a space to list works. It is an archive that contains the designer's way of thinking, work process, and philosophy.

Traditional portfolios focused on visual impact. Large images, flashy interactions, eye-catching layouts. However, this approach often obscures what's truly important: the content.

The Content-First approach is the opposite. Clear hierarchy, readable typography, and minimal design that doesn't distract from focus. Through this, the essence of the work is revealed.`
    },
    coverImage: "/images/placeholder-3.jpg",
  },
};

export default function ArticleDetail({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const article = articleData[slug];

  return (
    <>
      <Navigation />
      <ArticleDetailClient article={article} slug={slug} />
    </>
  );
}
