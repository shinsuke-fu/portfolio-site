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
        <>
          {project.architectureDiagramMobile && (
            // 横並び版（3ボックスを横に並べたレイアウト）をスマホ幅にそのまま縮小すると、
            // 図の中の文字が判読できないほど小さくなってしまうため、スマホ幅（sm未満）専用の
            // 縦積みレイアウト画像に差し替えている。枠の比率は画像の実比率
            // （1080×2592＝5:12）に合わせ、余白が出ないようにしている
            <div className="relative aspect-[1080/2592] w-full overflow-hidden rounded border border-border sm:hidden">
              <Image
                src={project.architectureDiagramMobile}
                alt={`${project.title} のシステム構成図`}
                fill
                className="object-contain"
              />
            </div>
          )}
          {/* 以前はh-64 sm:h-96の固定高さだったが、タブレット幅ではコンテナ幅に対して
              画像の方が横長になり、object-containで上下に余白が出てしまっていた
              （Step 21・24などで他の画像に対しても繰り返し発生した問題と同じ原因）。
              枠の比率を画像の実比率（2320×960＝29:12。Step23でBackendボックスの
              はみ出し修正のためキャンバス高さを400→420pxに広げた際、画像の高さも
              920→960pxに変わっていたが、Step29ではそこを確認せず旧サイズ920pxのまま
              aspect-[2320/920]としてしまい、今度は逆に左右に余白が出る不具合を
              作ってしまっていた）に合わせるaspect-[2320/960]に修正し、
              画面幅に関わらず余白が出ないようにしている */}
          <div
            className={`relative aspect-[2320/960] w-full overflow-hidden rounded border border-border ${
              project.architectureDiagramMobile ? "hidden sm:block" : ""
            }`}
          >
            <Image
              src={project.architectureDiagram}
              alt={`${project.title} のシステム構成図`}
              fill
              className="object-contain"
            />
          </div>
        </>
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

      {(project.aiUsageNote || project.ownJudgmentNote) && (
        <div className="flex flex-col gap-4 border-t border-border pt-6">
          {project.aiUsageNote && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                AIをどう活用したか
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{project.aiUsageNote}</p>
            </div>
          )}
          {project.ownJudgmentNote && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                自分で判断した点
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{project.ownJudgmentNote}</p>
            </div>
          )}
        </div>
      )}
    </Container>
  );
}
