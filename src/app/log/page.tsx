import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { FadeInSection } from "@/components/motion/FadeInSection";
import { getLogEntries } from "@/lib/log";

export const metadata: Metadata = {
  title: "Log",
  description: "このサイト自体を作りながら育ててきた、実装の更新履歴です。",
};

export default async function LogPage() {
  const entries = await getLogEntries();

  return (
    <div className="flex flex-1 flex-col">
      <FadeInSection>
        <Container className="flex flex-col gap-4 py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">Log</p>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">成長ログ</h1>
          <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            このサイト自体も、作りながら育てているプロジェクトです。実装してきた機能を、簡単な更新履歴として公開しています。
          </p>
        </Container>
      </FadeInSection>

      <FadeInSection>
        <Container className="pb-24">
          <ul className="flex flex-col gap-8 border-l-2 border-border pl-6">
            {entries.map((entry) => (
              <li
                key={entry.version}
                className="relative before:absolute before:-left-[29px] before:top-1.5 before:h-2.5 before:w-2.5 before:rounded-full before:bg-accent"
              >
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="font-display text-sm font-semibold text-accent">
                    {entry.version}
                  </span>
                  <h2 className="font-display text-lg font-semibold">{entry.title}</h2>
                  <span className="text-xs text-muted">{entry.date}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  {entry.description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </FadeInSection>
    </div>
  );
}
