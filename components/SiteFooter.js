import { DATA_AS_OF } from "@/lib/site";

export default function SiteFooter({ pageTitle }) {
  return (
    <footer>
      <div className="wrap">
        {pageTitle}｜データ確認日：{DATA_AS_OF}・各行公式サイトより
      </div>
    </footer>
  );
}
