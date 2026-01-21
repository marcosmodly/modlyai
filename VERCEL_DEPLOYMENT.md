# Vercel Deployment Guide

This guide will help you deploy ModlyAI to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free tier is sufficient)
- A [Resend account](https://resend.com) with an API key
- Your GitHub/GitLab/Bitbucket repository connected to Vercel

## Step 1: Prepare Environment Variables

Before deploying, you need to configure the following environment variables in Vercel:

### Required Variables

| Variable | Description | Where to get it |
|----------|-------------|-----------------|
| `RESEND_API_KEY` | Resend API key for sending emails | Get from https://resend.com dashboard → API Keys |
| `PILOT_TO_EMAIL` | Email address to receive pilot requests | Your email address (e.g., `your-email@example.com`) |

### Optional Variables (for AI features)

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | OpenAI API key for AI features |
| `OPENAI_CHAT_MODEL` | Model for chat (default: `gpt-4o-mini`) |
| `OPENAI_VISION_MODEL` | Model for image analysis (default: `gpt-4o`) |
| `OPENAI_IMAGE_MODEL` | Model for image generation (default: `dall-e-3`) |

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. **Import your project:**
   - Go to https://vercel.com/new
   - Select your Git repository
   - Click "Import"

2. **Configure project:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

3. **Add environment variables:**
   - Click "Environment Variables"
   - Add each variable from the table above:
     ```
     RESEND_API_KEY = re_xxxxxxxxxxxxx
     PILOT_TO_EMAIL = your-email@example.com
     ```
   - Make sure to add them for **Production**, **Preview**, and **Development** environments

4. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete (usually 1-2 minutes)

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Set environment variables:**
   ```bash
   vercel env add RESEND_API_KEY
   vercel env add PILOT_TO_EMAIL
   ```
   Follow the prompts to enter the values.

5. **Deploy to production:**
   ```bash
   vercel --prod
   ```

## Step 3: Verify Deployment

After deployment, verify that everything works:

1. **Check build logs:**
   - Go to your Vercel dashboard
   - Click on your deployment
   - Check the "Building" and "Functions" logs for any errors

2. **Test the pilot request form:**
   - Navigate to your deployed URL
   - Go to the contact/pilot request page
   - Submit a test form
   - Verify you receive the email at `PILOT_TO_EMAIL`

3. **Check environment variables:**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Verify all required variables are set
   - Make sure there are no typos or extra spaces

## Step 4: Configure Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Troubleshooting

### Build Fails

**Error: "Module not found"**
- Solution: Make sure all dependencies are in `package.json`
- Run `npm install` locally to verify

**Error: "Environment variable not found"**
- Solution: Check that all required env vars are set in Vercel dashboard
- Remember: variables must be set for the environment you're deploying to (Production/Preview/Development)

### Email Not Sending

**Error: "Email service not configured"**
- Check server logs in Vercel dashboard (Functions tab)
- Verify `RESEND_API_KEY` and `PILOT_TO_EMAIL` are set correctly
- Make sure there are no extra spaces or quotes in the values
- Verify your Resend API key is valid (not expired or deleted)

**Email sends but doesn't arrive:**
- Check your Resend dashboard for delivery status
- Verify the email address in `PILOT_TO_EMAIL` is correct
- Check spam folder
- For custom domains, verify domain configuration in Resend

### Runtime Errors

1. **Check Function Logs:**
   - Vercel Dashboard → Your Project → Functions tab
   - Look for errors in real-time logs

2. **Enable detailed logging:**
   - Add `console.log` statements in your API routes
   - Deploy and check the logs

3. **Common issues:**
   - Missing environment variables
   - API rate limits exceeded (Resend free tier: 100 emails/day)
   - Invalid API keys

## Security Checklist

Before deploying, verify:

- [ ] No hardcoded secrets in code (use environment variables)
- [ ] `.env.local` is in `.gitignore` (already configured)
- [ ] All API keys are set in Vercel environment variables
- [ ] Environment variables are not exposed in client-side code
- [ ] Resend API key has appropriate permissions

## Monitoring

After deployment, monitor your application:

1. **Vercel Analytics:**
   - Enable in Vercel dashboard → Analytics tab
   - Track page views, performance, and errors

2. **Function Logs:**
   - Monitor API route usage
   - Check for errors or rate limiting

3. **Resend Dashboard:**
   - Monitor email delivery rates
   - Track API usage and limits
   - Check for bounce/spam reports

## Updates and Redeployments

Every push to your main branch will automatically trigger a new deployment. To manually redeploy:

1. Go to Vercel dashboard
2. Select your project
3. Click "Redeploy" on any previous deployment

## Support

If you encounter issues:

- Check [Vercel Documentation](https://vercel.com/docs)
- Check [Next.js Documentation](https://nextjs.org/docs)
- Check [Resend Documentation](https://resend.com/docs)
- Review Function Logs in Vercel dashboard

## Cost Considerations

### Vercel Free Tier
- 100GB bandwidth/month
- Unlimited deployments
- Serverless Function execution: 100GB-hours
- 6,000 serverless function invocations per day

### Resend Free Tier
- 100 emails/day
- 3,000 emails/month
- No credit card required

Both free tiers are sufficient for MVP/pilot testing. Monitor usage in respective dashboards.
