# Quick Start: Test Pilot Request Form

## Prerequisites
- Gmail account with 2-Step Verification enabled
- Gmail App Password generated

## Steps to Test

### 1. Set Up Environment Variables

Create or edit `.env.local` in the project root:

```bash
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
PILOT_TO_EMAIL=your-email@example.com
```

**Get Gmail App Password:**
- Visit: https://myaccount.google.com/apppasswords
- Create new app password for "ModlyAI Pilot Form"
- Copy the 16-character password (no spaces)

### 2. Restart Dev Server

The dev server is already running, but you need to restart it to load the new environment variables:

```bash
# Stop the current server (Ctrl+C in terminal)
# Then start it again:
npm run dev
```

### 3. Test the Form

1. Open browser: http://localhost:3000/contact
2. Fill out the form:
   - Name: John Doe
   - Company: Acme Corp
   - Email: john@acme.com
   - Message: Interested in a pilot program for our furniture business.
3. Click "Submit Request"
4. Watch for success message

### 4. Verify Email

Check your-email@example.com inbox for:
- Subject: "New ModlyAI Pilot Request"
- Body containing all form details

## Expected Behavior

### Success:
- Button shows "Sending..." during submission
- Green success banner appears
- Form fields are cleared
- Console log: "Pilot request email sent successfully to: your-email@example.com"

### Errors:
- Red error banner with specific message
- Check console for detailed error logs
- Common issues:
  - Missing environment variables
  - Invalid Gmail App Password
  - 2-Step Verification not enabled
  - Network issues

## Troubleshooting

### "Email service is not configured"
- Check `.env.local` exists
- Verify `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set
- Restart dev server

### "Failed to send email"
- Verify Gmail App Password is correct
- Check 2-Step Verification is enabled
- Try generating a new App Password
- Check console for detailed error

### Form validation errors
- All fields are required
- Email must be valid format

## Implementation Details

**API Endpoint:** `/api/request-pilot`
**Form Page:** `/contact`
**Email Service:** Gmail via Nodemailer

## Files Modified

- Created: `src/app/api/request-pilot/route.ts`
- Modified: `src/app/contact/page.tsx`
- Added: `nodemailer` and `@types/nodemailer` packages

## Next Steps

Once testing is successful:
1. Add environment variables to production hosting
2. Consider adding rate limiting
3. Consider adding CAPTCHA
4. Update email template if needed
