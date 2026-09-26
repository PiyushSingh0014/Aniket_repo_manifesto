import type { ReactNode } from "react";
import { site } from "../../content/site";
import { VisionProposed, VisionToday } from "../diagrams/VisionDiagram";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

const { vision } = site;

function Panel({ label, caption, children }: { label: string; caption: string; children: ReactNode }) {
  return (
    <figure className="bp-grid flex flex-col rounded-lg border border-line bg-white p-4 md:p-6">
      <p className="type-label text-ink">{label}</p>
      <div className="mx-auto mt-4 w-full max-w-[26rem]">{children}</div>
      <figcaption className="mt-4 border-t border-line pt-3 text-sm font-medium text-ink">{caption}</figcaption>
    </figure>
  );
}

export function Vision() {
  return (
    <Section id="vision" labelledBy="vision-title" tone="white">
      <SectionHeader id="vision-title" copy={vision.section} />

      <p className="mt-10 max-w-[64ch] text-lg leading-relaxed text-body lg:mt-12">{vision.body}</p>

      <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6">
        <Panel label="Today" caption={vision.todayCaption}>
          <VisionToday />
        </Panel>
        <Panel label="Proposed" caption={vision.proposedCaption}>
          <VisionProposed />
        </Panel>
      </div>

      <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6 lg:mt-18">
        {vision.principles.map((p) => (
          <li key={p.number}>
            <p aria-hidden="true" className="font-mono text-2xl font-light text-royal">
              {p.number}
            </p>
            <h3 className="mt-3 text-lg font-semibold text-ink">
              <span className="sr-only">{p.number} </span>
              {p.title}
            </h3>
            <p className="mt-1 text-body">{p.line}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
