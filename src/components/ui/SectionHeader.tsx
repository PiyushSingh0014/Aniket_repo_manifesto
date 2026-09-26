import type { ReactNode } from "react";
import type { SectionCopy } from "../../content/site";
import { site } from "../../content/site";
import { cx } from "../../lib/cx";
import { Rule } from "./Rule";

interface SectionHeaderProps {
  id: string;
  copy: SectionCopy;
  dark?: boolean;
  tags?: ReactNode;
  className?: string;
}

/** The one repeating device: sheet index, title, one sentence of intro, hairline rule. */
export function SectionHeader({ id, copy, dark = false, tags, className }: SectionHeaderProps) {
  return (
    <div className={className}>
      <p className={cx("type-label", dark ? "text-cyan" : "text-muted")}>
        <span className="sr-only">Section </span>
        {copy.index} / {site.sheetTotal}
      </p>
      <h2
        id={id}
        className={cx(
          "type-display mt-3 max-w-[22ch] text-2xl text-balance md:text-3xl",
          dark ? "text-white" : "text-ink",
        )}
      >
        {copy.title}
      </h2>
      {copy.intro && (
        <p className={cx("mt-4 max-w-[62ch]", dark ? "text-white/80" : "text-body")}>{copy.intro}</p>
      )}
      {tags && <div className="mt-4 flex flex-wrap gap-2">{tags}</div>}
      <Rule dark={dark} className="mt-8" />
    </div>
  );
}
