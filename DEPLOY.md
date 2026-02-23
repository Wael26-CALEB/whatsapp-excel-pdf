# Deploy to Railway

## Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## Step 2: Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Sign up/login with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Railway will automatically detect and deploy

## Step 3: Add Environment Variable

1. In Railway dashboard, go to your project
2. Click on "Variables" tab
3. Add variable:
   - Key: `AUTHORIZED_NUMBER`
   - Value: `1234567890@c.us` (replace with actual number)
4. Click "Add" and redeploy

## Step 4: Scan QR Code

1. Go to "Deployments" tab
2. Click on the latest deployment
3. View logs
4. You'll see a QR code in the logs
5. Scan it with your WhatsApp Business app

## Done!

Your bot is now running 24/7 on Railway. Send an Excel/CSV file from the authorized number to test it.

## Monitoring

- View logs in Railway dashboard
- Check deployment status
- Bot will auto-restart if it crashes

## Notes

- Railway free tier: 500 hours/month (enough for 24/7)
- First deployment takes 2-3 minutes
- QR code expires after ~20 seconds, refresh logs if needed
- Session persists between deployments
