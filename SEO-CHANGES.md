# OVATION — SEO changes (summary)

Both pages kept their original design and copy voice. Changes are SEO-layer only,
plus light, natural keyword weaving in visible text.

## ⚠️ One assumption to verify
All absolute URLs (canonical, hreflang, Open Graph, sitemap, robots, JSON-LD)
use **https://ovationav.si/** — contact email `info@ovationav.si`.
If the live domain differs, find-and-replace `ovationav.si` across:
`ovation-home.html`, `ovation-home-en.html`, `sitemap.xml`, `robots.txt`, `llms.txt`.

## What changed in each HTML page
- Keyword-rich `<title>` (was brand-only, no keywords)
- `<meta name="description">` added (was missing)
- Canonical URL + absolute hreflang (sl / en / x-default)
- Open Graph + Twitter Card tags (social sharing previews)
- robots meta, theme-color, inline SVG favicon
- JSON-LD structured data: Organization/LocalBusiness + WebSite + WebPage +
  4× VideoObject (reel + 3 portfolio pieces) — per the keyword-research recommendation
- Light visible keyword weaving (marquee + 3 service descriptions + a location line),
  voice preserved

## New files
- `llms.txt`     → guidance file for AI search (ChatGPT Search, Perplexity, Claude, Google AI Overviews)
- `robots.txt`   → allows search + AI crawlers, points to sitemap
- `sitemap.xml`  → both language URLs with hreflang

## Recommended next steps (from the research, not yet done — needs new pages/data)
1. Set up Google Business Profile + consistent NAP; add a real address/phone to the JSON-LD.
2. Build dedicated service pages (sl + en) — the one-pager limits how far on-page SEO can go.
3. Add pricing / "how much does X cost" blog content to capture AI Overviews.
4. Confirm Slovenian search volumes in Google Keyword Planner (geo: Slovenia) before ad spend.
