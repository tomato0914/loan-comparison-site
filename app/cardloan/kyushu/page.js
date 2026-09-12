import loans from "@/content/kyushu.json";
import AreaComparePage from "@/components/AreaComparePage";

export const metadata = {
  title: "九州のカードローン比較",
  description:
    "九州（福岡・佐賀・長崎・熊本・大分・宮崎・鹿児島・沖縄）の地方銀行20行のカードローンを、金利・限度額・エリアで比較します。",
};

export default function KyushuPage() {
  return (
    <AreaComparePage
      regionName="九州"
      introText="福岡・佐賀・長崎・熊本・大分・宮崎・鹿児島・沖縄の地方銀行20行を、公式サイトの情報だけでまとめました。"
      leadText="実際に借りられる金利や限度額は、各行の審査で決まります。福岡・十八親和・熊本の3行は同じFFGグループで、条件が完全に一致しています。"
      loans={loans}
      disclaimerNote="審査結果によって金利が決まる商品や、確認中の項目は掲載値が目安です"
    />
  );
}
