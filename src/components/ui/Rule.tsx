import { cx } from "../../lib/cx";

export function Rule({ dark = false, className }: { dark?: boolean; className?: string }) {
  return <hr className={cx("border-0 border-t", dark ? "border-white/15" : "border-line", className)} />;
}
