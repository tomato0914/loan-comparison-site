import Link from "next/link";
import regions from "@/content/regions.json";
import SiteFooter from "@/components/SiteFooter";
import Disclaimer from "@/components/Disclaimer";
import { DATA_AS_OF, SITE_NAME } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/", {
  title: { absolute: `${SITE_NAME}｜全国9エリアから探す` },
});

export default function TopPage() {
  return (
    <>
      <header className="hero">
        <div className="wrap">
          <h1>
            地方銀行の<span className="mark">カードローン</span>を
            <br />
            エリア別にまとめています。
          </h1>
          <p>
            全国の地方銀行のカードローンを公式サイトの情報を元に地域ごとにまとめています。
          </p>
          <span className="asof">
            <b>データ確認日：{DATA_AS_OF}</b>／各銀行公式サイトより
          </span>
          <div className="hero-actions">
            <Link className="btn" href="#areas">
              エリアを見る
            </Link>
            <Link className="btn" href="/cardloan/all/">
              金利で比較する
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section id="areas">
          <div className="wrap">
            <p className="eyebrow">Area</p>
            <h2 className="head">エリアを選ぶ</h2>

            <div className="region-grid">
              {regions.map((region) => {
                const isLive = region.status === "live";
                const content = (
                  <>
                    {!isLive && (
                      <div className="region-top">
                        <span className="status">準備中</span>
                      </div>
                    )}
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
            <p className="lead">
              各銀行の公式サイトに掲載されている情報を元に情報をまとめています。
              情報は確認した時点のものです。
            </p>
            <p className="lead" style={{ marginBottom: 0 }}>
              <Link href="/about/">このサイトについて、詳しくはこちら →</Link>
            </p>
          </div>
        </section>

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
