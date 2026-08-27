import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { FadeInSection } from "@/components/motion/FadeInSection";
import { TechBadge } from "@/components/project/TechBadge";
import { ChallengeCard } from "@/components/project/ChallengeCard";
import { ArchitectureView } from "@/components/project/ArchitectureView";
import { getAllProjects, getProjectById } from "@/lib/projects";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ id: project.id }));
}

// 作品ごとに、タイトル・タグラインを使ったOGP用メタデータを動的に生成する。
export async function generateMetadata(props: PageProps<"/projects/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const project = await getProjectById(id);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: `${project.title} | Shinsuke.F Portfolio`,
      description: project.tagline,
    },
    twitter: {
      title: `${project.title} | Shinsuke.F Portfolio`,
      description: project.tagline,
    },
  };
}

export default async function ProjectDetailPage(props: PageProps<"/projects/[id]">) {
  const { id } = await props.params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* Header Area */}
      <FadeInSection>
        <Container className="flex flex-col gap-6 py-16 sm:py-20">
          <Link href="/projects" className="text-xs font-semibold text-accent">
            ← 作品一覧へ戻る
          </Link>
          <div>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">{project.title}</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              {project.tagline}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs text-muted">{project.createdAt} 作成</span>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded bg-accent px-6 py-2.5 text-xs font-semibold text-accent-foreground"
              >
                Demo を見る
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-foreground px-6 py-2.5 text-xs font-semibold"
              >
                GitHub
              </a>
            )}
          </div>
        </Container>
      </FadeInSection>

      {/* Main Visual: 実際のデモ画像/GIFが用意でき次第、next/imageに差し替える */}
      <FadeInSection>
        <Container className="pb-16">
          <div className="flex h-64 items-center justify-center rounded bg-thumbnail-bg text-xs text-thumbnail-fg sm:h-96">
            デモ画像 / GIF（準備中）
          </div>
        </Container>
      </FadeInSection>

      {/* Tech Stack Badges */}
      <FadeInSection>
        <Container className="flex flex-col gap-3 pb-16">
          <p className="text-sm font-semibold">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <TechBadge key={tech.name} name={tech.name} category={tech.category} />
            ))}
          </div>
        </Container>
      </FadeInSection>

      {/* System Architecture Area */}
      <FadeInSection>
        <ArchitectureView project={project} />
      </FadeInSection>

      {/* Challenges & Learnings */}
      <FadeInSection>
        <Container className="flex flex-col gap-6 pb-24">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              Challenges &amp; Learnings
            </p>
            <h2 className="font-display text-2xl font-semibold">直面した課題と解決策</h2>
          </div>
          <div className="flex flex-col gap-4">
            {project.challenges.map((challenge) => (
              <ChallengeCard key={challenge.title} challenge={challenge} />
            ))}
          </div>
        </Container>
      </FadeInSection>
    </div>
  );
}
