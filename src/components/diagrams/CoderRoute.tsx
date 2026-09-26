import { cx } from "../../lib/cx";
import { DashList } from "../ui/DashList";

interface Stop {
  number: string;
  title: string;
  points: string[];
}

/**
 * A four-stop route drawn like a transit line: a heavy royal line with ringed stations.
 * Horizontal on large screens, vertical below 1024px. No durations or progress.
 */
export function CoderRoute({ stops }: { stops: Stop[] }) {
  return (
    <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6">
      {stops.map((stop, i) => {
        const last = i === stops.length - 1;
        return (
          <li key={stop.number} className="relative pl-10 lg:pt-12 lg:pl-0">
            {/* Line segment to the next station */}
            {!last && (
              <span
                aria-hidden="true"
                className={cx(
                  "absolute bg-royal",
                  "top-4 -bottom-10 left-[9px] w-1",
                  "lg:top-[9px] lg:right-[-1.5rem] lg:bottom-auto lg:left-5 lg:h-1 lg:w-auto",
                )}
              />
            )}
            {/* Station */}
            <span
              aria-hidden="true"
              className="absolute top-0.5 left-0 size-[22px] rounded-full border-[3px] border-ink bg-white lg:top-0"
            />
            <p className="type-label text-royal-deep">{stop.number}</p>
            <h3 className="mt-1 text-lg font-semibold text-ink">{stop.title}</h3>
            <DashList items={stop.points} className="mt-4" itemClassName="text-sm md:text-base" />
          </li>
        );
      })}
    </ol>
  );
}
