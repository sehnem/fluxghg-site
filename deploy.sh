#!/bin/bash

# FluxGHG Website Deployment Script
# This script builds and deploys the SAM application and syncs static files to S3

set -e  # Exit on error

# Configuration
PROFILE="josue"
REGION="us-east-1"
STACK_NAME="site-fluxghg"
SAM_BUCKET="aws-sam-cli-managed-default-samclisourcebucket-kciwzssaxibz"
WEBSITE_BUCKET="new.fluxghg.com"

# Parameters
DOMAIN_NAME="new.fluxghg.com"
ROOT_DOMAIN_NAME="fluxghg.com"
HOSTED_ZONE_ID="Z037154238ANF0R21VCMI"

echo "=========================================="
echo "FluxGHG Website Deployment"
echo "=========================================="
echo "Profile: $PROFILE"
echo "Region: $REGION"
echo "Stack: $STACK_NAME"
echo "=========================================="

# Step 1: Build the SAM application
echo ""
echo "Step 1: Building SAM application..."
sam build --profile $PROFILE

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# Step 2: Deploy the SAM application
echo ""
echo "Step 2: Deploying SAM application..."
sam deploy \
    --profile $PROFILE \
    --region $REGION \
    --stack-name $STACK_NAME \
    --s3-bucket $SAM_BUCKET \
    --capabilities CAPABILITY_IAM \
    --parameter-overrides \
        DomainName=$DOMAIN_NAME \
        RootDomainName=$ROOT_DOMAIN_NAME \
        HostedZoneId=$HOSTED_ZONE_ID \
    --no-confirm-changeset \
    --no-fail-on-empty-changeset

if [ $? -ne 0 ]; then
    echo "❌ Deployment failed!"
    exit 1
fi

echo "✅ Deployment successful!"

# Step 3: Sync static files to S3
echo ""
echo "Step 3: Syncing static files to S3..."
aws s3 sync static/ s3://$WEBSITE_BUCKET/ \
    --profile $PROFILE \
    --region $REGION \
    --delete \
    --exclude ".DS_Store" \
    --exclude "*.pyc" \
    --cache-control "public, max-age=86400"

if [ $? -ne 0 ]; then
    echo "❌ S3 sync failed!"
    exit 1
fi

echo "✅ Static files synced!"

# Step 4: Get CloudFront Distribution ID and invalidate cache
echo ""
echo "Step 4: Invalidating CloudFront cache..."

# Get the CloudFront distribution ID from the stack
DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
    --profile $PROFILE \
    --region $REGION \
    --stack-name $STACK_NAME \
    --query "Stacks[0].Outputs[?OutputKey=='CloudFrontURL'].OutputValue" \
    --output text 2>/dev/null || echo "")

if [ -z "$DISTRIBUTION_ID" ]; then
    echo "⚠️  Could not find CloudFront distribution ID automatically"
    echo "   You may need to manually invalidate the cache in the AWS Console"
else
    # Extract just the distribution domain
    DISTRIBUTION_DOMAIN=$DISTRIBUTION_ID
    
    # Get the actual distribution ID
    DIST_ID=$(aws cloudfront list-distributions \
        --profile $PROFILE \
        --query "DistributionList.Items[?DomainName=='$DISTRIBUTION_DOMAIN'].Id" \
        --output text 2>/dev/null || echo "")
    
    if [ ! -z "$DIST_ID" ]; then
        aws cloudfront create-invalidation \
            --profile $PROFILE \
            --distribution-id $DIST_ID \
            --paths "/*"
        
        if [ $? -eq 0 ]; then
            echo "✅ CloudFront cache invalidation started!"
        else
            echo "⚠️  CloudFront invalidation failed, but deployment is complete"
        fi
    else
        echo "⚠️  Could not create invalidation - distribution not found"
    fi
fi

# Step 5: Display outputs
echo ""
echo "=========================================="
echo "Deployment Complete! 🎉"
echo "=========================================="

# Get stack outputs
echo ""
echo "Stack Outputs:"
aws cloudformation describe-stacks \
    --profile $PROFILE \
    --region $REGION \
    --stack-name $STACK_NAME \
    --query "Stacks[0].Outputs" \
    --output table

echo ""
echo "Website URL: https://$DOMAIN_NAME"
echo "S3 Bucket: s3://$WEBSITE_BUCKET"
echo ""
echo "=========================================="

