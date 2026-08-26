# Client Google Sheet CMS Data Entry Guide — Packages, Blogs & Gallery (HeShiv Mobility)

This document is designed for clients, business owners, and content managers filling out the **`Packages`**, **`Blogs`**, and **`Gallery`** tabs in the **HeShiv Mobility Google Sheet CMS**.

---

# SECTION 1: `Packages` Tab (14 Columns)

## 📌 Quick Summary: Where to use the Pipe (`|`) Symbol in Packages

The pipe symbol (`|`) is used as a **separator** to tell the website that a single Google Sheet cell contains multiple list items or multiple images.

| Column Header | Use `\|` Pipe? | Explanation & Quick Example |
| :--- | :---: | :--- |
| **`Title`** | ❌ NO | Plain text. *Example:* `Somnath & Dwarka Pilgrimage` |
| **`DepartureDateTime`** | ❌ NO | Plain text date/time. *Example:* `29-08-2026 09:00 PM` |
| **`ArrivalDate`** | ❌ NO | Plain text date. *Example:* `29-08-2026` |
| **`ShortDescription`** | ❌ NO | Plain text summary snippet. *Example:* `5 Days AC Innova tour.` |
| **`Description`** | ❌ NO | Multiline markdown itinerary text (Use `-` for bullets). |
| **`Destination`** | ❌ NO | Plain text route. Use `-` between cities. *Example:* `Somnath - Dwarka` |
| **`Duration`** | ❌ NO | Plain text duration. *Example:* `5 Days / 4 Nights` |
| **`Price`** | ⚠️ OPTIONAL | Single number OR use `\|` for seating tiers. *Example:* `3/3 Non AC: 395 \| 3/3 AC: 595` |
| **`MainImage`** | ❌ NO | Single Google Drive link. |
| **`GalleryImages`** | ✅ **YES** | Separate multiple Google Drive links with `\|`. |
| **`Category`** | ❌ NO | Single category name. *Example:* `Pilgrimage` |
| **`Highlights`** | ✅ **YES** | Separate multiple highlight features with `\|`. |
| **`Inclusions`** | ✅ **YES** | Separate included services with `\|`. |
| **`Exclusions`** | ✅ **YES** | Separate excluded items with `\|`. |

---

## 📑 Detailed Column Breakdown for `Packages`

### 1. `Title`
- **Data Type:** Plain Text *(Required)*
- **Use Pipe (`\|`)?:** ❌ NO
- **Where Displayed on Website:**
  - Package Card main title
  - Main Heading (`<h1>`) on Package Detail page
  - Enquiry Form pre-selected package option
  - Browser tab title & SEO meta title tag
- **Example Value:** `Somnath & Dwarka Pilgrimage`

---

### 2. `DepartureDateTime`
- **Data Type:** Date & Time Text *(Optional)*
- **Use Pipe (`\|`)?:** ❌ NO
- **Where Displayed on Website:**
  - Package Card date chip (`🚌 Departure: 29-08-2026 09:00 PM`)
  - Package Detail Hero header metadata tag
- **Format Examples:** `29-08-2026 09:00 PM` or `2026-08-29 21:00` or `Saturday, 29 Aug 2026 at 9:00 PM`

---

### 3. `ArrivalDate`
- **Data Type:** Date Text *(Optional)*
- **Use Pipe (`\|`)?:** ❌ NO
- **Where Displayed on Website:**
  - Package Card date chip (`📅 Arrival: 29-08-2026`)
  - Package Detail Hero header metadata tag
- **Format Examples:** `29-08-2026` or `29 Aug 2026`

---

### 4. `ShortDescription`
- **Data Type:** Short Text (1-2 sentences, ~150-200 characters) *(Required)*
- **Use Pipe (`\|`)?:** ❌ NO
- **Where Displayed on Website:**
  - Package Card preview summary paragraph
  - Package Detail Hero subtitle text
  - Google Search result snippet (Meta Description)
- **Example Value:** `Explore the divine temples of Somnath and Dwarka with comfortable AC Innova transport, 3-star hotel stay, and guided darshan.`

---

### 5. `Description`
- **Data Type:** Multiline Text / Day-wise Itinerary *(Required)*
- **Use Pipe (`\|`)?:** ❌ NO (Use new lines and `-` bullet points)
- **Where Displayed on Website:**
  - Package Detail page under **"Tour Overview"** section.
  - Automatically rendered into interactive **Day 1, Day 2, Day 3 Accordion Expanders**.
- **How to Format Day-Wise Itinerary:**
  ```markdown
  Welcome to Gujarat! Experience a sacred pilgrimage across Somnath and Dwarka.

  ### Day 1 — Arrival at Rajkot & Transfer to Somnath
  - Pickup from Rajkot Airport / Railway Station by AC Innova
  - Check-in to hotel & relax
  - Evening Somnath Temple Darshan & Light & Sound Show

  ### Day 2 — Somnath Sightseeing & Drive to Dwarka
  - Morning Triveni Sangam bath & Bhalka Tirth visit
  - Scenic drive to Dwarka via Porbandar (Kirti Mandir)
  - Evening arrival in Dwarka & Hotel check-in
  ```

---

### 6. `Destination`
- **Data Type:** Plain Text *(Required)*
- **Use Pipe (`\|`)?:** ❌ NO (Use hyphens `-` or commas `,`)
- **Where Displayed on Website:**
  - Package Card top chip (shows first 3 cities with `•` separator and `+X more` counter)
  - Package Detail Hero header tag (`📍 Somnath - Dwarka - Porbandar - Diu`)
- **Example Value:** `Somnath - Dwarka - Porbandar - Diu`

---

### 7. `Duration`
- **Data Type:** Plain Text *(Required)*
- **Use Pipe (`\|`)?:** ❌ NO
- **Where Displayed on Website:**
  - Package Card duration badge (`⏱️ 5 Days / 4 Nights`)
  - Package Detail Hero header tag (`⏱️ 5 Days / 4 Nights`)
- **Example Value:** `5 Days / 4 Nights`

---

### 8. `Price`
- **Data Type:** Number OR Seating Tiers String *(Required)*
- **Use Pipe (`\|`)?:** ⚠️ **OPTIONAL (Only use `\|` if providing multiple vehicle/seating options)**
- **Where Displayed on Website:**
  - Package Card price tag (e.g. starting price or seating option pills)
  - Package Detail Hero price banner
  - Mobile bottom sticky enquiry bar
- **Option A (Single Fixed Price):** `14999`
- **Option B (Multiple Seating/Vehicle Options - Uses `\|`):**
  `3/3 Non AC Luxury: 395 | 3/3 AC Luxury: 595 | 2/2 AC Sleeper: 895`
  *OR*
  `Sedan (4 Seater): 12000 | Innova Crysta (7 Seater): 18000`

---

### 9. `MainImage`
- **Data Type:** Google Drive Shareable Link *(Required)*
- **Use Pipe (`\|`)?:** ❌ NO (Single Link)
- **Where Displayed on Website:**
  - Main Cover Photo on Package Card
  - Background Hero Image on Package Detail page
  - WhatsApp / Social Media preview thumbnail image
- **How to Get Link:** Right-click photo in Google Drive → **Share** → set access to **"Anyone with the link" (Viewer)** → Copy link.
- **Example Value:** `https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9/view`

---

### 10. `GalleryImages`
- **Data Type:** Multiple Google Drive Links separated by `\|` *(Optional)*
- **Use Pipe (`\|`)?:** ✅ **YES (Mandatory between links)**
- **Where Displayed on Website:**
  - "Package Gallery" thumbnail grid on Package Detail page.
- **Example Value:**
  `https://drive.google.com/file/d/IMG_ID_1/view | https://drive.google.com/file/d/IMG_ID_2/view | https://drive.google.com/file/d/IMG_ID_3/view`

---

### 11. `Category`
- **Data Type:** Plain Text *(Optional, defaults to `Pilgrimage`)*
- **Use Pipe (`\|`)?:** ❌ NO
- **Where Displayed on Website:**
  - Top-left category badge on Package Cards
  - Package Detail Hero header tag
  - Category filter dropdown & recommended package matcher
- **Example Values:** `Pilgrimage`, `Heritage`, `Wildlife`, `Beach Tour`, `Weekend Getaway`

---

### 12. `Highlights`
- **Data Type:** Multiple Key Points separated by `\|` *(Optional)*
- **Use Pipe (`\|`)?:** ✅ **YES (Mandatory between items)**
- **Where Displayed on Website:**
  - First 2 items displayed as checkmark pills on Package Card (`✓ Somnath Evening Aarti`)
  - Full checkmark feature grid on Package Detail page under **"Trip Highlights"**
- **Example Value:** `Somnath Evening Aarti | Dwarkadhish Temple Darshan | Triveni Sangam | AC Transport`

---

### 13. `Inclusions`
- **Data Type:** Multiple Included Features separated by `\|` *(Optional)*
- **Use Pipe (`\|`)?:** ✅ **YES (Mandatory between items)**
- **Where Displayed on Website:**
  - Package Detail page under **"Included In Package"** column with green checkmarks (`✓`).
- **Example Value:** `AC Vehicle for full tour | Hotel Accommodation with Breakfast | Driver Allowance & Fuel | Toll & Parking Included`

---

### 14. `Exclusions`
- **Data Type:** Multiple Excluded Features separated by `\|` *(Optional)*
- **Use Pipe (`\|`)?:** ✅ **YES (Mandatory between items)**
- **Where Displayed on Website:**
  - Package Detail page under **"Not Included"** column with red crossmarks (`✕`).
- **Example Value:** `Personal Expenses & Laundry | Monument Entry Tickets | Temple Special VIP Pass | Lunch & Dinner`

---

# SECTION 2: `Blogs` Tab (6 Columns)

## 📌 Quick Summary: Where to use the Pipe (`|`) Symbol in Blogs

In the **`Blogs`** tab, **NO pipe (`|`) symbol is needed in any column**. All columns use standard plain text, Markdown formatting, or a single Google Drive photo URL.

| Column Header | Use `\|` Pipe? | Explanation & Quick Example |
| :--- | :---: | :--- |
| **`Title`** | ❌ NO | Article Headline. *Example:* `Complete Somnath Temple Darshan Guide` |
| **`Excerpt`** | ❌ NO | Short summary snippet. *Example:* `Everything you need to know about Aarti timings...` |
| **`Content`** | ❌ NO | Full article body text (Supports Markdown formatting). |
| **`FeaturedImage`** | ❌ NO | Single Google Drive photo link. |
| **`Category`** | ❌ NO | Article category topic. *Example:* `Travel Guide` |
| **`Author`** | ❌ NO | Author name. *Example:* `Jaimin Patel` |

---

## 📑 Detailed Column Breakdown for `Blogs`

### 1. `Title`
- **Data Type:** Plain Text *(Required)*
- **Use Pipe (`\|`)?:** ❌ NO
- **Where Displayed on Website:**
  - Main Heading (`<h1>`) on Blog Detail page
  - Headline title on Blog Cards on Blog Listing & Home pages
  - Auto-generates URL route slug (e.g. `/blog/complete-somnath-temple-darshan-guide`)
  - Browser tab title & SEO meta title tag
- **Example Value:** `Complete Somnath Temple Darshan & Travel Guide 2026`

---

### 2. `Excerpt`
- **Data Type:** Short Text (1-3 sentences, ~150-250 characters) *(Required)*
- **Use Pipe (`\|`)?:** ❌ NO
- **Where Displayed on Website:**
  - Summary preview paragraph on Blog Cards
  - Subtitle under article title on Blog Detail page
  - Search Engine result description snippet (SEO Meta Description)
- **Example Value:** `Planning a pilgrimage to Somnath? Here is a complete travel guide covering temple Aarti timings, dress code, best season to visit, nearby sightseeing, and car rental options.`

---

### 3. `Content`
- **Data Type:** Multiline Text / Markdown Article Content *(Required)*
- **Use Pipe (`\|`)?:** ❌ NO
- **Where Displayed on Website:**
  - Main body of the article on the Blog Detail page.
  - Automatically rendered into formatted HTML headings, bold text, lists, quotes, and links using Markdown parser.
- **Recommended Markdown Format Example:**
  ```markdown
  # Complete Somnath Temple Darshan Guide

  Somnath Temple, located in Prabhas Patan near Veraval in Gujarat, is the **first among the twelve holy Jyotirlinga** shrines of Lord Shiva.

  ## Temple Opening & Aarti Timings
  - **Temple Doors Open:** 6:00 AM to 10:00 PM
  - **Morning Aarti:** 7:00 AM
  - **Noon Aarti:** 12:00 PM
  - **Evening Aarti:** 7:00 PM

  > **Tip:** Do not miss the famous **Sound & Light Show** (Jay Somnath) held every evening from 8:00 PM to 9:00 PM at the temple premises.

  ## Important Rules & Dress Code
  1. Wear modest traditional attire (Dhoti/Kurta for men, Saree/Salwar Kameez for women).
  2. Mobile phones, cameras, smartwatches, and leather items are strictly prohibited inside the temple premises. Free cloakroom facilities are available.

  ## How to Reach Somnath Temple
  The nearest major railway stations are Veraval (7 km) and Rajkot (190 km). You can easily book an **AC Sedan or Innova Crysta** with **HeShiv Mobility** for a comfortable family road trip.
  ```

---

### 4. `FeaturedImage`
- **Data Type:** Google Drive Shareable Link *(Required)*
- **Use Pipe (`\|`)?:** ❌ NO (Single Link)
- **Where Displayed on Website:**
  - Cover photo on Blog Cards
  - Main Hero Banner image at the top of the Blog Detail page
  - WhatsApp, Facebook & Twitter social share preview photo (OG Image)
- **How to Get Link:** Right-click image in Google Drive → **Share** → set access to **"Anyone with the link" (Viewer)** → Copy link.
- **Example Value:** `https://drive.google.com/file/d/1B2C3D4E5F6G7H8I9/view`

---

### 5. `Category`
- **Data Type:** Plain Text *(Optional, defaults to `Travel Guide`)*
- **Use Pipe (`\|`)?:** ❌ NO
- **Where Displayed on Website:**
  - Gold Category badge on bottom-left of Blog Card image
  - Metadata badge on top of Blog Detail page
  - Category filter dropdown on Blog listing page
- **Example Values:** `Travel Guide`, `Pilgrimage`, `Route Guide`, `Travel Tips`, `Local Culture`

---

### 6. `Author`
- **Data Type:** Plain Text *(Optional, defaults to `HeShiv Mobility Editorial`)*
- **Use Pipe (`\|`)?:** ❌ NO
- **Where Displayed on Website:**
  - Author tag on Blog Card (`By Jaimin Patel • Aug 25, 2026`)
  - Author profile line under title on Blog Detail page
- **Example Value:** `Jaimin Patel`

---

# SECTION 3: `Gallery` Tab (4 Columns)

## 📌 Quick Summary: Where to use the Pipe (`|`) Symbol in Gallery

In the **`Gallery`** tab, **each row represents one single photo**. Therefore, **NO pipe (`|`) symbol is needed in any column**.

| Column Header | Use `\|` Pipe? | Explanation & Quick Example |
| :--- | :---: | :--- |
| **`Title`** | ❌ NO | Photo title caption. *Example:* `Innova Crysta at Statue of Unity` |
| **`ImageUrl`** | ❌ NO | Single Google Drive photo link. |
| **`Description`** | ❌ NO | Short photo description caption. |
| **`Category`** | ❌ NO | Filter category. *Example:* `Vehicles` |

---

## 📑 Detailed Column Breakdown for `Gallery`

### 1. `Title`
- **Data Type:** Plain Text *(Required)*
- **Use Pipe (`\|`)?:** ❌ NO
- **Where Displayed on Website:**
  - Hover overlay title on Gallery grid cards (`/gallery` page)
  - Heading title (`<h3>`) inside the Lightbox popup window when clicked
  - Image alternative text for SEO (`alt="item.title"`)
- **Example Value:** `Innova Crysta at Statue of Unity`

---

### 2. `ImageUrl`
- **Data Type:** Single Google Drive Shareable Link *(Required)*
- **Use Pipe (`\|`)?:** ❌ NO (Single link per row)
- **Where Displayed on Website:**
  - Photo grid card thumbnail image on the `/gallery` page
  - High-resolution full image in the Lightbox popup dialog
- **How to Get Link:** Right-click photo in Google Drive → **Share** → set access to **"Anyone with the link" (Viewer)** → Copy link.
- **Example Value:** `https://drive.google.com/file/d/1C2D3E4F5G6H7I8J9/view`

---

### 3. `Description`
- **Data Type:** Plain Text *(Optional)*
- **Use Pipe (`\|`)?:** ❌ NO
- **Where Displayed on Website:**
  - Caption paragraph (`<p>`) inside the Lightbox popup when the image is clicked
- **Example Value:** `Clean 7-seater AC Innova Crysta for comfortable long-distance family travel across Gujarat.`

---

### 4. `Category`
- **Data Type:** Plain Text *(Optional, defaults to `General`)*
- **Use Pipe (`\|`)?:** ❌ NO
- **Where Displayed on Website:**
  - Interactive Filter Tabs at the top of the Gallery page (`All | Vehicles | Destinations | Pilgrimage | Customers`)
  - Category badge on bottom of card overlay and in Lightbox caption
- **Example Values:** `Vehicles`, `Destinations`, `Pilgrimage`, `Customers`

---

## ⚡ Technical Data Pipeline Summary (How it works under the hood)

1. **Google Sheets:** Client enters data into **`Packages`**, **`Blogs`**, or **`Gallery`** sheet tabs.
2. **Google Apps Script API:** Converts sheet rows into JSON object arrays (`?action=packages`, `?action=blogs`, or `?action=gallery`).
3. **Angular Data Transformer ([data-transformers.ts](file:///c:/Users/TusharQA/OneDrive/Desktop/Personal-Projects/heShivMobility/src/app/integration/google/data-transformers.ts)):**
   - Automatically generates web-safe `slug` from `Title`.
   - Converts raw Google Drive links into high-speed Google CDN URLs.
   - Parses Markdown content into clean HTML using `marked` library.
   - Handles fallback defaults for optional fields like Category and Author.
4. **Dynamic Website Display:** Updates live on the website as soon as the client saves the Google Sheet!
