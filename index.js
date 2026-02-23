require('dotenv').config();
const WhatsAppBot = require('./utils/whatsapp');

// Validate environment variables
const authorizedNumbers = process.env.AUTHORIZED_NUMBERS || process.env.AUTHORIZED_NUMBER;

if (!authorizedNumbers) {
  console.error('Error: AUTHORIZED_NUMBERS environment variable is not set');
  console.error('Please add AUTHORIZED_NUMBERS in .env file (comma-separated for multiple numbers)');
  process.exit(1);
}

console.log('Environment check passed. Authorized number(s) configured.');

// Initialize bot
const bot = new WhatsAppBot(authorizedNumbers);

bot.initialize().catch(error => {
  console.error('Failed to initialize bot:', error);
  process.exit(1);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down gracefully...');
  process.exit(0);
});
