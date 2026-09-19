"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";
import Disclaimer from "@/components/Disclaimer";
import JsonLd from "@/components/JsonLd";
import { DATA_AS_OF, SITE_URL } from "@/lib/site";
import { prefSlug } from "@/lib/prefectures";
import { parseInterestRate } from "@/lib/rate";

function hasTagLabel(loan, label) {
  return loan.tags?.some((tag) => tag.label === label) ?? false;
}

function parseRateMin(rateStr) {
  const matches = [...String(rateStr).matchAll(/(\d+(?:\.\d+)?)%/g)].map((m) =>
    parseFloat(m[1])
  );
  return matches.length > 0 ? Math.min(...matches) : null;
}

const SPEC_FIELDS = [
  ["limit", "限度額"],
  ["age", "申込年齢"],
  ["area", "申込エリア"],
  ["account", "口座"],
  ["guarantee", "保証会社"],
  ["webComplete", "Web完結"],
  ["speed", "融資スピード"],
  ["contract", "契約期間"],
];

function parseLimitMax(loan) {
  const limit = loan.specs?.limit;
  if (!limit) return null;
  const matches = [...String(limit).matchAll(/([\d,]+(?:\.\d+)?)万/g)].map((m) =>
    parseFloat(m[1].replace(/,/g, ""))
  );
  return matches.length > 0 ? Math.max(...matches) : null;
}

function sortLoans(loans, sortMode) {
  if (sortMode === "none") return loans;

  const keyFn =
    sortMode === "limitDesc" ? parseLimitMax : (loan) => parseRateMin(loan.rate);

  return [...loans]
    .map((loan, index) => ({ loan, index, key: keyFn(loan) }))
    .sort((a, b) => {
      if (a.key === null && b.key === null) return a.index - b.index;
      if (a.key === null) return 1;
      if (b.key === null) return -1;
      return sortMode === "rateAsc" ? a.key - b.key : b.key - a.key;
    })
    .map((entry) => entry.loan);
}

function LoanCard({ loan }) {
  return (
    <div className="loan">
      {loan.tags?.length > 0 && (
        <div className="tags">
          {loan.tags.map((tag, j) => (
            <span className={`tag ${tag.type}`} key={j}>
              {tag.label}
            </span>
          ))}
        </div>
      )}
      <div className="bank">{loan.bank}</div>
      <div className="name">{loan.product}</div>
      <div className="rateline">
        <span className="lbl">実質年率</span>
        <span className="big">{loan.rate}</span>
        <span className="sub">{loan.rateNote}</span>
      </div>
      <div className="specs">
        {SPEC_FIELDS.map(([key, label]) => (
          <div className="row" key={key}>
            <span className="k">{label}</span>
            <span className="v">{loan.specs[key] || "記載なし"}</span>
          </div>
        ))}
      </div>
      <a className="btn" href={loan.officialUrl} target="_blank" rel="noopener">
        <span>
          {loan.linkLabel || "公式ページを見る"}
          <span className="ext-icon" aria-hidden="true">
            ↗
          </span>
        </span>
      </a>
      {loan.note && <div className="note-inline">{loan.note}</div>}
    </div>
  );
}

function buildBreadcrumbJsonLd(regionName, pathname) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "トップ", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: regionName,
        item: `${SITE_URL}${pathname}`,
      },
    ],
  };
}

function buildProductsJsonLd(loans) {
  const items = loans
    .map((loan) => {
      const rate = parseInterestRate(loan.rate);
      if (!rate) return null;

      const interestRate =
        rate.kind === "single"
          ? rate.value
          : {
              "@type": "QuantitativeValue",
              minValue: rate.min,
              maxValue: rate.max,
              unitText: "percent",
            };

      return {
        "@type": "FinancialProduct",
        name: loan.product,
        provider: { "@type": "BankOrCreditUnion", name: loan.bank },
        interestRate,
        url: loan.officialUrl,
      };
    })
    .filter(Boolean);

  if (items.length === 0) return null;

  return { "@context": "https://schema.org", "@graph": items };
}

function groupByPref(loans) {
  const groups = [];
  for (const loan of loans) {
    let group = groups.find((g) => g.pref === loan.pref);
    if (!group) {
      group = { pref: loan.pref, slug: prefSlug(loan.pref), items: [] };
      groups.push(group);
    }
    group.items.push(loan);
  }
  return groups;
}

export default function AreaComparePage({
  regionName,
  introText,
  leadText,
  loans,
  disclaimerNote,
  checklist,
  defaultSort = "none",
}) {
  const [sortMode, setSortMode] = useState(defaultSort);
  const [accountFreeOnly, setAccountFreeOnly] = useState(false);
  const [nationwideOnly, setNationwideOnly] = useState(false);
  const [controlsOpen, setControlsOpen] = useState(true);
  const pathname = usePathname();

  const breadcrumbJsonLd = useMemo(
    () => buildBreadcrumbJsonLd(regionName, pathname),
    [regionName, pathname]
  );
  const productsJsonLd = useMemo(() => buildProductsJsonLd(loans), [loans]);

  const grouped = loans.some((loan) => loan.pref);

  const filteredLoans = useMemo(() => {
    return loans.filter((loan) => {
      if (accountFreeOnly && !hasTagLabel(loan, "口座不要")) return false;
      if (nationwideOnly && !hasTagLabel(loan, "全国対応")) return false;
      return true;
    });
  }, [loans, accountFreeOnly, nationwideOnly]);

  const groups = useMemo(() => {
    if (!grouped) return null;
    return groupByPref(filteredLoans).map((group) => ({
      ...group,
      items: sortLoans(group.items, sortMode),
    }));
  }, [grouped, filteredLoans, sortMode]);

  const flatLoans = useMemo(() => {
    if (grouped) return null;
    return sortLoans(filteredLoans, sortMode);
  }, [grouped, filteredLoans, sortMode]);

  const noResults = filteredLoans.length === 0;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      {productsJsonLd && <JsonLd data={productsJsonLd} />}

      <div className="wrap">
        <p className="crumb">
          <Link href="/">トップ</Link>
          <span>›</span>
          {regionName}
        </p>
      </div>

      <header className="hero">
        <div className="wrap">
          <span className="badge">{regionName}の地方銀行カードローン</span>
          <h1>
            {regionName}のカードローンを、<br />
            <span className="mark">公式データだけ</span>で比べる。
          </h1>
          <p>{introText}</p>
          <span className="asof">
            <b>データ確認日：{DATA_AS_OF}</b>／各銀行公式サイトより
          </span>
        </div>
      </header>

      <main>
        <section>
          <div className="wrap">
            <p className="eyebrow">Compare</p>
            <h2 className="head">カードローンをくらべる</h2>
            <p className="lead">{leadText}</p>
          </div>
        </section>

        <div className="sticky-bar">
          <div className="wrap sticky-bar-inner">
            <div className="sticky-row">
              {grouped && !noResults && (
                <div className="pref-nav">
                  {groups
                    .filter((group) => group.items.length > 0)
                    .map((group) => (
                      <a key={group.slug} href={`#${group.slug}`}>
                        {group.pref}（{group.items.length}商品）
                      </a>
                    ))}
                </div>
              )}
              <button
                type="button"
                className="controls-toggle"
                aria-expanded={controlsOpen}
                onClick={() => setControlsOpen((open) => !open)}
              >
                並び替え・絞り込み {controlsOpen ? "▲" : "▼"}
              </button>
            </div>

            {controlsOpen && (
              <div className="controls">
                <div className="control-group">
                  <label htmlFor="sort-select" className="control-label">
                    並び替え
                  </label>
                  <select
                    id="sort-select"
                    value={sortMode}
                    onChange={(e) => setSortMode(e.target.value)}
                  >
                    <option value="none">おすすめ順（掲載順）</option>
                    <option value="rateAsc">金利が低い順</option>
                    <option value="rateDesc">金利が高い順</option>
                    <option value="limitDesc">限度額が大きい順</option>
                  </select>
                </div>

                <div className="control-group filters">
                  <span className="control-label">絞り込み</span>
                  <label className="filter-toggle">
                    <input
                      type="checkbox"
                      checked={accountFreeOnly}
                      onChange={(e) => setAccountFreeOnly(e.target.checked)}
                    />
                    口座不要のみ
                  </label>
                  <label className="filter-toggle">
                    <input
                      type="checkbox"
                      checked={nationwideOnly}
                      onChange={(e) => setNationwideOnly(e.target.checked)}
                    />
                    全国対応のみ
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        <section>
          <div className="wrap">
            {noResults ? (
              <p className="lead">条件に合う商品が見つかりませんでした。絞り込みを変えてお試しください。</p>
            ) : grouped ? (
              <>
                {groups
                  .filter((group) => group.items.length > 0)
                  .map((group) => (
                    <div className="pref-group" id={group.slug} key={group.slug}>
                      <h3>{group.pref}</h3>
                      <div className="cards">
                        {group.items.map((loan, i) => (
                          <LoanCard loan={loan} key={i} />
                        ))}
                      </div>
                    </div>
                  ))}
              </>
            ) : (
              <div className="cards">
                {flatLoans.map((loan, i) => (
                  <LoanCard loan={loan} key={i} />
                ))}
              </div>
            )}
          </div>
        </section>

        {checklist?.length > 0 && (
          <section className="band-pale">
            <div className="wrap">
              <p className="eyebrow">How to choose</p>
              <h2 className="head">
                かんたんな<span className="mark">選び方</span>
              </h2>
              <p className="lead">「どれが合う？」の目安です。最終判断はご自身で。</p>

              <div className="checklist">
                {checklist.map((item, i) => (
                  <div className="citem" key={i}>
                    <div className="chk">✓</div>
                    <div className="body">
                      <span className="t">{item.title}</span>
                      <span className="d">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="blueband">
          <div className="wrap">
            <h2>金利や条件は、変わることがあります。</h2>
          </div>
        </div>

        <section>
          <div className="wrap">
            <Disclaimer extraNote={disclaimerNote} />
          </div>
        </section>
      </main>

      <SiteFooter pageTitle={`${regionName}のカードローン比較`} />
    </>
  );
}
