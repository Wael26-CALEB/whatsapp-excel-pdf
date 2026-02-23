const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
const { convertToPDF } = require('./converter');

class WhatsAppBot {
  constructor(authorizedNumbers) {
    // Support both single number (string) and multiple numbers (array or comma-separated string)
    if (typeof authorizedNumbers === 'string') {
      this.authorizedNumbers = authorizedNumbers.split(',').map(num => num.trim());
    } else if (Array.isArray(authorizedNumbers)) {
      this.authorizedNumbers = authorizedNumbers;
    } else {
      this.authorizedNumbers = [authorizedNumbers];
    }
    
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu'
        ],
        executablePath: process.env.CHROME_BIN || process.env.PUPPETEER_EXECUTABLE_PATH
      }
    });
    
    this.setupEventHandlers();
  }

  setupEventHandlers() {
    this.client.on('qr', (qr) => {
      console.log('Scan this QR code with WhatsApp:');
      qrcode.generate(qr, { small: true });
    });

    this.client.on('ready', () => {
      console.log('WhatsApp client is ready!');
      console.log(`Authorized numbers: ${this.authorizedNumbers.join(', ')}`);
    });

    this.client.on('message', async (message) => {
      await this.handleMessage(message);
    });
  }

  async handleMessage(message) {
    try {
      // Check if message is from any authorized number
      if (!this.authorizedNumbers.includes(message.from)) {
        return;
      }

      // Check if message has media attachment
      if (!message.hasMedia) {
        return;
      }

      const media = await message.downloadMedia();
      
      // Check if it's Excel or CSV
      const validMimeTypes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv'
      ];
      
      if (!validMimeTypes.includes(media.mimetype)) {
        await message.reply('Please send an Excel (.xlsx, .xls) or CSV file.');
        return;
      }

      await message.reply('Processing your file...');

      // Save the file temporarily
      const tempDir = path.join(__dirname, '../temp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      const timestamp = Date.now();
      const inputPath = path.join(tempDir, `input_${timestamp}.xlsx`);
      const outputPath = path.join(tempDir, `output_${timestamp}.pdf`);

      // Write media to file
      fs.writeFileSync(inputPath, media.data, 'base64');

      // Convert to PDF
      await convertToPDF(inputPath, outputPath);

      // Send PDF back
      const pdfMedia = MessageMedia.fromFilePath(outputPath);
      await this.client.sendMessage(message.from, pdfMedia, {
        caption: 'Here is your converted PDF file.'
      });

      // Cleanup
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);

    } catch (error) {
      console.error('Error processing message:', error);
      await message.reply('Sorry, there was an error processing your file.');
    }
  }

  async initialize() {
    await this.client.initialize();
  }
}

module.exports = WhatsAppBot;
