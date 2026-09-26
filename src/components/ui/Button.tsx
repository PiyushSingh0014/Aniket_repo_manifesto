import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";

type Variant = "primary" | "secondary";

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

type LinkButtonProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type NativeButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-colors duration-150 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-royal-deep disabled:bg-muted disabled:hover:bg-muted",
  secondary:
    "border border-ink text-ink hover:bg-ink hover:text-white disabled:border-line disabled:text-muted disabled:hover:bg-transparent",
};

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { variant = "primary", className, children, ...rest } = props;
  const classes = cx(base, variants[variant], className);

  if (typeof rest.href === "string") {
    return (
      <a {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} className={classes}>
        {children}
      </a>
    );
  }
  const { type = "button", ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} {...buttonRest} className={classes}>
      {children}
    </button>
  );
}
