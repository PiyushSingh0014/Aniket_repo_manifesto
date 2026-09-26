import { ArrowMarker, Node, useSvgId } from "./svg";

/** A dashed connector that stops short, with a small break mark where it gives up. */
function BrokenLink({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const s = 3.5;
  return (
    <g className="stroke-royal" strokeWidth="1.5" strokeLinecap="round">
      <line x1={x1} y1={y1} x2={x2} y2={y2} strokeDasharray="4 5" />
      <line x1={x2 - s} y1={y2 - s} x2={x2 + s} y2={y2 + s} />
      <line x1={x2 - s} y1={y2 + s} x2={x2 + s} y2={y2 - s} />
    </g>
  );
}

export function VisionToday() {
  return (
    <svg
      viewBox="0 0 320 236"
      role="img"
      aria-label="Today: ideas, clubs, events, budgets, feedback and opportunities sit apart, with broken links between them."
      className="block h-auto w-full"
    >
      <BrokenLink x1={78} y1={33} x2={140} y2={26} />
      <BrokenLink x1={232} y1={36} x2={247} y2={62} />
      <BrokenLink x1={44} y1={48} x2={50} y2={80} />
      <BrokenLink x1={96} y1={124} x2={164} y2={114} />
      <BrokenLink x1={70} y1={140} x2={98} y2={166} />
      <BrokenLink x1={272} y1={120} x2={268} y2={150} />

      <Node x={14} y={20} w={64} label="Ideas" />
      <Node x={188} y={8} w={64} label="Clubs" />
      <Node x={236} y={92} w={70} label="Events" />
      <Node x={20} y={112} w={76} label="Budgets" />
      <Node x={104} y={196} w={84} label="Feedback" />
      <Node x={204} y={186} w={108} label="Opportunities" />
    </svg>
  );
}

export function VisionProposed() {
  const arrow = useSvgId("vision-arrow");
  const columns = [56, 160, 264];
  return (
    <svg
      viewBox="0 0 320 236"
      role="img"
      aria-label="Proposed: the same six parts connect through one shared spine made of a shared calendar, an event tracker and an opportunities board."
      className="block h-auto w-full"
    >
      <defs>
        <ArrowMarker id={arrow} />
      </defs>

      {columns.map((x) => (
        <g key={x} className="stroke-royal" strokeWidth="1.5">
          <line x1={x} y1={40} x2={x} y2={93} markerEnd={`url(#${arrow})`} />
          <line x1={x} y1={200} x2={x} y2={149} markerEnd={`url(#${arrow})`} />
        </g>
      ))}

      <Node x={6} y={12} w={100} label="Ideas" />
      <Node x={110} y={12} w={100} label="Clubs" />
      <Node x={214} y={12} w={100} label="Events" />

      <rect x={6} y={94} width={308} height={54} rx="3" strokeWidth="1.5" className="fill-white stroke-royal" />
      <text x={160} y={117} textAnchor="middle" fontSize="11.5" className="fill-ink font-mono font-semibold">
        Shared calendar · Event tracker
      </text>
      <text x={160} y={134} textAnchor="middle" fontSize="11.5" className="fill-ink font-mono font-semibold">
        · Opportunities board
      </text>

      <Node x={6} y={200} w={100} label="Budgets" />
      <Node x={110} y={200} w={100} label="Feedback" />
      <Node x={214} y={200} w={100} label="Opportunities" />
    </svg>
  );
}
