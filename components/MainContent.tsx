export default function MainContent() {
  return (
    <div className="pl-0 lg:pl-6">
      {/* Chapter Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="caption uppercase">Territory in Flux</span>
          <span className="caption">(땅은는 흐른다)</span>
          <span className="caption">2025</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="caption uppercase">Design Research</span>
          <span className="caption">탈제국기가 서울북부시구 대한민국</span>
          <span className="caption uppercase font-bold">CHAPTER 3</span>
        </div>
      </div>

      {/* Main Headline */}
      <div className="divider-horizontal pb-6 mb-6">
        <h1 className="headline-large mb-4">
          TERRITORY IN FLUX
        </h1>
        <p className="headline-small font-normal">
          영토는 고정되어 있지 않다. 기후변화와 지정학적 협상의 장에서 작은 섬나라들의 주권은 끊임없이 재정의되고 있다.
        </p>
      </div>

      {/* Main Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Article 1 */}
        <div className="divider-horizontal pb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 bg-newspaper-text text-newspaper-bg flex items-center justify-center font-gothic font-bold text-sm">9</span>
            <h3 className="headline-small">WHO DECIDES?</h3>
          </div>
          <div className="text-newspaper space-y-3">
            <p>
              2022년 11월 15일, 투발루 정부는 선언을 발표한다. "투발루의 해양 경계는 기후변화의 관계없이 영구적으로 고정된다." 이 선언은 1982년 유엔해양법협약(UNCLOS)에 명시된 "육지가 바다를 지배한다"는 원칙에 이의를 제기하는 것이다.
            </p>
            <p>
              선언을 통해 투발루는 '기후 난민의 논리'—EEZ가 소멸하면 주권도 소멸한다는 기존의 해석에 저항하며, '획득한 권리 존중 원칙'을 내세운다. 이는 법적으로 획득한 권리는 기후변화에도 불구하고 유지되어야 한다는 주장이다.
            </p>
          </div>
        </div>

        {/* Article 2 */}
        <div className="divider-horizontal pb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 bg-newspaper-text text-newspaper-bg flex items-center justify-center font-gothic font-bold text-sm">10</span>
            <h3 className="headline-small">RISING NATIONS</h3>
          </div>
          <div className="text-newspaper space-y-3">
            <p>
              2022년 COP27에서 투발루, 키리바시, 마셜제도, 나우루 4개국은 "Rising Nations Initiative"를 공식 발표했다. 이들은 모두 이이디(기후위기)가 산호초 섬나라들의 생존 전략으로 제시한다.
            </p>
            <p>
              이들의 전략은 투발루의 '키리바티' 디지털 국가 플랫폼, 마셜제도의 기후 이주 협상 등 다양하게 펼쳐진다. 모든 4개국은 건설적이면서도 생존을 넘어 미래를 위한 협상 테이블에서 새로운 국제법 규범을 만들어가고 있다.
            </p>
            <p className="caption pt-2">
              [Image] First book 2018
            </p>
          </div>
        </div>

        {/* Side Box */}
        <div className="side-box">
          <h3 className="headline-small mb-4">Digital Tuvalu<br/>디지털 투발루</h3>
          <div className="text-newspaper space-y-2 text-sm">
            <p>· 가상세계(메타버스)<br/>· 3D 스캔 됨(디지털 트윈)<br/>· 정부 운영<br/>· 국적 및 여권제 도입<br/>· 토지권 수유역권 증명</p>
            <div className="divider-horizontal my-3"></div>
            <p>· 인구(10,000명)<br/>· 면적: 26㎢ (약 26만평) <br/>· 해발고도 평균 2m<br/>· 바다 위 4.5m 예상<br/>· Post-territorial State<br/>- 영토없는 국가로서의 권리 주장</p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="text-newspaper newspaper-column-2">
          <p className="mb-3">
            투발루의 900,000 km² 바다는 줄어들 위기에—물리적으로가 아니라 법적으로. 2023년 태평양 도서국 포럼(PIF)에서 투발루 외무장관 사이먼 코페는 "우리는 기후변화와 지정학적 협상의 회생자가 되었다. 우리의 바다는 동시에 침수되고 있다"고 선언했다.
          </p>
          <p className="mb-3">
            2025년 현재, 투발루는 "기후변화로 인한 해양 경계 손실 방지 조약"을 호주, 뉴질랜드와 협상 중이다. 그러나 이 조약이 국제적 합의로 이어질지는 불확실하다.
          </p>
          <p>
            투발루는 물리적 영토를 잃어가고 있지만, 디지털 공간에서 새로운 주권을 선언하고 있다. 2023년 투발루는 메타버스에 디지털 국가를 선포했으며, 정부 운영과 시민권을 온라인으로 이전하는 계획을 발표했다.
          </p>
        </div>

        <div className="border border-newspaper-divider aspect-[4/3] flex items-center justify-center bg-newspaper-bg/50">
          <span className="caption">[Image] Map visualization</span>
        </div>
      </div>
    </div>
  );
}
