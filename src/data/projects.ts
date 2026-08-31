import { Project } from "@/types/project";

export const projectsData: Project[] = [
  {
    id: "work-plus",
    title: "WORK PLUS",
    tagline: "承認フローとリアルタイム共有を備えた、チーム向けタスク管理ダッシュボード",
    summary:
      "React 19 / TypeScriptで構築し、Supabase（PostgreSQL + Auth + RLS）をバックエンドに採用。複数ユーザーでのログイン・タスク共有、カンバン形式の承認フロー（申請／承認／差し戻し）、ダッシュボードでの進捗可視化までを実装。",
    featured: true,
    thumbnail: "/images/projects/work-plus-thumb.png",
    demoUrl: "https://work-plus-eosin.vercel.app/",
    githubUrl: "https://github.com/（実際のユーザー名に置き換える）/work-plus",
    technologies: [
      { name: "React", category: "frontend" },
      { name: "TypeScript", category: "frontend" },
      { name: "Tailwind CSS", category: "frontend" },
      { name: "Vite", category: "tools" },
      { name: "Supabase (Auth)", category: "backend" },
      { name: "PostgreSQL", category: "database" },
      { name: "Vercel", category: "infrastructure" },
    ],
    architectureNotes: [
      "ログイン後に使うダッシュボードアプリでSEO（検索エンジンへのインデックス）は重要でない一方、画面遷移の少ない操作性を重視したかったため、SPA構成のVite + React + TypeScriptを採用した。",
      "バックエンドにはSupabase（PostgreSQL + Auth + RLS）を採用。認証・DB・ストレージがセットになっており、認証まわり（パスワードのハッシュ化やセッション管理など）を自作せずに済むため、フロントエンドの作り込みに時間を使えると判断した。",
      "独自サーバー（Node.js/Expressなど）は挟まず、フロントエンドから直接Supabaseを呼び出す構成。アクセス制御はアプリ側のコードではなく、RLS（行レベルセキュリティ）というデータベース側のルールで行っている。",
      "RLSにより「ログインしていれば全員が閲覧できるが、削除は作成者のみ」といった権限ルールをデータベースに直接書けるため、承認フローのような権限管理と相性が良かった。",
    ],
    aiUsageNote:
      "コンポーネント設計やSupabaseとの連携部分など、実装の中心はClaudeと一緒に進めた。エラー発生時の原因調査も、まずAIに相談するところから着手している。",
    ownJudgmentNote:
      "技術構成そのものの選定（Vite・React・TypeScript、Supabase・RLSを使うかどうか）や、状態管理をApp.tsxに一元化する設計方針の決定、そして実際に出た不具合（確認者0人時の400エラー）で提示された修正案が正しいかどうかの検証は、自分で行った。",
    challenges: [
      {
        title: "状態管理の一元化（Single Source of Truth）",
        problem:
          "子コンポーネントが直接データを書き換えると、データの流れが追いづらくバグの温床になる懸念があった。",
        solution:
          "全状態をApp.tsxに集約し、子コンポーネントは必ずコールバック関数経由で変更をリクエストする設計にした。データの流れが一方向になり、不具合の切り分けがしやすくなった。",
      },
      {
        title: "Supabase移行時の400エラー（確認者IDの空文字列問題）",
        problem:
          "ユーザーが自分1人しかいない状態でタスクを作成すると400エラーが発生。確認者候補が0人になり reviewerId が空文字列のまま送信され、uuid型の列に対して不正な値になっていた。",
        solution:
          "`?? null`（undefined/nullのみ変換）を`|| null`（空文字列も含めて変換）に修正。原因を切り分けてピンポイントで対処した。",
      },
    ],
    createdAt: "2026-08",
    updatedAt: "2026-08",
  },
];
