import { ImageResponse } from "next/og";
import { getAllProjects, getProjectById } from "@/lib/projects";

// 作品詳細ページ用のOGP画像。作品タイトルと使用技術（どちらも英数字）だけを
// 画像に載せることで、日本語フォントの埋め込みなしでも文字化けしない構成にしている。
// タグライン（日本語）はあえて画像には出さず、og:descriptionのテキスト側で伝える。

export const alt = "Shinsuke.F | Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ id: project.id }));
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id);
  const title = project?.title ?? "Project";
  const technologies = project?.technologies.map((t) => t.name) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#f7f2e8",
          color: "#2b241c",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "16px",
              height: "16px",
              borderRadius: "999px",
              backgroundColor: "#8a4a2f",
            }}
          />
          <div style={{ display: "flex", fontSize: "28px", letterSpacing: "4px", color: "#5c5346" }}>
            PROJECT
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ display: "flex", fontSize: "104px", fontWeight: 700, lineHeight: 1 }}>
            {title}
          </div>
          {technologies.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
              {technologies.map((name) => (
                <div
                  key={name}
                  style={{
                    display: "flex",
                    fontSize: "26px",
                    padding: "10px 22px",
                    borderRadius: "999px",
                    backgroundColor: "#f0dcc8",
                    color: "#8a4a2f",
                  }}
                >
                  {name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "24px",
            color: "#8a4a2f",
            borderTop: "2px solid #e6ddc9",
            paddingTop: "28px",
          }}
        >
          Shinsuke.F | Portfolio
        </div>
      </div>
    ),
    { ...size }
  );
}
