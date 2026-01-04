#!/bin/bash

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
  
  # Comment out the arguments too
  sed -i '/\/\/ const { seoTitle, seoDescription } = await generateSEOMetadata({/,/});/{s/^/\/\/ /}' "$file"
  sed -i '/\/\/ let aiContent = await generateSEOMetadata({/,/});/{s/^/\/\/ /}' "$file"
done

echo "Done!"
