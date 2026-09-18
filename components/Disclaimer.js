export default function Disclaimer({ extraNote }) {
  return (
    <div className="disclaimer">
      <b>ご利用にあたって</b>
      <br />
      金利・限度額・条件は変わることがあります。最新・正確な情報は、必ず各銀行の公式サイトや窓口でご確認ください。
      本サイトは情報提供が目的で、特定のローンの契約をおすすめするものではありません。実際に適用される金利や限度額などは審査によって決まります。計画的なご利用をおすすめします。
      {extraNote && <>（{extraNote}）</>}
    </div>
  );
}
