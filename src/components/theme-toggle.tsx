"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

// サーバーとクライアントで「今どのテーマか」の答えが食い違う（hydrationエラーになる）のを防ぐため、
// 「クライアント側で実際に表示された後かどうか」を useSyncExternalStore で判定する。
// useEffect + setState でやると新しいeslintルール（cascading renderの警告）に引っかかるため、
// この書き方を採用している。
function subscribe() {
  return () => {};
}

function useHasMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true, // クライアントでは true
    () => false // サーバーでは false
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return (
      <div className="h-11 w-11 rounded-md border border-border" aria-hidden="true" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "ライトモードに切り替え" : "ダークモードに切り替え"}
      className="flex h-11 w-11 items-center justify-center rounded-md border border-border text-accent transition-colors hover:bg-surface"
    >
      {isDark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
