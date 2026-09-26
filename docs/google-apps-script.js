/**
 * Google Sheets backend for the suggestion form.
 *
 * Setup (about 5 minutes):
 * 1. Create a Google Sheet. Keep its sharing private: only you should be able to open it.
 * 2. In the Sheet: Extensions → Apps Script. Replace everything in Code.gs with this file.
 * 3. Deploy → New deployment → type "Web app".
 *      Execute as: Me
 *      Who has access: Anyone
 *    Click Deploy, authorize, and copy the Web app URL (ends in /exec).
 * 4. In Vercel → Project → Settings → Environment Variables, set
 *      VITE_FORM_ENDPOINT = <that /exec URL>
 *    then redeploy. In src/content/site.ts set contact.formServiceName to "Google Sheets".
 *
 * The site sends the JSON as text/plain (Apps Script cannot answer CORS preflight requests),
 * so it is read from e.postData.contents below.
 */

const SHEET_NAME = "Suggestions";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Received", "Category", "Suggestion", "Name", "Email", "May quote without name"]);
    }
    sheet.appendRow([
      new Date(),
      clean(data.category, 40),
      clean(data.suggestion, 1000),
      clean(data.name, 100),
      clean(data.email, 200),
      data.quote_publicly_without_name === true ? "Yes" : "No",
    ]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, message: "Could not save the suggestion." });
  }
}

/** Trim to a maximum length and stop text from being run as a spreadsheet formula. */
function clean(value, max) {
  const text = String(value || "").slice(0, max);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
