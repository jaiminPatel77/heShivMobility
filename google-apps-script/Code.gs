/**
 * Heshiv Mobility — Google Apps Script API Backend
 * Single Spreadsheet CMS Backend for Packages, Blogs, Gallery, FAQs, Testimonials, and Enquiries.
 */

const CONFIG = {
  SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID', // Replace with actual Google Sheet ID
  SHEETS: {
    PACKAGES: 'Packages',
    BLOGS: 'Blogs',
    GALLERY: 'Gallery',
    FAQS: 'FAQs',
    TESTIMONIALS: 'Testimonials',
    ENQUIRIES: 'Enquiries'
  }
};

/**
 * Handles HTTP GET requests for dynamic website content.
 */
function doGet(e) {
  try {
    const action = e ? e.parameter.action : null;
    const slug = e ? e.parameter.slug : null;

    let responseData = null;

    switch (action) {
      case 'packages':
        responseData = getSheetDataAsJson(CONFIG.SHEETS.PACKAGES);
        break;

      case 'package':
        if (!slug) return createJsonResponse(false, 'Slug parameter required', null);
        const packages = getSheetDataAsJson(CONFIG.SHEETS.PACKAGES);
        responseData = packages.find(p => p.Slug === slug && String(p.Active).toUpperCase() === 'TRUE') || null;
        break;

      case 'blogs':
        responseData = getSheetDataAsJson(CONFIG.SHEETS.BLOGS);
        break;

      case 'blog':
        if (!slug) return createJsonResponse(false, 'Slug parameter required', null);
        const blogs = getSheetDataAsJson(CONFIG.SHEETS.BLOGS);
        responseData = blogs.find(b => b.Slug === slug && String(b.Active).toUpperCase() === 'TRUE') || null;
        break;

      case 'gallery':
        responseData = getSheetDataAsJson(CONFIG.SHEETS.GALLERY);
        break;

      case 'faqs':
        responseData = getSheetDataAsJson(CONFIG.SHEETS.FAQS);
        break;

      case 'testimonials':
        responseData = getSheetDataAsJson(CONFIG.SHEETS.TESTIMONIALS);
        break;

      default:
        return createJsonResponse(false, 'Invalid action specified', null);
    }

    return createJsonResponse(true, 'Success', responseData);
  } catch (error) {
    return createJsonResponse(false, 'Server Error: ' + error.toString(), null);
  }
}

/**
 * Handles HTTP POST requests for enquiry form submissions.
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse(false, 'Missing POST body payload', null);
    }

    let payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return createJsonResponse(false, 'Invalid JSON payload', null);
    }

    // 1. Anti-Spam Check: Honeypot Validation
    if (payload.honeypot && String(payload.honeypot).trim() !== '') {
      return createJsonResponse(false, 'Spam submission detected', null);
    }

    // 2. Field Validation
    if (!payload.fullName || !payload.phone || !payload.email) {
      return createJsonResponse(false, 'Missing required fields: fullName, phone, email', null);
    }

    // 3. Sanitization
    const fullName = String(payload.fullName).trim().substring(0, 100);
    const phone = String(payload.phone).trim().substring(0, 20);
    const email = String(payload.email).trim().substring(0, 100);
    const message = payload.message ? String(payload.message).trim().substring(0, 500) : '';

    const enquiryId = 'ENQ-' + new Date().getTime();
    const createdAt = new Date().toISOString();
    const status = 'New';
    const source = 'Website';

    // 4. Append to Enquiries Sheet
    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const sheet = ss.getSheetByName(CONFIG.SHEETS.ENQUIRIES);
    
    sheet.appendRow([
      enquiryId,
      createdAt,
      fullName,
      phone,
      email,
      message,
      status,
      source
    ]);

    return createJsonResponse(true, 'Your enquiry has been received. Our team will contact you shortly.', { enquiryId: enquiryId });
  } catch (error) {
    return createJsonResponse(false, 'Unable to process enquiry: ' + error.toString(), null);
  }
}

/**
 * Utility function to parse a sheet into an array of objects based on header row.
 */
function getSheetDataAsJson(sheetName) {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  const headers = data[0];
  const rows = data.slice(1);

  return rows.map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  }).filter(item => {
    // Filter active items for public endpoints
    return item.Active === undefined || String(item.Active).toUpperCase() === 'TRUE';
  });
}

/**
 * Returns formatted JSON HTTP Response with CORS headers.
 */
function createJsonResponse(success, message, data) {
  const output = JSON.stringify({
    success: success,
    message: message,
    data: data
  });

  return ContentService.createTextOutput(output)
    .setMimeType(ContentService.MimeType.JSON);
}
