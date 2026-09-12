import loans from "@/content/kansai.json";
import SiteFooter from "@/components/SiteFooter";
import Disclaimer from "@/components/Disclaimer";
import { DATA_AS_OF } from "@/lib/site";

export const metadata = {
  title: "関西のカードローン比較",
  description:
    "関西（滋賀・京都・大阪・兵庫・奈良・和歌山）の地方銀行8行・10商品のカードローンを、金利・限度額・エリアで比較します。",
};

export default function KansaiPage() {
  return (
    <>
      <header className="hero">
        <div className="wrap">
          <span className="badge">関西の地方銀行カードローン</span>
          <h1>
            関西のカードローンを、<br />
            <span className="mark">公式データだけ</span>で比べる。
          </h1>
          <p>はじめての方にもわかりやすく。金利・限度額・エリアをまとめました。</p>
          <span className="asof">
            <b>データ確認日：{DATA_AS_OF}</b>／各行の公式サイトより
          </span>
        </div>
      </header>

      <main>
        <section>
          <div className="wrap">
            <p className="eyebrow">Compare</p>
            <h2 className="head">カードローンをくらべる</h2>
            <p className="lead">実際に借りられる金利や限度額は、各行の審査で決まります。</p>

            <div className="cards">
              {loans.map((loan, i) => (
                <div className="loan" key={i}>
                  {loan.tags?.length > 0 && (
                    <div className="tags">
                      {loan.tags.map((tag, j) => (
                        <span className={`tag ${tag.type}`} key={j}>
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="bank">{loan.bank}</div>
                  <div className="name">{loan.product}</div>
                  <div className="rateline">
                    <span className="lbl">実質年率</span>
                    <span className="big">{loan.rate}</span>
                    <span className="sub">{loan.rateNote}</span>
                  </div>
                  <div className="specs">
                    <div className="row">
                      <span className="k">限度額</span>
                      <span className="v">{loan.limit}</span>
                    </div>
                    <div className="row">
                      <span className="k">申込年齢</span>
                      <span className="v">{loan.age}</span>
                    </div>
                    <div className="row">
                      <span className="k">申込エリア</span>
                      <span className="v">{loan.area}</span>
                    </div>
                    <div className="row">
                      <span className="k">口座</span>
                      <span className="v">{loan.account}</span>
                    </div>
                  </div>
                  {loan.note && (
                    <p className="lead" style={{ fontSize: "12.5px", marginBottom: 16 }}>
                      ※{loan.note}
                    </p>
                  )}
                  <a
                    className="btn"
                    href={loan.officialUrl}
                    target="_blank"
                    rel="noopener"
                  >
                    公式ページを見る
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band-pale">
          <div className="wrap">
            <p className="eyebrow">How to choose</p>
            <h2 className="head">
              かんたんな<span className="mark">選び方</span>
            </h2>
            <p className="lead">「どれが合う？」の目安です。最終判断はご自身で。</p>

            <div className="checklist">
              <div className="citem">
                <div className="chk">✓</div>
                <div className="body">
                  <span className="t">とにかく急ぎたい</span>
                  <span className="d">
                    口座がなくても申し込めて、契約日に借りられる可能性がある「南都クイックタイプ」。
                  </span>
                </div>
              </div>
              <div className="citem">
                <div className="chk">✓</div>
                <div className="body">
                  <span className="t">大きく借りて金利を抑えたい</span>
                  <span className="d">
                    限度額が大きいほど金利が下がる「南都スマート」「京都ダイレクト」「但馬銀行カードローン」。
                  </span>
                </div>
              </div>
              <div className="citem">
                <div className="chk">✓</div>
                <div className="body">
                  <span className="t">安定収入で低金利がいい</span>
                  <span className="d">
                    年収400万円以上・勤続2年以上なら、低金利の「MaxV」が候補。
                  </span>
                </div>
              </div>
              <div className="citem">
                <div className="chk">✓</div>
                <div className="body">
                  <span className="t">お住まいのエリアを確認したい</span>
                  <span className="d">
                    京都ダイレクト・池田泉州・みなと・但馬銀行は営業エリアが限定されています。申込前に対象エリアかご確認ください。
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="blueband">
          <div className="wrap">
            <h2>金利や条件は、変わることがあります。</h2>
            <p>申し込みの前に、必ず各行の公式サイトで最新の内容をご確認ください。</p>
          </div>
        </div>

        <section>
          <div className="wrap">
            <Disclaimer extraNote="MaxV・紀陽・関西みらい・但馬銀行の金利は変動金利のため、掲載値は目安です" />
          </div>
        </section>
      </main>

      <SiteFooter pageTitle="関西のカードローン比較" />
    </>
  );
}
