import loans from "@/content/hokkaido.json";
import AreaComparePage from "@/components/AreaComparePage";

export const metadata = {
  title: "北海道のカードローン比較",
  description:
    "北海道の地方銀行2行のカードローンを、金利・限度額・エリアで比較します。",
};

export default function HokkaidoPage() {
  return (
    <AreaComparePage
      regionName="北海道"
      introText="北海道の地方銀行2行を、公式サイトの情報だけでまとめました。"
      leadText="実際に借りられる金利や限度額は、各銀行の審査で決まります。"
      loans={loans}
    />
  );
}
