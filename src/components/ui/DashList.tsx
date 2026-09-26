import type { ReactNode } from "react";
import { cx } from "../../lib/cx";

/** A plain list with short drafting-dash markers. */
export function DashList({
  items,
  dark = false,
  className,
  itemClassName,
}: {
  items: ReactNode[];
  dark?: boolean;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <ul className={cx("space-y-2.5", className)}>
      {items.map((item, i) => (
        <li
          key={i}
          className={cx(
            "relative pl-5 before:absolute before:top-[0.8em] before:left-0 before:h-px before:w-2.5",
            dark ? "before:bg-cyan" : "before:bg-royal",
            itemClassName,
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
