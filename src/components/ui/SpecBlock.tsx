import { ArrowUpRight } from "lucide-react";

interface SpecBlockProps {
  figure: string;
  label: string;
  links: { href: string; label: string }[];
}

/** A measured figure with its label. Static text: no count-up. */
export function SpecBlock({ figure, label, links }: SpecBlockProps) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-line bg-white p-4 md:p-5">
      <p className="font-mono text-lg font-semibold tracking-tight text-ink lg:text-xl">{figure}</p>
      <p className="mt-2 text-sm text-muted">{label}</p>
      {links.length > 0 && (
        <p className="mt-auto flex flex-wrap gap-x-4 pt-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1 font-mono text-2xs text-royal-deep underline hover:text-ink"
            >
              {link.label}
              <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.75} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ))}
        </p>
      )}
    </div>
  );
}
