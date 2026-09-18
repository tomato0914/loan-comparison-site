import loans from "@/content/chugoku.json";
import AreaComparePage from "@/components/AreaComparePage";

export const metadata = {
  title: "中国地方のカードローン比較",
  description:
    "中国地方（鳥取・島根・岡山・広島・山口）の地方銀行8行のカードローンを、金利・限度額・エリアで比較します。",
};

export default function ChugokuPage() {
  return (
    <AreaComparePage
      regionName="中国地方"
      introText="鳥取・島根・岡山・広島・山口の地方銀行8行を、公式サイトの情報だけでまとめました。"
      leadText="実際に借りられる金利や限度額は、各銀行の審査で決まります。もみじ銀行・山口銀行は同じYMFGグループで条件がよく似ています。"
      loans={loans}
      disclaimerNote="審査結果によって金利が決まる商品や、確認中の項目は掲載値が目安です"
    />
  );
}
