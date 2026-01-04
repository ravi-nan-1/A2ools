#!/bin/bash

# List of files to fix
files=(
  "src/app/tools/1-click-article-outline-generator/page.tsx"
  "src/app/tools/ai-headshot-generator/page.tsx"
  "src/app/tools/ai-invoice-generator/page.tsx"
  "src/app/tools/ai-tutor/page.tsx"
  "src/app/tools/api-latency-checker/page.tsx"
  "src/app/tools/business-valuation-calculator/page.tsx"
  "src/app/tools/content-gap-analyzer/page.tsx"
  "src/app/tools/crypto-tax-calculator/page.tsx"
  "src/app/tools/excel-power-tools/page.tsx"
  "src/app/tools/forex-arbitrage-checker/page.tsx"
  "src/app/tools/free-image-file-compressor/page.tsx"
  "src/app/tools/global-loan-optimizer/page.tsx"
  "src/app/tools/invoice-excel-extractor/page.tsx"
  "src/app/tools/json-excel-converter/page.tsx"
  "src/app/tools/jwt-decoder-validator/page.tsx"
  "src/app/tools/keyword-cluster-generator/page.tsx"
  "src/app/tools/regex-generator-from-text/page.tsx"
  "src/app/tools/webhook-tester/page.tsx"
  "src/app/tools/tinyurl-maker/page.tsx"
)

for file in "${files[@]}"; do
  echo "Fixing: $file"
  
  # Replace import
  sed -i "s|import { generateSEOMetadata }|import type { GenerateSEOMetadataOutput }|g" "$file"
  
  # Comment out the await calls (will need manual review)
  sed -i "s|const { seoTitle, seoDescription } = await generateSEOMetadata|// const { seoTitle, seoDescription } = await generateSEOMetadata|g" "$file"
  sed -i "s|let aiContent = await generateSEOMetadata|// let aiContent = await generateSEOMetadata|g" "$file"
done

echo "Done! Please review the changes and add static fallbacks."
