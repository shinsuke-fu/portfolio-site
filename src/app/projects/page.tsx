import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { FadeInSection } from "@/components/motion/FadeInSection";
import { ProjectFilter } from "@/components/project/ProjectFilter";
import { getAllProjects, getUsedCategories } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "使用技術で絞り込める作品一覧です。",
};

export default async function ProjectsPage() {
  const [projects, categories] = await Promise.all([
    getAllProjects(),
    getUsedCategories(),
  ]);

  return (
    <div className="flex flex-1 flex-col">
      <FadeInSection>
        <Container className="flex flex-col gap-4 py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
            Projects
          </p>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">作品一覧</h1>
          <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            これまでに手を動かして作った作品をまとめています。カテゴリで絞り込んで見ることもできます。
          </p>
        </Container>
      </FadeInSection>

      <FadeInSection>
        <Container className="pb-24">
          <ProjectFilter projects={projects} categories={categories} />
        </Container>
      </FadeInSection>
    </div>
  );
}
