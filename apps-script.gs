// Google Apps Script Web App backing the wedding RSVP form.
// Deploy: Extensions > Apps Script > Deploy > New deployment > Web app
// (Execute as: Me, Who has access: Anyone). The /exec URL goes into App.jsx.

// Column order for the sheet. Keys match the JSON payload sent by App.jsx.
const HEADERS = [
  "Full Name",
  "Email",
  "WhatsApp",
  "Has Plus One",
  "Plus One Name",
  "Relationship With the Couple",
  "Note",
  "Created At",
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    ensureHeaders(sheet);

    // Build the row in the same order as HEADERS.
    const row = HEADERS.map((key) =>
      key === "Created At"
        ? data[key] || new Date().toLocaleString()
        : data[key] || "",
    );

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Writes the header row once, if the sheet is empty.
function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
}
