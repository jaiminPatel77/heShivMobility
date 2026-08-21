# Heshiv Mobility — Google Apps Script & Google Sheets Setup Guide

This guide explains how to set up the single Google Sheet database and Google Apps Script Web App for **Heshiv Mobility**.

---

## 1. Create Google Sheet

1. Create a new Google Sheet titled **`Heshiv Mobility - Website CMS`**.
2. Create exactly 6 tabs with the exact names:
   - `Packages`
   - `Blogs`
   - `Gallery`
   - `FAQs`
   - `Testimonials`
   - `Enquiries`

---

## 2. Tab Column Headers

### Tab 1: `Packages`
```text
PackageId | Slug | Title | ShortDescription | Description | Destination | Duration | Price | Currency | MainImage | GalleryImages | Category | Highlights | Inclusions | Exclusions | Featured | Active | DisplayOrder | MetaTitle | MetaDescription | OgImage | CanonicalUrl | NoIndex
```

### Tab 2: `Blogs`
```text
BlogId | Slug | Title | Excerpt | Content | ContentFormat | Author | PublishDate | Category | FeaturedImage | Featured | Active | DisplayOrder | MetaTitle | MetaDescription | OgImage | CanonicalUrl | NoIndex
```

### Tab 3: `Gallery`
```text
GalleryId | Title | Description | ImageUrl | AltText | Category | Active | DisplayOrder
```

### Tab 4: `FAQs`
```text
FAQId | Question | Answer | Category | Active | DisplayOrder
```

### Tab 5: `Testimonials`
```text
TestimonialId | CustomerName | Location | Message | Rating | Image | Active | DisplayOrder
```

### Tab 6: `Enquiries`
```text
EnquiryId | CreatedAt | FullName | Phone | Email | Destination | Package | Travelers | TravelDate | ReturnDate | Message | PreferredContact | Status | Source
```

---

## 3. Google Apps Script Deployment

1. Open your Google Sheet -> Click **Extensions** -> **Apps Script**.
2. Paste the contents of `google-apps-script/Code.gs`.
3. Replace `'YOUR_SPREADSHEET_ID'` with your Google Sheet ID (found in the URL `https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit`).
4. Click **Deploy** -> **New Deployment**.
5. Select **Type**: Web App.
6. Set **Execute as**: `Me`.
7. Set **Who has access**: `Anyone` (required so the frontend can query public GET endpoints and submit POST enquiries).
8. Copy the generated Web App URL (`https://script.google.com/macros/s/.../exec`).

---

## 4. Angular Environment Configuration

Add the Web App URL to `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  dataSource: 'google',
  googleAppsScriptUrl: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
};
```
