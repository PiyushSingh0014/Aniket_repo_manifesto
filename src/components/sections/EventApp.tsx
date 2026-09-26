import { site } from "../../content/site";
import { EventAppDemo } from "../demos/EventAppDemo";
import { EventLifecycle } from "../diagrams/EventLifecycle";
import { DashList } from "../ui/DashList";
import { DemoFrame } from "../ui/DemoFrame";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Tag } from "../ui/Tag";

const { eventApp } = site;

export function EventApp() {
  return (
    <Section id="event-app" labelledBy="event-app-title" tone="white">
      <SectionHeader
        id="event-app-title"
        copy={eventApp.section}
        tags={
          <>
            <Tag tone="commit">{eventApp.tags[0]}</Tag>
            <Tag tone="proposed">{eventApp.tags[1]}</Tag>
          </>
        }
      />

      <p className="mt-10 max-w-[64ch] text-lg leading-relaxed text-ink lg:mt-12">{eventApp.body}</p>

      <figure className="bp-grid mt-10 rounded-lg border border-line bg-white p-4 md:p-6 lg:mt-12 lg:p-8">
        <figcaption className="type-label text-ink">{eventApp.lifecycleTitle}</figcaption>
        <div className="mt-6">
          <EventLifecycle />
        </div>
      </figure>

      <h3 className="mt-14 text-lg font-semibold text-ink lg:mt-18">{eventApp.featuresTitle}</h3>
      <div className="mt-5 grid gap-10 md:grid-cols-3 md:gap-6">
        {eventApp.features.map((group) => (
          <div key={group.title} className="border-t border-ink pt-4">
            <h4 className="type-label text-ink">{group.title}</h4>
            <DashList items={group.points} className="mt-4" itemClassName="text-sm md:text-base" />
          </div>
        ))}
      </div>

      <DemoFrame
        className="mt-14 lg:mt-18"
        title={eventApp.demoTitle}
        banner={eventApp.demoBanner}
        label="Event tracker concept demo with sample data"
      >
        <EventAppDemo />
      </DemoFrame>
    </Section>
  );
}
