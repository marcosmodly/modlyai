// Docs: https://www.instantdb.com/docs/permissions
//
// SECURITY NOTE: this app authenticates users via NextAuth (see src/lib/auth-options.ts),
// NOT via InstantDB's own auth. That means the InstantDB client SDK (src/lib/instantdb.ts,
// used in the browser with the public NEXT_PUBLIC_INSTANTDB_APP_ID) is never actually
// signed in from InstantDB's point of view - `auth.id` will always be null for every
// client-side request. All legitimate reads/writes to `users` and `stores` happen
// server-side through the admin SDK (src/lib/instant-admin.ts), which bypasses these
// rules entirely and enforces its own authorization via the NextAuth session.
//
// Because of that, `users` and `stores` must deny ALL client access - there is no
// client-side use case for them, and a namespace with no rule defaults to allow-all,
// which would otherwise expose every user's password hash and every store's API keys,
// Shopify/WooCommerce credentials, etc. to anyone holding the public app ID.
//
// `products` is intentionally left publicly readable (it's genuinely public catalog
// data used by the customer-facing widget), but writes are denied - all product writes
// go through the admin SDK during import/sync.

import type { InstantRules } from "@instantdb/react";

const rules = {
  users: {
    allow: {
      view: "false",
      create: "false",
      update: "false",
      delete: "false",
    },
  },
  stores: {
    allow: {
      view: "false",
      create: "false",
      update: "false",
      delete: "false",
    },
  },
  products: {
    allow: {
      view: "true",
      create: "false",
      update: "false",
      delete: "false",
    },
  },
  syncEvents: {
    allow: {
      view: "false",
      create: "false",
      update: "false",
      delete: "false",
    },
  },
  sessions: {
    allow: {
      view: "false",
      create: "false",
      update: "false",
      delete: "false",
    },
  },
  notifications: {
    allow: {
      view: "false",
      create: "false",
      update: "false",
      delete: "false",
    },
  },
  events: {
    allow: {
      view: "false",
      create: "false",
      update: "false",
      delete: "false",
    },
  },
} satisfies InstantRules;

export default rules;
