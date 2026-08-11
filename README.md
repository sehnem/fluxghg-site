# fluxGHG — website

Production site for **https://fluxghg.com**, also served at `www.fluxghg.com`
and `new.fluxghg.com` (kept working for continuity). Astro 5 + Tailwind 4,
statically generated. Everything is frontend except the contact form, which
posts to a Lambda + SES backend (`contact_form/app.py`).

The previous site is archived under [`legacy-v1/`](legacy-v1/) — its
CloudFront distribution and S3 bucket are still deployed, just detached from
every domain, as a rollback path. See that directory's own notes if a
rollback is ever needed.

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

`template.yaml` provisions a private S3 bucket behind CloudFront (OAC, no
public bucket access), the contact form Lambda + API Gateway, an ACM
certificate covering all three domains, and the Route53 records for each.

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
contact_form/app.py     the contact form Lambda
template.yaml           SAM stack: S3 + CloudFront + ACM + Route53 + Lambda
shots.mjs               dev-only screenshot pass over the built site
legacy-v1/              the retired v1 site, kept as a rollback path
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

- **The contact form contract** posts `{name, email, message}` to `/contact`.
  The optional "company" field and the page URL are appended to the message
  body so the Lambda did not need to change.
- **Diagrams are hand-built SVG**, not images: they restyle with the palette,
  stay sharp at any size, and carry the translated labels.
- **Motion respects `prefers-reduced-motion`** everywhere, and the hero canvas
  stops when it scrolls out of view or the tab is hidden.
- **The flux trace in the hero is illustrative** and labelled as such in both
  languages — it is a plausible diurnal NEE shape, not measured data.
