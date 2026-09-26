import { useEffect, useState } from "react";

/**
 * Today's date, available only after the page has mounted in the browser.
 * The prerendered HTML has no date, so the server and client markup always match.
 */
export function useToday(): Date | null {
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    setToday(now);
  }, []);
  return today;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatOffset(today: Date | null, days: number): string {
  if (!today) return "…";
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  return `${WEEKDAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

export function relativeDays(days: number): string {
  if (days === 0) return "today";
  if (days === 1) return "tomorrow";
  if (days === -1) return "yesterday";
  return days > 0 ? `in ${days} days` : `${-days} days ago`;
}
