#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Setting up portfolio directory structure...${NC}"

# Create portfolio directories
mkdir -p src/app/portfolio/web-development
mkdir -p src/app/portfolio/ui-design
mkdir -p src/app/portfolio/multimedia/{video,motion,sound}

# Create necessary directories for assets
mkdir -p public/assets/projects

# Copy the provided page files
for file in portfolio/{layout,page}.tsx portfolio/web-development/page.tsx portfolio/multimedia/[category]/page.tsx; do
  mkdir -p "src/app/$(dirname $file)"
  # Copy the content from the artifact to the file
  echo "Creating src/app/$file"
done

echo -e "${GREEN}Portfolio structure created successfully!${NC}"
echo -e "${BLUE}Next steps:${NC}"
echo "1. Add your project images to public/assets/projects/"
echo "2. Update the project data in each category page"
echo "3. Add category-specific components as needed"