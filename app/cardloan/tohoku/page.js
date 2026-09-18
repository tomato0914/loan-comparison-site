import loans from "@/content/tohoku.json";
import AreaComparePage from "@/components/AreaComparePage";

export const metadata = {
  title: "東北のカードローン比較",
  description:
    "東北（青森・岩手・宮城・秋田・山形・福島）の地方銀行12行のカードローンを、金利・限度額・エリアで比較します。",
};

export default function TohokuPage() {
  return (
    <AreaComparePage
      regionName="東北"
      introText="青森・岩手・宮城・秋田・山形・福島の地方銀行12行を、公式サイトの情報だけでまとめました。"
      leadText="実際に借りられる金利や限度額は、各銀行の審査で決まります。"
      loans={loans}
      disclaimerNote="審査結果によって金利が決まる商品や、確認中の項目は掲載値が目安です"
    />
  );
}
