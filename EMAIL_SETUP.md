# Email Configuration Setup

This application uses Gmail with Nodemailer to send pilot request emails.

## Environment Variables Required

Create or update your `.env.local` file with the following variables:

```
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-app-password-here
PILOT_TO_EMAIL=your-email@example.com
```

## How to Get a Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to Security
3. Enable 2-Step Verification (required for App Passwords)
4. Go to App Passwords: https://myaccount.google.com/apppasswords
5. Select "Mail" and "Other (Custom name)"
6. Enter a name like "ModlyAI Pilot Form"
7. Click Generate
8. Copy the 16-character password (spaces will be removed automatically)
9. Paste it as the value for `GMAIL_APP_PASSWORD` in your `.env.local` file

## Testing

1. Start the development server: `npm run dev`
2. Go to http://localhost:3000/contact
3. Fill out the form and submit
4. Check the inbox at your-email@example.com

## Notes

- Never commit `.env.local` to version control
- The Gmail App Password is different from your regular Gmail password
- App Passwords only work with 2-Step Verification enabled
- The form is already wired up at `/contact` page
