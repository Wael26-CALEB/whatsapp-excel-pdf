# WhatsApp Business Excel to PDF Automation

Automatically receives Excel/CSV files from a specific WhatsApp number, converts them to PDF, and sends them back.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from example:
```bash
cp .env.example .env
```

3. Configure your authorized number in `.env`:
```
AUTHORIZED_NUMBER=1234567890@c.us
```
Replace with the actual WhatsApp number (country code + number + @c.us)

## Usage

1. Start the bot:
```bash
npm start
```

2. Scan the QR code with your WhatsApp Business account

3. Send an Excel (.xlsx, .xls) or CSV file from the authorized number

4. The bot will automatically convert it to PDF and send it back

## How It Works

- Uses `whatsapp-web.js` to connect to WhatsApp Web
- Listens for messages from the authorized number only
- Downloads Excel/CSV attachments
- Converts them to PDF using `xlsx` and `pdfkit`
- Sends the PDF back to the sender
- Cleans up temporary files

## Deployment

See [DEPLOY.md](DEPLOY.md) for Railway deployment instructions.

## Local Development

### Requirements

- Node.js 14+
- Chrome/Chromium (for Puppeteer)

### Local Setup

Follow the setup instructions above, then run `npm start`
