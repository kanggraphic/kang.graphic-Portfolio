import NewspaperHeader from "@/components/NewspaperHeader";
import MainContent from "@/components/MainContent";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-[1600px] mx-auto">
        <FadeIn>
          <NewspaperHeader />
        </FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-0 mt-6">
          {/* Left Meta Area */}
          <FadeIn delay={0.1}>
            <div className="divider-vertical pr-6 pb-6 lg:pb-0">
              <div className="space-y-6">
                <div>
                  <p className="caption uppercase tracking-wider">December, 2025</p>
                  <h2 className="headline-small mt-2">INDIE PUBLISHING</h2>
                </div>

                <div className="divider-horizontal pb-6">
                  <p className="caption">WHO DECIDES?</p>
                  <p className="text-newspaper mt-2">
                    2022년 11월 15일, 투발루 정부는 선언을 발표한다. "투발루의 해양 경계는 기후변화의 관계없이 영구적으로 고정된다." 이 선언은 1982년 유엔해양법협약(UNCLOS)에 명시된 "육지가 바다를 지배한다"는 원칙에 이의를 제기하는 것이다.
                  </p>
                </div>

                <div className="side-box">
                  <h3 className="font-gothic font-bold text-sm mb-2">RISING NATIONS</h3>
                  <div className="space-y-1 text-xs">
                    <p>Present Tuvalu<br/>현재의 투발루</p>
                    <div className="divider-horizontal my-2"></div>
                    <p className="text-newspaper-gray">
                      · 영토 및 조성(陸地)<br/>
                      · 인구 (약 11,204명/2022)<br/>
                      · EEZ (약 749,790 km²)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right Main Area */}
          <FadeIn delay={0.2}>
            <MainContent />
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
