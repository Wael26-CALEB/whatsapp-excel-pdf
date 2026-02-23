const XLSX = require('xlsx');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

/**
 * Convert Excel/CSV file to PDF
 */
async function convertToPDF(inputPath, outputPath) {
  try {
    // Read the Excel/CSV file
    const workbook = XLSX.readFile(inputPath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON for easier processing
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    // Create PDF
    const doc = new PDFDocument({ margin: 30, size: 'A4', layout: 'landscape' });
    const writeStream = fs.createWriteStream(outputPath);
    doc.pipe(writeStream);
    
    // Add title
    doc.fontSize(16).text('Converted Spreadsheet', { align: 'center' });
    doc.moveDown();
    
    // Add table data
    doc.fontSize(9);
    data.forEach((row, index) => {
      const rowText = row.join('  |  ');
      doc.text(rowText);
      
      if (index === 0) {
        doc.moveDown(0.5);
      }
    });
    
    doc.end();
    
    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => resolve(outputPath));
      writeStream.on('error', reject);
    });
  } catch (error) {
    throw new Error(`Conversion failed: ${error.message}`);
  }
}

module.exports = { convertToPDF };
