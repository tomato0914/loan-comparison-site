import "./globals.css";
import Script from "next/script";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL, GA_ID } from "@/lib/site";

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "ja",
    },
    {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  ],
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}｜エリアから探す`,
    template: `%s｜${SITE_NAME}`,
  },
  description:
    "全国の地方銀行が出すカードローンを、公式サイトの情報だけで地域ごとにまとめた比較サイトです。",
  verification: {
    // Search Console の HTMLタグ確認コードをここに入れる
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <JsonLd data={siteJsonLd} />
        {children}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
