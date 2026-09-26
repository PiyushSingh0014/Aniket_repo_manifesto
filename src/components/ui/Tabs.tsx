import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cx } from "../../lib/cx";

export interface TabItem {
  id: string;
  label: string;
  panel: ReactNode;
}

interface TabsProps {
  /** Unique prefix for element ids */
  idPrefix: string;
  /** Accessible name for the tab list */
  label: string;
  tabs: TabItem[];
  dark?: boolean;
  className?: string;
}

/**
 * WAI-ARIA tabs with automatic activation: Left/Right arrows move and select, Home/End jump.
 * Inactive panels stay mounted (hidden) so demo state survives switching tabs.
 */
export function Tabs({ idPrefix, label, tabs, dark = false, className }: TabsProps) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (index: number) => {
    const next = (index + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    const target = keys[event.key];
    if (target === undefined) return;
    event.preventDefault();
    select(target);
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        className={cx("flex gap-1 overflow-x-auto border-b", dark ? "border-white/15" : "border-line")}
      >
        {tabs.map((tab, i) => {
          const selected = i === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`${idPrefix}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${idPrefix}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cx(
                "-mb-px min-h-11 shrink-0 border-b-2 px-3 font-mono text-xs whitespace-nowrap transition-colors duration-150 sm:px-4",
                dark
                  ? selected
                    ? "border-cyan text-white"
                    : "border-transparent text-white/70 hover:text-white"
                  : selected
                    ? "border-royal text-ink"
                    : "border-transparent text-muted hover:text-ink",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={tab.id}
          id={`${idPrefix}-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`${idPrefix}-tab-${tab.id}`}
          tabIndex={0}
          hidden={i !== active}
          className="animate-fade-in pt-4 focus-visible:outline-offset-4"
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}
