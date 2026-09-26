import { Bell, CalendarDays, Check, ClipboardCheck, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import {
  demoEvents,
  domains,
  publicStages,
  stages,
  type DemoEvent,
  type Domain,
  type Reimbursement,
} from "../../content/demoEvents";
import { formatOffset, relativeDays, useToday } from "../../hooks/useToday";
import { cx } from "../../lib/cx";
import { Tabs } from "../ui/Tabs";
import { Tag, type TagTone } from "../ui/Tag";

const rupees = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

const reimbursementTone: Record<Reimbursement, TagTone> = {
  Settled: "success",
  Pending: "warning",
  "Not started": "neutral",
  "Awaiting approval": "neutral",
};

function DomainList({ event }: { event: DemoEvent }) {
  return <span className="font-mono text-2xs text-muted">{event.domains.join(" · ")}</span>;
}

/* ------------------------------------------------------------------ */
/* Student view                                                        */
/* ------------------------------------------------------------------ */

interface EventDetailProps {
  event: DemoEvent;
  registered: boolean;
  onRegister: (id: string) => void;
}

function EventDetail({ event, registered, onRegister }: EventDetailProps) {
  const today = useToday();
  const open = event.dayOffset >= 0 && event.deadlineOffset !== null;
  return (
    <div className="animate-fade-in rounded-lg border border-line bg-paper p-4">
      <p className="font-mono text-2xs text-muted">{event.organizer}</p>
      <h4 className="mt-1 text-base font-semibold text-ink">{event.name}</h4>
      <p className="mt-2 text-sm text-body">{event.summary}</p>
      <dl className="mt-3 space-y-1.5 text-sm">
        <div className="flex gap-2">
          <dt className="flex items-center">
            <CalendarDays aria-hidden="true" size={18} strokeWidth={1.75} className="text-royal" />
            <span className="sr-only">Date</span>
          </dt>
          <dd className="text-ink">
            {formatOffset(today, event.dayOffset)}
            <span className="text-muted"> · {relativeDays(event.dayOffset)}</span>
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="flex items-center">
            <MapPin aria-hidden="true" size={18} strokeWidth={1.75} className="text-royal" />
            <span className="sr-only">Venue</span>
          </dt>
          <dd className="text-ink">{event.venue}</dd>
        </div>
        <div className="grid grid-cols-[6.5rem_1fr] gap-2 pt-1">
          <dt className="font-mono text-2xs text-muted">Eligibility</dt>
          <dd className="text-ink">{event.eligibility}</dd>
        </div>
        <div className="grid grid-cols-[6.5rem_1fr] gap-2">
          <dt className="font-mono text-2xs text-muted">Status</dt>
          <dd className="text-ink">{event.stage}</dd>
        </div>
      </dl>

      {open ? (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => onRegister(event.id)}
            disabled={registered}
            className={cx(
              "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors duration-150",
              registered ? "border border-success text-success" : "bg-ink text-white hover:bg-royal-deep",
            )}
          >
            {registered ? (
              <>
                <Check aria-hidden="true" size={18} strokeWidth={1.75} /> Registered (demo)
              </>
            ) : (
              "Register (demo)"
            )}
          </button>
          <p role="status" className="mt-2 min-h-5 text-xs text-muted">
            {registered ? "In the real app, this would confirm your registration." : ""}
          </p>
        </div>
      ) : (
        <p className="mt-4 text-xs text-muted">
          This event has ended. In the real app, its results and resources would be listed here.
        </p>
      )}
    </div>
  );
}

function StudentView() {
  const today = useToday();
  const [filter, setFilter] = useState<Domain | "All">("All");
  const [selectedId, setSelectedId] = useState("git-workshop");
  const [registered, setRegistered] = useState<Set<string>>(() => new Set());

  const visible = useMemo(
    () =>
      demoEvents
        .filter((e) => publicStages.includes(e.stage))
        .filter((e) => filter === "All" || e.domains.includes(filter))
        .sort((a, b) => a.dayOffset - b.dayOffset),
    [filter],
  );
  const upcoming = visible.filter((e) => e.dayOffset >= 0);
  const past = visible.filter((e) => e.dayOffset < 0);
  const selected = demoEvents.find((e) => e.id === selectedId) ?? null;
  const selectedVisible = selected !== null && visible.some((e) => e.id === selected.id);

  const reminders = useMemo(() => {
    const byId = (id: string) => demoEvents.find((e) => e.id === id);
    const items: { text: string; key: string }[] = [];
    const git = byId("git-workshop");
    const codeathon = byId("codeathon");
    const arduino = byId("arduino-lab");
    const ml = byId("ml-circle");
    if (git) items.push({ key: "git", text: `${git.name} starts ${relativeDays(git.dayOffset)}.` });
    if (codeathon?.deadlineOffset != null)
      items.push({
        key: "codeathon",
        text: `Registration for ${codeathon.name} closes ${relativeDays(codeathon.deadlineOffset)}.`,
      });
    if (arduino) items.push({ key: "arduino", text: `Newly approved: ${arduino.name}.` });
    if (ml) items.push({ key: "ml", text: `Resources posted for ${ml.name}.` });
    return items;
  }, []);

  const register = (id: string) =>
    setRegistered((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });

  const renderItem = (event: DemoEvent) => {
    const isSelected = selectedVisible && selected?.id === event.id;
    return (
      <li key={event.id}>
        <button
          type="button"
          aria-pressed={isSelected}
          onClick={() => setSelectedId(event.id)}
          className={cx(
            "w-full rounded-lg border bg-white p-3 text-left transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-royal",
            isSelected ? "border-royal ring-1 ring-royal" : "border-line",
          )}
        >
          <span className="flex items-start justify-between gap-3">
            <span className="text-sm font-semibold text-ink">{event.name}</span>
            {registered.has(event.id) && <Tag tone="success">Registered</Tag>}
          </span>
          <span className="mt-1 block">
            <DomainList event={event} />
          </span>
          <span className="mt-2 grid gap-x-4 gap-y-0.5 font-mono text-2xs text-body sm:grid-cols-2">
            <span>Date: {formatOffset(today, event.dayOffset)}</span>
            <span>Venue: {event.venue}</span>
            <span>
              Register by:{" "}
              {event.deadlineOffset === null ? "Closed" : formatOffset(today, event.deadlineOffset)}
            </span>
            <span>Eligibility: {event.eligibility}</span>
          </span>
        </button>
        {isSelected && (
          <div className="mt-2 lg:hidden">
            <EventDetail key={event.id} event={event} registered={registered.has(event.id)} onRegister={register} />
          </div>
        )}
      </li>
    );
  };

  return (
    <div>
      <div role="group" aria-label="Filter events by domain" className="flex flex-wrap gap-1.5">
        {(["All", ...domains] as const).map((d) => (
          <button
            key={d}
            type="button"
            aria-pressed={filter === d}
            onClick={() => setFilter(d)}
            className={cx(
              "min-h-11 rounded-full border px-3 font-mono text-2xs transition-colors duration-150 sm:min-h-9",
              filter === d ? "border-ink bg-ink text-white" : "border-line bg-white text-body hover:border-royal",
            )}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-12">
        {/* Event list */}
        <div className="lg:col-span-5">
          <p className="font-mono text-2xs text-muted">Only approved events appear here.</p>
          {upcoming.length > 0 && <ul className="mt-2 space-y-2">{upcoming.map(renderItem)}</ul>}
          {past.length > 0 && (
            <>
              <p className="mt-4 font-mono text-2xs text-muted">Past events</p>
              <ul className="mt-2 space-y-2">{past.map(renderItem)}</ul>
            </>
          )}
          {visible.length === 0 && (
            <p className="mt-3 rounded-lg border border-dashed border-line p-4 text-sm text-muted">
              No sample events in this domain yet.
            </p>
          )}
        </div>

        {/* Detail panel: its own column on large screens, inline under the selected event on small ones */}
        <div className="hidden lg:col-span-4 lg:block">
          {selected && selectedVisible ? (
            <EventDetail key={selected.id} event={selected} registered={registered.has(selected.id)} onRegister={register} />
          ) : (
            <p className="rounded-lg border border-dashed border-line p-4 text-sm text-muted">
              Select an event to see its details.
            </p>
          )}
        </div>

        {/* Reminders */}
        <div className="lg:col-span-3">
          <p className="flex items-center gap-2 font-mono text-2xs text-muted">
            <Bell aria-hidden="true" size={16} strokeWidth={1.75} className="text-royal" /> Reminders
          </p>
          <ul className="mt-2 divide-y divide-line rounded-lg border border-line bg-white">
            {reminders.map((r) => (
              <li key={r.key} className="px-3 py-2.5 text-xs text-body">
                {r.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Organizer view                                                      */
/* ------------------------------------------------------------------ */

function OrganizerView() {
  const today = useToday();
  const [selectedId, setSelectedId] = useState("git-workshop");
  const [tasks, setTasks] = useState<Record<string, boolean[]>>(() =>
    Object.fromEntries(demoEvents.map((e) => [e.id, e.tasks.map((t) => t.done)])),
  );
  const selected = demoEvents.find((e) => e.id === selectedId) ?? demoEvents[0]!;
  const done = tasks[selected.id] ?? [];

  const toggleTask = (index: number) =>
    setTasks((prev) => {
      const list = [...(prev[selected.id] ?? [])];
      list[index] = !list[index];
      return { ...prev, [selected.id]: list };
    });

  return (
    <div>
      <p className="font-mono text-2xs text-muted">Status board · select an event to open it</p>
      <div
        role="region"
        aria-label="Status board, scrolls sideways"
        tabIndex={0}
        className="mt-2 overflow-x-auto rounded-lg border border-line bg-paper"
      >
        <ol className="grid min-w-[62rem] grid-cols-7 divide-x divide-line">
          {stages.map((stage) => {
            const events = demoEvents.filter((e) => e.stage === stage);
            return (
              <li key={stage} className="p-2">
                <p className="flex min-h-10 items-start justify-between gap-1 font-mono text-2xs leading-tight text-ink">
                  <span>{stage}</span>
                  <span className="text-muted">{events.length}</span>
                </p>
                <ul className="mt-1 space-y-1.5">
                  {events.map((e) => (
                    <li key={e.id}>
                      <button
                        type="button"
                        aria-pressed={e.id === selected.id}
                        onClick={() => setSelectedId(e.id)}
                        className={cx(
                          "w-full rounded-md border bg-white p-2 text-left text-xs transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-royal",
                          e.id === selected.id ? "border-royal ring-1 ring-royal" : "border-line",
                        )}
                      >
                        <span className="block font-semibold text-ink">{e.name}</span>
                        <span className="mt-0.5 block font-mono text-2xs text-muted">{e.organizer}</span>
                      </button>
                    </li>
                  ))}
                  {events.length === 0 && <li className="px-1 font-mono text-2xs text-muted">None</li>}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>

      <div key={selected.id} className="animate-fade-in mt-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h4 className="text-base font-semibold text-ink">{selected.name}</h4>
          <p className="font-mono text-2xs text-muted">
            {selected.organizer} · {formatOffset(today, selected.dayOffset)} · {selected.stage}
          </p>
        </div>

        <div className="mt-3 grid gap-4 lg:grid-cols-3">
          {/* Checklist */}
          <fieldset className="rounded-lg border border-line p-3">
            <legend className="flex items-center gap-1.5 px-1 font-mono text-2xs text-muted">
              <ClipboardCheck aria-hidden="true" size={16} strokeWidth={1.75} className="text-royal" /> Task checklist
            </legend>
            <ul className="space-y-1">
              {selected.tasks.map((task, i) => (
                <li key={task.label}>
                  <label className="flex min-h-10 cursor-pointer items-start gap-2.5 py-1 text-sm">
                    <input
                      type="checkbox"
                      checked={done[i] ?? false}
                      onChange={() => toggleTask(i)}
                      className="mt-0.5 size-4 shrink-0 accent-royal"
                    />
                    <span className={cx(done[i] ? "text-muted line-through" : "text-ink")}>
                      {task.label}
                      {task.overdue && !done[i] && (
                        <Tag tone="danger" className="ml-2 align-middle">
                          Overdue
                        </Tag>
                      )}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>

          {/* Budget */}
          <div className="rounded-lg border border-line p-3">
            <table className="w-full text-sm">
              <caption className="pb-2 text-left font-mono text-2xs text-muted">Budget</caption>
              <tbody className="divide-y divide-line">
                <tr>
                  <th scope="row" className="py-2 text-left font-normal text-body">
                    Allocated
                  </th>
                  <td className="py-2 text-right font-mono text-ink">
                    {selected.budget.allocated === null ? "Not yet" : rupees.format(selected.budget.allocated)}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="py-2 text-left font-normal text-body">
                    Spent
                  </th>
                  <td className="py-2 text-right font-mono text-ink">{rupees.format(selected.budget.spent)}</td>
                </tr>
                <tr>
                  <th scope="row" className="py-2 text-left font-normal text-body">
                    Prize money
                  </th>
                  <td className="py-2 text-right font-mono text-ink">{rupees.format(selected.budget.prize)}</td>
                </tr>
                <tr>
                  <th scope="row" className="py-2 text-left font-normal text-body">
                    Reimbursement
                  </th>
                  <td className="py-2 text-right">
                    <Tag tone={reimbursementTone[selected.budget.reimbursement]}>
                      {selected.budget.reimbursement}
                    </Tag>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Audit trail */}
          <div className="rounded-lg border border-line p-3">
            <p className="font-mono text-2xs text-muted">Audit trail</p>
            <ol className="mt-2 space-y-2 border-l border-line pl-3">
              {selected.audit.map((entry) => (
                <li key={entry.text} className="text-sm">
                  <span className="text-ink">{entry.text}</span>
                  <span className="font-mono text-2xs text-muted"> · {entry.when}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EventAppDemo() {
  return (
    <Tabs
      idPrefix="event-demo"
      label="Event app views"
      tabs={[
        { id: "student", label: "Student view", panel: <StudentView /> },
        { id: "organizer", label: "Organizer view", panel: <OrganizerView /> },
      ]}
    />
  );
}
