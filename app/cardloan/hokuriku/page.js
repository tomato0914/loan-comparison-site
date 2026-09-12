import loans from "@/content/hokuriku.json";
import AreaComparePage from "@/components/AreaComparePage";

export const metadata = {
  title: "北陸のカードローン比較",
  description:
    "北陸（富山・石川・福井）の地方銀行4行のカードローンを、金利・限度額・エリアで比較します。",
};

export default function HokurikuPage() {
  return (
    <AreaComparePage
      regionName="北陸"
      introText="富山・石川・福井の地方銀行4行を、公式サイトの情報だけでまとめました。"
      leadText="実際に借りられる金利や限度額は、各行の審査で決まります。"
      loans={loans}
      disclaimerNote="審査結果によって金利が決まる商品や、確認中の項目は掲載値が目安です"
    />
  );
}
