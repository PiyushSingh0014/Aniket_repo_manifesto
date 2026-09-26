import type { ReactNode } from "react";
import { cx } from "../../lib/cx";

export type TagTone = "proposed" | "commit" | "neutral" | "dark" | "success" | "warning" | "danger";

const tones: Record<TagTone, string> = {
  proposed: "border-royal-deep/50 text-royal-deep",
  commit: "border-ink bg-ink text-white",
  neutral: "border-line text-muted",
  dark: "border-cyan/60 text-cyan",
  success: "border-success/50 text-success",
  warning: "border-warning/50 text-warning",
  danger: "border-danger/50 text-danger",
};

/** Status labels only: Proposed, My build commitment, Concept demo, Sample data, division names. */
export function Tag({
  tone = "proposed",
  children,
  className,
}: {
  tone?: TagTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex max-w-full items-center rounded-[4px] border px-2 py-px font-mono text-2xs",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
