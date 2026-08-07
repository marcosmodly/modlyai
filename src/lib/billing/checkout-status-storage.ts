// Shared between paddle-checkout.ts (clears it when a new checkout starts)
// and BillingCheckoutStatus.tsx (reads/writes it while polling for payment
// confirmation) so a stale timer from an earlier, already-timed-out attempt
// can't fire an instant "still confirming" state on a brand new, healthy
// payment.
export const BILLING_CHECKOUT_START_KEY = 'modly-billing-checkout-start:latest'
