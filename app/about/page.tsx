import NewspaperHeader from "@/components/NewspaperHeader";

export default function AboutPage() {
  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-[1600px] mx-auto">
        <NewspaperHeader />

        <div className="mt-8">
          <div className="divider-horizontal pb-6 mb-8">
            <h1 className="headline-large">ABOUT</h1>
            <p className="headline-small font-normal mt-2">디자이너 소개 및 경력</p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
            {/* Left Sidebar */}
            <div className="divider-vertical pr-8">
              <div className="aspect-square border border-newspaper-divider mb-4 flex items-center justify-center bg-newspaper-bg/50">
                <span className="caption">[Profile Photo]</span>
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="headline-small mb-2">Contact</h2>
                  <div className="text-sm space-y-1">
                    <p>kang@graphic.com</p>
                    <p>+82 10-0000-0000</p>
                  </div>
                </div>

                <div className="divider-horizontal pt-4">
                  <h2 className="headline-small mb-2">Social</h2>
                  <div className="text-sm space-y-1">
                    <p>Instagram</p>
                    <p>LinkedIn</p>
                    <p>Behance</p>
                  </div>
                </div>

                <div className="divider-horizontal pt-4">
                  <h2 className="headline-small mb-2">Skills</h2>
                  <div className="text-sm space-y-1">
                    <p>Design Research</p>
                    <p>Visual Identity</p>
                    <p>Editorial Design</p>
                    <p>Web Development</p>
                    <p>Data Visualization</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Main Content */}
            <div className="space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="headline-medium mb-4">Kang Graphic</h2>
                <div className="text-newspaper newspaper-column-3">
                  <p>
                    저는 시각 디자인과 리서치를 기반으로 작업하는 그래픽 디자이너입니다. 특히 기후변화, 지정학, 그리고 영토성과 같은 복잡한 주제를 시각적으로 풀어내는 것에 관심이 있습니다.
                  </p>
                  <p>
                    제 작업은 주로 디자인 리서치, 데이터 시각화, 그리고 편집 디자인을 중심으로 진행됩니다. 작은 섬나라들의 기후위기 대응 전략, 디지털 국가의 출현, 그리고 영토 없는 국가의 가능성 등을 탐구하며, 이를 통해 새로운 형태의 국가와 주권에 대해 질문합니다.
                  </p>
                  <p>
                    디자인은 단순히 아름다운 것을 만드는 것이 아니라, 복잡한 세계를 이해하고 전달하는 도구라고 믿습니다. 이를 위해 저는 항상 리서치를 기반으로 한 디자인을 추구하며, 데이터와 내러티브를 결합하여 의미 있는 시각적 경험을 만들어내고자 합니다.
                  </p>
                </div>
              </section>

              {/* Experience */}
              <section className="divider-horizontal pt-8">
                <h2 className="headline-medium mb-6">Experience</h2>
                <div className="space-y-6">
                  <article className="divider-horizontal pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="headline-small">Independent Design Studio</h3>
                        <p className="font-gothic">Founder & Creative Director</p>
                      </div>
                      <span className="caption">2023 — Present</span>
                    </div>
                    <p className="text-newspaper mt-2">
                      기후변화, 지정학, 영토성을 주제로 한 디자인 리서치 프로젝트 진행.
                      투발루, 키리바시, 마셜제도 등 태평양 도서국의 기후 대응 전략 시각화.
                    </p>
                  </article>

                  <article className="divider-horizontal pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="headline-small">Design Research Lab</h3>
                        <p className="font-gothic">Research Designer</p>
                      </div>
                      <span className="caption">2021 — 2023</span>
                    </div>
                    <p className="text-newspaper mt-2">
                      데이터 시각화 및 인터랙티브 디자인 프로젝트 참여.
                      기후 데이터, 이주 패턴, 해양 경계 변화 등을 시각화하는 작업 수행.
                    </p>
                  </article>

                  <article className="divider-horizontal pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="headline-small">Editorial Design Studio</h3>
                        <p className="font-gothic">Graphic Designer</p>
                      </div>
                      <span className="caption">2019 — 2021</span>
                    </div>
                    <p className="text-newspaper mt-2">
                      출판물 디자인, 브랜딩, 타이포그래피 작업.
                      문화예술 기관 및 비영리 단체의 비주얼 아이덴티티 개발.
                    </p>
                  </article>
                </div>
              </section>

              {/* Education */}
              <section className="divider-horizontal pt-8">
                <h2 className="headline-medium mb-6">Education</h2>
                <div className="space-y-4">
                  <article>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="headline-small">MFA in Design</h3>
                        <p className="font-gothic">Seoul National University</p>
                      </div>
                      <span className="caption">2021</span>
                    </div>
                  </article>

                  <article>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="headline-small">BFA in Visual Communication</h3>
                        <p className="font-gothic">Hongik University</p>
                      </div>
                      <span className="caption">2019</span>
                    </div>
                  </article>
                </div>
              </section>

              {/* Awards */}
              <section className="divider-horizontal pt-8">
                <h2 className="headline-medium mb-6">Awards & Recognition</h2>
                <div className="text-newspaper newspaper-column-2">
                  <ul className="space-y-2 list-none">
                    <li>· Red Dot Design Award, Communication Design (2024)</li>
                    <li>· Tokyo Type Directors Club Annual Awards (2023)</li>
                    <li>· Korea Design Award, Editorial Design (2023)</li>
                    <li>· JAGDA New Designer Award (2022)</li>
                    <li>· Seoul Design Festival, Best Project (2022)</li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
