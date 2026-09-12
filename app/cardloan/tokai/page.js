import loans from "@/content/tokai.json";
import SiteFooter from "@/components/SiteFooter";
import Disclaimer from "@/components/Disclaimer";
import { DATA_AS_OF } from "@/lib/site";

export const metadata = {
  title: "東海のカードローン比較",
  description:
    "東海（静岡・岐阜・愛知・三重）の地方銀行10行・13商品のカードローンを、金利・限度額・エリアで比較します。",
};

function groupByPref(items) {
  const groups = [];
  for (const item of items) {
    let group = groups.find((g) => g.pref === item.pref);
    if (!group) {
      group = { pref: item.pref, slug: prefSlug(item.pref), items: [] };
      groups.push(group);
    }
    group.items.push(item);
  }
  return groups;
}

function prefSlug(pref) {
  const map = {
    静岡県: "shizuoka",
    岐阜県: "gifu",
    愛知県: "aichi",
    三重県: "mie",
  };
  return map[pref] || pref;
}

export default function TokaiPage() {
  const groups = groupByPref(loans);

  return (
    <>
      <header className="hero">
        <div className="wrap">
          <span className="badge">東海の地方銀行カードローン</span>
          <h1>
            東海のカードローンを、<br />
            <span className="mark">公式データだけ</span>で比べる。
          </h1>
          <p>静岡・岐阜・愛知・三重の地方銀行10行を、公式サイトの情報だけでまとめました。</p>
          <span className="asof">
            <b>データ確認日：{DATA_AS_OF}</b>／各行公式サイトより
          </span>
        </div>
      </header>

      <main>
        <section>
          <div className="wrap">
            <p className="eyebrow">Compare</p>
            <h2 className="head">カードローンをくらべる</h2>
            <p className="lead">実際に借りられる金利や限度額は、各行の審査で決まります。</p>

            <div className="pref-nav">
              {groups.map((group) => (
                <a key={group.slug} href={`#${group.slug}`}>
                  {group.pref}（{group.items.length}商品）
                </a>
              ))}
            </div>

            {groups.map((group) => (
              <div className="pref-group" id={group.slug} key={group.slug}>
                <h3>{group.pref}</h3>
                <div className="cards">
                  {group.items.map((loan, i) => (
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
                      <a
                        className="btn"
                        href={loan.officialUrl}
                        target="_blank"
                        rel="noopener"
                      >
                        公式ページを見る
                      </a>
                      {loan.note && <div className="note-inline">{loan.note}</div>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
            <Disclaimer extraNote="変動金利の商品や、審査結果によって金利が決まる商品は、掲載値が目安です" />
          </div>
        </section>
      </main>

      <SiteFooter pageTitle="東海のカードローン比較" />
    </>
  );
}
