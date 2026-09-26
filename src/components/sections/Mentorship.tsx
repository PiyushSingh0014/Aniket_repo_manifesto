import { ArrowDown, ArrowRight, ShieldCheck, Users } from "lucide-react";
import { site } from "../../content/site";
import { DashList } from "../ui/DashList";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Tag } from "../ui/Tag";

const { mentorship } = site;
const { safety } = mentorship;

export function Mentorship() {
  return (
    <Section id="mentorship" labelledBy="mentorship-title" tone="white">
      <SectionHeader id="mentorship-title" copy={mentorship.section} tags={<Tag>Proposed</Tag>} />

      <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-12 lg:mt-12">
        <div className="col-span-12 lg:col-span-7">
          <h3 className="text-lg font-semibold text-ink">{mentorship.stepsTitle}</h3>
          <ol className="mt-5 border-t border-line">
            {mentorship.steps.map((step, i) => (
              <li key={step} className="grid grid-cols-[3rem_1fr] items-baseline border-b border-line py-3.5">
                <span className="font-mono text-sm text-royal-deep">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-ink">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-ink">
            <Users aria-hidden="true" size={20} strokeWidth={1.75} className="text-royal" />
            {mentorship.helpTitle}
          </h3>
          <DashList items={mentorship.help} className="mt-5" />
        </div>
      </div>

      {/* Safety panel: calm, clearly visible, not an alarm */}
      <section
        aria-labelledby="safety-title"
        className="mt-14 rounded-lg border border-ink/30 bg-paper p-5 md:p-8 lg:mt-18"
      >
        <div className="flex items-start gap-3">
          <ShieldCheck aria-hidden="true" size={20} strokeWidth={1.75} className="mt-1 shrink-0 text-royal" />
          <h3 id="safety-title" className="text-lg font-semibold text-ink md:text-xl">
            {safety.title}
          </h3>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <h4 className="type-label text-ink">{safety.reportTitle}</h4>
            <DashList items={safety.report} className="mt-4" />
          </div>

          <div className="lg:col-span-8">
            <h4 className="type-label text-ink">{safety.flowTitle}</h4>
            <ol className="mt-4 grid gap-2 md:grid-cols-5 md:gap-3">
              {safety.flow.map((step, i) => {
                const last = i === safety.flow.length - 1;
                return (
                  <li key={step} className="relative">
                    <div className="h-full rounded-lg border border-line bg-white p-3">
                      <span className="font-mono text-2xs text-royal-deep">{String(i + 1).padStart(2, "0")}</span>
                      <p className="mt-1 text-sm text-ink">{step}</p>
                    </div>
                    {!last && (
                      <>
                        <ArrowDown
                          aria-hidden="true"
                          size={16}
                          strokeWidth={1.75}
                          className="mx-auto my-1 text-royal md:hidden"
                        />
                        <ArrowRight
                          aria-hidden="true"
                          size={14}
                          strokeWidth={1.75}
                          className="absolute top-1/2 -right-[13px] hidden -translate-y-1/2 text-royal md:block"
                        />
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <dl className="mt-10 grid gap-6 border-t border-line pt-6 md:grid-cols-3">
          {safety.qa.map((item) => (
            <div key={item.q}>
              <dt className="font-semibold text-ink">{item.q}</dt>
              <dd className="mt-1 text-sm text-body">{item.a}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 rounded-lg border-l-2 border-royal bg-white p-4 text-sm text-ink">{safety.honesty}</p>
      </section>
    </Section>
  );
}
