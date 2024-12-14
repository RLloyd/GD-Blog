#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting codebase cleanup...${NC}"

# Create backup
timestamp=$(date +%Y%m%d_%H%M%S)
backup_dir="../blog-backup-$timestamp"

echo -e "${BLUE}Creating backup in $backup_dir...${NC}"
mkdir -p $backup_dir
cp -r . $backup_dir

# First, let's list all CSS files to see what we have
echo -e "${BLUE}Listing all CSS files in the project:${NC}"
find . -name "*.css"

echo -e "${BLUE}Proceeding with cleanup of unused files...${NC}"

# Clean up unused imports
echo -e "${BLUE}Cleaning up unused imports...${NC}"
npm install -D eslint-plugin-unused-imports
npx eslint --fix "src/**/*.{ts,tsx}"

echo -e "${GREEN}Cleanup complete! Please review changes.${NC}"
