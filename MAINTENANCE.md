# Site Maintenance Checklist

This is a static HTML site — nothing here updates itself except where noted. Most of this list is **event-triggered**: leave it alone until the real-world fact actually changes, then paste the relevant section to Claude Code with what changed. Only one item (reviews) is worth revisiting on its own schedule.

## Revisit periodically

### Reviews & ratings
- **What**: `aggregateRating` (star value + review count) is hardcoded in the JSON-LD on 25 pages (homepage, about, services, contact, faq, reviews, the 3 individual service pages, all 16 location pages). Individual written `Review` entries live only in `reviews.html`.
- **Auto-updates**: The visible reviews widget on reviews.html (Elfsight) pulls live from Google — nothing to do there.
- **Does NOT auto-update**: The `aggregateRating` numbers and the hardcoded review text.
- **Cadence**: Refresh whenever your Google review count changes meaningfully (e.g. 18 → 25), not after every single review.
- **Tell Claude Code**: your current star rating + review count, and optionally 1-2 new standout reviews (name + text).

## Update only if this actually changes

### Business contact info (phone, email, address)
- **What it touches**: footer + JSON-LD on every page (~28 files) — phone, email, and address all appear identically everywhere.
- **Tell Claude Code**: the new phone/email/address.

### Insurance / licensing claims
- **What it touches**: `faq.html` ("Are you licensed and insured?") and the trust callout on `services-ceramic-coating.html`.
- **Tell Claude Code**: the new coverage amount and/or licensing detail (e.g. if coverage increases at a policy renewal).

### Service area changes (adding/dropping a city)
- **What it touches**: the nav "Locations" dropdown (every page), the footer "Service Areas" grid (every page), the full "We proudly serve..." paragraph (index.html, about.html, contact.html), the `areaServed` JSON-LD arrays (22 files), a dedicated `location-city.html` page to create or remove, and `sitemap.xml`.
- **Tell Claude Code**: which city to add or remove.

### Ceramic coating / paint correction / detailing tiers
- **What it touches**: `services-ceramic-coating.html`, `services-paint-correction.html`, `services-detailing.html`, and the matching FAQ answers in `faq.html` and the condensed FAQ on `index.html`.
- **Tell Claude Code**: what specifically changed about the tier/package (name, duration, technology, included prep).

### Social media links
- **What it touches**: footer icon links and JSON-LD `sameAs` arrays on every page with a footer (~25 files).
- **Tell Claude Code**: new/changed social URLs, or a new platform to add (TikTok, Yelp, etc.).

### Terms of Service / policies (cancellation window, deposits, weather policy, etc.)
- **What it touches**: the visible Terms & Conditions section in `faq.html` AND the `FAQPage` JSON-LD block in the same file — these two must be updated together or they'll drift out of sync again.
- **Tell Claude Code**: the specific policy that changed.

### Sitemap
- **What it touches**: `sitemap.xml` needs a new `<url>` entry any time you add a page, and the old entry removed if you retire one. (Found and fixed one gap during this session: `faq.html` was missing.)

### Google Business Profile review link
- **What it touches**: the "Leave a review" CTA button URL on `reviews.html`.
- **Tell Claude Code**: only relevant if your Google Business Profile listing URL ever changes.

---
*Last full structured-data audit: 2026-07-06.*
