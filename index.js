require('dotenv').config();
const WhatsAppBot = require('./utils/whatsapp');

// Validate environment variables
if (!process.env.AUTHORIZED_NUMBER) {
  console.error('Error: AUTHORIZED_NUMBER is not set in .env file');
  process.exit(1);
}

// Initialize bot
const bot = new WhatsAppBot(process.env.AUTHORIZED_NUMBER);

bot.initialize().catch(error => {
  console.error('Failed to initialize bot:', error);
  process.exit(1);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down gracefully...');
  process.exit(0);
});
