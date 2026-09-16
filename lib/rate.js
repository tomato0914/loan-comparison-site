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
