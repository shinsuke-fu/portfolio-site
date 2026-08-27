import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { FadeInSection } from "@/components/motion/FadeInSection";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "お問い合わせ・ご連絡先について。",
};

export default function ContactPage() {
  return (
    <div className="flex flex-1 flex-col">
      <FadeInSection>
        <Container className="flex flex-col gap-4 py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">Contact</p>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">お問い合わせ</h1>
        </Container>
      </FadeInSection>

      <FadeInSection>
        <Container className="flex flex-col gap-8 pb-24">
          <div className="flex flex-col gap-3 rounded-md border border-border bg-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">準備中</p>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              お問い合わせフォームは今後追加予定です。それまでは、下記のGitHub・X・メールから直接ご連絡ください。
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-foreground px-6 py-2.5 text-xs font-semibold"
            >
              GitHub
            </a>
            <a
              href={siteConfig.xUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-foreground px-6 py-2.5 text-xs font-semibold"
            >
              X
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="rounded border border-foreground px-6 py-2.5 text-xs font-semibold"
            >
              Mail
            </a>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            将来的には地元・熊本を拠点に生活できることを目標にしています。熊本での勤務はもちろん、東京の会社でのフルリモートや、近郊都市への部分出社+リモートなど、働き方は柔軟に検討したいと考えています。
          </p>
        </Container>
      </FadeInSection>
    </div>
  );
}
