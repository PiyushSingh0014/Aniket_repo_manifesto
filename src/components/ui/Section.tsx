import type { ReactNode } from "react";
import { useReveal } from "../../hooks/useReveal";
import { cx } from "../../lib/cx";

type Tone = "paper" | "white" | "dark";

const tones: Record<Tone, string> = {
  paper: "bg-paper",
  white: "bg-white",
  dark: "on-dark bg-ink-2 text-white",
};

interface SectionProps {
  id: string;
  labelledBy: string;
  tone: Tone;
  children: ReactNode;
  className?: string;
}

export function Section({ id, labelledBy, tone, children, className }: SectionProps) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id={id} aria-labelledby={labelledBy} className={cx(tones[tone], "py-18 lg:py-30", className)}>
      <div ref={ref} data-reveal="" className="wrap">
        {children}
      </div>
    </section>
  );
}
