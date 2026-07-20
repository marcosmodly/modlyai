// Docs: https://www.instantdb.com/docs/modeling-data

import { i } from "@instantdb/react";

const _schema = i.schema({
  entities: {
    $files: i.entity({
      path: i.string().unique().indexed(),
      url: i.string(),
    }),
    $streams: i.entity({
      abortReason: i.string().optional(),
      clientId: i.string().unique().indexed(),
      done: i.boolean().optional(),
      size: i.number().optional(),
    }),
    $users: i.entity({
      email: i.string().unique().indexed().optional(),
      imageURL: i.string().optional(),
      type: i.string().optional(),
    }),
    events: i.entity({
      createdAt: i.any().optional(),
      metadata: i.any().optional(),
      storeId: i.any().optional(),
      type: i.any().optional(),
    }),
    products: i.entity({
      category: i.string().optional(),
      colors: i.string().optional(),
      createdAt: i.any().optional(),
      customizationOptions: i.any().optional(),
      description: i.string().optional(),
      externalId: i.any().optional(),
      "externalId ": i.any().optional(),
      handle: i.string().optional(),
      height: i.number().optional(),
      image: i.any().optional(),
      imageUrl: i.string().optional(),
      length: i.number().optional(),
      materials: i.string().optional(),
      name: i.string().optional(),
      price: i.any().optional(),
      productUrl: i.string().optional(),
      shopifyProductId: i.string().optional(),
      sku: i.string().optional(),
      source: i.string().optional(),
      status: i.string().optional(),
      storeId: i.string().optional(),
      title: i.any().optional(),
      updatedAt: i.any().optional(),
      url: i.any().optional(),
      width: i.number().optional(),
    }),
    stores: i.entity({
      aiChatsUsed: i.number().optional(),
      apiKey: i.any().optional(),
      cancelAtPeriodEnd: i.any().optional(),
      catalogSource: i.any().optional(),
      createdAt: i.any().optional(),
      credentials: i.any().optional(),
      currentPeriodEnd: i.string().optional(),
      domain: i.any().optional(),
      enableCustomize: i.boolean().optional(),
      enableRequestQuote: i.boolean().optional(),
      enableViewInCatalog: i.boolean().optional(),
      enabledActions: i.any().optional(),
      fontColor: i.string().optional(),
      lastSyncedAt: i.any().optional(),
      lastSyncAt: i.any().optional(),
      messageTextColor: i.any().optional(),
      name: i.any().optional(),
      ownerEmail: i.any().optional(),
      paddleCustomerId: i.string().optional(),
      paddleSubscriptionId: i.string().optional(),
      platform: i.any().optional(),
      primaryColor: i.string().optional(),
      productCount: i.any().optional(),
      quoteEmail: i.string().optional(),
      roomPlannerAnalysesUsed: i.number().optional(),
      shopifyAccessToken: i.string().optional(),
      shopifyConnectedAt: i.string().optional(),
      shopifyLastSyncedAt: i.string().optional(),
      shopifyStoreDomain: i.any().optional(),
      "shopifyStoreDomain ": i.string().optional(),
      setupComplete: i.any().optional(),
      storeUrl: i.string().optional(),
      subscriptionPlan: i.string().optional(),
      subscriptionStatus: i.string().optional(),
      supportEmail: i.string().optional(),
      titleColor: i.any().optional(),
      trialEndsAt: i.string().optional(),
      trialStartedAt: i.string().optional(),
      updatedAt: i.any().optional(),
      url: i.any().optional(),
      userId: i.any().optional(),
      welcomeMessage: i.string().optional(),
      widgetId: i.any().optional(),
      widgetButtonStyle: i.string().optional(),
      widgetLogoUrl: i.string().optional(),
      widgetTitle: i.string().optional(),
      wooKey: i.any().optional(),
      wooSecret: i.any().optional(),
    }),
    syncEvents: i.entity({
      createdAt: i.string().optional(),
      productCount: i.number().optional(),
      status: i.string().optional(),
      storeId: i.string().optional(),
      type: i.string().optional(),
    }),
    users: i.entity({
      createdAt: i.any().optional(),
      email: i.any().optional(),
      emailVerified: i.boolean().optional(),
      name: i.any().optional(),
      password: i.any().optional(),
      verificationCode: i.string().optional(),
      verificationCodeExpiry: i.number().optional(),
    }),
  },
  links: {
    $streams$files: {
      forward: {
        on: "$streams",
        has: "many",
        label: "$files",
      },
      reverse: {
        on: "$files",
        has: "one",
        label: "$stream",
        onDelete: "cascade",
      },
    },
    $usersLinkedPrimaryUser: {
      forward: {
        on: "$users",
        has: "one",
        label: "linkedPrimaryUser",
        onDelete: "cascade",
      },
      reverse: {
        on: "$users",
        has: "many",
        label: "linkedGuestUsers",
      },
    },
    storesProducts: {
      forward: {
        on: "stores",
        has: "many",
        label: "products",
      },
      reverse: {
        on: "products",
        has: "one",
        label: "store",
      },
    },
    storesEvents: {
      forward: {
        on: "stores",
        has: "many",
        label: "events",
      },
      reverse: {
        on: "events",
        has: "one",
        label: "store",
      },
    },
    usersStore: {
      forward: {
        on: "users",
        has: "many",
        label: "store",
      },
      reverse: {
        on: "stores",
        has: "many",
        label: "users",
      },
    },
  },
  rooms: {},
});

// This helps TypeScript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
