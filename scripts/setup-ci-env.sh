#!/bin/bash

# This script helps set up environment variables for CI environments
# Usage: ./setup-ci-env.sh [environment]
# where environment is one of: dev, staging, prod

# Exit on error
set -e

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 [dev|staging|prod]"
    exit 1
fi

ENV=$1

# Create .env file based on environment
case $ENV in
  dev)
    echo "Setting up development environment..."
    echo "APP_ENV=development" > .env
    ;;
  staging)
    echo "Setting up staging environment..."
    echo "APP_ENV=staging" > .env
    ;;
  prod)
    echo "Setting up production environment..."
    echo "APP_ENV=production" > .env
    ;;
  *)
    echo "Invalid environment: $ENV"
    echo "Use one of: dev, staging, prod"
    exit 1
    ;;
esac

# Add OpenAI API key if provided
if [ -n "$OPENAI_API_KEY" ]; then
    echo "OPENAI_API_KEY=$OPENAI_API_KEY" >> .env
else
    echo "Warning: OPENAI_API_KEY not set in environment variables"
fi

# Add Expo Project ID if provided
if [ -n "$EAS_PROJECT_ID" ]; then
    echo "EAS_PROJECT_ID=$EAS_PROJECT_ID" >> .env
else
    echo "Warning: EAS_PROJECT_ID not set in environment variables"
fi

echo "Environment file created at .env"
echo "Contents:"
cat .env
