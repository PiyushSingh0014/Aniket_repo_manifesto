import { ArrowMarker, useSvgId } from "./svg";

interface Stage {
  label: string;
  /** Label split for the horizontal layout */
  lines: string[];
  note: string[];
}

const stages: Stage[] = [
  { label: "Proposed", lines: ["Proposed"], note: [] },
  { label: "Submitted for approval", lines: ["Submitted", "for approval"], note: [] },
  { label: "Approved", lines: ["Approved"], note: ["budget and owner", "assigned here"] },
  { label: "Scheduled", lines: ["Scheduled"], note: [] },
  { label: "Live", lines: ["Live"], note: [] },
  {
    label: "Report and feedback filed",
    lines: ["Report and", "feedback filed"],
    note: ["results, spending and", "feedback recorded here"],
  },
  { label: "Archived", lines: ["Archived"], note: [] },
];

const description =
  "Event lifecycle: " +
  stages
    .map((s) => (s.note.length ? `${s.label} (${s.note.join(" ")})` : s.label))
    .join(", then ") +
  ".";

function Horizontal() {
  const arrow = useSvgId("lifecycle-h");
  const x = (i: number) => 60 + i * 148;
  const lineY = 64;
  return (
    <svg viewBox="0 0 1008 184" role="img" aria-label={description} className="block h-auto w-full">
      <defs>
        <ArrowMarker id={arrow} className="stroke-ink" />
      </defs>
      {stages.slice(0, -1).map((_, i) => (
        <line
          key={i}
          x1={x(i) + 12}
          y1={lineY}
          x2={x(i + 1) - 13}
          y2={lineY}
          strokeWidth="1.5"
          className="stroke-ink"
          markerEnd={`url(#${arrow})`}
        />
      ))}
      {stages.map((stage, i) => {
        const cx = x(i);
        const noted = stage.note.length > 0;
        return (
          <g key={stage.label}>
            <text x={cx} y={36} textAnchor="middle" fontSize="11" className="fill-muted font-mono">
              {String(i + 1).padStart(2, "0")}
            </text>
            <circle
              cx={cx}
              cy={lineY}
              r="8"
              strokeWidth="1.5"
              className={noted ? "fill-royal stroke-royal" : "fill-white stroke-ink"}
            />
            {stage.lines.map((line, j) => (
              <text key={line} x={cx} y={98 + j * 16} textAnchor="middle" fontSize="12" className="fill-ink font-mono">
                {line}
              </text>
            ))}
            {noted && (
              <>
                <line
                  x1={cx}
                  y1={98 + stage.lines.length * 16 - 4}
                  x2={cx}
                  y2={140}
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  className="stroke-royal"
                />
                {stage.note.map((line, j) => (
                  <text
                    key={line}
                    x={cx}
                    y={156 + j * 15}
                    textAnchor="middle"
                    fontSize="11"
                    className="fill-royal-deep font-mono"
                  >
                    {line}
                  </text>
                ))}
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function Vertical() {
  const arrow = useSvgId("lifecycle-v");
  // Narrow screens: notes are re-flowed into lines that fit 320 units
  const notes: Record<string, string[]> = {
    Approved: ["↳ budget and owner assigned here"],
    "Report and feedback filed": ["↳ results, spending and feedback", "  recorded here"],
  };
  const ys: number[] = [];
  let y = 24;
  for (const stage of stages) {
    ys.push(y);
    y += 56 + 16 * (notes[stage.label]?.length ?? 0);
  }
  const height = (ys[ys.length - 1] ?? 0) + 28;
  const lineX = 20;

  return (
    <svg viewBox={`0 0 320 ${height}`} role="img" aria-label={description} className="block h-auto w-full">
      <defs>
        <ArrowMarker id={arrow} className="stroke-ink" />
      </defs>
      {ys.slice(0, -1).map((y0, i) => (
        <line
          key={i}
          x1={lineX}
          y1={y0 + 11}
          x2={lineX}
          y2={(ys[i + 1] ?? 0) - 12}
          strokeWidth="1.5"
          className="stroke-ink"
          markerEnd={`url(#${arrow})`}
        />
      ))}
      {stages.map((stage, i) => {
        const cy = ys[i] ?? 0;
        const noted = stage.note.length > 0;
        return (
          <g key={stage.label}>
            <circle
              cx={lineX}
              cy={cy}
              r="7"
              strokeWidth="1.5"
              className={noted ? "fill-royal stroke-royal" : "fill-white stroke-ink"}
            />
            <text x={44} y={cy + 4} fontSize="11" className="fill-muted font-mono">
              {String(i + 1).padStart(2, "0")}
            </text>
            <text x={70} y={cy + 4} fontSize="12" className="fill-ink font-mono">
              {stage.label}
            </text>
            {(notes[stage.label] ?? []).map((line, j) => (
              <text
                key={line}
                x={70}
                y={cy + 22 + j * 15}
                fontSize="11"
                className="fill-royal-deep font-mono"
                xmlSpace="preserve"
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/** Horizontal on large screens, vertical below 1024px. */
export function EventLifecycle() {
  return (
    <>
      <div className="hidden lg:block">
        <Horizontal />
      </div>
      <div className="max-w-[26rem] lg:hidden">
        <Vertical />
      </div>
    </>
  );
}
