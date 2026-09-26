import { linkLabels, site } from "../../content/site";
import { DashList } from "../ui/DashList";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { SpecBlock } from "../ui/SpecBlock";
import { Tag } from "../ui/Tag";

const { experience } = site;

export function Experience() {
  return (
    <Section id="experience" labelledBy="experience-title" tone="paper">
      <SectionHeader id="experience-title" copy={experience.section} />

      {/* Ledger: role on the left, details on the right, a node line down the edge */}
      <ol className="relative mt-4">
        <span aria-hidden="true" className="absolute top-10 bottom-10 left-[5px] w-px bg-ink/20" />
        {experience.entries.map((entry) => (
          <li
            key={entry.id}
            className="relative grid grid-cols-12 gap-x-6 gap-y-4 border-b border-line py-8 pl-8 last:border-b-0 md:pl-10"
          >
            <span
              aria-hidden="true"
              className="absolute top-[2.35rem] left-0 size-[11px] rounded-full border-[1.5px] border-royal bg-paper"
            />
            <div className="col-span-12 lg:col-span-4">
              {entry.logo && (
                <img
                  src={entry.logo.src}
                  width={entry.logo.width}
                  height={entry.logo.height}
                  alt={entry.logoAlt}
                  loading="lazy"
                  decoding="async"
                  className="mb-3 h-10 w-auto"
                />
              )}
              <h3 className="text-lg font-semibold text-ink">{entry.role}</h3>
              {entry.org && <p className="mt-0.5 text-sm text-muted">{entry.org}</p>}
              {entry.marker && <Tag tone="neutral" className="mt-3">{entry.marker}</Tag>}
            </div>

            <div className="col-span-12 lg:col-span-8">
              {entry.points.length > 0 && <DashList items={entry.points} />}
              {entry.items.length > 0 && (
                <dl className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                  {entry.items.map((item) => (
                    <div key={item.title}>
                      <dt className="font-semibold text-ink">{item.title}</dt>
                      <dd className="mt-1 text-body">{item.detail}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-14 lg:mt-18">
        <h3 className="text-lg font-semibold text-ink">{experience.achievementsTitle}</h3>
        <ul className="mt-5 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
          {experience.achievements.map((item) => {
            const links = item.profiles
              .filter((key) => site.links[key].trim() !== "")
              .map((key) => ({
                href: site.links[key],
                label: item.profiles.length > 1 ? `${linkLabels[key]} profile` : "View profile",
              }));
            return (
              <li key={item.figure}>
                <SpecBlock figure={item.figure} label={item.label} links={links} />
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
