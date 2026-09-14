# Eat Istanbul website

Static site for Eat Istanbul (owner Ekrem Yildiz). Plain HTML and CSS with no build step, served by GitHub Pages from the `main` branch.

Official address: **https://eatistanbul.au** (registration pending as at 14 Sep 2026). Anything a customer sees must use the official domain, never the github.io address.

## Pages

| Path | What it is |
|---|---|
| `index.html` | Home: story, menu highlights, the four shops, catering form |
| `menu/index.html` | Full menu with prices. The in-store menu QR code points to `https://eatistanbul.au/menu/`, so **never move or rename this page**. |
| `barangaroo/`, `central-plaza/`, `martin-place/`, `macquarie/` | One page per shop |
| `order.html` | Redirects to Barangaroo's Square Online ordering site |
| `assets/` | Shared styles, script, logo and food photos |

## Prices

Prices live only in `menu/index.html`. They are the same at all four shops (confirmed by Michael, 14 Sep 2026). To change a price, edit the number in that page and publish. The QR code never needs reprinting.

## Shop details

Addresses and hours match each shop's Google Business Profile (checked 14 Sep 2026). Each Directions button opens that shop's exact Google listing. If hours change, update Google and the matching shop page together.

## Publishing

- Commit as `mikedogan-a11y <279657995+mikedogan-a11y@users.noreply.github.com>`.
- Push normally to `main`. **Never force-push**; it deletes other people's work from the live site.
- GitHub Pages rebuilds in about a minute.
- `_config.yml` keeps this README and `netlify.toml` off the public site.

## Brand

Site: charcoal `#26221d`, gold `#c9a24b`, cream `#f6f1e7`, red accent `#b3402f`; headings Marcellus, body Inter.
Menu page: follows the in-store boards instead, black with yellow `#f6b800`, Barlow.
