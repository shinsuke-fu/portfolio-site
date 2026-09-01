import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { FadeInSection } from "@/components/motion/FadeInSection";
import { TechBadge } from "@/components/project/TechBadge";
import { getAllTechnologies } from "@/lib/projects";

export const metadata: Metadata = {
  title: "About",
  description:
    "自己紹介・経歴・スキル、そしてAIを活用した開発とどう向き合っているかについて。",
};

// 実務（現職・SES時代など）で実際に使ってきた技術。プロジェクトデータには紐づかないため、
// ここだけ手動で管理している。「できる／得意」というより「業務で触れてきた経験」の一覧という
// 位置づけなので、自信の度合いに関わらず実際に使ったものをそのまま列挙している。
const CAREER_SKILLS = [
  "HTML",
  "CSS",
  "JavaScript",
  "kintone",
  "WordPress",
  "PHP",
  "C#",
  "Python",
  "MSSQL",
  "ラズパイ",
  "生成AI活用開発（GitHub Copilot）",
  "Illustrator",
  "Photoshop",
  "XD",
  "SharePoint",
  "Power Apps",
  "KARTE",
];

// 個人開発（WORK PLUS）・このサイト自体の制作で触れている技術。まだ「実務経験」とまでは
// 言えないため、実務経験（CAREER_SKILLS）とは分けて「現在学習中」としてまとめている。
const SITE_LEARNING_TECH = ["Next.js (App Router)", "Server Components", "Tailwind CSS v4", "Claude Codeでの開発"];

const CAREER_HISTORY = [
  {
    period: "2016/4〜2019/8",
    text: "熊本にて広告制作会社で編集ディレクターとしてキャリアをスタート",
  },
  { period: "2019/10〜", text: "上京し、未経験からIT業界へ" },
  {
    period: "2019/11〜2022/9",
    text: "研修と並行した異業種の経験を経て、SESエンジニアとしてOracle PL/SQL・HTML/CSS/JSPなどの案件に従事",
  },
  {
    period: "2022/10〜2024/10",
    text: "Web制作会社にてWeb／ECサイト運用のディレクター・アシスタントとして複数プロジェクトを担当",
  },
  {
    period: "2024/11〜現在",
    text: "IT企業にて基幹システム開発・ECサイト運用を担当（kintone, WordPress, JavaScript, Python自動化, 生成AI活用）",
  },
  {
    period: "2026/8〜",
    text: "個人開発：AIを活用した開発でReact/TypeScriptに取り組み、WORK PLUSを開発・公開",
  },
];

export default async function AboutPage() {
  const technologiesByCategory = await getAllTechnologies();
  // WORK PLUSで使用した技術（"Tailwind CSS"はSITE_LEARNING_TECHの"Tailwind CSS v4"と
  // 重複表現になるため、より具体的な後者を優先してこちらからは除外している）。
  const projectTechNames = Array.from(
    new Set(Object.values(technologiesByCategory).flatMap((techs) => techs.map((t) => t.name)))
  ).filter((name) => name !== "Tailwind CSS");
  const learningTech = [...projectTechNames, ...SITE_LEARNING_TECH];

  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <FadeInSection>
        <Container className="flex flex-col gap-4 py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">About</p>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">自己紹介</h1>
        </Container>
      </FadeInSection>

      {/* 自己紹介文 */}
      <FadeInSection>
        <Container className="flex flex-col gap-5 pb-16">
          <p className="text-sm leading-relaxed text-muted sm:text-base">
            熊本の広告制作会社で編集ディレクターとしてキャリアをスタートし、原稿作成や校正、進行管理を担当したのち、未経験からIT業界へ飛び込みました。入社当初は営業事務や店舗業務など異業種の現場で働きながら、研修や独学でITの基礎技術を習得。その後、SES、Web運用ディレクション、基幹システム開発と、環境や役割が異なる複数の現場で経験を重ねてきました。特定の専門性にこだわるのではなく、置かれた環境で求められる知識やスキルを素早く身につけ、実務で形にしていく対応力を強みとしています。
          </p>
          <p className="text-sm leading-relaxed text-muted sm:text-base">
            現在は、基幹システム開発とECサイト運用を担当しながら、kintone、JavaScript、Python（Selenium）を活用した業務自動化に取り組んでいます。現場では生成AIを取り入れた開発を行っていますが、ただAIに頼るだけでなく「なぜそのコードで動くのか」という背景や仕組みを理解し、自分の知識として積み上げていくことを意識しています。
          </p>
          <p className="text-sm leading-relaxed text-muted sm:text-base">
            このポートフォリオサイトは、独学で取り組んだReact/TypeScriptの学習成果であると同時に、AIと向き合いながらどのように技術を習得していくかという試行錯誤のプロセスを記録する場所として作成しました。
          </p>
        </Container>
      </FadeInSection>

      {/* 経歴 */}
      <FadeInSection>
        <Container className="flex flex-col gap-6 pb-16">
          <h2 className="font-display text-2xl font-semibold">経歴</h2>
          <ul className="flex flex-col gap-4 border-l-2 border-border pl-6">
            {CAREER_HISTORY.map((item) => (
              <li
                key={item.text}
                className="relative before:absolute before:-left-[29px] before:top-1.5 before:h-2 before:w-2 before:rounded-full before:bg-accent"
              >
                <p className="text-xs font-semibold text-accent">{item.period}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted sm:text-base">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </FadeInSection>

      {/* スキル */}
      <FadeInSection>
        <Container className="flex flex-col gap-10 pb-16">
          <h2 className="font-display text-2xl font-semibold">スキル</h2>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold">実務使用経験</p>
            <p className="text-xs leading-relaxed text-muted">
              いずれも現場で必要に応じて身につけてきたもので、項目によって習熟度には差があります。
            </p>
            <div className="flex flex-wrap gap-2">
              {CAREER_SKILLS.map((name) => (
                <TechBadge key={name} name={name} category="other" />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-md border border-border bg-surface p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">現在学習中</p>
            <p className="text-sm leading-relaxed text-muted">{learningTech.join(" / ")}</p>
          </div>
        </Container>
      </FadeInSection>

      {/* 目指している姿について */}
      <FadeInSection>
        <Container className="flex flex-col gap-4 pb-16">
          <h2 className="font-display text-xl font-semibold">目指している姿について</h2>
          <p className="text-sm leading-relaxed text-muted sm:text-base">
            私が目指しているのは、特定の技術だけに限定せず、扱える領域を少しずつ広げていくことです。直近の開発でもSupabaseなどのマネージドサービスを積極的に取り入れ、目の前の課題解決に必要な手段を柔軟に選択・実装することを大切にしてきました。
          </p>
          <p className="text-sm leading-relaxed text-muted sm:text-base">
            実装の多くをAIに任せられる時代だからこそ、エンジニアの価値は「何を作るか」「なぜそう作るか」を判断する設計力や、企画・ヒアリングといった上流工程へ移っていくと考えています。現在はAIを活用したアウトプット学習で自身の技術理解を深めつつ、将来的にそうした上流工程で目的を見据えた確かな判断を発揮できるエンジニアを目指しています。
          </p>
        </Container>
      </FadeInSection>

      {/* 生成AI活用について */}
      <FadeInSection>
        <Container className="flex flex-col gap-4 pb-16">
          <h2 className="font-display text-xl font-semibold">生成AI・Claudeを活用した開発について</h2>
          <p className="text-sm leading-relaxed text-muted sm:text-base">
            WORK
            PLUSやこのポートフォリオサイトの開発では、Claudeなどの生成AIを積極的に活用しています。コードの実装やトラブル時の原因調査など、作業の多くをAIで効率化する一方で、提示された解決策が本当に正しいかどうかの検証や、最終的な修正判断はすべて自分自身で行うようにしています。
          </p>
          <p className="text-sm leading-relaxed text-muted sm:text-base">
            単にゼロからコードを書くことだけにこだわるのではなく、「AIに任せる部分」と「人間が責任を持って判断する部分」をしっかり分けて開発を進めること自体が、今の時代に求められるスキルだと考えています。
          </p>
          <p className="text-sm leading-relaxed text-muted sm:text-base">
            実際の職場でもAIを使った開発フローを取り入れていますが、AIに任せきりにせず「なぜそのコードで動くのか」を自分の知識として落とし込みながら、設計や最終決定の責任を持つことを意識しています。
          </p>
        </Container>
      </FadeInSection>

      {/* このサイト自体の技術スタック */}
      <FadeInSection>
        <Container className="flex flex-col gap-4 pb-16">
          <h2 className="font-display text-xl font-semibold">このサイト自体の技術スタックについて</h2>
          <p className="text-sm leading-relaxed text-muted sm:text-base">
            このポートフォリオサイト自体も、学習を兼ねてNext.js（App
            Router）・TypeScript・Tailwind
            CSSで構築しています。next-themesを使ったダークモード対応や、next/font/googleによるWebフォントの最適化など、Reactだけでなく一段上のフレームワークの機能にも触れながら制作しました。デプロイはVercelを利用しています。
          </p>
        </Container>
      </FadeInSection>

    </div>
  );
}
