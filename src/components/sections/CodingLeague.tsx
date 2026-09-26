import { Trophy } from "lucide-react";
import { site } from "../../content/site";
import { LeagueDashboard } from "../demos/LeagueDashboard";
import { DashList } from "../ui/DashList";
import { DemoFrame } from "../ui/DemoFrame";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Tag } from "../ui/Tag";

const { league } = site;

export function CodingLeague() {
  return (
    <Section id="coding-league" labelledBy="coding-league-title" tone="dark">
      <SectionHeader id="coding-league-title" copy={league.section} dark tags={<Tag tone="dark">Proposed</Tag>} />

      <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-12 lg:mt-12">
        <div className="col-span-12 lg:col-span-5">
          <h3 className="type-label text-cyan">{league.formatTitle}</h3>
          <DashList dark items={league.format} className="mt-4 text-white/90" />

          <h3 className="type-label mt-12 flex items-center gap-2 text-cyan">
            <Trophy aria-hidden="true" size={18} strokeWidth={1.75} />
            {league.recognitionTitle}
          </h3>
          <dl className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {league.recognition.map((award) => (
              <div key={award.title} className="border-t border-white/15 pt-3">
                <dt className="font-semibold text-white">{award.title}</dt>
                <dd className="mt-1 text-sm text-white/75">{award.line}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 rounded-lg border border-white/25 p-5">
            <h3 className="type-label text-cyan">{league.fairPlayTitle}</h3>
            <p className="mt-3 text-white/90">{league.fairPlay}</p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <DemoFrame
            dark
            className="lg:sticky lg:top-24"
            title={league.demoTitle}
            banner={league.demoBanner}
            label="Coding League sample dashboard with made-up data"
          >
            <LeagueDashboard />
          </DemoFrame>
        </div>
      </div>
    </Section>
  );
}
