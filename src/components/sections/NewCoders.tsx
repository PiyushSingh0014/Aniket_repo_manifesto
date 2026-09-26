import { site } from "../../content/site";
import { CoderRoute } from "../diagrams/CoderRoute";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Tag } from "../ui/Tag";

const { newCoders } = site;

export function NewCoders() {
  return (
    <Section id="new-coders" labelledBy="new-coders-title" tone="paper">
      <SectionHeader id="new-coders-title" copy={newCoders.section} tags={<Tag>Proposed</Tag>} />
      <div className="mt-10 lg:mt-14">
        <CoderRoute stops={newCoders.stages} />
      </div>
      <p className="mt-12 max-w-[62ch] border-l-2 border-royal pl-4 text-ink">{newCoders.note}</p>
    </Section>
  );
}
