# ローン比較サイト

地方銀行のカードローンをエリアごとに比較するサイトです。Next.js（App Router）で作られています。

## 使い方

```bash
npm install
npm run dev
```

`http://localhost:3000` で確認できます。

## フォルダ構成

- `app/` … ページ本体（トップページ、`/cardloan/kansai/` など）
- `content/` … 各エリアの商品データ（JSON）。新しいエリアはここにファイルを追加していく
- `components/` … フッターや免責文などの共通パーツ
- `lib/site.js` … サイト共通の設定（サイトURL・GA IDなど）
- `docs/` … 引き継ぎ書・デザイン見本HTMLなど（参考資料。ビルドには使わない）

## 環境変数

`.env.example` を `.env.local` にコピーして値を入れてください（ドメイン・GA・Search Console確認コードなど）。

## デプロイ

Vercelにこのリポジトリを接続してください。
