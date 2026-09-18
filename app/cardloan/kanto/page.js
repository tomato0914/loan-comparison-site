import loans from "@/content/kanto.json";
import AreaComparePage from "@/components/AreaComparePage";

export const metadata = {
  title: "関東のカードローン比較",
  description:
    "関東（群馬・栃木・茨城・埼玉・千葉・東京・神奈川）の地方銀行16行のカードローンを、金利・限度額・エリアで比較します。",
};

export default function KantoPage() {
  return (
    <AreaComparePage
      regionName="関東"
      introText="群馬・栃木・茨城・埼玉・千葉・東京・神奈川の地方銀行16行を、公式サイトの情報だけでまとめました。"
      leadText="実際に借りられる金利や限度額は、各銀行の審査で決まります。"
      loans={loans}
      disclaimerNote="審査結果によって金利が決まる商品や、確認中の項目は掲載値が目安です"
    />
  );
}
