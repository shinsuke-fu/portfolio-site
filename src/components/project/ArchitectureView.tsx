import Image from "next/image";
import { Container } from "@/components/layout/Container";
import type { Project } from "@/types/project";

// システム構成図と、技術選定の理由をまとめて表示するセクション。
// 構成図の画像がまだ無いプロジェクトでは、丸ごとセクションを描画しない。
export function ArchitectureView({ project }: { project: Project }) {
  if (!project.architectureNotes || project.architectureNotes.length === 0) {
    return null;
  }

  return (
    <Container className="flex flex-col gap-6 pb-16">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
          Architecture
        </p>
        <h2 className="font-display text-2xl font-semibold">構成・技術選定の理由</h2>
      </div>

      {project.architectureDiagram ? (
        <div className="relative h-64 w-full overflow-hidden rounded border border-border sm:h-96">
          <Image
            src={project.architectureDiagram}
            alt={`${project.title} のシステム構成図`}
            fill
            className="object-contain"
          />
        </div>
      ) : (
        <div className="flex h-48 items-center justify-center rounded bg-thumbnail-bg text-xs text-thumbnail-fg">
          構成図（準備中）
        </div>
      )}

      <div className="flex flex-col gap-3 text-sm leading-relaxed text-muted">
        {project.architectureNotes.map((note) => (
          <p key={note}>{note}</p>
        ))}
      </div>
    </Container>
  );
}
