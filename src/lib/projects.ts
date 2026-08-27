import { projectsData } from "@/data/projects";
import { Project, TechCategory, Technology } from "@/types/project";

// 全作品取得
export async function getAllProjects(): Promise<Project[]> {
  return projectsData;
}

// ピックアップ作品取得（トップページ用）
export async function getFeaturedProjects(): Promise<Project[]> {
  return projectsData.filter((p) => p.featured);
}

// ID指定取得（詳細ページ用）
export async function getProjectById(id: string): Promise<Project | undefined> {
  return projectsData.find((p) => p.id === id);
}

// カテゴリ別フィルタリング取得
export async function getProjectsByCategory(category: TechCategory): Promise<Project[]> {
  return projectsData.filter((p) => p.technologies.some((t) => t.category === category));
}

// 一覧ページのフィルタータブに「今実際に使われているカテゴリだけ」を出すための関数。
// 作品データを追加するだけで、新しいカテゴリのタブが自動的に増える。
export async function getUsedCategories(): Promise<TechCategory[]> {
  const categories = new Set<TechCategory>();
  projectsData.forEach((p) => p.technologies.forEach((t) => categories.add(t.category)));
  return Array.from(categories);
}

// トップページのSkillsセクション用：全作品の技術をカテゴリ別に重複なくまとめる。
// 注意: あくまで projectsData に載っている技術だけが対象。Next.jsなど
// 「このサイト自体を作るのに使っている技術」で projectsData に無いものは含まれない。
export async function getAllTechnologies(): Promise<Record<TechCategory, Technology[]>> {
  const grouped: Record<TechCategory, Technology[]> = {
    frontend: [],
    backend: [],
    database: [],
    infrastructure: [],
    tools: [],
    other: [],
  };
  const seen = new Set<string>();

  projectsData.forEach((p) =>
    p.technologies.forEach((t) => {
      const key = `${t.category}:${t.name}`;
      if (!seen.has(key)) {
        seen.add(key);
        grouped[t.category].push(t);
      }
    })
  );

  return grouped;
}
