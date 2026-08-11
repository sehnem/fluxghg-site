#!/usr/bin/env bash
#
# Deploy the fluxGHG site to https://fluxghg.com (also serves www.fluxghg.com
# and new.fluxghg.com from the same CloudFront distribution).
#
#   ./deploy.sh            build + deploy infra + sync + invalidate
#   ./deploy.sh --site     skip the SAM deploy, just rebuild and sync files
#
# The retired v1 site (legacy-v1/) is left running with no domain aliases —
# a rollback path, not a live site. See legacy-v1/template.yaml.

set -euo pipefail

PROFILE="${AWS_PROFILE:-josue}"
REGION="us-east-1"
STACK_NAME="fluxghg-site-v2"
SAM_BUCKET="aws-sam-cli-managed-default-samclisourcebucket-kciwzssaxibz"

DOMAIN_NAME="new.fluxghg.com"
ROOT_DOMAIN_NAME="fluxghg.com"
HOSTED_ZONE_ID="Z037154238ANF0R21VCMI"

SITE_ONLY=false
[[ "${1:-}" == "--site" ]] && SITE_ONLY=true

cd "$(dirname "$0")"

say() { printf '\n\033[1m%s\033[0m\n' "$*"; }

# ---------------------------------------------------------------- 1. build
say "Building the static site"
npm ci --silent
npm run build

[[ -f dist/index.html ]] || { echo "build produced no dist/index.html"; exit 1; }

# ------------------------------------------------------------ 2. infra
if [[ "$SITE_ONLY" == false ]]; then
  say "Deploying infrastructure ($STACK_NAME)"
  sam build --profile "$PROFILE"
  sam deploy \
    --profile "$PROFILE" \
    --region "$REGION" \
    --stack-name "$STACK_NAME" \
    --s3-bucket "$SAM_BUCKET" \
    --capabilities CAPABILITY_IAM \
    --parameter-overrides \
      DomainName="$DOMAIN_NAME" \
      RootDomainName="$ROOT_DOMAIN_NAME" \
      HostedZoneId="$HOSTED_ZONE_ID" \
    --no-confirm-changeset \
    --no-fail-on-empty-changeset
fi

stack_output() {
  aws cloudformation describe-stacks \
    --profile "$PROFILE" --region "$REGION" --stack-name "$STACK_NAME" \
    --query "Stacks[0].Outputs[?OutputKey=='$1'].OutputValue" --output text
}

BUCKET="$(stack_output BucketName)"
DIST_ID="$(stack_output DistributionId)"

# ------------------------------------------------------------ 3. upload
# Hashed assets are immutable; HTML must always be revalidated so a deploy is
# visible immediately rather than after a day of browser caching.
say "Uploading to s3://$BUCKET"

aws s3 sync dist/ "s3://$BUCKET/" \
  --profile "$PROFILE" --region "$REGION" \
  --delete \
  --exclude ".DS_Store" \
  --exclude "*.html" \
  --exclude "*.xml" \
  --exclude "*.txt" \
  --cache-control "public, max-age=31536000, immutable"

aws s3 sync dist/ "s3://$BUCKET/" \
  --profile "$PROFILE" --region "$REGION" \
  --exclude "*" \
  --include "*.html" \
  --include "*.xml" \
  --include "*.txt" \
  --cache-control "public, max-age=0, must-revalidate"

# ------------------------------------------------------------ 4. invalidate
say "Invalidating CloudFront ($DIST_ID)"
aws cloudfront create-invalidation \
  --profile "$PROFILE" \
  --distribution-id "$DIST_ID" \
  --paths "/*" \
  --query 'Invalidation.Id' --output text

say "Done — https://$ROOT_DOMAIN_NAME"
