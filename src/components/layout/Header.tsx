"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Container } from "./Container";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/log", label: "Log" },
  { href: "/contact", label: "Contact" },
];

const TARGET_SEQUENCE = ["k", "m"];
const MESSAGE_HIDE_MS = 5000;

export function Header() {
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [flip, setFlip] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const bufferRef = useRef<string[]>([]);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 隠しコマンド: K → M の順に押すと、ロゴの「F」がくるっと回って色が付く。
  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
      ) {
        return;
      }

      // 見ているキーは通常の文字キーと矢印キーだけ（Enterやタブなどは無視する）
      const key = event.key.length === 1 || event.key === "ArrowDown" ? event.key.toLowerCase() : null;
      if (!key) return;

      const next = [...bufferRef.current, key].slice(-TARGET_SEQUENCE.length);
      bufferRef.current = next;

      if (next.length === TARGET_SEQUENCE.length && next.every((k, i) => k === TARGET_SEQUENCE[i])) {
        bufferRef.current = [];
        setUnlocked(true);
        setFlip(true);
        setShowMessage(true);
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        hideTimerRef.current = setTimeout(() => setShowMessage(false), MESSAGE_HIDE_MS);
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  return (
    <header className="border-b border-border">
      <Container className="flex items-center justify-between py-5">
        <div className="relative">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-display text-lg font-semibold"
          >
            Shinsuke.
            <span
              onAnimationEnd={() => setFlip(false)}
              className={`inline-block ${unlocked ? "text-accent" : ""} ${
                flip ? "animate-logo-flip" : ""
              }`}
            >
              F
            </span>
          </Link>

          {showMessage && (
            <div
              role="status"
              aria-live="polite"
              className="absolute left-0 top-full z-50 mt-3 w-64 rounded-md border border-border bg-surface p-4 shadow-lg"
            >
              <p className="text-xs leading-relaxed text-muted">
                🐻 熊本県出身の福岡です。隠しコマンド、見つけてくれてありがとうございます。
              </p>
            </div>
          )}
        </div>

        {/* デスクトップ用ナビゲーション（sm以上で表示） */}
        <nav className="hidden items-center gap-10 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium">
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* スマホ用: テーマ切り替え + ハンバーガーボタン（sm未満で表示） */}
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-border text-foreground"
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </Container>

      {/* スマホ用オーバーレイメニュー: 項目を選ぶと自動的に閉じる */}
      {open && (
        <nav className="flex flex-col gap-1 border-t border-border bg-background px-5 py-4 sm:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-sm font-medium hover:bg-surface"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
