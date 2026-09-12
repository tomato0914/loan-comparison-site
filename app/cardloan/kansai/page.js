import loans from "@/content/kansai.json";
import AreaComparePage from "@/components/AreaComparePage";

export const metadata = {
  title: "関西のカードローン比較",
  description:
    "関西（滋賀・京都・大阪・兵庫・奈良・和歌山）の地方銀行8行・10商品のカードローンを、金利・限度額・エリアで比較します。",
};

export default function KansaiPage() {
  return (
    <AreaComparePage
      regionName="関西"
      introText="はじめての方にもわかりやすく。金利・限度額・エリアをまとめました。"
      leadText="実際に借りられる金利や限度額は、各行の審査で決まります。"
      loans={loans}
      disclaimerNote="MaxV・紀陽・関西みらい・但馬銀行の金利は変動金利のため、掲載値は目安です"
      checklist={[
        {
          title: "とにかく急ぎたい",
          desc: "口座がなくても申し込めて、契約日に借りられる可能性がある「南都クイックタイプ」。",
        },
        {
          title: "大きく借りて金利を抑えたい",
          desc: "限度額が大きいほど金利が下がる「南都スマート」「京都ダイレクト」「但馬銀行カードローン」。",
        },
        {
          title: "安定収入で低金利がいい",
          desc: "年収400万円以上・勤続2年以上なら、低金利の「MaxV」が候補。",
        },
        {
          title: "お住まいのエリアを確認したい",
          desc: "京都ダイレクト・池田泉州・みなと・但馬銀行は営業エリアが限定されています。申込前に対象エリアかご確認ください。",
        },
      ]}
    />
  );
}
