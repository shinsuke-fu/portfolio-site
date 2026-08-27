import type { TechCategory } from "@/types/project";

const CATEGORY_CLASSES: Record<TechCategory, string> = {
  frontend: "bg-badge-frontend-bg text-badge-frontend-fg",
  backend: "bg-badge-backend-bg text-badge-backend-fg",
  database: "bg-badge-database-bg text-badge-database-fg",
  infrastructure: "bg-badge-infrastructure-bg text-badge-infrastructure-fg",
  tools: "bg-badge-tools-bg text-badge-tools-fg",
  other: "bg-badge-other-bg text-badge-other-fg",
};

// カテゴリごとに自動配色される技術タグ。
// 色の対応はglobals.cssの --badge-*-bg / --badge-*-fg で一元管理している。
export function TechBadge({ name, category }: { name: string; category: TechCategory }) {
  return (
    <span
      className={`inline-flex items-center rounded px-3 py-1.5 text-xs font-semibold ${CATEGORY_CLASSES[category]}`}
    >
      {name}
    </span>
  );
}
