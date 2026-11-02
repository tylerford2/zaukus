# Site Maintenance Checklist

This is a static HTML site — nothing here updates itself except where noted. This list is **event-triggered**: leave it alone until the real-world fact actually changes, then paste the relevant section to Claude Code with what changed.

## Revisit periodically

### Google review count and rating (currently 5.0 from 24 reviews)
- **What it touches**: visible text only, on `index.html` (hero rating line and the "Rated 5.0 from 24 Google reviews" heading) and the intro line on `reviews.html`. The quoted review cards (8 on `reviews.html`, 3 of them repeated on `index.html`) are excerpts copied word for word from Google: first name plus the car only if the customer named it. Never edit a customer's words or add a review that isn't on Google. There is deliberately NO `aggregateRating` schema: Google doesn't show review stars for a business rating itself and forbids marking up reviews copied from another site.
- **Tell Claude Code**: the new rating and count from your Google Business Profile.

## Update only if this actually changes

### Business contact info (phone, email, address)
- **What it touches**: footer + JSON-LD on every page (~28 files) — phone, email, and address all appear identically everywhere.
- **Tell Claude Code**: the new phone/email/address.

### Business hours (currently Mon–Fri 8am–5pm)
- **What it touches**: the `openingHoursSpecification` JSON-LD block (23 files) AND the visible "Hours:" line in the footer Contact Info column (every page, including `404.html`) — keep both in sync, and match your Google Business Profile hours.
- **Tell Claude Code**: the new hours, including any days that change.

### Insurance / licensing claims
- **What it touches**: the "Licensed & Insured" badge under the homepage hero, `faq.html` ("Are you licensed and insured?", visible + FAQ schema), and the trust callout on `services-ceramic-coating.html`.
- **Policy (2026-11-01)**: say "licensed and insured" only. Do not publish the coverage amount, and do not promise that customer vehicles are covered while in our care unless the policy includes garagekeepers / care-custody-control coverage.
- **Tell Claude Code**: if licensing or insurance status changes, or if you confirm vehicle-in-care coverage and want to say so.

### Service area changes (adding/dropping a city)
- **What it touches**: the nav "Locations" dropdown (every page), the footer "Service Areas" grid (every page), the "Jump to a service area" grid (every location page), the county lists on `service-areas.html`, the full "We proudly serve..." paragraph (index.html, about.html, contact.html), the full-list `areaServed` JSON-LD arrays (index, about, contact, faq, reviews, services, the 3 service pages, service-areas), a dedicated `location-city.html` page to create or retire, and `sitemap.xml`. Also update the service-area list in your Google Business Profile to match.
- **Current list (2026-10-31)**: La Vergne (base), Smyrna, Murfreesboro, Antioch, Donelson, East Nashville, Nashville, Nolensville, Arrington, College Grove, Brentwood, Franklin, Mt. Juliet, Lebanon.
- **Retired pages**: Belle Meade, Bellevue, and Forest Hills (forward to `location-nashville.html`) and Middle Tennessee (forwards to `service-areas.html`) were cut on 2026-10-31 for low search demand and distance from La Vergne. Their files are now meta-refresh forwarding pages — keep them, out of the sitemap, so old links and bookmarks still land somewhere useful.
- **Never** publish a street address on a location page (the business address is the owner's home); city + ZIP only.
- **Tell Claude Code**: which city to add or remove.

### Ceramic coating / paint correction / detailing tiers
- **Policy (2026-11-01)**: ceramic coating tiers (names, durations, differences) are consultation-only and are NOT listed anywhere on the site. Paint correction and ceramic coating show "Custom quote after a free paint check", never a dollar amount.
- **What it touches**: `services-ceramic-coating.html`, `services-paint-correction.html`, `services-detailing.html`, and the matching FAQ answers in `faq.html` and the condensed FAQ on `index.html`.

### Detailing prices (starting prices, must match Fieldd)
- **Current (2026-11-01, matches Fieldd)**: Full Detail $229 / $269 / $319, Interior Detail $159 / $179 / $219, Exterior Wash & Protection $119 / $139 / $159 (Sedan / SUV 5-Seat / SUV 7-Seat or Truck). Van / Fleet is quote-only. Maintenance plan pricing is NEVER published (owner, 2026-11-01): it is discussed after a customer's first Full Detail is complete.
- **What it touches**: the price table, per-size lines, and `offers` schema on `services-detailing.html`; the price list on `services.html` and `index.html`; the FAQ "What services do you offer?" answer in `faq.html` (visible text AND FAQPage schema); one price sentence on each of the 14 `location-*.html` pages (each worded differently on purpose, so edit each by hand); the meta description of `services.html` (it mentions $229).
- **Tell Claude Code**: the new prices, and change them in Fieldd first.
- **Tell Claude Code**: what specifically changed about a package (name, included prep), keeping the policy above in mind.

### Social media links
- **What it touches**: footer icon links and JSON-LD `sameAs` arrays on every page with a footer (~25 files).
- **Tell Claude Code**: new/changed social URLs, or a new platform to add (TikTok, Yelp, etc.).

### Terms of Service / policies (cancellation window, deposits, weather policy, etc.)
- **What it touches**: the visible Terms & Conditions section in `faq.html` AND the `FAQPage` JSON-LD block in the same file — these two must be updated together or they'll drift out of sync again.
- **Also (since 2026-11-01)**: the Privacy Policy and Terms are copied word for word into `privacy.html` and `terms.html` (the footer links there). Change the text in all places. The `faq.html#privacy` section must stay where it is: Facebook ads link to it.
- **Tell Claude Code**: the specific policy that changed.

### Sitemap
- **What it touches**: `sitemap.xml` needs a new `<url>` entry any time you add a page, and the old entry removed if you retire one. (Found and fixed one gap during this session: `faq.html` was missing.)
- Bump a page's `<lastmod>` only when its visible content meaningfully changes — not for nav, favicon, or metadata-only edits.
- Every push to `main` automatically pings IndexNow (Bing, Yandex, etc.) with the changed pages, but **only pages listed in `sitemap.xml`** — a new page that isn't in the sitemap won't be submitted. The key file `1d1f1e1bdfee5b11e59ac1ffb6ee35f6.txt` in the repo root must stay in place for this to work.
- `404.html` is the custom not-found page (noindex). It uses root-absolute paths (`/redesign.css`) so it renders at any URL depth — keep it that way if you edit it.

### Google Business Profile link
- **What it touches**: the "Read Our Reviews on Google" button on `index.html`, `about.html`, `contact.html`, and `reviews.html`, plus the `hasMap` field in the business JSON-LD (23 files). All use `https://maps.app.goo.gl/dmQ99wbgu2x5oAWK7` (place ID `ChIJSTgHeEwEJ2kRcgjdXqe38Fc`). Next to each one, a "Leave a Google Review" button opens the review form directly: `https://search.google.com/local/writereview?placeid=ChIJSTgHeEwEJ2kRcgjdXqe38Fc` — the same link works for texting customers or a QR code.
- **Keep in sync with GBP**: the site's name, phone, website, hours (Mon–Fri 8am–5pm), and city (La Vergne 37086) were verified to match the profile on 2026-10-31. The GBP description's service list (full/interior/exterior details, paint correction, ceramic, trim and glass coatings) should stay consistent with what the services pages offer.
- **Tell Claude Code**: only relevant if your Google Business Profile listing URL ever changes.

---
*Last full structured-data audit: 2026-07-06. On 2026-07-11, removed the self-serving `aggregateRating` block sitewide and the hidden `review` array on reviews.html — Google does not grant review-star rich results to a business marking up reviews about itself (with or without individual Review objects), and the hardcoded review text wasn't visible anywhere on the rendered page, which is against Google's structured-data guidelines. The live Elfsight widget on reviews.html remains the actual review display.*

*2026-10-06 SEO audit: schema `@type` changed from generic `LocalBusiness` to `AutomotiveBusiness` sitewide; removed the placeholder `streetAddress` ("La Vergne" — the city, not a street) since this is a service-area business with no public street address; added `hasMap` pointing at the Google Business Profile; removed `meta keywords` (ignored by Google, a possible spam signal for Bing).*
