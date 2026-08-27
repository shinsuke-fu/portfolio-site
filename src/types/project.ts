// 技術カテゴリ（フロントエンドだけでなく、将来のバックエンド・インフラ拡張にも対応する）
export type TechCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'infrastructure'
  | 'tools'
  | 'other';

export interface Technology {
  name: string;
  category: TechCategory;
  icon?: string; // アイコン名または画像URL（未使用の場合はundefined）
}

export interface ChallengeAndLearning {
  title: string; // 課題・問題意識
  problem: string; // 具体的に何が起きたか / 何に直面したか
  solution: string; // どう解決したか・どういう設計にしたか
}

export interface Project {
  id: string; // URLスラッグ（例: 'work-plus'）
  title: string; // アプリ名
  tagline: string; // 1行キャッチコピー
  summary: string; // 概要（数文）
  featured: boolean; // トップページでピックアップ表示するか

  thumbnail: string; // サムネイル画像パス
  demoUrl?: string; // 公開URL（Vercelなど）
  githubUrl?: string; // GitHubリポジトリ（フロントエンドまたはメイン）
  backendGithubUrl?: string; // （将来用）バックエンドリポジトリを分ける場合

  technologies: Technology[]; // 使用技術リスト

  // 深掘り・技術的アピール要素
  architectureDiagram?: string; // アーキテクチャ構成図の画像URL
  architectureNotes?: string[]; // 構成・技術選定の理由（段落ごとに配列で持つ）
  challenges: ChallengeAndLearning[]; // 技術的ハードルと解決プロセス

  createdAt: string; // 作成年月（YYYY-MM）
  updatedAt: string; // 最終更新年月（YYYY-MM）
}
