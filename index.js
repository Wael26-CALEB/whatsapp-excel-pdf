require('dotenv').config();
const WhatsAppBot = require('./utils/whatsapp');

// Validate environment variables
if (!process.env.AUTHORIZED_NUMBER) {
  console.error('Error: AUTHORIZED_NUMBER environment variable is not set');
  console.error('Please add AUTHORIZED_NUMBER in Railway Variables tab');
  process.exit(1);
}

console.log('Environment check passed. Authorized number configured.');

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
