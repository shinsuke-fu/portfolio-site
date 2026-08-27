import type { ReactNode } from "react";

// ページの横幅を揃えるための共通ラッパー。
// PCでは左右96px相当（lg:px-24）、スマホでは20px（px-5）に自動で狭まる。
export function Container({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={`mx-auto w-full max-w-[1120px] px-5 sm:px-10 lg:px-24 ${className}`}>
      {children}
    </div>
  );
}
