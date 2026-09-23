export const SITE_NAME = "地方銀行カードローン比較";
// 正式なURLは「wwwなし」。環境変数に www 付きや末尾スラッシュが入っていても、ここでそろえる。
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://zenkoku-cardloan.com")
  .replace(/^(https?:\/\/)www\./, "$1")
  .replace(/\/+$/, "");
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
export const DATA_AS_OF = "2026年9月";
