import { parseRateRange } from "@/lib/rate";
import { bankKana } from "@/lib/bankKana";

export const SORT_OPTIONS = [
  ["kana", "五十音順"],
  ["rateAsc", "金利が低い順"],
  ["rateDesc", "金利が高い順"],
  ["limitDesc", "限度額が大きい順"],
];

const collator = new Intl.Collator("ja");

function parseLimitMax(loan) {
  const limit = loan.specs?.limit;
  if (!limit) return null;
  const matches = [...String(limit).matchAll(/([\d,]+(?:\.\d+)?)万/g)].map((m) =>
    parseFloat(m[1].replace(/,/g, ""))
  );
  return matches.length > 0 ? Math.max(...matches) : null;
}

// 下限金利 → 上限金利の順で比べる。同じ値なら 0。
function compareRate(a, b) {
  return a.min - b.min || a.max - b.max;
}

const SORTERS = {
  kana: {
    key: (loan) => bankKana(loan.bank),
    compare: (a, b) => collator.compare(a, b),
  },
  rateAsc: { key: (loan) => parseRateRange(loan.rate), compare: compareRate },
  // 「低い順」をそのまま逆にした並び
  rateDesc: { key: (loan) => parseRateRange(loan.rate), compare: (a, b) => compareRate(b, a) },
  limitDesc: { key: parseLimitMax, compare: (a, b) => b - a },
};

// 値が読み取れない商品は、どの並び順でも最後に回す。
// 値が同じ商品どうしは、元の掲載順を保つ。
export function sortLoans(loans, sortMode) {
  const sorter = SORTERS[sortMode];
  if (!sorter) return loans;

  return loans
    .map((loan, index) => ({ loan, index, key: sorter.key(loan) }))
    .sort((a, b) => {
      if (a.key === null && b.key === null) return a.index - b.index;
      if (a.key === null) return 1;
      if (b.key === null) return -1;
      return sorter.compare(a.key, b.key) || a.index - b.index;
    })
    .map((entry) => entry.loan);
}
