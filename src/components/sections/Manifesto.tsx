import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { site } from "../../content/site";
import { useActiveSection } from "../../hooks/useActiveSection";
import { cx } from "../../lib/cx";
import { DashList } from "../ui/DashList";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Tag } from "../ui/Tag";

const { manifesto } = site;
const pillarIds = manifesto.pillars.map((p) => p.id);

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-royal-deep underline hover:text-ink"
    >
      {children}
      <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
    </a>
  );
}

export function Manifesto() {
  const active = useActiveSection(pillarIds, 96);

  return (
    <Section id="manifesto" labelledBy="manifesto-title" tone="paper">
      <SectionHeader id="manifesto-title" copy={manifesto.section} />

      <div className="mt-8 grid grid-cols-12 gap-x-6 lg:mt-12">
        {/* Desktop: sticky index of pillars */}
        <nav aria-label="Manifesto pillars" className="hidden lg:col-span-3 lg:block">
          <ol className="sticky top-24 border-l border-line">
            {manifesto.pillars.map((p) => {
              const isActive = active === p.id;
              return (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cx(
                      "-ml-px flex min-h-11 items-baseline gap-3 border-l-2 py-2 pr-2 pl-4 text-sm transition-colors duration-150",
                      isActive
                        ? "border-royal font-semibold text-ink"
                        : "border-transparent text-muted hover:text-ink",
                    )}
                  >
                    <span className={cx("font-mono text-xs", isActive ? "text-royal-deep" : "text-muted")}>
                      {p.number}
                    </span>
                    {p.title}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="col-span-12 lg:col-span-9">
          {/* Mobile: numbered jump links. Every pillar stays fully visible below. */}
          <nav aria-label="Jump to a pillar" className="mb-8 lg:hidden">
            <ol className="flex flex-wrap gap-1.5">
              {manifesto.pillars.map((p) => (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    title={p.title}
                    className="flex size-11 items-center justify-center rounded-lg border border-line bg-white font-mono text-sm text-ink hover:border-royal"
                  >
                    {p.number}
                    <span className="sr-only"> {p.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {manifesto.pillars.map((p) => (
            <article
              key={p.id}
              id={p.id}
              aria-labelledby={`${p.id}-title`}
              className="scroll-mt-20 border-t border-line py-10 first-of-type:border-t-0 first-of-type:pt-0 lg:py-12"
            >
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
                <div className="flex items-baseline gap-4">
                  <span aria-hidden="true" className="font-mono text-sm text-royal-deep">
                    {p.number}
                  </span>
                  <h3 id={`${p.id}-title`} className="type-display text-xl text-ink md:text-2xl">
                    <span className="sr-only">Pillar {p.number}: </span>
                    {p.title}
                  </h3>
                </div>
                <Tag>Proposed</Tag>
              </div>

              <p className="mt-4 max-w-[62ch] text-lg text-ink">{p.intent}</p>

              {p.commitment && (
                <div className="mt-6 rounded-lg border border-ink bg-white p-4 md:p-5">
                  <Tag tone="commit">My build commitment</Tag>
                  <p className="mt-3 text-body">
                    <strong className="font-semibold text-ink">{p.commitment.lead}</strong>
                    {p.commitment.text}
                  </p>
                  <p className="mt-2 text-sm text-muted">{p.commitment.caveat}</p>
                  <TextLink href={p.commitment.link.href}>{p.commitment.link.label}</TextLink>
                </div>
              )}

              <DashList
                className="mt-6"
                items={p.points.map((point) =>
                  point.lead ? (
                    <>
                      <strong className="font-semibold text-ink">{point.lead}</strong> {point.text}
                    </>
                  ) : (
                    point.text
                  ),
                )}
              />

              {p.related.length > 0 && (
                <p className="mt-4 flex flex-wrap gap-x-6">
                  {p.related.map((link) => (
                    <TextLink key={link.href} href={link.href}>
                      {link.label}
                    </TextLink>
                  ))}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
