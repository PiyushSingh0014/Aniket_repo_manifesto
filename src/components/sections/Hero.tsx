import { Download } from "lucide-react";
import { Fragment } from "react";
import { site } from "../../content/site";
import { Button } from "../ui/Button";

const { hero } = site;

/** Crop-mark ticks just outside the four corners of the drawing frame. */
function CornerTicks() {
  const tick = "absolute bg-ink";
  return (
    <span aria-hidden="true" className="pointer-events-none absolute -inset-3">
      {/* top-left */}
      <span className={`${tick} -top-px -left-4 h-px w-2.5`} />
      <span className={`${tick} -top-4 -left-px h-2.5 w-px`} />
      {/* top-right */}
      <span className={`${tick} -top-px -right-4 h-px w-2.5`} />
      <span className={`${tick} -top-4 -right-px h-2.5 w-px`} />
      {/* bottom-left */}
      <span className={`${tick} -bottom-px -left-4 h-px w-2.5`} />
      <span className={`${tick} -bottom-4 -left-px h-2.5 w-px`} />
      {/* bottom-right */}
      <span className={`${tick} -right-4 -bottom-px h-px w-2.5`} />
      <span className={`${tick} -right-px -bottom-4 h-2.5 w-px`} />
    </span>
  );
}

function Portrait() {
  if (hero.photo) {
    return (
      <img
        src={hero.photo.src}
        width={hero.photo.width}
        height={hero.photo.height}
        alt={hero.photoAlt}
        fetchPriority="high"
        decoding="async"
        className="block h-auto w-full"
      />
    );
  }
  // Until the photograph is added, the frame holds the monogram, drawn like a title block.
  return (
    <div className="bp-grid relative flex aspect-[4/5] w-full items-center justify-center bg-white" role="img" aria-label="Aniket Patil monogram">
      <span className="type-display text-[clamp(4rem,14vw,8rem)] leading-none text-ink">
        A<span className="text-royal">P</span>
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-linear-to-b from-paper to-wash pt-16"
    >
      <div
        aria-hidden="true"
        className="bp-grid absolute inset-0 mask-[linear-gradient(to_bottom,black_0%,black_40%,transparent_92%)]"
      />
      <div className="wrap relative grid grid-cols-12 gap-x-6 pt-10 pb-16 md:pt-14 lg:grid-rows-[auto_auto_1fr] lg:pt-20 lg:pb-28">
        <p className="type-label col-span-12 text-muted lg:col-span-7">{hero.metaLine}</p>

        <h1
          id="hero-title"
          className="type-display col-span-12 mt-4 text-[clamp(3.5rem,11vw,8rem)] leading-[0.9] text-ink lg:col-span-7"
        >
          <span className="block">{hero.firstName}</span>
          <span className="block text-royal">{hero.lastName}</span>
        </h1>

        <figure className="col-span-12 mt-10 lg:col-span-5 lg:col-start-8 lg:row-span-3 lg:row-start-1 lg:mt-2">
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="relative m-3 w-[68%] shrink-0 outline outline-offset-12 outline-ink sm:w-[60%] lg:w-[62%] xl:w-[72%]">
              <CornerTicks />
              <Portrait />
            </div>
            <p
              className="min-w-0 flex-1 -rotate-6 font-hand text-[clamp(0.9rem,3.6vw,1.25rem)] xl:text-[1.375rem] leading-snug text-royal-deep"
            >
              {hero.marginNote}
            </p>
          </div>
          <figcaption className="mt-7 font-mono text-2xs text-muted sm:text-xs">{hero.photoCaption}</figcaption>
        </figure>

        <div className="col-span-12 mt-10 lg:col-span-7 lg:mt-8">
          <p className="text-lg font-semibold text-ink md:text-xl">{hero.subtitle}</p>
          <p className="mt-3 font-mono text-2xs tracking-[0.1em] sm:text-xs sm:tracking-[0.22em] text-ink uppercase">
            {hero.tagline.map((word, i) => (
              <Fragment key={word}>
                {i > 0 && (
                  <>
                    <span aria-hidden="true" className="text-royal-deep">
                      {" | "}
                    </span>
                    <span className="sr-only">, </span>
                  </>
                )}
                {word}
              </Fragment>
            ))}
          </p>
          <p className="mt-6 max-w-[58ch] text-body md:text-lg">{hero.statement}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#manifesto" className="w-full sm:w-auto">
              Explore My Manifesto
            </Button>
            <Button href="#experience" variant="secondary" className="w-full sm:w-auto">
              My Experience
            </Button>
          </div>

          {site.posterUrl && (
            <p className="mt-5">
              <a
                href={site.posterUrl}
                download
                className="inline-flex min-h-11 items-center gap-2 text-sm text-royal-deep underline hover:text-ink"
              >
                <Download aria-hidden="true" size={18} strokeWidth={1.75} />
                {hero.posterLinkLabel}
              </a>
            </p>
          )}

          {site.voteDate && (
            <p className="type-label mt-4 text-ink">Voting on {site.voteDate}</p>
          )}
        </div>
      </div>
    </section>
  );
}
