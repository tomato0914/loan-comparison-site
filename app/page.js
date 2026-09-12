import Link from "next/link";
import regions from "@/content/regions.json";
import SiteFooter from "@/components/SiteFooter";
import Disclaimer from "@/components/Disclaimer";
import { DATA_AS_OF } from "@/lib/site";

export const metadata = {
  title: "エリアから探す",
};

export default function TopPage() {
  const liveCount = regions.filter((r) => r.status === "live").length;

  return (
    <>
      <header className="hero">
        <div className="wrap">
          <h1>
            地方銀行の<span className="mark">カードローン</span>を、<br />
            エリアから比べる。
          </h1>
          <p>
            全国の地方銀行が出すカードローンを、公式サイトの情報だけで地域ごとにまとめています。お住まいのエリアを選んでください。
          </p>
          <span className="asof">
            <b>データ確認日：{DATA_AS_OF}</b>／各行公式サイトより
          </span>
        </div>
      </header>

      <main>
        <section>
          <div className="wrap">
            <p className="eyebrow">Areas</p>
            <h2 className="head">エリアを選ぶ</h2>
            <p className="lead">
              現在{liveCount}エリアが公開中です。他のエリアは準備中です。公開までしばらくお待ちください。
            </p>

            <div className="region-grid">
              {regions.map((region) => {
                const isLive = region.status === "live";
                const content = (
                  <>
                    <span className="status">{isLive ? "公開中" : "準備中"}</span>
                    <div className="pref">{region.pref}</div>
                    <div className="name">{region.name}</div>
                    <div className="count">{region.count}</div>
                    {isLive && <div className="go">比較を見る</div>}
                  </>
                );

                if (isLive) {
                  return (
                    <Link
                      key={region.slug}
                      className="region live"
                      href={`/cardloan/${region.slug}/`}
                    >
                      {content}
                    </Link>
                  );
                }

                return (
                  <div key={region.slug} className="region soon">
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="band-pale">
          <div className="wrap">
            <p className="eyebrow">About</p>
            <h2 className="head">このサイトについて</h2>
            <p className="lead" style={{ marginBottom: 0 }}>
              各行の公式サイトに掲載されている情報だけをもとに、金利・限度額・申込条件をまとめています。
              情報は確認した時点のものです。実際にお申し込みの際は、必ず各行の公式サイトで最新の内容をご確認ください。
            </p>
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
            <Disclaimer />
          </div>
        </section>
      </main>

      <SiteFooter pageTitle="地方銀行カードローン比較" />
    </>
  );
}
