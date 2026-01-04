#!/bin/bash

# Fix all translation calls with parameters
sed -i "s|t('creator.loading.summarizingPdf', { count: pdfResult.numPages })|'Summarizing PDF (' + pdfResult.numPages + ' pages)...'|g" src/app/cheatsheets/page.tsx

sed -i "s|t('toast.success.description', { contentType: result.contentType })|'Successfully generated ' + result.contentType|g" src/app/cheatsheets/page.tsx

sed -i "s|t('creator.pdf.selected', {fileName: pdfFile.name})|'Selected: ' + pdfFile.name|g" src/app/cheatsheets/page.tsx

echo "Fixed!"
