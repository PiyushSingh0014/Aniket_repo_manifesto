import { useState } from "react";
import { divisions, leaderboard, type Division, type LeagueRow } from "../../content/demoLeague";
import { cx } from "../../lib/cx";
import { Tabs } from "../ui/Tabs";

function Sparkline({ row }: { row: LeagueRow }) {
  const w = 280;
  const h = 72;
  const pad = 6;
  const min = Math.min(...row.history);
  const max = Math.max(...row.history);
  const span = Math.max(max - min, 1);
  const points = row.history.map((v, i) => {
    const x = pad + (i * (w - pad * 2)) / Math.max(row.history.length - 1, 1);
    const y = h - pad - ((v - min) * (h - pad * 2)) / span;
    return [x, y] as const;
  });
  const last = points[points.length - 1];

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={`Rating history for ${row.handle}: ${row.history.join(", ")}.`}
      className="block h-auto w-full max-w-[22rem]"
    >
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} strokeWidth="1" className="stroke-white/20" />
      <polyline
        points={points.map(([x, y]) => `${x},${y}`).join(" ")}
        fill="none"
        strokeWidth="1.75"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="stroke-cyan"
      />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" className="fill-ink-2 stroke-cyan" strokeWidth="1.5" />
      ))}
      {last && <circle cx={last[0]} cy={last[1]} r="3.5" className="fill-cyan" />}
    </svg>
  );
}

function DivisionBoard({ division }: { division: Division }) {
  const rows = leaderboard(division);
  const [selected, setSelected] = useState(rows[0]?.handle ?? "");
  const row = rows.find((r) => r.handle === selected) ?? rows[0];

  return (
    <div>
      <div role="region" aria-label={`${division} leaderboard, scrolls sideways`} tabIndex={0} className="overflow-x-auto">
        <table className="w-full min-w-[30rem] text-sm">
          <caption className="sr-only">
            {division} division sample leaderboard. Select a handle to see its rating history.
          </caption>
          <thead>
            <tr className="border-b border-white/15 text-left font-mono text-2xs text-white/70">
              <th scope="col" className="py-2 pr-3 font-normal">
                Rank
              </th>
              <th scope="col" className="py-2 pr-3 font-normal">
                Handle
              </th>
              <th scope="col" className="py-2 pr-3 text-right font-normal">
                Rating
              </th>
              <th scope="col" className="py-2 pr-3 text-right font-normal">
                Change
              </th>
              <th scope="col" className="py-2 text-right font-normal">
                Contests
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const isSelected = r.handle === row?.handle;
              return (
                <tr
                  key={r.handle}
                  className={cx("border-b border-white/10 font-mono", isSelected && "bg-white/[0.07]")}
                >
                  <td className="py-1 pr-3 text-white/70">{r.rank}</td>
                  <td className="py-1 pr-3">
                    <button
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelected(r.handle)}
                      className={cx(
                        "min-h-10 border-l-2 pl-2 text-left transition-colors duration-150",
                        isSelected ? "border-cyan text-white" : "border-transparent text-white/85 hover:text-cyan",
                      )}
                    >
                      {r.handle}
                    </button>
                  </td>
                  <td className="py-1 pr-3 text-right text-white">{r.rating}</td>
                  <td className={cx("py-1 pr-3 text-right", r.change >= 0 ? "text-cyan" : "text-white/70")}>
                    {r.change >= 0 ? `+${r.change}` : `−${Math.abs(r.change)}`}
                  </td>
                  <td className="py-1 text-right text-white/85">{r.contests}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {row && (
        <div key={row.handle} className="animate-fade-in mt-5 rounded-lg border border-white/15 p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-mono text-xs text-white">
              Rating history · <span className="text-cyan">{row.handle}</span>
            </p>
            <p className="font-mono text-2xs text-white/70">
              {row.history[0]} → {row.rating} over {row.contests} contests
            </p>
          </div>
          <div className="mt-3">
            <Sparkline row={row} />
          </div>
        </div>
      )}
    </div>
  );
}

export function LeagueDashboard() {
  return (
    <Tabs
      idPrefix="league-demo"
      label="League divisions"
      dark
      tabs={divisions.map((d) => ({ id: d.toLowerCase(), label: d, panel: <DivisionBoard division={d} /> }))}
    />
  );
}
