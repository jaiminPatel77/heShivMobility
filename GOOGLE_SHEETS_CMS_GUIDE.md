# Heshiv Mobility — Simplified Google Sheets & Google Drive CMS Guide

This guide explains how to manage the **Google Sheet CMS** and **Google Drive Image Storage** for **Heshiv Mobility**.

---

## 🎯 Quick Answer: Do You Need to Fill `Slug`, `PackageId`, `MetaTitle`, `MetaDescription`, `NoIndex`, `Category`, `Featured`?

### **NO! YOU DO NOT NEED TO FILL THEM!**

The website code now includes **intelligent auto-generation logic**:
- 🏷️ **`Slug`**: Automatically created from the `Title` (e.g. `Somnath & Dwarka Tour` -> `somnath-dwarka-tour`).
- 🆔 **`PackageId` / `BlogId`**: Automatically generated from the title slug.
- 🏷️ **`Category`**: Defaults to `'Pilgrimage'` (Packages) or `'Travel Guide'` (Blogs) if empty.
- ⭐ **`Featured`**: Defaults to `TRUE`.
- 🔍 **`MetaTitle`**: Automatically generated as `[Title] | Heshiv Mobility`.
- 📝 **`MetaDescription`**: Automatically falls back to `ShortDescription` or `Excerpt`.
- 🖼️ **`OgImage`**: Automatically uses `MainImage` or `FeaturedImage`.
- 🚫 **`NoIndex`**: Defaults to `FALSE`.

---

## 📋 Simplified Google Sheet Columns for Business Owner

You only need **6 to 8 simple columns** per tab when adding data!

### Tab 1: `Packages` (Simplified Column List)

| Required Columns | Optional / Auto-Generated (Leave Empty if you want!) |
| :--- | :--- |
| **`Title`** (e.g. *Somnath & Dwarka Pilgrimage*) | `Slug` *(Auto-slugified from Title)* |
| **`ShortDescription`** (e.g. *5 Days AC Innova Tour*) | `PackageId` *(Auto-generated)* |
| **`Description`** (Detailed tour info) | `Category` *(Defaults to Pilgrimage)* |
| **`Destination`** (e.g. *Somnath*) | `Featured` *(Defaults to TRUE)* |
| **`Duration`** (e.g. *5 Days / 4 Nights*) | `MetaTitle` *(Auto-generated)* |
| **`Price`** (e.g. *14999*) | `MetaDescription` *(Auto-fallback to ShortDescription)* |
| **`MainImage`** (Google Drive Link) | `OgImage` *(Auto-uses MainImage)* |
| **`Highlights`** (e.g. *Somnath Aarti\|Dwarka Mandir*) | `Active` *(Defaults to TRUE)* |

---

### Tab 2: `Blogs` (Simplified Column List)

| Required Columns | Optional / Auto-Generated (Leave Empty!) |
| :--- | :--- |
| **`Title`** (e.g. *Somnath Temple Darshan Guide*) | `Slug` *(Auto-slugified from Title)* |
| **`Excerpt`** (Short summary) | `BlogId` *(Auto-generated)* |
| **`Content`** (Article text / Markdown) | `Author` *(Defaults to Heshiv Mobility Editorial)* |
| **`FeaturedImage`** (Google Drive Link) | `PublishDate` *(Defaults to Today)* |
| | `MetaTitle` & `MetaDescription` *(Auto-generated)* |

---

### Tab 3: `Gallery`

| Columns | Notes |
| :--- | :--- |
| **`Title`** | Photo title |
| **`ImageUrl`** | Google Drive shareable link |

---

### Tab 4: `FAQs`

| Columns | Notes |
| :--- | :--- |
| **`Question`** | e.g. *What vehicle options are available?* |
| **`Answer`** | e.g. *We provide AC Sedan, SUV Innova Crysta...* |

---

### Tab 5: `Testimonials`

| Columns | Notes |
| :--- | :--- |
| **`CustomerName`** | e.g. *Rameshchandra & Family* |
| **`Location`** | e.g. *Ahmedabad* |
| **`Message`** | Customer review text |
| **`Rating`** | `5` |

---

### Tab 6: `Enquiries`

*(Submissions from the website are appended automatically)*
```text
EnquiryId | CreatedAt | FullName | Phone | Email | Message | Status | Source
```

---

## 📸 Image Setup Flow (Google Drive)

1. Upload photos to a Google Drive folder.
2. Set folder access to **Anyone with the link** (Viewer).
3. Right-click photo -> **Copy link**.
4. Paste link directly into `MainImage`, `FeaturedImage`, or `ImageUrl`.

---

## ⚙️ Google Apps Script Web App Deployment

1. Open Sheet -> **Extensions** -> **Apps Script**.
2. Paste code from [google-apps-script/Code.gs](file:///c:/Users/TusharQA/OneDrive/Desktop/Personal-Projects/heShivMobility/google-apps-script/Code.gs).
3. Update `CONFIG.SPREADSHEET_ID`.
4. Click **Deploy** -> **New Deployment** -> Select **Web App**:
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy URL into `src/environments/environment.ts`:
```typescript
export const environment = {
  production: true,
  dataSource: 'google',
  googleAppsScriptUrl: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
};
```
