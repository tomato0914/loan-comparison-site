import Link from "next/link";

function HomeIcon() {
  return (
    <svg className="crumb-home" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path
        d="M2.5 7.2 8 2.5l5.5 4.7V13a.5.5 0 0 1-.5.5H9.8V10H6.2v3.5H3a.5.5 0 0 1-.5-.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg className="crumb-sep" viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
      <path
        d="m6 3.5 4.5 4.5L6 12.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// トップ › 現在のページ のパンくずリスト
export default function Breadcrumb({ current }) {
  return (
    <div className="wrap">
      <nav className="crumb" aria-label="パンくずリスト">
        <ol>
          <li>
            <Link href="/">
              <HomeIcon />
              トップ
            </Link>
            <ChevronIcon />
          </li>
          <li aria-current="page">{current}</li>
        </ol>
      </nav>
    </div>
  );
}
