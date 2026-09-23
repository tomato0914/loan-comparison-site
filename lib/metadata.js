// 各ページの metadata に、そのページの正式なURL（canonical）を付ける。
// path は "/cardloan/kanto/" のようなサイト内のパス。layout.js の metadataBase（wwwなし）と組み合わせて絶対URLになる。
export function pageMetadata(path, metadata = {}) {
  return {
    ...metadata,
    alternates: { ...metadata.alternates, canonical: path },
  };
}
