type SiteConfig = {
  name: string;
  siteUrl: string;
  githubUrl: string;
  // Xアカウントは開設済みだが、今はまだ公開しない方針（本人の判断）。公開するタイミングが来たら
  // ここに実際のURLを設定するだけで、Footer・Contactページ側の表示が自動的に有効になる
  // （未設定の間はリンク自体を非表示にする設計。xUrl?: stringなので値を省略できる）。
  xUrl?: string;
  email: string;
};

// サイト全体で使う固定情報。（　）内のプレースホルダーは実際の値に差し替えてください。
export const siteConfig: SiteConfig = {
  name: "Shinsuke.F",
  // 実際にデプロイするドメインが決まったら書き換える。OGP画像の絶対URL解決（metadataBase）に使うため、
  // URLとして解釈できるASCII文字列にしておく必要がある（日本語プレースホルダーは不可）。
  siteUrl: "https://portfolio-site-drab-iota.vercel.app",
  githubUrl: "https://github.com/shinsuke-fu",
  email: "neko5706@gmail.com",
};
