import loans from "@/content/shikoku.json";
import AreaComparePage from "@/components/AreaComparePage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/cardloan/shikoku/", {
  title: "四国のカードローン比較",
  description:
    "四国（徳島・香川・愛媛・高知）の地方銀行7行のカードローンを、金利・限度額・エリアで比較します。",
});

export default function ShikokuPage() {
  return (
    <AreaComparePage
      regionName="四国"
      introText="徳島・香川・愛媛・高知の地方銀行7行を、公式サイトの情報だけでまとめました。"
      leadText="実際に借りられる金利や限度額は、各銀行の審査で決まります。徳島大正銀行・香川銀行・高知銀行は同じ保証会社（四国総合信用）を使っています。"
      loans={loans}
      disclaimerNote="審査結果によって金利が決まる商品や、確認中の項目は掲載値が目安です"
    />
  );
}
