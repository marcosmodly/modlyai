# Email Configuration Setup Guide

## Required Environment Variables

The "Request a Pilot" form requires the following environment variables to be set in your `.env.local` file:

### 1. RESEND_API_KEY
Your Resend API key for sending emails.

**How to get a Resend API key:**
1. Go to https://resend.com
2. Sign up or log in to your account
3. Navigate to API Keys in your dashboard
4. Create a new API key
5. Copy the API key (it will only be shown once)

```
RESEND_API_KEY=re_123456789abcdefghijklmnop
```

### 2. PILOT_TO_EMAIL
The email address where pilot request emails should be sent.

```
PILOT_TO_EMAIL=your-email@example.com
```

## Complete .env.local Example

Create or update your `.env.local` file in the root directory:

```bash
# Resend Configuration for Pilot Request Form
RESEND_API_KEY=re_123456789abcdefghijklmnop
PILOT_TO_EMAIL=your-email@example.com
```

## Verification

After setting up your environment variables:

1. Restart your Next.js development server
2. Check the terminal/console logs when you submit the form
3. You should see: `[Pilot Request API] Environment variables status:` with RESEND_API_KEY set to `true`
4. If successful, you'll see a log with the email ID: `Email sent successfully to: ... ID: ...`

## Troubleshooting

- If you see "Email service not configured", make sure RESEND_API_KEY is set in `.env.local`
- Check the server console logs for the environment variables status
- Make sure there are no spaces or quotes around your values in `.env.local`
- Restart your dev server after changing `.env.local`
- Resend free tier allows 100 emails per day and 3,000 per month

## Notes

- Resend uses `onboarding@resend.dev` as the default sender for testing
- To use a custom domain, you'll need to verify your domain in Resend dashboard
- No database or additional setup is required
