import { site } from "../../content/site";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

const { about } = site;

export function About() {
  return (
    <Section id="about" labelledBy="about-title" tone="white">
      <SectionHeader id="about-title" copy={about.section} />
      <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-10 lg:mt-12">
        <div className="col-span-12 lg:col-span-7">
          <p className="max-w-[64ch] text-body md:text-lg md:leading-relaxed">{about.body}</p>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <div className="overflow-hidden rounded-lg border border-ink/25 bg-white">
            <p className="type-label border-b border-line bg-paper px-5 py-3 text-ink">Fact sheet</p>
            <dl>
              {about.facts
                .filter((fact) => fact.value)
                .map((fact) => (
                  <div
                    key={fact.label}
                    className="grid grid-cols-1 gap-1 border-b border-line px-5 py-3.5 last:border-b-0 sm:grid-cols-[7.5rem_1fr] sm:gap-4"
                  >
                    <dt className="type-label pt-0.5 text-muted">{fact.label}</dt>
                    <dd className="text-sm text-ink">{fact.value}</dd>
                  </div>
                ))}
            </dl>
          </div>
        </div>
      </div>
    </Section>
  );
}
