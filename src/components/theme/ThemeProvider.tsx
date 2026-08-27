"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

// next-themes をこのアプリ用に初期化するだけの薄いラッパー。
// attribute="class" にすることで、<html class="dark"> が付いたり外れたりする形になり、
// globals.css の `.dark { ... }` がそのまま効く。
// disableTransitionOnChange は付けない（＝切り替え時のふわっとしたアニメーションを
// globals.css 側のtransition指定でそのまま効かせるため）。
// defaultTheme="light" にすることで、初回訪問時（まだ手動で切り替えたことが無い状態）は
// OSのダーク/ライト設定に関わらず常にライトモードで表示する。ヘッダーのボタンは
// あくまで「ライト⇔ダークの手動切り替え」のみで、「システム設定に合わせる」という
// 選択肢自体を出していないため、enableSystemも付けていない。
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" {...props}>
      {children}
    </NextThemesProvider>
  );
}
