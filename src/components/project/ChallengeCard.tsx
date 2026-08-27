import type { ChallengeAndLearning } from "@/types/project";

export function ChallengeCard({ challenge }: { challenge: ChallengeAndLearning }) {
  return (
    <div className="rounded-md border border-border bg-surface p-6">
      <h3 className="font-display text-base font-semibold">{challenge.title}</h3>
      <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">課題</p>
          <p className="mt-1">{challenge.problem}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">解決策</p>
          <p className="mt-1">{challenge.solution}</p>
        </div>
      </div>
    </div>
  );
}
