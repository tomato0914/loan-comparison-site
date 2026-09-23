// 金利の文字列（例: "1.5%〜14.5%"）を構造化データ用に数値化する。
// 「参考」「約」「審査で決定」など数値として断定できない表記は null を返し、除外する。
export function parseInterestRate(rateStr) {
  const s = String(rateStr).trim().replace(/一律$/, "");

  const single = s.match(/^(\d+(?:\.\d+)?)%$/);
  if (single) {
    return { kind: "single", value: parseFloat(single[1]) };
  }

  const range = s.match(/^(\d+(?:\.\d+)?)%[〜～](\d+(?:\.\d+)?)%$/);
  if (range) {
    return { kind: "range", min: parseFloat(range[1]), max: parseFloat(range[2]) };
  }

  return null;
}

// 並び替え用に、金利の文字列から下限・上限を取り出す。
// 「1.5%〜14.5%」「2.9/7.0/9.8/14.5%」「随時9.0-12.5%／定額7.5-11.0%」などに対応する。
// 「基準金利−最大3.0%」のように実際の金利が読み取れないものは null を返す。
export function parseRateRange(rateStr) {
  const s = String(rateStr);
  if (s.includes("基準金利")) return null;

  // 「100万円以下14.0%」の「100」のような金額の数字は金利ではないので除く
  const withoutAmounts = s.replace(/[\d,]+(?:\.\d+)?万円(?:以下|以上|超|未満|まで)?/g, "");
  const nums = [...withoutAmounts.matchAll(/\d+(?:\.\d+)?/g)].map((m) => parseFloat(m[0]));
  if (nums.length === 0) return null;

  return { min: Math.min(...nums), max: Math.max(...nums) };
}
