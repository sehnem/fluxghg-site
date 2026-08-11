# fluxGHG — site v2

Rebuild of the fluxGHG site, deployed to **https://new.fluxghg.com** for validation
while `fluxghg.com` continues to run the current site untouched.

Astro 5 + Tailwind 4, statically generated. Everything is frontend except the
contact form, which posts to the same Lambda + SES backend as the current site
(`contact_form/app.py`, unchanged).

## Running it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/
npm run preview    # serve the built output
npm run check      # astro + typescript diagnostics
```

## Deploying

```bash
./deploy.sh          # build, deploy the stack, sync to S3, invalidate
./deploy.sh --site   # content-only: rebuild and sync, no CloudFormation
```

**Before the very first deploy** the domain has to be released from the old
stack. `site-fluxghg` currently serves `new.fluxghg.com`, `fluxghg.com` and
`www.fluxghg.com` from a single CloudFront distribution, and CloudFront refuses
to let two distributions claim the same alias. Steps are documented at the top
of `deploy.sh`. Until that is done the deploy fails cleanly with
`CNAMEAlreadyExists` and production is unaffected.

## Layout

```
src/
  i18n/ui.ts            all site copy, EN + pt-BR, one object per locale
  layouts/Base.astro    head, metadata, JSON-LD, header/footer shell
  components/
    Hero.astro          headline, live flux trace, stat rail
    Measure.astro       the four measured signals
    Method.astro        eddy covariance + EddyDiagram
    EddyDiagram.astro   vortices over a canopy, tower, footprint (SVG)
    Modeling.astro      spatial extrapolation + ModelDiagram
    ModelDiagram.astro  inputs → neural network → gridded NEE (SVG)
    Services.astro  Water.astro  About.astro  Team.astro  Contact.astro
  scripts/
    main.ts             header, menu, reveals, form submit, spotlight
    flux-field.ts       hero turbulence canvas + diurnal NEE trace
  assets/img/           source images (optimised at build by astro:assets)
public/                 fonts, logos, favicon, og.jpg, robots.txt
contact_form/app.py     the existing Lambda, copied as-is
template.yaml           SAM stack: S3 + CloudFront + ACM + Route53 + Lambda
shots.mjs               dev-only screenshot pass over the built site
```

### Content

All copy lives in `src/i18n/ui.ts`. The two locales share one shape, so adding a
field to `en` makes TypeScript require it in `pt`. English is served at `/`,
Portuguese at `/pt/`.

Which one a visitor lands on is decided **at the edge by viewer country**: the
CloudFront function in `template.yaml` redirects `/` to `/pt/` for viewers in
Brazil and Portugal, and serves English everywhere else. Clicking the language
switcher writes a `fluxghg-lang` cookie, which the function honours from then
on. Because the decision lives in CloudFront, `npm run dev` always shows English
at `/` — use `/pt/` directly to review the Portuguese pages locally.

### Things worth knowing

- **The site is `noindex`.** `robots.txt` disallows everything and every page
  carries a `noindex` meta tag, so the validation host cannot compete with
  `fluxghg.com` in search. Remove both in `Base.astro` and `public/robots.txt`
  when this becomes the real site.
- **The contact form contract is unchanged** — it posts `{name, email, message}`
  to `/contact`. The optional "company" field and the page URL are appended to
  the message body so the Lambda did not need to change.
- **Diagrams are hand-built SVG**, not images: they restyle with the palette,
  stay sharp at any size, and carry the translated labels.
- **Motion respects `prefers-reduced-motion`** everywhere, and the hero canvas
  stops when it scrolls out of view or the tab is hidden.
- **The flux trace in the hero is illustrative** and labelled as such in both
  languages — it is a plausible diurnal NEE shape, not measured data.
