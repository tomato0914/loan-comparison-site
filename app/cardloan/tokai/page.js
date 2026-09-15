import loans from "@/content/tokai.json";
import AreaComparePage from "@/components/AreaComparePage";

export const metadata = {
  title: "東海のカードローン比較",
  description:
    "東海（静岡・岐阜・愛知・三重）の地方銀行10行・14商品のカードローンを、金利・限度額・エリアで比較します。",
};

export default function TokaiPage() {
  return (
    <AreaComparePage
      regionName="東海"
      introText="静岡・岐阜・愛知・三重の地方銀行10行を、公式サイトの情報だけでまとめました。"
      leadText="実際に借りられる金利や限度額は、各行の審査で決まります。"
      loans={loans}
      disclaimerNote="変動金利の商品や、審査結果によって金利が決まる商品は、掲載値が目安です"
    />
  );
}
