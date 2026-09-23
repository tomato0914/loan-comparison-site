import kansai from "@/content/kansai.json";
import tokai from "@/content/tokai.json";
import tohoku from "@/content/tohoku.json";
import kanto from "@/content/kanto.json";
import hokuriku from "@/content/hokuriku.json";
import hokkaido from "@/content/hokkaido.json";
import kyushu from "@/content/kyushu.json";
import shikoku from "@/content/shikoku.json";
import chugoku from "@/content/chugoku.json";
import AreaComparePage from "@/components/AreaComparePage";
import { pageMetadata } from "@/lib/metadata";

const loans = [
  ...kansai,
  ...tokai,
  ...tohoku,
  ...kanto,
  ...hokuriku,
  ...hokkaido,
  ...kyushu,
  ...shikoku,
  ...chugoku,
].map(({ pref, ...loan }) => loan);

export const metadata = pageMetadata("/cardloan/all/", {
  title: "全国の金利比較",
  description:
    "全国9エリア・96商品の地方銀行カードローンを、最低金利が低い順に一覧比較できます。",
});

export default function AllAreasPage() {
  return (
    <AreaComparePage
      regionName="全国"
      introText="全国9エリア・96商品を、エリアで区切らずまとめて比較できます。"
      leadText="実際に借りられる金利や限度額は、各銀行の審査で決まります。はじめは最低金利が低い順に並んでいます。"
      loans={loans}
      defaultSort="rateAsc"
      disclaimerNote="変動金利の商品や、審査結果によって金利が決まる商品は、掲載値が目安です"
    />
  );
}
