---
paths:
  - "src/app/**/opengraph-image.tsx"
---

# OGP画像のテキストは英数字のみ

- Satoriの標準フォントは日本語に対応していないため、画像内に表示するテキスト
  （サイト名・作品タイトル・使用技術名など）は意図的に英数字のみに限定している
- 日本語のタグライン・説明文は画像ではなく`og:description`（`generateMetadata`の`description`）
  側で伝える
- 新しく作品を追加する場合も、`opengraph-image.tsx`側の`generateStaticParams`をページ側と
  必ず一致させる
