# fluxGHG — legacy v1 site (retired)

This is the site that ran at `fluxghg.com` before the redesign now at the
repo root. It has been retired: **its stack (`site-fluxghg`) is still
deployed — bucket, CloudFront distribution, Lambda — but has no domain
aliases attached.** It is not live and gets no traffic. It exists purely as
a rollback path, and running `sam deploy` against `template.yaml` here will
not attach any domain (`Aliases` is hardcoded to `[]`).

## Rolling back to this site, if ever needed

1. In the *current* production stack (`../template.yaml`, stack
   `fluxghg-site-v2`), remove `fluxghg.com` / `www.fluxghg.com` from
   `Aliases` and drop their `DomainRecords` entries; deploy that stack first
   so the domains are actually free (CloudFront rejects an alias claimed by
   two distributions).
2. In `template.yaml` here, restore the `Aliases` list (`RootDomainName`,
   `www.${RootDomainName}`) and the `RootDomainRecord` / `WwwDomainRecord`
   resources — see git history for the exact shape before retirement.
3. `sam build && sam deploy` from this directory with the same
   `DomainName=new.fluxghg.com RootDomainName=fluxghg.com
   HostedZoneId=Z037154238ANF0R21VCMI` parameters used previously.

## What's here

- `static/` — the plain HTML/CSS/JS site
- `contact_form/app.py` — the same contact form Lambda the current site uses
- `template.yaml` — the original SAM stack (public S3 bucket, no OAC)
- `deploy.sh`, `buildspec.yml` — its original deploy tooling, unchanged
  except for the alias removal described above
