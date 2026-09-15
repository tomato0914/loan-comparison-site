import Link from "next/link";
import { DATA_AS_OF } from "@/lib/site";

export default function SiteFooter({ pageTitle }) {
  return (
    <footer>
      <div className="wrap">
        <div>
          {pageTitle}｜データ確認日：{DATA_AS_OF}・各行公式サイトより
        </div>
        <div className="foot-links">
          <Link href="/">トップ</Link>
          <Link href="/about/">このサイトについて</Link>
          <Link href="/privacy/">プライバシーポリシー</Link>
          <Link href="/contact/">お問い合わせ</Link>
        </div>
      </div>
    </footer>
  );
}
