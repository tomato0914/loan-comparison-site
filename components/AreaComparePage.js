import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import Disclaimer from "@/components/Disclaimer";
import { DATA_AS_OF } from "@/lib/site";
import { prefSlug } from "@/lib/prefectures";

function LoanCard({ loan }) {
  return (
    <div className="loan">
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
        {loan.specs.map((spec, i) => (
          <div className="row" key={i}>
            <span className="k">{spec.k}</span>
            <span className="v">{spec.v}</span>
          </div>
        ))}
      </div>
      <a className="btn" href={loan.officialUrl} target="_blank" rel="noopener">
        {loan.linkLabel || "公式ページを見る"}
      </a>
      {loan.note && <div className="note-inline">{loan.note}</div>}
    </div>
  );
}

function groupByPref(loans) {
  const groups = [];
  for (const loan of loans) {
    let group = groups.find((g) => g.pref === loan.pref);
    if (!group) {
      group = { pref: loan.pref, slug: prefSlug(loan.pref), items: [] };
      groups.push(group);
    }
    group.items.push(loan);
  }
  return groups;
}

export default function AreaComparePage({
  regionName,
  introText,
  leadText,
  loans,
  disclaimerNote,
  checklist,
}) {
  const grouped = loans.some((loan) => loan.pref);
  const groups = grouped ? groupByPref(loans) : null;

  return (
    <>
      <div className="breadcrumb">
        <div className="wrap">
          <Link href="/">← トップページ</Link>
        </div>
      </div>

      <header className="hero">
        <div className="wrap">
          <span className="badge">{regionName}の地方銀行カードローン</span>
          <h1>
            {regionName}のカードローンを、<br />
            <span className="mark">公式データだけ</span>で比べる。
          </h1>
          <p>{introText}</p>
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
            <p className="lead">{leadText}</p>

            {grouped ? (
              <>
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
                        <LoanCard loan={loan} key={i} />
                      ))}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="cards">
                {loans.map((loan, i) => (
                  <LoanCard loan={loan} key={i} />
                ))}
              </div>
            )}
          </div>
        </section>

        {checklist?.length > 0 && (
          <section className="band-pale">
            <div className="wrap">
              <p className="eyebrow">How to choose</p>
              <h2 className="head">
                かんたんな<span className="mark">選び方</span>
              </h2>
              <p className="lead">「どれが合う？」の目安です。最終判断はご自身で。</p>

              <div className="checklist">
                {checklist.map((item, i) => (
                  <div className="citem" key={i}>
                    <div className="chk">✓</div>
                    <div className="body">
                      <span className="t">{item.title}</span>
                      <span className="d">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="blueband">
          <div className="wrap">
            <h2>金利や条件は、変わることがあります。</h2>
            <p>申し込みの前に、必ず各行の公式サイトで最新の内容をご確認ください。</p>
          </div>
        </div>

        <section>
          <div className="wrap">
            <Disclaimer extraNote={disclaimerNote} />
          </div>
        </section>
      </main>

      <SiteFooter pageTitle={`${regionName}のカードローン比較`} />
    </>
  );
}
