import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { DATA_AS_OF } from "@/lib/site";

const CONTACT_EMAIL = "karireco@proton.com";

export const metadata = {
  title: "お問い合わせ",
  description: "当サイトの内容に関するご質問・掲載情報の誤りのご指摘は、こちらからご連絡ください。",
};

export default function ContactPage() {
  return (
    <>
      <div className="wrap">
        <p className="crumb">
          <Link href="/">トップ</Link>
          <span>›</span>
          お問い合わせ
        </p>
      </div>

      <header className="hero">
        <div className="wrap">
          <span className="badge">Contact</span>
          <h1>お問い合わせ</h1>
          <span className="asof">
            <b>データ確認日：{DATA_AS_OF}</b>／各行公式サイトより
          </span>
        </div>
      </header>

      <main>
        <section>
          <div className="wrap article">
            <p>
              当サイトの内容に関するご質問、掲載情報の誤りのご指摘、その他お問い合わせは、下記のメールアドレスよりご連絡ください。
            </p>

            <a className="btn" href={`mailto:${CONTACT_EMAIL}`}>
              <span>{CONTACT_EMAIL}</span>
            </a>

            <p>
              ※
              個別の融資相談や、掲載している金融機関の審査に関するご質問には、当サイトではお答えできません。各金融機関へ直接お問い合わせください。
            </p>
            <p>
              いただいたお問い合わせには、内容を確認のうえ、順次対応いたします。返信までにお時間をいただく場合がございますので、あらかじめご了承ください。
            </p>
          </div>
        </section>
      </main>

      <SiteFooter pageTitle="お問い合わせ" />
    </>
  );
}
