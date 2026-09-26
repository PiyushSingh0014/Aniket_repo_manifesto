/**
 * Sends a suggestion as JSON to the endpoint in VITE_FORM_ENDPOINT.
 *
 * Works with:
 * - Formspree        https://formspree.io/f/<id>
 * - Web3Forms        https://api.web3forms.com/submit   (also set VITE_FORM_ACCESS_KEY)
 * - Google Apps Script web app writing to a Google Sheet (see docs/google-apps-script.js)
 */

export interface Suggestion {
  category: string;
  suggestion: string;
  name: string;
  email: string;
  quoteConsent: boolean;
}

export const formEndpoint: string = (import.meta.env.VITE_FORM_ENDPOINT ?? "").trim();
const accessKey: string = (import.meta.env.VITE_FORM_ACCESS_KEY ?? "").trim();

export async function submitSuggestion(data: Suggestion): Promise<void> {
  if (!formEndpoint) throw new Error("The suggestion form isn't connected yet.");

  const payload: Record<string, string | boolean> = {
    subject: `Campaign suggestion: ${data.category}`,
    category: data.category,
    suggestion: data.suggestion,
    name: data.name,
    email: data.email,
    quote_publicly_without_name: data.quoteConsent,
  };
  if (accessKey) payload.access_key = accessKey;

  // Apps Script cannot answer a CORS preflight, so send it as a "simple" request.
  // The body is still JSON; the script reads it from e.postData.contents.
  const isAppsScript = /script\.google(usercontent)?\.com/.test(formEndpoint);

  const response = await fetch(formEndpoint, {
    method: "POST",
    headers: isAppsScript
      ? { "Content-Type": "text/plain;charset=utf-8" }
      : { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error(`The form service returned ${response.status}.`);

  // Some services answer 200 with an error in the body.
  const body: unknown = await response.json().catch(() => null);
  if (body && typeof body === "object") {
    const b = body as Record<string, unknown>;
    if (b.success === false || b.ok === false || b.result === "error") {
      throw new Error(typeof b.message === "string" ? b.message : "The form service rejected the submission.");
    }
  }
}
