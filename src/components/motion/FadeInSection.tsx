"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

// 画面内に入ったタイミングでふわっと現れる、スクロール連動のフェードイン演出。
// 一度表示されたらそれ以降は監視をやめる（スクロールで往復するたびに
// 点滅するのを防ぐため）。
export function FadeInSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // rootMarginで画面下端より少し手前を判定ラインにすることで、
      // 「もう画面に入ってました」ではなく「スクロールしたら現れた」と体感しやすくしている
      { threshold: 0.1, rootMargin: "0px 0px -12% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-1000 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
