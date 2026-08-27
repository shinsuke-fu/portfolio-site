"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

// next-themes をこのアプリ用に初期化するだけの薄いラッパー。
// attribute="class" にすることで、<html class="dark"> が付いたり外れたりする形になり、
// globals.css の `.dark { ... }` がそのまま効く。
// disableTransitionOnChange は付けない（＝切り替え時のふわっとしたアニメーションを
// globals.css 側のtransition指定でそのまま効かせるため）。
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem {...props}>
      {children}
    </NextThemesProvider>
  );
}
