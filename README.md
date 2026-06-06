# Eat Istanbul — Website

Authentic Turkish street food, Sydney. A fast, mobile-first one-page website
for Eat Istanbul (owner: Ekrem Yildiz). No build step, no dependencies — just
open the files and edit.

## Files

```
eat-istanbul/
├─ index.html              ← main page content (edit text here)
├─ order.html              ← online ordering page (pick-up)
├─ assets/
│  ├─ css/style.css        ← colours, fonts, layout
│  ├─ css/order.css        ← ordering-page styles
│  ├─ js/main.js           ← menu, scroll effects, catering form
│  ├─ js/order.js          ← MENU + PRICES + cart logic  ⭐ edit prices here
│  └─ img/logo.svg         ← the Eat Istanbul logo (recreated, crisp at any size)
├─ static-server.ps1       ← local preview server (Windows)
└─ README.md
```

## Online ordering (order.html)

A full pick-up ordering flow: choose a shop → build an order with item options
(meat, sauces, make-it-a-meal, snack-pack size) → pick a pick-up time → enter
name/phone → place order. **Payment is "pay on pick-up"** (no card processing),
which is the simplest and safest setup for a food-court business.

- **All menu items and prices live in `assets/js/order.js`** (the `ITEMS` object).
  Change a price by editing one number. Add an item by copying a line.
- **Per-shop menus** are in the `SHOPS` object — e.g. Barangaroo has a Breakfast
  section, Macquarie has a Student Combo. Add/remove with `extra` / `exclude`.
- **Where orders go:** set a free https://formspree.io endpoint on the
  `data-endpoint` attribute of `<form id="orderForm">` in `order.html`
  (replace `your-form-id`). Until then, placing an order shows a confirmation
  with an order number and offers an "Email my order" button as a fallback so
  nothing is lost. Each order gets a number like `EI-BAR-3588`.
- Shop hours drive the pick-up time slots (also in `SHOPS`).

> ⚠️ **Prices are assumptions** (typical Sydney food-court 2026). Confirm the real
> prices with Ekrem and update `ITEMS` in `order.js` before going live.

## Preview it locally

Double-click nothing — instead, run the server and open the page:

```powershell
powershell -ExecutionPolicy Bypass -File static-server.ps1
# then visit http://localhost:8830 in your browser
```

(Or simply open `index.html` directly in a browser — the only thing that needs
the server is clean local link behaviour.)

## Things to finish before going live

1. **Photos** — the design is typography-led so it looks great without photos,
   but real shots of the food and shopfronts will lift it. Add images to
   `assets/img/` and drop `<img>` tags into the hero / story / menu sections.
2. **Confirm prices** — update the `ITEMS` object in `assets/js/order.js` with
   Ekrem's real menu prices (currently assumptions).
3. **Forms → Formspree** — create free forms at https://formspree.io and paste
   the IDs into (a) the catering form `action` in `index.html` and (b) the
   `data-endpoint` on `order.html`'s order form. Both replace `your-form-id`.
4. **Delivery app links** — the Uber Eats / DoorDash / Menulog buttons on
   `index.html` point to `#`. Paste the real store URLs (search "order-app").
4. **Email address** — `hello@eatistanbul.com.au` is a placeholder; swap for the
   real one in `index.html` (footer + form fallback in `assets/js/main.js`).
5. **Instagram link** — footer Instagram link is `#`; add the real handle.
6. **Hours** — Westfield & Macquarie show "Centre hours"; add exact times if known.

## Hosting (free options)

This is a plain static site, so it can be hosted free on any of:

- **Netlify** — drag the `eat-istanbul` folder onto app.netlify.com/drop
- **Cloudflare Pages** or **GitHub Pages**
- Point a domain (e.g. `eatistanbul.com.au`) at it once chosen.

## Brand

- Charcoal `#26221d`, Gold `#c9a24b`, Cream `#f6f1e7`, Turkish-red accent `#b3402f`
- Headings: **Marcellus** · Body: **Inter** (loaded from Google Fonts)
