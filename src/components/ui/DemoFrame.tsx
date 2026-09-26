import type { ReactNode } from "react";
import { cx } from "../../lib/cx";
import { Tag } from "./Tag";

interface DemoFrameProps {
  title: string;
  banner: string;
  label: string;
  dark?: boolean;
  children: ReactNode;
  className?: string;
}

/** A plain app-window border. The banner is part of the frame, so it is always visible. */
export function DemoFrame({ title, banner, label, dark = false, children, className }: DemoFrameProps) {
  return (
    <figure
      aria-label={label}
      className={cx(
        "min-w-0 overflow-hidden rounded-lg border",
        dark ? "border-white/20 bg-ink text-white" : "border-ink/25 bg-white text-body",
        className,
      )}
    >
      <div
        className={cx(
          "flex items-center justify-between gap-3 border-b px-4 py-2",
          dark ? "border-white/15" : "border-line",
        )}
      >
        <span className={cx("truncate font-mono text-2xs", dark ? "text-white/70" : "text-muted")}>{title}</span>
        <Tag tone={dark ? "dark" : "neutral"}>{dark ? "Sample data" : "Concept demo"}</Tag>
      </div>
      <p
        role="note"
        className={cx(
          "border-b px-4 py-2 font-mono text-2xs",
          dark ? "border-white/15 bg-white/5 text-cyan" : "border-line bg-paper text-ink",
        )}
      >
        {banner}
      </p>
      <div className="p-3 sm:p-4 md:p-5">{children}</div>
    </figure>
  );
}
