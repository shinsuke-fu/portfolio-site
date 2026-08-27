// サイト自体の更新履歴（成長ログ）用の型。
// projectsと同じく「データ定義 → lib経由で取得 → ページで表示」という構成にしている。
export interface LogEntry {
  version: string; // 例: "v0.9"
  title: string;
  date: string; // YYYY-MM
  description: string;
}
