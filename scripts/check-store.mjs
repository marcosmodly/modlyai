import { init } from '@instantdb/admin'

const db = init({
  appId: process.env.NEXT_PUBLIC_INSTANTDB_APP_ID,
  adminToken: process.env.INSTANTDB_ADMIN_TOKEN,
})

const result = await db.query({ stores: {} })
for (const store of result.stores ?? []) {
  const shopify = store.credentials?.shopify
  console.log(JSON.stringify({
    id: store.id,
    name: store.name,
    shopifyStoreDomain: shopify?.storeDomain,
    hasAccessToken: Boolean(shopify?.accessToken),
    connectedAt: shopify?.connectedAt,
  }))
}
