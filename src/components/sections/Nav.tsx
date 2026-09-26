import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useActiveSection } from "../../hooks/useActiveSection";
import { cx } from "../../lib/cx";
import { Button } from "../ui/Button";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#vision", label: "Vision" },
  { href: "#manifesto", label: "Manifesto" },
  { href: "#event-app", label: "Event App" },
  { href: "#coding-league", label: "Coding League" },
  { href: "#mentorship", label: "Mentorship" },
  { href: "#contact", label: "Contact" },
];

const observedSections = [
  "home",
  "about",
  "experience",
  "vision",
  "manifesto",
  "event-app",
  "coding-league",
  "new-coders",
  "mentorship",
  "plan",
  "contact",
] as const;

/** Sections without their own nav link borrow the closest one. */
const navFor: Partial<Record<string, string>> = { "new-coders": "coding-league" };

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const activeSection = useActiveSection(observedSections);
  const active = activeSection ? (navFor[activeSection] ?? activeSection) : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the panel if the viewport grows past the breakpoint where the full nav shows.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1280px)");
    const onChange = () => media.matches && setOpen(false);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  // Focus trap, Esc to close, and scroll lock while the menu is open.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const toggle = toggleRef.current;
    if (!panel || !toggle) return;

    const focusables = () => [toggle, ...panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")];
    focusables()[1]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        toggle.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-40 h-16 border-b transition-colors duration-200",
        solid ? "border-line bg-white" : "border-transparent bg-transparent",
      )}
    >
      <nav aria-label="Primary" className="wrap flex h-full items-center justify-between gap-6">
        <a
          href="#home"
          className="type-display flex min-h-11 items-center text-xl text-ink"
          onClick={() => setOpen(false)}
        >
          Aniket Patil
        </a>

        <ul className="hidden items-center gap-5 xl:flex">
          {links.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cx(
                    "relative flex min-h-11 items-center text-sm transition-colors duration-150",
                    "after:absolute after:inset-x-0 after:bottom-2 after:h-0.5 after:origin-left after:bg-royal after:transition-transform after:duration-200",
                    isActive ? "text-ink after:scale-x-100" : "text-body after:scale-x-0 hover:text-ink",
                  )}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Button href="#manifesto">Explore My Manifesto</Button>
          </div>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg border border-ink px-3 text-sm font-semibold text-ink xl:hidden"
          >
            {open ? (
              <X aria-hidden="true" size={18} strokeWidth={1.75} />
            ) : (
              <Menu aria-hidden="true" size={18} strokeWidth={1.75} />
            )}
            {open ? "Close" : "Menu"}
          </button>
        </div>

        <div
          ref={panelRef}
          id="mobile-menu"
          hidden={!open}
          className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-line bg-white xl:hidden"
        >
          <div className="wrap py-6">
            <ul className="border-t border-line">
              {links.map((link) => {
                const isActive = active === link.href.slice(1);
                return (
                  <li key={link.href} className="border-b border-line">
                    <a
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => setOpen(false)}
                      className={cx(
                        "flex min-h-13 items-center justify-between text-lg",
                        isActive ? "font-semibold text-ink" : "text-body",
                      )}
                    >
                      {link.label}
                      {isActive && <span aria-hidden="true" className="h-0.5 w-6 bg-royal" />}
                    </a>
                  </li>
                );
              })}
            </ul>
            <Button href="#manifesto" className="mt-6 w-full" onClick={() => setOpen(false)}>
              Explore My Manifesto
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
