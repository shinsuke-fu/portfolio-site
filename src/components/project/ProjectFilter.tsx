"use client";

import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import type { Project, TechCategory } from "@/types/project";

const CATEGORY_LABELS: Record<TechCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  infrastructure: "Infrastructure",
  tools: "Tools",
  other: "Other",
};

// カテゴリタブとカードグリッドをまとめたクライアントコンポーネント。
// 選択中のカテゴリはこのコンポーネント内のstateだけで管理している
// （URLに反映する必要が出てきたら、その時にsearchParams対応へ拡張する）。
export function ProjectFilter({
  projects,
  categories,
}: {
  projects: Project[];
  categories: TechCategory[];
}) {
  const [selected, setSelected] = useState<TechCategory | "all">("all");

  const filteredProjects =
    selected === "all"
      ? projects
      : projects.filter((project) =>
          project.technologies.some((tech) => tech.category === selected)
        );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap gap-2">
        <FilterTab label="すべて" active={selected === "all"} onClick={() => setSelected("all")} />
        {categories.map((category) => (
          <FilterTab
            key={category}
            label={CATEGORY_LABELS[category]}
            active={selected === category}
            onClick={() => setSelected(category)}
          />
        ))}
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} variant="grid" />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">該当する作品はまだありません。</p>
      )}
    </div>
  );
}

function FilterTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-11 items-center rounded-full px-5 text-xs font-semibold transition-colors ${
        active
          ? "bg-accent text-accent-foreground"
          : "border border-border text-muted hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}
