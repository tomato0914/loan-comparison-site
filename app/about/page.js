import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { DATA_AS_OF } from "@/lib/site";

export const metadata = {
  title: "このサイトについて",
  description:
    "このサイトの成り立ちや情報の集め方、ご利用にあたっての注意点をご案内します。",
};

const METHOD_ITEMS = [
  {
    n: "1",
    t: "必ず各銀行の公式サイトを直接確認する",
    d: "比較サイトやまとめ記事の情報をそのまま転記するのではなく、各銀行の公式サイト、または公式の商品概要説明書に載っている数字を基本としています。",
  },
  {
    n: "2",
    t: "「いつ時点の情報か」を明記する",
    d: "金利は変わるものです。そのため、各ページに情報を確認した時期を記載し、鵜呑みにせず必ず公式サイトでの最終確認をお願いする形にしています。",
  },
  {
    n: "3",
    t: "情報源が複数ある場合は、内容を突き合わせる",
    d: "1つの情報源だけに頼らず、可能な限り複数の情報を照らし合わせ、食い違いがあれば公式情報を優先しています。",
  },
  {
    n: "4",
    t: "定期的な見直し",
    d: "一度掲載した情報も、時間が経てば古くなります。気づいた範囲で見直しと更新を行っています。",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="wrap">
        <p className="crumb">
          <Link href="/">トップ</Link>
          <span>›</span>
          このサイトについて
        </p>
      </div>

      <header className="hero">
        <div className="wrap">
          <span className="badge">About</span>
          <h1>このサイトについて</h1>
          <span className="asof">
            <b>データ確認日：{DATA_AS_OF}</b>／各行公式サイトより
          </span>
        </div>
      </header>

      <main>
        <section>
          <div className="wrap article">
            <h2>はじめに</h2>
            <p>
              このサイトは、全国の地方銀行が提供するカードローンの情報を、地域ごとにまとめて比較できるようにした個人運営のサイトです。
            </p>
            <p>
              カードローンは、銀行によって金利・限度額・申込条件がさまざまで、比較サイトも数多くあります。しかし調べていくうちに、サイトによって同じ銀行の情報でも数字が違っていたり、情報が古いままになっていたりするケースが少なくないことに気づきました。このサイトは、「まず自分自身が、正確で最新の情報だけを集めてみよう」という思いから始まりました。
            </p>

            <h2>このサイトの作り方</h2>
            <p>このサイトに掲載している情報は、次の方針で集めています。</p>
            <div className="checklist">
              {METHOD_ITEMS.map((item) => (
                <div className="citem" key={item.n}>
                  <div className="chk">{item.n}</div>
                  <div className="body">
                    <span className="t">{item.t}</span>
                    <span className="d">{item.d}</span>
                  </div>
                </div>
              ))}
            </div>

            <h2>運営者について</h2>
            <p>
              このサイトは、個人が趣味・学習の一環として運営しています。金融の専門家ではありませんが、「間違った情報を載せない」ことを最優先に、地道な確認作業を積み重ねています。
            </p>

            <h2>ご利用にあたって</h2>
            <p>
              このサイトは情報提供を目的としており、特定の金融機関やローン商品への申し込みを勧誘するものではありません。実際の金利・限度額・審査結果は、各金融機関の審査によって決まります。ローンのご利用にあたっては、必ずご自身の返済計画をよくご検討のうえ、各金融機関の公式サイトや窓口で最新の情報をご確認ください。
            </p>
            <p>
              内容の正確性には注意を払っておりますが、万一情報に誤りがあった場合は、お問い合わせページよりご連絡いただけますと幸いです。速やかに確認・修正いたします。
            </p>
          </div>
        </section>
      </main>

      <SiteFooter pageTitle="このサイトについて" />
    </>
  );
}
