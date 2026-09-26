import { Fragment } from "react";
import { site } from "../../content/site";

const links = [
  { href: "#manifesto", label: "Manifesto" },
  { href: "#experience", label: "Experience" },
  { href: "#event-app", label: "Event App" },
  { href: "#coding-league", label: "Coding League" },
  { href: "#mentorship", label: "Mentorship" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  const [name, ...rest] = site.footer.line;
  return (
    <footer className="on-dark bg-ink text-white">
      <div className="wrap py-14 lg:py-18">
        <p className="text-sm text-white/85">
          <span className="type-display text-lg text-white">{name}</span>
          {rest.map((part) => (
            <Fragment key={part}>
              <span aria-hidden="true" className="px-2 text-cyan">
                ·
              </span>
              <span className="sr-only">, </span>
              {part}
            </Fragment>
          ))}
        </p>
        <p className="mt-4 font-mono text-2xs tracking-[0.1em] sm:text-xs sm:tracking-[0.22em] text-cyan uppercase">
          {site.hero.tagline.map((word, i) => (
            <Fragment key={word}>
              {i > 0 && (
                <>
                  <span aria-hidden="true" className="text-white/50">
                    {" | "}
                  </span>
                  <span className="sr-only">, </span>
                </>
              )}
              {word}
            </Fragment>
          ))}
        </p>

        <nav aria-label="Footer" className="mt-10 border-t border-white/15 pt-6">
          <ul className="flex flex-wrap gap-x-6">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="flex min-h-11 items-center text-sm text-white/85 hover:text-cyan">
                  {link.label}
                </a>
              </li>
            ))}
            {site.links.repo && (
              <li>
                <a
                  href={site.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center text-sm text-white/85 hover:text-cyan"
                >
                  Source on GitHub<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            )}
          </ul>
        </nav>

        <p className="mt-6 max-w-[62ch] text-xs text-white/70">{site.footer.smallPrint}</p>
      </div>
    </footer>
  );
}
