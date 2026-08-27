import type { Metadata } from "next";
import { Space_Grotesk, Work_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const workSans = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteDescription =
  "フロントエンドを中心に、技術的な現在地と成長プロセスを記録するポートフォリオサイトです。";

export const metadata: Metadata = {
  // URL系のmetadataフィールド（openGraph.imagesなど）を相対パスで書けるようにするための基準URL。
  // siteConfig.siteUrl が実際のドメインに差し替わったら、ここも自動的に正しいURLになる。
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Shinsuke.F | Portfolio",
    template: "%s | Shinsuke.F",
  },
  description: siteDescription,
  openGraph: {
    title: "Shinsuke.F | Portfolio",
    description: siteDescription,
    siteName: "Shinsuke.F | Portfolio",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shinsuke.F | Portfolio",
    description: siteDescription,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${spaceGrotesk.variable} ${workSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-body">
        <ThemeProvider>
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
