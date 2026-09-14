# smoothsoftware.dev

The studio page of Smooth Software: contact and privacy policy. Static
HTML and CSS, no build step. The only JavaScript is `sky.js`, which
leans the background toward the pointer, plus a two-line effect switch
used while choosing the background.

## Run and deploy

```
npm install
npm run dev      # http://localhost:8788
npm run deploy   # Cloudflare Workers static assets (wrangler.jsonc)
```

Deploy needs `CLOUDFLARE_API_TOKEN` in the environment (a token from
the Cloudflare dashboard with the "Edit Cloudflare Workers" template).

## Pages

- `/` — studio, contact
- `/privacy` — privacy policy for the site and the games
- `?fx=mist` (default) · `?fx=aurora` · `?fx=off` — background variants

## Assets

| File | Source | Licence | Author |
|---|---|---|---|
| public/fonts/quando.woff2 (latin subset) | https://fonts.google.com/specimen/Quando | SIL OFL 1.1 | Joana Correia / Sorkin Type Co |
| public/fonts/alegreya-medium.woff2 (latin subset, weight 500) | https://fonts.google.com/specimen/Alegreya | SIL OFL 1.1 | Juan Pablo del Peral / Huerta Tipográfica |
