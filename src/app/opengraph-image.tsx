import { ImageResponse } from "next/og";

// サイト全体のデフォルトOGP画像。各ページはこの下に個別のopengraph-image.tsxを
// 置かない限り、この画像がリンクシェア時のカードに使われる。
// 日本語フォントを埋め込んでいないため、ここに表示する文字はあえて英数字のみにしている
// （ヘッダーのロゴ「Shinsuke.F」も英数字だけなので、ブランドの見た目としても一貫する）。

export const alt = "Shinsuke.F | Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
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
            PORTFOLIO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", fontSize: "128px", fontWeight: 700, lineHeight: 1 }}>
            Shinsuke.F
          </div>
          <div style={{ display: "flex", fontSize: "34px", color: "#5c5346" }}>
            Frontend Developer / Full-stack in Progress
          </div>
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
          Building a living record of growth, one shipped feature at a time.
        </div>
      </div>
    ),
    { ...size }
  );
}
