#!/bin/bash

# GreenEngine Platform Deployment Script
# This script automates the deployment process

set -e  # Exit on any error

echo "========================================"
echo "GreenEngine Platform Deployment"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "ℹ $1"
}

# Check if .env exists
if [ ! -f .env ]; then
    print_error ".env file not found!"
    print_info "Please copy .env.example to .env and configure it first"
    exit 1
fi

print_success ".env file found"

DEPLOY_BRANCH="${DEPLOY_BRANCH:-develop}"

# Create necessary directories
print_info "Creating necessary directories..."
mkdir -p data uploads logs
print_success "Directories created"

# Pull latest changes (if in git repo)
if [ -d .git ]; then
    print_info "Deploying branch: $DEPLOY_BRANCH"
    if ! git diff --quiet || ! git diff --cached --quiet; then
        print_error "Working tree has uncommitted changes. Commit, stash, or remove them before deploying."
        exit 1
    fi

    git fetch origin "$DEPLOY_BRANCH"
    CURRENT_BRANCH="$(git branch --show-current)"
    if [ "$CURRENT_BRANCH" != "$DEPLOY_BRANCH" ]; then
        print_info "Switching from $CURRENT_BRANCH to $DEPLOY_BRANCH..."
        git checkout "$DEPLOY_BRANCH"
    fi
    git pull --ff-only origin "$DEPLOY_BRANCH"
    print_success "Git branch is up to date"
fi

# Install dependencies
print_info "Installing dependencies..."
npm install --production=false
print_success "Dependencies installed"

# Push database schema
print_info "Pushing database schema..."
npm run db:push
print_success "Database schema updated"

# Seed database only when explicitly requested. Interactive prompts can block automated deployments.
if [ "${SEED_DATABASE:-false}" = "true" ]; then
    print_info "Seeding database..."
    node --loader tsx server/seed.ts
    print_success "Database seeded"
else
    print_warning "Skipping database seeding. Set SEED_DATABASE=true to seed during deployment."
fi

# Build application
print_info "Building application..."
rm -rf dist
npm run build
print_success "Application built"
print_info "Current build entry:"
grep -o 'assets/[^"]*' dist/public/index.html | head -n 2 || true

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    print_error "PM2 is not installed!"
    print_info "Install it with: sudo npm install -g pm2"
    exit 1
fi

# Start or restart application with PM2
print_info "Starting/Restarting application with PM2..."
if pm2 describe greenengine > /dev/null 2>&1; then
    pm2 restart greenengine --update-env
    pm2 save
    print_success "Application restarted"
else
    pm2 start ecosystem.config.cjs
    pm2 save
    print_success "Application started"
fi

# Show PM2 status
echo ""
print_info "Application status:"
pm2 list

echo ""
print_success "Deployment completed successfully!"
echo ""
print_info "Useful commands:"
echo "  pm2 logs greenengine    - View application logs"
echo "  pm2 monit              - Monitor application"
echo "  pm2 restart greenengine - Restart application"
echo "  pm2 stop greenengine    - Stop application"
echo ""
