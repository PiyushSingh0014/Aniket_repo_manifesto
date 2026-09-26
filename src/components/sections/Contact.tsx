import { ArrowUpRight, CircleAlert, Mail, RotateCcw } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { activeLinks, site } from "../../content/site";
import { cx } from "../../lib/cx";
import { formEndpoint, submitSuggestion, type Suggestion } from "../../lib/submitSuggestion";
import { Button } from "../ui/Button";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

const { contact } = site;
const MIN = 20;
const MAX = 1000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = "idle" | "submitting" | "success" | "error";
type Field = "category" | "suggestion" | "email";
type Errors = Partial<Record<Field, string>>;

const empty: Suggestion = { category: "", suggestion: "", name: "", email: "", quoteConsent: false };

function validate(values: Suggestion): Errors {
  const errors: Errors = {};
  if (!values.category) errors.category = "Choose a category.";
  const length = values.suggestion.trim().length;
  if (length < MIN) errors.suggestion = `Write at least ${MIN} characters (${length} so far).`;
  else if (length > MAX) errors.suggestion = `Keep it under ${MAX.toLocaleString("en-IN")} characters.`;
  if (values.email.trim() && !EMAIL.test(values.email.trim())) errors.email = "Enter a valid email, or leave it empty.";
  return errors;
}

const inputBase =
  "block w-full rounded-lg border bg-white px-3 text-base text-ink transition-colors duration-150 placeholder:text-muted focus-visible:border-royal";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-sm text-danger">
      <CircleAlert aria-hidden="true" size={16} strokeWidth={1.75} className="shrink-0" />
      {message}
    </p>
  );
}

export function Contact() {
  const [values, setValues] = useState<Suggestion>(empty);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [announcement, setAnnouncement] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  const connected = formEndpoint !== "";
  const email = site.links.email.trim();
  const links = activeLinks();
  const count = values.suggestion.length;

  const update = <K extends keyof Suggestion>(key: K, value: Suggestion[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (attempted) setErrors(validate(next));
  };

  const send = async () => {
    setStatus("submitting");
    setAnnouncement("Sending your suggestion.");
    try {
      // Bots fill the hidden field; people never see it. Pretend it worked and send nothing.
      if (!honeypot) {
        await submitSuggestion({
          ...values,
          suggestion: values.suggestion.trim(),
          name: values.name.trim(),
          email: values.email.trim(),
        });
      }
      setStatus("success");
      setAnnouncement("");
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setStatus("error");
      setAnnouncement("Your suggestion didn't go through.");
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!connected || status === "submitting") return;
    setAttempted(true);
    const found = validate(values);
    setErrors(found);
    const fields = Object.keys(found) as Field[];
    if (fields.length > 0) {
      setAnnouncement(`Please fix ${fields.length === 1 ? "1 field" : `${fields.length} fields`}.`);
      formRef.current?.querySelector<HTMLElement>(`#field-${fields[0]}`)?.focus();
      return;
    }
    void send();
  };

  const reset = () => {
    setValues(empty);
    setHoneypot("");
    setErrors({});
    setAttempted(false);
    setStatus("idle");
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("#field-category")?.focus());
  };

  const describedBy = (...ids: Array<string | false>) => ids.filter(Boolean).join(" ") || undefined;

  return (
    <Section id="contact" labelledBy="contact-title" tone="white">
      <SectionHeader id="contact-title" copy={contact.section} />

      <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-12 lg:mt-12">
        <div className="col-span-12 lg:col-span-7">
          <p aria-live="polite" className="sr-only">
            {announcement}
          </p>

          {status === "success" ? (
            <div className="rounded-lg border border-ink/30 bg-paper p-6">
              <h3 ref={successRef} tabIndex={-1} className="text-lg font-semibold text-ink">
                Thanks. Your suggestion has reached me.
              </h3>
              <Button variant="secondary" className="mt-5" onClick={reset}>
                Send another
              </Button>
            </div>
          ) : (
            <form ref={formRef} noValidate onSubmit={onSubmit} className="space-y-6">
              <div>
                <label htmlFor="field-category" className="block text-sm font-medium text-ink">
                  Category <span className="text-muted">(required)</span>
                </label>
                <select
                  id="field-category"
                  name="category"
                  required
                  value={values.category}
                  onChange={(e) => update("category", e.target.value)}
                  aria-invalid={errors.category ? true : undefined}
                  aria-describedby={describedBy(!!errors.category && "error-category")}
                  className={cx(inputBase, "mt-1.5 min-h-11", errors.category ? "border-danger" : "border-line")}
                >
                  <option value="">Choose one</option>
                  {contact.categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <FieldError id="error-category" message={errors.category} />
              </div>

              <div>
                <label htmlFor="field-suggestion" className="block text-sm font-medium text-ink">
                  Suggestion <span className="text-muted">(required)</span>
                </label>
                <textarea
                  id="field-suggestion"
                  name="suggestion"
                  required
                  rows={6}
                  minLength={MIN}
                  maxLength={MAX}
                  value={values.suggestion}
                  onChange={(e) => update("suggestion", e.target.value)}
                  aria-invalid={errors.suggestion ? true : undefined}
                  aria-describedby={describedBy("hint-suggestion", !!errors.suggestion && "error-suggestion")}
                  className={cx(inputBase, "mt-1.5 py-2.5", errors.suggestion ? "border-danger" : "border-line")}
                />
                <div className="mt-1.5 flex justify-between gap-4 font-mono text-2xs text-muted">
                  <span id="hint-suggestion">
                    {MIN} to {MAX.toLocaleString("en-IN")} characters.
                  </span>
                  <span aria-hidden="true">
                    {count.toLocaleString("en-IN")} / {MAX.toLocaleString("en-IN")}
                  </span>
                </div>
                <FieldError id="error-suggestion" message={errors.suggestion} />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="field-name" className="block text-sm font-medium text-ink">
                    Name <span className="text-muted">(optional)</span>
                  </label>
                  <input
                    id="field-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={cx(inputBase, "mt-1.5 min-h-11 border-line")}
                  />
                </div>
                <div>
                  <label htmlFor="field-email" className="block text-sm font-medium text-ink">
                    Email <span className="text-muted">(optional)</span>
                  </label>
                  <input
                    id="field-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => update("email", e.target.value)}
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={describedBy(!!errors.email && "error-email")}
                    className={cx(inputBase, "mt-1.5 min-h-11", errors.email ? "border-danger" : "border-line")}
                  />
                  <FieldError id="error-email" message={errors.email} />
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-3 text-sm text-body">
                <input
                  type="checkbox"
                  name="quoteConsent"
                  checked={values.quoteConsent}
                  onChange={(e) => update("quoteConsent", e.target.checked)}
                  className="mt-0.5 size-5 shrink-0 accent-royal"
                />
                You may quote my suggestion publicly, without my name.
              </label>

              <div className="honeypot" aria-hidden="true">
                <label>
                  Leave this field empty
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </label>
              </div>

              {status === "error" && (
                <div role="alert" className="rounded-lg border border-danger/40 p-4 text-sm">
                  <p className="flex items-center gap-2 font-semibold text-danger">
                    <CircleAlert aria-hidden="true" size={18} strokeWidth={1.75} />
                    Your suggestion didn't go through.
                  </p>
                  <p className="mt-1 text-body">
                    Nothing you typed was lost. Please try again.
                    {email && (
                      <>
                        {" "}
                        You can also email me at{" "}
                        <a href={`mailto:${email}`} className="text-royal-deep underline hover:text-ink">
                          {email}
                        </a>
                        .
                      </>
                    )}
                  </p>
                  <Button variant="secondary" className="mt-3" onClick={() => void send()}>
                    <RotateCcw aria-hidden="true" size={16} strokeWidth={1.75} /> Retry
                  </Button>
                </div>
              )}

              <div>
                {status !== "error" && (
                  <Button
                    type="submit"
                    disabled={!connected || status === "submitting"}
                    aria-describedby={connected ? undefined : "form-offline"}
                    className="w-full sm:w-auto"
                  >
                    {status === "submitting" ? "Sending…" : "Send suggestion"}
                  </Button>
                )}
                {!connected && (
                  <p id="form-offline" className="mt-3 text-sm text-muted">
                    The suggestion form isn't connected yet.
                    {email && (
                      <>
                        {" "}
                        Until it is, you can{" "}
                        <a href={`mailto:${email}`} className="text-royal-deep underline hover:text-ink">
                          email your suggestion
                        </a>
                        .
                      </>
                    )}
                  </p>
                )}
              </div>
            </form>
          )}
        </div>

        <div className="col-span-12 space-y-10 lg:col-span-4 lg:col-start-9">
          <div className="rounded-lg border border-line bg-paper p-5">
            <h3 className="type-label text-ink">{contact.privacyTitle}</h3>
            <p className="mt-3 text-sm text-body">
              {contact.privacy}
              {contact.formServiceName && ` Submissions are processed by ${contact.formServiceName}.`}
            </p>
          </div>

          {links.length > 0 && (
            <div>
              <h3 className="type-label text-ink">{contact.linksTitle}</h3>
              <ul className="mt-3 border-t border-line">
                {links.map((link) => (
                  <li key={link.key} className="border-b border-line">
                    <a
                      href={link.href}
                      {...(link.key === "email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                      className="flex min-h-12 items-center justify-between gap-4 text-sm text-ink hover:text-royal-deep"
                    >
                      <span className="flex items-center gap-2">
                        {link.key === "email" && (
                          <Mail aria-hidden="true" size={18} strokeWidth={1.75} className="text-royal" />
                        )}
                        {link.label}
                      </span>
                      <span className="flex min-w-0 items-center gap-1.5 font-mono text-2xs text-muted">
                        <span className="truncate">{link.display}</span>
                        {link.key !== "email" && (
                          <>
                            <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.75} />
                            <span className="sr-only">(opens in a new tab)</span>
                          </>
                        )}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
