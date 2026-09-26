import { site } from "../../content/site";
import { DashList } from "../ui/DashList";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Tag } from "../ui/Tag";

const { plan } = site;

/** Four-phase stepper: square phase markers on a thin connecting rule. */
export function Plan() {
  return (
    <Section id="plan" labelledBy="plan-title" tone="paper">
      <SectionHeader id="plan-title" copy={plan.section} tags={<Tag>Proposed</Tag>} />

      <ol className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-4 lg:gap-6">
        {plan.phases.map((phase, i) => {
          const last = i === plan.phases.length - 1;
          return (
            <li key={phase.number} className="relative pl-14 lg:pt-16 lg:pl-0">
              {!last && (
                <span
                  aria-hidden="true"
                  className="absolute top-10 -bottom-10 left-5 w-px bg-ink/40 lg:top-5 lg:right-[-1.5rem] lg:bottom-auto lg:left-10 lg:h-px lg:w-auto"
                />
              )}
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-[4px] border border-ink bg-white font-mono text-sm text-ink"
              >
                {phase.number}
              </span>
              <p className="type-label text-muted">Phase {phase.number}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{phase.title}</h3>
              <DashList items={phase.points} className="mt-4" itemClassName="text-sm md:text-base" />
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
