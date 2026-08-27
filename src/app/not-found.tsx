import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { FadeInSection } from "@/components/motion/FadeInSection";

export const metadata: Metadata = {
  title: "Not Found",
};

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col">
      <FadeInSection>
        <Container className="flex flex-col items-start gap-8 py-24 sm:py-32">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-thumbnail-bg font-display text-2xl font-semibold text-thumbnail-fg">
            404
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              Not Found
            </p>
            <h1 className="font-display text-2xl font-semibold sm:text-3xl">
              あれ、ここには何もないみたいです
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base">
              リンクが古くなっているか、URLの入力ミスかもしれません。トップページか作品一覧から探してみてください。
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="flex items-center justify-center rounded px-7 py-3.5 text-sm font-semibold bg-accent text-accent-foreground sm:inline-flex"
            >
              トップに戻る
            </Link>
            <Link
              href="/projects"
              className="flex items-center justify-center rounded border border-foreground px-7 py-3.5 text-sm font-semibold sm:inline-flex"
            >
              作品を見る
            </Link>
          </div>
        </Container>
      </FadeInSection>
    </div>
  );
}
