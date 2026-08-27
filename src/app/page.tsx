import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { FadeInSection } from "@/components/motion/FadeInSection";
import { ProjectCard } from "@/components/project/ProjectCard";
import { TechBadge } from "@/components/project/TechBadge";
import { siteConfig } from "@/lib/site-config";
import { getAllTechnologies, getFeaturedProjects } from "@/lib/projects";
import type { TechCategory } from "@/types/project";

const CATEGORY_LABELS: Record<TechCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  tools: "Tools",
  infrastructure: "Infrastructure",
  other: "Other",
};

// Skillsセクションで表示する順番。技術的な深さが伝わるよう、フロントエンド→バックエンド
// →データベース→ツール/インフラの順に並べる。
const CATEGORY_ORDER: TechCategory[] = [
  "frontend",
  "backend",
  "database",
  "tools",
  "infrastructure",
  "other",
];

export default async function Home() {
  const [featuredProjects, technologiesByCategory] = await Promise.all([
    getFeaturedProjects(),
    getAllTechnologies(),
  ]);

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <FadeInSection>
        <Container className="flex flex-col gap-7 py-24 sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
            Frontend Developer
          </p>
          <h1 className="max-w-3xl font-display text-3xl font-semibold leading-tight sm:text-5xl">
            つくりながら学び、拡張し続けるエンジニア。
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            React / TypeScript を軸にフロントエンドを構築しながら、Supabase
            を使ったバックエンド実装にも取り組んできました。将来的にはフルスタックエンジニアとして、扱える領域を少しずつ広げていきたいと考えています。
          </p>
          <div className="mt-1 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/projects"
              className="flex items-center justify-center rounded px-7 py-3.5 text-sm font-semibold bg-accent text-accent-foreground sm:inline-flex"
            >
              作品を見る
            </Link>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded border border-foreground px-7 py-3.5 text-sm font-semibold sm:inline-flex"
            >
              GitHub
            </a>
          </div>
        </Container>
      </FadeInSection>

      {/* Featured Project */}
      {featuredProjects.length > 0 && (
        <FadeInSection>
          <Container className="flex flex-col gap-8 pb-20">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                Featured Project
              </p>
              <h2 className="font-display text-2xl font-semibold">代表作品</h2>
            </div>
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} variant="featured" />
            ))}
          </Container>
        </FadeInSection>
      )}

      {/* Tech Stack */}
      <FadeInSection>
        <Container className="flex flex-col gap-8 pb-28">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              Tech Stack
            </p>
            <h2 className="font-display text-2xl font-semibold">使用技術</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {CATEGORY_ORDER.filter((category) => technologiesByCategory[category].length > 0).map(
              (category) => (
                <div key={category} className="flex flex-col gap-3">
                  <p className="text-sm font-semibold">{CATEGORY_LABELS[category]}</p>
                  <div className="flex flex-wrap gap-2">
                    {technologiesByCategory[category].map((tech) => (
                      <TechBadge key={tech.name} name={tech.name} category={tech.category} />
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </Container>
      </FadeInSection>
    </div>
  );
}
