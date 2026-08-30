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
  "熊本にて広告制作会社で編集ディレクターとしてキャリアをスタート",
  "上京し、未経験からIT業界へ",
  "研修と並行した異業種の経験を経て、SESエンジニアとしてOracle PL/SQL・HTML/CSS/JSPなどの案件に従事",
  "Web制作会社にてWeb／ECサイト運用のディレクター・アシスタントとして複数プロジェクトを担当",
  "現在はIT企業にて基幹システム開発・ECサイト運用を担当（kintone, WordPress, JavaScript, Python自動化, 生成AI活用）",
  "個人開発：AIを活用した開発でReact/TypeScriptに取り組み、WORK PLUSを開発・公開",
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
            熊本で広告制作会社の編集ディレクターとしてキャリアをスタートし、原稿作成や校正、進行管理を担当しました。その後上京し、未経験からIT業界に飛び込みました。研修カリキュラムと並行して異業種の仕事も経験しながら基礎を身につけ、SES・Web運用ディレクター・基幹システム開発と、性質の異なる複数の現場を渡り歩いてきました。決して平坦な道のりではありませんでしたが、その都度求められる技術や役割に合わせて対応し、実務で形にしてきました。専門性を突き詰めてきたというより、新しい環境に合わせて必要なことを身につけていくタイプだと思っています。
          </p>
          <p className="text-sm leading-relaxed text-muted sm:text-base">
            現在はIT企業で基幹システム開発とECサイト運用を担当し、kintoneやJavaScript、Python（Selenium）による業務自動化に携わっています。現場では生成AIを活用した開発フローも取り入れていますが、AIの力を借りるだけでなく「なぜそう動くのか」を自分の理解として積み上げていくことを、今の課題として意識しています。このポートフォリオサイトは、そうした業務外の時間で独学したReact/TypeScriptの学習成果と、AIとどう向き合いながら技術を身につけていくかという試行錯誤そのものを記録する場所として作っています。
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
                key={item}
                className="relative text-sm leading-relaxed text-muted before:absolute before:-left-[29px] before:top-1.5 before:h-2 before:w-2 before:rounded-full before:bg-accent sm:text-base"
              >
                {item}
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

      {/* 目指しているものについて */}
      <FadeInSection>
        <Container className="flex flex-col gap-4 pb-16">
          <h2 className="font-display text-xl font-semibold">目指しているものについて</h2>
          <p className="text-sm leading-relaxed text-muted sm:text-base">
            現時点でNode.jsやGoを使った独自APIの開発実績はまだありません。WORK
            PLUSで扱ったSupabase（認証・DB・RLS）も、ゼロからサーバーを構築したわけではなく、マネージドサービスの機能を組み合わせた実装です。ただ、目指しているのは「フルスタックエンジニアになる」ことそのものより、扱える領域を少しずつ増やしていくことです。結果としてそう呼べる状態に近づけたら理想ですが、今の目的地としてはそちらではありません。開発の多くはAIを積極的に活用していて、コードを書く作業自体は自分一人だけの力ではありません。ただ、最終的な設計判断・なぜそう作ったか・出てきたコードが正しいかどうかの判断は、自分の責任として持ち続けるようにしています。AIを使った開発は今後さらに当たり前になっていくと考えています。実装の多くをAIに任せられるようになる分、人間の役割は、企画やヒアリング、設計といった上流工程や、AIも含めたチーム全体をどう動かすかというマネジメントの部分に、より重心が移っていくはずです。そこに時間を使える人になりたい、というのが今の自分の考えです。まだそのレベルにあるわけではないので、今は扱える領域を広げながら、自分の理解が追いついていない部分をAIを使ったアウトプット学習で埋めている段階です。
          </p>
        </Container>
      </FadeInSection>

      {/* 生成AI活用について */}
      <FadeInSection>
        <Container className="flex flex-col gap-4 pb-16">
          <h2 className="font-display text-xl font-semibold">生成AI・Claudeを活用した開発について</h2>
          <p className="text-sm leading-relaxed text-muted sm:text-base">
            WORK
            PLUSおよびこのポートフォリオサイトは、Claudeなどの生成AIを活用しながら開発しています。実装のほとんどはAIに任せており、不具合が起きたときの原因調査もまずAIに相談することがほとんどです。ただ、出てきた原因や対処方針が本当に正しいか、実際にどう直すかの最終判断は自分で行うようにしています（確認者候補が0人になり400エラーになった件なども、そうやって判断してきました）。「全部自分でゼロから書いていないのに実績と言えるのか」という迷いは自然なものですが、任せるところと自分で判断するところを分けて開発を進めること自体が、今のうちに身につけようとしているスキルだと思っています。
          </p>
          <p className="text-sm leading-relaxed text-muted sm:text-base">
            現在の職場でも生成AIを使った開発フローを取り入れていますが、AIに任せきりにせず「なぜそのコードで動くのか」を自分の理解として積み上げていくことを、開発者として大切にしたいポイントだと考えています。生成AIをツールとして使いこなしながら、設計・意思決定・最終的な判断を自分の頭で行えることこそ、これからのエンジニアに求められる力だと思っています。
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
