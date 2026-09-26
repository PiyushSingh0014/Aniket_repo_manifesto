import { useEffect, useState } from "react";

/**
 * Scrollspy. Returns the id of the last element whose top has crossed a reading line
 * a third of the way down the area below the fixed nav (topOffset). At the very bottom
 * of the page the last id wins, so short final sections still get highlighted.
 */
export function useActiveSection(ids: readonly string[], topOffset = 64): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = topOffset + (window.innerHeight - topOffset) / 3;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      if (atBottom && current !== null) current = ids[ids.length - 1] ?? current;
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // `key` stands in for `ids`, which callers often pass as a fresh array.
  }, [key, topOffset]);

  return active;
}
