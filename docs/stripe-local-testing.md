# Stripe Local Webhook Testing on Windows

Use this when PowerShell says `stripe is not recognized as the name of a cmdlet`. That means the Stripe CLI is not installed or the folder containing `stripe.exe` is not available in your Windows `PATH`.

Do not put Stripe secret keys in client-side code. `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` belong in `.env.local` only.

## Install Stripe CLI

### Option A: Install with winget

Run this in PowerShell:

```powershell
winget install -e --id Stripe.StripeCli
```

Close and reopen PowerShell, then verify:

```powershell
stripe --version
```

### Option B: Install manually

1. Open the official Stripe CLI install page: https://docs.stripe.com/stripe-cli
2. Download the Windows zip.
3. Extract `stripe.exe` into a local folder, for example `C:\stripe`.
4. Add the folder containing `stripe.exe` to your Windows `PATH`.
5. Close and reopen PowerShell.
6. Verify:

```powershell
stripe --version
```

## Log In To Stripe

Run:

```powershell
stripe login
```

Follow the browser login flow.

## Listen For ModlyAI Webhooks

Make sure the ModlyAI app is already running on port `3000`, then run:

```powershell
stripe listen --forward-to localhost:3000/api/billing/webhook
```

The Stripe CLI prints a webhook signing secret that starts with `whsec_`.

Copy it into `.env.local`:

```env
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

Restart the dev server after changing `.env.local`, because Next.js only reads environment variables at process startup.

## Expected Events

After completing Stripe Checkout for a subscription, the Stripe CLI terminal should show events like:

```text
checkout.session.completed
customer.subscription.created
customer.subscription.updated
```

ModlyAI should update these InstantDB `stores` fields:

```text
stripeCustomerId
stripeSubscriptionId
subscriptionStatus
subscriptionPlan
currentPeriodEnd
```

`subscriptionPlan` comes from Checkout metadata and should be `starter` or `growth`.

## Manual Checkout Test Flow

1. Confirm `.env.local` has:

```env
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
STRIPE_PRICE_STARTER=price_xxx
STRIPE_PRICE_GROWTH=price_xxx
```

2. Start the ModlyAI app in another terminal using your normal local workflow.
3. Start the Stripe listener:

```powershell
stripe listen --forward-to localhost:3000/api/billing/webhook
```

4. Sign in to ModlyAI.
5. Open `/dashboard/settings`.
6. Click Starter or Growth Subscribe.
7. Complete Checkout with a Stripe test card.
8. Confirm the Stripe CLI prints the expected events.
9. Confirm the InstantDB store has updated billing fields.

## Troubleshooting

If PowerShell still says `stripe is not recognized`, reopen the terminal and verify the folder containing `stripe.exe` is in `PATH`.

If the webhook returns a signature error, copy the latest `whsec_...` from the current `stripe listen` process into `.env.local`, then restart the dev server.

If the webhook receives events but the store does not update, confirm the Checkout Session metadata includes `userId`, `storeId`, and `plan`.
