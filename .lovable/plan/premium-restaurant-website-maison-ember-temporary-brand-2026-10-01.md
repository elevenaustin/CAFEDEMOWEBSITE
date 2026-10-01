# Premium Restaurant Website — "Maison Ember" (temporary brand)

A six-page editorial restaurant site: dark charcoal + warm ivory, serif headlines, cinematic photography, refined motion.

## Pages
- **Home** — full-screen cinematic hero (name, tagline, "Reserve a Table" / "Explore Our Menu", cuisine + location note, scroll cue), asymmetric story intro, signature dishes in alternating image/text rows, gallery teaser, reservation band.
- **Our Story** — cinematic opener, philosophy, origin story, chef introduction, kitchen photography, closing reservation call-to-action.
- **Menu** — category tabs (Starters, Mains, Signature, Desserts, Beverages) with smooth switching, dish name/description/price, dietary tags (V, GF, etc.), selective photos. All content from one editable data file.
- **Gallery** — asymmetric masonry of mixed portrait/landscape/square photos, hover effects, lightbox with next/previous and keyboard support.
- **Reservations** — form (name, email, phone, guests, date, time, requests) with validation, clear errors, loading state and confirmation.
- **Contact** — address, phone, email, opening hours, map link, contact form, social links.

## Shared
- Transparent header over hero that turns solid on scroll; logo left, links centered, Reserve button right. Full-screen animated mobile menu.
- Compact elegant footer: logo, statement, links, hours, contact, Instagram, newsletter field, oversized decorative wordmark.
- Scroll reveals, text entrances, image reveal masks, light parallax; respects reduced motion.

## Reservations backend
Enable Lovable Cloud and save reservation requests (and contact messages) to the database. The confirmation will say **"Request received — we'll confirm by email"**, never a false "confirmed" booking.

## Design tokens
- Colors: charcoal `#141210`, ivory `#F4EFE6`, beige `#D9CDB8`, muted brass accent `#A8834F`.
- Type: Cormorant Garamond (headings), Karla (body). Sharp corners, no heavy shadows.
- Photography: ~14 generated realistic images (hero, interior, chef, dishes, details).

## Technical details
- Routes: `index`, `story`, `menu`, `gallery`, `reservations`, `contact`, each with its own head() SEO + Restaurant JSON-LD on home.
- `motion` (Framer Motion) for animation; zod + react-hook-form for validation.
- Data in `src/data/menu.ts`, `gallery.ts`, `restaurant.ts`.
- Tables `reservations`, `contact_messages`: anon INSERT only via RLS, with grants; inserts through server functions with zod validation.
- Lazy loading for below-fold images, semantic headings, no horizontal overflow.

Sample name, address, phone, menu and hours are placeholders to replace with real details.
