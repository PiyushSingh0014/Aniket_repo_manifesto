import { useId } from "react";

/** A marker id that is stable between the prerendered HTML and the browser, and safe inside url(#…). */
export function useSvgId(name: string): string {
  return `${name}-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
}

/** Small open arrowhead in the blueprint style. */
export function ArrowMarker({ id, className = "stroke-royal" }: { id: string; className?: string }) {
  return (
    <marker id={id} markerWidth="8" markerHeight="8" refX="6.5" refY="4" orient="auto" markerUnits="userSpaceOnUse">
      <path d="M1,1 L6.5,4 L1,7" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} />
    </marker>
  );
}

interface NodeProps {
  x: number;
  y: number;
  w: number;
  label: string;
  h?: number;
  emphasis?: boolean;
}

export function Node({ x, y, w, label, h = 28, emphasis = false }: NodeProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="3"
        strokeWidth="1.5"
        className={emphasis ? "fill-white stroke-royal" : "fill-white stroke-ink"}
      />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fontSize="11" className="fill-ink font-mono">
        {label}
      </text>
    </g>
  );
}
