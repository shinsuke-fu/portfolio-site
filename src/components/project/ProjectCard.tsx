"use client";

import type { MouseEvent, TouchEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";
import { TechBadge } from "./TechBadge";

const MAX_TILT_DEG = 10;

// カーソル（またはタッチ位置）に応じて、カードがその方向に向かって傾く演出
// （トレーディングカードゲームのカードを傾けて見るときのイメージ）。
// カード中心からの座標のズレ（-0.5〜0.5）を回転角度に変換している。
// マウスのmousemove・タッチのtouchmove/touchstartの両方から呼び出せるよう、
// 実際の計算部分をイベントの種類に依存しない関数として切り出している。
function applyTilt(card: HTMLElement, clientX: number, clientY: number) {
  const rect = card.getBoundingClientRect();
  const offsetX = (clientX - rect.left) / rect.width - 0.5;
  const offsetY = (clientY - rect.top) / rect.height - 0.5;

  const rotateX = (-offsetY * MAX_TILT_DEG * 2).toFixed(2);
  const rotateY = (offsetX * MAX_TILT_DEG * 2).toFixed(2);

  card.style.transition = "transform 60ms ease-out";
  card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.02)`;
}

function resetTilt(card: HTMLElement) {
  card.style.transition = "transform 400ms ease";
  card.style.transform = "";
}

function handleTiltMove(event: MouseEvent<HTMLElement>) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  applyTilt(event.currentTarget, event.clientX, event.clientY);
}

function handleTiltLeave(event: MouseEvent<HTMLElement>) {
  resetTilt(event.currentTarget);
}

// スマホ・タブレットでは、指で触れている位置に応じて同じ傾き演出を出す
// （マウスが無い端末なのでmousemoveが発火しないため、タッチイベント側に個別に実装している）。
// タップした瞬間（touchstart）から反応し、指を離す（touchend/touchcancel）と少し遅れて戻す。
function handleTiltTouchMove(event: TouchEvent<HTMLElement>) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const touch = event.touches[0];
  if (!touch) return;
  applyTilt(event.currentTarget, touch.clientX, touch.clientY);
}

function handleTiltTouchEnd(event: TouchEvent<HTMLElement>) {
  const card = event.currentTarget;
  // タップしただけでも傾きが一瞬見えるよう、リセットを少し遅らせる
  window.setTimeout(() => resetTilt(card), 150);
}

// 一覧用カード。variant="featured" のときはトップページの代表作品セクション用に、
// サムネイルとテキストを横並びにした大きめのレイアウトになる。
// variant="grid"（デフォルト）は作品一覧ページ用の、縦積みのコンパクトなカード。
export function ProjectCard({
  project,
  variant = "grid",
}: {
  project: Project;
  variant?: "featured" | "grid";
}) {
  if (variant === "featured") {
    // sm（640px）で横並びに切り替えると、iPad Air/mini等のタブレット縦持ち幅
    // （744〜834px程度）ではサムネイル分の360pxを引いた残りのテキスト幅が300px台まで
    // 狭くなり、ほぼ全行が折り返されて窮屈に見える問題があった。横並びへの切り替えを
    // lg（1024px）まで遅らせ、タブレット縦持ち幅ではスマホと同じ「上下に積む」レイアウトの
    // まま幅いっぱいにテキストを使えるようにしている（横並びになるのはノートPC相当の画面幅から）
    return (
      <div className="flex flex-col gap-8 rounded-md border border-border bg-surface p-6 lg:flex-row lg:gap-12 lg:p-10">
        {/* 枠の高さを固定値（h-48/h-60）にすると実際のスクショの比率（約16:9）とズレて
            object-containで上下や左右に余白が出てしまうため、枠自体をaspect-videoに
            している（幅からスクショの実比率に近い高さを自動計算し、余白をほぼ無くす）。
            横並びになるlg以上では、デフォルトのalign-items:stretchで枠が右側の
            テキスト量に応じて縦に引き伸ばされ、aspect-videoの高さより枠が高くなって
            結局object-containで上下に余白が出てしまうため、引き伸ばしは止める必要がある。
            ただしlg:self-start（上端に固定）だと、右側のテキストの方が長いときに
            枠の下側だけに空きができてバランスが悪く見えるため、lg:self-centerで
            枠を縦方向の中央に配置し、余った分の空きを上下に分散させている */}
        <div className="relative aspect-video w-full overflow-hidden rounded bg-thumbnail-bg lg:w-[360px] lg:flex-none lg:self-center">
          <Image
            src={project.thumbnail}
            alt={`${project.title} のサムネイル`}
            fill
            sizes="(min-width: 1024px) 360px, 100vw"
            // object-coverだと表示枠とスクショの比率が合わないぶん左右・上下が切り抜かれて
            // しまうため、全体が必ず収まるobject-containにしている（はみ出す分は
            // bg-thumbnail-bgの余白として見える）
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-display text-xl font-semibold sm:text-2xl">{project.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <TechBadge key={tech.name} name={tech.name} category={tech.category} />
            ))}
          </div>
          <div className="mt-1 flex gap-5 text-sm font-semibold text-accent">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                Demo を見る →
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub →
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/projects/${project.id}`}
      onMouseMove={handleTiltMove}
      onMouseLeave={handleTiltLeave}
      onTouchStart={handleTiltTouchMove}
      onTouchMove={handleTiltTouchMove}
      onTouchEnd={handleTiltTouchEnd}
      onTouchCancel={handleTiltTouchEnd}
      className="card-tilt flex flex-col overflow-hidden rounded-md border border-border bg-surface hover:border-accent"
    >
      {/* h-40固定だとグリッド幅（カラム数で可変）に対して実際のスクショの比率（約16:9）と
          ズレて左右に余白が出てしまうため、幅に応じて高さが決まるaspect-videoにしている */}
      <div className="relative aspect-video w-full overflow-hidden bg-thumbnail-bg">
        <Image
          src={project.thumbnail}
          alt={`${project.title} のサムネイル`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          // object-coverだと表示枠とスクショの比率が合わないぶん左右・上下が切り抜かれて
          // しまうため、全体が必ず収まるobject-containにしている（はみ出す分は
          // bg-thumbnail-bgの余白として見える）
          className="object-contain"
        />
      </div>
      <div className="flex flex-col gap-2 p-6">
        <h3 className="font-display text-lg font-semibold">{project.title}</h3>
        <p className="text-xs leading-relaxed text-muted">{project.tagline}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <TechBadge key={tech.name} name={tech.name} category={tech.category} />
          ))}
        </div>
      </div>
    </Link>
  );
}
