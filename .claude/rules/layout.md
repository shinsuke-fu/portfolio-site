---
paths:
  - "src/app/layout.tsx"
---

# layout.tsx を触るときの事故防止

- このクラウド作業環境はGoogle Fontsに到達できないため、コード変更の検証中は`layout.tsx`を
  一時的にフォント無しスタブ（`next/font/google`を使わないバージョン）に差し替えて
  `npm run build`を確認している（`CLAUDE.md`の検証儀式を参照）
- **検証作業の最中でなければ、`layout.tsx`は必ず`next/font/google`（`Space_Grotesk`・`Work_Sans`）の
  importを含んでいること。** スタブ版のまま`SendUserFile`・`device_commit_files`をしない
- 検証の最後に、本物の`layout.tsx`が復元されていることを`Read`で確認してから完了とする
  （バックアップは`/tmp/layout.tsx.real-current`などに退避してから作業する）
