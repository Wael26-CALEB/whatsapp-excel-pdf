const libre = require('libreoffice-convert');
const fs = require('fs');
const { promisify } = require('util');

const libreConvert = promisify(libre.convert);

/**
 * Convert Excel/CSV file to PDF using LibreOffice
 * Preserves all formatting, colors, and styles exactly as in Excel
 */
async function convertToPDF(inputPath, outputPath) {
  try {
    // Read the Excel file
    const file = fs.readFileSync(inputPath);
    
    // Convert to PDF using LibreOffice
    const pdfBuffer = await libreConvert(file, '.pdf', undefined);
    
    // Write the PDF file
    fs.writeFileSync(outputPath, pdfBuffer);
    
    return outputPath;
  } catch (error) {
    throw new Error(`Conversion failed: ${error.message}`);
  }
}

module.exports = { convertToPDF };
